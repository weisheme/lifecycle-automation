import {
    CommandHandler,
    failure, HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Parameter,
    Success,
    Tags,
} from "@atomist/automation-client";
import { guid } from "@atomist/automation-client/internal/util/string";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import {
    Action,
    Attachment,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { DirectMessagePreferences } from "../../event/preferences";

/**
 * Configure DM preferences for the invoking user.
 */
@CommandHandler("Configure DM preferences for the invoking user", "configure direct messages",
    "configure dms", "configure dm preferences" )
@Tags("preferences", "configure")
export class ConfigureDirectMessageUserPreferences implements HandleCommand {

    @MappedParameter(MappedParameters.SlackUser)
    public requester: string;

    @Parameter({ description: "id of the message to use for confirmation", pattern: /^.*$/,
        required: false, displayable: false })
    public msgId: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        if (!this.msgId) {
            this.msgId = guid();
        }

        return ctx.graphClient.executeQueryFromFile<graphql.ChatId.Query,
            graphql.ChatId.Variables>("graphql/query/chatId",
            { teamId: ctx.teamId, chatId: this.requester })
            .then(result => {
                const preferences =
                    _.get(result, "ChatTeam[0].members[0].person.chatId.preferences") as graphql.ChatId.Preferences[];
                if (preferences) {
                    const dmPreferences = preferences.find(p => p.name === DirectMessagePreferences.key);
                    if (dmPreferences) {
                        return JSON.parse(dmPreferences.value);
                    }
                }
                return {};
            })
            .then(preferences => {
                return ctx.messageClient.respond(this.createMessage(preferences, this.msgId), { id: this.msgId });
            })
            .then(() => Success, failure);
    }

    private createMessage(preferences: any, id: string): SlackMessage {
        const msg: SlackMessage = {
            text: "Configure your direct message settings:",
            attachments: [],
        };

        for (const type in DirectMessagePreferences) {
            if (DirectMessagePreferences.hasOwnProperty(type) && type !== "key") {
                const dmType = DirectMessagePreferences[type];
                const actions: Action[] = [];

                if (this.isDirectMessageDisabled(preferences, dmType.id)) {
                    actions.push(buttonForCommand({text: "Enable", style: "primary" }, "SetUserPreference",
                        {
                            id,
                            key: DirectMessagePreferences.key,
                            name: `disable_for_${dmType.id}`,
                            value: "false",
                            label: `'${dmType.name}' direct messages enabled`,
                        }));
                } else {
                    actions.push(buttonForCommand({text: "Disable", style: "danger" }, "SetUserPreference",
                        {
                            id,
                            key: DirectMessagePreferences.key,
                            name: `disable_for_${dmType.id}`,
                            value: "true",
                            label: `'${dmType.name}' direct messages disabled`,
                        }));
                }

                const attachment: Attachment = {
                    title: dmType.name,
                    fallback: dmType.name,
                    text: dmType.description,
                    actions,
                };

                msg.attachments.push(attachment);
            }
        }

        if (this.isDirectMessageDisabled(preferences, "all")) {
            msg.attachments.push(this.toogleAllAttachment("false", "Enable All",
                "All direct messages enabled", id));
        } else {
            msg.attachments.push(this.toogleAllAttachment("true", "Disable All",
                "All direct messages disabled", id));
        }

        return msg;
    }

    private isDirectMessageDisabled(preferences: any, type: string): boolean {
        const key = `disable_for_${type}`;
        if (preferences[key]) {
            return (preferences[key] as boolean) === true;
        }
        return false;
    }

    private toogleAllAttachment(enable: string, label: string, message: string, id: string): Attachment {
        const attachment: Attachment = {
            fallback: label,
            text: "Alternatively you can disable or enable *all* direct messages:",
            color: "#00a5ff",
            mrkdwn_in: ["text"],
            actions: [
                buttonForCommand({ text: label }, "SetUserPreference",
                    {
                        id,
                        key: DirectMessagePreferences.key,
                        name: `disable_for_all`,
                        value: enable,
                        label: message,
                    }),
            ],
        };
        return attachment;
    }
}

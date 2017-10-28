import {
    CommandHandler,
    MappedParameter, Parameter,
    Tags,
} from "@atomist/automation-client/decorators";
import {
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameters,
    Success,
} from "@atomist/automation-client/Handlers";
import { guid } from "@atomist/automation-client/internal/util/string";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";

/**
 * Merge preference for the invoking user.
 */
@CommandHandler("Merge preference for the invoking user", "set preference")
@Tags("preferences", "set")
export class SetUserPreference implements HandleCommand {

    @MappedParameter(MappedParameters.SlackUser)
    public requester: string;

    @Parameter({ description: "preference key to set", pattern: /^.*$/ })
    public key: string;

    @Parameter({ description: "preference name to set", pattern: /^.*$/ })
    public name: string;

    @Parameter({ description: "value to set the preference to", pattern: /^.*$/ })
    public value: string;

    @Parameter({ description: "id of the message to use for confirmation", pattern: /^.*$/, required: false})
    public id: string;

    @Parameter({ description: "label to show in confirmation message", pattern: /^.*$/, required: false})
    public label: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeQueryFromFile<graphql.ChatId.Query,
            graphql.ChatId.Variables>("graphql/query/chatId",
            { teamId: ctx.teamId, chatId: this.requester })
            .then(result => {
                const preferences =
                    _.get(result, "ChatTeam[0].members[0].person.chatId.preferences") as graphql.ChatId.Preferences[];
                if (preferences) {
                    const dmPreferences = preferences.find(p => p.name === this.key);
                    if (dmPreferences) {
                        return JSON.parse(dmPreferences.value);
                    }
                }
                return {};
            })
            .then(preferences => {
                if (preferences) {
                    preferences[this.name] = (this.value === "true");
                }
                return ctx.graphClient.executeMutationFromFile<graphql.SetUserPreference.Mutation,
                    graphql.SetUserPreference.Variables>("graphql/mutation/setUserPreference",
                    { userId: this.requester, name: this.key, value: JSON.stringify(preferences) });
            })
            .then(() => {
                const msg: SlackMessage = {
                    attachments: [ {
                        author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${guid()}`,
                        author_name: "Successfully updated your preferences",
                        fallback: "Successfully updated your preferences",
                        title: this.label ? this.label : undefined,
                        color: "#45B254",
                        actions: [
                            buttonForCommand({text: "Configure DMs"}, "ConfigureDirectMessageUserPreferences",
                                {id: this.id}),
                        ],
                    },
                    ],
                };
                return ctx.messageClient.respond(msg, { id: this.id });
            })
            .then(() => Success)
            .catch(err => failure(err));
    }
}

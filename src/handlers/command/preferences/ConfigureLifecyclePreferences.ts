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
    Attachment, bold,
    channel,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import {
    LifecycleActionPreferences,
    LifecyclePreferences,
    LifecycleRendererPreferences,
} from "../../event/preferences";

/**
 * Configure DM preferences for the invoking user.
 */
@CommandHandler("Configure lifecycle actions for the current channel", "configure lifecycle")
@Tags("preferences", "configure")
export class ConfigureLifecyclePreferences implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    @MappedParameter(MappedParameters.SlackTeam)
    public teamId: string;

    @Parameter({ description: "lifecycle to configure", pattern: /^.*$/,
        required: false, displayable: false })
    public lifecycle: string;

    @Parameter({ description: "id of the message to use for confirmation", pattern: /^.*$/,
        required: false, displayable: false })
    public msgId: string;

    @Parameter({ description: "cancel configuration", pattern: /^.*$/,
        required: false, displayable: false })
    public cancel: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        if (!this.msgId) {
            this.msgId = guid();
        }

        if (this.cancel) {
            const msg: SlackMessage = {
                attachments: [{
                    author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${guid()}`,
                    author_name: "Cancelled configuration",
                    title: "Lifecycle",
                    fallback: "Cancelled configuration",
                    color: "#45B254",
                }],
            };
            return ctx.messageClient.respond(msg, { id: this.msgId })
                .then(() => Success, failure);
        } else if (!this.lifecycle) {
            return this.loadPreferences(ctx, LifecyclePreferences.key)
                .then(preferences => {
                    return ctx.messageClient.respond(this.createMessage(preferences), { id: this.msgId });
                })
                .then(() => Success, failure);
        } else {
            return Promise.all([this.loadPreferences(ctx, LifecycleActionPreferences.key),
                this.loadPreferences(ctx, LifecycleRendererPreferences.key)])
                .then(preferences => {
                    return ctx.messageClient.respond(
                        this.createConfigureMessage(preferences[0], preferences[1]), { id: this.msgId });
                })
                .then(() => Success, failure);
        }
    }

    private createMessage(preferences: any): SlackMessage {
        const msg: SlackMessage = {
            text: `Configure Lifecycle for ${channel(this.channelId)}:`,
            attachments: [],
        };

        for (const type in LifecyclePreferences) {
            if (LifecyclePreferences.hasOwnProperty(type) && type !== "key") {
                const lifecycleType = LifecyclePreferences[type];
                const actions: Action[] = [];

                const channelPreferences = _.cloneDeep(preferences[this.channelName] || {});

                if (!this.isLifecycleEnabled(preferences, lifecycleType.id)) {
                    channelPreferences[type] = true;
                    actions.push(buttonForCommand({text: "Enable", style: "primary" }, "SetTeamPreference",
                        { msgId: this.msgId, key: LifecyclePreferences.key, name: this.channelName,
                            value: JSON.stringify(channelPreferences), label: `'${lifecycleType.name}' enabled` }));
                } else {
                    channelPreferences[type] = false;
                    actions.push(buttonForCommand({ text: "Disable", style: "danger" }, "SetTeamPreference",
                        { msgId: this.msgId, key: LifecyclePreferences.key, name: this.channelName,
                            value: JSON.stringify(channelPreferences), label: `'${lifecycleType.name}' disabled` }));
                }

                // Add the configure option
                const configureHandler = new ConfigureLifecyclePreferences();
                configureHandler.msgId = this.msgId;
                configureHandler.lifecycle = type;
                actions.push(buttonForCommand({ text: "Configure" }, configureHandler));

                const configureAttachment: Attachment = {
                    title: lifecycleType.name,
                    fallback: lifecycleType.name,
                    text: lifecycleType.description,
                    actions,
                };

                msg.attachments.push(configureAttachment);
            }
        }

        // Add the cancel option
        const handler = new ConfigureLifecyclePreferences();
        handler.msgId = this.msgId;
        handler.cancel = "true";
        const attachment: Attachment = {
            fallback: "Cancel",
            actions: [
                buttonForCommand({ text: "Cancel" }, handler),
            ],
        };
        msg.attachments.push(attachment);

        return msg;
    }

    private createConfigureMessage(actionPreferences: any, rendererPreferences: any): SlackMessage {

        const lifecycle = LifecyclePreferences[this.lifecycle];
        const lifecycleActions = LifecycleActionPreferences[this.lifecycle];
        const lifecycleRenderers = LifecycleRendererPreferences[this.lifecycle];

        const msg: SlackMessage = {
            text: `Configure ${bold(`'${lifecycle.name}'`)} actions for ${channel(this.channelId)}:`,
            attachments: [],
        };

        for (const type in lifecycleActions) {
            if (lifecycleActions.hasOwnProperty(type) && type !== "key") {
                const actionType = lifecycleActions[type];
                const actions: Action[] = [];

                const channelPreferences = _.cloneDeep(actionPreferences[this.channelName] || {});

                if (!this.isLifecycleActionEnabled(actionPreferences, actionType.id)) {
                    _.set(channelPreferences, `${this.lifecycle}.${type}`, true);
                    actions.push(buttonForCommand({text: "Enable Action", style: "primary" }, "SetTeamPreference",
                        {
                            msgId: this.msgId,
                            key: LifecycleActionPreferences.key,
                            name: this.channelName,
                            value: JSON.stringify(channelPreferences),
                            label: `'${actionType.name}' action of '${lifecycle.name}' enabled` }));
                } else {
                    _.set(channelPreferences, `${this.lifecycle}.${type}`, false);
                    actions.push(buttonForCommand({ text: "Disable Action", style: "danger" }, "SetTeamPreference",
                        {
                            msgId: this.msgId,
                            key: LifecycleActionPreferences.key,
                            name: this.channelName,
                            value: JSON.stringify(channelPreferences),
                            label: `'${actionType.name}' action of '${lifecycle.name}' disabled` }));
                }

                const attachment: Attachment = {
                    title: actionType.name,
                    fallback: actionType.name,
                    text: actionType.description,
                    actions,
                };

                msg.attachments.push(attachment);
            }
        }

        for (const type in lifecycleRenderers) {
            if (lifecycleRenderers.hasOwnProperty(type) && type !== "key") {
                const actionType = lifecycleRenderers[type];
                const actions: Action[] = [];

                const channelPreferences = _.cloneDeep(rendererPreferences[this.channelName] || {});

                if (!this.isLifecycleRendererEnabled(rendererPreferences, actionType.id)) {
                    _.set(channelPreferences, `${this.lifecycle}.${type}`, true);
                    actions.push(buttonForCommand({ text: "Enable Renderer", style: "primary" }, "SetTeamPreference",
                        {
                            msgId: this.msgId,
                            key: LifecycleRendererPreferences.key,
                            name: this.channelName,
                            value: JSON.stringify(channelPreferences),
                            label: `'${actionType.name}' renderer of '${lifecycle.name}' enabled` }));
                } else {
                    _.set(channelPreferences, `${this.lifecycle}.${type}`, false);
                    actions.push(buttonForCommand({ text: "Disable Renderer", style: "danger" }, "SetTeamPreference",
                        {
                            msgId: this.msgId,
                            key: LifecycleRendererPreferences.key,
                            name: this.channelName,
                            value: JSON.stringify(channelPreferences),
                            label: `'${actionType.name}' renderer of '${lifecycle.name}' disabled` }));
                }

                const attachment: Attachment = {
                    title: actionType.name,
                    fallback: actionType.name,
                    text: actionType.description,
                    actions,
                };

                msg.attachments.push(attachment);
            }
        }

        // Add the cancel option
        const handler = new ConfigureLifecyclePreferences();
        handler.msgId = this.msgId;
        const backAttachment: Attachment = {
            fallback: "Back",
            actions: [
                buttonForCommand({ text: "Back" }, handler),
            ],
        };
        msg.attachments.push(backAttachment);

        return msg;
    }

    private isLifecycleEnabled(preferences: any, type: string): boolean {
        if (preferences[this.channelName]) {
            if (preferences[this.channelName][type] != null) {
                return preferences[this.channelName][type] as boolean === true;
            }
        }
        return LifecyclePreferences[type].enabled;
    }

    private isLifecycleActionEnabled(preferences: any, type: string): boolean {
        if (preferences[this.channelName] && preferences[this.channelName][this.lifecycle]) {
            if (preferences[this.channelName][this.lifecycle] != null
                && preferences[this.channelName][this.lifecycle][type] != null) {
                return preferences[this.channelName][this.lifecycle][type] as boolean === true;
            }
        }
        return LifecycleActionPreferences[this.lifecycle][type].enabled;
    }

    private isLifecycleRendererEnabled(preferences: any, type: string): boolean {
        if (preferences[this.channelName] && preferences[this.channelName][this.lifecycle]) {
            if (preferences[this.channelName][this.lifecycle] != null
                && preferences[this.channelName][this.lifecycle][type] != null) {
                return preferences[this.channelName][this.lifecycle][type] as boolean === true;
            }
        }
        return LifecycleRendererPreferences[this.lifecycle][type].enabled;
    }

    private loadPreferences(ctx: HandlerContext, key: string): Promise<graphql.ChatTeamPreferences.Preferences[]> {
        return ctx.graphClient.executeQueryFromFile<graphql.ChatTeamPreferences.Query,
            graphql.ChatTeamPreferences.Variables>("graphql/query/chatTeamPreferences",
            { teamId: this.teamId }, { fetchPolicy: "network-only" })
            .then(result => {
                const preferences =
                    _.get(result, "ChatTeam[0].preferences") as graphql.ChatTeamPreferences.Preferences[];
                if (preferences) {
                    const lifecyclePreferences = preferences.find(
                        p => p.name === key);
                    if (lifecyclePreferences) {
                        return JSON.parse(lifecyclePreferences.value);
                    }
                }
                return [];
            });
    }
}

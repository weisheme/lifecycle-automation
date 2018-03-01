import {
    CommandHandler,
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Success,
    Tags,
} from "@atomist/automation-client";
import { guid } from "@atomist/automation-client/internal/util/string";
import { bold, codeLine, SlackMessage, url } from "@atomist/slack-messages";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { success, supportLink } from "../../../util/messages";

export const LifecyclePreferencesName = "lifecycle_preferences";

@CommandHandler("Toggle the enablement of the custom lifecycle emojis", "toggle lifecycle emojis")
@Tags("slack", "emoji")
export class ToggleCustomEmojiEnablement implements HandleCommand {

    @MappedParameter(MappedParameters.SlackTeam, false)
    public teamId: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return isCustomEmojisEnabled(this.teamId, ctx)
            .then(preferencesState => {
                const preferences =
                    _.cloneDeep(preferencesState.preferences) as graphql.ChatTeamPreferences.Preferences;

                const enabled: string = preferencesState.enabled ? "default" : "atomist";

                _.set(preferences, "push.configuration['emoji-style']", enabled);
                _.set(preferences, "pull_request.configuration['emoji-style']", enabled);

                return ctx.graphClient.executeMutationFromFile<graphql.SetChatTeamPreference.Mutation,
                    graphql.SetChatTeamPreference.Variables>(
                    "../../../graphql/mutation/setChatTeamPreference",
                    { teamId: this.teamId, name: LifecyclePreferencesName, value: JSON.stringify(preferences)},
                    { fetchPolicy: "no-cache" },
                    __dirname,
                )
                .then(() => preferencesState);
            })
            .then(preferencesState => {
                const enabled = !preferencesState.enabled;
                /* tslint:disable */
                const instructions = `Please download the ${url("https://images.atomist.com/atomist-emojis-1.0.0.zip", 
                    "emoji archive")}, open the ${codeLine("README.md")} and follow the instructions to install the custom emojis into this Slack team.`;
                const text = `${bold(`'Custom Lifecycle Emojis' ${enabled ? "enabled" : "disabled"}`)}`;

                const msg: SlackMessage = {
                    attachments: [{
                        author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${guid()}`,
                        author_name: "Successfully updated your preferences",
                        text,
                        fallback: text,
                        color: "#45B254",
                        mrkdwn_in: [ "text" ],
                    }],
                };

                if (enabled) {
                    msg.attachments.push({
                        text: instructions,
                        fallback: instructions,
                        footer: `${url(`https://${preferencesState.domain}.slack.com/customize/emoji`, 
                            "Slack Emoji Configuration")} | ${url("https://get.slack.help/hc/en-us/articles/206870177-Create-custom-emoji", 
                            "Slack Emoji Help")} | ${supportLink(ctx)}`,
                        mrkdwn_in: [ "text" ]
                    });
                }
                /* tslint:enable */
                return ctx.messageClient.respond(msg);
            })
            .then(() => Success, failure);
    }
}

export function isCustomEmojisEnabled(teamId: string, ctx: HandlerContext)
: Promise<{preferences: graphql.ChatTeamPreferences.Preferences, enabled: boolean, domain: string}> {
    return ctx.graphClient.executeQueryFromFile<graphql.ChatTeamPreferences.Query,
        graphql.ChatTeamPreferences.Variables>(
        "../../../graphql/query/chatTeamPreferences",
        { teamId },
        { fetchPolicy: "network-only" },
        __dirname)
        .then(result => {
            const preferences = (_.get(result, "ChatTeam[0].preferences")
                || []) as graphql.ChatTeamPreferences.Preferences[];
            const lifecyclePreferences = preferences.find(p => p.name === LifecyclePreferencesName);
            if (lifecyclePreferences) {
                const lp = JSON.parse(lifecyclePreferences.value);
                return {
                    preferences: lp,
                    enabled: _.get(lp, "push.configuration['emoji-style']") === "atomist",
                    domain: result.ChatTeam[0].domain,
                };
            }
            return {
                preferences: {},
                enabled: false,
                domain: result.ChatTeam[0].domain,
            };
        });
}

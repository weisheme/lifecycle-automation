import {
    CommandHandler,
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Parameter,
    Success,
    Tags,
} from "@atomist/automation-client";
import { guid } from "@atomist/automation-client/internal/util/string";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";

/**
 * Merge preference for the invoking user.
 */
@CommandHandler("Merge preference for the team", "set team preference")
@Tags("preferences", "set")
export class SetTeamPreference implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @Parameter({
        displayName: "Preference Category",
        description: "category of preferences under which you want to set a preference",
        pattern: /^\S+$/,
        validInput: "non-whitespace characters, 1 to 100 characters in length",
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public key: string;

    @Parameter({
        displayName: "Preference Name",
        description: "key of preference to set",
        pattern: /^\S+$/,
        validInput: "non-whitespace characters, 1 to 100 characters in length",
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public name: string;

    @Parameter({
        displayName: "Preference Value",
        description: "value to set the preference to, typically stringified JSON but can be just a string",
        pattern: /^[\S\s]*$/,
        validInput: "a string 1000 characters or less",
        minLength: 0,
        maxLength: 1000,
        required: true,
    })
    public value: string;

    @Parameter({
        displayable: false,
        description: "id of the message to use for confirmation",
        pattern: /^\S*$/,
        required: false,
    })
    public msgId: string;

    @Parameter({
        displayable: false,
        description: "label to show in confirmation message",
        pattern: /^.*$/,
        required: false,
    })
    public label: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeQueryFromFile<graphql.TeamPreferences.Query,
            graphql.TeamPreferences.Variables>("graphql/query/teamPreferences",
            { }, { fetchPolicy: "network-only" })
            .then(result => {
                const preferences =
                    _.get(result, "ChatTeam[0].preferences") as graphql.TeamPreferences.Preferences[];
                if (preferences) {
                    const lifecyclePreferences = preferences.find(p => p.name === this.key);
                    if (lifecyclePreferences) {
                        return JSON.parse(lifecyclePreferences.value);
                    }
                }
                return {};
            })
            .then(preferences => {
                let value: any;
                try {
                    value = JSON.parse(this.value);
                } catch (e) {
                    const err = (e as Error).message;
                    console.error(`failed to parse config value '${this.value}' using string: ${err}`);
                    value = this.value;
                }
                preferences[this.name] = value;
                return ctx.graphClient.executeMutationFromFile<graphql.SetTeamPreference.Mutation,
                    graphql.SetTeamPreference.Variables>("graphql/mutation/setTeamPreference",
                    {name: this.key, value: JSON.stringify(preferences) });
            })
            .then(() => {
                const msg: SlackMessage = {
                    attachments: [{
                        author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${guid()}`,
                        author_name: "Successfully updated your preferences",
                        fallback: "Successfully updated your preferences",
                        title: this.label ? this.label : undefined,
                        color: "#45B254",
                    }],
                };
                return ctx.messageClient.respond(msg, { id: this.msgId });
            })
            .then(() => Success, err => failure(err));
    }
}

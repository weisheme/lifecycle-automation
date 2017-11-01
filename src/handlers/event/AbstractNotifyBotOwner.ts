import {
    EventFired,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client/Handlers";
import { Preferences } from "../../lifecycle/Lifecycle";
import * as graphql from "../../typings/types";

const PageSize = 50;
const Message = "GitHub events are flowing for your organizations but they're not visible in any Slack channels yet. " +
    "To enable this, go to a channel and invite me by typing `@atomist`";
const PreferenceKey = "disable_bot_owner_on_github_activity_notification";

export abstract class AbstractNotifyBotOwner<R> implements HandleEvent<R> {

    public handle(event: EventFired<any>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const preferences = this.extractPreferences(event);
        if (preferences) {
            const preference = preferences.find(p => p.name === PreferenceKey);
            if (preference && preference.value === "true") {
                console.log(`Team preferences '${PreferenceKey}' indicate team has disabled notifications`);
                return Promise.resolve(Success);
            }
        }

        return ctx.graphClient.executeQueryFromFile<graphql.Channels.Query, graphql.Channels.Variables>(
            "graphql/query/channels",
            { first: PageSize, offset: 0 })
            .then(function page(result, offset = 0) {
                if (!result.Repo || result.Repo.length === 0) {
                    return handleResult(false, ctx);
                } else if (result.Repo.some(r => r.channels && r.channels.length > 0)) {
                    return handleResult(true, ctx);
                }

                offset = offset + PageSize;
                return ctx.graphClient.executeQueryFromFile<graphql.Channels.Query, graphql.Channels.Variables>(
                    "graphql/query/channels",
                    { first: PageSize, offset })
                    .then(innerResult => page(innerResult, offset));
                },
            );
    }

    protected abstract extractPreferences(event: EventFired<R>): Preferences[];
}

function handleResult(mappedRepo: boolean, ctx: HandlerContext): Promise<HandlerResult> {
    if (!mappedRepo) {
        return ctx.graphClient.executeQueryFromFile<graphql.BotOwner.Query, graphql.BotOwner.Variables>(
            "graphql/query/botOwner",
            {})
            .then(r => {
                return r.ChatId.map(c => c.screenName);
            })
            .then(owners => {
                console.log(`Notifying '${owners.join(", ")}' about GitHub activity`);
                return ctx.messageClient.addressUsers(Message, owners,
                    { id: `bot_owner/github/notification/${require("current-week-number")()}` });
            })
            .catch(err => failure(err));
    } else {
        console.log(`Setting team preferences '${PreferenceKey}' to 'true'`);
        return ctx.graphClient.executeMutationFromFile<graphql.SetTeamPreference.Mutation,
                graphql.SetTeamPreference.Variables>("graphql/mutation/setTeamPreference",
                {name: PreferenceKey, value: "true"})
            .then(() => Success)
            .catch(err => failure(err));
    }
}

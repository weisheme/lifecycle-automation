import { EventFired } from "@atomist/automation-client/Handlers";
import {
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client/Handlers";
import * as graphql from "../../typings/types";

const PageSize = 50;
const Message = "GitHub events are flowing for your organizations but they're not visible in any Slack channels yet. " +
    "To enable this, go to a channel and invite me by typing `@atomist`";

export abstract class AbstractNotifyBotOwner implements HandleEvent<any> {

    public handle(root: EventFired<any>,
                  ctx: HandlerContext): Promise<HandlerResult> {

        return ctx.graphClient.executeQueryFromFile<graphql.Channels.Query, graphql.Channels.Variables>(
            "graphql/query/channels",
            { first: PageSize, offset: 0 })
            .then(function page(result, offset = 1, mappedRepo = false) {
                if (!result.Repo || result.Repo.length === 0 || mappedRepo === true) {
                    if (!mappedRepo) {
                        // TODO change to DM the bot author
                        return ctx.messageClient.addressUsers(Message, "cd",
                            { id: "" });
                    } else {
                        return Success;
                    }
                } else if (result.Repo.some(r => r.channels && r.channels.length > 0)) {
                   mappedRepo = true;
                }

                offset++;
                return ctx.graphClient.executeQueryFromFile<graphql.Channels.Query, graphql.Channels.Variables>(
                    "graphql/query/channels",
                    { first: PageSize, offset })
                    .then(innerResult => page(innerResult, offset, mappedRepo));
                },
            );
    }
}

import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { ChatTeam } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * Send a lifecycle message on Issue events.
 */
@EventHandler("Send a lifecycle message on Issue events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/issueToPush", __dirname))
@Tags("lifecycle", "push", "issue")
export class IssueToPushLifecycle extends PushLifecycleHandler<graphql.IssueToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.IssueToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {

        const pushes = [];
        event.data.Issue[0].resolvingCommits.forEach(c => pushes.push(...c.pushes));
        return pushes;
    }

    protected extractChatTeams(event: EventFired<graphql.IssueToPushLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Issue[0].resolvingCommits[0].pushes[0].repo.org.team.chatTeams");
    }
}

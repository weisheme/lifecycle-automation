import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * Send a lifecycle message on Issue events.
 */
@EventHandler("Send a lifecycle message on Issue events",
    GraphQL.subscriptionFromFile("graphql/subscription/issueToPush"))
@Tags("lifecycle", "push", "issue")
export class IssueToPushLifecycle extends PushLifecycleHandler<graphql.IssueToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.IssueToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], string] {

        const pushes = [];
        event.data.Issue[0].resolvingCommits.forEach(c => pushes.push(...c.pushes));
        return [pushes, new Date().getTime().toString()];
    }

    protected extractPreferences(event: EventFired<graphql.IssueToPushLifecycle.Subscription>): Preferences[] {
        return _.get(event, "data.Issue[0].resolvingCommits[0].pushes[0].repo.org.chatTeam.preferences", []);
    }
}

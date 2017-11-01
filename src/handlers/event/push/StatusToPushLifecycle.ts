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
 * Send a Push lifecycle message on Status events.
 */
@EventHandler("Send a lifecycle message on Status events",
    GraphQL.subscriptionFromFile("graphql/subscription/statusToPush"))
@Tags("lifecycle", "push", "status")
export class StatusToPushLifecycle extends PushLifecycleHandler<graphql.StatusToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.StatusToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], string] {

        const pushes = event.data.Status[0].commit.pushes;
        return [pushes, new Date().getTime().toString()];
    }

    protected extractPreferences(event: EventFired<graphql.StatusToPushLifecycle.Subscription>): Preferences[] {
        return _.get(event, "data.Status[0].commit.pushes[0].repo.org.chatTeam.preferences", []);
    }
}

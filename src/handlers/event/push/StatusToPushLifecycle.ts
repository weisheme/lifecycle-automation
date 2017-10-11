import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * A Event handler that sends a Push lifecycle message on Status events.
 */
@EventHandler("Event handler that sends a lifecycle message on Status events",
    GraphQL.subscriptionFromFile("graphql/subscription/statusToPush"))
@Tags("lifecycle", "push", "status")
export class StatusToPushLifecycle extends PushLifecycleHandler<graphql.StatusToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.StatusToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], string] {

        const pushes = event.data.Status[0].commit.pushes;
        return [pushes, new Date().getTime().toString()];
    }
}

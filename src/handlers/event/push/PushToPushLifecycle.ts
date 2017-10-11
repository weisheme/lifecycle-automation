import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * A Event handler that sends a lifecycle message on Push events.
 */
@EventHandler("Event handler that sends a lifecycle message on Push events",
    GraphQL.subscriptionFromFile("graphql/subscription/pushToPush"))
@Tags("lifecycle", "push")
export class PushToPushLifecycle extends PushLifecycleHandler<graphql.PushToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.PushToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], string] {

        return [event.data.Push, event.data.Push[0].timestamp];
    }
}

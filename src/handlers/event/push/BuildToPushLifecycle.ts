import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * A Event handler that sends a lifecycle message on Build events.
 */
@EventHandler("Event handler that sends a lifecycle message on Build events",
    GraphQL.subscriptionFromFile("graphql/subscription/buildToPush"))
@Tags("lifecycle", "push", "build")
export class BuildToPushLifecycle extends PushLifecycleHandler<graphql.BuildToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.BuildToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], string] {

        return [[event.data.Build[0].push], event.data.Build[0].timestamp];
    }
}

import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * A Event handler that sends a lifecycle message on Application events.
 */
@EventHandler("Event handler that sends a lifecycle message on Application events",
    GraphQL.subscriptionFromFile("graphql/subscription/applicationToPush"))
@Tags("lifecycle", "push", "application")
export class ApplicationToPushLifecycle extends PushLifecycleHandler<graphql.ApplicationToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ApplicationToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], string] {

        const pushes = [];
        event.data.Application[0].commits.forEach(c => pushes.push(...c.pushes));
        return [pushes, event.data.Application[0].timestamp];
    }
}

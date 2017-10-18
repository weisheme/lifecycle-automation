import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * Send a lifecycle message on Application events.
 */
@EventHandler("Send a lifecycle message on Application events",
    GraphQL.subscriptionFromFile("graphql/subscription/applicationToPush"))
@Tags("lifecycle", "push", "application")
export class ApplicationToPushLifecycle extends PushLifecycleHandler<graphql.ApplicationToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ApplicationToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], string] {

        const pushes = [];
        event.data.Application[0].commits.forEach(c => pushes.push(...c.pushes));
        return [pushes, event.data.Application[0].timestamp];
    }

    protected extractPreferences(event: EventFired<graphql.ApplicationToPushLifecycle.Subscription>): Preferences[] {
        return _.get(event, "data.Application[0].commits[0].pushes[0].repo.org.chatTeam.preferences", []);
    }
}

import {
    EventHandler,
    Tags,
} from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * Send a lifecycle message on ParentImpact events.
 */
@EventHandler("Send a lifecycle message on ParentImpact events",
    GraphQL.subscriptionFromFile("graphql/subscription/parentimpactToPush"))
@Tags("lifecycle", "push", "parentImpact")
export class ParentImpactToPushLifecycle
    extends PushLifecycleHandler<graphql.ParentImpactToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ParentImpactToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], string] {

        return [event.data.ParentImpact[0].commit.pushes, new Date().getTime().toString()];
    }

    protected extractPreferences(event: EventFired<graphql.ParentImpactToPushLifecycle.Subscription>): Preferences[] {
        return _.get(event, "data.ParentImpact[0].commit.pushes[0].repo.org.chatTeam.preferences", []);
    }
}

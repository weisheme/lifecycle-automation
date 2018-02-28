import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Event } from "../../../lifecycle/card";
import { Preferences } from "../../../lifecycle/Lifecycle";
import { chatTeamsToPreferences } from "../../../lifecycle/util";
import * as graphql from "../../../typings/types";
import { PushCardLifecycleHandler, PushLifecycleHandler } from "./PushLifecycle";

/**
 * Send a lifecycle message on ParentImpact events.
 */
@EventHandler("Send a lifecycle message on ParentImpact events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/parentimpactToPush", __dirname))
@Tags("lifecycle", "push", "parentImpact")
export class ParentImpactToPushLifecycle
    extends PushLifecycleHandler<graphql.ParentImpactToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ParentImpactToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return event.data.ParentImpact[0].commit.pushes;
    }

    protected extractPreferences(
        event: EventFired<graphql.ParentImpactToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(
            _.get(event, "data.ParentImpact[0].commit.pushes[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on ParentImpact events.
 */
@EventHandler("Send a lifecycle card on ParentImpact events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/parentimpactToPush", __dirname))
@Tags("lifecycle", "push", "parentImpact")
export class ParentImpactToPushCardLifecycle
    extends PushCardLifecycleHandler<graphql.ParentImpactToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ParentImpactToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], {type: string, node: any}] {
        return [event.data.ParentImpact[0].commit.pushes, null];
    }

    protected extractPreferences(
        event: EventFired<graphql.ParentImpactToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

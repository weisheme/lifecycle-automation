import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import { chatTeamsToPreferences } from "../../../lifecycle/util";
import * as graphql from "../../../typings/types";
import { PushCardLifecycleHandler, PushLifecycleHandler } from "./PushLifecycle";

/**
 * Send a lifecycle message on Push events.
 */
@EventHandler("Send a lifecycle message on Push events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/pushToPush", __dirname))
@Tags("lifecycle", "push")
export class PushToPushLifecycle extends PushLifecycleHandler<graphql.PushToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.PushToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return event.data.Push;
    }

    protected extractPreferences(
        event: EventFired<graphql.PushToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.Push[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on Push events.
 */
@EventHandler("Send a lifecycle card on Push events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/pushToPush", __dirname))
@Tags("lifecycle", "push")
export class PushToPushCardLifecycle extends PushCardLifecycleHandler<graphql.PushToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.PushToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], { type: string, node: any }] {
        return [event.data.Push, { type: "commit", node: event.data.Push[0].commits }];
    }

    protected extractPreferences(
        event: EventFired<graphql.PushToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

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
 * Send a lifecycle message on Build events.
 */
@EventHandler("Send a lifecycle message on Build events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/buildToPush", __dirname))
@Tags("lifecycle", "push", "build")
export class BuildToPushLifecycle extends PushLifecycleHandler<graphql.BuildToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.BuildToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return [event.data.Build[0].push];
    }

    protected extractPreferences(
        event: EventFired<graphql.BuildToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.Build[0].push.repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on Build events.
 */
@EventHandler("Send a lifecycle card on Build events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/buildToPush", __dirname))
@Tags("lifecycle", "push", "build")
export class BuildToPushCardLifecycle
    extends PushCardLifecycleHandler<graphql.BuildToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.BuildToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], { type: string, node: any }] {
        return [[event.data.Build[0].push], { type: "build", node: event.data.Build[0] }];
    }

    protected extractPreferences(
        event: EventFired<graphql.BuildToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

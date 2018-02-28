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
 * Send a lifecycle message on Release events.
 */
@EventHandler("Send a lifecycle message on Release events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/releaseToPush", __dirname))
@Tags("lifecycle", "push", "release")
export class ReleaseToPushLifecycle extends PushLifecycleHandler<graphql.ReleaseToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ReleaseToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return event.data.Release[0].tag.commit.pushes;
    }

    protected extractPreferences(
        event: EventFired<graphql.ReleaseToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(
            _.get(event, "data.Release[0].tag.commit.pushes[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on Release events.
 */
@EventHandler("Send a lifecycle card on Release events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/releaseToPush", __dirname))
@Tags("lifecycle", "push", "release")
export class ReleaseToPushCardLifecycle extends PushCardLifecycleHandler<graphql.ReleaseToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ReleaseToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], { type: string, node: any }] {
        return [event.data.Release[0].tag.commit.pushes, { type: "release", node: event.data.Release[0]}];
    }

    protected extractPreferences(
        event: EventFired<graphql.ReleaseToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

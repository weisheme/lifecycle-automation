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
 * Send a lifecycle message on Tag events.
 */
@EventHandler("Send a lifecycle message on Tag events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/tagToPush", __dirname))
@Tags("lifecycle", "push", "tag ")
export class TagToPushLifecycle extends PushLifecycleHandler<graphql.TagToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.TagToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return event.data.Tag[0].commit.pushes;
    }

    protected extractPreferences(
        event: EventFired<graphql.TagToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.Tag[0].commit.pushes[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on Tag events.
 */
@EventHandler("Send a lifecycle card on Tag events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/tagToPush", __dirname))
@Tags("lifecycle", "push", "tag ")
export class TagToPushCardLifecycle extends PushCardLifecycleHandler<graphql.TagToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.TagToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], { type: string, node: any }] {
        return [event.data.Tag[0].commit.pushes, { type: "tag", node: event.data.Tag[0] }];
    }

    protected extractPreferences(
        event: EventFired<graphql.TagToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

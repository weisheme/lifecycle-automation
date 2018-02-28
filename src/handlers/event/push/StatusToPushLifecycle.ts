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
 * Send a Push lifecycle message on Status events.
 */
@EventHandler("Send a lifecycle message on Status events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/statusToPush", __dirname))
@Tags("lifecycle", "push", "status")
export class StatusToPushLifecycle extends PushLifecycleHandler<graphql.StatusToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.StatusToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return event.data.Status[0].commit.pushes;
    }

    protected extractPreferences(
        event: EventFired<graphql.StatusToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.Status[0].commit.pushes[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a Push lifecycle card on Status events.
 */
@EventHandler("Send a lifecycle card on Status events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/statusToPush", __dirname))
@Tags("lifecycle", "push", "status")
export class StatusToPushCardLifecycle extends PushCardLifecycleHandler<graphql.StatusToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.StatusToPushLifecycle.Subscription>):
        [graphql.PushToPushLifecycle.Push[], { type: string, node: any }] {

        // filter CI statuses as we don't want them to overwrite
        const cis = ["travis", "jenkins", "circle", "codeship"];
        const status = event.data.Status[0];
        if (!cis.some(ci => status.context.includes(ci))) {
            return [event.data.Status[0].commit.pushes, { type: "status", node: event.data.Status[0] }];
        } else {
            return [[], null];
        }
    }

    protected extractPreferences(
        event: EventFired<graphql.StatusToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

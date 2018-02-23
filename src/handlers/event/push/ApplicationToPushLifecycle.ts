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
 * Send a lifecycle message on Application events.
 */
@EventHandler("Send a lifecycle message on Application events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/applicationToPush", __dirname))
@Tags("lifecycle", "push", "application")
export class ApplicationToPushLifecycle extends PushLifecycleHandler<graphql.ApplicationToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ApplicationToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {

        const pushes = [];
        event.data.Application[0].commits.forEach(c => pushes.push(...c.pushes));
        return pushes;
    }

    protected extractPreferences(
        event: EventFired<graphql.ApplicationToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(
            _.get(event, "data.Application[0].commits[0].pushes[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on Application events.
 */
@EventHandler("Send a lifecycle card on Application events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/applicationToPush", __dirname))
@Tags("lifecycle", "push", "application")
export class ApplicationToPushCardLifecycle
    extends PushCardLifecycleHandler<graphql.ApplicationToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ApplicationToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {

        const pushes = [];
        event.data.Application[0].commits.forEach(c => pushes.push(...c.pushes));
        return pushes;
    }

    protected extractPreferences(
        event: EventFired<graphql.ApplicationToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

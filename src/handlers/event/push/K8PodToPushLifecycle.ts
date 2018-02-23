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
 * Send a lifecycle message on K8Pod events.
 */
@EventHandler("Send a lifecycle message on K8Pod events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/k8podToPush", __dirname))
@Tags("lifecycle", "push", "k8pod")
export class K8PodToPushLifecycle extends PushLifecycleHandler<graphql.K8PodToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.K8PodToPushLifecycle.Subscription>):
        graphql.K8PodToPushLifecycle.Pushes[] {

        const pushes = [];
        event.data.K8Pod[0].images.forEach(i => pushes.push(...i.commits[0].pushes));
        return pushes;
    }

    protected extractPreferences(
        event: EventFired<graphql.K8PodToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(
            _.get(event, "data.K8Pod[0].images[0].commits[0].pushes[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on K8Pod events.
 */
@EventHandler("Send a lifecycle card on K8Pod events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/k8podToPush", __dirname))
@Tags("lifecycle", "push", "k8pod")
export class K8PodToPushCardLifecycle extends PushCardLifecycleHandler<graphql.K8PodToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.K8PodToPushLifecycle.Subscription>):
        graphql.K8PodToPushLifecycle.Pushes[] {

        const pushes = [];
        event.data.K8Pod[0].images.forEach(i => pushes.push(...i.commits[0].pushes));
        return pushes;
    }

    protected extractPreferences(
        event: EventFired<graphql.K8PodToPushLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

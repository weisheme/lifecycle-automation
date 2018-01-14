import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { ChatTeam } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * Send a lifecycle message on K8Pod events.
 */
@EventHandler("Send a lifecycle message on K8Pod events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/k8podToPush", __dirname))
@Tags("lifecycle", "push", "k8pod")
export class K8PodToPushLifecycle extends PushLifecycleHandler<graphql.K8PodToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.K8PodToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {

        const pushes = [];
        event.data.K8Pod[0].images.forEach(i => pushes.push(...i.tag.commit.pushes));
        return pushes;
    }

    protected extractChatTeams(event: EventFired<graphql.K8PodToPushLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.K8Pod[0].images[0].tag.commit.pushes[0].repo.org.team.chatTeams");
    }
}

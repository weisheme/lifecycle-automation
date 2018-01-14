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

    protected extractChatTeams(event: EventFired<graphql.PushToPushLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Push[0].repo.org.team.chatTeams");
    }
}

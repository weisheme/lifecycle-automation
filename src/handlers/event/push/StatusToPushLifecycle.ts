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

    protected extractChatTeams(event: EventFired<graphql.StatusToPushLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Status[0].commit.pushes[0].repo.org.team.chatTeams");
    }
}

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
 * Send a lifecycle message on Release events.
 */
@EventHandler("Send a lifecycle message on Release events",
    GraphQL.subscriptionFromFile("graphql/subscription/releaseToPush"))
@Tags("lifecycle", "push", "release")
export class ReleaseToPushLifecycle extends PushLifecycleHandler<graphql.ReleaseToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ReleaseToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return event.data.Release[0].tag.commit.pushes;
    }

    protected extractChatTeams(event: EventFired<graphql.ReleaseToPushLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Release[0].tag.commit.pushes[0].repo.org.team.chatTeams");
    }
}

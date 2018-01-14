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
 * Send a lifecycle message on ParentImpact events.
 */
@EventHandler("Send a lifecycle message on ParentImpact events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/parentimpactToPush", __dirname))
@Tags("lifecycle", "push", "parentImpact")
export class ParentImpactToPushLifecycle
    extends PushLifecycleHandler<graphql.ParentImpactToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ParentImpactToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {

        return event.data.ParentImpact[0].commit.pushes;
    }

    protected extractChatTeams(event: EventFired<graphql.ParentImpactToPushLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.ParentImpact[0].commit.pushes[0].repo.org.team.chatTeams");
    }
}

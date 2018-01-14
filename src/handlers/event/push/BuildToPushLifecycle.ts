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
 * Send a lifecycle message on Build events.
 */
@EventHandler("Send a lifecycle message on Build events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/buildToPush", __dirname))
@Tags("lifecycle", "push", "build")
export class BuildToPushLifecycle extends PushLifecycleHandler<graphql.BuildToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.BuildToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {

        return [event.data.Build[0].push];
    }

    protected extractChatTeams(event: EventFired<graphql.BuildToPushLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Build[0].push.repo.org.team.chatTeams");
    }
}

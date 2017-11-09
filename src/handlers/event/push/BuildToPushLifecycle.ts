import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PushLifecycleHandler } from "./PushLifecycle";

/**
 * Send a lifecycle message on Build events.
 */
@EventHandler("Send a lifecycle message on Build events",
    GraphQL.subscriptionFromFile("graphql/subscription/buildToPush"))
@Tags("lifecycle", "push", "build")
export class BuildToPushLifecycle extends PushLifecycleHandler<graphql.BuildToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.BuildToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {

        return [event.data.Build[0].push];
    }

    protected extractPreferences(event: EventFired<graphql.BuildToPushLifecycle.Subscription>): Preferences[] {
        return _.get(event, "data.Build[0].push.repo.org.chatTeam.preferences", []);
    }
}

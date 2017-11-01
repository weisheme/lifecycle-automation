import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
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
        [graphql.PushToPushLifecycle.Push[], string] {

        const pushes = event.data.Release[0].tag.commit.pushes;
        return [pushes, event.data.Release[0].timestamp];
    }

    protected extractPreferences(event: EventFired<graphql.ReleaseToPushLifecycle.Subscription>): Preferences[] {
        return _.get(event, "data.Release[0].tag.commit.pushes[0].repo.org.chatTeam.preferences", []);
    }
}

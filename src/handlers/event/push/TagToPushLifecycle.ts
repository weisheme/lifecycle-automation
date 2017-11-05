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
 * Send a lifecycle message on Tag events.
 */
@EventHandler("Send a lifecycle message on Tag events",
    GraphQL.subscriptionFromFile("graphql/subscription/tagToPush"))
@Tags("lifecycle", "push", "tag ")
export class TagToPushLifecycle extends PushLifecycleHandler<graphql.TagToPushLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.TagToPushLifecycle.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return event.data.Tag[0].commit.pushes;
    }

    protected extractPreferences(event: EventFired<graphql.TagToPushLifecycle.Subscription>): Preferences[] {
        return _.get(event, "data.Tag[0].commit.pushes[0].repo.org.chatTeam.preferences", []);
    }
}

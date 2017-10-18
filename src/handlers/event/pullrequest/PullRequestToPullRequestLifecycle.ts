import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { PullRequestLifecycleHandler } from "./PullRequestLifecycle";

/**
 * Send a lifecycle message on PullRequest events.
 */
@EventHandler("Send a lifecycle message on PullRequest events",
    GraphQL.subscriptionFromFile("graphql/subscription/pullRequestToPullRequest"))
@Tags("lifecycle", "pr")
export class PullRequestToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.PullRequestToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.PullRequestToPullRequestLifecycle.Subscription>):
        [graphql.PullRequestToPullRequestLifecycle.PullRequest,
            graphql.PullRequestToPullRequestLifecycle.Repo,
            string] {

        return [event.data.PullRequest[0], event.data.PullRequest[0].repo, new Date().getTime().toString()];
    }
}

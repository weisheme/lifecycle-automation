import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { PullRequestLifecycleHandler } from "./PullRequestLifecycle";

/**
 * Send a lifecycle message on Commit events.
 */
@EventHandler("Send a lifecycle message on Commit events",
    GraphQL.subscriptionFromFile("graphql/subscription/commitToPullRequest"),
)
@Tags("lifecycle", "pr", "commit")
export class CommitToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.CommitToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.CommitToPullRequestLifecycle.Subscription>):
        [graphql.CommitToPullRequestLifecycle.PullRequests, graphql.CommitToPullRequestLifecycle.Repo, string] {

        const pr = _.get(event, "data.Commit[0].pullRequests[0]");
        return [pr, _.get(pr, "repo"), new Date().getTime().toString()];
    }
}

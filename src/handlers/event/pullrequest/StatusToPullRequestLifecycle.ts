import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { PullRequestLifecycleHandler } from "./PullRequestLifecycle";

/**
 * Send a lifecycle message on Status events.
 */
@EventHandler("Send a lifecycle message on Status events",
    GraphQL.subscriptionFromFile("graphql/subscription/statusToPullRequest"))
@Tags("lifecycle", "pr", "status")
export class StatusToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.StatusToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.StatusToPullRequestLifecycle.Subscription>):
        [graphql.StatusToPullRequestLifecycle.PullRequests, graphql.StatusToPullRequestLifecycle.Repo, string] {

        const pr = _.get(event, "data.Status[0].commit.pullRequests[0]");
        return [pr, _.get(pr, "repo"), new Date().getTime().toString()];
    }
}

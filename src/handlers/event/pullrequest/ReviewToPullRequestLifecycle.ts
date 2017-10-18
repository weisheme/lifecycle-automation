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
 * Send a lifecycle message on Review events.
 */
@EventHandler("Send a lifecycle message on Review events",
    GraphQL.subscriptionFromFile("graphql/subscription/reviewToPullRequest"))
@Tags("lifecycle", "pr", "review")
export class ReviewToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.ReviewToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ReviewToPullRequestLifecycle.Subscription>):
        [graphql.ReviewToPullRequestLifecycle.PullRequest, graphql.ReviewToPullRequestLifecycle.Repo, string] {

        const pr = _.get(event, "data.Review[0].pullRequest");
        return [pr, _.get(pr, "repo"), new Date().getTime().toString()];
    }
}

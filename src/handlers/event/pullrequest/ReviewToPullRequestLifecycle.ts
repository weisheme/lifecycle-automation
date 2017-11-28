import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
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
        [graphql.ReviewToPullRequestLifecycle.PullRequest, graphql.ReviewToPullRequestLifecycle.Repo,
            string, boolean] {

        const pr = _.get(event, "data.Review[0].pullRequest");
        return [pr, _.get(pr, "repo"), Date.now().toString(), true];
    }

    protected extractPreferences(event: EventFired<graphql.ReviewToPullRequestLifecycle.Subscription>)
        : Preferences[] {
        return _.get(event, "data.Review[0].pullRequest.repo.org.chatTeam.preferences");
    }
}

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
 * Send a lifecycle message on Comment events.
 */
@EventHandler("Send a lifecycle message on Comment events",
    GraphQL.subscriptionFromFile("graphql/subscription/commentToPullRequest"))
@Tags("lifecycle", "pr", "comment")
export class CommentToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.CommentToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.CommentToPullRequestLifecycle.Subscription>):
        [graphql.CommentToPullRequestLifecycle.PullRequest, graphql.CommentToPullRequestLifecycle.Repo, string] {

        const pr = _.get(event, "data.Comment[0].pullRequest");
        return [pr, _.get(pr, "repo"), new Date().getTime().toString()];
    }
}

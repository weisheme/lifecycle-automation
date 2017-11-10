import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { CommentLifecycleHandler } from "./CommentLifecycle";

/**
 * Send a lifecycle message on Comment events.
 */
@EventHandler("Send a lifecycle message on Comment events",
    GraphQL.subscriptionFromFile("graphql/subscription/commentToPullRequestComment"))
@Tags("lifecycle", "pr comment", "comment")
export class CommentToPullRequestCommentLifecycle
    extends CommentLifecycleHandler<graphql.CommentToPullRequestCommentLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.CommentToPullRequestCommentLifecycle.Subscription>):
        [graphql.CommentToPullRequestCommentLifecycle.Comment[], graphql.IssueToIssueCommentLifecycle.Issue,
            graphql.CommentToPullRequestCommentLifecycle.PullRequest, graphql.CommentToPullRequestCommentLifecycle.Repo,
            boolean] {

        return [event.data.Comment, null, _.get(event, "data.Comment[0].pullRequest"),
        _.get(event, "data.Comment[0].pullRequest.repo"), false];
    }

    protected extractPreferences(event: EventFired<graphql.CommentToPullRequestCommentLifecycle.Subscription>)
        : Preferences[] {
        return _.get(event, "data.Comment[0].pullRequest.repo.org.chatTeam.preferences");
    }
}

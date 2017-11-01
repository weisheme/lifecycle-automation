import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { CommentLifecycleHandler } from "./CommentLifecycle";

/**
 * Send a lifecycle message on Issue events.
 */
@EventHandler("Send a lifecycle message on Issue events",
    GraphQL.subscriptionFromFile("graphql/subscription/issueToIssueComment"))
@Tags("lifecycle", "issue")
export class IssueToIssueCommentLifecycle
    extends CommentLifecycleHandler<graphql.IssueToIssueCommentLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.IssueToIssueCommentLifecycle.Subscription>):
        [graphql.IssueToIssueCommentLifecycle.Comments[], graphql.IssueToIssueCommentLifecycle.Issue,
            any, graphql.IssueToIssueCommentLifecycle.Repo, boolean] {

        const issue = event.data.Issue[0];
        if (issue) {
            return [issue.comments.sort((c1, c2) =>
                c1.timestamp.localeCompare(c2.timestamp)), issue, null, _.get(issue, "repo"), true];
        } else {
            return [null, null, null, null, true];
        }
    }
}

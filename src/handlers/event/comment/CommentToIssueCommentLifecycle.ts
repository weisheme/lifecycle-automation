import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { ChatTeam } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { CommentLifecycleHandler } from "./CommentLifecycle";

/**
 * Send a lifecycle message on Comment events.
 */
@EventHandler("Send a lifecycle message on Comment events",
    GraphQL.subscriptionFromFile("graphql/subscription/commentToIssueComment"))
@Tags("lifecycle", "issue comment", "comment")
export class CommentToIssueCommentLifecycle
    extends CommentLifecycleHandler<graphql.CommentToIssueCommentLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.CommentToIssueCommentLifecycle.Subscription>)
        : [graphql.CommentToIssueCommentLifecycle.Comment[], graphql.CommentToIssueCommentLifecycle.Issue,
            any, graphql.CommentToIssueCommentLifecycle.Repo, boolean] {

        const comment = _.get(event, "data.Comment[0]");
        return [[comment], _.get(comment, "issue"), null, _.get(comment, "issue.repo"), false];
    }

    protected extractChatTeams(event: EventFired<graphql.CommentToIssueCommentLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Comment[0].issue.repo.org.team.chatTeams");
    }
}

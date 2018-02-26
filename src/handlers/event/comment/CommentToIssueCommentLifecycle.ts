import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import { chatTeamsToPreferences } from "../../../lifecycle/util";
import * as graphql from "../../../typings/types";
import { CommentCardLifecycleHandler, CommentLifecycleHandler } from "./CommentLifecycle";

/**
 * Send a lifecycle message on Comment events.
 */
@EventHandler("Send a lifecycle message on Comment events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/commentToIssueComment", __dirname))
@Tags("lifecycle", "issue comment", "comment")
export class CommentToIssueCommentLifecycle
    extends CommentLifecycleHandler<graphql.CommentToIssueCommentLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.CommentToIssueCommentLifecycle.Subscription>)
        : [graphql.CommentToIssueCommentLifecycle.Comment[], graphql.CommentToIssueCommentLifecycle.Issue,
            any, graphql.CommentToIssueCommentLifecycle.Repo, boolean] {

        const comment = _.get(event, "data.Comment[0]");
        return [[comment], _.get(comment, "issue"), null, _.get(comment, "issue.repo"), false];
    }

    protected extractPreferences(
        event: EventFired<graphql.CommentToIssueCommentLifecycle.Subscription>): { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.Comment[0].issue.repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on Comment events.
 */
@EventHandler("Send a lifecycle card on Comment events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/commentToIssueComment", __dirname))
@Tags("lifecycle", "issue comment", "comment")
export class CommentToIssueCommentCardLifecycle
    extends CommentCardLifecycleHandler<graphql.CommentToIssueCommentLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.CommentToIssueCommentLifecycle.Subscription>)
        : [graphql.CommentToIssueCommentLifecycle.Comment[], graphql.CommentToIssueCommentLifecycle.Issue,
        any, graphql.CommentToIssueCommentLifecycle.Repo, boolean] {

        const comment = _.get(event, "data.Comment[0]");
        return [[comment], _.get(comment, "issue"), null, _.get(comment, "issue.repo"), false];
    }

    protected extractPreferences(
        event: EventFired<graphql.CommentToIssueCommentLifecycle.Subscription>): { [teamId: string]: Preferences[] } {
        return {};
    }
}

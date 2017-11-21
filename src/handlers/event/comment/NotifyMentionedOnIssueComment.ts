import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { Action } from "@atomist/slack-messages";
import * as graphql from "../../../typings/types";
import { issueNotification } from "../../../util/notifications";
import { CommentGitHubIssue } from "../../command/github/CommentGitHubIssue";
import { ReactGitHubIssueComment } from "../../command/github/ReactGitHubIssueComment";

@EventHandler("Notify mentioned user in slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyMentionedOnIssueComment"))
@Tags("lifecycle", "issue comment", "notification")
export class NotifyMentionedOnIssueComment implements HandleEvent<graphql.NotifyMentionedOnIssueComment.Subscription> {

    public handle(event: EventFired<graphql.NotifyMentionedOnIssueComment.Subscription>, ctx: HandlerContext):
        Promise<HandlerResult> {

        const comment = event.data.Comment[0];
        const issue = comment.issue;

        if (issue) {
            const repo = issue.repo;
            return issueNotification(`${issue.number}/${comment._id}`, "New mention in comment on issue",
                comment.body, comment.by.login, issue, repo, ctx, createActions(comment))
                .then(_ => Success, failure);
        } else {
            return Promise.resolve(Success);
        }
    }
}

/**
 * Add comment and +1 action into the DM
 * @param {NotifyMentionedOnIssueComment.Comment} comment
 * @returns {Action[]}
 */
function createActions(comment: graphql.NotifyMentionedOnIssueComment.Comment): Action[] {

    const commentIssue = new CommentGitHubIssue();
    commentIssue.owner = comment.issue.repo.owner;
    commentIssue.repo = comment.issue.repo.name;
    commentIssue.issue = comment.issue.number;

    const reactComment = new ReactGitHubIssueComment();
    reactComment.owner = comment.issue.repo.owner;
    reactComment.repo = comment.issue.repo.name;
    reactComment.comment = comment.gitHubId;
    reactComment.reaction = "+1";

    return [
        buttonForCommand({ text: "Comment" }, commentIssue),
        buttonForCommand( { text: ":+1:" }, reactComment),
    ];
}

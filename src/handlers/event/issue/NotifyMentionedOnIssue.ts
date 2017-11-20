import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success, SuccessPromise,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { Action } from "@atomist/slack-messages";
import * as graphql from "../../../typings/types";
import {
    issueAssigneeNotification,
    issueNotification,
} from "../../../util/notifications";
import { CommentGitHubIssue } from "../../command/github/CommentGitHubIssue";
import { ReactGitHubIssue } from "../../command/github/ReactGitHubIssue";

@EventHandler("Notify mentioned user in slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyMentionedOnIssue"))
@Tags("lifecycle", "issue", "notification")
export class NotifyMentionedOnIssue implements HandleEvent<graphql.NotifyMentionedOnIssue.Subscription> {

    public handle(root: EventFired<graphql.NotifyMentionedOnIssue.Subscription>, ctx: HandlerContext):
        Promise<HandlerResult> {

        const issue = root.data.Issue[0];
        const repo = issue.repo;

        if (issue.number) {
            return issueNotification(issue.number.toString(), "New mention in issue",
                issue.body, issue.openedBy.login, issue, repo, ctx, createActions(issue))
                .then(_ => {
                    if (issue.assignees != null) {
                        return Promise.all(issue.assignees.map(a =>
                            issueAssigneeNotification(issue.number.toString(), "New assignment of issue", issue.body,
                                a, issue, repo, ctx)));
                    } else {
                        return Promise.resolve(null);
                    }
                })
                .then(() => Success, failure);
        } else {
            return SuccessPromise;
        }
    }
}

/**
 * Add comment and +1 action into the DM
 * @param {NotifyMentionedOnIssue.Issue} issue
 * @returns {Action[]}
 */
function createActions(issue: graphql.NotifyMentionedOnIssue.Issue): Action[] {

    const commentIssue = new CommentGitHubIssue();
    commentIssue.owner = issue.repo.owner;
    commentIssue.repo = issue.repo.name;
    commentIssue.issue = issue.number;

    const reactIssue = new ReactGitHubIssue();
    reactIssue.owner = issue.repo.owner;
    reactIssue.repo = issue.repo.name;
    reactIssue.issue = issue.number;
    reactIssue.reaction = "+1";

    return [
        buttonForCommand({ text: "Comment" }, commentIssue),
        buttonForCommand( { text: ":+1:" }, reactIssue),
    ];
}

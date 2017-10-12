import {
    EventHandler,
    Tags,
} from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    Failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import {
    issueAssigneeNotification,
    issueNotification,
} from "../../../util/notifications";

@EventHandler("Event handler that notifies mentioned user in slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyMentionedOnIssue"))
@Tags("lifecycle", "issue", "notification")
export class NotifyMentionedOnIssue implements HandleEvent<graphql.NotifyMentionedOnIssue.Subscription> {

    public handle(root: EventFired<graphql.NotifyMentionedOnIssue.Subscription>, ctx: HandlerContext):
        Promise<HandlerResult> {

        const repo = root.data.Issue[0].repo;
        const issue = root.data.Issue[0];

        return issueNotification(issue.number.toString(), "New mention in issue",
            issue.body, issue.openedBy.login, issue, repo, ctx)
            .then(_ => {
                if (issue.assignees != null) {
                    return Promise.all(issue.assignees.map(a =>
                        issueAssigneeNotification(issue.number.toString(), "New assignment of issue", issue.body,
                            a, issue, repo, ctx)));
                } else {
                    return Promise.resolve(null);
                }
            })
            .then(_ => Success)
            .catch(() => Failure);
    }
}

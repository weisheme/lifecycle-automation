import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import { Failure, HandleEvent, HandlerContext, HandlerResult, Success } from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { issueNotification } from "../../../util/notifications";

@EventHandler("Event handler that notifies mentioned user in slack",
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
                comment.body, comment.by.login, issue, repo, ctx)
                .then(_ => Success)
                .catch(() => Failure);
        } else {
            return Promise.resolve(Success);
        }
    }
}

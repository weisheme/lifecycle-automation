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
import * as graphql from "../../../typings/types";
import { prNotification } from "../../../util/notifications";

@EventHandler("Notify mentioned user in slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyMentionedOnPullRequestComment"))
@Tags("lifecycle", "pr comment", "notification")
export class NotifyMentionedOnPullRequestComment
    implements HandleEvent<graphql.NotifyMentionedOnPullRequestComment.Subscription> {

    public handle(event: EventFired<graphql.NotifyMentionedOnPullRequestComment.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {

        const comment = event.data.Comment[0];
        const pr = comment.pullRequest;

        if (pr) {
            return prNotification(`${pr.number}/${comment._id}`, "New mention in comment on pull request",
                comment.body, comment.by.login, pr, pr.repo, ctx)
                .then(_ => Success, failure);
        } else {
            return Promise.resolve(Success);
        }
    }
}

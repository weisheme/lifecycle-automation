import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import { Failure, HandleEvent, HandlerContext, HandlerResult, Success } from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { prNotification } from "../../../util/Notifications";

@EventHandler("Event handler that notifies mentioned user in slack",
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
                .then(_ => Success)
                .catch(() => Failure);
        } else {
            return Promise.resolve(Success);
        }
    }
}

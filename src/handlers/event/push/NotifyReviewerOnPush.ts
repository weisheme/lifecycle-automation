import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { reviewerNotification } from "../../../util/notifications";

/**
 * Event Handler that sends a DM to the reviewers of open and unmerged pull requests to notify them about new commits
 * on the pull request.
 *
 * Only reviewers of reviews that have had activity are being messaged; a review that is in requested state won't
 * trigger this notification.
 *
 * This DM can be disabled via the `@atomist configured dm` command.
 */
@EventHandler("Notify pull request reviewer about new commits",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyReviewerOnPush"))
@Tags("lifecycle", "pr", "notification")
export class NotifyReviewerOnPush implements HandleEvent<graphql.NotifyReviewerOnPush.Subscription> {

    public handle(event: EventFired<graphql.NotifyReviewerOnPush.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const push = event.data.Push[0];

        if (push.commits) {
            const commitWithPr = push.commits.find(
                c => c.pullRequests != null && c.pullRequests.length > 0);
            if (commitWithPr) {
                const pr = commitWithPr.pullRequests[0];
                const reviews = pr.reviews ? pr.reviews.filter(r => r.state !== "requested") : [];

                if (pr.state === "open" && reviews && reviews.length > 0) {
                    return Promise.all(reviews.map(r => reviewerNotification(push, pr, push.repo, r, ctx)))
                        .then(() => Success, failure);
                }
            }
        }
        return Promise.resolve(Success);
    }
}

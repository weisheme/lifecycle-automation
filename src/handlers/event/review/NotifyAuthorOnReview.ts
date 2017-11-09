import {
    EventFired,
    EventHandler,
    Failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as graphql from "../../../typings/types";
import { prAuthorReviewNotification } from "../../../util/notifications";

@EventHandler("Notify pull request authors in slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyAuthorOnReview"))
@Tags("lifecycle", "review", "notification")
export class NotifyAuthorOnReview implements HandleEvent<graphql.NotifyAuthorOnReview.Subscription> {

    public handle(root: EventFired<graphql.NotifyAuthorOnReview.Subscription>, ctx: HandlerContext):
        Promise<HandlerResult> {

        const review = root.data.Review[0];
        const pr = review.pullRequest;

        if (review.state === "approved" || review.state === "commented" || review.state === "changes_requested") {
            return prAuthorReviewNotification(`${pr.number}/${review._id}/${review.state}`, review, pr, pr.repo, ctx)
                .then(_ => Success)
                .catch(() => Failure);
        } else {
            return Promise.resolve(Success);
        }

    }
}

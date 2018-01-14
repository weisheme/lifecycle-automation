import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { ChatTeam } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { ReviewLifecycleHandler } from "./ReviewLifecycle";

/**
 * Send a lifecycle message on Review events.
 */
@EventHandler("Send a lifecycle message on Review events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/reviewToReview", __dirname))
@Tags("lifecycle", "review")
export class ReviewToReviewLifecycle extends ReviewLifecycleHandler<graphql.ReviewToReviewLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.ReviewToReviewLifecycle.Subscription>):
        [graphql.ReviewToReviewLifecycle.Review[], string] {

        return [event.data.Review, _.get(event, "data.Review[0].timestamp")];
    }

    protected extractChatTeams(event: EventFired<graphql.ReviewToReviewLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Review[0].pullRequest.repo.org.team.chatTeams");
    }
}

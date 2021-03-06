/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { subscription } from "@atomist/automation-client/graph/graphQL";
import * as graphql from "../../../typings/types";
import { prAuthorReviewNotification } from "../../../util/notifications";

@EventHandler("Notify pull request authors in slack", subscription("notifyAuthorOnReview"))
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

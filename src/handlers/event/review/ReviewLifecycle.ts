import { EventFired } from "@atomist/automation-client";
import {
    Lifecycle,
    LifecycleHandler,
} from "../../../lifecycle/Lifecycle";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import * as graphql from "../../../typings/types";
import { LifecyclePreferences } from "../preferences";
import { CommentActionContributor } from "./rendering/ReviewActionContributors";
import {
    ReviewDetailNodeRenderer,
    ReviewNodeRenderer,
} from "./rendering/ReviewNodeRenderers";

export abstract class ReviewLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const [reviews, timestamp] = this.extractNodes(event);

        if (reviews) {
            return reviews.map(review => {
                const nodes = [];
                let repo;
                if (review && review.pullRequest && review.pullRequest.repo) {
                    repo = review.pullRequest.repo;
                    nodes.push(review.pullRequest);
                    nodes.push(repo);
                }

                // PullRequest lifecycle starts with, drum roll, a PullRequest
                if (review != null) {
                    nodes.push(review);
                }

                // Verify that there is at least a pullrequest and repo node
                if (review == null || review.pullRequest == null) {
                    console.log(`Lifecycle event is missing review and/or repo node`);
                    return null;
                }

                const configuration: Lifecycle = {
                    name: LifecyclePreferences.review.id,
                    nodes,
                    renderers: [
                        new ReviewNodeRenderer(),
                        new ReviewDetailNodeRenderer(),
                        new FooterNodeRenderer((node: any) => node.pullRequest)],
                    contributors: [
                        new CommentActionContributor(),
                    ],
                    id: `review_lifecycle/${repo.owner}/${repo.name}/${review.pullRequest.number}/${review._id}`,
                    timestamp,
                    // #47 remove issue rewrite
                    // ttl: (1000 * 60 * 60 * 8).toString(),
                    channels: repo.channels.map(c => c.name),
                    extract: (type: string) => {
                        if (type === "repo") {
                            return repo;
                        } else if (type === "pullrequest") {
                            return review.pullRequest;
                        }
                        return null;
                    },
                };
                return configuration;
            });
        }

    }

    protected abstract extractNodes(event: EventFired<R>): [graphql.ReviewToReviewLifecycle.Review[], string];
}

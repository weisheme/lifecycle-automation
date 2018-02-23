import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { Action } from "@atomist/slack-messages/SlackMessages";
import {
    AbstractIdentifiableContribution,
    ActionContributor,
    RendererContext, SlackActionContributor,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";

export class CommentActionContributor extends AbstractIdentifiableContribution
    implements SlackActionContributor<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super("comment");
    }

    public supports(node: any): boolean {
        return node.pullRequest && (node.pullRequest as graphql.ReviewToReviewLifecycle.PullRequest).state === "open";
    }

    public buttonsFor(review: graphql.ReviewToReviewLifecycle.Review, context: RendererContext):
        Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons = [];

        if (context.rendererId === "reviewdetail") {
            buttons.push(buttonForCommand({ text: "Comment" }, "CommentGitHubIssue",
                { issue: review.pullRequest.number, repo: repo.name, owner: repo.owner }));
        }

        return Promise.resolve(buttons);
    }

    public menusFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        return Promise.resolve([]);
    }
}

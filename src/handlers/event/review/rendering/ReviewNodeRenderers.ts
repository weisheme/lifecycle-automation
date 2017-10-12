import { githubToSlack } from "@atomist/slack-messages/Markdown";
import {
    Action,
    Attachment,
    bold,
    SlackMessage,
    url,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import {
    AbstractIdentifiableContribution,
    NodeRenderer,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import {
    avatarUrl,
    linkGitHubUsers,
    linkIssues,
    prUrl,
    repoAndlabelsAndAssigneesFooter,
    reviewUrl,
    userUrl,
} from "../../../../util/helpers";

export class ReviewNodeRenderer extends AbstractIdentifiableContribution
    implements NodeRenderer<graphql.ReviewToReviewLifecycle.Review> {

    constructor() {
        super("review");
    }

    public supports(node: any): boolean {
        return node.pullRequest;
    }

    public render(review: graphql.ReviewToReviewLifecycle.Review, actions: Action[], msg: SlackMessage,
                  context: RendererContext): Promise<SlackMessage> {
        const repo = context.lifecycle.extract("repo");
        const pr = context.lifecycle.extract("pullrequest") as graphql.ReviewToReviewLifecycle.PullRequest;

        const state = (pr.state === "closed" ?
            ((pr.merged === true || pr.merged) ? "merged" : "closed") : "open");

        msg.text = `${url(reviewUrl(repo, pr, review), "New review")}`
            + ` on ${state} pull request ${bold(url(prUrl(repo, pr),
                `#${pr.number} ${pr.title}`))}`;
        msg.attachments = [];

        return Promise.resolve(msg);
    }
}

export class ReviewDetailNodeRenderer extends AbstractIdentifiableContribution
    implements NodeRenderer<graphql.ReviewToReviewLifecycle.Review> {

    constructor() {
        super("reviewdetail");
    }

    public supports(node: any): boolean {
        return node.pullRequest;
    }

    public render(review: graphql.ReviewToReviewLifecycle.Review, actions: Action[], msg: SlackMessage,
                  context: RendererContext): Promise<SlackMessage> {
        const repo = context.lifecycle.extract("repo");
        const pr = context.lifecycle.extract("pullrequest") as graphql.ReviewToReviewLifecycle.PullRequest;

        const state = (pr.state === "closed" ?
            ((pr.merged === true || pr.merged) ? "merged" : "closed") : "open");

        let color;
        let title;
        if (review.state === "approved") {
            title = "Approved";
            color = "#45B254";
        } else if (review.state === "changes_requested") {
            title = "Changes requested";
            color = "#D94649";
        } else {
            title = _.upperFirst(review.state);
            // color = "#cccc00";
        }

        const body = review.body ? githubToSlack(review.body) : review.body;
        return linkGitHubUsers(body, context.context)
            .then(b => {
                const attachment: Attachment = {
                    color,
                    title,
                    title_link: reviewUrl(repo, pr, review),
                    text: linkIssues(b, repo),
                    author_name: `@${review.by[0].login}`,
                    author_icon: avatarUrl(repo, review.by[0].login),
                    author_link: userUrl(repo, review.by[0].login),
                    fallback: `New review on #${pr.number} ${pr.title}`,
                    mrkdwn_in: ["text", "pretext"],
                    footer: repoAndlabelsAndAssigneesFooter(repo, pr.labels, pr.reviewers),
                    footer_icon: `https://images.atomist.com/rug/pull-request-${state}.png`,
                    actions,
                };
                msg.attachments.push(attachment);
                return Promise.resolve(msg);
            });
    }
}

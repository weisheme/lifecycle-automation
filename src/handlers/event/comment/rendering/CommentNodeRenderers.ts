import { githubToSlack } from "@atomist/slack-messages/Markdown";
import {
    Action,
    Attachment,
    bold,
    SlackMessage,
    url,
} from "@atomist/slack-messages/SlackMessages";
import {
    AbstractIdentifiableContribution,
    NodeRenderer,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import {
    avatarUrl,
    issueUrl,
    linkGitHubUsers,
    linkIssues,
    repoAndlabelsAndAssigneesFooter,
    userUrl,
} from "../../../../util/helpers";

export class IssueCommentNodeRenderer extends AbstractIdentifiableContribution
    implements NodeRenderer<graphql.IssueToIssueCommentLifecycle.Comments> {

    constructor() {
        super("issuecomment");
    }

    public supports(node: any): boolean {
        return node.issue && node.issue.title;
    }

    public render(node: graphql.IssueToIssueCommentLifecycle.Comments, actions: Action[], msg: SlackMessage,
                  context: RendererContext): Promise<SlackMessage> {
        const repo = context.lifecycle.extract("repo");
        const issue = context.lifecycle.extract("issue");

        // tslint:disable-next-line:variable-name
        let footer_icon;
        if (issue.state === "open") {
            footer_icon = "https://images.atomist.com/rug/issue-open.png";
        } else if (issue.state === "closed") {
            footer_icon = "https://images.atomist.com/rug/issue-closed.png";
        }

        return linkGitHubUsers(githubToSlack(node.body), context.context)
            .then(body => {
                const attachment: Attachment = {
                    pretext: `New comment on ${issue.state} issue ${bold(url(issueUrl(repo, issue, node),
                        `#${issue.number}: ${issue.title}`))}`,
                    text: linkIssues(body, repo),
                    author_name: `@${node.by.login}`,
                    author_icon: avatarUrl(repo, node.by.login),
                    author_link: userUrl(repo, node.by.login),
                    fallback: `New comment on ${issue.state} issue #${issue.number}: ${issue.title}`,
                    mrkdwn_in: ["text", "pretext"],
                    footer: repoAndlabelsAndAssigneesFooter(repo, issue.labels, issue.assignees),
                    footer_icon,
                    actions,
                };
                msg.attachments.push(attachment);
                return Promise.resolve(msg);
            });
    }
}

export class PullRequestCommentNodeRenderer extends AbstractIdentifiableContribution
    implements NodeRenderer<graphql.PullRequestToPullRequestCommentLifecycle.Comments> {

    constructor() {
        super("pullrequestcomment");
    }

    public supports(node: any): boolean {
        return node.pullRequest && node.pullRequest.title;
    }

    public render(node: graphql.PullRequestToPullRequestCommentLifecycle.Comments, actions: Action[], msg: SlackMessage,
                  context: RendererContext): Promise<SlackMessage> {
        const repo = context.lifecycle.extract("repo");
        const pr = context.lifecycle.extract("pullrequest");

        const state = (pr.state === "closed" ? (pr.merged === true ? "merged" : "closed") : "open");

        return linkGitHubUsers(githubToSlack(node.body), context.context)
            .then(body => {
                const attachment: Attachment = {
                    pretext: `New comment on ${state} pull request ${bold(url(issueUrl(repo, pr, node),
                        `#${pr.number}: ${pr.title}`))}`,
                    text: linkIssues(body, repo),
                    author_name: `@${node.by.login}`,
                    author_icon: avatarUrl(repo, node.by.login),
                    author_link: userUrl(repo, node.by.login),
                    fallback: `New comment on ${pr.state} issue #${pr.number}: ${pr.title}`,
                    mrkdwn_in: ["text", "pretext"],
                    footer: repoAndlabelsAndAssigneesFooter(repo, pr.labels, pr.assignees),
                    footer_icon: `https://images.atomist.com/rug/pull-request-${state}.png`,
                    actions,
                };
                msg.attachments.push(attachment);
                return Promise.resolve(msg);
            });
    }
}

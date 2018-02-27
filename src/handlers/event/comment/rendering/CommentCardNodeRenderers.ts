import { githubToSlack } from "@atomist/slack-messages/Markdown";
import {
    bold,
    url,
} from "@atomist/slack-messages/SlackMessages";
import {
    Action,
    addCollaborator,
    CardMessage,
} from "../../../../lifecycle/card";
import {
    AbstractIdentifiableContribution,
    CardNodeRenderer,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import {
    avatarUrl,
    issueUrl,
    linkGitHubUsers,
    linkIssues, prUrl,
    repoUrl,
} from "../../../../util/helpers";
import * as github from "../../../command/github/gitHubApi";

export class IssueCommentCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.IssueToIssueCommentLifecycle.Comments> {

    constructor() {
        super("issue_comment");
    }

    public supports(node: any): boolean {
        return node.issue && node.issue.title;
    }

    public render(node: graphql.IssueToIssueCommentLifecycle.Comments, actions: Action[], msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");
        const issue = context.lifecycle.extract("issue");

        // tslint:disable-next-line:variable-name
        let icon;
        if (issue.state === "open") {
            icon = "css://icon-issue-opened";
        } else if (issue.state === "closed") {
            icon = "css://icon-issue-closed";
        }

        return linkGitHubUsers(githubToSlack(node.body), context.context)
            .then(body => {

                msg.title = {
                    icon,
                    text: `New comment on ${issue.state} issue ${bold(url(issueUrl(repo, issue, node),
                        `#${issue.number}: ${issue.title}`))}`,
                };

                msg.shortTitle = `Issue Comment ${url(issueUrl(repo, issue, node),
                    `#${issue.number}: ${issue.title}`)}`;

                msg.body = {
                    avatar: avatarUrl(repo, node.by.login),
                    login: node.by.login,
                    text: linkIssues(body, repo),
                    ts: Date.parse(node.timestamp),
                };

                msg.correlations.push({
                    type: "repository",
                    icon: "css://icon-repo",
                    title: `${repo.owner}/${repo.name}`,
                    link: repoUrl(repo),
                });

                msg.correlations.push({
                    type: "issue",
                    icon,
                    title: `#${issue.number}`,
                    link: issueUrl(repo, issue),
                });

                msg.correlations.push({
                    type: "label",
                    icon: "css://icon-tag",
                    title: issue.labels.length <= 2 ? issue.labels.map(l => l.name).join(", ") : "Labels",
                    body: issue.labels.map(l => ({
                        icon: "css://icon-tag",
                        text: l.name,
                    })),
                });

                msg.comments = [];
                msg.reactions = [];

                msg.actions.push(...actions);

                return msg;
            }).then(card => {
                const api = github.api(context.orgToken);
                return api.reactions.getForIssueComment({
                    owner: repo.owner,
                    repo: repo.name,
                    id: node.gitHubId,
                    content: "+1",
                })
                .then(result => {
                    card.reactions = (result.data || []).map(r => ({
                        avatar: r.user.avatar_url,
                        login: r.user.login,
                        reaction: "+1",
                    }));

                    (result.data || []).forEach(c => addCollaborator(
                        {
                            login: c.user.login,
                            avatar: c.user.avatar_url,
                            link: c.user.html_url,
                        }, card));

                    return card;
                })
                .catch(err => msg);
            });
    }
}

export class PullRequestCommentCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PullRequestToPullRequestCommentLifecycle.Comments> {

    constructor() {
        super("pullrequest_comment");
    }

    public supports(node: any): boolean {
        return node.pullRequest && node.pullRequest.title;
    }

    public render(node: graphql.PullRequestToPullRequestCommentLifecycle.Comments, actions: Action[], msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");
        const pr = context.lifecycle.extract("pullrequest");

        const state = (pr.state === "closed" ? (pr.merged === true ? "merged" : "closed") : "open");

        return linkGitHubUsers(githubToSlack(node.body), context.context)
            .then(body => {

                msg.title = {
                    icon: `css://icon-merge`,
                    text: `New comment on ${state} pull request ${bold(url(issueUrl(repo, pr, node),
                        `#${pr.number}: ${pr.title}`))}`,
                };

                msg.shortTitle = `PR Comment ${url(issueUrl(repo, pr, node), `#${pr.number}: ${pr.title}`)}`;

                msg.body = {
                    avatar: avatarUrl(repo, node.by.login),
                    login: node.by.login,
                    text: linkIssues(body, repo),
                    ts: Date.parse(node.timestamp),
                };

                msg.correlations.push({
                    type: "repository",
                    icon: "css://icon-repo",
                    title: `${repo.owner}/${repo.name}`,
                    link: repoUrl(repo),
                });

                msg.correlations.push({
                    type: "pr",
                    icon: `css://icon-merge`,
                    title: `#${pr.number}`,
                    link: prUrl(repo, pr),
                });

                msg.comments = [];
                msg.reactions = [];

                msg.actions.push(...actions);

                return Promise.resolve(msg);
            }).then(card => {
                const api = github.api(context.orgToken);
                return api.reactions.getForIssueComment({
                    owner: repo.owner,
                    repo: repo.name,
                    id: node.gitHubId,
                    content: "+1",
                })
                .then(result => {
                    card.reactions = (result.data || []).map(r => ({
                        avatar: r.user.avatar_url,
                        login: r.user.login,
                        reaction: "+1",
                    }));

                    (result.data || []).forEach(c => addCollaborator(
                        {
                            login: c.user.login,
                            avatar: c.user.avatar_url,
                            link: c.user.html_url,
                        }, card));

                    return card;
                })
                .catch(err => msg);
            });
    }
}

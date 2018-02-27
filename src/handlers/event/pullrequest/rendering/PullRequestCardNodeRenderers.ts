import { githubToSlack } from "@atomist/slack-messages/Markdown";
import {
    url,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import { Action, CardMessage, Event } from "../../../../lifecycle/card";
import {
    AbstractIdentifiableContribution,
    CardNodeRenderer,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import {
    avatarUrl,
    branchUrl, issueUrl,
    linkGitHubUsers, prUrl,
    userUrl,
} from "../../../../util/helpers";
import { renderCommitMessage } from "../../push/rendering/PushCardNodeRenderers";

export class PullRequestCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super("pull_request");
    }

    public supports(node: any): boolean {
        return node.baseBranchName;
    }

    public render(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, actions: Action[], msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");
        const state = (pr.state === "closed" ? (pr.merged === true ? "merged" : "closed") : "open");

        let ts;
        let text;
        const branchName = pr.branchName;
        const baseBranchName = pr.baseBranchName;
        const commits = pr.commits.length;
        const commitText = commits === 10 ? "commits" : (commits > 1 ? `${commits} commits` : "1 commit");

        if (state === "open") {
            text = `${url(userUrl(repo, pr.author.login),
                `@${pr.author.login}`)} wants to merge ${commitText} from ${url(branchUrl(repo, branchName),
                branchName)} to ${url(branchUrl(repo, baseBranchName), baseBranchName)}`;
            ts = pr.createdAt;
        } else if (state === "closed") {
            text = "Closed pull request";
            ts = pr.mergedAt;
        } else if (state === "merged") {
            text = `${url(userUrl(repo, pr.merger.login),
                `@${pr.merger.login}`)} merged ${commitText} from ${url(branchUrl(repo, branchName),
                branchName)} to ${url(branchUrl(repo, baseBranchName), baseBranchName)}`;
            ts = pr.mergedAt;
        }

        return linkGitHubUsers(githubToSlack(pr.body), context.context)
            .then(body => {

                msg.title = {
                    icon: `css://icon-merge`,
                    text,
                };

                msg.shortTitle = `PR ${url(prUrl(repo, pr), `#${pr.number}: ${pr.title}`)}`;

                msg.body = {
                    avatar: avatarUrl(repo, pr.author.login),
                    login: pr.author.login,
                    text: body,
                    ts: Date.parse(pr.timestamp),
                };

                msg.correlations.push({
                    type: "repository",
                    icon: "css://icon-repo",
                    title: `${repo.owner}/${repo.name}/${pr.branch.name}`,
                    link: branchUrl(repo, pr.branch.name),
                });

                msg.actions.push(...actions);

                return Promise.resolve(msg);
            });
    }
}

export class CommitCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super("commit");
    }

    public supports(node: any): boolean {
        if (node.baseBranchName) {
            const pr = node as graphql.PullRequestToPullRequestLifecycle.PullRequest;
            return pr.state === "open"
                && pr.commits != null && pr.commits.length > 0;
        } else {
            return false;
        }
    }

    public render(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, actions: Action[], msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");
        const commits = _.uniqBy(pr.commits, c => c.sha).sort((c1, c2) => c2.timestamp.localeCompare(c1.timestamp));

        msg.correlations.push({
            type: "commit",
            title: commits.length.toString(),
            icon: "css://icon-git-commit",
            body: commits.map(c => ({
                icon: avatarUrl(repo, c.author.login),
                text: renderCommitMessage(c, repo),
            })),
        });

        msg.events.push(...commits.map(c => {
            const e: Event = {
                icon: avatarUrl(repo, c.author.login),
                text: renderCommitMessage(c, repo),
                ts: Date.parse(c.timestamp),
            };
            if (c.sha === pr.head.sha) {
                e.actions = actions;
            }
            return e;
        }));

        return Promise.resolve(msg);
    }
}

export class StatusCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super("status");
    }

    public supports(node: any): boolean {
        return node.baseBranchName && node.commits
            && node.commits.length > 0 && node.commits.some(c => c.statuses && c.statuses.length > 0);
    }

    public render(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, actions: Action[], msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        // List all the statuses on the head commit
        const commits = pr.commits.sort((c1, c2) => c2.timestamp.localeCompare(c1.timestamp))
            .filter(c => c.statuses != null && c.statuses.length > 0);
        const statuses = commits[0].statuses;
        if (statuses.length === 0) {
            return Promise.resolve(msg);
        }

        const success = statuses.filter(s => s.state === "success").length;

        // Now each one
        const body = statuses.sort((s1, s2) => s1.context.localeCompare(s2.context)).map(s => {

            let icon;
            if (s.state === "success") {
                icon = "css://icon-status-check";
            } else if (s.state === "pending") {
                icon = "css://icon-status-check alert";
            } else {
                icon = "css://icon-status-check fail";
            }

            let text;
            if (s.targetUrl != null && s.targetUrl.length > 0) {
                text = `${s.description} | ${url(s.targetUrl, s.context)}`;
            } else {
                text = `${s.description} | ${s.context}`;
            }

            msg.events.push({
                icon,
                text,
                ts: Date.parse(s.timestamp),
            });

            return {
                icon,
                text,
            };
        });

        msg.correlations.push({
            type: "status",
            icon: "css://icon-status-check",
            title: `${success}/${statuses.length}`,
            body,
        });

        msg.actions.push(...actions);

        return Promise.resolve(msg);
    }
}

export class ReviewCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super("review");
    }

    public supports(node: any): boolean {
        if (node.baseBranchName) {
            const pr = node as graphql.PullRequestToPullRequestLifecycle.PullRequest;
            return pr.state === "open"
                && pr.reviews
                && pr.reviews.some(r => r.by.some(l => l.login !== pr.author.login));
        } else {
            return false;
        }
    }

    public render(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, actions: Action[], msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");

        const reviews = pr.reviews.filter(r => r.by.some(l => l.login !== pr.author.login));
        const success = reviews.filter(s => s.state === "approved").length;

        msg.correlations.push({
            type: "review",
            icon: "css://icon-review",
            title: `${success}/${reviews.length}`,
            body: reviews.map(r => ({
                icon: avatarUrl(repo, r.by[0].login),
                text: r.body,
            })),
        });

        msg.actions.push(...actions);

        return Promise.resolve(msg);
    }
}

export class BuildCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super("build");
    }

    public supports(node: any): boolean {
        if (node.builds && node.commits) {
            const pr = node as graphql.PullRequestToPullRequestLifecycle.PullRequest;
            return pr.state === "open";
        } else {
            return false;
        }
    }

    public render(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, actions: Action[], msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {

        const running = (pr.builds || []).some(b => b.status === "started");
        const passed = (pr.builds || []).filter(b => b.status === "passed");
        const failed = (pr.builds || []).some(b => b.status === "broken" || b.status === "failed");

        let icon;
        if (running) {
            icon = "css://icon-circle-check";
        } else if (failed) {
            icon = "css://icon-circle-check alert";
        } else {
            icon = "css://icon-circle-check fail";
        }

        msg.correlations.push({
            type: "build",
            icon,
            title: `${passed.length}/${pr.builds.length}`,
            body: (pr.builds || []).map(b => {
                let i;
                if (b.status === "passed") {
                    i = "css://icon-circle-check";
                } else if (b.status === "started") {
                    i = "css://icon-circle-check alert";
                } else {
                    i = "css://icon-circle-check fail";
                }

                let title;
                if (isNaN(+b.name)) {
                    title = b.name;
                } else {
                    title = `Build #${b.name}`;
                }

                msg.events.push({
                    icon: i,
                    text: title,
                    ts: Date.parse(b.timestamp),
                });

                return {
                    icon,
                    text: title,
                };
            }),
        });

        msg.actions.push(...actions);

        return Promise.resolve(msg);
    }
}

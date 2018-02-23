import { logger } from "@atomist/automation-client/internal/util/logger";
import {
    bold,
    url,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import {
    Action,
    addCollaborator,
    CardMessage,
    Event,
} from "../../../../lifecycle/card";
import {
    AbstractIdentifiableContribution,
    CardNodeRenderer,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import {
    avatarUrl,
    branchUrl,
    commitUrl,
    extractLinkedIssues,
    prUrl,
    repoSlug,
    tagUrl,
    truncateCommitMessage,
    userUrl,
} from "../../../../util/helpers";
import { Domain } from "../PushLifecycle";

export class PushCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super("push");
    }

    public supports(node: any): boolean {
        return node.after;
    }

    public render(push: graphql.PushToPushLifecycle.Push,
                  actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");

        msg.ts = Date.parse(push.timestamp);

        msg.title = {
            icon: "https://images.atomist.com/rug/commit.png",
            text: `${url(userUrl(repo, push.after.author.login),
                `@${push.after.author.login}`)} pushed ${push.commits.length} new ${
                (push.commits.length > 1 ? "commits" : "commit")} ` +
            `to ${bold(url(branchUrl(repo, push.branch), `${repoSlug(repo)}/${push.branch}`))}`,
        };

        msg.correlations.push({
            type: "repository",
            icon: "https://images.atomist.com/rug/database.png",
            title: `${repo.owner}/${repo.name}/${push.branch}`,
            link: branchUrl(repo, push.branch),
        });

        return Promise.resolve(msg);
    }
}

export class CommitCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super("commit");
    }

    public supports(node: any): boolean {
        return node.after;
    }

    public render(push: graphql.PushToPushLifecycle.Push,
                  actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");
        const commits = _.uniqBy(push.commits, c => c.sha)
            .sort((c1, c2) => c2.timestamp.localeCompare(c1.timestamp));

        msg.body = {
            avatar: avatarUrl(repo, push.after.author.login),
            login: push.after.author.login,
            text: renderCommitMessage(push.after, repo),
            hint: (commits.length > 2
                ? `+ ${commits.length - 1 } more commits` : (commits.length === 2 ? "+ 1 more commit" : "")),
        };

        msg.correlations.push({
            type: "commit",
            title: commits.length.toString(),
            icon: "https://images.atomist.com/rug/commit.png",
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
            if (c.sha === push.after.sha) {
                e.actions = actions;
            }
            return e;
        }));

        return Promise.resolve(msg);
    }
}

export class BuildCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Builds> {

    constructor() {
        super("build");
    }

    public supports(node: any): boolean {
        return node.status;
    }

    public render(build: graphql.PushToPushLifecycle.Builds,
                  actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        let icon;
        if (build.status === "passed") {
            icon = "https://images.atomist.com/rug/atomist_build_passed.png";
        } else if (build.status === "started") {
            icon = "https://images.atomist.com/rug/atomist_build_started.gif";
        } else {
            icon = "https://images.atomist.com/rug/atomist_build_failed.png";
        }

        let title;
        // build.name might be a number in which case we should render "Build #<number>".
        // It it isn't a number just render the build.name
        if (isNaN(+build.name)) {
            title = build.name;
        } else {
            title = `Build #${build.name}`;
        }

        msg.correlations.push({
            type: "build",
            title,
            link: build.buildUrl,
            icon,
        });

        msg.events.push({
           icon,
           text: `${build.buildUrl ? url(build.buildUrl, title) : title}`,
           ts: Date.parse(build.timestamp),
           actions,
        });

        return Promise.resolve(msg);
    }
}

export class TagCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Tags> {

    constructor() {
        super("tag");
    }

    public supports(node: any): boolean {
        return node.after && node.after.tags;
    }

    public render(push: graphql.PushToPushLifecycle.Push,
                  actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");

        msg.correlations.push({
            type: "tag",
            icon: "https://images.atomist.com/rug/tag-outline.png",
            title: push.after.tags ? push.after.tags.length.toString() : "0",
            body: push.after.tags.map(t => ({
                text: `${url(tagUrl(repo, t))}`,
            })),
        });

        msg.events.push(...push.after.tags.map(t => ({
            icon: "https://images.atomist.com/rug/tag-outline.png",
            text: url(tagUrl(repo, t), `Tag ${t.name}`),
            ts: Date.parse(t.timestamp),
        })));

        msg.events.push(...push.after.tags.filter(t => t.release).map(t => ({
            icon: "https://images.atomist.com/rug/tag-outline.png", // TODO CD fix icon
            text: url(tagUrl(repo, t), `Release ${t.release.name}`),
            ts: Date.parse(t.release.timestamp),
        })));

        return Promise.resolve(msg);
    }
}

export class ApplicationCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<Domain> {

    constructor() {
        super("application");
    }

    public supports(node: any): boolean {
        return node.name && node.apps;
    }

    public render(domain: Domain, actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {

        const domains = context.lifecycle.extract("domains") as Domain[];
        const running = domain.apps.filter(a => a.state === "started" || a.state === "healthy").length;
        const stopped = domain.apps.filter(a => a.state === "stopping").length;
        const unhealthy = domain.apps.filter(a => a.state === "unhealthy").map(a => a.host);

        const domainMessage = [];
        if (running > 0) {
            domainMessage.push(`${running} started`);
        }
        if (stopped > 0) {
            domainMessage.push(`${stopped} stopped`);
        }
        if (unhealthy.length > 0) {
            domainMessage.push(`${unhealthy.length} unhealthy (\`${unhealthy.join(", ")}\`)`);
        }

        msg.correlations.push({
            type: "application",
            icon: "https://images.atomist.com/rug/tasks.png",
            title: `${domain.name}`,
            body: domainMessage.map(d => ({
                text: d,
            })),
        });

        return Promise.resolve(msg);
    }
}

export class IssueCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super("issue");
    }

    public supports(node: any): boolean {
        return node.after;
    }

    public render(push: graphql.PushToPushLifecycle.Push,
                  actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");
        const message = push.commits.map(c => c.message).join("\n");

        const issues = [];
        return extractLinkedIssues(message, repo, issues, context.context)
            .then(ri => {
                let totalCount = 0;
                let closedCount = 0;

                const body = [];
                ri.issues.forEach(i => {
                    if (issues.indexOf(i.number) < 0) {
                        body.push({
                            text: `#${i.number}: ${truncateCommitMessage(i.title, repo)}`,
                            icon: `https://images.atomist.com/rug/issue-${i.state}.png`,
                        });
                        totalCount++;
                        if (i.state === "closed") {
                            closedCount++;
                        }
                        issues.push(i.number);
                        addCollaborator(
                            {
                                avatar: avatarUrl(repo, i.openedBy.login),
                                link: userUrl(repo, i.openedBy.login),
                                login: i.openedBy.login,
                            },
                            msg);
                    }
                });
                ri.prs.forEach(pr => {
                    if (issues.indexOf(pr.number) < 0) {
                        const state = (pr.state === "closed" ? (pr.merged ? "merged" : "closed") : "open");
                        body.push({
                            text: `#${pr.number}: ${truncateCommitMessage(pr.title, repo)}`,
                            icon: `https://images.atomist.com/rug/pull-request-${state}.png`,
                        });
                        totalCount++;
                        if (pr.state === "closed") {
                            closedCount++;
                        }
                        issues.push(pr.number);
                        addCollaborator(
                            {
                                avatar: avatarUrl(repo, pr.author.login),
                                link: userUrl(repo, pr.author.login),
                                login: pr.author.login,
                            },
                            msg);
                    }
                });

                if (totalCount > 0) {
                    msg.correlations.push({
                        type: "issue",
                        icon: "https://images.atomist.com/rug/issue-open.png",
                        title: `${closedCount}/${totalCount}`,
                        body,
                    });
                }
                return Promise.resolve(msg);
            });
    }
}

export class PullRequestCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super("pullrequest");
    }

    public supports(node: any): boolean {
        return node.branch;
    }

    public render(node: graphql.PushToPushLifecycle.Push,
                  actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo") as graphql.PushToPushLifecycle.Repo;

        // Make sure we only attempt to render PR for non-default branch pushes
        if (node.branch === (repo.defaultBranch || "master")) {
            return Promise.resolve(msg);
        }

        return context.context.graphClient.executeQueryFromFile<graphql.OpenPr.Query, graphql.OpenPr.Variables>(
            "../../../../graphql/query/openPr",
            { repo: repo.name, owner: repo.owner, branch: node.branch },
            {},
            __dirname)
            .then(result => {
                const pr = _.get(result, "Repo[0].branches[0].pullRequests[0]") as graphql.OpenPr.PullRequests;
                if (pr) {
                    const state = (pr.state === "closed" ? (pr.merged ? "merged" : "closed") : "open");

                    msg.correlations.push({
                       type: "pullrequest",
                       icon: `https://images.atomist.com/rug/pull-request-${state}.png`,
                       title: `#${pr.number}`,
                       link: prUrl(repo, pr),
                    });

                    // store on the context
                    context.set("open_pr", `${repo.owner}/${repo.name}#${pr.number}`);
                }
                return msg;
            })
            .catch(err => {
                logger.error("Error occurred running GraphQL query: %s", err);
                return msg;
            });
    }
}

export function renderCommitMessage(commitNode: graphql.PushToPushLifecycle.Commits,
                                    repo: graphql.PushToPushLifecycle.Repo): string {
    // Cut commit to 50 chars of first line
    const m = truncateCommitMessage(commitNode.message, repo);
    return "`" + url(commitUrl(repo, commitNode), commitNode.sha.substring(0, 7)) + "` " + m;
}

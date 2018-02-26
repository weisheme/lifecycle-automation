import { githubToSlack } from "@atomist/slack-messages/Markdown";
import {
    bold,
    url,
} from "@atomist/slack-messages/SlackMessages";
import {
    Action,
    CardMessage,
} from "../../../../lifecycle/card";
import {
    AbstractIdentifiableContribution,
    CardNodeRenderer,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import {
    avatarUrl, branchUrl,
    issueUrl,
    linkGitHubUsers,
    linkIssues, repoUrl,
    userUrl,
} from "../../../../util/helpers";
import { renderCommitMessage } from "../../push/rendering/PushCardNodeRenderers";

export class IssueCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super("issue");
    }

    public supports(node: any): boolean {
        return node.title;
    }

    public render(node: graphql.IssueToIssueLifecycle.Issue,
                  actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");

        let title = `${bold(url(issueUrl(repo, node), `#${node.number.toString()}: ${node.title}`))}`;
        let icon;
        if (node.state === "open") {
            icon = "https://images.atomist.com/rug/issue-open.png";
            if (node.createdAt === node.updatedAt) {
                title = `${url(userUrl(repo, node.openedBy.login),
                    `@${node.openedBy.login}`)} created issue ${title}`;
            } else {
                title = `Updated issue ${title}`;
            }
        } else if (node.state === "closed") {
            icon = "https://images.atomist.com/rug/issue-closed.png";
            if (node.closedAt === node.updatedAt) {
                if (node.closedBy != null && node.closedBy.login != null) {
                    title = `${url(userUrl(repo, node.closedBy.login),
                        `@${node.closedBy.login}`)} closed issue ${title}`;
                } else {
                    title = `Closed issue ${title}`;
                }
            } else {
                title = `Updated issue ${title}`;
            }
        }

        return linkGitHubUsers(githubToSlack(node.body), context.context)
            .then(body => {
                msg.title = {
                    icon,
                    text: title,
                };

                msg.body = {
                    avatar: avatarUrl(repo, node.openedBy.login),
                    login: node.openedBy.login,
                    text: linkIssues(body, repo),
                };

                msg.correlations.push({
                    type: "repository",
                    icon: "https://images.atomist.com/rug/database.png",
                    title: `${repo.owner}/${repo.name}`,
                    link: repoUrl(repo),
                });

                msg.correlations.push({
                    type: "commit",
                    icon: "https://images.atomist.com/rug/commit.png",
                    title: node.resolvingCommits ? node.resolvingCommits.length.toString() : "0",
                    body: node.resolvingCommits ? node.resolvingCommits.map(c => ({
                        icon: avatarUrl(repo, c.author.login),
                        text: renderCommitMessage(c, repo),
                    })) : undefined,
                });

                msg.correlations.push({
                    type: "label",
                    icon: "https://images.atomist.com/rug/tag.png",
                    title: node.labels.length <= 2 ? node.labels.map(l => l.name).join(", ") : "Labels",
                    body: node.labels.map(l => ({
                        icon: "https://images.atomist.com/rug/tag.png",
                        text: l.name,
                    })),
                });

                msg.comments = [];
                msg.reactions = [];

                msg.actions.push(...actions);

                return Promise.resolve(msg);
            });
    }
}

export class MoreCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super("assign");
    }

    public supports(node: any): boolean {
        return node.title;
    }

    public render(node: graphql.IssueToIssueLifecycle.Issue,
                  actions: Action[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {
        msg.actions.push(...actions);
        return Promise.resolve(msg);
    }
}

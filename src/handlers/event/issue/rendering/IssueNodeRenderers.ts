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
import {
    avatarUrl,
    issueUrl,
    linkGitHubUsers,
    linkIssues,
    repoAndlabelsAndAssigneesFooter,
    userUrl,
} from "../../../../util/helpers";

export class IssueNodeRenderer extends AbstractIdentifiableContribution implements NodeRenderer<any> {

    constructor() {
        super("issue");
    }

    public supports(node: any): boolean {
        return node.title;
    }

    public render(node: any, actions: Action[], msg: SlackMessage, context: RendererContext): Promise<SlackMessage> {
        const repo = context.lifecycle.extract("repo");
        let color;
        let pretext;
        let fallback;
        // tslint:disable-next-line:variable-name
        let footer_icon;

        const title = `${bold(url(issueUrl(repo, node), `#${node.number.toString()}: ${node.title}`))}`;
        if (node.state === "open") {
            color = "#6cc644";
            footer_icon = "https://images.atomist.com/rug/issue-open.png";
            if (node.createdAt === node.updatedAt) {
                pretext = `New issue ${title}`;
                fallback = `New issue #${node.number.toString()}: ${node.title}`;
            } else {
                pretext = `Updated issue ${title}`;
                fallback = `Updated issue #${node.number.toString()}: ${node.title}`;
            }
        } else if (node.state === "closed") {
            color = "#bd2c00";
            footer_icon = "https://images.atomist.com/rug/issue-closed.png";
            if (node.closedAt === node.updatedAt) {
                if (node.closedBy != null && node.closedBy.login != null) {
                    pretext = `${url(userUrl(repo, node.closedBy.login), node.closedBy.login)} closed issue ${title}`;
                } else {
                    pretext = `Closed issue ${title}`;
                }
            } else {
                pretext = `Updated issue ${title}`;
            }
        }

        // tslint:disable-next-line:variable-name
        let author_name;
        // tslint:disable-next-line:variable-name
        let author_link;
        // tslint:disable-next-line:variable-name
        let author_icon;

        if (node.openedBy != null && node.openedBy.login != null) {
            const author = node.openedBy.login;
            author_name = `@${author}`;
            author_link = userUrl(repo, author);
            author_icon = avatarUrl(repo, author);
        }

        return linkGitHubUsers(githubToSlack(node.body), context.context)
            .then(body => {
                const attachment: Attachment = {
                    color,
                    pretext,
                    text: node.state !== "closed" ? linkIssues(body, repo) : undefined,
                    author_name,
                    author_icon,
                    author_link,
                    fallback,
                    mrkdwn_in: ["text", "pretext"],
                    footer: repoAndlabelsAndAssigneesFooter(repo, node.labels, node.assignees),
                    footer_icon,
                    actions,
                };
                msg.attachments.push(attachment);
                return Promise.resolve(msg);
            });
    }
}

export class MoreNodeRenderer extends AbstractIdentifiableContribution implements NodeRenderer<any> {

    constructor() {
        super("assign");
    }

    public supports(node: any): boolean {
        return node.title;
    }

    public render(node: any, actions: Action[], msg: SlackMessage, context: RendererContext): Promise<SlackMessage> {
        if (context.has("show_assign") && actions.length > 0) {
            msg.attachments.push({
                text: `:busts_in_silhouette: Assignees`,
                fallback: "Issue Assignment",
                actions,
            });
        }
        return Promise.resolve(msg);
    }
}

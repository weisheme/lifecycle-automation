import {
    Action,
    Attachment,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import {
    extractLinkedIssues,
    issueUrl,
    prUrl,
    truncateCommitMessage,
} from "../../util/helpers";
import {
    AbstractIdentifiableContribution,
    NodeRenderer,
    RendererContext,
} from "../Lifecycle";

export class ReferencedIssuesNodeRenderer extends AbstractIdentifiableContribution
    implements NodeRenderer<any> {

    constructor() {
        super("referencedissues");
    }

    public supports(node: any): boolean {
        return node.body;
    }

    public render(node: any, actions: Action[], msg: SlackMessage, context: RendererContext):
        Promise<SlackMessage> {
        const repo = context.lifecycle.extract("repo");
        const issues = [];

        return extractLinkedIssues(node.body, repo, context.context)
            .then(ri => {
                ri.issues.forEach(i => {
                    if (issues.indexOf(i.number) < 0) {
                        // tslint:disable-next-line:variable-name
                        const author_name = `#${i.number}: ${truncateCommitMessage(i.title, repo)}`;
                        const attachment: Attachment = {
                            author_name,
                            author_icon: `https://images.atomist.com/rug/issue-${i.state}.png`,
                            author_link: issueUrl(i.repo, i),
                            fallback: author_name,
                        };
                        msg.attachments.push(attachment);
                        issues.push(i.number);
                    }
                });
                ri.prs.forEach(pr => {
                    if (issues.indexOf(pr.number) < 0) {
                        const state = (pr.state === "closed" ? (pr.merged ? "merged" : "closed") : "open");
                        // tslint:disable-next-line:variable-name
                        const author_name = `#${pr.number}: ${truncateCommitMessage(pr.title, repo)}`;
                        const attachment: Attachment = {
                            author_name,
                            author_icon: `https://images.atomist.com/rug/pull-request-${state}.png`,
                            author_link: prUrl(pr.repo, pr),
                            fallback: author_name,
                        };
                        msg.attachments.push(attachment);
                        issues.push(pr.number);
                    }
                });
                /* if (ri.showMore) {
                    const attachment: Attachment = {
                        author_name: "Show more...",
                        author_link: issueUrl(repo, node),
                        fallback: "Show more..."
                    }
                    msg.attachments.push(attachment);
                } */
                return Promise.resolve(msg);
            });
    }
}

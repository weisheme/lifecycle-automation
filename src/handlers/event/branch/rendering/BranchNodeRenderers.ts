import { bold } from "@atomist/slack-messages";
import {
    Action,
    Attachment,
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
    branchUrl,
    repoUrl,
} from "../../../../util/helpers";

export class BranchNodeRenderer extends AbstractIdentifiableContribution
    implements NodeRenderer<graphql.BranchToBranchLifecycle.Branch> {

    constructor() {
        super("branch");
    }

    public supports(node: any): boolean {
        return node.repo && node.name !== node.repo.defaultBranch;
    }

    public render(branch: graphql.BranchToBranchLifecycle.Branch, actions: Action[], msg: SlackMessage,
                  context: RendererContext): Promise<SlackMessage> {
        const repo = context.lifecycle.extract("repo");
        const deleted = context.lifecycle.extract("deleted");
        const repoSlug = `${repo.owner}/${repo.name}`;
        const branchSlug = `${repoSlug}/${branch.name}`;
        const state = deleted && deleted === true ? "deleted" : "created";
        const prMerged = branch.pullRequests ?
            (branch.pullRequests.find(pr => pr.merged === true) ? "merged" : "closed") : "closed";

        let color;
        let text;
        let fallback;
        let icon;
        const ts = this.normalizeTimestamp(branch.timestamp);

        if (state === "deleted") {
            text = `Branch ${bold(url(repoUrl(repo), branchSlug))} deleted`;
            fallback = `Branch ${branchSlug} deleted`;
            if (prMerged === "merged") {
                color = "#6E5692";
            } else {
                color = "#BD2C00";
            }
            icon = `https://images.atomist.com/rug/pull-request-${prMerged}.png`;
        } else if (state === "created") {
            text = `New branch ${bold(url(branchUrl(repo, branch.name), branchSlug))} created`;
            fallback = `New Branch ${branchSlug} deleted`;
            color = "#6FC44C";
            icon = `https://images.atomist.com/rug/pull-request-open.png`;
        }

        const attachment: Attachment = {
            fallback,
            text,
            color,
            ts,
            footer_icon: icon,
            mrkdwn_in: ["text"],
            actions,
        };

        msg.attachments.push(attachment);
        return Promise.resolve(msg);
    }

    private normalizeTimestamp(timestamp: string): number {
        let pd = Date.now();
        try {
            const date = Date.parse(timestamp);
            if (!isNaN(date)) {
                pd = date;
            }
        } catch (e) {
            // Ignore
        }
        return Math.floor(pd / 1000);
    }
}

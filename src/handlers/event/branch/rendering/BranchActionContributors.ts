import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { Action } from "@atomist/slack-messages/SlackMessages";
import {
    AbstractIdentifiableContribution,
    ActionContributor,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import { RaiseGitHubPullRequest } from "../../../command/github/RaiseGitHubPullRequest";
import { LifecycleActionPreferences } from "../../preferences";

export class RaisePrActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.BranchToBranchLifecycle.Branch> {

    constructor() {
        super(LifecycleActionPreferences.branch.raise_pullrequest.id);
    }

    public supports(node: any): boolean {
        return (node.deleted === null || node.deleted === false)
            && node.pullRequests == null || (node.pullRequests && node.pullRequests.length === 0);
    }

    public buttonsFor(node: graphql.BranchToBranchLifecycle.Branch, context: RendererContext): Promise<Action[]> {
        const actions = [];

        if (context.rendererId === "branch") {
            const handler = new RaiseGitHubPullRequest();
            handler.owner = node.repo.owner;
            handler.repo = node.repo.name;
            handler.head = node.name;
            handler.base = node.repo.defaultBranch || "master";
            handler.title = node.commit.message;
            actions.push(buttonForCommand({ text: "Raise PR" }, handler));
        }
        return Promise.resolve(actions);
    }

    public menusFor(node: graphql.BranchToBranchLifecycle.Branch, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }
}

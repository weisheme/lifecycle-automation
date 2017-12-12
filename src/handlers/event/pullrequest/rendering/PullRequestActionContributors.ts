import { ApolloGraphClient } from "@atomist/automation-client/graph/ApolloGraphClient";
import {
    buttonForCommand,
    menuForCommand,
    MenuSpecification,
} from "@atomist/automation-client/spi/message/MessageClient";
import { Action } from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import {
    AbstractIdentifiableContribution,
    ActionContributor,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import { isGenerated } from "../../../../util/helpers";
import { LifecycleActionPreferences } from "../../preferences";
import { isPrTagged } from "../autoMerge";

export class MergeActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super(LifecycleActionPreferences.pull_request.merge.id);
    }

    public supports(node: any): boolean {
        if (node.baseBranchName) {
            const pr = node as graphql.PullRequestToPullRequestLifecycle.PullRequest;
            return pr.state === "open" && (pr.reviews == null || !pr.reviews.some(r => r.state !== "approved"));
        } else {
            return false;
        }
    }

    public buttonsFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons: Action[] = [];

        if (context.rendererId === "status") {
            const mergeButtons = this.mergePRActions(pr, repo);

            const commits = pr.commits.sort((c1, c2) => c2.timestamp.localeCompare(c1.timestamp))
                .filter(c => c.statuses != null && c.statuses.length > 0);
            if (commits.length > 0) {
                const commit = commits[0];
                if (!commit.statuses.some(s => s.state !== "success")) {
                    buttons.push(...mergeButtons);
                }
            } else {
                buttons.push(...mergeButtons);
            }
        }
        return Promise.resolve(buttons);
    }

    public menusFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        return Promise.resolve([]);
    }

    private mergePRActions(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                           repo: graphql.PullRequestToPullRequestLifecycle.Repo): Action[] {
        const buttons: Action[] = [];
        const mergeMethods = {
            merge: undefined,
            squash: undefined,
            rebase: undefined,
        };
        const commitMessage = `Merge pull request #${pr.number}`;
        if (repo.allowMergeCommit === true) {
            mergeMethods.merge = { method: "Merge", commitMessage };
        }
        if (repo.allowSquashMerge === true && !isGenerated(pr)) {
            mergeMethods.squash = { method: "Squash and Merge",
                commitMessage: pr.commits.map(c => `* ${c.message}`).join("\n")};
        }
        if (repo.allowRebaseMerge === true && !isGenerated(pr)) {
            mergeMethods.rebase = { method: "Rebase and Merge", commitMessage };
        }
        if (repo.allowMergeCommit === undefined
            && repo.allowSquashMerge === undefined
            && repo.allowRebaseMerge === undefined) {
            mergeMethods.merge = { method: "Merge", commitMessage };
        }

        _.forIn(mergeMethods, (v, k) => {
            if (v) {
                buttons.push(buttonForCommand({ text: v.method }, "MergeGitHubPullRequest",
                {
                    issue: pr.number,
                    repo: repo.name,
                    owner: repo.owner,
                    title: pr.title,
                    message: v.commitMessage,
                    mergeMethod: k,
                    sha: pr.head.sha,
                }));
            }
        });

        return buttons;
    }

}

export class AutoMergeActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super(LifecycleActionPreferences.pull_request.auto_merge.id);
    }

    public supports(node: any): boolean {
        if (isGenerated(node)) {
            return false;
        } else if (node.baseBranchName) {
            const pr = node as graphql.PullRequestToPullRequestLifecycle.PullRequest;
            return pr.state === "open" && !isPrTagged(pr);
        } else {
            return false;
        }
    }

    public buttonsFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                      context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons = [];

        if (context.rendererId === "pull_request") {
            buttons.push(buttonForCommand({ text: "Enable Auto Merge" }, "EnableGitHubPullRequestAutoMerge",
                {
                    repo: repo.name,
                    owner: repo.owner,
                    issue: pr.number,
                }));
        }

        return Promise.resolve(buttons);
    }

    public menusFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                    context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }
}

export class ApproveActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super(LifecycleActionPreferences.pull_request.approve.id);
    }

    public supports(node: any): boolean {
        if (isGenerated(node)) {
            return false;
        } else if (node.baseBranchName) {
            const pr = node as graphql.PullRequestToPullRequestLifecycle.PullRequest;
            return pr.state === "open"
                && pr.commits != null && pr.commits.length > 0;
        } else {
            return false;
        }
    }

    public buttonsFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                      context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons = [];

        if (context.rendererId === "status") {
            const commits = pr.commits.sort((c1, c2) => c2.timestamp.localeCompare(c1.timestamp))
                .filter(c => c.statuses != null && c.statuses.length > 0);

            if (commits.length > 0 && commits[0].statuses != null) {
                const commit = commits[0];
                commit.statuses.filter(s => s.context === "fingerprint/atomist" && s.state === "failure").forEach(s => {
                    buttons.push(buttonForCommand({ text: "Approve" }, "ApproveGitHubCommit",
                        {
                            repo: repo.name,
                            owner: repo.owner,
                            shas: commit.sha,
                            targetUrl: s.targetUrl,
                            description: s.description,
                        }));
                });
            }
        }

        return Promise.resolve(buttons);
    }

    public menusFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                    context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }
}

export class DeleteActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super(LifecycleActionPreferences.pull_request.delete.id);
    }

    public supports(node: any): boolean {
        if (node.baseBranchName) {
            const pr = node as graphql.PullRequestToPullRequestLifecycle.PullRequest;
            return pr.state === "closed" && pr.branch != null
                && (pr.branch.deleted == null || pr.branch.deleted.toString() === "false");

        } else {
            return false;
        }
    }

    public buttonsFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons = [];

        if (context.rendererId === "pull_request") {
            buttons.push(buttonForCommand({ text: "Delete Branch" }, "DeleteGitHubBranch",
                { branch: pr.branch.name, repo: repo.name, owner: repo.owner }));
        }

        return Promise.resolve(buttons);
    }

    public menusFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        return Promise.resolve([]);
    }
}

export class CommentActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super(LifecycleActionPreferences.pull_request.comment.id);
    }

    public supports(node: any): boolean {
        if (isGenerated(node)) {
            return false;
        } else {
            return node.baseBranchName
                && (node as graphql.PullRequestToPullRequestLifecycle.PullRequest).state === "open";
        }
    }

    public buttonsFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons = [];

        if (context.rendererId === "pull_request") {
            buttons.push(buttonForCommand({ text: "Comment" }, "CommentGitHubIssue",
                { issue: pr.number, repo: repo.name, owner: repo.owner }));
        }

        return Promise.resolve(buttons);
    }

    public menusFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        return Promise.resolve([]);
    }
}

export class ThumbsUpActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super(LifecycleActionPreferences.pull_request.thumps_up.id);
    }

    public supports(node: any): boolean {
        if (isGenerated(node)) {
            return false;
        } else {
            return node.baseBranchName
                && (node as graphql.PullRequestToPullRequestLifecycle.PullRequest).state === "open";
        }
    }

    public buttonsFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons = [];

        if (context.rendererId === "pull_request") {
            buttons.push(buttonForCommand({ text: ":+1:" }, "ReactGitHubIssue",
                { reaction: "+1", issue: pr.number, repo: repo.name, owner: repo.owner }));
        }

        return Promise.resolve(buttons);
    }

    public menusFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                    context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }
}

export class AssignReviewerActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PullRequestToPullRequestLifecycle.PullRequest> {

    constructor() {
        super(LifecycleActionPreferences.pull_request.assign_reviewer.id);
    }

    public supports(node: any): boolean {
        if (isGenerated(node)) {
            return false;
        } else {
            return node.baseBranchName
                && (node as graphql.PullRequestToPullRequestLifecycle.PullRequest).state === "open";
        }
    }

    public buttonsFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest, context: RendererContext):
        Promise<Action[]> {
        const repo = context.lifecycle.extract("repo") as graphql.PullRequestToPullRequestLifecycle.Repo;

        if (context.rendererId === "pull_request") {
            if (repo.org && repo.org.provider && repo.org.provider
                && repo.org.provider.apiUrl == null && context.orgToken) {
                return this.assiggnReviewMenu(pr, repo, context.orgToken);
            } else {
                return Promise.resolve(this.assignReviewrButton(pr, repo));
            }
        }
        return Promise.resolve([]);
    }

    public menusFor(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                    context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }

    private assiggnReviewMenu(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                              repo: graphql.PullRequestToPullRequestLifecycle.Repo,
                              orgToken: string): Promise<Action[]> {

        const client = new ApolloGraphClient("https://api.github.com/graphql",
            { Authorization: `bearer ${orgToken}` });

        return client.executeQueryFromFile("suggestedReviewers",
            { owner: repo.owner, name: repo.name, number: pr.number },
            {},
            __dirname)
            .then(result => {
                const reviewers = _.get(result, "repository.pullRequest.suggestedReviewers");

                if (reviewers && reviewers.length > 0) {
                    const logins = reviewers.filter(r => r.reviewer && r.reviewer.login)
                        .map(r => r.reviewer.login);
                    const menu: MenuSpecification = {
                        text: "Request Review",
                        options: [{
                            text: "Suggestions", options: logins.map(l => {
                                return { text: l, value: l };
                            }),
                        },
                            { text: "Everybody", options: [{ text: "<request different reviewer>", value: "_"}]},
                        ],
                    };
                    return [ menuForCommand(menu,
                        "AssignGitHubPullRequestReviewer", "reviewer",
                        { issue: pr.number, repo: repo.name, owner: repo.owner }) ];

                } else {
                    return this.assignReviewrButton(pr, repo);
                }

            })
            .catch(() => {
                return this.assignReviewrButton(pr, repo);
            });
    }

    private assignReviewrButton(pr: graphql.PullRequestToPullRequestLifecycle.PullRequest,
                                repo: graphql.PullRequestToPullRequestLifecycle.Repo): Action[] {
        return [ buttonForCommand({ text: "Request Review" }, "AssignGitHubPullRequestReviewer",
            { issue: pr.number, repo: repo.name, owner: repo.owner }) ];
    }
}

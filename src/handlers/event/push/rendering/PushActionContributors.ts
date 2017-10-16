import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { githubToSlack } from "@atomist/slack-messages/Markdown";
import { Action } from "@atomist/slack-messages/SlackMessages";
import {
    AbstractIdentifiableContribution,
    ActionContributor,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import { truncateCommitMessage } from "../../../../util/helpers";
import { Domain } from "../PushLifecycle";
import * as _ "lodash";

export class BuildActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PushToPushLifecycle.Builds> {

    constructor() {
        super("build");
    }

    public supports(node: any): boolean {
        return node.buildUrl;
    }

    public buttonsFor(build: graphql.PushToPushLifecycle.Builds, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons = [];
        if (build.status === "failed" || build.status === "broken") {
            // Travis restart
            if (build.provider === "travis") {
                const button = this.travisRestartAction(build, repo);
                buttons.push(button);
            }
        }
        return Promise.resolve(buttons);
    }

    public menusFor(build: any, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }

    private travisRestartAction(build: graphql.PushToPushLifecycle.Builds, repo: any): Action {
        return buttonForCommand({ text: "Restart" },
            "RestartTravisBuild", { buildId: build.buildId, repo: repo.name, org: repo.owner });
    }
}

export class TagActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PushToPushLifecycle.Tags> {

    constructor() {
        super("tag");
    }

    public supports(node: any): boolean {
        return node.release === null;
    }

    public buttonsFor(tag: graphql.PushToPushLifecycle.Tags, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const push = context.lifecycle.extract("push");
        const buttons = [];

        let commitMessage = "Release created by Atomist Lifecycle Rugs";

        // We do not have a tag message in our model so let's fallback onto
        // commits by locating the commit for that particular tag
        // If that commit doesn't have a message set, let's not use it.
        const commits = push.commits.filter(
            c => (c.tags != null && c.message != null
                && c.tags.filter(t => t.name === tag.name).length > 0));

        if (commits.length !== 0) {
            // should I format to slack here?
            commitMessage = truncateCommitMessage(
                githubToSlack(commits[0].message), repo);
        }

        buttons.push(buttonForCommand({ text: "Release", confirm: { title: "Create Release",
            text: `Create release of tag ${tag.name}?`, ok_text: "Ok", dismiss_text: "Cancel" } },
            "CreateGitHubRelease", {
                org: repo.owner,
                repo: repo.name,
                tag: tag.name,
                message: commitMessage,
            }));
        return Promise.resolve(buttons);
    }

    public menusFor(tag: graphql.PushToPushLifecycle.Tags, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }
}

export class PullRequestActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super("pullrequest");
    }

    public supports(node: any): boolean {
        if (node.after) {
            const push = node as graphql.PushToPushLifecycle.Push;
            return push.branch !== (push.repo.defaultBranch || "master")
                && (!push.builds || !push.builds.some(b => b.status !== "passed"));
        } else {
            return false;
        }
    }

    public buttonsFor(node: graphql.PushToPushLifecycle.Push, ctx: RendererContext): Promise<Action[]> {
        if (ctx.rendererId === "commit") {
            const repo = ctx.lifecycle.extract("repo");

            return ctx.context.graphClient.executeQueryFromFile<graphql.Branch.Query, graphql.Branch.Variables>(
                "graphql/query/branch",
                { teamId: ctx.context.teamId, repoName: repo.name, repoOwner: repo.owner, branchName: node.branch })
                .then(result => {
                    let showButton = true;
                    const buttons = [];

                    // If there are open PRs on the branch, don't show the button
                    const branch = _.get(result, "ChatTeam[0].orgs[0].repo[0].branches[0]");
                    if (branch && branch.deleted) {
                        showButton = false;
                        // If there are PRs that already contain this push's after commit, don't show the button
                    } else if (branch && branch.pullRequests != null
                        && branch.pullRequests.filter(pr => pr.state === "open").length > 0) {
                        showButton = false;
                    } else if (branch && branch.pullRequests != null) {
                        branch.pullRequests.forEach(pr => {
                            if (pr.commits.filter(c => c.sha === node.after.sha).length > 0) {
                                showButton = false;
                            }
                        });
                    }

                    if (showButton) {
                        const msg = node.after.message.split("\n");
                        let body = null;
                        if (msg.length > 1) {
                            body = msg.slice(1).join("\n").split("\r\n").join("\n").split("\r").join("");
                        }

                        buttons.push(buttonForCommand({ text: "Raise PR" },
                            "RaiseGitHubPullRequest", {
                                org: repo.owner,
                                repo: repo.name,
                                title: msg[0],
                                body,
                                base: node.repo.defaultBranch,
                                head: node.branch,
                            }));
                    }
                    return buttons;
                });
        } else {
            return Promise.resolve([]);
        }
    }

    public menusFor(node: graphql.PushToPushLifecycle.Push, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }
}

export class ApplicationActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<Domain> {

    constructor() {
        super("application");
    }

    public supports(node: any): boolean {
        return node.name && node.apps && node.apps.some(a => a.data);
    }

    public buttonsFor(node: Domain, context: RendererContext): Promise<Action[]> {
        const actions = [];

        if (context.rendererId === "application") {
            let guid = null;
            let started = false;
            let stopped = true;

            node.apps.filter(a => a.data).forEach(a => {
                const data = JSON.parse(a.data);

                if (data.cloudfoundry) {
                    const vcapApplication = JSON.parse(data.cloudfoundry);
                    if (vcapApplication.application_name && !vcapApplication.application_name.endsWith("-old")) {
                        guid = vcapApplication.application_id;
                    }
                }
                if (a.state === "started" || a.state === "starting" || a.state === "healthy" ||
                    a.state === "unhealthy") {
                    started = true;
                } else if (a.state === "stopping") {
                    stopped = true;
                }

            });

            if (guid) {
                actions.push(buttonForCommand({ text: "Info" }, "CloudFoundryApplicationDetail",
                    { guid }));

                if (stopped && !started) {
                    actions.push(buttonForCommand({ text: "Start" }, "StartCloudFoundryApplication",
                        { guid }));
                }
                if (started) {
                    actions.push(buttonForCommand({
                        text: "Stop", confirm: {
                            title: "Stop Application",
                            dismiss_text: "Cancel",
                            ok_text: "Proceed",
                            text: `Do you really want to stop application?`,
                        },
                    }, "StopCloudFoundryApplication", { guid }));
                }
                actions.push(buttonForCommand({ text: "Scale" }, "ScaleCloudFoundryApplication",
                    { guid }));
            }
        }
        return Promise.resolve(actions);
    }

    public menusFor(node: Domain, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }
}

import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { githubToSlack } from "@atomist/slack-messages/Markdown";
import { Action } from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import * as semver from "semver";
import {
    AbstractIdentifiableContribution,
    ActionContributor,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import { truncateCommitMessage } from "../../../../util/helpers";
import { CreateGitHubRelease } from "../../../command/github/CreateGitHubRelease";
import { CreateGitHubTag } from "../../../command/github/CreateGitHubTag";
import { LifecycleActionPreferences } from "../../preferences";
import { Domain } from "../PushLifecycle";

export class BuildActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PushToPushLifecycle.Builds> {

    constructor() {
        super(LifecycleActionPreferences.push.restart_build.id);
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

export class ReleaseActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PushToPushLifecycle.Tags> {

    constructor() {
        super(LifecycleActionPreferences.push.release.id);
    }

    public supports(node: any): boolean {
        return node.release === null;
    }

    public buttonsFor(tag: graphql.PushToPushLifecycle.Tags, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo") as graphql.PushToPushLifecycle.Repo;
        const push = context.lifecycle.extract("push") as graphql.PushToPushLifecycle.Push;
        const buttons = [];

        this.createReleaseButton(push, tag, repo, buttons);

        return Promise.resolve(buttons);
    }

    public menusFor(tag: graphql.PushToPushLifecycle.Tags, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }

    private createReleaseButton(push: graphql.PushToPushLifecycle.Push,
                                tag: graphql.PushToPushLifecycle.Tags,
                                repo: graphql.PushToPushLifecycle.Repo,
                                buttons: any[]) {
        let commitMessage = "Release created by Atomist Lifecycle Automation";

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

        const releaseHandler = new CreateGitHubRelease();
        releaseHandler.tag = tag.name;
        releaseHandler.message = commitMessage;
        releaseHandler.owner = repo.owner;
        releaseHandler.repo = repo.name;

        buttons.push(buttonForCommand({
            text: "Release", confirm: {
                title: "Create Release",
                text: `Create release of tag ${tag.name}?`, ok_text: "Ok", dismiss_text: "Cancel",
            },
        }, releaseHandler));
    }
}

export class TagPushActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super(LifecycleActionPreferences.push.new_tag.id);
    }

    public supports(node: any): boolean {
        if (node.after) {
            const push = node as graphql.PushToPushLifecycle.Push;
            return push.commits && !push.commits.some(c => c.tags && c.tags.length > 0);
        } else {
            return false;
        }
    }

    public buttonsFor(push: graphql.PushToPushLifecycle.Push, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo") as graphql.PushToPushLifecycle.Repo;
        const buttons = [];

        const branch = repo.defaultBranch || "master";
        if (context.rendererId === "commit" && push.branch === branch) {
            this.createTagButton(push, repo, buttons);
        }

        return Promise.resolve(buttons);
    }

    public menusFor(push: graphql.PushToPushLifecycle.Push, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }

    private createTagButton(push: graphql.PushToPushLifecycle.Push,
                            repo: graphql.PushToPushLifecycle.Repo,
                            buttons: any[]) {
        // Add the create tag button
        const tagHandler = new CreateGitHubTag();
        tagHandler.message = push.after.message || "Tag created by Atomist Lifecycle Automation";
        tagHandler.sha = push.after.sha;
        tagHandler.repo = repo.name;
        tagHandler.owner = repo.owner;

        buttons.push(buttonForCommand({ text: "Tag" }, tagHandler));
    }
}

export class TagTagActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PushToPushLifecycle.Tags> {

    constructor() {
        super(LifecycleActionPreferences.push.tag.id);
    }

    public supports(node: any): boolean {
        return node.release === null;
    }

    public buttonsFor(tag: graphql.PushToPushLifecycle.Tags, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo") as graphql.PushToPushLifecycle.Repo;
        const push = context.lifecycle.extract("push") as graphql.PushToPushLifecycle.Push;
        const buttons = [];

        this.createTagButton(tag, push, repo, buttons);

        return Promise.resolve(buttons);
    }

    public menusFor(tag: graphql.PushToPushLifecycle.Tags, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }

    private createTagButton(tag: graphql.PushToPushLifecycle.Tags,
                            push: graphql.PushToPushLifecycle.Push,
                            repo: graphql.PushToPushLifecycle.Repo,
                            buttons: any[]) {
        // Add the create tag button
        if (semver.valid(tag.name)) {
            const version = `${semver.major(tag.name)}.${semver.minor(tag.name)}.${semver.patch(tag.name)}`;

            if (!push.commits.some(c => c.tags && c.tags.some(t => t.name === version))) {

                const tagHandler = new CreateGitHubTag();
                tagHandler.tag = version;
                tagHandler.message = push.after.message || "Tag created by Atomist Lifecycle Automation";
                tagHandler.sha = push.after.sha;
                tagHandler.repo = repo.name;
                tagHandler.owner = repo.owner;

                buttons.push(buttonForCommand({ text: `Tag ${version}` }, tagHandler));

            }
        }
    }
}

export class PullRequestActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super(LifecycleActionPreferences.push.raise_pullrequest.id);
    }

    public supports(node: any): boolean {
        if (node.after) {
            const push = node as graphql.PushToPushLifecycle.Push;
            return push.branch !== (push.repo.defaultBranch || "master")
                && push.branch !== "gh-pages"
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
        super(LifecycleActionPreferences.push.cf_application.id);
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

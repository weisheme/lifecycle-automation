import { EventFired } from "@atomist/automation-client";
import {
    Lifecycle,
    LifecycleHandler,
} from "../../../lifecycle/Lifecycle";
import { AttachImagesNodeRenderer } from "../../../lifecycle/rendering/AttachImagesNodeRenderer";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import { ReferencedIssuesNodeRenderer } from "../../../lifecycle/rendering/ReferencedIssuesNodeRenderer";
import * as graphql from "../../../typings/types";
import { LifecyclePreferences } from "../preferences";
import {
    ApproveActionContributor, AssignReviewerActionContributor, AutoMergeActionContributor,
    CommentActionContributor,
    DeleteActionContributor,
    MergeActionContributor,
    ThumbsUpActionContributor,
} from "./rendering/PullRequestActionContributors";
import {
    BuildNodeRenderer,
    CommitNodeRenderer,
    PullRequestNodeRenderer,
    ReviewNodeRenderer,
    StatusNodeRenderer,
} from "./rendering/PullRequestNodeRenderers";

export abstract class PullRequestLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const nodes = [];
        const [pullrequest, repo, timestamp, updateOnly] = this.extractNodes(event);

        if (repo != null) {
            nodes.push(repo);
        }

        // PullRequest lifecycle starts with, drum roll, a PullRequest
        if (pullrequest != null) {
            nodes.push(pullrequest);
        }

        // Verify that there is at least a pullrequest and repo node
        if (pullrequest == null || repo == null) {
            console.debug(`Lifecycle event is missing pullrequest and/or repo node`);
            return null;
        }

        const configuration: Lifecycle = {
            name: LifecyclePreferences.pull_request.id,
            nodes,
            renderers: [
                new PullRequestNodeRenderer(),
                new CommitNodeRenderer(),
                new BuildNodeRenderer(),
                new StatusNodeRenderer(),
                new ReviewNodeRenderer(),
                new ReferencedIssuesNodeRenderer(),
                new AttachImagesNodeRenderer(node => node.state === "open"),
                new FooterNodeRenderer(node => node.baseBranchName)],
            contributors: [
                new MergeActionContributor(),
                new AssignReviewerActionContributor(),
                new AutoMergeActionContributor(),
                new CommentActionContributor(),
                new ThumbsUpActionContributor(),
                new ApproveActionContributor(),
                new DeleteActionContributor(),
            ],
            id: `pullrequest_lifecycle/${repo.owner}/${repo.name}/${pullrequest.number}`,
            timestamp,
            ttl: (1000 * 60 * 60 * 8).toString(),
            post: updateOnly ? "update_only" : "always",
            channels: pullrequest.repo.channels.map(c => ({ name: c.name, teamId: c.team.id })),
            extract: (type: string) => {
                if (type === "repo") {
                    return pullrequest.repo;
                }
                return null;
            },
        };

        return [configuration];
    }

    protected abstract extractNodes(event: EventFired<R>):
        [graphql.PullRequestToPullRequestLifecycle.PullRequest,
            graphql.PullRequestToPullRequestLifecycle.Repo,
            string,
            boolean];
}

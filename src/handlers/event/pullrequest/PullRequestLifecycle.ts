import { EventFired } from "@atomist/automation-client/Handlers";
import {
    Lifecycle,
    LifecycleHandler,
} from "../../../lifecycle/Lifecycle";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import { ReferencedIssuesNodeRenderer } from "../../../lifecycle/rendering/ReferencedIssuesNodeRenderer";
import * as graphql from "../../../typings/types";
import {
    ApproveActionContributor, AssignReviewerActionContributor, AutoMergeActionContributor,
    CommentActionContributor,
    DeleteActionContributor,
    MergeActionContributor,
    ThumbsUpActionContributor,
} from "./rendering/PullRequestActionContributors";
import {
    CommitNodeRenderer,
    PullRequestNodeRenderer,
    ReviewNodeRenderer,
    StatusNodeRenderer,
} from "./rendering/PullRequestNodeRenderers";

export abstract class PullRequestLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const nodes = [];
        const [pullrequest, repo, timestamp] = this.extractNodes(event);

        if (repo != null) {
            nodes.push(repo);
        }

        // PullRequest lifecycle starts with, drum roll, a PullRequest
        if (pullrequest != null) {
            nodes.push(pullrequest);
        }

        // Verify that there is at least a pullrequest and repo node
        if (pullrequest == null || repo == null) {
            console.log(`Lifecycle event is missing pullrequest and/or repo node`);
            return null;
        }

        const configuration: Lifecycle = {
            name: "pullrequest",
            nodes,
            renderers: [
                new PullRequestNodeRenderer(),
                new CommitNodeRenderer(),
                new StatusNodeRenderer(),
                new ReviewNodeRenderer(),
                new ReferencedIssuesNodeRenderer(),
                new FooterNodeRenderer((node: any) => node.baseBranchName)],
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
            // #47 remove issue rewrite
            // ttl: (1000 * 60 * 60 * 8).toString(),
            channels: pullrequest.repo.channels.map(c => c.name),
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
        [graphql.PullRequestToPullRequestLifecycle.PullRequest, graphql.PullRequestToPullRequestLifecycle.Repo, string];
}

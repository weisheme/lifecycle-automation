import { EventFired } from "@atomist/automation-client";
import {
    Lifecycle,
    LifecycleHandler,
} from "../../../lifecycle/Lifecycle";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import { ReferencedIssuesNodeRenderer } from "../../../lifecycle/rendering/ReferencedIssuesNodeRenderer";
import * as graphql from "../../../typings/types";
import {
    AssignActionContributor,
    CloseActionContributor,
    CommentActionContributor,
    LabelActionContributor,
    ReactionActionContributor,
} from "./rendering/CommentActionContributors";
import {
    IssueCommentNodeRenderer,
    PullRequestCommentNodeRenderer,
} from "./rendering/CommentNodeRenderers";

export abstract class CommentLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const [comments, issue, pullRequest, repo, updateOnly] = this.extractNodes(event);

        if (comments != null) {
            return comments.map(comment => {
                const nodes = [];

                if (repo != null) {
                    nodes.push(repo);
                }

                if (issue != null) {
                    nodes.push(issue);
                }

                if (pullRequest != null) {
                    nodes.push(pullRequest);
                }

                nodes.push(comment);

                // Verify that there is at least a comment and repo node
                if (comment == null || repo == null) {
                    console.debug(`Lifecycle event is missing comment and/or repo node`);
                    return null;
                }

                const id = issue != null ? issue.number : pullRequest.number;

                const configuration: Lifecycle = {
                    name: "comment",
                    nodes,
                    renderers: [
                        new IssueCommentNodeRenderer(),
                        new PullRequestCommentNodeRenderer(),
                        new ReferencedIssuesNodeRenderer(),
                        new FooterNodeRenderer(node => node.body && (node.issue || node.pullRequest))],
                    contributors: [
                        new AssignActionContributor(),
                        new CommentActionContributor(),
                        new CloseActionContributor(),
                        new LabelActionContributor(),
                        new ReactionActionContributor(),
                    ],
                    id: `comment_lifecycle/${repo.owner}/${repo.name}/${id}/${comment.gitHubId}`,
                    timestamp: new Date().getTime().toString(),
                    post: updateOnly ? "update_only" : "always",
                    channels: repo.channels.map(c => c.name),
                    extract: (type: string) => {
                        if (type === "repo") {
                            return repo;
                        } else if (type === "issue") {
                            return issue;
                        } else if (type === "pullrequest") {
                            return pullRequest;
                        }
                        return null;
                    },
                };
                return configuration;
            });
        }
    }

    protected abstract extractNodes(event: EventFired<R>):
        [graphql.IssueToIssueCommentLifecycle.Comments[],
            graphql.IssueToIssueCommentLifecycle.Issue,
            graphql.PullRequestToPullRequestCommentLifecycle.PullRequest,
            graphql.IssueToIssueCommentLifecycle.Repo,
            boolean];
}

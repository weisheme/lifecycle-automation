import { EventFired } from "@atomist/automation-client/HandleEvent";
import { Lifecycle, LifecycleHandler } from "../../../lifecycle/Lifecycle";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import { ReferencedIssuesNodeRenderer } from "../../../lifecycle/rendering/ReferencedIssuesNodeRenderer";
import * as graphql from "../../../typings/types";
import {
    AssignActionContributor, CloseActionContributor,
    CommentActionContributor, LabelActionContributor,
    ReactionActionContributor, ReopenActionContributor,
} from "./rendering/IssueActionContributors";
import { IssueNodeRenderer } from "./rendering/IssueNodeRenderers";

export abstract class IssueLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const nodes: any[] = [];
        const [issue, repo, timestamp] = this.extractNodes(event);

        if (issue != null) {
            nodes.push(issue);
        }

        // Verify that there is at least a issue and repo node
        if (issue == null) {
            console.log(`Lifecycle event is missing issue and/or repo node`);
            return null;
        }

        const configuration: Lifecycle = {
            name: "issue",
            nodes,
            renderers: [
                new IssueNodeRenderer(),
                new ReferencedIssuesNodeRenderer(),
                new FooterNodeRenderer(node => node.title || node.body)],
            contributors: [
                new AssignActionContributor(),
                new CommentActionContributor(),
                new CloseActionContributor(),
                new LabelActionContributor(),
                new ReactionActionContributor(),
                new ReopenActionContributor(),
            ],
            id: `issue_lifecycle/${repo.owner}/${repo.name}/${issue.number}`,
            timestamp,
            // #47 remove issue rewrite
            // ttl: (1000 * 60 * 60 * 8).toString(),
            channels: repo.channels.map(c => c.name),
            extract: (type: string) => {
                if (type === "repo") {
                    return repo;
                }
                return null;
            },
        };

        return [this.processLifecycle(configuration)];
    }

    protected processLifecycle(lifecycle: Lifecycle): Lifecycle {
        return lifecycle;
    }

    protected abstract extractNodes(event: EventFired<R>):
        [graphql.IssueToIssueLifecycle.Issue, graphql.IssueToIssueLifecycle.Repo, string];
}

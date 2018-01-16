import { EventFired } from "@atomist/automation-client";
import { Lifecycle, LifecycleHandler } from "../../../lifecycle/Lifecycle";
import { AttachImagesNodeRenderer } from "../../../lifecycle/rendering/AttachImagesNodeRenderer";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import { ReferencedIssuesNodeRenderer } from "../../../lifecycle/rendering/ReferencedIssuesNodeRenderer";
import * as graphql from "../../../typings/types";
import { LifecyclePreferences } from "../preferences";
import {
    AssignActionContributor, AssignToMeActionContributor, CloseActionContributor,
    CommentActionContributor, DisplayAssignActionContributor, LabelActionContributor,
    ReactionActionContributor, ReopenActionContributor,
} from "./rendering/IssueActionContributors";
import { IssueNodeRenderer, MoreNodeRenderer } from "./rendering/IssueNodeRenderers";

export abstract class IssueLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const nodes: any[] = [];
        const [issue, repo, timestamp] = this.extractNodes(event);

        if (issue != null) {
            nodes.push(issue);
        }

        // Verify that there is at least a issue and repo node
        if (issue == null) {
            console.debug(`Lifecycle event is missing issue and/or repo node`);
            return null;
        }

        const configuration: Lifecycle = {
            name: LifecyclePreferences.issue.id,
            nodes,
            renderers: [
                new IssueNodeRenderer(),
                new MoreNodeRenderer(),
                new ReferencedIssuesNodeRenderer(),
                new AttachImagesNodeRenderer(node => node.state === "open"),
                new FooterNodeRenderer(node => node.title || node.body)],
            contributors: [
                new DisplayAssignActionContributor(),
                new CommentActionContributor(),
                new CloseActionContributor(),
                new LabelActionContributor(),
                new ReactionActionContributor(),
                new AssignToMeActionContributor(),
                new AssignActionContributor(),
                new ReopenActionContributor(),
            ],
            id: `issue_lifecycle/${repo.owner}/${repo.name}/${issue.number}`,
            timestamp,
            // #47 remove issue rewrite
            // ttl: (1000 * 60 * 60 * 8).toString(),
            channels: repo.channels.map(c => ({ name: c.name, teamId: c.team.id })),
            extract: (type: string) => {
                if (type === "repo") {
                    return repo;
                }
                return null;
            },
        };

        return [configuration];
    }

    protected abstract extractNodes(event: EventFired<R>):
        [graphql.IssueToIssueLifecycle.Issue, graphql.IssueToIssueLifecycle.Repo, string];
}

import { EventFired, HandlerContext } from "@atomist/automation-client";
import { SlackMessage } from "@atomist/slack-messages";
import {
    CardMessage,
    newCardMessage,
} from "../../../lifecycle/card";
import {
    CardActionContributorWrapper,
    Lifecycle,
    LifecycleHandler,
} from "../../../lifecycle/Lifecycle";
import { AttachImagesNodeRenderer } from "../../../lifecycle/rendering/AttachImagesNodeRenderer";
import { CollaboratorCardNodeRenderer } from "../../../lifecycle/rendering/CollaboratorCardNodeRenderer";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import { ReferencedIssuesNodeRenderer } from "../../../lifecycle/rendering/ReferencedIssuesNodeRenderer";
import * as graphql from "../../../typings/types";
import { LifecyclePreferences } from "../preferences";
import {
    AssignActionContributor,
    AssignToMeActionContributor,
    CloseActionContributor,
    CommentActionContributor,
    DisplayAssignActionContributor,
    LabelActionContributor,
    ReactionActionContributor,
    ReopenActionContributor,
} from "./rendering/IssueActionContributors";
import { IssueCardNodeRenderer, MoreCardNodeRenderer } from "./rendering/IssueCardNodeRenderers";
import {
    IssueNodeRenderer,
    MoreNodeRenderer,
} from "./rendering/IssueNodeRenderers";

export abstract class IssueCardLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareMessage(lifecycle: Lifecycle): CardMessage {
        const msg = newCardMessage("issue");
        const repo = lifecycle.extract("repo");
        msg.repository = {
            owner: repo.owner,
            name: repo.name,
        };
        msg.ts = +lifecycle.timestamp;
        return msg;
    }

    protected prepareLifecycle(event: EventFired<R>, ctx: HandlerContext): Lifecycle[] {
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
                new IssueCardNodeRenderer(),
                new CollaboratorCardNodeRenderer(node => node.body),
            ],
            contributors: [
                new CardActionContributorWrapper(new CommentActionContributor()),
                new CardActionContributorWrapper(new ReactionActionContributor()),
                new CardActionContributorWrapper(new LabelActionContributor()),
                new CardActionContributorWrapper(new AssignToMeActionContributor("issue")),
                new CardActionContributorWrapper(new AssignActionContributor("issue")),
                new CardActionContributorWrapper(new CloseActionContributor()),
                new CardActionContributorWrapper(new ReopenActionContributor()),
            ],
            id: `issue_lifecycle/${repo.owner}/${repo.name}/${issue.number}`,
            timestamp,
            channels: [{
                name: "atomist:dashboard",
                teamId: ctx.teamId,
            }],
            extract: (type: string) => {
                if (type === "repo") {
                    return repo;
                }
                return null;
            },
        };

        return [configuration];
    }

    protected processLifecycle(lifecycle: Lifecycle, store: Map<string, any>): Lifecycle {
        store.set("show_assign", true);
        return lifecycle;
    }

    protected abstract extractNodes(event: EventFired<R>):
        [graphql.IssueToIssueLifecycle.Issue, graphql.IssueToIssueLifecycle.Repo, string];
}

export abstract class IssueLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareMessage(): SlackMessage {
        return {
            text: null,
            attachments: [],
        };
    }

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
                new LabelActionContributor(),
                new ReactionActionContributor(),
                new AssignToMeActionContributor(),
                new AssignActionContributor(),
                new ReopenActionContributor(),
                new CloseActionContributor(),
            ],
            id: `issue_lifecycle/${repo.owner}/${repo.name}/${issue.number}`,
            timestamp,
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

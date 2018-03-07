import {
    EventFired,
    HandlerContext,
} from "@atomist/automation-client";
import { logger } from "@atomist/automation-client/internal/util/logger";
import { SlackMessage } from "@atomist/slack-messages";
import * as _ from "lodash";
import {
    CardMessage,
    newCardMessage,
} from "../../../lifecycle/card";
import {
    CardActionContributorWrapper,
    Channel,
    Lifecycle,
    LifecycleHandler,
    Preferences,
} from "../../../lifecycle/Lifecycle";
import { CollaboratorCardNodeRenderer } from "../../../lifecycle/rendering/CollaboratorCardNodeRenderer";
import { EventsCardNodeRenderer } from "../../../lifecycle/rendering/EventsCardNodeRenderer";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import { ReferencedIssuesNodeRenderer } from "../../../lifecycle/rendering/ReferencedIssuesNodeRenderer";
import { PushToPushLifecycle } from "../../../typings/types";
import * as graphql from "../../../typings/types";
import { encode } from "../../../util/base64";
import { LifecyclePreferences } from "../preferences";
import {
    ApplicationActionContributor,
    ApproveGoalActionContributor,
    BuildActionContributor,
    PullRequestActionContributor,
    ReleaseActionContributor,
    sortTagsByName,
    TagPushActionContributor,
    TagTagActionContributor,
} from "./rendering/PushActionContributors";
import {
    ApplicationCardNodeRenderer,
    BuildCardNodeRenderer,
    CommitCardNodeRenderer,
    IssueCardNodeRenderer,
    PullRequestCardNodeRenderer,
    PushCardNodeRenderer,
    TagCardNodeRenderer,
} from "./rendering/PushCardNodeRenderers";
import {
    ApplicationNodeRenderer,
    BlackDuckFingerprintNodeRenderer,
    BuildNodeRenderer,
    CommitNodeRenderer,
    IssueNodeRenderer,
    K8PodNodeRenderer,
    PullRequestNodeRenderer,
    PushNodeRenderer,
    TagNodeRenderer,
} from "./rendering/PushNodeRenderers";
import {
    GoalCardNodeRenderer,
    GoalNodeRenderer,
    StatusesCardNodeRenderer,
    StatusesNodeRenderer,
} from "./rendering/StatusesNodeRenderer";
import { WorkflowNodeRenderer } from "./workflow/WorkflowNodeRenderer";

export abstract class PushCardLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareMessage(lifecycle: Lifecycle, ctx: HandlerContext): Promise<CardMessage> {
        return ctx.graphClient.executeQueryFromFile<graphql.CardEvents.Query, graphql.CardEvents.Variables>(
            "../../../graphql/query/cardEvents",
            { key: lifecycle.id },
            { fetchPolicy: "network-only" },
            __dirname)
            .then(result => {
                const msg = newCardMessage("push");
                const repo = lifecycle.extract("repo");
                msg.repository = {
                    owner: repo.owner,
                    name: repo.name,
                };
                msg.ts = +lifecycle.timestamp;
                msg.events = _.cloneDeep(_.get(result, "Card[0].events") || []);
                return Promise.resolve(msg);
            });
    }

    protected prepareLifecycle(event: EventFired<R>, ctx: HandlerContext): Lifecycle[] {
        const [pushes, events] = this.extractNodes(event);

        return pushes.filter(p => p).map(push => {
            const nodes: any[] = orderNodes(push);

            // Verify that there is at least a push and repo node
            if (!nodes) {
                console.debug(`Lifecycle event is missing push, commits and/or repo node`);
                return null;
            }

            const configuration: Lifecycle = {
                name: LifecyclePreferences.push.id,
                nodes,
                renderers: [
                    new EventsCardNodeRenderer(node => node.after),
                    new PushCardNodeRenderer(),
                    new CommitCardNodeRenderer(),
                    new BuildCardNodeRenderer(),
                    new StatusesCardNodeRenderer(),
                    new GoalCardNodeRenderer(),
                    new TagCardNodeRenderer(),
                    new IssueCardNodeRenderer(),
                    new PullRequestCardNodeRenderer(),
                    new ApplicationCardNodeRenderer(),
                    new CollaboratorCardNodeRenderer(node => node.after != null),
                ],
                contributors: [
                    new CardActionContributorWrapper(new TagPushActionContributor()),
                    new CardActionContributorWrapper(new TagTagActionContributor()),
                    new CardActionContributorWrapper(new ReleaseActionContributor()),
                    new CardActionContributorWrapper(new BuildActionContributor()),
                    new CardActionContributorWrapper(new PullRequestActionContributor()),
                    // new CardActionContributorWrapper(new ApproveGoalActionContributor()),
                    // new CardActionContributorWrapper(new ApplicationActionContributor()),
                ],
                id: `push_lifecycle/${push.repo.owner}/${push.repo.name}/${push.branch}/${push.after.sha}`,
                timestamp: Date.now().toString(),
                channels: [{
                    name: "atomist:dashboard",
                    teamId: ctx.teamId,
                }],
                extract: (type: string) => {
                    if (type === "repo") {
                        return push.repo;
                    } else if (type === "push") {
                        return push;
                    } else if (type === "domains") {
                        return extractDomains(push).sort((d1, d2) => d1.name.localeCompare(d2.name));
                    } else if (type === "events") {
                        return events;
                    }
                    return null;
                },
            };
            return configuration;
        });
    }

    protected abstract extractNodes(event: EventFired<R>): [PushToPushLifecycle.Push[], {type: string, node: any}];
}

export abstract class PushLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareMessage(): Promise<SlackMessage> {
        return Promise.resolve({
            text: null,
            attachments: [],
        });
    }

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const pushes = this.extractNodes(event);
        const preferences = this.extractPreferences(event);

        return pushes.filter(p => p).map(push => {
            const channels = this.filterChannels(push, preferences);
            const nodes: any[] = orderNodes(push);

            // Verify that there is at least a push and repo node
            if (!nodes) {
                console.debug(`Lifecycle event is missing push, commits and/or repo node`);
                return null;
            }

            const configuration: Lifecycle = {
                name: LifecyclePreferences.push.id,
                nodes,
                renderers: [
                    new PushNodeRenderer(),
                    new CommitNodeRenderer(),
                    new StatusesNodeRenderer(),
                    new GoalNodeRenderer(),
                    new WorkflowNodeRenderer(),
                    new IssueNodeRenderer(),
                    new PullRequestNodeRenderer(),
                    new ReferencedIssuesNodeRenderer(),
                    new TagNodeRenderer(),
                    new BuildNodeRenderer(),
                    new ApplicationNodeRenderer(),
                    new K8PodNodeRenderer(),
                    new BlackDuckFingerprintNodeRenderer(),
                    new FooterNodeRenderer((node: any) => node.after)],
                contributors: [
                    new TagPushActionContributor(),
                    new TagTagActionContributor(),
                    new ReleaseActionContributor(),
                    new BuildActionContributor(),
                    new PullRequestActionContributor(),
                    new ApproveGoalActionContributor(),
                    new ApplicationActionContributor(),
                ],
                id: `push_lifecycle/${push.repo.owner}/${push.repo.name}/${push.branch}/${push.after.sha}`,
                timestamp: Date.now().toString(),
                channels,
                extract: (type: string) => {
                    if (type === "repo") {
                        return push.repo;
                    } else if (type === "push") {
                        return push;
                    } else if (type === "domains") {
                        return extractDomains(push).sort((d1, d2) => d1.name.localeCompare(d2.name));
                    }
                    return null;
                },
            };
            return configuration;
        });
    }

    protected abstract extractNodes(event: EventFired<R>): PushToPushLifecycle.Push[];

    private filterChannels(push: graphql.PushToPushLifecycle.Push, preferences: {[teamId: string]: Preferences[]} = {})
        : Channel[] {
        const channels = (_.get(push, "repo.channels") || [])
            .filter(c => c.name && c.name.length >= 1);
        if (!channels || channels.length === 0) {
            return [];
        }

        const channelNames: Channel[] = [];

        const repo = push.repo.name;
        const owner = push.repo.owner;
        const branch = push.branch;

        push.repo.channels.forEach(channel => {
            if (preferences[channel.team.id]) {
                const branchConfiguration =
                    preferences[channel.team.id].find(p => p.name === "lifecycle_branches");
                if (branchConfiguration) {
                    try {
                        const configuration = JSON.parse(branchConfiguration.value);
                        // Find the first match from the start of the configuration
                        const channelConfiguration = configuration.find(c => matches(c.name, channel.name));
                        if (channelConfiguration) {
                            // Now find the first matching repository configuration
                            const repoConfiguration = channelConfiguration.repositories
                                .find(r => matches(r.owner, owner) && matches(r.name, repo));
                            if (repoConfiguration) {
                                const include = repoConfiguration.include ?
                                    matches(repoConfiguration.include, branch) : null;
                                const exclude = repoConfiguration.exclude ?
                                    matches(repoConfiguration.exclude, branch) : null;
                                if (include === true && exclude !== false) {
                                    channelNames.push({name: channel.name, teamId: channel.team.id});
                                } else if (include === null && exclude !== true) {
                                    channelNames.push({name: channel.name, teamId: channel.team.id});
                                }
                            }
                        } else {
                            channelNames.push({name: channel.name, teamId: channel.team.id});
                        }
                    } catch (err) {
                        logger.warn(
                            `Team preferences 'lifecycle_branches' are corrupt: '${branchConfiguration.value}'`);
                    }
                } else {
                    channelNames.push({name: channel.name, teamId: channel.team.id});
                }
            } else {
                channelNames.push({name: channel.name, teamId: channel.team.id});
            }
        });

        return channelNames;
    }

}

function orderNodes(push: graphql.PushToPushLifecycle.Push): any[] {
    // Verify that there is at least a push and repo node
    if (!push || !push.repo || !push.commits || push.commits.length === 0) {
        console.debug(`Lifecycle event is missing push, commits and/or repo node`);
        return null;
    }

    const repo = push.repo;
    const nodes: any[] = [];
    if (repo != null) {
        nodes.push(repo);
    }

    // Push lifecycle starts with, drum roll, a Push
    if (push != null) {
        nodes.push(push);
        // Add all Tag nodes
        if (push.after != null && push.after.tags != null) {
            sortTagsByName(push.after.tags)
                .forEach(t => nodes.push(t));
        }
    }

    // Add Build nodes
    if (push.builds != null && push.builds.length > 0) {
        // Sort the builds in descending order; newest first
        push.builds.sort((b1, b2) => b2.timestamp.localeCompare(b1.timestamp))
            .forEach(b => nodes.push(b));

        // Add Workflow nodes
        _.uniqBy(push.builds.filter(b => b.workflow),
            b => b.workflow.id).forEach(b => nodes.push(b.workflow));
    }

    // Add Domain -> App nodes
    const domains = extractDomains(push).sort((d1, d2) => d1.name.localeCompare(d2.name));
    domains.forEach(d => nodes.push(d));

    return nodes;
}

function extractDomains(push: graphql.PushToPushLifecycle.Push): Domain[] {
    const domains = {};
    push.commits.filter(c => c.apps).forEach(c => c.apps.forEach(a => {
        const domain = a.domain;
        if (domains[domain]) {
            domains[domain].push(a);
        } else {
            domains[domain] = [a];
        }
    }));

    const result: Domain[] = [];
    for (const domain in domains) {
        if (domains.hasOwnProperty(domain)) {
            result.push({ name: domain, apps: domains[domain] });
        }
    }

    return result;
}

function matches(pattern: string, target: string): boolean {
    const regexp = new RegExp(pattern, "g");
    const match = regexp.exec(target);
    return match != null && match.length > 0;
}

export interface Domain {
    name: string;
    apps: graphql.PushToPushLifecycle.Apps[];
}

import { EventFired } from "@atomist/automation-client";
import { logger } from "@atomist/automation-client/internal/util/logger";
import * as _ from "lodash";
import {
    Lifecycle,
    LifecycleHandler,
    Preferences,
} from "../../../lifecycle/Lifecycle";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import { PushToPushLifecycle } from "../../../typings/types";
import * as graphql from "../../../typings/types";
import { LifecyclePreferences } from "../preferences";
import {
    ApplicationActionContributor,
    BuildActionContributor,
    PullRequestActionContributor,
    ReleaseActionContributor, TagPushActionContributor,
    TagTagActionContributor,
} from "./rendering/PushActionContributors";
import {
    ApplicationNodeRenderer,
    BuildNodeRenderer,
    CommitNodeRenderer,
    IssueNodeRenderer,
    K8PodNodeRenderer,
    PullRequestNodeRenderer,
    PushNodeRenderer,
    TagNodeRenderer,
} from "./rendering/PushNodeRenderers";
import { StatusesNodeRenderer } from "./rendering/StatusesNodeRenderer";
import { WorkflowNodeRenderer } from "./workflow/WorkflowNodeRenderer";

export abstract class PushLifecycleHandler<R> extends LifecycleHandler<R> {

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const pushes = this.extractNodes(event);
        const preferences = this.extractPreferences(event);

        return pushes.filter(p => p).map(push => {
            const channels = this.filterChannels(push, preferences);

            // Verify that there is at least a push and repo node
            if (!push || !push.repo || !push.commits || push.commits.length === 0 || channels.length === 0) {
                console.debug(`Lifecycle event is missing push, commits and/or repo node`);
                return null;
            }

            const nodes: any[] = [];
            const repo = push.repo;
            if (repo != null) {
                nodes.push(repo);
            }

            // Push lifecycle starts with, drum roll, a Push
            if (push != null) {
                nodes.push(push);
                // Add all Tag nodes
                if (push.after != null && push.after.tags != null) {
                    push.after.tags.forEach(t => nodes.push(t));
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
            const domains = this.extractDomains(push).sort((d1, d2) => d1.name.localeCompare(d2.name));
            domains.forEach(d => nodes.push(d));

            const configuration: Lifecycle = {
                name: LifecyclePreferences.push.id,
                nodes,
                renderers: [
                    new PushNodeRenderer(),
                    new CommitNodeRenderer(),
                    new StatusesNodeRenderer(),
                    new WorkflowNodeRenderer(),
                    new IssueNodeRenderer(),
                    new PullRequestNodeRenderer(),
                    new TagNodeRenderer(),
                    new BuildNodeRenderer(),
                    new ApplicationNodeRenderer(),
                    new K8PodNodeRenderer(),
                    new FooterNodeRenderer((node: any) => node.after)],
                contributors: [
                    new TagPushActionContributor(),
                    new TagTagActionContributor(),
                    new ReleaseActionContributor(),
                    new BuildActionContributor(),
                    new PullRequestActionContributor(),
                    new ApplicationActionContributor(),
                ],
                id: `push_lifecycle/${push.repo.owner}/${push.repo.name}/${push.branch}/${push.after.sha}`,
                timestamp: Date.now().toString(),
                // #47 remove issue rewrite
                // ttl: (1000 * 60 * 60 * 8).toString(),
                channels,
                extract: (type: string) => {
                    if (type === "repo") {
                        return push.repo;
                    } else if (type === "push") {
                        return push;
                    } else if (type === "domains") {
                        return domains;
                    }
                    return null;
                },
            };
            return configuration;
        });
    }

    protected abstract extractNodes(event: EventFired<R>): PushToPushLifecycle.Push[];

    private extractDomains(push: graphql.PushToPushLifecycle.Push): Domain[] {
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

    private filterChannels(push: graphql.PushToPushLifecycle.Push, preferences: Preferences[] = []): string[] {
        const channels = _.get(push, "repo.channels");
        if (!channels || channels.length === 0) {
            return [];
        }

        const branchConfiguration = preferences.find(p => p.name === "lifecycle_branches");
        if (branchConfiguration) {
            const channelNames: string[] = [];
            try {
                const configuration = JSON.parse(branchConfiguration.value);
                const repo = push.repo.name;
                const owner = push.repo.owner;
                const branch = push.branch;

                push.repo.channels.forEach(channel => {
                    // Find the first match from the start of the configuration
                    const channelConfiguration = configuration.find(c => matches(c.name, channel.name));
                    if (channelConfiguration) {
                        // Now find the first matching repository configuration
                        const repoConfiguration = channelConfiguration.repositories
                            .find(r => matches(r.owner, owner) && matches(r.name, repo));
                        if (repoConfiguration) {
                            const include = repoConfiguration.include ?
                                matches(repoConfiguration.include, branch) : undefined;
                            const exclude = repoConfiguration.exclude ?
                                matches(repoConfiguration.exclude, branch) : undefined;
                            if (include === true || exclude === false) {
                                channelNames.push(channel.name);
                            }
                        }
                    } else {
                        channelNames.push(channel.name);
                    }
                });

                return channelNames;
            } catch (err) {
                logger.warn(`Team preferences 'branch_configuration' are corrupt: '${branchConfiguration.value}'`);
            }
        }
        return push.repo.channels.map(c => c.name);
    }
}

function matches(pattern: string, target: string): boolean {
    const regexp = new RegExp(pattern, "g");
    const match = regexp.exec(target);
    return match && match.length > 0;
}

export interface Domain {
    name: string;
    apps: graphql.PushToPushLifecycle.Apps[];
}

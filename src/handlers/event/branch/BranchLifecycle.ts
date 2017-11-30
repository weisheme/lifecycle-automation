import { EventFired } from "@atomist/automation-client";
import {
    Lifecycle,
    LifecycleHandler,
} from "../../../lifecycle/Lifecycle";
import { FooterNodeRenderer } from "../../../lifecycle/rendering/FooterNodeRenderer";
import * as graphql from "../../../typings/types";
import { LifecyclePreferences } from "../preferences";
import { RaisePrActionContributor } from "./rendering/BranchActionContributors";
import { BranchNodeRenderer } from "./rendering/BranchNodeRenderers";

export abstract class BranchLifecycle<R> extends LifecycleHandler<R> {

    protected prepareLifecycle(event: EventFired<R>): Lifecycle[] {
        const [branches, repo] = this.extractNodes(event);

        if (branches != null) {
            return branches.map(branch => {
                const nodes = [];

                if (repo != null) {
                    nodes.push(repo);
                }

                nodes.push(branch);

                const configuration: Lifecycle = {
                    name: LifecyclePreferences.branch.id,
                    nodes,
                    renderers: [
                        new BranchNodeRenderer(),
                        new FooterNodeRenderer(node => node.hasOwnProperty("deleted"))],
                    contributors: [
                        new RaisePrActionContributor(),
                    ],
                    id: `branch_lifecycle/${repo.owner}/${repo.name}/${branch.name}/${branch.deleted}`,
                    // ttl: (1000 * 60 * 60).toString(),
                    timestamp: Date.now().toString(),
                    channels: repo.channels.map(c => c.name),
                    extract: (type: string) => {
                        if (type === "repo") {
                            return repo;
                        }
                        return null;
                    },
                };
                return configuration;
            });
        }
    }

    protected abstract extractNodes(event: EventFired<R>):
        [graphql.BranchToBranchLifecycle.Branch[],
            graphql.BranchToBranchLifecycle.Repo];
}

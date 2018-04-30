import {
    EventFired,
    EventHandler,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    SuccessPromise,
} from "@atomist/automation-client";
import { subscription } from "@atomist/automation-client/graph/graphQL";
import { addressEvent } from "@atomist/automation-client/spi/message/MessageClient";
import {
    Deployment,
    DeploymentRootType,
} from "../../../ingesters/deployment";
import * as graphql from "../../../typings/types";

@EventHandler("Create a deployment on running K8 container events",
    subscription("deploymentOnK8Container"))
export class DeploymentOnK8Container implements HandleEvent<graphql.DeploymentOnK8Container.Subscription> {

    public async handle(e: EventFired<graphql.DeploymentOnK8Container.Subscription>,
                        ctx: HandlerContext): Promise<HandlerResult> {
        const container = e.data.K8Container[0];
        const commit = container.image.commits[0];

        const deployment: Deployment = {
            commit: {
                owner: commit.repo.owner,
                repo: commit.repo.name,
                sha: commit.sha,
            },
            environment: container.environment,
            ts: Date.now(),
        };

        await ctx.messageClient.send(deployment, addressEvent(DeploymentRootType));

        return SuccessPromise;
    }

}

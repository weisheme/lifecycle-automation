/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

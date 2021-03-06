/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
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
    subscription("deploymentOnK8Pod"))
export class DeploymentOnK8Pod implements HandleEvent<graphql.DeploymentOnK8Pod.Subscription> {

    public async handle(e: EventFired<graphql.DeploymentOnK8Pod.Subscription>,
                        ctx: HandlerContext): Promise<HandlerResult> {
        const pod = e.data.K8Pod[0];
        const containers = pod.containers;

        for (const container of containers) {
            const commit = container.image.commits[0];

            const deployment: Deployment = {
                commit: {
                    owner: commit.repo.owner,
                    repo: commit.repo.name,
                    sha: commit.sha,
                },
                environment: `${pod.environment}:${pod.namespace}`,
                ts: Date.now(),
            };

            await ctx.messageClient.send(deployment, addressEvent(DeploymentRootType));
        }

        return SuccessPromise;
    }

}

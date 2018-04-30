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
    CommandHandler,
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Parameter,
    Secret,
    Secrets,
    Success,
    SuccessPromise,
    Tags,
} from "@atomist/automation-client";
import { addressEvent } from "@atomist/automation-client/spi/message/MessageClient";
import {
    Deployment,
    DeploymentRootType
} from "../../../ingesters/deployment";

import { CreateSlackChannel } from "../../../typings/types";
import { error } from "../../../util/messages";
import { AssociateRepo } from "./AssociateRepo";

export function createChannel(ctx: HandlerContext,
                              teamId: string,
                              channelName: string): Promise<CreateSlackChannel.Mutation> {
    return ctx.graphClient.mutate<CreateSlackChannel.Mutation, CreateSlackChannel.Variables>({
            name: "createSlackChannel",
            variables: {
                teamId,
                name: channelName,
            },
        });
}

/**
 * Create a channel and link it to a repository.
 */
@CommandHandler("Create channel and link it to a repository", "create deployment")
@Tags("slack", "channel", "repo")
export class CreateDeployment implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @Parameter({
        displayName: "Sha",
        description: "name of the repository to link to the channel",
        pattern: /^[-.\w]+$/,
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public sha: string;

    public async handle(ctx: HandlerContext): Promise<HandlerResult> {
        const deployment: Deployment = {
            ts: Date.now(),
            environment: "testing",
            commit: {
                sha: this.sha,
                repo: this.repo,
                owner: this.owner,
            }
        }

        await ctx.messageClient.send(deployment, addressEvent(DeploymentRootType));

        return SuccessPromise;

    }
}

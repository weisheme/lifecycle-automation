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
    Tags,
} from "@atomist/automation-client";
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
@CommandHandler("Create channel and link it to a repository", "link channel")
@Tags("slack", "channel", "repo")
export class CreateChannel implements HandleCommand {

    @MappedParameter(MappedParameters.SlackTeam)
    public teamId: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @MappedParameter(MappedParameters.SlackUser)
    public userId: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    @Parameter({
        displayName: "Channel Name",
        description: "name of the channel to create",
        pattern: /^\S+$/,
        minLength: 1,
        maxLength: 21,
        required: true,
    })
    public channel: string;

    @Parameter({
        displayName: "Repo Name",
        description: "name of the repository to link to the channel",
        pattern: /^[-.\w]+$/,
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public repo: string;

    @Parameter({ pattern: /^\S*$/, displayable: false, required: false })
    public msgId: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return createChannel(ctx, this.teamId, this.channel)
            .then(channel => {
                if (channel && channel.createSlackChannel) {
                    const associateRepo = new AssociateRepo();
                    associateRepo.channelId = Array.isArray(channel.createSlackChannel)
                        ? channel.createSlackChannel[0].id : channel.createSlackChannel.id;
                    associateRepo.owner = this.owner;
                    associateRepo.apiUrl = this.apiUrl;
                    associateRepo.userId = this.userId;
                    associateRepo.githubToken = this.githubToken;
                    associateRepo.repo = this.repo;
                    associateRepo.msgId = this.msgId;
                    associateRepo.teamId = this.teamId;
                    return associateRepo.handle(ctx);
                } else {
                    return ctx.messageClient.respond(
                        error("Create Channel", "Channel creation failed", ctx), { dashboard: false })
                        .then(() => Success, failure);
                }
            })
            .catch(e => failure(e));
    }
}

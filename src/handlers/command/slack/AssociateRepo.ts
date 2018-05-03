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
import { QueryNoCacheOptions } from "@atomist/automation-client/spi/graph/GraphClient";
import * as slack from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";

import { codeLine } from "@atomist/slack-messages";
import { InviteUserToSlackChannel } from "../../../typings/types";
import * as graphql from "../../../typings/types";
import { warning } from "../../../util/messages";
import { isChannel } from "../../../util/slack";
import { extractScreenNameFromMapRepoMessageId } from "../../event/push/PushToUnmappedRepo";
import * as github from "../github/gitHubApi";
import { addBotToSlackChannel } from "./AddBotToChannel";
import { linkSlackChannelToRepo } from "./LinkRepo";

export function checkRepo(token: string,
                          url: string,
                          providerId: string,
                          name: string,
                          owner: string,
                          ctx: HandlerContext): Promise<boolean> {
    return ctx.graphClient.query<graphql.ProviderTypeFromRepo.Query, graphql.ProviderTypeFromRepo.Variables>({
        name: "providerTypeFromRepo",
        variables: {
            name,
            owner,
            providerId,
        },
        options: QueryNoCacheOptions,
    })
    .then(result => {
        const provider = _.get(result, "Repo[0].org.provider.providerType");
        if (provider === "bitbucket_cloud" || provider === "bitbucket") {
            return Promise.resolve(true);
        } else {
            return github.api(token, url).repos.get({ owner, repo: name })
                .then(() => true, () => false);
        }
    });
}

export function noRepoMessage(repo: string, owner: string, ctx: HandlerContext): slack.SlackMessage {
    return warning(
        "Link Repository",
        `The repository ${codeLine(`${owner}/${repo}`)} either does not exist or you do not have access to it.`,
        ctx);
}

export function inviteUserToSlackChannel(
    ctx: HandlerContext,
    teamId: string,
    channelId: string,
    userId: string,
): Promise<InviteUserToSlackChannel.Mutation> {

    return ctx.graphClient.mutate<InviteUserToSlackChannel.Mutation,
        InviteUserToSlackChannel.Variables>({
            name: "inviteUserToSlackChannel",
            variables: {
                teamId,
                channelId,
                userId,
            },
        });
}

@CommandHandler("Invite bot, link a repository, and invite user to channel")
@Tags("slack", "repo")
export class AssociateRepo implements HandleCommand {

    @MappedParameter(MappedParameters.SlackTeam)
    public teamId: string;

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @MappedParameter(MappedParameters.GitHubRepositoryProvider)
    public provider: string;

    @MappedParameter(MappedParameters.SlackUser)
    public userId: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    @Parameter({
        displayName: "Repository Name",
        description: "name of the repository to link",
        pattern: /^[-.\w]+$/,
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public repo: string;

    @Parameter({ pattern: /^\S*$/, displayable: false, required: false })
    public msgId: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        if (!isChannel(this.channelId)) {
            const err = "The Atomist Bot can only link repositories to public channels. " +
                "Please try again with a public channel.";
            return ctx.messageClient.respond(err)
                .then(() => Success, failure);
        }
        return checkRepo(this.githubToken, this.apiUrl, this.provider, this.repo, this.owner, ctx)
            .then(repoExists => {
                if (!repoExists) {
                    return ctx.messageClient.respond(noRepoMessage(this.repo, this.owner, ctx));
                }
                return addBotToSlackChannel(ctx, this.teamId, this.channelId)
                    .then(() => linkSlackChannelToRepo(
                                ctx, this.teamId, this.channelId, this.repo, this.owner, this.provider))
                    .then(() => inviteUserToSlackChannel(ctx, this.teamId, this.channelId, this.userId))
                    .then(() => {
                        const msg = `Linked ${slack.bold(this.owner + "/" + this.repo)} to ` +
                            `${slack.channel(this.channelId)} and invited you to the channel.`;
                        const screenName = extractScreenNameFromMapRepoMessageId(this.msgId);
                        if (screenName) {
                            return ctx.messageClient.addressUsers(msg, screenName, { id: this.msgId });
                        } else {
                            return ctx.messageClient.respond(msg);
                        }
                    });
            })
            .then(() => Success, failure);
    }

}

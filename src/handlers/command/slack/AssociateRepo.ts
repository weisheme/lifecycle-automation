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
import * as slack from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";

import { InviteUserToSlackChannel } from "../../../typings/types";
import * as graphql from "../../../typings/types";
import { isChannel } from "../../../util/slack";
import { extractScreenNameFromMapRepoMessageId } from "../../event/push/PushToUnmappedRepo";
import * as github from "../github/gitHubApi";
import { addBotToSlackChannel } from "./AddBotToChannel";
import { linkSlackChannelToRepo } from "./LinkRepo";

export function checkRepo(token: string, url: string, repo: string, owner: string): Promise<boolean> {
    return github.api(token, url).repos.get({ owner, repo })
        .then(() => true, () => false);
}

export function noRepoMessage(repo: string, owner: string): slack.SlackMessage {
    return { text: `The repository ${owner}/${repo} either does not exist or you do not have access to it.` };
}

export function inviteUserToSlackChannel(
    ctx: HandlerContext,
    channelId: string,
    userId: string,
): Promise<InviteUserToSlackChannel.Mutation> {

    return ctx.graphClient.executeMutationFromFile<InviteUserToSlackChannel.Mutation,
        InviteUserToSlackChannel.Variables>(
        "graphql/mutation/inviteUserToSlackChannel",
        { channelId, userId },
    );
}

@CommandHandler("Invite bot, link a repository, and invite user to channel")
@Tags("slack", "repo")
export class AssociateRepo implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

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
        return checkRepo(this.githubToken, this.apiUrl, this.repo, this.owner)
            .then(repoExists => {
                if (!repoExists) {
                    ctx.messageClient.respond(noRepoMessage(this.repo, this.owner));
                    return;
                }
                return addBotToSlackChannel(ctx, this.channelId)
                    .then(() => {
                        return ctx.graphClient.executeQueryFromFile<graphql.ProviderIdFromOrg.Query,
                            graphql.ProviderIdFromOrg.Variables>(
                            "graphql/query/providerIdFromOrg",
                            { owner: this.owner })
                            .then(result => {
                                const providerId = _.get(result, "Org[0].provider.providerId");
                                return linkSlackChannelToRepo(
                                    ctx, this.channelId, this.repo, this.owner, providerId);
                            });
                    })
                    .then(() => inviteUserToSlackChannel(ctx, this.channelId, this.userId))
                    .then(() => {
                        const msg = `Linked ${slack.bold(this.owner + "/" + this.repo)} to ` +
                            `${slack.channel(this.channelId)} and invited you to the channel.`;
                        const screenName = extractScreenNameFromMapRepoMessageId(this.msgId);
                        if (screenName) {
                            ctx.messageClient.addressUsers(msg, screenName, { id: this.msgId });
                        } else {
                            ctx.messageClient.respond(msg);
                        }
                        return Success;
                    });
            })
            .then(() => Success, failure);
    }

}

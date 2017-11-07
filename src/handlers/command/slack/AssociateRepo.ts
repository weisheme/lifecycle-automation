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
} from "@atomist/automation-client/Handlers";
import * as slack from "@atomist/slack-messages/SlackMessages";

import { AddBotToSlackChannel, InviteUserToSlackChannel } from "../../../typings/types";
import { extractScreenNameFromMapRepoMessageId } from "../../event/push/PushToUnmappedRepo";
import * as github from "../github/gitHubApi";
import { addBotToSlackChannel } from "./AddBotToChannel";
import { linkSlackChannelToRepo } from "./LinkRepo";

export function checkRepo(token: string, url: string, repo: string, owner: string): Promise<boolean> {
    return github.api(token, url).repos.get({ owner, repo })
        .then(x => true, e => false);
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
    public apiUrl: string = "https://api.github.com/";

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
        return checkRepo(this.githubToken, this.apiUrl, this.repo, this.owner)
            .then(repoExists => {
                if (!repoExists) {
                    ctx.messageClient.respond(noRepoMessage(this.repo, this.owner));
                    return;
                }
                return addBotToSlackChannel(ctx, this.channelId)
                    .then(() => linkSlackChannelToRepo(ctx, this.channelId, this.repo, this.owner))
                    .then(() => inviteUserToSlackChannel(ctx, this.channelId, this.userId))
                    .then(() => {
                        if (this.msgId) {
                            const screenName = extractScreenNameFromMapRepoMessageId(this.msgId);
                            const msg = `Linked ${slack.bold(this.owner + "/" + this.repo)} to ` +
                                `${slack.channel(this.channelId)} and invited you to the channel.`;
                            ctx.messageClient.addressUsers(msg, screenName, { id: this.msgId });
                        }
                        return Success;
                    });
            })
            .then(x => Success, failure);
    }

}

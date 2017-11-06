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

import {
    AddBotToSlackChannel,
    InviteUserToSlackChannel,
    LinkSlackChannelToRepo,
} from "../../../typings/types";
import { extractScreenNameFromMapRepoMessageId } from "../../event/push/PushToUnmappedRepo";
import * as github from "../github/gitHubApi";

/**
 * Link a repository and channel.
 */
@CommandHandler("Link a repository and channel", "repo")
@Tags("slack", "repo")
export class LinkRepo implements HandleCommand {

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
        return this.checkRepo(this.githubToken, this.apiUrl, this.repo, this.owner)
            .then(repoExists => {
                if (!repoExists) {
                    ctx.messageClient.respond(this.noRepoMessage(this.repo, this.owner));
                    return;
                }
                return ctx.graphClient.executeMutationFromFile<AddBotToSlackChannel.Mutation,
                    AddBotToSlackChannel.Variables>(
                    "graphql/mutation/addBotToSlackChannel",
                    { channelId: this.channelId })
                    .then(x => ctx.graphClient.executeMutationFromFile<LinkSlackChannelToRepo.Mutation,
                        LinkSlackChannelToRepo.Variables>(
                        "graphql/mutation/linkSlackChannelToRepo",
                        { channelId: this.channelId, repo: this.repo, owner: this.owner }))
                    .then(x => ctx.graphClient.executeMutationFromFile<InviteUserToSlackChannel.Mutation,
                        InviteUserToSlackChannel.Variables>(
                        "graphql/mutation/inviteUserToSlackChannel",
                        { channelId: this.channelId, userId: this.userId }))
                    .then(x => {
                        if (this.msgId) {
                            const screenName = extractScreenNameFromMapRepoMessageId(this.msgId);
                            const msg = `Linked ${slack.bold(this.owner + "/" + this.repo)} to ` +
                                `${slack.channel(this.channelId)} and invited you to the channel.`;
                            ctx.messageClient.addressUsers(msg, screenName, { id: this.msgId });
                        }
                        return Success;
                    });
            })
            .then(x => Success, e => failure(e));
    }

    private checkRepo(token: string, url: string, repo: string, owner: string): Promise<boolean> {
        return github.api(token, url).repos.get({ owner, repo })
            .then(x => true)
            .catch(e => false);
    }

    private noRepoMessage(repo: string, owner: string): slack.SlackMessage {
        return { text: `The repository ${owner}/${repo} either does not exist or you do not have access to it.` };

    }

}

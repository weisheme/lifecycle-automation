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
    return ctx.graphClient.executeMutationFromFile<CreateSlackChannel.Mutation, CreateSlackChannel.Variables>(
        "../../../graphql/mutation/createSlackChannel",
        { teamId, name: channelName },
        {},
        __dirname,
    );
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
                    return associateRepo.handle(ctx);
                } else {
                    return ctx.messageClient.respond(
                        error("Create Channel", "Channel creation failed", ctx))
                        .then(() => Success, failure);
                }
            })
            .catch(e => failure(e));
    }
}

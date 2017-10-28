import {
    CommandHandler,
    MappedParameter,
    Parameter,
    Tags,
} from "@atomist/automation-client/decorators";
import {
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameters,
    Success,
} from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";

/**
 * Create a channel and link it to a repository.
 */
@CommandHandler("Create channel and link it to a repository")
@Tags("slack", "channel", "repo")
export class CreateChannel implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @Parameter({
        displayName: "Channel Name",
        description: "Name of the channel to create",
        pattern: /^\S+$/,
        minLength: 1,
        maxLength: 21,
        required: true,
    })
    public channel: string;

    @Parameter({
        displayName: "Repo Name",
        description: "Name of the repository to link to the channel",
        pattern: /^[-.\w]+$/,
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public repo: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeMutationFromFile<graphql.CreateSlackChannel.Mutation,
            graphql.CreateSlackChannel.Variables>(
                "graphql/mutation/createSlackChannel",
                { name: this.channel })
            .then(channel => {
                const channelId = (channel as any).createSlackChannel[0].id;
                return ctx.graphClient.executeMutationFromFile<graphql.AddBotToSlackChannel.Mutation,
                    graphql.AddBotToSlackChannel.Variables>(
                        "graphql/mutation/addBotToSlackChannel",
                        { channelId })
                    .then(_ => ctx.graphClient.executeMutationFromFile<
                        graphql.LinkSlackChannelToRepo.Mutation, graphql.LinkSlackChannelToRepo.Variables>(
                            "graphql/mutation/linkSlackChannelToRepo",
                        { channelId, repo: this.repo, owner: this.owner }));
            })
            .then(() => Success)
            .catch(e => failure(e));
    }
}

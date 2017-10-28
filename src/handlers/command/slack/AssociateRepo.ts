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
 * Link a repository and channel.
 */
@CommandHandler("Link a repository and channel", "repo")
@Tags("slack", "repo")
export class AssociateRepo implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @Parameter({
        displayName: "Repository Name",
        description: "Name of the repository to link",
        pattern: /^[-.\w]+$/,
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public repo: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeMutationFromFile<graphql.AddBotToSlackChannel.Mutation,
            graphql.AddBotToSlackChannel.Variables>(
                "graphql/mutation/addBotToSlackChannel",
                { channelId: this.channelId })
            .then(_ => ctx.graphClient.executeMutationFromFile<graphql.LinkSlackChannelToRepo.Mutation,
                graphql.LinkSlackChannelToRepo.Variables>(
                    "graphql/mutation/linkSlackChannelToRepo",
                    { channelId: this.channelId, repo: this.repo, owner: this.owner }))
            .then(() => Success)
            .catch(e => failure(e));
    }
}

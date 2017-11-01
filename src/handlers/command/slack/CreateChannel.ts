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

import { CreateSlackChannel } from "../../../typings/types";
import { AssociateRepo } from "./AssociateRepo";

/**
 * Create a channel and link it to a repository.
 */
@CommandHandler("Create channel and link it to a repository")
@Tags("slack", "channel", "repo")
export class CreateChannel implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

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

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeMutationFromFile<CreateSlackChannel.Mutation, CreateSlackChannel.Variables>(
            "graphql/mutation/createSlackChannel", { name: this.channel })
            .then(channel => {
                const associateRepo = new AssociateRepo();
                associateRepo.channelId = channel.createSlackChannel[0].id;
                associateRepo.owner = this.owner;
                associateRepo.apiUrl = this.apiUrl;
                associateRepo.githubToken = this.githubToken;
                associateRepo.repo = this.repo;
                return associateRepo.handle(ctx);
            })
            .then(() => Success)
            .catch(e => failure(e));
    }
}

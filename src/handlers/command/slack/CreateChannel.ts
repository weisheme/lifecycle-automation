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
import { logger } from "@atomist/automation-client/internal/util/logger";

import { addBotToSlackChannel, createSlackChannel, linkSlackChannelToRepo } from "./mutations";

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
        logger.info(`creating repo ${this.owner}/${this.repo} and linking to channel ${this.channel}`);
        return ctx.graphClient.executeMutation(createSlackChannel, { name: this.channel })
            .then(channel => {
                const channelId = (channel as any).createSlackChannel[0].id;
                return ctx.graphClient.executeMutation(addBotToSlackChannel, { channelId })
                    .then(_ => ctx.graphClient.executeMutation(linkSlackChannelToRepo, {
                        channelId,
                        repo: this.repo,
                        owner: this.owner,
                    }));
            })
            .then(_ => Success)
            .catch(e => failure(e));
    }
}

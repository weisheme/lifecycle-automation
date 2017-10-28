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

import { addBotToSlackChannel, linkSlackChannelToRepo } from "./mutations";

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
        displayName: "Repo Name",
        description: "Name of the repository to link",
        pattern: /^[-.\w]+$/,
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public repo: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        logger.info(`linking repo ${this.owner}/${this.repo} to channel ${this.channelId}`);
        return ctx.graphClient.executeMutationFromFile("graphql/addBotToSlackChannel", { channelId: this.channelId })
            .then(_ => ctx.graphClient.executeMutationFromFile("graphql/linkSlackChannelToRepo", {
                channelId: this.channelId,
                repo: this.repo,
                owner: this.owner,
            }))
            .then(_ => Success)
            .catch(e => failure(e));
    }
}

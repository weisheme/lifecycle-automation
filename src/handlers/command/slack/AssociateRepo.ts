import {
    CommandHandler,
    MappedParameter,
    Parameter,
    Secret,
    Tags,
} from "@atomist/automation-client/decorators";
import {
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameters,
    Secrets,
    Success,
} from "@atomist/automation-client/Handlers";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";

import { AddBotToSlackChannel, LinkSlackChannelToRepo } from "../../../typings/types";
import * as github from "../github/gitHubApi";

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

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @Secret(Secrets.userToken(["repo"]))
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
                    .then(_ => ctx.graphClient.executeMutationFromFile<LinkSlackChannelToRepo.Mutation,
                        LinkSlackChannelToRepo.Variables>(
                        "graphql/mutation/linkSlackChannelToRepo",
                        { channelId: this.channelId, repo: this.repo, owner: this.owner }));
            })
            .then(() => Success)
            .catch(e => failure(e));
    }

    private checkRepo(token: string, url: string, repo: string, owner: string): Promise<boolean> {
        return github.api(token, url).repos.get({ owner, repo })
            .then(x => true)
            .catch(e => false);
    }

    private noRepoMessage(repo: string, owner: string): SlackMessage {
        return { text: `The repository ${owner}/${repo} either does not exist or you do not have access to it.` };

    }

}

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

import { LinkSlackChannelToRepo } from "../../../typings/types";
import * as github from "../github/gitHubApi";
import { checkRepo, noRepoMessage } from "./AssociateRepo";

export const DefaultBotName = "atomist";

export function linkSlackChannelToRepo(
    ctx: HandlerContext,
    channelId: string,
    repo: string,
    owner: string,
): Promise<LinkSlackChannelToRepo.Mutation> {

    return ctx.graphClient.executeMutationFromFile<LinkSlackChannelToRepo.Mutation, LinkSlackChannelToRepo.Variables>(
        "graphql/mutation/linkSlackChannelToRepo",
        { channelId, repo, owner },
    );
}

@CommandHandler("Link a repository and channel")
@Tags("slack", "repo")
export class LinkRepo implements HandleCommand {

    public static linkRepoCommand(
        botName: string = DefaultBotName,
        owner: string = "OWNER",
        repo: string = "REPO",
    ): string {

        return `@${botName} repo owner=${owner} name=${repo}`;
    }

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

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
    public name: string;

    @Parameter({ pattern: /^\S*$/, displayable: false, required: false })
    public msgId: string;

    @Parameter({ pattern: /^[\S\s]*$/, displayable: false, required: false })
    public msg: string = "";

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return checkRepo(this.githubToken, this.apiUrl, this.name, this.owner)
            .then(repoExists => {
                if (!repoExists) {
                    ctx.messageClient.respond(noRepoMessage(this.name, this.owner));
                    return;
                }
                return linkSlackChannelToRepo(ctx, this.channelId, this.name, this.owner)
                    .then(() => {
                        if (this.msgId) {
                            ctx.messageClient.addressChannels(this.msg, this.channelName, { id: this.msgId });
                        }
                        return Success;
                    });
            })
            .then(x => Success, failure);
    }

}

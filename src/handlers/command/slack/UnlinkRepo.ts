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
import { guid } from "@atomist/automation-client/internal/util/string";
import * as slack from "@atomist/slack-messages/SlackMessages";

import {
    codeLine,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as graphql from "../../../typings/types";
import { success } from "../../../util/messages";
import {
    checkRepo,
    noRepoMessage,
} from "./AssociateRepo";

@CommandHandler("Unlink a repository and channel")
@Tags("slack", "repo")
export class UnlinkRepo implements HandleCommand {

    @MappedParameter(MappedParameters.SlackTeam)
    public teamId: string;

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @MappedParameter(MappedParameters.GitHubOwnerWithUser)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

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

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return checkRepo(this.githubToken, this.apiUrl, this.name, this.owner)
            .then(repoExists => {
                if (!repoExists) {
                    return ctx.messageClient.respond(noRepoMessage(this.name, this.owner, ctx));
                } else {
                    return ctx.graphClient.executeMutationFromFile<graphql.UnlinkSlackChannelFromRepo.Mutation,
                        graphql.UnlinkSlackChannelFromRepo.Variables>(
                        "../../../graphql/mutation/unlinkSlackChannelFromRepo",
                        { teamId: this.teamId, channelId: this.channelId, repo: this.name, owner: this.owner },
                        {},
                        __dirname)
                        .then(() => {
                            const text = `Successfully unlinked repository ${
                                codeLine(`${this.owner}/${this.name}`)} from this channel`;
                            const msg = success("Unlink Repository", text);
                            return ctx.messageClient.respond(msg, { id: this.msgId });
                        });
                }
            })
            .then(() => Success, failure);
    }

}

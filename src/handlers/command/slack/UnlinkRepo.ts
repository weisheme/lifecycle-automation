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
import {
    checkRepo,
    noRepoMessage,
} from "./AssociateRepo";

@CommandHandler("Unlink a repository and channel")
@Tags("slack", "repo")
export class UnlinkRepo implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @MappedParameter(MappedParameters.GitHubOwner)
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
                    return ctx.messageClient.respond(noRepoMessage(this.name, this.owner));
                } else {
                    return ctx.graphClient.executeMutationFromFile<graphql.UnlinkSlackChannelFromRepo.Mutation,
                        graphql.UnlinkSlackChannelFromRepo.Variables>(
                        "graphql/mutation/unlinkSlackChannelFromRepo",
                        { channelId: this.channelId, repo: this.name, owner: this.owner })
                        .then(() => ctx.messageClient.respond(successMessage(this.name, this.owner),
                            { id: this.msgId }));
                }
            })
            .then(() => Success, failure);
    }

}

function successMessage(repo: string, owner: string): SlackMessage {
    const text = `Successfully unlinked repository`;
    const msg: SlackMessage = {
        attachments: [{
            text: `${codeLine(`${owner}/${repo}`)}`,
            author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${guid()}`,
            author_name: text,
            fallback: text,
            mrkdwn_in: ["text"],
            color: "#45B254",
        }],
    };
    return msg;
}

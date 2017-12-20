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
import * as slack from "@atomist/slack-messages/SlackMessages";

import { LinkRepo } from "./LinkRepo";

@CommandHandler("Link a repository, provided as an owner/repo slug, and channel")
@Tags("slack", "repo")
export class LinkOwnerRepo implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    @Parameter({
        displayName: "Repository Slug",
        description: "'owner/name' of the repository to link",
        pattern: /^[-.\w]+\/[-.\w]+$/,
        minLength: 1,
        maxLength: 200,
        required: true,
    })
    public slug: string;

    @Parameter({ pattern: /^\S*$/, displayable: false, required: false })
    public msgId: string;

    @Parameter({ pattern: /^[\S\s]*$/, displayable: false, required: false })
    public msg: string = "";

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        const slugParts = this.slug.split("/", 2);
        if (!slugParts || slugParts.length !== 2 || !slugParts[0] || !slugParts[1]) {
            const err = `failed to parse repo slug '${this.slug}' into owner and name, ` +
                `not linking to #${this.channelName}`;
            console.error(err);
            return ctx.messageClient.respond(err)
                .then(() => Success, failure);
        }
        const owner = slugParts[0];
        const name = slugParts[1];
        const linkRepo = new LinkRepo();
        linkRepo.channelId = this.channelId;
        linkRepo.channelName = this.channelName;
        linkRepo.apiUrl = this.apiUrl;
        linkRepo.githubToken = this.githubToken;
        linkRepo.name = name;
        linkRepo.owner = owner;
        linkRepo.msgId = this.msgId;
        linkRepo.msg = this.msg;

        return linkRepo.handle(ctx)
            .then(() => Success, failure);
    }
}

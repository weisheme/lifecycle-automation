import {
    CommandHandler,
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Parameter,
    Success,
} from "@atomist/automation-client/Handlers";
import { guid } from "@atomist/automation-client/internal/util/string";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import {
    Attachment,
    SlackMessage,
    url,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { repoUrl } from "../../../util/helpers";
import { LinkRepo } from "./LinkRepo";
import { UnlinkRepo } from "./UnlinkRepo";

@CommandHandler("View repos linked to this channel and optionally unlink them", "repos", "repositories")
export class ListRepoLinks implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @Parameter({ pattern: /^\S*$/, displayable: false, required: false })
    public msgId: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        if (!this.msgId) {
            this.msgId = guid();
        }

        return ctx.graphClient.executeQueryFromFile<graphql.ChatChannelByChannelId.Query,
            graphql.ChatChannelByChannelId.Variables>(
                "graphql/query/chatChannelByChannelId",
                { channelName: this.channelName })
            .then(result => {
                const repos = _.get(result, "ChatChannel[0].repos");
                if (repos && repos.length > 0) {

                    const msg: SlackMessage = {
                        text: "The following repositories are linked to this channel:",
                        attachments: [],
                    };

                    repos.forEach(r => {
                        const handler = new UnlinkRepo();
                        handler.msgId = this.msgId;
                        handler.name = r.name;

                        const slug = `${r.owner}/${r.name}`;
                        const attachment: Attachment = {
                            fallback: slug,
                            text: `${url(repoUrl(r), slug)}`,
                            actions: [
                                buttonForCommand({ text: "Unlink", style: "danger" }, handler),
                            ],
                        };
                        msg.attachments.push(attachment);
                    });

                    return ctx.messageClient.respond(linkRepoAttachment(msg), { id: this.msgId });
                } else {

                    const text = "There are no repositories linked to this channel." +
                        "\nTo link a repository, type `@atomist repo` or use the button below.";

                    const msg: SlackMessage = {
                        attachments: [{
                            text,
                            fallback: text,
                            mrkdwn_in: ["text"],
                        }],
                    };

                    return ctx.messageClient.respond(linkRepoAttachment(msg), { id: this.msgId });
                }
            })
            .then(() => Success, failure);
    }
}

function linkRepoAttachment(msg: SlackMessage) {
    const handler = new LinkRepo();
    const attachment: Attachment = {
        text: "Link a new repository to this channel:",
        fallback: "Link a new repository to this channel:",
        actions: [
            buttonForCommand({ text: "Link Repository", style: "primary" }, handler),
        ],
    };
    msg.attachments.push(attachment);
    return msg;
}

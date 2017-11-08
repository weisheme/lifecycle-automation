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

import {
    AddBotToSlackChannel,
    InviteUserToSlackChannel,
    LinkSlackChannelToRepo,
} from "../../../typings/types";
import { extractScreenNameFromMapRepoMessageId } from "../../event/push/PushToUnmappedRepo";
import * as github from "../github/gitHubApi";
import { checkRepo, noRepoMessage } from "./AssociateRepo";

@CommandHandler("replace repo channel linking prompt with instructions")
@Tags("slack", "repo")
export class NoLinkRepo implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @Parameter({ pattern: /^\S*$/, displayable: false, required: false })
    public msgId: string;

    @Parameter({ pattern: /^[\S\s]*$/, displayable: false, required: false })
    public msg: string = "";

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        if (this.msgId) {
            return ctx.messageClient.addressChannels(this.msg, this.channelName, { id: this.msgId })
                .then(() => Success, failure);
        }
        return Promise.resolve(Success);
    }

}

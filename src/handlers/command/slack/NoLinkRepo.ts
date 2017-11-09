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
    Tags,
} from "@atomist/automation-client";
import * as slack from "@atomist/slack-messages/SlackMessages";

@CommandHandler("Replace repo channel linking prompt with instructions")
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

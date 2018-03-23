import {
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    Parameter,
    Parameters,
    Success,
} from "@atomist/automation-client";
import { commandHandlerFrom } from "@atomist/automation-client/onCommand";
import { success } from "../../../util/messages";

@Parameters()
export class CancelParameters {

    @Parameter({ description: "message id", required: false, displayable: false })
    public msgId: string;

    @Parameter({ description: "title", required: false, displayable: false })
    public title: string;

    @Parameter({ description: "text", required: false, displayable: false })
    public text: string;
}

export function cancelMessage() {
    return async (ctx: HandlerContext, params: CancelParameters): Promise<HandlerResult> => {
            return ctx.messageClient.respond(success(params.title, params.text), { id: params.msgId })
                .then(() => Success, failure);
        };
}

export function cancelConversation(): HandleCommand<CancelParameters> {
    return commandHandlerFrom(
        cancelMessage(),
        CancelParameters,
        "cancelConversation",
        "Cancel an ongoing conversation",
        [],
    );
}

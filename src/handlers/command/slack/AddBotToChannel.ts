import {
    CommandHandler,
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Success,
    Tags,
} from "@atomist/automation-client";
import * as slack from "@atomist/slack-messages/SlackMessages";

import { AddBotToSlackChannel } from "../../../typings/types";

export function addBotToSlackChannel(ctx: HandlerContext,
                                     teamId: string,
                                     channelId: string): Promise<AddBotToSlackChannel.Mutation> {
    return ctx.graphClient.executeMutationFromFile<AddBotToSlackChannel.Mutation, AddBotToSlackChannel.Variables>(
        "../../../graphql/mutation/addBotToSlackChannel",
        { teamId, channelId },
        {},
        __dirname
    );
}

@CommandHandler("Invite the Atomist Bot to a channel")
@Tags("slack", "bot")
export class AddBotToChannel implements HandleCommand {

    @MappedParameter(MappedParameters.SlackTeam)
    public teamId: string;

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return addBotToSlackChannel(ctx, this.teamId, this.channelId)
            .then(() => Success, failure);
    }

}

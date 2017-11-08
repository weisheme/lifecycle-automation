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

import { AddBotToSlackChannel } from "../../../typings/types";
import { extractScreenNameFromMapRepoMessageId } from "../../event/push/PushToUnmappedRepo";
import * as github from "../github/gitHubApi";
import { checkRepo, noRepoMessage } from "./AssociateRepo";

export function addBotToSlackChannel(ctx: HandlerContext, channelId: string): Promise<AddBotToSlackChannel.Mutation> {
    return ctx.graphClient.executeMutationFromFile<AddBotToSlackChannel.Mutation, AddBotToSlackChannel.Variables>(
        "graphql/mutation/addBotToSlackChannel",
        { channelId },
    );
}

@CommandHandler("Invite the Atomist Bot to a channel")
@Tags("slack", "bot")
export class AddBotToChannel implements HandleCommand {

    @MappedParameter(MappedParameters.SlackChannel)
    public channelId: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return addBotToSlackChannel(ctx, this.channelId)
            .then(x => Success, failure);
    }

}

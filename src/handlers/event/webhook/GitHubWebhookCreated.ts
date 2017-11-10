import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success, Tags,
} from "@atomist/automation-client";
import * as GraqhQL from "@atomist/automation-client/graph/graphQL";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import {
    Attachment,
    codeLine,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";

import * as graphql from "../../../typings/types";
import { AddBotToChannel } from "../../command/slack/AddBotToChannel";
import { DefaultBotName } from "../../command/slack/LinkRepo";

// list of channels we look for to create buttons
const Channels = ["dev", "engineering", "development", "devops"];

@EventHandler("Displays a welcome message when a new org webhook is installed",
    GraqhQL.subscriptionFromFile("graphql/subscription/githubOrgWebhook"))
@Tags("enrollment")
export class GitHubWebhookCreated implements HandleEvent<graphql.GitHubWebhookCreated.Subscription> {

    public handle(
        event: EventFired<graphql.GitHubWebhookCreated.Subscription>,
        ctx: HandlerContext,
    ): Promise<HandlerResult> {

        const members = _.get(event.data, "GitHubOrgWebhook[0].org.chatTeam.members", []) as
            graphql.GitHubWebhookCreated.Members[];
        if (!members || members.length < 1) {
            return Promise.resolve(Success);
        }
        const owner = members.find(m => m.isOwner === "true");
        if (!owner) {
            return Promise.resolve(Success);
        }
        const ownerName = owner.screenName;
        const bot = members.find(m => m.isAtomistBot === "true");
        const botName = (bot && bot.screenName) ? bot.screenName : DefaultBotName;

        const channels = ((_.get(event.data, "GitHubOrgWebhook[0].org.chatTeam.channels", []) || []) as
            graphql.GitHubWebhookCreated.Channels[])
            .filter(c => Channels.some(cc => cc === c.name));

        const welcomeAttachment: Attachment = {
            fallback: `Invite me to any channel where your team works using '/invite @${botName}'.`,
            mrkdwn_in: ["text"],
        };
        let suffix = ".";
        if (channels.length > 0) {
            suffix = " or click one of the buttons below.";
            welcomeAttachment.actions = channels.map(c => {
                const addBotCmd = new AddBotToChannel();
                addBotCmd.channelId = c.channelId;
                return buttonForCommand({ text: `#${c.name}` }, addBotCmd);
            });
        }
        welcomeAttachment.text = `Invite me to any channel where your team works using ` +
            codeLine(`/invite @${botName}`) + suffix;

        const welcomeMsg: SlackMessage = { attachments: [welcomeAttachment] };
        return ctx.messageClient.addressUsers(welcomeMsg, ownerName)
            .then(() => Success, failure);
    }
}

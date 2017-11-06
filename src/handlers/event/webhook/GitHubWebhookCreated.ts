import * as GraqhQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client/Handlers";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { LinkRepo } from "../../command/slack/LinkRepo";

// list of channels we look for to create buttons
const Channels = ["dev", "engineering", "development", "devops"];

@EventHandler("Displays a welcome message when a new org webhook is installed",
    GraqhQL.subscriptionFromFile("graphql/subscription/githubOrgWebhook"))
export class GitHubWebhookCreated implements HandleEvent<graphql.GitHubWebhookCreated.Subscription> {

    public handle(event: EventFired<graphql.GitHubWebhookCreated.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        let channels = _.get(event.data, "GitHubOrgWebhook[0].org.chatTeam.channels", []) || [];
        if (channels) {
            channels = channels.filter(c => Channels.some(cc => cc === c.name));
        }

        const owner = _.get(event.data, "GitHubOrgWebhook[0].org.chatTeam.members[0].screenName");

        if (!owner) {
            return Promise.resolve(Success);
        }

        if (channels.length > 0) {
            const msg = `I can now tell you about GitHub events like pushes, PRs, and issues. \
Invite me to any channel where your team works with \`/invite @atomist\`, or \
click one of the buttons below.`;
            const welcomeMsg: SlackMessage = {
                attachments: [
                    {
                        fallback: msg,
                        text: msg,
                        mrkdwn_in: ["text"],
                        actions: channels.map(c => createAssociateRepoButton(c)),
                    }],
            };
            return ctx.messageClient.addressUsers(welcomeMsg, owner)
                .then(() => Success, failure);
        } else {
            const msg = `I can now tell you about GitHub events like pushes, PRs, and issues.
Invite me to any channel where your team works with \`/invite @atomist\`.`;
            const welcomeMsg: SlackMessage = {
                attachments: [
                    {
                        fallback: msg,
                        text: msg,
                        mrkdwn_in: ["text"],
                    },
                ],
            };
            return ctx.messageClient.addressUsers(welcomeMsg, owner)
                .then(() => Success, failure);
        }
    }
}

function createAssociateRepoButton(channel: graphql.GitHubWebhookCreated.Channels) {
    const handler = new LinkRepo();
    handler.repo = channel.name;
    handler.channelId = channel.channelId;
    return buttonForCommand({text: `#${channel.name}`}, handler);
}

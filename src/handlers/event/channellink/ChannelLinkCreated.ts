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
import {
    escape,
    SlackMessage,
    url,
} from "@atomist/slack-messages/SlackMessages";
import * as graphql from "../../../typings/types";
import { repoUrl } from "../../../util/helpers";

@EventHandler("Display an unlink message when a channel is linked",
    GraqhQL.subscriptionFromFile("graphql/subscription/channelLinkCreated"))
export class ChannelLinkCreated implements HandleEvent<graphql.ChannelLinkCreated.Subscription> {

    public handle(event: EventFired<graphql.ChannelLinkCreated.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const channelName = event.data.ChannelLink[0].channel.name || event.data.ChannelLink[0].channel.normalizedName;
        const repo = event.data.ChannelLink[0].repo;
        const msg = `${url(repoUrl(repo), `${repo.owner}/${repo.name}`)} is now linked to this \
channel. I will send activity from that repository here. To turn this \
off at any time, type \`@atomist repos\` and click the button.`;

        const repoMsg: SlackMessage = {
            attachments: [{
                fallback: escape(msg),
                text: msg,
                mrkdwn_in: ["text"],
            }],
        };

        return ctx.messageClient.addressChannels(repoMsg, channelName)
            .then(() => Success, failure);
    }
}

import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success, Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    addressSlackChannels,
    buttonForCommand,
    menuForCommand,
    MenuSpecification,
    OptionGroup,
} from "@atomist/automation-client/spi/message/MessageClient";
import * as slack from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";

import * as graphql from "../../../typings/types";
import {
    repoChannelName,
    repoSlackLink,
    repoSlug,
} from "../../../util/helpers";
import { LinkOwnerRepo } from "../../command/slack/LinkOwnerRepo";
import {
    DefaultBotName,
    LinkRepo,
} from "../../command/slack/LinkRepo";
import { NoLinkRepo } from "../../command/slack/NoLinkRepo";

@EventHandler("Display a helpful message when the bot joins a channel",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/botJoinedChannel", __dirname))
@Tags("enrollment")
export class BotJoinedChannel implements HandleEvent<graphql.BotJoinedChannel.Subscription> {

    public handle(e: EventFired<graphql.BotJoinedChannel.Subscription>, ctx: HandlerContext): Promise<HandlerResult> {

        return Promise.all(e.data.UserJoinedChannel.map(j => {
            if (!j.user) {
                console.log(`UserJoinedChannel.user is false, probably not the bot joining a channel`);
                return Success;
            }
            if (j.user.isAtomistBot !== "true") {
                console.log(`user joining the channel is not the bot: ${j.user.screenName}`);
                return Success;
            }
            if (!j.channel) {
                console.log(`UserJoinedChannel.channel is false, strange`);
                return Success;
            }
            if (!j.channel.name) {
                console.log(`the channel has no name, odd`);
                return Success;
            }
            const channelName = j.channel.name;
            if (j.channel.botInvitedSelf) {
                console.log(`bot invited self to #${channelName}, not sending message`);
                return Success;
            }
            const botName = (j.user.screenName) ? j.user.screenName : DefaultBotName;

            const helloText = `Hello! Now I can respond to messages beginning with @${botName}. ` +
                `To see some options, try \`@${botName} help\``;

            if (j.channel.repos && j.channel.repos.length > 0) {
                const linkedRepoNames = j.channel.repos.map(r => repoSlackLink(r));
                const msg = `${helloText}
I will post GitHub notifications about ${linkedRepoNames.join(", ")} here.`;
                return ctx.messageClient.send(msg, addressSlackChannels(j.channel.team.id, channelName));
            }

            if (!j.channel.team || !j.channel.team.orgs || j.channel.team.orgs.length < 1) {
                const msg = `${helloText}
I won't be able to do much without GitHub integration, though. Run \`@atomist enroll org\` to set that up.`;
                return ctx.messageClient.send(msg, addressSlackChannels(j.channel.team.id, channelName));
            }
            const orgs = j.channel.team.orgs;
            const apiUrls = _.uniq(orgs.filter(o => o && o.provider && o.provider.apiUrl).map(o => o.provider.apiUrl));
            if (apiUrls && apiUrls.length > 1) {
                console.warn(`multiple GitHub providers found, ${JSON.stringify(apiUrls)}, using the first`);
            }
            const apiUrl = (apiUrls && apiUrls[0]) ? apiUrls[0] : undefined;

            const allRepos = _.flatMap(orgs, o => (o && o.repo) ? o.repo : []);
            if (allRepos.length < 1) {
                const owners = orgs.map(o => o.owner);
                let ownerText: string;
                if (owners.length > 2) {
                    owners[owners.length - 1] = "or " + owners[owners.length - 1];
                    ownerText = owners.join(", ");
                } else if (owners.length === 2) {
                    ownerText = owners.join(" or ");
                } else if (owners.length === 1) {
                    ownerText = owners[0];
                }
                ownerText = (ownerText) ? ` for ${ownerText}` : "";
                const msg = `${helloText}
I don't see any repositories in GitHub${ownerText}.`;
                return ctx.messageClient.send(msg, addressSlackChannels(j.channel.team.id, channelName));
            }

            const msgId = `channel_link/bot_joined_channel/${channelName}`;

            const matchyRepos = allRepos.filter(r =>
                repoChannelName(r.name).indexOf(channelName) > -1 ||
                channelName.indexOf(repoChannelName(r.name)) > -1).slice(0, 2);
            const actions: slack.Action[] = [];
            matchyRepos.forEach(r => {
                const linkRepo = new LinkRepo();
                linkRepo.apiUrl = apiUrl;
                linkRepo.channelId = j.channel.channelId;
                linkRepo.channelName = channelName;
                linkRepo.owner = r.owner;
                linkRepo.name = r.name;
                linkRepo.msgId = msgId;
                linkRepo.msg = helloText;
                actions.push(buttonForCommand({ text: repoSlug(r) }, linkRepo));
            });

            const menu: MenuSpecification = {
                text: "repository...",
                options: repoOptions(orgs),
            };
            const linkRepoSlug = new LinkOwnerRepo();
            linkRepoSlug.apiUrl = apiUrl;
            linkRepoSlug.channelId = j.channel.channelId;
            linkRepoSlug.channelName = channelName;
            linkRepoSlug.msgId = msgId;
            linkRepoSlug.msg = helloText;
            actions.push(menuForCommand(menu, linkRepoSlug, "slug"));

            const noLinkRepo = new NoLinkRepo();
            noLinkRepo.channelName = channelName;
            noLinkRepo.msgId = msgId;
            const linkCmd = LinkRepo.linkRepoCommand(botName);
            noLinkRepo.msg = `${helloText}
OK. If you want to link a repository later, type \`${linkCmd}\``;
            actions.push(buttonForCommand({ text: "No thanks" }, noLinkRepo));

            const msgText = "Since I'm here, would you like me to post notifications " +
                "from a GitHub repository to this channel?";
            const linkMsg: slack.SlackMessage = {
                text: helloText,
                attachments: [
                    {
                        text: msgText,
                        fallback: msgText,
                        mrkdwn_in: ["text"],
                        actions,
                    },
                ],
            };
            return ctx.messageClient.send(linkMsg,
                addressSlackChannels(j.channel.team.id, channelName), { id: msgId });
        })).then(() => Success, failure);
    }
}

export function repoOptions(orgs: graphql.BotJoinedChannel.Orgs[]): OptionGroup[] {
    return orgs.map(o => {
        return {
            text: `${o.owner}/`,
            options: o.repo.map(r => {
                return { text: r.name, value: repoSlug(r) };
            }),
        };
    });
}

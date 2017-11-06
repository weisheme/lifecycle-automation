import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
    Tags,
} from "@atomist/automation-client/Handlers";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import * as slack from "@atomist/slack-messages/SlackMessages";
import * as graphql from "../../../typings/types";
import {
    isDmDisabled,
    repoUrl,
} from "../../../util/helpers";
import { DirectMessagePreferences } from "../../command/preferences/preferences";
import { SetUserPreference } from "../../command/preferences/SetUserPreference";
import { CreateChannel } from "../../command/slack/CreateChannel";
import { LinkRepo } from "../../command/slack/LinkRepo";

/**
 * Suggest mapping a repo to committer on unmapped repo.
 */
@EventHandler("Suggest mapping a repo to committer on unmapped repo",
    GraphQL.subscriptionFromFile("graphql/subscription/pushToUnmappedRepo"))
@Tags("lifecycle", "push")
export class PushToUnmappedRepo implements HandleEvent<graphql.PushToUnmappedRepo.Subscription> {

    public handle(e: EventFired<graphql.PushToUnmappedRepo.Subscription>, ctx: HandlerContext): Promise<HandlerResult> {
        return Promise.all(e.data.Push.map(p => {
            if (p.repo && p.repo.channels && p.repo.channels.length > 0) {
                // already mapped
                return Success;
            }
            if (!p.commits || p.commits.length < 1) {
                // strange
                return Success;
            }
            if (p.commits.some(c => c.message === "Initial commit")) {
                // not on initial push
                return Success;
            }
            return sendUnMappedRepoMessage(
                p.commits.filter(c => c.author && c.author.person)
                    .map(c => c.author.person.chatId), p.repo, ctx);
        }))
            .then(() => Success, failure);
    }

}

const repoMappingConfigKey = "repo_mapping_flow";
const disabledReposConfigKey = "disabled_repos";

export function sendUnMappedRepoMessage(
    chatIds: graphql.PushToUnmappedRepo.ChatId[],
    repo: graphql.PushToUnmappedRepo.Repo,
    ctx: HandlerContext,
): Promise<HandlerResult> {

    const enabledChatIds = chatIds.filter(c => {
        return !isDmDisabled(c, DirectMessagePreferences.mapRepo.id) &&
            !leaveRepoUnmapped(repo, c);
    });

    if (enabledChatIds.length < 1) {
        return Promise.resolve(Success);
    }

    return Promise.all(enabledChatIds.map(chatId => {
        const id = mapRepoMessageId(repo.owner, repo.name, chatId.screenName);
        return ctx.messageClient.addressUsers(mapRepoMessage(repo, chatId), chatId.screenName, { id });
    }))
        .then(() => Success);
}

/**
 * Create consistent message ID for unmapped repo push updatable message.
 *
 * @param owner org/user that owns repository being linked
 * @param repo name of repository being linked
 * @param screenName chat screen name of person being sent message
 * @return message ID string
 */
export function mapRepoMessageId(owner: string, repo: string, screenName: string): string {
    return `user_message/unmapped_repo/${screenName}/${owner}/${repo}`;
}

/**
 * Extract screen name of user sent message from message ID.
 *
 * @param msgId ID of message
 * @return screen name
 */
export function extractScreenNameFromMapRepoMessageId(msgId: string): string {
    return msgId.split("/")[2];
}

function getDisabledRepos(preferences: graphql.PushToUnmappedRepo._Preferences[]): string[] {
    if (!preferences) {
        return [];
    }
    const repoMappingFlow = preferences.find(p => p.name === repoMappingConfigKey);
    if (!repoMappingFlow) {
        return [];
    }
    let mappingConfig: any;
    try {
        mappingConfig = JSON.parse(repoMappingFlow.value);
    } catch (e) {
        const err = (e as Error).message;
        console.error(`failed to parse ${repoMappingConfigKey} value '${repoMappingFlow.value}': ${err}`);
        return [];
    }
    if (!mappingConfig[disabledReposConfigKey]) {
        return [];
    }
    return mappingConfig[disabledReposConfigKey] as string[];
}

export function repoString(repo: graphql.PushToUnmappedRepo.Repo): string {
    if (!repo) {
        return "!";
    }
    const provider = (repo.org && repo.org.provider && repo.org.provider.providerId) ?
        `${repo.org.provider.providerId}:` : "";
    return `${provider}${repo.owner}:${repo.name}`;
}

export function leaveRepoUnmapped(
    repo: graphql.PushToUnmappedRepo.Repo,
    chatId: graphql.PushToUnmappedRepo.ChatId,
): boolean {

    const repoStr = repoString(repo);
    return getDisabledRepos(chatId.preferences).some(r => r === repoStr);
}

export function mapRepoMessage(
    repo: graphql.PushToUnmappedRepo.Repo,
    chatId: graphql.PushToUnmappedRepo.ChatId,
): slack.SlackMessage {

    const channelName = channelNameForRepo(repo.name);
    const slug = `${repo.owner}/${repo.name}`;
    const slugText = slack.url(repoUrl(repo), slug);
    const msgId = mapRepoMessageId(repo.owner, repo.name, chatId.screenName);

    let channelText: string;
    let mapCommand: any;
    let mapParameters: LinkRepo | CreateChannel;
    const channel = repo.org.chatTeam.channels.find(c => c.name === channelName);
    if (channel) {
        channelText = slack.channel(channel.channelId);
        mapCommand = LinkRepo;
        mapParameters = new LinkRepo();
        mapParameters.channelId = channel.channelId;
    } else {
        channelText = slack.bold(`#${channelName}`);
        mapCommand = CreateChannel;
        mapParameters = new CreateChannel();
        mapParameters.channel = channelName;
    }
    mapParameters.apiUrl = (repo.org.provider) ? repo.org.provider.apiUrl : undefined;
    mapParameters.owner = repo.owner;
    mapParameters.repo = repo.name;
    mapParameters.msgId = msgId;

    const mapFallback = `Want to put me to work on ${slug} in #${channelName}?`;
    const mapText = `Want to put me to work on ${slugText} in ${channelText}?`;

    const mapRepoButton = buttonForCommand({ text: "Go ahead", style: "primary" }, mapCommand, mapParameters);
    const mapAttachment: slack.Attachment = {
        pretext: mapText,
        fallback: mapFallback,
        text: "",
        mrkdwn_in: ["pretext"],
        actions: [mapRepoButton],
    };

    const hintText = `or ${slack.codeLine("/invite @atomist")} me to a relevant channel and type
${slack.codeLine(`@atomist repo owner=${repo.owner} repo=${repo.name}`)}`;
    const hintFallback = `or '/invite @atomist' me to a relevant channel and type
'@atomist repo owner=${repo.owner} repo=${repo.name}'`;
    const hintAttachment: slack.Attachment = {
        fallback: hintFallback,
        text: hintText,
        mrkdwn_in: ["text"],
    };

    const stopText = `This is the last time I will ask you about ${slack.bold(slug)}. You can stop receiving ` +
        `similar suggestions for all repositories by clicking the button below.`;
    const stopFallback = `This is the last time I will ask you about ${slug}. You can stop receiving ` +
        `similar suggestions for all repositories by clicking the button below.`;
    const stopAllParams = new SetUserPreference();
    stopAllParams.key = "dm";
    stopAllParams.name = `disable_for_${DirectMessagePreferences.mapRepo.id}`;
    stopAllParams.value = "true";
    stopAllParams.label = `${DirectMessagePreferences.mapRepo.id} direct messages disabled`;
    stopAllParams.id = msgId;
    const stopAllButton = buttonForCommand({ text: "All Repositories" }, SetUserPreference, stopAllParams);

    const stopAttachment: slack.Attachment = {
        text: stopText,
        fallback: stopFallback,
        mrkdwn_in: ["text"],
        actions: [stopAllButton],
    };

    const msg: slack.SlackMessage = {
        attachments: [
            mapAttachment,
            hintAttachment,
            stopAttachment,
        ],
    };
    return msg;
}

/**
 * Generate valid Slack channel name for a repository name
 * @param repoName
 */
export function channelNameForRepo(repoName: string): string {
    return repoName != null ? repoName.substring(0, 21).replace(/\./g, "_").toLowerCase() : repoName;
}

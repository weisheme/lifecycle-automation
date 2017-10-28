import {
    EventHandler,
    Tags,
} from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    failure,
    Success,
} from "@atomist/automation-client/HandlerResult";
import {
    EventFired,
    HandleEvent,
    HandlerContext,
    HandlerResult,
} from "@atomist/automation-client/Handlers";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import {
    Attachment,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as graphql from "../../../typings/types";
import { isDmDisabled } from "../../../util/helpers";
import { DirectMessagePreferences } from "../../command/preferences/preferences";
import { SetUserPreference } from "../../command/preferences/SetUserPreference";
import { CreateChannel } from "../../command/slack/CreateChannel";

/**
 * A Event handler that sends a lifecycle message on Push events.
 */
@EventHandler("suggest mapping a repo to committer on unmapped repo",
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
                // not on initial commit
                return Success;
            }

            const commitsWithChatIds = p.commits.filter(c => {
                return c.author && c.author.person && c.author.person.chatId &&
                    !isDmDisabled(c.author.person.chatId, DirectMessagePreferences.mapRepo.id) &&
                    !leaveRepoUnmapped(p.repo, c.author.person.chatId);
            });
            if (commitsWithChatIds.length < 1) {
                return Success;
            }
            const chatIds = commitsWithChatIds.map(c => c.author.person.chatId);

            return Promise.all(chatIds.map(chatId => {
                const id = `push_lifecycle/${p.repo.owner}/${p.repo.name}/unmapped-repo/${chatId.screenName}`;
                const ttl = 14 * 24 * 60 * 60;
                return ctx.messageClient.addressUsers(mapRepoMessage(p.repo, chatId), chatId.screenName, { id, ttl });
            }))
            .then(_ => Success);
        }))
        .then(() => Success)
        .catch(err => failure(err));
    }

}

const repoMappingConfigKey = "repo_mapping_flow";
const disabledReposConfigKey = "disabled_repos";

function getDisabledRepos(preferences: graphql.PushToUnmappedRepo.Preferences[]): string[] {
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
        console.error(`failed to parse reposToLeaveUnmapped value '${repoMappingFlow.value}': ${err}`);
        return [];
    }
    if (!mappingConfig[disabledReposConfigKey]) {
        return [];
    }
    return mappingConfig[disabledReposConfigKey] as string[];
}

export function leaveRepoUnmapped(repo: graphql.PushToUnmappedRepo.Repo,
                                  chatId: graphql.PushToUnmappedRepo.ChatId): boolean {
    const slug = `${repo.owner}/${repo.name}`;
    return getDisabledRepos(chatId.preferences).some(r => r === repo.name || r === slug);
}

export function mapRepoMessage(repo: graphql.PushToUnmappedRepo.Repo,
                               chatId: graphql.PushToUnmappedRepo.ChatId): SlackMessage {
    const channelName = channelNameForRepo(repo.name);
    const slug = `${repo.owner}/${repo.name}`;
    const disabledRepos = getDisabledRepos(chatId.preferences);

    const mapText = `Want to put me to work on *${slug}* in *#${channelName}*?`;
    const mapFallback = `Want to put me to work on ${slug} in #${channelName}?`;
    const mapRepoButton = buttonForCommand({ text: "Go ahead", style: "primary" }, CreateChannel, {
        channel: channelName,
        owner: repo.owner,
        repo: repo.name,
    });
    const mapAttachment: Attachment = {
        pretext: mapText,
        fallback: mapFallback,
        text: "",
        mrkdwn_in: ["pretext"],
        actions: [mapRepoButton],
    };

    const hintText = `or invite me to a relevant channel and type \`@atomist repo ${repo.owner} ${repo.name}\``;
    const hintFallback = `or invite me to a relevant channel and type '@atomist repo ${repo.owner} ${repo.name}'`;
    const hintAttachment: Attachment = {
        fallback: hintFallback,
        text: hintText,
        mrkdwn_in: ["text"],
    };

    const stopText = `Stop receiving similar suggestions for`;
    disabledRepos.push(slug);
    const stopButton = buttonForCommand({ text: slug }, "SetUserPreference", {
        key: repoMappingConfigKey,
        name: disabledReposConfigKey,
        value: JSON.stringify(disabledRepos),
        label: `Disable direct messages about mapping ${slug}`,
    });
    const stopAllButton = buttonForCommand({ text: "All Repos" }, "SetUserPreference", {
        key: "dm",
        name: `disable_for_${DirectMessagePreferences.mapRepo.id}`,
        value: "true",
        label: `${DirectMessagePreferences.mapRepo.id} direct messages disabled`,
    });
    const stopAttachment: Attachment = {
        text: stopText,
        fallback: stopText,
        actions: [stopButton, stopAllButton],
    };

    const msg: SlackMessage = {
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

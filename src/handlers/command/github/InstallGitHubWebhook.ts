import {
    CommandHandler,
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Secret,
    Secrets,
    Success,
    Tags,
} from "@atomist/automation-client";
import { guid } from "@atomist/automation-client/internal/util/string";
import {
    Attachment,
    codeLine,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as graphql from "../../../typings/types";
import {
    loadChatIdByChatId,
    loadChatTeam,
} from "../../../util/helpers";
import { sendUnMappedRepoMessage } from "../../event/push/PushToUnmappedRepo";
import { DefaultBotName } from "../slack/LinkRepo";
import * as github from "./gitHubApi";

@CommandHandler("Install webhook for a whole organization", "install org-webhook", "install github org-webhook")
@Tags("github", "webhook")
export class InstallGitHubOrgWebhook implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubWebHookUrl)
    public url: string = "https://webhook.atomist.com/github";

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @Secret(Secrets.userToken("admin:org_hook"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        const payload = {
            org: this.owner,
            name: "web",
            events: ["*"],
            active: true,
            config: {
                url: this.url,
                content_type: "json",
            },
        };

        return (github.api(this.githubToken, this.apiUrl).orgs as any).createHook(payload)
            .then(() => {

                const msg: SlackMessage = {
                    attachments: [{
                        author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${guid()}`,
                        author_name: `Successfully installed webhook for ${codeLine(this.owner)}`,
                        fallback: `Successfully installed  webhook for ${codeLine(this.owner)}`,
                        color: "#45B254",
                    }],
                };

                return ctx.messageClient.respond(msg)
                    .then(() => Success)
                    .catch(err => failure(err));
            })
            .catch(result => {
                return ctx.messageClient.respond(handleResponse(result, ctx.correlationId, this.url, this.owner))
                    .then(() => Success)
                    .catch(err => failure(err));
            });
    }
}

@CommandHandler("Install webhook for a repository", "install webhook", "install github webhook")
@Tags("github", "webhook")
export class InstallGitHubRepoWebhook implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubWebHookUrl)
    public url: string = "https://webhook.atomist.com/github";

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @MappedParameter(MappedParameters.SlackUser)
    public requester: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        const payload = {
            owner: this.owner,
            repo: this.repo,
            name: "web",
            events: ["*"],
            active: true,
            config: {
                url: this.url,
                content_type: "json",
            },
        };

        return (github.api(this.githubToken, this.apiUrl).repos as any).createHook(payload)
            .then(() => {
                const text = `Successfully installed repository webhook`;
                const msg: SlackMessage = {
                    attachments: [{
                        text: `${codeLine(`${this.owner}/${this.repo}`)}`,
                        author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${guid()}`,
                        author_name: text,
                        fallback: text,
                        mrkdwn_in: ["text"],
                        color: "#45B254",
                    }],
                };

                return ctx.messageClient.respond(msg)
                    .then(() => Promise.all([
                        loadChatIdByChatId(ctx, this.requester),
                        loadChatTeam(ctx),
                    ]))
                    .then(results => {
                        if (results[0] && results[1]) {
                            const repo: graphql.PushToUnmappedRepo.Repo = {
                                owner: this.owner,
                                name: this.repo,
                                org: {
                                    chatTeam: {
                                        channels: results[1].channels,
                                    },
                                    provider: {},
                                },
                            };
                            return sendUnMappedRepoMessage([results[0]], repo, ctx, DefaultBotName);
                        } else {
                            return Success;
                        }
                    })
                    .catch(err => failure(err));
            })
            .catch(result => {
                return ctx.messageClient.respond(handleResponse(result, ctx.correlationId,
                    this.url, this.owner, this.repo))
                    .then(() => Success)
                    .catch(err => failure(err));
            });
    }
}

function handleResponse(response: any, correlationId: string, url: string,
                        owner: string, repo?: string): string | SlackMessage {
    const body = JSON.parse(response.message);
    const errors = body.errors;
    const code = response.code;
    if (errors != null && errors.length > 0) {
        if (errors[0].message === "Hook already exists on this organization") {
            return `Webhook already installed for \`${owner}\` (${url})`;
        }
        if (errors[0].message === "Hook already exists on this repository") {
            return `Webhook already installed for \`${owner}/${repo}\` (${url})`;
        }
        return renderError(`Failed to install webhook: ${errors[0].message} (${code})`, correlationId);
    } else {
        return renderError(`Failed to install webhook: ${body.message} (${code})`, correlationId);
    }
}

function renderError(msg, correlationId): SlackMessage {
    const error: Attachment = {
        text: msg,
        author_name: "Unable to run command",
        author_icon: "https://images.atomist.com/rug/error-circle.png",
        fallback: "Unable to run command",
        mrkdwn_in: ["text"],
        color: "#D94649",
        footer: `Correlation ID: ${correlationId},`,
    };
    const sm: SlackMessage = {
        attachments: [error],
    };
    return sm;
}

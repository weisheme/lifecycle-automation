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
import { url } from "@atomist/slack-messages";
import {
    codeLine,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as graphql from "../../../typings/types";
import {
    loadChatIdByChatId,
    loadChatTeam,
} from "../../../util/helpers";
import {
    error,
    success,
    warning,
} from "../../../util/messages";
import { sendUnMappedRepoMessage } from "../../event/push/PushToUnmappedRepo";
import { DefaultBotName } from "../slack/LinkRepo";
import * as github from "./gitHubApi";

@CommandHandler("Install webhook for a whole organization", "install org-webhook", "install github org-webhook")
@Tags("github", "webhook")
export class InstallGitHubOrgWebhook implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubWebHookUrl)
    public url: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @MappedParameter(MappedParameters.GitHubUrl)
    public webUrl: string;

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
                return ctx.messageClient.respond(
                    success("Organization Webhook", `Successfully installed webhook for ${url(
                        orgHookUrl(this.webUrl, this.owner), codeLine(this.owner))}`))
                    .then(() => Success)
                    .catch(err => failure(err));
            })
            .catch(result => {
                return ctx.messageClient.respond(handleResponse(result, this.webUrl, this.owner, ctx))
                    .then(() => Success, failure);
            });
    }
}

@CommandHandler("Install webhook for a repository", "install webhook", "install github webhook")
@Tags("github", "webhook")
export class InstallGitHubRepoWebhook implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubOwnerWithUser)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubWebHookUrl)
    public url: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @MappedParameter(MappedParameters.GitHubUrl)
    public webUrl: string;

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
                return ctx.messageClient.respond(
                    success("Repository Webhook",
                        `Successfully installed repository webhook for ${url(
                            orgHookUrl(this.webUrl, this.owner, this.repo),
                            codeLine(`${this.owner}/${this.repo}`))}`))
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
                return ctx.messageClient.respond(handleResponse(result, this.webUrl, this.owner, ctx, this.repo))
                    .then(() => Success, failure);
            });
    }
}

function handleResponse(response: any,
                        webUrl: string,
                        owner: string,
                        ctx: HandlerContext,
                        repo?: string): string | SlackMessage {
    const body = JSON.parse(response.message);
    const errors = body.errors;
    if (errors != null && errors.length > 0) {
        if (errors[0].message === "Hook already exists on this organization") {
            return warning("Organization Webhook",
                `Webhook already installed for ${url(orgHookUrl(webUrl, owner, repo),
                    codeLine(owner))}`, ctx);
        }
        if (errors[0].message === "Hook already exists on this repository") {
            return warning("Repository Webhook",
                `Webhook already installed for ${url(orgHookUrl(webUrl, owner, repo),
                    codeLine(`${owner}/${repo}`))}`, ctx);
        }
        return error(repo ? "Repository Webhook" : "Organization Webhook",
            `Failed to install webhook: ${errors[0].message}`, ctx);
    } else {
        return error(repo ? "Repository Webhook" : "Organization Webhook",
            `Failed to install webhook: ${body.message}`, ctx);
    }
}

function orgHookUrl(webUrl: string, owner: string, repo?: string): string {
    if (repo) {
        return `${webUrl}/${owner}/${repo}/settings/hooks`;
    } else {
        return `${webUrl}/organizations/${owner}/settings/hooks`;
    }
}

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

    @MappedParameter(MappedParameters.SlackTeam)
    public teamId: string;

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
                        loadChatTeam(this.teamId, ctx),
                    ]))
                    .then(results => {
                        if (results[0] && results[1]) {
                            const chatTeam = results[1] as graphql.ChatTeam.ChatTeam;
                            const alreadyMapped = (chatTeam.channels || []).some(c => (c.repos || [])
                                .some(r => r.name === this.repo && r.owner === this.owner));

                            if (!alreadyMapped) {

                                const repo: graphql.PushToUnmappedRepo.Repo = {
                                    owner: this.owner,
                                    name: this.repo,
                                    org: {
                                        team: {
                                            chatTeams: [{
                                                id: this.teamId,
                                                channels: results[1].channels,
                                            }],
                                        },
                                        provider: {},
                                    },
                                };
                                const botNames = {};
                                botNames[this.teamId] = DefaultBotName;

                                return sendUnMappedRepoMessage([results[0]], repo, ctx, botNames);
                            }
                        }
                        return Success;
                    })
                    .catch(err => failure(err));
            })
            .catch(result => {
                return ctx.messageClient.respond(handleResponse(result, this.webUrl, this.owner, ctx, this.repo))
                    .then(() => Success, failure);
            });
    }
}

@CommandHandler("Install webhook for a repositories")
@Tags("github", "webhook")
export class InstallGitHubReposWebhook implements HandleCommand {

    @Parameter({
        displayName: "repositories",
        description: "comma separated list of repository names",
        required: true})
    public repos: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubWebHookUrl)
    public url: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        const o = this.owner;
        const promises = this.repos.split(",").map(r => () => {
            const payload = {
                owner: o,
                repo: r.trim(),
                name: "web",
                events: ["*"],
                active: true,
                config: {
                    url: this.url,
                    content_type: "json",
                },
            };
            return (github.api(this.githubToken, this.apiUrl).repos as any).createHook(payload);
        });
        return promises.reduce((p, f) => p.then(f), Promise.resolve())
            .then(() => Success, failure);
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

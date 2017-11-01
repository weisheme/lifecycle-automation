import {
    CommandHandler,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Secret,
    Secrets,
    Success,
    Tags,
} from "@atomist/automation-client/Handlers";
import {
    Attachment,
    codeLine,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as github from "./gitHubApi";

@CommandHandler("Install webhook for a whole organization", "install org-webhook")
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
                return ctx.messageClient.respond(`Organization webhook installed for ${codeLine(this.url)}`)
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

@CommandHandler("Install webhook for a repository", "install webhook")
@Tags("github", "webhook")
export class InstallGitHubRepoWebhook implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubOwner)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubWebHookUrl)
    public url: string = "https://webhook.atomist.com/github";

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

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
                return ctx.messageClient.respond(`Repository webhook installed for ${codeLine(this.url)}`)
                    .then(() => Success)
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

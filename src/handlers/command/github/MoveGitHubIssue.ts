import {
    ConfigurableCommandHandler,
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
import { loadGitHubIdByChatId } from "../../../util/helpers";
import * as github from "./gitHubApi";

@ConfigurableCommandHandler("Moves a GitHub issue to a different org and/or repo", {
    intent: [ "move issue", "move github issue" ],
    autoSubmit: true,
})
@Tags("github", "issue")
export class MoveGitHubIssue implements HandleCommand {

    @Parameter({ description: "target repository name", pattern: /^.*$/ })
    public targetRepo: string;

    @Parameter({ description: "target owner name", pattern: /^.*$/ })
    public targetOwner: string;

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        const api = github.api(this.githubToken, this.apiUrl);

        return api.issues.get({
            owner: this.owner,
            repo: this.repo,
            number: this.issue,
        })
        .then(issue => {
            return api.issues.getComments({
                owner: this.owner,
                repo: this.repo,
                number: this.issue,
            })
            .then(result => {
                return [issue.data, result.data];
            });
        })
        .then(([issue, comment]) => {
            const comments = comment.map(c => `
---
Comment by @${c.user.login} at ${c.created_at}:

${c.body}`).join("\n");

            const body = `Issue moved from ${this.owner}/${this.repo}#${this.issue}.

Created by @${issue.user.login} at ${issue.created_at}:

${issue.body}
${comments}`;

            return api.issues.create({
                owner: this.targetOwner,
                repo: this.targetRepo,
                title: issue.title,
                body,
                labels: issue.labels.map(l => l.name),
                assignees: issue.assignees.map(a => a.login),
            });
        })
        .then(newIssue => {
            return api.issues.createComment({
                owner: this.owner,
                repo: this.repo,
                number: this.issue,
                body: `Issue moved to ${this.targetOwner}/${this.targetRepo}#${newIssue.data.number}`,
            })
            .then(() => {
                return api.issues.edit({
                    owner: this.owner,
                    repo: this.repo,
                    number: this.issue,
                    state: "closed",
                });
            });
        })
        .then(() => Success)
        .catch(err => {
            return github.handleError("Move Issue", err, ctx);
        });
    }
}

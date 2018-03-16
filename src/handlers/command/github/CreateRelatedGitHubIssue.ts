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
import { guid } from "@atomist/automation-client/internal/util/string";
import { addressEvent } from "@atomist/automation-client/spi/message/MessageClient";
import { IssueRelationship } from "../../../ingesters/issueRelationship";
import * as github from "./gitHubApi";

@ConfigurableCommandHandler("Create a related GitHub issue in a different org and/or repo", {
    intent: [ "related issue", "related github issue" ],
    autoSubmit: true,
})
@Tags("github", "issue")
export class CreateRelatedGitHubIssue implements HandleCommand {

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
        .then(result => {
            const issue = result.data;
            const body = `Issue originated from ${this.owner}/${this.repo}#${this.issue}

Created by @${issue.user.login} at ${issue.created_at}:

${issue.body}`;
            return api.issues.create({
                owner: this.targetOwner,
                repo: this.targetRepo,
                title: issue.title,
                body,
                labels: issue.labels.map(l => l.name),
            });
        })
        .then(newIssue => {
            const issueRel: IssueRelationship = {
                relationshipId: guid(),
                type: "related",
                state: "open",
                source: {
                    owner: this.owner,
                    repo: this.repo,
                    issue: this.issue.toString(),
                },
                target: {
                    owner: this.targetOwner,
                    repo: this.targetRepo,
                    issue: newIssue.data.number.toString(),
                },
            };
            return ctx.messageClient.send(issueRel, addressEvent("IssueRelationship"))
                .then(() => newIssue);
        })
        .then(newIssue => {
            return api.issues.createComment({
                owner: this.owner,
                repo: this.repo,
                number: this.issue,
                body: `Related issue ${this.targetOwner}/${this.targetRepo}#${newIssue.data.number} created`,
            });
        })
        .then(() => Success)
        .catch(err => {
            return github.handleError("New Related Issue", err, ctx);
        });
    }
}

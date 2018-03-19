import {
    ConfigurableCommandHandler,
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
import { guid } from "@atomist/automation-client/internal/util/string";
import { addressEvent } from "@atomist/automation-client/spi/message/MessageClient";
import * as slack from "@atomist/slack-messages/SlackMessages";
import { IssueRelationship } from "../../../ingesters/issueRelationship";
import { success } from "../../../util/messages";
import * as github from "./gitHubApi";

@ConfigurableCommandHandler("Link a related GitHub issue in a different org and/or repo", {
    intent: [ "link issue", "link github issue" ],
    autoSubmit: true,
})
@Tags("github", "issue")
export class LinkRelatedGitHubIssue implements HandleCommand {

    @Parameter({ description: "target owner name", pattern: /^.*$/ })
    public targetOwner: string;

    @Parameter({ description: "target repository name", pattern: /^.*$/ })
    public targetRepo: string;

    @Parameter({ description: "target issue number", pattern: /^.*$/ })
    public targetIssue: number;

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubUrl)
    public url: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
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
                issue: this.targetIssue.toString(),
            },
        };
        return ctx.messageClient.send(issueRel, addressEvent("IssueRelationship"))
            .then(() => {
                const issueLink =  slack.url(
                    `${this.url}/${this.targetOwner}/${this.targetRepo}/issues/${this.targetIssue}`,
                    `${this.targetOwner}/${this.targetRepo}#${this.targetIssue}`);
                return ctx.messageClient.respond(success(
                    "Related Issue",
                    `Successfully linked related issue ${issueLink}`));
            })
            .then(() => {
                const api = github.api(this.githubToken, this.apiUrl);

                return api.issues.createComment({
                    owner: this.owner,
                    repo: this.repo,
                    number: this.issue,
                    body: `Related issue ${this.targetOwner}/${this.targetRepo}#${this.targetIssue} linked`,
                })
                .then(() => api.issues.createComment({
                    owner: this.targetOwner,
                    repo: this.targetRepo,
                    number: this.targetIssue,
                    body: `Issue ${this.owner}/${this.repo}#${this.issue} was linked`,
                }));
            })
            .then(() => Success, failure);
    }

}

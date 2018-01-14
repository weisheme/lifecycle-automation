import {
    CommandHandler,
    HandleCommand,
    HandlerContext,
    MappedParameter,
    MappedParameters,
    Parameter,
    Secret,
    Secrets,
    Tags,
} from "@atomist/automation-client";
import { guid } from "@atomist/automation-client/internal/util/string";
import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import {
    Action,
    Attachment,
    codeLine,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as graphql from "../../../typings/types";
import * as github from "./gitHubApi";
import { ListMyGitHubIssues } from "./ListMyGitHubIssues";

@CommandHandler("Search issues and pull requests in GitHub repositories", "search issues", "search github issues")
@Tags("github", "issue")
export class SearchGitHubRepositoryIssues extends ListMyGitHubIssues implements HandleCommand {

    @Parameter({ description: "issue search term", pattern: /^.*$/, required: false })
    public q: string = "is:open is:issue";

    @Parameter({ description: "results per page", pattern: /^[0-9]*$/, required: false })
    public perPage: number = 5;

    @Parameter({ description: "results page", pattern: /^[0-9]*$/, required: false })
    public page: number = 1;

    @Parameter({ description: "search Id", pattern: /^.*$/, required: false })
    public id: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @MappedParameter(MappedParameters.SlackChannelName)
    public channel: string;

    @Secret(Secrets.userToken("repo"))
    public gitHubToken: string;

    protected searchIssues(person: graphql.ChatId.Person): Promise<any> {
        if (+this.page > 0) {
            return github.api(this.gitHubToken, this.apiUrl).search.issues({
                q: `${this.q} repo:${this.owner}/${this.repo}`,
                sort: "updated",
                order: "desc",
                page: this.page,
                per_page: this.perPage,
            });
        } else {
            return Promise.resolve(null);
        }
    }

    protected sendResponse(message: SlackMessage | string, ctx: HandlerContext): Promise<any> {
        return ctx.messageClient.respond(message, { id: this.id });
    }

    protected prepareResponse(result: any): SlackMessage | string {
        if (!this.id) {
            this.id = `issue_search/${guid()}`;
        }
        let response: SlackMessage;
        if (result) {
            response = super.prepareResponse(result) as SlackMessage;
            if (response.attachments) {
                const actions: Action[] = [];
                // Back
                if (this.page > 1) {
                    actions.push(buttonForCommand({ text: "Back" }, "SearchGitHubRepositoryIssues", {
                        q: this.q,
                        page: Math.floor(+this.page - 1),
                        repo: this.repo,
                        owner: this.owner,
                        id: this.id,
                    }));
                }
                // Next
                if (+this.page * +this.perPage < result.data.total_count) {
                    actions.push(buttonForCommand({ text: "Next" }, "SearchGitHubRepositoryIssues", {
                        q: this.q,
                        page: Math.floor(+this.page + 1),
                        repo: this.repo,
                        owner: this.owner,
                        id: this.id,
                    }));
                }
                actions.push(buttonForCommand({ text: "Collapse" }, "SearchGitHubRepositoryIssues", {
                    q: this.q,
                    page: "0",
                    repo: this.repo,
                    owner: this.owner,
                    id: this.id,
                }));
                const pagingAttachment: Attachment = {
                    fallback: "Paging",
                    footer: `Search: ${this.q} | Total results: ${result.data.total_count}`
                    + ` | Page: ${this.page} of ${Math.ceil(result.data.total_count / +this.perPage)}`,
                    ts: Math.floor(Date.now() / 1000),
                    actions,
                };
                response.attachments.push(pagingAttachment);
            }
        } else {
            const actions: Action[] = [];
            actions.push(buttonForCommand({ text: "Expand" }, "SearchGitHubRepositoryIssues", {
                q: this.q,
                page: 1,
                repo: this.repo,
                owner: this.owner,
                id: this.id,
            }));

            response = {
                attachments: [{
                    text: `Search results for ${codeLine(this.q)} collapsed`,
                    fallback: "Paging",
                    mrkdwn_in: ["text"],
                    actions,
                    ts: Math.floor(Date.now() / 1000),
                },
                ],
            };
        }
        return response;
    }

    protected createActions(issue: any): Action[] {
        let command;
        if (issue.pull_request) {
            command = "DisplayGitHubPullRequest";
        } else {
            command = "DisplayGitHubIssue";
        }
        return [
            buttonForCommand({ text: "Details" },
                command, { owner: this.owner, repo: this.repo, issue: issue.number }),
        ];
    }
}

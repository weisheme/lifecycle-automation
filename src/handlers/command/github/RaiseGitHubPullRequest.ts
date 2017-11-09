import {
    CommandHandler,
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
import { replaceChatIdWithGitHubId } from "../../../util/helpers";
import * as github from "./gitHubApi";

@CommandHandler("Raise a GitHub pull request", "raise pr", "raise pullrequest",
    "raise github pr", "raise github pullrequest")
@Tags("github", "pr")
export class RaiseGitHubPullRequest implements HandleCommand {

    @Parameter({ description: "pull request title", pattern: /^.*$/ })
    public title: string;

    @Parameter({
        description: "pull request body", pattern: /[\s\S]*/,
        required: false,
    })
    public body: string;

    @Parameter({
        description: "branch the changes should get pulled into",
        pattern: /^.*$/,
    })
    public base: string;

    @Parameter({
        description: "branch containing the changes",
        pattern: /^.*$/,
    })
    public head: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return replaceChatIdWithGitHubId(this.body, ctx)
            .then(body => {
                return github.api(this.githubToken, this.apiUrl).pullRequests.create({
                    owner: this.owner,
                    repo: this.repo,
                    title: this.title,
                    body,
                    head: this.head,
                    base: this.base,
                });
            })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

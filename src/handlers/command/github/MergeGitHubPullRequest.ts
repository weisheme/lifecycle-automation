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
} from "@atomist/automation-client/Handlers";
import * as github from "./gitHubApi";

/**
 * Merge a GitHub Pull Request.
 */
@CommandHandler("Merge a GitHub Pull Request", ["merge pr", "merge pullrequest"])
@Tags("github", "pr")
export class MergeGitHubPullRequest implements HandleCommand {

    @Parameter({
        displayName: "Pull Request Number",
        description: "number of the pull request number to merge, with no leading `#`",
        pattern: /^.*$/,
        validInput: "an open GitHub pull request number",
        minLength: 1,
        maxLength: 10,
        required: true,
    })
    public issue: number;

    @Parameter({
        displayName: "Merge Method",
        description: "method to use when merging the pull request",
        pattern: /(?:merge|squash|rebase)$/,
        validInput: "one of 'merge', 'squash', or 'rebase', see " +
        "https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button",
        minLength: 5,
        maxLength: 6,
        required: false,
    })
    public mergeMethod: "merge" | "squash" | "rebase" = "merge";

    @Parameter({
        displayName: "Commit Title",
        pattern: /^.*$/,
        minLength: 0,
        maxLength: 100,
        required: false,
    })
    public title: string;

    @Parameter({
        displayName: "Commit Message",
        pattern: /^.*$/,
        minLength: 0,
        maxLength: 1000,
        required: false,
    })
    public message: string;

    @Parameter({
        displayName: "Sha",
        pattern: /.*$/,
        required: true,
    })
    public sha: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return github.api(this.githubToken, this.apiUrl).pullRequests.merge({
            owner: this.owner,
            repo: this.repo,
            number: this.issue,
            commit_title: this.title,
            commit_message: this.message,
            sha: this.sha,
            merge_method: this.mergeMethod,
        })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

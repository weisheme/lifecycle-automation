import {
    CommandHandler,
    MappedParameter,
    Parameter,
    Secret,
    Tags,
} from "@atomist/automation-client/decorators";
import {
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameters,
    Secrets,
    Success,
} from "@atomist/automation-client/Handlers";
import { AutoMergeTag } from "../../event/pullrequest/autoMerge";
import * as github from "./gitHubApi";
import { failure } from "@atomist/automation-client/HandlerResult";

/**
 * Approve GitHub status on commit.
 */
@CommandHandler("Approve GitHub status on commit", "auto merge pr")
@Tags("github", "pr", "auto-merge")
export class EnableGitHubPullRequestAutoMerge implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @Parameter({
        displayName: "Pull Request Number",
        description: "the number of the pull request number to merge, with no leading `#`",
        pattern: /^.*$/,
        validInput: "an open GitHub pull request number",
        minLength: 1,
        maxLength: 10,
        required: true,
    })
    public issue: number;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken(["repo"]))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return github.api(this.githubToken, this.apiUrl).issues.createComment({
            owner: this.owner,
            repo: this.repo,
            number: this.issue,
            body: `Pull request auto merge enabled. ${AutoMergeTag}`,
        })
        .then(() => Success)
        .catch(err => failure(err));
    }
}

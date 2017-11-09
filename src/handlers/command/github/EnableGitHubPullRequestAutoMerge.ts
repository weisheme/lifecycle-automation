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
import { AutoMergeTag } from "../../event/pullrequest/autoMerge";
import * as github from "./gitHubApi";

/**
 * Approve GitHub status on commit.
 */
@CommandHandler("Approve GitHub status on commit", "auto merge pr", "auto merge github pr")
@Tags("github", "pr", "auto-merge")
export class EnableGitHubPullRequestAutoMerge implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

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

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
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

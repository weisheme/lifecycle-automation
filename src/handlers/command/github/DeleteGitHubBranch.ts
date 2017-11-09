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
import * as github from "./gitHubApi";

@CommandHandler("Deletes a GitHub branch", "delete branch", "delete github branch")
@Tags("github", "branch")
export class DeleteGitHubBranch implements HandleCommand {

    @Parameter({ description: "branch name", pattern: /^.*$/ })
    public branch: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return github.api(this.githubToken, this.apiUrl).gitdata.deleteReference({
            owner: this.owner,
            repo: this.repo,
            ref: `heads/${this.branch.trim()}`,
        })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

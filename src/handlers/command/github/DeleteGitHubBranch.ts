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
import * as github from "./gitHubApi";

@ConfigurableCommandHandler("Deletes a GitHub branch", {
    intent: [ "delete branch", "delete github branch" ],
    autoSubmit: true,
})
@Tags("github", "branch")
export class DeleteGitHubBranch implements HandleCommand {

    @Parameter({ description: "branch name", pattern: /^.*$/ })
    public branch: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return github.api(this.githubToken, this.apiUrl).gitdata.deleteReference({
                owner: this.owner,
                repo: this.repo,
                ref: `heads/${this.branch.trim()}`,
            })
            .then(() => Success)
            .catch(err => {
                return github.handleError("Delete Branch or Reference", err, ctx);
            });
    }
}

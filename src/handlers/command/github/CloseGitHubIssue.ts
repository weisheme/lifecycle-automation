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

@CommandHandler("Close a GitHub issue", "close issue", "close github issue")
@Tags("github", "issue")
export class CloseGitHubIssue implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        return github.api(this.githubToken, this.apiUrl).issues.edit({
            owner: this.owner,
            repo: this.repo,
            number: this.issue,
            state: "closed",
        })
        .then(() => Success)
        .catch(err => {
            return github.handleError("Close Issue", err, ctx);
        });
    }
}

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

@CommandHandler("React to a GitHub issue", "react issue", "react github issue")
@Tags("github", "issue", "reaction")
export class ReactGitHubIssue implements HandleCommand {

    @Parameter({ description: "reaction to add", pattern: /^\+1|-1|laugh|confused|heart|hooray$/ })
    public reaction: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray";

    @Parameter({ description: "The issue number", pattern: /^.*$/ })
    public issue: number;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return github.api(this.githubToken, this.apiUrl).reactions.createForIssue({
            owner: this.owner,
            repo: this.repo,
            number: this.issue,
            content: this.reaction,
        })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

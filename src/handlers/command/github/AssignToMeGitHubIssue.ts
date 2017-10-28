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
import { logger } from "@atomist/automation-client/internal/util/logger";
import { loadGitHubId } from "../../../util/helpers";
import * as github from "./gitHubApi";

@CommandHandler("Assign a GitHub issue to the invoking user", "assign issue to me")
@Tags("github", "issue")
export class AssignToMeGitHubIssue implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @MappedParameter(MappedParameters.SlackUser)
    public requester: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @Secret(Secrets.userToken(["repo"]))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        const api = github.api(this.githubToken, this.apiUrl);

        return api.issues.get({
            owner: this.owner,
            repo: this.repo,
            number: this.issue,
        })
            .then(issue => {
                return loadGitHubId(ctx, this.requester)
                    .then(gitHubId => {
                        if (gitHubId) {
                            logger.debug(`Resolved Slack user '${this.requester}' to GitHub user '${gitHubId}'`);
                            const assignees: string[] =
                                issue.data.assignees ? issue.data.assignees.map(a => a.login) : [];
                            assignees.push(gitHubId);
                            return api.issues.edit({
                                owner: this.owner,
                                repo: this.repo,
                                number: this.issue,
                                assignees,
                            });
                        }
                    });
            })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

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
import * as github from "./gitHubApi";

@CommandHandler("Add label to or remove a label from a GitHub issue", "toggle issue label")
@Tags("github", "issue")
export class ToggleLabelGitHubIssue implements HandleCommand {

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @Parameter({ description: "a label to add to or remove from an issue", pattern: /^.*$/ })
    public label: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @Secret(Secrets.userToken(["repo"]))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return github.api(this.githubToken, this.apiUrl).issues.get({
            owner: this.owner,
            repo: this.repo,
            number: this.issue,
        })
            .then(issue => {
                const labels = issue.data.labels ? issue.data.labels.map(l => l.name) : [];
                if (labels.indexOf(this.label) >= 0) {
                    return labels.filter(l => l !== this.label);
                } else {
                    labels.push(this.label);
                    return labels;
                }
            })
            .then(labels => {
                return github.api(this.githubToken, this.apiUrl).issues.edit({
                    owner: this.owner,
                    repo: this.repo,
                    number: this.issue,
                    labels,
                });
            })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

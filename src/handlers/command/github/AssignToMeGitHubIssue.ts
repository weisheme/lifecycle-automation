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
import { loadGitHubIdByChatId } from "../../../util/helpers";
import * as github from "./gitHubApi";

export const AssignToMe = "$assign_to_me";

@CommandHandler("Assign a GitHub issue to the invoking user or provided assingee",
    "assign issue to me", "assign github issue to me")
@Tags("github", "issue")
export class AssignToMeGitHubIssue implements HandleCommand {

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @Parameter({ description: "user to assign issue to", required: false})
    public assignee: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.SlackUser)
    public requester: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        // backwards compatibility
        if (!this.assignee) {
            this.assignee = AssignToMe;
        }

        const api = github.api(this.githubToken, this.apiUrl);

        return api.issues.get({
                owner: this.owner,
                repo: this.repo,
                number: this.issue,
            })
            .then(issue => {
                if (this.assignee === AssignToMe) {
                    return loadGitHubIdByChatId(ctx, this.requester)
                        .then(gitHubId => {
                            if (gitHubId) {
                                let assignees: string[] =
                                    issue.data.assignees ? issue.data.assignees.map(a => a.login) : [];

                                if (assignees.some(a => a === gitHubId)) {
                                    assignees = assignees.filter(a => a !== gitHubId);
                                } else {
                                    assignees.push(gitHubId);
                                }

                                return api.issues.edit({
                                    owner: this.owner,
                                    repo: this.repo,
                                    number: this.issue,
                                    assignees,
                                });
                            }
                        });
                } else {
                    let assignees: string[] =
                        issue.data.assignees ? issue.data.assignees.map(a => a.login) : [];
                    if (assignees.some(a => a === this.assignee)) {
                        assignees = assignees.filter(a => a !== this.assignee);
                    } else {
                        assignees.push(this.assignee);
                    }
                    return api.issues.edit({
                        owner: this.owner,
                        repo: this.repo,
                        number: this.issue,
                        assignees,
                    });
                }
            })
            .then(() => Success)
            .catch(err => {
                return github.handleError("Assign to Me", err, ctx);
            });
    }
}

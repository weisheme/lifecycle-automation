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
import { replaceChatIdWithGitHubId } from "../../../util/helpers";
import * as github from "./gitHubApi";

@ConfigurableCommandHandler("Comment on a GitHub issue", {
    intent: ["comment issue", "comment github issue"],
    autoSubmit: true,
})
@Tags("github", "issue")
export class CommentGitHubIssue implements HandleCommand {

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @Parameter({ description: "Issue comment", pattern: /[\s\S]*/, control: "textarea" })
    public comment: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @MappedParameter(MappedParameters.SlackTeam, false)
    public teamId: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        return replaceChatIdWithGitHubId(this.comment, this.teamId, ctx)
            .then(body => {
                return github.api(this.githubToken, this.apiUrl).issues.createComment({
                    owner: this.owner,
                    repo: this.repo,
                    number: this.issue,
                    body,
                });
            })
            .then(() => Success)
            .catch(err => {
                return github.handleError("Comment Issue", err, ctx);
            });
    }
}

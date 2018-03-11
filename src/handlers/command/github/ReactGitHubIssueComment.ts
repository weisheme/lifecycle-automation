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

@ConfigurableCommandHandler("React to a GitHub comment", {
    intent: [ "react issue comment", "react github issue comment" ],
    autoSubmit: true,
})
@Tags("github", "comment", "reaction")
export class ReactGitHubIssueComment implements HandleCommand {

    @Parameter({ description: "reaction to add", pattern: /^\+1|-1|laugh|confused|heart|hooray$/ })
    public reaction: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray";

    @Parameter({ description: "The comment number", pattern: /^.*$/ })
    public comment: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return github.api(this.githubToken, this.apiUrl).reactions.createForIssueComment({
            owner: this.owner,
            repo: this.repo,
            id: this.comment,
            content: this.reaction,
        })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

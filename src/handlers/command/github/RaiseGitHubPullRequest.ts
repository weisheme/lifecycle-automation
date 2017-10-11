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
import { replaceChatIdWithGitHubId } from "../../../util/Helpers";
import * as github from "./gitHubApi";

@CommandHandler("Raise a GitHub pull request", ["raise pr", "raise pullrequest"])
@Tags("github", "pr")
export class RaiseGitHubPullRequest implements HandleCommand {

    @Parameter({ description: "The pull request title", pattern: /^.*$/ })
    public title: string;

    @Parameter({
        description: "The pull request body", pattern: /[\s\S]*/,
        required: false,
    })
    public body: string;

    @Parameter({
        description: "Branch the changes should get pulled into",
        pattern: /^.*$/,
    })
    public base: string;

    @Parameter({
        description: "The branch containing the changes",
        pattern: /^.*$/,
    })
    public head: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @Secret(Secrets.userToken(["repo"]))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return replaceChatIdWithGitHubId(this.body, ctx)
            .then(body => {
                return github.api(this.githubToken, this.apiUrl).pullRequests.create({
                    owner: this.owner,
                    repo: this.repo,
                    title: this.title,
                    body,
                    head: this.head,
                    base: this.base,
                });
            })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

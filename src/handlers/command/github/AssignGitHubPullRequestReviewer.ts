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
import { failure } from "@atomist/automation-client/HandlerResult";
import { user } from "@atomist/slack-messages/SlackMessages";
import { getChatIds, loadGitHubIdByChatId } from "../../../util/helpers";
import { warning } from "../../../util/messages";
import * as github from "./gitHubApi";

/**
 * Approve GitHub status on commit.
 */
@CommandHandler("Assign GitHub pull request reviewer", "assign reviewer", "assign github reviewer")
@Tags("github", "review")
export class AssignGitHubPullRequestReviewer implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @Parameter({
        displayName: "Pull Request Number",
        description: "the number of the pull request number to merge, with no leading `#`",
        pattern: /^.*$/,
        validInput: "an open GitHub pull request number",
        minLength: 1,
        maxLength: 10,
        required: true,
    })
    public issue: number;

    @Parameter({
        displayName: "User name(s) of reviewer",
        description: "the name(s) of reviewer to be assigned to Pull Request. Can be a Slack @-mention",
        pattern: /^.*$/,
        minLength: 2,
        validInput: "an valid GitHub or Slack user name",
        required: true,
    })
    public reviewer: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        // Clean up the reviewer parameter
        const reviewers = getChatIds(this.reviewer);

        return Promise.all(reviewers.map(r => loadGitHubIdByChatId(ctx, r)))
                .then(chatIds => {
                    return github.api(this.githubToken, this.apiUrl).pullRequests.createReviewRequest({
                        owner: this.owner,
                        repo: this.repo,
                        number: this.issue,
                        reviewers: chatIds.filter(c => c != null),
                    });
                })
                .then(() => Success)
                .catch(err => {
                    if (err.message
                            && err.message.indexOf("Review cannot be requested from pull request author.") >= 0) {
                        return ctx.messageClient
                            .respond(warning("Pull Request Reviewer",
                                "Review cannot be requested from pull request author."))
                            .then(() => Success, failure);
                    } else if (err.message
                            && err.message.indexOf("Reviews may only be requested from collaborators") >= 0) {
                        return ctx.messageClient
                            .respond(warning("Pull Request Reviewer",
                                "Reviews may only be requested from collaborators."))
                            .then(() => Success, failure);
                    } else {
                        return failure(err);
                    }
                });
    }
}

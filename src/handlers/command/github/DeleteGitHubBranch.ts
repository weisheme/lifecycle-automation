import {
    CommandHandler,
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Parameter,
    Secret,
    Secrets,
    Success, success,
    Tags,
} from "@atomist/automation-client";
import { SlackMessage } from "@atomist/slack-messages";
import * as github from "./gitHubApi";

@CommandHandler("Deletes a GitHub branch", "delete branch", "delete github branch")
@Tags("github", "branch")
export class DeleteGitHubBranch implements HandleCommand {

    @Parameter({ description: "branch name", pattern: /^.*$/ })
    public branch: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

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
                if (err.message === "Reference does not exist") {
                    const text = `Branch or Reference could not be deleted. \
Please make sure that it still exists and wasn't deleted in the meantime.`;
                    const msg: SlackMessage = {
                        attachments: [{
                            author_icon: `https://images.atomist.com/rug/warning-yellow.png`,
                            author_name: "Failed to delete branch or reference",
                            text,
                            fallback: text,
                            color: "#ffcc00",
                            mrkdwn_in: [ "text" ],
                        }],
                    };
                    return ctx.messageClient.respond(msg)
                        .then(success, failure);
                } else {
                    return failure(err);
                }
            });
    }
}

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
import * as urijs from "urijs";
import { loadGitHubIdByChatId } from "../../../util/helpers";
import * as github from "./gitHubApi";

export const ApprovalGateParam = "atomist:approve";

/**
 * Approve GitHub status on commit.
 */
@CommandHandler("Approve GitHub phase status on commit")
@Tags("fingerprint", "approve")
export class ApproveGitHubPhaseStatus implements HandleCommand {

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @Parameter({ description: "sha of GitHub Status", pattern: /^.*$/, required: true })
    public sha: string;

    @Parameter({ description: "target URL of GitHub Status", pattern: /^.*$/, required: true })
    public targetUrl: string;

    @Parameter({ description: "description of GitHub Status", pattern: /^.*$/, required: true })
    public description: string;

    @Parameter({ description: "context of GitHub Status", pattern: /^.*$/, required: true })
    public context: string;

    @MappedParameter(MappedParameters.SlackUser)
    public requester: string;

    @MappedParameter(MappedParameters.SlackTeam, false)
    public teamId: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        // Change URL to not contain the gate param
        const url = urijs(this.targetUrl);
        if (url.hasQuery(ApprovalGateParam)) {
            url.removeQuery(ApprovalGateParam);
            this.targetUrl = url.toString();
        }

        return loadGitHubIdByChatId(this.requester, this.teamId, ctx)
            .then(chatId => {
                const api = github.api(this.githubToken, this.apiUrl);
                return api.repos.createStatus({
                    owner: this.owner,
                    repo: this.repo,
                    sha: this.sha,
                    state: "success",
                    target_url: this.targetUrl,
                    description: `${this.description} | approved by @${chatId}`,
                    context: this.context,
                });
            })
            .then(() => Success)
            .catch(err => {
                return github.handleError("Approve Phase", err, ctx);
            });
    }
}

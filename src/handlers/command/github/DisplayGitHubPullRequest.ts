import {
    ConfigurableCommandHandler,
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Parameter,
    Secret,
    Secrets,
    Tags,
} from "@atomist/automation-client";
import * as _ from "lodash";
import { Lifecycle } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PullRequestToPullRequestLifecycle } from "../../event/pullrequest/PullRequestToPullRequestLifecycle";
import * as github from "./gitHubApi";

@ConfigurableCommandHandler("Display a pull request on GitHub", {
    intent: [ "show pull request", "show pr", "show github pr", "show github pull request" ],
    autoSubmit: true,
})
@Tags("github", "pr")
export class DisplayGitHubPullRequest implements HandleCommand {

    @Parameter({ description: "PR number", pattern: /^.*$/ })
    public issue: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeQueryFromFile<graphql.PullRequest.Query, graphql.PullRequest.Variables>(
            "../../../graphql/query/pullRequest",
            { teamId: ctx.teamId, repoName: this.repo, prName: this.issue, orgOwner: this.owner },
            {},
            __dirname)
            .then(result => {
                const prs: graphql.PullRequest.PullRequest[] =
                    _.get(result, "ChatTeam[0].team.orgs[0].repo[0].pullRequest");
                const handler = new ResponsePullRequestToPullRequestLifecycle();

                // Hopefully we can find the pull request in Neo
                if (prs && prs.length > 0) {
                    return handler.handle({
                        data: { PullRequest: prs as any },
                        extensions: { operationName: "DisplayGitHubPullRequest" },
                    }, ctx);
                }
            })
            .catch(failure);
    }
}

class ResponsePullRequestToPullRequestLifecycle extends PullRequestToPullRequestLifecycle {

    protected processLifecycle(lifecycle: Lifecycle): Lifecycle {
        lifecycle.post = "always";
        return lifecycle;
    }
}

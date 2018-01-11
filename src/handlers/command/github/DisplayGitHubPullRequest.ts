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
    Tags,
} from "@atomist/automation-client";
import { guid } from "@atomist/automation-client/internal/util/string";
import * as _ from "lodash";
import { Lifecycle } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PullRequestToPullRequestLifecycle } from "../../event/pullrequest/PullRequestToPullRequestLifecycle";
import * as github from "./gitHubApi";

@CommandHandler("Display a pull request on GitHub", "show pull request", "show pr", "show github pr",
    "show github pull request")
@Tags("github", "pr")
export class DisplayGitHubPullRequest implements HandleCommand {

    @Parameter({ description: "PR number", pattern: /^.*$/ })
    public prNumber: number;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeQueryFromFile<graphql.PullRequest.Query, graphql.PullRequest.Variables>(
            "graphql/query/issue",
            { teamId: ctx.teamId, repoName: this.repo, prName: this.prNumber.toString(), orgOwner: this.owner })
            .then(result => {
                const prs: graphql.Issue.Issue[] = _.get(result, "ChatTeam[0].orgs[0].repo[0].pullRequest");
                const handler = new ResponsePullRequestToPullRequestLifecycle();

                // Hopefully we can find the issue in Neo
                if (prs && prs.length > 0) {
                    return handler.handle({
                        data: { PullRequest: prs as any },
                        extensions: { operationName: "DisplayGitHubPullRequest" },
                    }, ctx);
                } else {
                    // If not in Neo, let's get it from GitHub
                    return github.api(this.githubToken, this.apiUrl).pullRequests.get({
                        number: this.prNumber,
                        repo: this.repo,
                        owner: this.owner,
                    })
                        .then(gis => {
                            const gi = gis.data;
                            // Not retrieving commits right now
                            const pr: graphql.PullRequest.PullRequest = {
                                repo: {
                                    name: this.repo,
                                    owner: this.owner,
                                    channels: [{
                                        name: this.channelName,
                                    }],
                                },
                                name: this.prNumber.toString(),
                                number: this.prNumber,
                                title: gi.title,
                                body: gi.body,
                                state: gi.state,
                                merged: !!gi.merged_at,
                                baseBranchName: gi.base.ref,
                                branchName: gi.head.ref,
                                head: {
                                    sha: gi.head.sha,
                                },
                                branch: {
                                    name: gi.head.ref,
                                },
                                labels: gi.labels.map(l => ({ name: l.name })),
                                createdAt: gi.created_at,
                                mergedAt: gi.merged_at,
                                closedAt: gi.closed_at,
                                assignees: gi.assignees ? gi.assignees.map(a => ({ login: a.login })) : [],
                                author: { login: gi.user.login, name: gi.user},
                                commits: [],
                                builds: [],
                                reviews: [],
                            };
                            return handler.handle({
                                data: { PullRequest: [pr] as any },
                                extensions: { operationName: "DisplayGitHubPullRequest" },
                            }, ctx);
                        });
                }
            })
            .catch(failure);
    }
}

class ResponsePullRequestToPullRequestLifecycle extends PullRequestToPullRequestLifecycle {

    protected processLifecycle(lifecycle: Lifecycle): Lifecycle {
        lifecycle.id = `${lifecycle.id}/${guid()}`;
        return lifecycle;
    }
}

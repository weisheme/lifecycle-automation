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
import { IssueToIssueLifecycle } from "../../event/issue/IssueToIssueLifecycle";
import * as github from "./gitHubApi";

@CommandHandler("Display an issue on GitHub", "show issue", "show github issue")
@Tags("github", "issue")
export class DisplayGitHubIssue implements HandleCommand {

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl;

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeQueryFromFile<graphql.Issue.Query, graphql.Issue.Variables>("graphql/query/issue",
            { teamId: ctx.teamId, repoName: this.repo, issueName: this.issue.toString(), orgOwner: this.owner })
            .then(result => {
                const issues: graphql.Issue.Issue[] = _.get(result, "ChatTeam[0].orgs[0].repo[0].issue");
                const handler = new ResponseIssueToIssueLifecycle();

                // Hopefully we can find the issue in Neo
                if (issues && issues.length > 0) {
                    return handler.handle({
                        data: { Issue: issues as any },
                        extensions: { operationName: "DisplayGitHubIssue" },
                    }, ctx);
                } else {
                    // If not in Neo, let's get if from GitHub
                    return github.api(this.githubToken, this.apiUrl).issues.get({
                        number: this.issue,
                        repo: this.repo,
                        owner: this.owner,
                    })
                    .then(gis => {
                        const gi = gis.data;
                        const issue: graphql.Issue.Issue = {
                            repo: {
                                name: this.repo,
                                owner: this.owner,
                                channels: [{
                                   name: this.channelName,
                                }],
                            },
                            name: this.issue.toString(),
                            number: this.issue,
                            title: gi.title,
                            body: gi.body,
                            state: gi.state,
                            labels: gi.labels.map(l => ({ name: l.name })) || [],
                            createdAt: gi.created_at,
                            updatedAt: gi.updated_at,
                            closedAt: gi.closed_at,
                            assignees: gi.assignees.map(a => ({ login: a.login })) || [],
                            openedBy: gi.user.login,
                            resolvingCommits: [],
                        };
                        return handler.handle({
                            data: { Issue: [ issue ] as any },
                            extensions: { operationName: "DisplayGitHubIssue" },
                        }, ctx);
                    });
                }
            })
            .catch(failure);
    }
}

class ResponseIssueToIssueLifecycle extends IssueToIssueLifecycle {

    protected processLifecycle(lifecycle: Lifecycle): Lifecycle {
        lifecycle.id = `${lifecycle.id}/${guid()}`;
        return lifecycle;
    }
}

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
import { IssueToIssueLifecycle } from "../../event/issue/IssueToIssueLifecycle";
import * as github from "./gitHubApi";

@ConfigurableCommandHandler("Display an issue on GitHub", {
    intent: [ "show issue", "show github issue" ],
    autoSubmit: true,
})
@Tags("github", "issue")
export class DisplayGitHubIssue implements HandleCommand {

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @Parameter({ description: "show more", required: false, displayable: false })
    public showMore: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @MappedParameter(MappedParameters.SlackTeam)
    public teamId: string;

    @Secret(Secrets.userToken("repo"))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeQueryFromFile<graphql.Issue.Query, graphql.Issue.Variables>(
            "../../../graphql/query/issue",
            { teamId: ctx.teamId, repoName: this.repo, issueName: this.issue.toString(), orgOwner: this.owner },
            {},
            __dirname)
            .then(result => {
                const issues: graphql.Issue.Issue[] =
                    _.cloneDeep(_.get(result, "ChatTeam[0].team.orgs[0].repo[0].issue"));
                const handler = new ResponseIssueToIssueLifecycle(this.showMore);
                handler.orgToken = this.githubToken;

                const channels = [{
                    name: this.channelName,
                    team: {
                        id: this.teamId,
                    },
                }];

                // Hopefully we can find the issue in Neo
                if (issues && issues.length > 0) {
                    // Overwrite the channels to send this message to
                    issues.forEach(i => i.repo.channels = channels);

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
                                channels,
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

    constructor(private showMore: string) {
        super();
    }

    protected processLifecycle(lifecycle: Lifecycle, store: Map<string, any>): Lifecycle {
        if (this.showMore === "more_+" || this.showMore === "assign_+") {
            store.set("show_more", true);
        } else if (this.showMore === "more_-" || this.showMore === "assign_-") {
            // don't do anything
        } else {
            lifecycle.post = "always";
        }

        return lifecycle;
    }
}

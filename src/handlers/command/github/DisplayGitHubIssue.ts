import {
    CommandHandler,
    MappedParameter,
    Parameter,
    Secret,
    Tags,
} from "@atomist/automation-client/decorators";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import { HandlerResult } from "@atomist/automation-client/HandlerResult";
import { HandleCommand, MappedParameters, Secrets } from "@atomist/automation-client/Handlers";
import { guid } from "@atomist/automation-client/internal/util/string";
import * as _ from "lodash";
import { Lifecycle } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { IssueToIssueLifecycle } from "../../event/issue/IssueToIssueLifecycle";
import * as github from "./gitHubApi";

@CommandHandler("Display an issue on GitHub", "show issue")
@Tags("github", "issue")
export class DisplayGitHubIssue implements HandleCommand {

    @Parameter({ description: "issue number", pattern: /^.*$/ })
    public issue: number;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @MappedParameter(MappedParameters.SlackChannelName)
    public channelName: string;

    @Secret(Secrets.userToken(["repo"]))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return ctx.graphClient.executeQueryFromFile<graphql.Issue.Query, graphql.Issue.Variables>("graphql/query/issue",
            { teamId: ctx.teamId, repoName: this.repo, issueName: this.issue.toString(), orgOwner: this.owner })
            .then(result => {
                const issue = _.get(result, "ChatTeam[0].orgs[0].repo[0].issue");
                if (issue) {
                    const handler = new ResponseIssueToIssueLifecycle();
                    return handler.handle({
                        data: { Issue: issue as any },
                        extensions: { operationName: "DisplayGitHubIssue" },
                    }, ctx);
                } else {
                    return { code: 1,
                        message: `Issue #${this.issue} could not be found in ${this.owner}/${this.repo}` };
                }
            })
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

class ResponseIssueToIssueLifecycle extends IssueToIssueLifecycle {

    protected processLifecycle(lifecycle: Lifecycle): Lifecycle {
        // Don't send to the channel and make sure we display the message each time
        lifecycle.channels = [];
        lifecycle.id = `${lifecycle.id}/${guid()}`;
        lifecycle.respond = true;
        return lifecycle;
    }
}

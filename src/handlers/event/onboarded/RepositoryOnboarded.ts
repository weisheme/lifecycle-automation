import {
    EventFired,
    EventHandler,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Secret,
    Secrets,
    Tags,
} from "@atomist/automation-client";
import * as GraqhQL from "@atomist/automation-client/graph/graphQL";
import * as graphql from "../../../typings/types";
import { PushToPushCardLifecycle } from "../push/PushToPushLifecycle";

@EventHandler("Send a Push lifecycle card when a new repo has finished onboarding",
    GraqhQL.subscriptionFromFile("../../../graphql/subscription/repoOnboarded", __dirname))
@Tags("enrollment")
export class RepositoryOnboarded implements HandleEvent<graphql.RepoOnboarded.Subscription> {

    @Secret(Secrets.OrgToken)
    public orgToken: string;

    public async handle(event: EventFired<graphql.RepoOnboarded.Subscription>,
                        ctx: HandlerContext): Promise<HandlerResult> {
        const repo = event.data.RepoOnboarded[0].repo;
        const result = await ctx.graphClient.executeQueryFromFile<graphql.LastCommitOnBranch.Query,
            graphql.LastCommitOnBranch.Variables>(
            "../../../graphql/query/lastCommitOnBranch",
            {
                name: repo.name,
                owner: repo.owner,
                branch: repo.defaultBranch,
            },
            {},
            __dirname);

        const commit = result.Repo[0].branches[0].commit;
        const push: graphql.PushToPushLifecycle.Push = {
            after: commit,
            commits: [commit],
            builds: [],
            branch: repo.defaultBranch,
            repo,
            timestamp: commit.timestamp,
        };

        const handler = new PushToPushCardLifecycle();
        handler.orgToken = this.orgToken;

        return handler.handle(
            {
                data: {
                    Push: [push],
                },
                extensions: {
                    ...event.extensions,
                    operationName: "PushToPushCardLifecycle",
                },
                secrets: {
                    ...event.secrets,
                },
            } ,
            ctx);
    }
}

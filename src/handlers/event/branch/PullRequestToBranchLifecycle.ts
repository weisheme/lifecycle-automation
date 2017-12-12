import {
    AutomationContextAware,
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Success,
    SuccessPromise,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as graphql from "../../../typings/types";
import { BranchToBranchLifecycle } from "./BranchToBranchLifecycle";

/**
 * Send a lifecycle message on PullRequest events.
 */
@EventHandler("Send a lifecycle message on Branch events",
    GraphQL.subscriptionFromFile("graphql/subscription/pullRequestToBranch"))
@Tags("lifecycle", "branch", "pr")
export class PullRequestToBranchLifecycle implements HandleEvent<graphql.PullRequestToBranchLifecycle.Subscription> {

    public handle(e: EventFired<graphql.PullRequestToBranchLifecycle.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const pr = e.data.PullRequest[0];

        return ctx.graphClient.executeQueryFromFile
            <graphql.BranchWithPullRequest.Query, graphql.BranchWithPullRequest.Variables>(
            "graphql/query/branchWithPullRequest",
            { id: pr.branch.id },
            { fetchPolicy: "network-only" })
            .then(result => {
                if (result && result.Branch && result.Branch.length > 0) {
                    const handler = new BranchToBranchLifecycle();
                    const event: any = {
                        data: {Branch: result.Branch },
                        extensions: {
                            type: "READ_ONLY",
                            operationName: "PullRequestToBranchLifecycle",
                            team_id: ctx.teamId,
                            team_name: (ctx as any as AutomationContextAware).context.teamName,
                            correlation_id: ctx.correlationId,
                        },
                    };
                    return handler.handle(event, ctx);
                } else {
                    return SuccessPromise;
                }
            })
            .then(() => Success, failure);
    }
}

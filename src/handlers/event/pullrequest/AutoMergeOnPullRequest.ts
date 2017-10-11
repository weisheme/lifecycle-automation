import { Secret } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Secrets,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { autoMerge } from "./autoMerge";

@EventHandler("Event handler that auto merges reviewed and approved pull requests on PullRequest events",
    GraphQL.subscriptionFromFile("graphql/subscription/autoMergeOnPullRequest"))
@Tags("lifecycle", "pr", "automerge")
export class AutoMergeOnPullRequest implements HandleEvent<graphql.AutoMergeOnPullRequest.Subscription> {

    @Secret(Secrets.OrgToken)
    public githubToken: string;

    public handle(root: EventFired<graphql.AutoMergeOnPullRequest.Subscription>,
        ctx: HandlerContext): Promise<HandlerResult> {
        const pr = root.data.PullRequest[0];
        return autoMerge(pr);
    }
}

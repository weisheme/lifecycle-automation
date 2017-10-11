import { Secret } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { Success } from "@atomist/automation-client/HandlerResult";
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

@EventHandler("Event handler that auto merges reviewed and approved pull requests on Status events",
    GraphQL.subscriptionFromFile("graphql/subscription/autoMergeOnStatus"))
@Tags("lifecycle", "pr", "automerge")
export class AutoMergeOnStatus implements HandleEvent<graphql.AutoMergeOnStatus.Subscription> {

    @Secret(Secrets.OrgToken)
    public githubToken: string;

    public handle(root: EventFired<graphql.AutoMergeOnStatus.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const prs = _.get(root, "data.Status[0].commit.pullRequests");
        return Promise.all(prs.map(pr => autoMerge(pr)))
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message }));
    }
}

import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Secret,
    Secrets,
    Success,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { autoMerge } from "./autoMerge";

@EventHandler("Auto merge reviewed and approved pull requests on Status events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/autoMergeOnStatus", __dirname))
@Tags("lifecycle", "pr", "automerge")
export class AutoMergeOnStatus implements HandleEvent<graphql.AutoMergeOnStatus.Subscription> {

    @Secret(Secrets.OrgToken)
    public githubToken: string;

    public handle(root: EventFired<graphql.AutoMergeOnStatus.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const prs = _.get(root, "data.Status[0].commit.pullRequests");
        if (prs) {
            return Promise.all(prs.map(pr => autoMerge(pr, this.githubToken)))
                .then(() => Success)
                .catch(err => failure(err));
        } else {
            return Promise.resolve(Success);
        }

    }
}

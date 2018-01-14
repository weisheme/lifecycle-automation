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
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { autoMerge } from "./autoMerge";

@EventHandler("Auto merge reviewed and approved pull requests on Review events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/autoMergeOnReview", __dirname))
@Tags("lifecycle", "pr", "automerge")
export class AutoMergeOnReview implements HandleEvent<graphql.AutoMergeOnReview.Subscription> {

    @Secret(Secrets.OrgToken)
    public githubToken: string;

    public handle(root: EventFired<graphql.AutoMergeOnReview.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const pr = _.get(root, "data.Review[0].pullRequest");
        return autoMerge(pr, this.githubToken);
    }
}

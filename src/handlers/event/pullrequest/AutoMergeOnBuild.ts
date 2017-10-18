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

@EventHandler("Auto merge reviewed and approved pull requests on Build events",
    GraphQL.subscriptionFromFile("graphql/subscription/autoMergeOnBuild"))
@Tags("lifecycle", "pr", "automerge")
export class AutoMergeOnBuild implements HandleEvent<graphql.AutoMergeOnBuild.Subscription> {

    @Secret(Secrets.OrgToken)
    public githubToken: string;

    public handle(root: EventFired<graphql.AutoMergeOnBuild.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const pr = _.get(root, "data.Build[0].pullRequest");
        return autoMerge(pr, this.githubToken);
    }
}

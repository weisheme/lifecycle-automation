import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { BranchLifecycle } from "./BranchLifecycle";

/**
 * Send a lifecycle message on Branch events.
 */
@EventHandler("Send a lifecycle message on Branch events",
    GraphQL.subscriptionFromFile("graphql/subscription/branchToBranch"))
@Tags("lifecycle", "branch")
export class BranchToBranchLifecycle
    extends BranchLifecycle<graphql.BranchToBranchLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.BranchToBranchLifecycle.Subscription>)
        : [graphql.BranchToBranchLifecycle.Branch[], graphql.BranchToBranchLifecycle.Repo] {

        const branch = _.get(event, "data.Branch[0]");
        return [[branch], branch.repo];
    }

    protected extractPreferences(event: EventFired<graphql.BranchToBranchLifecycle.Subscription>)
        : Preferences[] {
        return _.get(event, "data.Branch[0].repo.org.chatTeam.preferences");
    }
}

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
 * Send a lifecycle message on DeletedBranch events.
 */
@EventHandler("Send a lifecycle message on DeletedBranch events",
    GraphQL.subscriptionFromFile("graphql/subscription/deletedBranchToBranch"))
@Tags("lifecycle", "branch", "pr")
export class DeletedBranchToBranchLifecycle
    extends BranchLifecycle<graphql.BranchToBranchLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.BranchToBranchLifecycle.Subscription>)
    : [graphql.BranchToBranchLifecycle.Branch[], graphql.BranchToBranchLifecycle.Repo, boolean] {

        const branch = _.get(event, "data.DeletedBranch[0]");
        return [[branch], branch.repo, true];
    }

    protected extractPreferences(event: EventFired<graphql.BranchToBranchLifecycle.Subscription>)
    : Preferences[] {
        return _.get(event, "data.DeletedBranch[0].repo.org.chatTeam.preferences");
    }
}

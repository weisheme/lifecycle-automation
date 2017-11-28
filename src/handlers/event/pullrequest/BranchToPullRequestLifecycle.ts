import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PullRequestLifecycleHandler } from "./PullRequestLifecycle";

/**
 * Send a lifecycle message on Branch events.
 */
@EventHandler("Send a lifecycle message on Branch events",
    GraphQL.subscriptionFromFile("graphql/subscription/branchToPullRequest"))
@Tags("lifecycle", "pr", "branch")
export class BranchToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.BranchToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.BranchToPullRequestLifecycle.Subscription>):
        [graphql.BranchToPullRequestLifecycle.PullRequests, graphql.BranchToPullRequestLifecycle.Repo,
            string, boolean ] {

        const pr = _.get(event, "data.Branch[0].pullRequests[0]");
        return [pr, _.get(pr, "repo"), Date.now().toString(), true];
    }

    protected extractPreferences(event: EventFired<graphql.BranchToPullRequestLifecycle.Subscription>)
        : Preferences[] {
        return _.get(event, "data.Branch[0].pullRequests[0].repo.org.chatTeam.preferences");
    }
}

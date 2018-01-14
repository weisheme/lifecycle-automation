import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { ChatTeam } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { PullRequestLifecycleHandler } from "./PullRequestLifecycle";

/**
 * Send a lifecycle message on DeletedBranch events.
 */
@EventHandler("Send a lifecycle message on DeletedBranch events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/deletedBranchToPullRequest", __dirname))
@Tags("lifecycle", "pr", "status")
export class DeletedBranchToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.DeletedBranchToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.DeletedBranchToPullRequestLifecycle.Subscription>):
        [graphql.StatusToPullRequestLifecycle.PullRequests, graphql.StatusToPullRequestLifecycle.Repo,
            string, boolean] {

        const pr = _.get(event, "data.DeletedBranch[0].pullRequests[0]");
        return [pr, _.get(pr, "repo"), Date.now().toString(), true];
    }

    protected extractChatTeams(event: EventFired<graphql.DeletedBranchToPullRequestLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.DeletedBranch[0].pullRequests[0].repo.org.team.chatTeams");
    }
}

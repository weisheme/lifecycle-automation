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
 * Send a lifecycle message on Status events.
 */
@EventHandler("Send a lifecycle message on Status events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/statusToPullRequest", __dirname))
@Tags("lifecycle", "pr", "status")
export class StatusToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.StatusToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.StatusToPullRequestLifecycle.Subscription>):
        [graphql.StatusToPullRequestLifecycle.PullRequests, graphql.StatusToPullRequestLifecycle.Repo,
            string, boolean] {

        const pr = _.get(event, "data.Status[0].commit.pullRequests[0]");
        return [pr, _.get(pr, "repo"), Date.now().toString(), true];
    }

    protected extractChatTeams(event: EventFired<graphql.StatusToPullRequestLifecycle.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Status[0].commit.pullRequests[0].repo.org.team.chatTeams");
    }
}

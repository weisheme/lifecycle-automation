import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import { chatTeamsToPreferences } from "../../../lifecycle/util";
import * as graphql from "../../../typings/types";
import { PullRequestCardLifecycleHandler, PullRequestLifecycleHandler } from "./PullRequestLifecycle";

/**
 * Send a lifecycle message on PullRequest events.
 */
@EventHandler("Send a lifecycle message on PullRequest events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/pullRequestToPullRequest", __dirname))
@Tags("lifecycle", "pr")
export class PullRequestToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.PullRequestToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.PullRequestToPullRequestLifecycle.Subscription>):
        [graphql.PullRequestToPullRequestLifecycle.PullRequest,
            graphql.PullRequestToPullRequestLifecycle.Repo,
            string, boolean] {

        return [event.data.PullRequest[0], event.data.PullRequest[0].repo, Date.now().toString(), false];
    }

    protected extractPreferences(
        event: EventFired<graphql.PullRequestToPullRequestLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.PullRequest[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on PullRequest events.
 */
@EventHandler("Send a lifecycle card on PullRequest events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/pullRequestToPullRequest", __dirname))
@Tags("lifecycle", "pr")
export class PullRequestToPullRequestCardLifecycle
    extends PullRequestCardLifecycleHandler<graphql.PullRequestToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.PullRequestToPullRequestLifecycle.Subscription>):
        [graphql.PullRequestToPullRequestLifecycle.PullRequest,
        graphql.PullRequestToPullRequestLifecycle.Repo,
        string, boolean] {

        return [event.data.PullRequest[0], event.data.PullRequest[0].repo, Date.now().toString(), false];
    }

    protected extractPreferences(
        event: EventFired<graphql.PullRequestToPullRequestLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

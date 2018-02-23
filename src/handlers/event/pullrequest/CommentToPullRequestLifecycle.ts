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
import { PullRequestLifecycleHandler } from "./PullRequestLifecycle";

/**
 * Send a lifecycle message on Comment events.
 */
@EventHandler("Send a lifecycle message on Comment events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/commentToPullRequest", __dirname))
@Tags("lifecycle", "pr", "comment")
export class CommentToPullRequestLifecycle
    extends PullRequestLifecycleHandler<graphql.CommentToPullRequestLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.CommentToPullRequestLifecycle.Subscription>):
        [graphql.CommentToPullRequestLifecycle.PullRequest, graphql.CommentToPullRequestLifecycle.Repo,
            string, boolean] {

        const pr = _.get(event, "data.Comment[0].pullRequest");
        return [pr, _.get(pr, "repo"), Date.now().toString(), true];
    }

    protected extractPreferences(
        event: EventFired<graphql.CommentToPullRequestLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.Comment[0].pullRequest.repo.org.team.chatTeams"));
    }
}

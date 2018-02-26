import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { IssueCardLifecycleHandler } from "./IssueLifecycle";

/**
 * Send a lifecycle card on Comment events.
 */
@EventHandler("Send a lifecycle message on Comment events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/commentToIssue", __dirname))
@Tags("lifecycle", "issue")
export class CommentToIssueCardLifecycle
    extends IssueCardLifecycleHandler<graphql.CommentToIssueLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.CommentToIssueLifecycle.Subscription>):
        [graphql.CommentToIssueLifecycle.Issue, graphql.CommentToIssueLifecycle.Repo, string] {
        const issue = _.get(event.data, "Comment[0].issue") as graphql.CommentToIssueLifecycle.Issue;
        return [issue, _.get(event.data, "Comment[0].issue.repo"),
            (issue ? Date.parse(issue.timestamp).toString() : Date.now().toString())];
    }

    protected extractPreferences(event: EventFired<graphql.CommentToIssueLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

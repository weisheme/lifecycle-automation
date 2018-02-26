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
import { IssueCardLifecycleHandler, IssueLifecycleHandler } from "./IssueLifecycle";

/**
 * Send a lifecycle message on Issue events.
 */
@EventHandler("Send a lifecycle message on Issue events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/issueToIssue", __dirname))
@Tags("lifecycle", "issue")
export class IssueToIssueLifecycle extends IssueLifecycleHandler<graphql.IssueToIssueLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.IssueToIssueLifecycle.Subscription>):
        [graphql.IssueToIssueLifecycle.Issue, graphql.IssueToIssueLifecycle.Repo, string] {

        const issue = event.data.Issue[0];
        const repo = event.data.Issue[0].repo;
        return [issue, repo, Date.now().toString()];
    }

    protected extractPreferences(event: EventFired<graphql.IssueToIssueLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.Issue[0].repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on Issue events.
 */
@EventHandler("Send a lifecycle message on Issue events",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/issueToIssue", __dirname))
@Tags("lifecycle", "issue")
export class IssueToIssueCardLifecycle extends IssueCardLifecycleHandler<graphql.IssueToIssueLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.IssueToIssueLifecycle.Subscription>):
        [graphql.IssueToIssueLifecycle.Issue, graphql.IssueToIssueLifecycle.Repo, string] {
        const issue = event.data.Issue[0];
        const repo = event.data.Issue[0].repo;
        return [issue, repo, Date.now().toString()];
    }

    protected extractPreferences(event: EventFired<graphql.IssueToIssueLifecycle.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

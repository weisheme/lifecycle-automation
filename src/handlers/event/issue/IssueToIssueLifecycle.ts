import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";
import { IssueLifecycleHandler } from "./IssueLifecycle";

/**
 * A Event handler that sends a lifecycle message on Issue events.
 */
@EventHandler("Event handler that sends a lifecycle message on Issue events",
    GraphQL.subscriptionFromFile("graphql/subscription/issueToIssue"))
@Tags("lifecycle", "issue")
export class IssueToIssueLifecycle extends IssueLifecycleHandler<graphql.IssueToIssueLifecycle.Subscription> {

    protected extractNodes(event: EventFired<graphql.IssueToIssueLifecycle.Subscription>):
        [graphql.IssueToIssueLifecycle.Issue, graphql.IssueToIssueLifecycle.Repo, string] {

        const issue = event.data.Issue[0];
        const repo = event.data.Issue[0].repo;
        return [issue, repo, new Date().getTime().toString()];
    }
}

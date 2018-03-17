import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Secret,
    Secrets,
    success,
    SuccessPromise,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { addressEvent } from "@atomist/automation-client/spi/message/MessageClient";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import * as github from "../../command/github/gitHubApi";

const RelatedIssueQuery = `query RelatedIssue($owner: [String]!, $repo: [String]!, $issue: [String]!) {
  IssueRelationship(state: ["open"], type: ["related"]) {
    relationshipId
    type
    state
    source {
      owner
      repo
      issue
    }
    target(owner: $owner, repo: $repo, issue: $issue) {
      owner
      repo
      issue
    }
  }
}
`;

/**
 * Create a comment if a related issue is closed.
 */
@EventHandler("Create a comment if a related issue is closed",
    GraphQL.subscriptionFromFile("../../../graphql/subscription/commentOnRelatedIssueClosed", __dirname))
@Tags("lifecycle", "issue")
export class CommentOnRelatedIssueClosed
    implements HandleEvent<graphql.CommentOnRelatedIssueClosed.Subscription> {

    @Secret(Secrets.OrgToken)
    public orgToken: string;

    public handle(event: EventFired<graphql.CommentOnRelatedIssueClosed.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const issue = event.data.Issue[0];

        return ctx.graphClient.executeQuery<any, any>(
            RelatedIssueQuery,
            {
                owner: [issue.repo.owner],
                repo: [issue.repo.name],
                issue: [issue.number.toString()],
            },
            { fetchPolicy: "network-only" })
        .then(result => {
            if (result
                && result.IssueRelationship
                && result.IssueRelationship.length > 0) {

                const api = github.api(this.orgToken);

                return Promise.all(result.IssueRelationship.map(ir => {
                    return api.issues.createComment({
                        owner: ir.source.owner,
                        repo: ir.source.repo,
                        number: ir.source.issue,
                        body: `Related issue ${ir.target.owner}/${ir.target.repo}#${
                            ir.target.issue} closed by @${issue.closedBy.login}`,
                    })
                    .then(() => {
                        const issueRel = _.cloneDeep(ir);
                        issueRel.state = "closed";
                        return ctx.messageClient.send(issueRel, addressEvent("IssueRelationship"));
                    });
                }));
            }
        })
        .then(success, failure);
    }
}

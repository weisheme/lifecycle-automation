import {
    ingester,
    IngesterBuilder,
    type,
} from "@atomist/automation-client/ingesters";

export interface IssueRelationship {
    relationshipId: string;
    type: "related";
    state: "open" | "closed";
    source: {
        owner: string;
        repo: string;
        issue: string;
    };
    target: {
        owner: string;
        repo: string;
        issue: string;
    };
}

export const issueRelationshipIngester: IngesterBuilder = ingester("IssueRelationship")
    .withType(type("IssueRelationshipIssue")
        .withStringField("owner")
        .withStringField("repo")
        .withStringField("issue"))
    .withType(type("IssueRelationship")
        .withStringField(
            "relationshipId",
            "Unique id of the issue relationship",
            ["compositeId"])
        .withStringField("type")
        .withStringField("state")
        .withObjectField(
            "source",
            "IssueRelationshipIssue",
            "The source issue of the relationship",
            ["owner", "repo", "issue"])
        .withObjectField(
            "target",
            "IssueRelationshipIssue",
            "The target issue of the relationship",
            ["owner", "repo", "issue"]));

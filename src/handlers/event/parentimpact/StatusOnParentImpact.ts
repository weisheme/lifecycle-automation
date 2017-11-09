import {
    EventFired,
    EventHandler,
    failure,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Secret,
    Secrets,
    Success,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as config from "config";
import * as graphql from "../../../typings/types";
import { apiUrl } from "../../../util/helpers";
import * as github from "../../command/github/gitHubApi";

@EventHandler("Send Fingerprint changes to GitHub statuses",
    GraphQL.subscriptionFromFile("graphql/subscription/statusOnParentImpact"))
@Tags("lifecycle", "impact")
export class StatusOnParentImpact implements HandleEvent<graphql.StatusOnParentImpact.Subscription> {

    @Secret(Secrets.OrgToken)
    public githubToken: string;

    public fingerprints: any = config.get("fingerprints.data") || {};

    public handle(event: EventFired<graphql.StatusOnParentImpact.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const impact = event.data.ParentImpact[0];
        const repo = impact.commit.repo;

        const i = JSON.parse(impact.data);
        let changedFingerprints: string[] = [];

        i.forEach(im => im.filter(f => f[1] > 0).forEach(f => {
            if (changedFingerprints.indexOf(f[0]) < 0) {
                changedFingerprints.push(f[0]);
            }
        }));

        // filter out success fingerprints per configuration
        changedFingerprints = changedFingerprints.filter(
            f => this.fingerprints[f] && this.fingerprints[f].status !== "success");

        // tslint:disable-next-line:variable-name
        const target_url = impact.url != null && impact.url.length > 0 ? `${impact.url}?${impact.commit.sha}` : null;

        let status;
        if (changedFingerprints.length > 0) {
            status = {
                state: "failure",
                target_url,
                description: `${(changedFingerprints.length === 1 ? "Fingerprint" :
                    "Fingerprints")} ${changedFingerprints.join(", ")} changed`,
                context: `fingerprint/atomist`,
            };
        } else {
            status = {
                state: "success",
                target_url,
                description: `No blocking Fingerprint changes`,
                context: `fingerprint/atomist`,
            };
        }

        return github.api(this.githubToken, apiUrl(repo)).repos.createStatus({
            owner: repo.owner,
            repo: repo.name,
            sha: impact.commit.sha,
            ...status,
        })
            .then(() => Success)
            .catch(err => failure(err));
    }
}

/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    EventFired,
    EventHandler,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    logger,
    SuccessPromise,
} from "@atomist/automation-client";
import { subscription } from "@atomist/automation-client/graph/graphQL";
import { QueryNoCacheOptions } from "@atomist/automation-client/spi/graph/GraphClient";
import * as graphql from "../../../typings/types";
import * as _ from "lodash";
import * as github from "../../command/github/gitHubApi";
import { createLabel } from "../../command/github/gitHubApi";

@EventHandler("Label issues when deployments occur",
    subscription("labelIssuesOnDeployment"))
export class LabelIssueOnDeployment implements HandleEvent<graphql.LabelIssuesOnDeployment.Subscription> {

    public async handle(e: EventFired<graphql.LabelIssuesOnDeployment.Subscription>,
                        ctx: HandlerContext): Promise<HandlerResult> {
        const deployment = e.data.Deployment[0];
        let previousDeployment;

        // 1. find previous deployment
        const deployments = await ctx.graphClient.query<graphql.DeploymentsForRepo.Query,
            graphql.DeploymentsForRepo.Variables>({
            name: "deploymentsForRepo",
            variables: {
                owner: [deployment.commit.owner],
                repo: [deployment.commit.repo],
                environment: [deployment.environment],
            },
            options: QueryNoCacheOptions,
        });

        // Do some sanity checking and make sure the first deployment is the current event
        if (deployments.Deployment && deployments.Deployment.length === 2) {
            if (deployments.Deployment[0].commit.sha === deployment.commit.sha) {
                previousDeployment = deployments.Deployment[1];
            }
        }

        if (!previousDeployment) {
            logger.warn("Couldn't obtain previous deployment");
            return SuccessPromise;
        }

        // 2. find all commits for the default branch between two deployments
        const commitQuery = retrieveCommitQuery(deployment.commit.owner, deployment.commit.repo, "master", ctx);
        const commits: string[] = [];

        let complete = false;
        let foundStart = false;
        let counter = 0;
        while(!complete) {
            const result = await commitQuery(counter);
            counter++;

            const commitChunks = _.sortBy(_.flatten(result.Push.map(p => p.commits)), "timestamp")
                .reverse().map(c => c.sha);

            let sIx = commitChunks.findIndex(c => c === deployment.commit.sha);
            const eIx = commitChunks.findIndex(c => c === previousDeployment.commit.sha);

            if (sIx >= 0) {
                foundStart = true;
            }

            if (sIx < 0 && foundStart) {
                sIx = 0;
            }

            if (sIx >= 0) {
                if (eIx >= 0) {
                    commits.push(...commitChunks.slice(sIx, eIx));
                } else {
                    commits.push(...commitChunks.slice(sIx));
                }
            }

            if (commitChunks.length === 0 || eIx >= 0) {
                complete = true;
            }
        }
        logger.debug("Previous deployment retrieved and found the following commits between both deployments: '%s'",
            commits.join(", "));

        // 3. find all issue relationships for commits
        const issues = await ctx.graphClient.query<graphql.CommitIssueRelationshipByCommit.Query,
            graphql.CommitIssueRelationshipByCommit.Variables>({
                name: "commitIssueRelationshipByCommit",
                variables: {
                    owner: [deployment.commit.owner],
                    repo: [deployment.commit.repo],
                    sha: commits,
                }
            });

        // 4. update labels for found issues
        if (issues.CommitIssueRelationship && issues.CommitIssueRelationship.length > 0) {
            // TODO CD the following won't work because we can't get tokens for custom events yet
            // const api = github.api(this.githubToken, this.apiUrl);
            // await createLabel(deployment.commit.owner, deployment.commit.repo, deployment.environment, api)
        }

        return SuccessPromise;
    }

}

function retrieveCommitQuery(owner: string, repo: string, branch: string = "master", ctx: HandlerContext) {
    return async (page: number = 0, size: number = 20) => {
        return ctx.graphClient.query<graphql.CommitsForRepoAndBranch.Query,
            graphql.CommitsForRepoAndBranch.Variables>({
            name: "commitsForRepoAndBranch",
            variables: {
                owner,
                repo,
                branch,
                page: size,
                offset: page * size,
            },
        });
    }
}
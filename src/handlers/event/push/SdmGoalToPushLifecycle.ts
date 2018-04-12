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
    Secret,
    Secrets,
    Tags,
} from "@atomist/automation-client";
import { subscription } from "@atomist/automation-client/graph/graphQL";
import { QueryNoCacheOptions } from "@atomist/automation-client/spi/graph/GraphClient";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { PushToPushLifecycle } from "./PushToPushLifecycle";

/**
 * Send a Push lifecycle message on SdmGoal events.
 */
@EventHandler("Send a lifecycle message on SdmGoal events", subscription("sdmGoalToPush"))
@Tags("lifecycle", "push", "sdm goal")
export class SdmGoalToPushLifecycle implements HandleEvent<graphql.SdmGoalToPush.Subscription> {

    @Secret(Secrets.OrgToken)
    public orgToken: string;

    public async handle(e: EventFired<graphql.SdmGoalToPush.Subscription>,
                        ctx: HandlerContext): Promise<HandlerResult> {
        const sha = e.data.SdmGoal[0].sha;
        const branch = e.data.SdmGoal[0].branch;

        const commit = await ctx.graphClient.query<graphql.PushByShaAndBranch.Query,
            graphql.PushByShaAndBranch.Variables>({
                name: "pushByShaAndBranch",
                variables: {
                    branch,
                    sha,
                },
                options: QueryNoCacheOptions,
            });

        const push = _.get(commit, "Commit[0].pushes[0]") as graphql.PushByShaAndBranch.Pushes;

        const handler = new PushToPushLifecycle();
        handler.orgToken = this.orgToken;

        return handler.handle({
            data: {
                Push: [push],
            },
            secrets: e.secrets,
            extensions: {
                ...e.extensions,
                operationName: "PushToPushLifecycle",
            },
        }, ctx);
    }
}

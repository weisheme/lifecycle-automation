/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
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
import * as graphql from "../../../typings/types";
import { autoMerge } from "./autoMerge";

@EventHandler("Auto merge reviewed and approved pull requests on PullRequest events",
    subscription("autoMergeOnPullRequest"))
@Tags("lifecycle", "pr", "automerge")
export class AutoMergeOnPullRequest implements HandleEvent<graphql.AutoMergeOnPullRequest.Subscription> {

    @Secret(Secrets.OrgToken)
    public githubToken: string;

    public handle(root: EventFired<graphql.AutoMergeOnPullRequest.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const pr = root.data.PullRequest[0];
        return autoMerge(pr, this.githubToken);
    }
}

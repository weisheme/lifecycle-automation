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
    reduceResults,
    Secret,
    Secrets,
    Tags,
} from "@atomist/automation-client";
import { subscription } from "@atomist/automation-client/graph/graphQL";
import { QueryNoCacheOptions } from "@atomist/automation-client/spi/graph/GraphClient";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import { chatTeamsToPreferences } from "../../../lifecycle/util";
import * as graphql from "../../../typings/types";
import {
    PushCardLifecycleHandler,
    PushLifecycleHandler,
} from "./PushLifecycle";
import {
    PushToPushCardLifecycle,
    PushToPushLifecycle,
} from "./PushToPushLifecycle";

/**
 * Send a Push lifecycle message on SdmGoal events.
 */
@EventHandler("Send a lifecycle message on SdmGoal events", subscription("sdmGoalToPush"))
@Tags("lifecycle", "push", "sdm goal")
export class SdmGoalToPushLifecycle extends PushLifecycleHandler<graphql.SdmGoalToPush.Subscription> {

    protected extractNodes(event: EventFired<graphql.SdmGoalToPush.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return [event.data.SdmGoal[0].push];
    }

    protected extractPreferences(
        event: EventFired<graphql.SdmGoalToPush.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return chatTeamsToPreferences(_.get(event, "data.SdmGoal[0].push.repo.org.team.chatTeams"));
    }
}

/**
 * Send a lifecycle card on SdmGoal events.
 */
@EventHandler("Send a lifecycle card on Release events", subscription("sdmGoalToPush"))
@Tags("lifecycle", "push", "sdm release")
export class SdmGoalToPushCardLifecycle extends PushCardLifecycleHandler<graphql.SdmGoalToPush.Subscription> {

    protected extractNodes(event: EventFired<graphql.SdmGoalToPush.Subscription>):
        graphql.PushToPushLifecycle.Push[] {
        return [event.data.SdmGoal[0].push];
    }

    protected extractPreferences(
        event: EventFired<graphql.SdmGoalToPush.Subscription>)
        : { [teamId: string]: Preferences[] } {
        return {};
    }
}

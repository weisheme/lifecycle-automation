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

import { LoggingConfig } from "@atomist/automation-client/internal/util/logger";
import * as _ from "lodash";
import "mocha";
import * as assert from "power-assert";
import { SdmGoalsByCommit } from "../../src/typings/types";
import { sortGoals } from "../../src/util/goals";

LoggingConfig.format = "cli";

describe("goals", () => {

    it("should sort goals", () => {
        const goal0: SdmGoalsByCommit.SdmGoal = {
            environment: "code",
            name: "review",
            ts: Date.now(),
        };
        const goal1: SdmGoalsByCommit.SdmGoal = {
            environment: "code",
            name: "autofix",
            ts: Date.now(),
        };
        const goal2: SdmGoalsByCommit.SdmGoal = {
            environment: "code",
            name: "build",
            ts: Date.now(),
        };
        const goal3: SdmGoalsByCommit.SdmGoal = {
            environment: "code",
            name: "docker build",
            preConditions: [{
                environment: "code",
                name: "build",
            }],
            ts: Date.now(),
        };
        const goal4: SdmGoalsByCommit.SdmGoal = {
            environment: "test",
            name: "deployToTest",
            preConditions: [{
                environment: "code",
                name: "build",
            }],
            ts: Date.now(),
        };
        const goal5: SdmGoalsByCommit.SdmGoal = {
            environment: "prod",
            name: "deployToProd",
            preConditions: [{
                environment: "test",
                name: "deployToTest",
            }],
            ts: Date.now(),
        };

        const sortedGoals = sortGoals(_.shuffle([goal0, goal1, goal2, goal3, goal4, goal5]));
        assert.equal(sortedGoals.length, 3);
        assert.equal(sortedGoals[0].environment, "code");
        assert.equal(sortedGoals[1].environment, "test");
        assert.equal(sortedGoals[2].environment, "prod");
        assert.deepEqual(sortedGoals[0].goals, [goal1, goal0, goal2, goal3]);
        assert.deepEqual(sortedGoals[1].goals, [goal4]);
        assert.deepEqual(sortedGoals[2].goals, [goal5]);
    });

    it("sort goals for only one environment", () => {
        const goal1: SdmGoalsByCommit.SdmGoal = {
            environment: "code",
            name: "build",
            ts: Date.now(),
        };
        const goal2: SdmGoalsByCommit.SdmGoal = {
            environment: "code",
            name: "docker build",
            preConditions: [{
                environment: "code",
                name: "build",
            }],
            ts: Date.now(),
        };

        const sortedGoals = sortGoals(_.shuffle([goal1, goal2]));
        assert.equal(sortedGoals.length, 1);
        assert.equal(sortedGoals[0].environment, "code");
        assert.deepEqual(sortedGoals[0].goals, [goal1, goal2]);
    });

    it("handle cycle properly", () => {
        const goal1: SdmGoalsByCommit.SdmGoal = {
            environment: "code",
            name: "build",
            preConditions: [{
                environment: "code",
                name: "docker build",
            }],
            ts: Date.now(),
        };
        const goal2: SdmGoalsByCommit.SdmGoal = {
            environment: "code",
            name: "docker build",
            preConditions: [{
                environment: "code",
                name: "build",
            }],
            ts: Date.now(),
        };

        try {
            sortGoals(_.shuffle([goal1, goal2]));
        } catch (err) {
            assert(err.message.indexOf("Cyclic dependency") >= 0);
        }

    });

});

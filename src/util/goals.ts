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

import * as _ from "lodash";
import { SdmGoalsByCommit } from "../typings/types";

export interface EnvironmentWithGoals {
    environment: string;
    goals: SdmGoalsByCommit.SdmGoal[];
}

export function sortGoals(goals: SdmGoalsByCommit.SdmGoal[]): EnvironmentWithGoals[] {

    goals = goals.sort((g1, g2) =>
        `${g1.environment}-${g1.name}`.localeCompare(`${g2.environment}-${g2.name}`));

    const sortedGoalsWithEnvironment: EnvironmentWithGoals[] = [];
    goals.forEach(sg => {
        const sgwe = sortedGoalsWithEnvironment.find(e => e.environment === sg.environment);
        if (sgwe) {
            sgwe.goals.push(sg);
        } else {
            sortedGoalsWithEnvironment.push({
                environment: sg.environment,
                goals: [sg],
            });
        }
    });

    sortedGoalsWithEnvironment.forEach(sgwe => {
        // sort goals without preconditions or with preconditions in earlier environments first
        let sg: SdmGoalsByCommit.SdmGoal[] = [];

        // insert goals without preconditions first
        sg.push(...sgwe.goals.filter(g =>
            !g.preConditions || g.preConditions.length === 0 ||
            !g.preConditions.some(p => p.environment === sgwe.environment)));
        sg = sg.sort((g1, g2) => g1.name.localeCompare(g2.name));

        const pcgs = sgwe.goals.filter(g =>
            (g.preConditions || []).some(p => p.environment === sgwe.environment));

        pcgs.forEach(pcg => {
            const ix = _.max([maxIndexOfPrecondition(pcg, sg), sg.length - 1]);
            if (ix === -1) {
                sg.push(pcg);
            } else {
                sg.splice(ix + 1, 0, pcg);
            }
        });

        sgwe.goals = sg;
    });

    return sortedGoalsWithEnvironment;
}

function maxIndexOfPrecondition(goal: SdmGoalsByCommit.SdmGoal, goals: SdmGoalsByCommit.SdmGoal[]): number {
    if (!goal.preConditions || goal.preConditions.length === 0) {
        return -1;
    } else {
        return _.max(goal.preConditions.map(p => indexOfPrecondition(p.name, p.environment, goals)));
    }
}

function indexOfPrecondition(name: string, environment: string, goals: SdmGoalsByCommit.SdmGoal[]): number {
    const goal = goals.find(g => g.name === name && g.environment === environment);
    if (goal) {
        return goals.indexOf(goal);
    } else {
        return -1;
    }
}

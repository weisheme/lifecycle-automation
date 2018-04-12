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
import {
    SdmGoalsByCommit,
} from "../../src/typings/types";
import { sortGoals } from "../../src/util/goals";

LoggingConfig.format = "cli";

describe("goals", () => {

    const goalsJson = `[{
    "description": "Build successful",
    "preConditions": [{
      "environment": "0-code",
      "name": "version"
    }],
    "uniqueName": null,
    "name": "build",
    "goalSet": "node docker",
    "state": "success",
    "id": "0e109dd6-b7c1-5832-9ba0-5853e4373be4",
    "url": null,
    "environment": "0-code",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Code review passed",
    "preConditions": [],
    "uniqueName": null,
    "name": "review",
    "goalSet": "node docker",
    "state": "success",
    "id": "0f096d2b-7017-5981-bf39-fcf54f9f269f",
    "url": null,
    "environment": "0-code",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Autofixed",
    "preConditions": [],
    "uniqueName": null,
    "name": "autofix",
    "goalSet": "node docker",
    "state": "success",
    "id": "026a5229-9199-57f5-bb54-b21939035790",
    "url": null,
    "environment": "0-code",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Docker image built",
    "preConditions": [{
      "environment": "0-code",
      "name": "build"
    }],
    "uniqueName": null,
    "name": "docker build",
    "goalSet": "node docker",
    "state": "success",
    "id": "01e03224-d9b4-5eb1-91f6-0bbfdd4f1f90",
    "url": null,
    "environment": "0-code",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Tagged",
    "preConditions": [{
        "environment": "0-code",
        "name": "docker build"
      },
      {
        "environment": "0-code",
        "name": "build"
      }
    ],
    "uniqueName": null,
    "name": "tag",
    "goalSet": "node docker",
    "state": "success",
    "id": "03fd3ea6-ffa3-5961-9c89-1a487fa526ea",
    "url": null,
    "environment": "0-code",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Versioned",
    "preConditions": [],
    "uniqueName": null,
    "name": "version",
    "goalSet": "node docker",
    "state": "success",
    "id": "32787e94-7743-5024-bf7b-ec2fe6f55a76",
    "url": null,
    "environment": "0-code",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Deploy to test",
    "preConditions": [{
        "environment": "0-code",
        "name": "docker build"
      },
      {
        "environment": "0-code",
        "name": "build"
      }
    ],
    "uniqueName": null,
    "name": "deploy to test",
    "goalSet": "node docker",
    "state": "success",
    "id": "32787e94-7743-5024-bf7b-ec2fe6f55a76",
    "url": null,
    "environment": "1-deploy-test",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Deploy to prod",
    "preConditions": [{
      "environment": "1-deploy-test",
      "name": "deploy to test"
    }],
    "uniqueName": null,
    "name": "deploy to prod",
    "goalSet": "node docker",
    "state": "waiting_for_approval",
    "id": "32787e94-7743-5024-bf7b-ec2fe6f55a76",
    "url": null,
    "environment": "2-deploy-prod",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Verify prod",
    "preConditions": [{
      "environment": "2-deploy-prod",
      "name": "deploy to prod"
    }],
    "uniqueName": null,
    "name": "verify prod",
    "goalSet": "node docker",
    "state": "success",
    "id": "32787e94-7743-5024-bf7b-ec2fe6f55a76",
    "url": null,
    "environment": "2-deploy-prod",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  },
  {
    "description": "Notify deployment",
    "uniqueName": null,
    "name": "notify prod",
    "goalSet": "node docker",
    "state": "success",
    "id": "32787e94-7743-5024-bf7b-ec2fe6f55a76",
    "url": null,
    "environment": "2-deploy-prod",
    "ts": 1523543548060,
    "provenance": [{
      "registration": "@atomist/github-sdm",
      "version": "0.4.0-20180412134641",
      "name": "OnAnyRequestedSdmGoal",
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "ts": 1523543553349
    }, {
      "correlationId": "963d58db-5b49-4a01-8616-3f9922ee6fd6",
      "name": "SetGoalsOnPush",
      "registration": "@atomist/github-sdm",
      "ts": 1523543548060,
      "version": "0.4.0-20180412134641"
    }]
  }
]`;

    it("should sort goals", () => {
        const goals = JSON.parse(goalsJson) as SdmGoalsByCommit.SdmGoal[];
        const sortedGoals = sortGoals(_.shuffle(goals));
        console.log(sortedGoals.map(e => `${e.environment}\n${e.goals.map(g => `${g.name}`).join("\n")}`).join("\n\n"));
        console.log("\n");

    });

});

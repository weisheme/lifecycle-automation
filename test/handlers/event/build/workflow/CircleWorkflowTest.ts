import "mocha";
import * as assert from "power-assert";

import {CircleWorkflow, circleWorkflowtoStages} from "../../../../../src/handlers/event/build/workflow/CircleWorkflow";
import {WorkflowStage} from "../../../../../src/handlers/event/build/workflow/WorkflowStage";

describe("CircleWorkflow", () => {
    const workflowConfig = "version: 2\njobs:\n  build:\n    docker:\n      - image: circleci/node:8.4\n    " +
        "working_directory: ~/repo\n    steps:\n      - checkout\n      - run: env\n  one0:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  one1:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  one2:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  one3:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  test:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  two0:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  two1:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  publish:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  three0:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  three1:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  four0:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  staging:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n  promote:\n    docker:\n      " +
        "- image: circleci/node:8.4\n    steps:\n      - run: env\n\nworkflows:\n  version: 2\n  " +
        "cd_pipeline:\n    jobs:\n      - build\n      - one0:\n          requires:\n            " +
        "- build\n      - one1:\n          requires:\n            - build\n      - one2:\n          " +
        "requires:\n            - build\n      - one3:\n          requires:\n            " +
        "- build\n      - test:\n          requires:\n            - one0\n            - one1\n            " +
        "- one2\n            - one3\n      - two0:\n          requires:\n            - test\n      " +
        "- two1:\n          requires:\n            - test\n      - publish:\n          requires:\n            " +
        "- two0\n            - two1\n      - three0:\n          requires:\n            - publish\n      " +
        "- three1:\n          requires:\n            - publish\n      - four0:\n          requires:\n            " +
        "- three1\n      - staging:\n          requires:\n            - three0\n            - four0\n      " +
        "- promote:\n          requires:\n            - staging\n            \nnotify:\n  webhooks:\n    " +
        "- url: https://webhook-staging.atomist.services/atomist/circle/teams/T1L0VDKJP\n    \n";

    it("construct completed workflow stages", () => {
        const workflow = {
            teamId: "TEAM1",
            id: "workflow id",
            name: "pipelineDooling",
            provider: "circle",
            config: workflowConfig,
            builds: [
                {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl1",
                    startedAt: "2017-10-30T17:38:31.564Z",
                    finishedAt: "2017-10-30T17:38:33.516Z",
                    jobName: "build",
                    jobId: "job id 1",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl2",
                    startedAt: "2017-10-30T17:38:40.329Z",
                    finishedAt: "2017-10-30T17:38:41.362Z",
                    jobName: "one2",
                    jobId: "job id 2",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl3",
                    startedAt: "2017-10-30T17:38:41.009Z",
                    finishedAt: "2017-10-30T17:38:42.085Z",
                    jobName: "one1",
                    jobId: "job id 3",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl4",
                    startedAt: "2017-10-30T17:38:44.541Z",
                    finishedAt: "2017-10-30T17:38:46.898Z",
                    jobName: "one3",
                    jobId: "job id 4",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl5",
                    startedAt: "2017-10-30T17:38:41.769Z",
                    finishedAt: "2017-10-30T17:39:04.774Z",
                    jobName: "one0",
                    jobId: "job id 5",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl6",
                    startedAt: "2017-10-30T17:39:08.463Z",
                    finishedAt: "2017-10-30T17:39:14.939Z",
                    jobName: "test",
                    jobId: "job id 6",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl7",
                    startedAt: "2017-10-30T17:39:21.929Z",
                    finishedAt: "2017-10-30T17:39:29.291Z",
                    jobName: "two1",
                    jobId: "job id 7",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl8",
                    startedAt: "2017-10-30T17:39:26.256Z",
                    finishedAt: "2017-10-30T17:39:55.603Z",
                    jobName: "two0",
                    jobId: "job id 8",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl9",
                    startedAt: "2017-10-30T17:40:00.066Z",
                    finishedAt: "2017-10-30T17:40:01.048Z",
                    jobName: "publish",
                    jobId: "job id 9",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl10",
                    startedAt: "2017-10-30T17:40:06.743Z",
                    finishedAt: "2017-10-30T17:40:07.671Z",
                    jobName: "three0",
                    jobId: "job id 10",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl11",
                    startedAt: "2017-10-30T17:40:07.567Z",
                    finishedAt: "2017-10-30T17:40:08.783Z",
                    jobName: "three1",
                    jobId: "job id 11",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl12",
                    startedAt: "2017-10-30T17:40:18.291Z",
                    finishedAt: "2017-10-30T17:40:40.016Z",
                    jobName: "four0",
                    jobId: "job id 12",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl13",
                    startedAt: "2017-10-30T17:41:25.399Z",
                    finishedAt: "2017-10-30T17:41:26.448Z",
                    jobName: "staging",
                    jobId: "job id 13",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl14",
                    startedAt: "2017-10-30T17:41:33.411Z",
                    finishedAt: "2017-10-30T17:41:35.213Z",
                    jobName: "promote",
                    jobId: "job id 14",
                },
            ],
        } as CircleWorkflow;
        const stages = circleWorkflowtoStages(workflow);
        const expectedStages: WorkflowStage[] = [
            {
                name: "build",
                completed: {
                    status: "passed",
                    totalDuration: 1952,
                    longestJobDuration: 1952,
                },
            }, {
                name: "one0",
                completed: {
                    status: "passed",
                    totalDuration: 24445,
                    longestJobDuration: 23005,
                },
            }, {
                name: "test",
                completed: {
                    status: "passed",
                    totalDuration: 6476,
                    longestJobDuration: 6476,
                },
            }, {
                name: "two0",
                completed: {
                    status: "passed",
                    totalDuration: 33674,
                    longestJobDuration: 29347,
                },
            }, {
                name: "publish",
                completed: {
                    status: "passed",
                    totalDuration: 982,
                    longestJobDuration: 982,
                },
            }, {
                name: "three1",
                completed: {
                    status: "passed",
                    totalDuration: 2040,
                    longestJobDuration: 1216,
                },
            }, {
                name: "four0",
                completed: {
                    status: "passed",
                    totalDuration: 21725,
                    longestJobDuration: 21725,
                },
            }, {
                name: "staging",
                completed: {
                    status: "passed",
                    totalDuration: 1049,
                    longestJobDuration: 1049,
                },
            }, {
                name: "promote",
                completed: {
                    status: "passed",
                    totalDuration: 1802,
                    longestJobDuration: 1802,
                },
            },
        ];
        assert.deepEqual(stages, expectedStages);
    });

    it("construct failed workflow", () => {
        const workflow = {
            teamId: "TEAM1",
            id: "workflow id",
            name: "pipelineDooling",
            provider: "circle",
            config: workflowConfig,
            builds: [
                {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl1",
                    startedAt: "2017-10-30T17:38:31.564Z",
                    finishedAt: "2017-10-30T17:38:33.516Z",
                    jobName: "build",
                    jobId: "job id 1",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl2",
                    startedAt: "2017-10-30T17:38:40.329Z",
                    finishedAt: "2017-10-30T17:38:41.362Z",
                    jobName: "one2",
                    jobId: "job id 2",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "failed",
                    buildUrl: "buildUrl3",
                    startedAt: "2017-10-30T17:38:41.009Z",
                    finishedAt: "2017-10-30T17:38:42.085Z",
                    jobName: "one1",
                    jobId: "job id 3",
                }, {
                    teamId: "TEAM1",
                    id: "build id 1",
                    status: "passed",
                    buildUrl: "buildUrl4",
                    startedAt: "2017-10-30T17:38:44.541Z",
                    finishedAt: "2017-10-30T17:38:46.898Z",
                    jobName: "one3",
                    jobId: "job id 4",
                },
            ],
        } as CircleWorkflow;
        const stages = circleWorkflowtoStages(workflow);
        const expectedStages: WorkflowStage[] = [
            {
                name: "build",
                completed: {
                    status: "passed",
                    totalDuration: 1952,
                    longestJobDuration: 1952,
                },
            }, {
                name: "one1",
                completed: {
                    status: "failed",
                    totalDuration: 6569,
                    longestJobDuration: 2357,
                },
            }, {
                name: "test",
            }, {
                name: "two0",
            }, {
                name: "publish",
            }, {
                name: "three0",
            }, {
                name: "four0",
            }, {
                name: "staging",
            }, {
                name: "promote",
            },
        ];
        assert.deepEqual(stages, expectedStages);
    });

});

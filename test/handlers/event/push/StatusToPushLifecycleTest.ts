import { EventFired } from "@atomist/automation-client/HandleEvent";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import { guid } from "@atomist/automation-client/internal/util/string";
import { GraphClient } from "@atomist/automation-client/spi/graph/GraphClient";
import { Destination, MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import "mocha";
import * as assert from "power-assert";
import { fail } from "power-assert";
import { StatusToPushLifecycle } from "../../../../src/handlers/event/push/StatusToPushLifecycle";

describe("StatusToPushLifecycle", () => {

    /* tslint:disable */
    const payloadRaisePr = `
    {
  "data": {
    "Status": [{
      "_id": 124543,
      "commit": {
        "pushes": [{
          "builds": [{
            "buildId": "55826126",
            "buildUrl": "https://travis-ci.com/atomisthq/automation-api/builds/55826126",
            "name": "313",
            "provider": "travis",
            "status": "passed",
            "commit": {
              "sha": "a35f2cc17f5f0fa8fc9fbbe6c7debe23963feb52"
            },
            "timestamp": "2017-09-30T19:35:52.876Z"
          }],
          "before": {
            "sha": "71f587adade1c4d746f36ed0abd7f2d4c60167fa"
          },
          "after": {
            "sha": "a35f2cc17f5f0fa8fc9fbbe6c7debe23963feb52",
            "message": "MappedParameter support for user config",
            "statuses": [{
              "context": "continuous-integration/travis-ci/push",
              "description": "The Travis CI build passed",
              "targetUrl": "https://travis-ci.com/atomisthq/automation-api/builds/55826126?utm_source=github_status&utm_medium=notification",
              "state": "success"
            }],
            "tags": [{
                "name": "1.0.0",
                "release": {
                    "name": "release-1.0.0"
                }
            }]
          },
          "repo": {
            "owner": "atomisthq",
            "name": "automation-api",
            "channels": [{
              "name": "automation-api",
              "team": {
                "id": "T095SFFBK"
              }
            }],
            "labels": [{
              "name": "help wanted"
            }, {
              "name": "Discussion Required"
            }, {
              "name": "enhancement"
            }, {
              "name": "bug"
            }, {
              "name": "in-progress"
            }, {
              "name": "Discussion Required"
            }, {
              "name": "blocked"
            }, {
              "name": "bug"
            }, {
              "name": "enhancement"
            }, {
              "name": "enhancement"
            }],
            "org": {
              "provider": null
            },
            "defaultBranch": "master"
          },
          "commits": [{
            "sha": "a35f2cc17f5f0fa8fc9fbbe6c7debe23963feb52",
            "message": "MappedParameter support for user config",
            "resolves": [],
            "impact": null,
            "apps": [],
            "tags": [],
            "author": {
              "login": "kipz",
              "person": {
                "chatId": {
                  "screenName": "kipz"
                }
              }
            },
            "timestamp": "2017-09-30T14:33:23-05:00"
          }],
          "timestamp": "2017-09-30T19:33:38.183Z",
          "branch": "prefs"
        }],
        "timestamp": "2017-09-30T14:33:23-05:00"
      }
    }]
  },
  "extensions": {
    "type": "READ_ONLY",
    "operationName": "StatusToPushLifecycle",
    "team_id": "T095SFFBK",
    "correlation_id": "4ff037a3-75ec-41ce-a1b2-5a7024233279"
  }
}`;
    /* tslint:enable */

    it("render Raise PR button for successful build", done => {
        let messageSent = false;
        class MockMessageClient {

            public send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                const sm = msg as SlackMessage;
                assert(sm.attachments[0].actions.length === 1);
                assert(sm.attachments[0].actions[0].text === "Raise PR");
                assert(sm.attachments[1].text.includes("Release"));
                assert(sm.attachments[1].text.includes("release-1.0.0"));
                messageSent = true;
                return Promise.resolve();
            }

        }

        class MockGraphClient implements GraphClient {

            public endpoint = "";

            public executeQueryFromFile<T, Q>(queryFile: string, variables?: Q): Promise<T> {

                return Promise.resolve({
                    ChatTeam: [
                        {
                            orgs: [
                                {
                                    repo: [
                                        {
                                            owner: "atomisthq",
                                            name: "automation-api",
                                            branches: [
                                                {
                                                    name: "prefs",
                                                    deleted: false,
                                                    pullRequests: null,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                } as any);

            }

            public executeQuery<T, Q>(query: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

            public executeMutationFromFile<T, Q>(mutationFile: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

            public executeMutation<T, Q>(mutation: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }
        }

        const ctx = {
            teamId: "T095SFFBK",
            correlationId: "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9",
            invocationId: guid(),
            graphClient: new MockGraphClient(),
            messageClient: new MockMessageClient(),
        };
        const handler = new StatusToPushLifecycle();
        handler.handle(JSON.parse(payloadRaisePr) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(messageSent);
                assert(result.code === 0);
            })
            .then(done, done);

    });

    /* tslint:disable */
    const payloadNoChannel = `{
    "data": {
        "Status": [{
            "_id": 557056,
            "commit": {
                "pushes": [{
                    "builds": [],
                    "before": {
                        "sha": "c3f04c3b37eaee80923b3321c5304dfc2b8fb1ff"
                    },
                    "after": {
                        "sha": "886a5c0b985d55659c2c1fdf2542719846daafe2",
                        "message": "2017.4.0 - release",
                        "statuses": [{
                            "context": "fingerprint/atomist",
                            "description": "No blocking Fingerprint changes",
                            "targetUrl": "",
                            "state": "success"
                        }],
                        "tags": []
                    },
                    "repo": {
                        "owner": "test-owner",
                        "name": "test-name",
                        "channels": [{
                            "name": ""
                        }],
                        "labels": [],
                        "org": {
                            "provider": null,
                            "chatTeam": {
                                "preferences": []
                            }
                        },
                        "defaultBranch": "master"
                    },
                    "commits": [{
                        "sha": "886a5c0b985d55659c2c1fdf2542719846daafe2",
                        "message": "2017.4.0 - release",
                        "resolves": [],
                        "impact": {
                            "data": "[[[\\"travis\\",0],[\\"docker\\",0],[\\"props\\",0],[\\"rest\\",0],[\\"plugsMgt\\",1],[\\"depsMgt\\",0],[\\"plugins\\",0],[\\"deps\\",0]]]",
                            "url": ""
                        },
                        "apps": [],
                        "tags": [],
                        "author": {
                            "login": "testperson",
                            "person": null
                        },
                        "timestamp": "2017-10-18T13:25:19+01:00"
                    }],
                    "timestamp": "2017-10-18T12:25:53.168Z",
                    "branch": "release/2017.4.x"
                }],
                "timestamp": "2017-10-18T13:25:19+01:00"
            }
        }]
    },
    "extensions": {
        "type": "READ_ONLY",
        "operationName": "StatusToPushLifecycle",
        "team_id": "xxx",
        "team_name": "xxx",
        "correlation_id": "fe4a5e6b-d079-4687-ab04-baf0d2ee3faf"
    }
}`;
    /* tslint:enable */
    it("don't render message of empty channel", done => {
        const messageSent = false;
        class MockMessageClient {

            public send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                return Promise.reject("Should be called");
            }

        }

        class MockGraphClient implements GraphClient {

            public endpoint = "";

            public executeQueryFromFile<T, Q>(queryFile: string, variables?: Q): Promise<T> {

                return Promise.resolve({
                    ChatTeam: [
                        {
                            orgs: [
                                {
                                    repo: [
                                        {
                                            owner: "atomisthq",
                                            name: "automation-api",
                                            branches: [
                                                {
                                                    name: "prefs",
                                                    deleted: false,
                                                    pullRequests: null,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                } as any);

            }

            public executeQuery<T, Q>(query: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

            public executeMutationFromFile<T, Q>(mutationFile: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

            public executeMutation<T, Q>(mutation: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }
        }

        const ctx = {
            teamId: "xxx",
            correlationId: "fe4a5e6b-d079-4687-ab04-baf0d2ee3faf",
            invocationId: guid(),
            graphClient: new MockGraphClient(),
            messageClient: new MockMessageClient(),
        };
        const handler = new StatusToPushLifecycle();
        handler.handle(JSON.parse(payloadNoChannel) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(!messageSent);
                assert(result.code === 0);
            })
            .then(done, done);

    });

    /* tslint:disable */
    const payloadNoRaisePr = `
    {
  "data": {
    "Status": [{
      "_id": 124543,
      "commit": {
        "pushes": [{
          "builds": [{
            "buildId": "55826126",
            "buildUrl": "https://travis-ci.com/atomisthq/automation-api/builds/55826126",
            "name": "313",
            "provider": "travis",
            "status": "passed",
            "commit": {
              "sha": "a35f2cc17f5f0fa8fc9fbbe6c7debe23963feb52"
            },
            "timestamp": "2017-09-30T19:35:52.876Z"
          }],
          "before": {
            "sha": "71f587adade1c4d746f36ed0abd7f2d4c60167fa"
          },
          "after": {
            "sha": "a35f2cc17f5f0fa8fc9fbbe6c7debe23963feb52",
            "message": "MappedParameter support for user config",
            "statuses": [{
              "context": "continuous-integration/travis-ci/push",
              "description": "The Travis CI build passed",
              "targetUrl": "https://travis-ci.com/atomisthq/automation-api/builds/55826126?utm_source=github_status&utm_medium=notification",
              "state": "success"
            }],
            "tags": []
          },
          "repo": {
            "owner": "atomisthq",
            "name": "automation-api",
            "channels": [{
              "name": "automation-api",
              "team": {
                "id": "T095SFFBK"
              }
            }],
            "labels": [{
              "name": "help wanted"
            }, {
              "name": "Discussion Required"
            }, {
              "name": "enhancement"
            }, {
              "name": "bug"
            }, {
              "name": "in-progress"
            }, {
              "name": "Discussion Required"
            }, {
              "name": "blocked"
            }, {
              "name": "bug"
            }, {
              "name": "enhancement"
            }, {
              "name": "enhancement"
            }],
            "org": {
              "provider": null,
              "team": {
                "id": "T095SFFBK",
                "chatTeams": [{
                    "id": "T095SFFBK",
                    "preferences": [{
                        "name": "lifecycle_actions",
                        "value": "{\\"automation-api\\":{\\"push.raise_pullrequest\\":false}}"
                    }]
                }] 
              }
            },
            "defaultBranch": "master"
          },
          "commits": [{
            "sha": "a35f2cc17f5f0fa8fc9fbbe6c7debe23963feb52",
            "message": "MappedParameter support for user config",
            "resolves": [],
            "impact": null,
            "apps": [],
            "tags": [],
            "author": {
              "login": "kipz",
              "person": {
                "chatId": {
                  "screenName": "kipz"
                }
              }
            },
            "timestamp": "2017-09-30T14:33:23-05:00"
          }],
          "timestamp": "2017-09-30T19:33:38.183Z",
          "branch": "prefs"
        }],
        "timestamp": "2017-09-30T14:33:23-05:00"
      }
    }]
  },
  "extensions": {
    "type": "READ_ONLY",
    "operationName": "StatusToPushLifecycle",
    "team_id": "T095SFFBK",
    "correlation_id": "4ff037a3-75ec-41ce-a1b2-5a7024233279"
  }
}`;
    /* tslint:enable */

    it("don't render Raise PR button for successful build when button is disabled", done => {
        let messageSent = false;
        class MockMessageClient {

            public send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                const sm = msg as SlackMessage;
                assert(sm.attachments[0].actions.length === 0);
                messageSent = true;
                return Promise.resolve();
            }
        }

        class MockGraphClient implements GraphClient {

            public endpoint = "";

            public executeQueryFromFile<T, Q>(queryFile: string, variables?: Q): Promise<T> {

                return Promise.resolve({
                    ChatTeam: [
                        {
                            orgs: [
                                {
                                    repo: [
                                        {
                                            owner: "atomisthq",
                                            name: "automation-api",
                                            branches: [
                                                {
                                                    name: "prefs",
                                                    deleted: false,
                                                    pullRequests: null,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                } as any);

            }

            public executeQuery<T, Q>(query: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

            public executeMutationFromFile<T, Q>(mutationFile: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

            public executeMutation<T, Q>(mutation: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }
        }

        const ctx = {
            teamId: "T095SFFBK",
            correlationId: "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9",
            invocationId: guid(),
            graphClient: new MockGraphClient(),
            messageClient: new MockMessageClient(),
        };
        const handler = new StatusToPushLifecycle();
        handler.handle(JSON.parse(payloadNoRaisePr) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(messageSent);
                assert(result.code === 0);
            })
            .then(done, done);

    });

    /* tslint:disable */
    const payloadWithPhases = `{
  "data": {
    "Status": [{
      "_id": 1740274,
      "commit": {
        "pushes": [{
          "after": {
            "author": {
              "login": "jessitron",
              "person": {
                "chatId": {
                  "screenName": "jessitron"
                }
              }
            },
            "fingerprints": [{
              "data": null,
              "name": "dependencies",
              "sha": "e3a95168a2163577f707dd61d7172911034ddc9781698bd593e2365b546877dc048677a6845d7b8d6319cfdf53f39d21b4e2760c8a4c6501dae3050362b3f39b"
            }],
            "images": [{
              "_id": 1740311,
              "image": null,
              "imageName": "gcr.io/reference-implementation-1/spring-team/prendergast:7a6428da814f2cf541a7400c30e929aca58487a5",
              "pods": [{
                "_id": 1740315,
                "baseName": "rspring-team-0-prendergast9-576f96cdc7",
                "name": "rspring-team-0-prendergast9-576f96cdc7-9kd9m",
                "resourceVersion": 276210,
                "phase": "Running",
                "containers": [{
                  "_id": 1740318,
                  "ready": true,
                  "name": "rspring-team-0-prendergast9",
                  "restartCount": 0,
                  "resourceVersion": 276210,
                  "state": "running",
                  "environment": "testing",
                  "imageName": "gcr.io/reference-implementation-1/spring-team/prendergast:7a6428da814f2cf541a7400c30e929aca58487a5",
                  "timestamp": "2018-03-03T00:02:10.729Z",
                  "statusJSON": "{\\"name\\":\\"rspring-team-0-prendergast9\\",\\"state\\":{\\"running\\":{\\"startedAt\\":\\"2018-03-03T00:02:09Z\\"}},\\"lastState\\":{},\\"ready\\":true,\\"restartCount\\":0,\\"image\\":\\"gcr.io/reference-implementation-1/spring-team/prendergast:7a6428da814f2cf541a7400c30e929aca58487a5\\",\\"imageID\\":\\"docker-pullable://gcr.io/reference-implementation-1/spring-team/prendergast@sha256:88a75c9f8a3a64c671d15e953736d7f45a9e7f4e96b5c673b076431ef9db4641\\",\\"containerID\\":\\"docker://041088a4842fc66fb96d3298bef25b0c6096d2538765df20906bf6afd7990d6c\\"}"
                }],
                "environment": "testing",
                "timestamp": "2018-03-03T00:02:05Z",
                "namespace": "rt5964n9b7-0-testing9"
              }],
              "timestamp": "2018-03-03T00:01:57.832Z"
            }],
            "message": "Enable deployment to Kubernetes\\n\\nMerge pull request #1",
            "sha": "7a6428da814f2cf541a7400c30e929aca58487a5",
            "statuses": [{
              "context": "deploy/atomist/k8s/testing",
              "description": "Requested deploy by k8-automation",
              "state": "success",
              "targetUrl": "https://sdm.atomist.io/T5964N9B7/testing/spring-team/prendergast/",
              "timestamp": "2018-03-03T00:02:06.314Z"
            }, {
              "context": "build/atomist/k8s/master",
              "description": "Atomist continuous integration build for Google Container Builder",
              "state": "success",
              "targetUrl": "https://storage.googleapis.com/reference-implementation-1-build-logs-1/log-3667199a-750e-4ba7-83d7-a4264e31dae1.txt?GoogleAccessId=container-ci-1@reference-implementation-1.iam.gserviceaccount.com&Expires=1520121728&Signature=GxRxtIvSuR7AH32D%2B1fJRYaU%2FtL39gRpbo9OMH9Lniw6ENZJSDsVtkOUrz2fTH8SGIAF%2Fu8wwPkd3sbILTMQ0VeQ8%2FK%2B5nAdCYeNFmnrQJry0wLA2dk%2BwkrsvyS53kDg0YNmTOcdncouagaS5nj8zHKcmH9CIqGhX8Std7BeWvhSP6gIrTvVpzC6xMmHw43RRuC6FeXxqmNN%2Fn0vp27fqb6voOgA4%2Bu8qw%2BtmgQrFrNQlYTlvR%2F3cydkzfUixC8hELX0QTxqFINIizZaU0%2Bzqadb%2FbK7UjpxYVEm2NlknckUYqFz245jsyVoMl15iuLvAHh5fOlXBi%2Bvoga7EzOpDA%3D%3D",
              "timestamp": "2018-03-03T00:02:08.491Z"
            }, {
              "context": "sdm/atomist/0-code/1-scan",
              "description": "Completed scan",
              "state": "success",
              "targetUrl": "https://scan.atomist.com/spring-team/prendergast/7a6428da814f2cf541a7400c30e929aca58487a5",
              "timestamp": "2018-03-03T00:00:31.232Z"
            }, {
              "context": "sdm/atomist/2-prod/3-PCF-prod-deploy",
              "description": "Skipping deploy to production because verify endpoint in Test failed",
              "state": "failure",
              "targetUrl": "",
              "timestamp": "2018-03-03T00:02:14.725Z"
            }, {
              "context": "sdm/atomist/2-prod/4-endpoint",
              "description": "Skipping find production endpoint because verify endpoint in Test failed",
              "state": "failure",
              "targetUrl": "",
              "timestamp": "2018-03-03T00:02:14.680Z"
            }, {
              "context": "sdm/atomist/1-staging/4-endpoint",
              "description": "Complete: find endpoint in Test",
              "state": "success",
              "targetUrl": "https://sdm.atomist.io/T5964N9B7/testing/spring-team/prendergast/",
              "timestamp": "2018-03-03T00:02:08.691Z"
            }, {
              "context": "sdm/atomist/1-staging/5-verifyEndpoint",
              "description": "Failed to  verify endpoint in Test",
              "state": "failure",
              "targetUrl": "https://sdm.atomist.io/T5964N9B7/testing/spring-team/prendergast/?atomist:approve=true",
              "timestamp": "2018-03-03T01:20:47.981Z"
            }, {
              "context": "sdm/atomist/0-code/2-build",
              "description": "Completed sdm/atomist/0-code/2-build",
              "state": "success",
              "targetUrl": "https://storage.googleapis.com/reference-implementation-1-build-logs-1/log-6a28cbd7-cbed-4a7f-b2d3-2176b5863725.txt?GoogleAccessId=container-ci-1@reference-implementation-1.iam.gserviceaccount.com&Expires=1520121717&Signature=OZFuIlD1dOzHPmUsJmVZ%2BfkWqqQm1qpBE6mu4NvsAEa9MLuhmWScHCDBesc47M3LI5j4bzMvXT%2BPiQUQPyBQC93rraKHj2W8AAlm1NagR2oNgkB4hv4inqdP5ZAhKaiao5FZ2zKv1M%2BhERcX9Lm5tTN8BCr6c9kMrF6whV8nuNPQOr%2BrL6vh3O06%2FjDdBakvctvARVD4LjfrYgLgV5q79UW6x7%2BzL5NAyqO354RAS3Hwi9A7iDwqHJBRNylO1S7CPaF58JsdjNW8DQxWcKonpMjTPg1S7EnAUHDWap1589m1Rg8la9m%2Fxj%2F50sGgUU8kWEf%2FPZ08p1k9Ie9QSA%2FFdQ%3D%3D",
              "timestamp": "2018-03-03T00:02:01.213Z"
            }, {
              "context": "sdm/atomist/1-staging/3-deploy",
              "description": "Complete: deploy to Test space",
              "state": "success",
              "targetUrl": "",
              "timestamp": "2018-03-03T00:02:08.465Z"
            }, {
              "context": "sdm/atomist/0-code/2.5-artifact",
              "description": "Complete: find artifact gcr.io/reference-implementation-1/spring-team/prendergast:7a6428da814f2cf541a7400c30e929aca58487a5",
              "state": "success",
              "targetUrl": "",
              "timestamp": "2018-03-03T00:02:01.942Z"
            }],
            "tags": []
          },
          "before": {
            "sha": "3888e1785cf230649490b3497981da05d2b50387"
          },
          "branch": "master",
          "builds": [{
            "buildId": "spring-team/prendergast/7a6428da814f2cf541a7400c30e929aca58487a5",
            "buildUrl": "https://storage.googleapis.com/reference-implementation-1-build-logs-1/log-6a28cbd7-cbed-4a7f-b2d3-2176b5863725.txt?GoogleAccessId=container-ci-1@reference-implementation-1.iam.gserviceaccount.com&Expires=1520121717&Signature=OZFuIlD1dOzHPmUsJmVZ%2BfkWqqQm1qpBE6mu4NvsAEa9MLuhmWScHCDBesc47M3LI5j4bzMvXT%2BPiQUQPyBQC93rraKHj2W8AAlm1NagR2oNgkB4hv4inqdP5ZAhKaiao5FZ2zKv1M%2BhERcX9Lm5tTN8BCr6c9kMrF6whV8nuNPQOr%2BrL6vh3O06%2FjDdBakvctvARVD4LjfrYgLgV5q79UW6x7%2BzL5NAyqO354RAS3Hwi9A7iDwqHJBRNylO1S7CPaF58JsdjNW8DQxWcKonpMjTPg1S7EnAUHDWap1589m1Rg8la9m%2Fxj%2F50sGgUU8kWEf%2FPZ08p1k9Ie9QSA%2FFdQ%3D%3D",
            "commit": {
              "sha": "7a6428da814f2cf541a7400c30e929aca58487a5"
            },
            "name": "build 7a6428da814f2cf541a7400c30e929aca58487a5 of spring-team/prendergast",
            "provider": "GoogleContainerBuilder",
            "status": "passed",
            "timestamp": "2018-03-03T00:01:57.943Z",
            "workflow": null
          }],
          "commits": [{
            "apps": [{
              "data": "{}",
              "domain": "testing",
              "host": "rspring-team-0-prendergast9-576f96cdc7-9kd9m",
              "state": "started"
            }, {
              "data": "{}",
              "domain": "development",
              "host": "27f47aa24c42",
              "state": "stopping"
            }, {
              "data": "{}",
              "domain": "development",
              "host": "815dc310fd73",
              "state": "stopping"
            }],
            "author": {
              "login": "jessitron",
              "person": {
                "chatId": {
                  "screenName": "jessitron"
                }
              }
            },
            "impact": {
              "data": "[[[\\"deps\\",0]],[[\\"deps\\",0]]]",
              "url": ""
            },
            "message": "Enable deployment to Kubernetes\\n\\nMerge pull request #1",
            "resolves": [],
            "sha": "7a6428da814f2cf541a7400c30e929aca58487a5",
            "tags": [],
            "timestamp": "2018-03-02T18:00:20-06:00"
          }, {
            "apps": [],
            "author": {
              "login": "jessitron",
              "person": {
                "chatId": {
                  "screenName": "jessitron"
                }
              }
            },
            "impact": {
              "data": "[[[\\"deps\\",0]]]",
              "url": ""
            },
            "message": "enable deployment to kubernetes",
            "resolves": [],
            "sha": "b2ed7524932d7f7ab9075de61f8508398cc9d1a2",
            "tags": [],
            "timestamp": "2018-03-03T00:00:10Z"
          }],
          "repo": {
            "channels": [{
              "name": "prendergast",
              "team": {
                "id": "T5964N9B7"
              }
            }],
            "defaultBranch": "master",
            "labels": [{
              "name": "wontfix"
            }, {
              "name": "question"
            }, {
              "name": "invalid"
            }, {
              "name": "help wanted"
            }, {
              "name": "good first issue"
            }, {
              "name": "enhancement"
            }, {
              "name": "duplicate"
            }, {
              "name": "bug"
            }],
            "name": "prendergast",
            "org": {
              "provider": {
                "apiUrl": "https://api.github.com/",
                "gitUrl": "git@github.com:",
                "url": "https://github.com/"
              },
              "team": {
                "chatTeams": [{
                  "id": "T5964N9B7",
                  "preferences": [{
                    "name": "lifecycle_preferences",
                    "value": "{\\"push\\":{\\"configuration\\":{\\"emoji-style\\":\\"atomist\\",\\"show-statuses-on-push\\":true,\\"build\\":{\\"style\\":\\"decorator\\"},\\"fingerprints\\":{\\"about-hint\\":false,\\"render-unchanged\\":true,\\"style\\":\\"fingerprint-inline\\"}}},\\"pull_request\\":{\\"configuration\\":{\\"emoji-style\\":\\"atomist\\"}}}"
                  }, {
                    "name": "disable_bot_owner_on_github_activity_notification",
                    "value": "true"
                  }]
                }],
                "id": "T5964N9B7"
              }
            },
            "owner": "spring-team"
          },
          "timestamp": "2018-03-03T00:00:22.275Z"
        }],
        "timestamp": "2018-03-02T18:00:20-06:00"
      },
      "context": "sdm/atomist/1-staging/5-verifyEndpoint",
      "description": "Failed to  verify endpoint in Test",
      "state": "failure",
      "targetUrl": "https://sdm.atomist.io/T5964N9B7/testing/spring-team/prendergast/?atomist:approve=true"
    }]
  },
  "extensions": {
    "operationName": "StatusToPushLifecycle",
    "team_id": "T5964N9B7",
    "team_name": "Atomist",
    "correlation_id": "95a190ee-a6cb-427e-b151-0144d1736763"
  },
  "api_version": "1",
  "secrets": [{
    "uri": "github://org_token",
    "value": "1**************************************a"
  }]
}`;
    /* tslint:enable */

    it("render phase attachements separately per env", done => {
        let messageSent = false;
        class MockMessageClient {

            public send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                const sm = msg as SlackMessage;
                assert(sm.attachments.length === 8);
                assert(sm.attachments[2].author_name === "Phases");
                assert(sm.attachments[4].actions.length === 1);
                assert(sm.attachments[4].actions[0].text === "Approve 'Failed to  verify endpoint in Test'");
                messageSent = true;
                return Promise.resolve();
            }

        }

        class MockGraphClient implements GraphClient {

            public endpoint = "";

            public executeQueryFromFile(queryFile: string, variables?: any): Promise<any> {
                return Promise.resolve({});
            }

            public executeQuery<T, Q>(query: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

            public executeMutationFromFile<T, Q>(mutationFile: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

            public executeMutation<T, Q>(mutation: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
            }
        }

        const ctx = {
            teamId: "T095SFFBK",
            correlationId: "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9",
            invocationId: guid(),
            graphClient: new MockGraphClient(),
            messageClient: new MockMessageClient(),
        };
        const handler = new StatusToPushLifecycle();
        handler.handle(JSON.parse(payloadWithPhases) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(messageSent);
                assert(result.code === 0);
            })
            .then(done, done);

    });

});

import { EventFired } from "@atomist/automation-client/HandleEvent";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import { guid } from "@atomist/automation-client/internal/util/string";
import { GraphClient } from "@atomist/automation-client/spi/graph/GraphClient";
import { MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { MessageClientSupport } from "@atomist/automation-client/spi/message/MessageClientSupport";
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
            "tags": []
          },
          "repo": {
            "owner": "atomisthq",
            "name": "automation-api",
            "channels": [{
              "name": "automation-api"
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
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                const sm = msg as SlackMessage;
                assert(sm.attachments[0].actions.length === 1);
                assert(sm.attachments[0].actions[0].text === "Raise PR");
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

        const ctx: HandlerContext = {
            teamId: "T095SFFBK",
            correlationId: "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9",
            invocationId: guid(),
            graphClient: new MockGraphClient(),
            messageClient: new MockMessageClient(),
        };
        const handler = new StatusToPushLifecycle();
        handler.handle(JSON.parse(payloadRaisePr) as EventFired<any>, ctx)
            .then(result => {
                console.log(result);
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
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                fail();
                return Promise.reject("Shouldn't call this");
            }

        }

        class MockGraphClient implements GraphClient {

            public endpoint = "";

            public executeQueryFromFile<T, Q>(queryFile: string, variables?: Q): Promise<T> {
                fail();
                return Promise.reject("Shouldn't call this");
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

        const ctx: HandlerContext = {
            teamId: "xxx",
            correlationId: "fe4a5e6b-d079-4687-ab04-baf0d2ee3faf",
            invocationId: guid(),
            graphClient: new MockGraphClient(),
            messageClient: new MockMessageClient(),
        };
        const handler = new StatusToPushLifecycle();
        handler.handle(JSON.parse(payloadNoChannel) as EventFired<any>, ctx)
            .then(result => {
                console.log(result);
            })
            .then(done, done);

    });

});

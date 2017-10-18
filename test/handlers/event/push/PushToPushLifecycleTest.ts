import { EventFired } from "@atomist/automation-client/HandleEvent";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import { guid } from "@atomist/automation-client/internal/util/string";
import { MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { MessageClientSupport } from "@atomist/automation-client/spi/message/MessageClientSupport";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import "mocha";
import * as assert from "power-assert";
import { PushToPushLifecycle } from "../../../../src/handlers/event/push/PushToPushLifecycle";

describe("PushToPushLifecycle", () => {

    /* tslint:disable */
    const payload = `{
    "data": {
        "Push": [{
            "_id": 544370,
            "builds": [],
            "before": {
                "sha": "6118d2b42f65026311ff1f8bc60c40e36e3a0452"
            },
            "after": {
                "sha": "2887cd5b1c9e3d3d725da4dfb024d7e96ed82d92",
                "message": "some commit",
                "statuses": [],
                "tags": []
            },
            "repo": {
                "owner": "some-owner",
                "name": "some-repo",
                "channels": [{
                    "name": "some-channel1"
                  },
                  {
                    "name": "some-channel2"
                  }],
                "labels": [{
                    "name": "accepted"
                }],
                "org": {
                    "provider": null,
                    "chatTeam": {
                        "preferences": [{
                            "name": "branch_configuration",
                            "value": "[{\\"name\\":\\"some-channel1\\",\\"repositories\\":[{\\"owner\\":\\"some-owner\\",\\"name\\":\\"some-repo\\",%%CONFIG%%}]}]"
                          }]
                    }
                },
                "defaultBranch": "master"
            },
            "commits": [{
                "sha": "2887cd5b1c9e3d3d725da4dfb024d7e96ed82d92",
                "message": "some commit",
                "resolves": [],
                "impact": null,
                "apps": [],
                "tags": [],
                "author": {
                    "login": "",
                    "person": null
                },
                "timestamp": "2017-10-17T01:46:12Z"
            }],
            "timestamp": "2017-10-17T01:46:14.409Z",
            "branch": "master"
        }]
    },
    "extensions": {
        "type": "READ_ONLY",
        "operationName": "PushToPushLifecycle",
        "team_id": "T02FL4A1X",
        "team_name": "Cloud Foundry",
        "correlation_id": "c4186758-e47f-4069-bccd-a555380d46cd"
    }
}`;
    /* tslint:enable */

    it("correctly filter pushes on excluded branch", done => {
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(channelNames.length === 1);
                assert(channelNames[0] === "some-channel2");
                return Promise.resolve();
            }

        }

        const ctx: HandlerContext = {
            teamId: "T095SFFBK",
            correlationId: "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9",
            invocationId: guid(),
            graphClient: null,
            messageClient: new MockMessageClient(),
        };
        const handler = new PushToPushLifecycle();
        const config = `\\"exclude\\":\\"^m.*r$\\"`;

        handler.handle(JSON.parse(payload.replace("%%CONFIG%%", config)) as EventFired<any>, ctx)
            .then(result => {
                assert(result.code === 0);
                done();
            });

    }).timeout(5000);

    it("correctly show pushes on included but also excluded branch", done => {
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(channelNames.length === 2);
                return Promise.resolve();
            }
        }

        const ctx: HandlerContext = {
            teamId: "T095SFFBK",
            correlationId: "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9",
            invocationId: guid(),
            graphClient: null,
            messageClient: new MockMessageClient(),
        };
        const handler = new PushToPushLifecycle();
        const config = `\\"include\\":\\"^m.*r$\\", \\"exclude\\":\\"^m.*r$\\"`;

        handler.handle(JSON.parse(payload.replace("%%CONFIG%%", config)) as EventFired<any>, ctx)
            .then(result => {
                assert(result.code === 0);
                done();
            });

    }).timeout(5000);

    it("correctly filter pushes that aren't included", done => {
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(channelNames.length === 1);
                assert(channelNames[0] === "some-channel2");
                return Promise.resolve();
            }
        }

        const ctx: HandlerContext = {
            teamId: "T095SFFBK",
            correlationId: "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9",
            invocationId: guid(),
            graphClient: null,
            messageClient: new MockMessageClient(),
        };
        const handler = new PushToPushLifecycle();
        const config = `\\"include\\":\\"^feat-.*$\\"`;

        handler.handle(JSON.parse(payload.replace("%%CONFIG%%", config)) as EventFired<any>, ctx)
            .then(result => {
                assert(result.code === 0);
                done();
            });

    }).timeout(5000);

});

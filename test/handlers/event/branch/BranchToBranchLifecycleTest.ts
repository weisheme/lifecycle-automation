import { EventFired } from "@atomist/automation-client/HandleEvent";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import { guid } from "@atomist/automation-client/internal/util/string";
import { MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { MessageClientSupport } from "@atomist/automation-client/spi/message/MessageClientSupport";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import "mocha";
import * as assert from "power-assert";
import { BranchToBranchLifecycle } from "../../../../src/handlers/event/branch/BranchToBranchLifecycle";
import { PushToPushLifecycle } from "../../../../src/handlers/event/push/PushToPushLifecycle";

describe("BranchToBranchLifecycle", () => {

    /* tslint:disable */
    const payload = `{
    "data": {
        "Branch": [{
            "name": "master",
            "deleted": false,
            "repo": {
                "name": "ddmvc1",
                "owner": "atomisthqa",
                "defaultBranch": "master",
                "channels": [{
                    "name": "ddmvc1"
                }],
                "org": {
                    "chatTeam": {
                        "preferences": [{
                            "name": "lifecycle_actions",
                            "value": "{\\"handlers\\":{\\"push\\":{\\"restart_build\\":true,\\"tag\\":true,\\"raise_pullrequest\\":true},\\"issue\\":{\\"assign\\":true}}}"
                        }, {
                            "name": "graphs",
                            "value": "rock"
                        }, {
                            "name": "lifecycle_preferences",
                            "value": "{\\"push\\":{\\"configuration\\":{\\"emoji-style\\":\\"atomist\\",\\"show-statuses-on-push\\":true,\\"build\\":{\\"style\\":\\"decorator\\"},\\"fingerprints\\":{\\"about-hint\\":false,\\"render-unchanged\\":true,\\"style\\":\\"fingerprint-inline\\"}}}}"
                        }, {
                            "name": "test",
                            "value": "true"
                        }, {
                            "name": "lifecycle_renderers",
                            "value": "{\\"handlers\\":{\\"push\\":{\\"workflow\\":false}}}"
                        }, {
                            "name": "lifecycles",
                            "value": "{\\"handlers\\":{\\"push\\":true,\\"review\\":true,\\"issue\\":true,\\"branch\\":true}}"
                        }, {
                            "name": "disable_bot_owner_on_github_activity_notification",
                            "value": "true"
                        }]
                    },
                    "provider": {}
                }
            },
            "timestamp": "2017-11-28T12:26:08.008Z"
        }]
    },
    "extensions": {
        "type": "READ_ONLY",
        "operationName": "BranchToBranchLifecycle",
        "team_id": "T1L0VDKJP",
        "team_name": "atomista",
        "correlation_id": "2efa55de-f3d1-40ce-908f-857debbc40d3"
    },
    "secrets": [{
        "name": "github://org_token",
        "value": "5**************************************7"
    }]
}`;
    /* tslint:enable */

    it("don't display a branch created message for default or master branch", done => {
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(channelNames[0] === "ddmvc1");
                assert(options.id === "branch_lifecycle/atomisthqa/ddmvc1/master/false");
                const sm = msg as SlackMessage;
                assert(sm.text === null);
                assert(sm.attachments.length === 0);
                return Promise.resolve();
            }
        }

        const ctx: any = {
            messageClient: new MockMessageClient(),
        };
        const handler = new BranchToBranchLifecycle();

        handler.handle(JSON.parse(payload) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(result.code === 0);
            })
            .then(done, done);

    });

    /* tslint:disable */
    const payload1 = `{
    "data": {
        "Branch": [{
            "name": "some-feature",
            "deleted": false,
            "repo": {
                "name": "ddmvc1",
                "owner": "atomisthqa",
                "defaultBranch": "master",
                "channels": [{
                    "name": "ddmvc1"
                }],
                "org": {
                    "chatTeam": {
                        "preferences": [{
                            "name": "lifecycle_actions",
                            "value": "{\\"handlers\\":{\\"push\\":{\\"restart_build\\":true,\\"tag\\":true,\\"raise_pullrequest\\":true},\\"issue\\":{\\"assign\\":true}}}"
                        }, {
                            "name": "graphs",
                            "value": "rock"
                        }, {
                            "name": "lifecycle_preferences",
                            "value": "{\\"push\\":{\\"configuration\\":{\\"emoji-style\\":\\"atomist\\",\\"show-statuses-on-push\\":true,\\"build\\":{\\"style\\":\\"decorator\\"},\\"fingerprints\\":{\\"about-hint\\":false,\\"render-unchanged\\":true,\\"style\\":\\"fingerprint-inline\\"}}}}"
                        }, {
                            "name": "test",
                            "value": "true"
                        }, {
                            "name": "lifecycle_renderers",
                            "value": "{\\"handlers\\":{\\"push\\":{\\"workflow\\":false}}}"
                        }, {
                            "name": "lifecycles",
                            "value": "{\\"handlers\\":{\\"push\\":true,\\"review\\":true,\\"issue\\":true,\\"branch\\":true}}"
                        }, {
                            "name": "disable_bot_owner_on_github_activity_notification",
                            "value": "true"
                        }]
                    },
                    "provider": {}
                }
            },
            "timestamp": "2017-11-28T12:26:08.008Z"
        }]
    },
    "extensions": {
        "type": "READ_ONLY",
        "operationName": "BranchToBranchLifecycle",
        "team_id": "T1L0VDKJP",
        "team_name": "atomista",
        "correlation_id": "2efa55de-f3d1-40ce-908f-857debbc40d3"
    },
    "secrets": [{
        "name": "github://org_token",
        "value": "5**************************************7"
    }]
}`;
    /* tslint:enable */

    it("display a branch created message for branch", done => {
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(channelNames[0] === "ddmvc1");
                assert(options.id === "branch_lifecycle/atomisthqa/ddmvc1/some-feature/false");

                const sm = msg as SlackMessage;
                assert(sm.attachments.length === 1);
                assert(sm.attachments[0].text.indexOf("created"));
                return Promise.resolve();
            }
        }

        const ctx: any = {
            invocationId: guid(),
            messageClient: new MockMessageClient(),
        };
        const handler = new BranchToBranchLifecycle();

        handler.handle(JSON.parse(payload1) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(result.code === 0);
            })
            .then(done, done);

    });

    /* tslint:disable */
    const payload2 = `{
    "data": {
        "Branch": [{
            "name": "some-feature",
            "deleted": true,
            "repo": {
                "name": "ddmvc1",
                "owner": "atomisthqa",
                "defaultBranch": "master",
                "channels": [{
                    "name": "ddmvc1"
                }],
                "org": {
                    "chatTeam": {
                        "preferences": [{
                            "name": "lifecycle_actions",
                            "value": "{\\"handlers\\":{\\"push\\":{\\"restart_build\\":true,\\"tag\\":true,\\"raise_pullrequest\\":true},\\"issue\\":{\\"assign\\":true}}}"
                        }, {
                            "name": "graphs",
                            "value": "rock"
                        }, {
                            "name": "lifecycle_preferences",
                            "value": "{\\"push\\":{\\"configuration\\":{\\"emoji-style\\":\\"atomist\\",\\"show-statuses-on-push\\":true,\\"build\\":{\\"style\\":\\"decorator\\"},\\"fingerprints\\":{\\"about-hint\\":false,\\"render-unchanged\\":true,\\"style\\":\\"fingerprint-inline\\"}}}}"
                        }, {
                            "name": "test",
                            "value": "true"
                        }, {
                            "name": "lifecycle_renderers",
                            "value": "{\\"handlers\\":{\\"push\\":{\\"workflow\\":false}}}"
                        }, {
                            "name": "lifecycles",
                            "value": "{\\"handlers\\":{\\"push\\":true,\\"review\\":true,\\"issue\\":true,\\"branch\\":true}}"
                        }, {
                            "name": "disable_bot_owner_on_github_activity_notification",
                            "value": "true"
                        }]
                    },
                    "provider": {}
                }
            },
            "timestamp": "2017-11-28T12:26:08.008Z"
        }]
    },
    "extensions": {
        "type": "READ_ONLY",
        "operationName": "BranchToBranchLifecycle",
        "team_id": "T1L0VDKJP",
        "team_name": "atomista",
        "correlation_id": "2efa55de-f3d1-40ce-908f-857debbc40d3"
    },
    "secrets": [{
        "name": "github://org_token",
        "value": "5**************************************7"
    }]
}`;
    /* tslint:enable */

    it("display a branch deleted message for branch", done => {
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(channelNames[0] === "ddmvc1");
                assert(options.id === "branch_lifecycle/atomisthqa/ddmvc1/some-feature/true");

                const sm = msg as SlackMessage;
                assert(sm.attachments.length === 1);
                assert(sm.attachments[0].text.indexOf("deleted"));
                return Promise.resolve();
            }
        }

        const ctx: any = {
            invocationId: guid(),
            messageClient: new MockMessageClient(),
        };
        const handler = new BranchToBranchLifecycle();

        handler.handle(JSON.parse(payload2) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(result.code === 0);
            })
            .then(done, done);

    });

});

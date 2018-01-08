import "mocha";
import assert = require("power-assert");

import { MessageOptions, SlackDestination } from "@atomist/automation-client/spi/message/MessageClient";
import { Destination } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import { GitHubWebhookCreated } from "../../../../src/handlers/event/webhook/GitHubWebhookCreated";

describe("GitHubWebhookCreated", () => {

    const handler = new GitHubWebhookCreated();

    it("should generate a message with buttons if there are matching channels", done => {
        const event = {
            data: {
                GitHubOrgWebhook: [{
                    org: {
                        team: {
                            chatTeams: [{
                                members: [
                                    {
                                        isOwner: "true",
                                        screenName: "cd",
                                    },
                                ],
                                channels: [
                                    {
                                        name: "dev",
                                        channelId: "C7UR196MB",
                                    },
                                    {
                                        name: "build-automations",
                                        channelId: "C7TT99Y10",
                                    },
                                    {
                                        name: "engineering",
                                        channelId: "D18G4L88J",
                                    },
                                ],
                            }],
                        },
                    },
                }],
            },
            extensions: {
                operationName: "GitHubWebhookCreated",
            },
        };

        let messageSend = false;
        const ctx: any = {
            messageClient: {
                send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                    assert((destinations as SlackDestination).users[0] === "cd");
                    const sm = msg as SlackMessage;
                    assert(sm.attachments[0].actions.length === 2);
                    assert(sm.attachments[0].actions[0].text === "#dev");
                    assert((sm.attachments[0].actions[0] as any).command.parameters.channelId === "C7UR196MB");

                    assert(sm.attachments[0].actions[1].text === "#engineering");
                    assert((sm.attachments[0].actions[1] as any).command.parameters.channelId === "D18G4L88J");
                    messageSend = true;
                    return Promise.resolve();
                },
            },
        };

        handler.handle(event, ctx)
            .then(result => {
                assert(result.code === 0);
                assert(messageSend);
            })
            .then(done, done);
    });

    it("should generate a message if there are no channels", done => {
        const event = {
            data: {
                GitHubOrgWebhook: [{
                    org: {
                        team: {
                            chatTeams: [{
                                members: [
                                    {
                                        isOwner: "true",
                                        screenName: "cd",
                                    },
                                ],
                                channels: [
                                    {
                                        name: "general",
                                        channelId: "C7UR196MB",
                                    },
                                    {
                                        name: "build-automations",
                                        channelId: "C7TT99Y10",
                                    },
                                    {
                                        name: "random",
                                        channelId: "D18G4L88J",
                                    },
                                ],
                            }],
                        },
                    },
                }],
            },
            extensions: {
                operationName: "GitHubWebhookCreated",
            },
        };

        let messageSend = false;
        const ctx: any = {
            messageClient: {
                send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                    assert((destinations as SlackDestination).users[0] === "cd");
                    const sm = msg as SlackMessage;
                    assert(!sm.attachments[0].actions);
                    messageSend = true;
                    return Promise.resolve();
                },
            },
        };

        handler.handle(event, ctx)
            .then(result => {
                assert(result.code === 0);
                assert(messageSend);
            })
            .then(done, done);
    });

    it("should generate a message if there are null channels", done => {
        const event = {
            data: {
                GitHubOrgWebhook: [{
                    org: {
                        team: {
                            chatTeams: [{
                                members: [
                                    {
                                        isOwner: "true",
                                        screenName: "cd",
                                    },
                                ],
                                channels: null,
                            }],
                        },
                    },
                }],
            },
            extensions: {
                operationName: "GitHubWebhookCreated",
            },
        };

        let messageSend = false;
        const ctx: any = {
            messageClient: {
                send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                    assert((destinations as SlackDestination).users[0] === "cd");
                    const sm = msg as SlackMessage;
                    assert(!sm.attachments[0].actions);
                    messageSend = true;
                    return Promise.resolve();
                },
            },
        };

        handler.handle(event, ctx)
            .then(result => {
                assert(result.code === 0);
                assert(messageSend);
            })
            .then(done, done);
    });

    it("should generate a message if channels is undefined", done => {
        const event = {
            data: {
                GitHubOrgWebhook: [{
                    org: {
                        team: {
                            chatTeams: [{
                                members: [
                                    {
                                        isOwner: "true",
                                        screenName: "cd",
                                    },
                                ],
                                channels: undefined,
                            }],
                        },
                    },
                }],
            },
            extensions: {
                operationName: "GitHubWebhookCreated",
            },
        };

        let messageSend = false;
        const ctx: any = {
            messageClient: {
                send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                    assert((destinations as SlackDestination).users[0] === "cd");
                    const sm = msg as SlackMessage;
                    assert(!sm.attachments[0].actions);
                    messageSend = true;
                    return Promise.resolve();
                },
            },
        };

        handler.handle(event, ctx)
            .then(result => {
                assert(result.code === 0);
                assert(messageSend);
            })
            .then(done, done);
    });
});

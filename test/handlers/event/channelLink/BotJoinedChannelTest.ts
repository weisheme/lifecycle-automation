import "mocha";
import * as assert from "power-assert";

import * as slack from "@atomist/slack-messages/SlackMessages";

import { BotJoinedChannel, repoOptions } from "../../../../src/handlers/event/channellink/BotJoinedChannel";

describe("BotJoinedChannel", () => {

    const orgs = [
        {
            owner: "jon",
            repo: [
                {
                    name: "7-mary-3",
                    owner: "jon",
                },
                {
                    name: "79-charles",
                    owner: "jon",
                },
            ],
        },
        {
            owner: "ponch",
            repo: [
                {
                    name: "7-mary-4",
                    owner: "ponch",
                },
                {
                    name: "79-mary-4",
                    owner: "ponch",
                },
            ],
        },
    ];

    describe("repoOptions", () => {

        it("should create an option group", () => {
            const e = [
                {
                    text: "jon/",
                    options: [
                        {
                            text: "7-mary-3",
                            value: "jon/7-mary-3",
                        },
                        {
                            text: "79-charles",
                            value: "jon/79-charles",
                        },
                    ],
                },
                {
                    text: "ponch/",
                    options: [
                        {
                            text: "7-mary-4",
                            value: "ponch/7-mary-4",
                        },
                        {
                            text: "79-mary-4",
                            value: "ponch/79-mary-4",
                        },
                    ],
                },
            ];
            assert.deepEqual(repoOptions(orgs), e);
        });

    });

    describe("handle", () => {

        const event = {
            data: {
                UserJoinedChannel: [{
                    user: {
                        isAtomistBot: "true",
                        screenName: "atomist_bot",
                        userId: "U1234567",
                    },
                    channel: {
                        botInvitedSelf: false,
                        channelId: "CHP87654P",
                        name: "ponch",
                        repos: [
                            {
                                name: "n",
                                owner: "n",
                                org: {
                                    provider: {
                                        url: "https://ghe.chp.gov/",
                                    },
                                },
                            },
                        ],
                        team: {
                            orgs: [
                                {
                                    owner: "n",
                                    provider: {
                                        apiUrl: "https://ghe.chp.gov/v3/",
                                    },
                                    repo: [
                                        {
                                            name: "n",
                                            owner: "n",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                }],
            },
            extensions: {
                type: "READ_ONLY",
                operationName: "BotJoinedChannel",
            },
        };

        it("should send a message", done => {
            let sent = false;
            const ctx: any = {
                messageClient: {
                    addressChannels(
                        msg: string | slack.SlackMessage,
                        channelNames: string | string[],
                        options?: any,
                    ): Promise<any> {
                        sent = true;
                        return Promise.resolve(true);
                    },
                },
            };
            const h = new BotJoinedChannel();
            h.handle(event, ctx)
                .then(() => {
                    assert(sent);
                })
                .then(done, done);
        });

    });

});

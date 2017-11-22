import "mocha";
import assert = require("power-assert");
import * as graphql from "../../../../src/typings/types";

import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import { ChannelLinkCreated } from "../../../../src/handlers/event/channellink/ChannelLinkCreated";

describe("ChannelLinkCreated", () => {

    const handler = new ChannelLinkCreated();
    handler.orgToken = "some broken token";

    it("should generate a message", done => {
        const event = {
            data: {
                ChannelLink: [{
                    channel: {
                        name: "automation-clj",
                        normalizedName: "automation-clj",
                    },
                    repo: {
                        name: "automation-clj",
                        owner: "atomisthq",
                        org: {
                            ownerType: "organization" as graphql.OwnerType,
                            provider: null,
                        },
                    },
                }],
            },
            extensions: {
                operationName: "ChannelLinkCreated",
            },
        };

        let messageSend = false;
        const ctx: any = {
            messageClient: {
                addressChannels(msg: string | SlackMessage, channelNames: string | string[]): Promise<any> {
                    assert(channelNames === "automation-clj");
                    const sm = msg as SlackMessage;
                    assert(sm.attachments[0].text.indexOf("atomisthq/automation-clj") >= 0);
                    assert(sm.attachments[0].actions.length === 2);
                    messageSend = true;
                    return Promise.resolve();
                },
            },
        };

        handler.handle(event, ctx)
            .then(result => {
                assert(result.code === 0);
                assert(messageSend);
                done();
            });
    });

});

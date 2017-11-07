import "mocha";
import * as assert from "power-assert";

import { DefaultBotName } from "../../../../src/handlers/command/slack/LinkRepo";
import {
    extractScreenNameFromMapRepoMessageId,
    leaveRepoUnmapped,
    mapRepoMessage,
    mapRepoMessageId,
    repoString,
} from "../../../../src/handlers/event/push/PushToUnmappedRepo";

describe("PushToUnmappedRepo", () => {

    describe("leaveRepoUnmapped", () => {

        const name = "james";
        const owner = "brown";
        const repo = { name, owner };

        it("should handle no preferences", () => {
            assert(leaveRepoUnmapped(repo, {}) === false);
        });

        it("should find the silenced repo", () => {
            const chatId = {
                preferences: [{
                    name: "repo_mapping_flow",
                    value: JSON.stringify({ disabled_repos: [`${owner}:${name}`] }),
                }],
            };
            assert(leaveRepoUnmapped(repo, chatId) === true);
        });

        it("should not find the unmapped repo", () => {
            const chatId = {
                preferences: [{
                    name: "repo_mapping_flow",
                    value: JSON.stringify({ disabled_repos: ["igot:you", "get:up"] }),
                }],
            };
            assert(leaveRepoUnmapped(repo, chatId) === false);
        });

        it("should find the repo among several", () => {
            const chatId = {
                preferences: [{
                    name: "repo_mapping_flow",
                    value: JSON.stringify({ disabled_repos: ["igot:you", `${owner}:${name}`, "get:up"] }),
                }],
            };
            assert(leaveRepoUnmapped(repo, chatId) === true);
        });

    });

    describe("repoString", () => {

        it("should return a slug", () => {
            const repo = { name: "first-person", owner: "gord-downie" };
            assert(repoString(repo) === "gord-downie:first-person");
        });

        it("should return a provider", () => {
            const repo = {
                name: "first-person",
                owner: "gord-downie",
                org: {
                    provider: {
                        providerId: "Introduce_Yerself",
                    },
                },
            };
            assert(repoString(repo) === "Introduce_Yerself:gord-downie:first-person");
        });

        it("should return something that matches nothing", () => {
            assert(repoString(undefined).indexOf(":") < 0);
        });

    });

    describe("mapRepoMessageId", () => {
        const owner = "alicia-keys";
        const repo = "girl-on-fire";
        const screenName = "augello";

        it("should provide a message ID with repo and screen name", () => {
            const id = mapRepoMessageId(owner, repo, screenName);
            assert(id.includes(owner));
            assert(id.includes(repo));
            assert(id.includes(screenName));
        });

        it("should return a message ID from which we can get a screen name", () => {
            assert(extractScreenNameFromMapRepoMessageId(mapRepoMessageId(owner, repo, screenName)) === screenName);
        });

    });

    describe("mapRepoMessage", () => {

        it("should send a message offering to create channel and link a repo to it", () => {
            const repo = {
                name: "sin-city",
                owner: "grievous-angel",
                channels: [],
                org: {
                    chatTeam: {
                        channels: [
                            {
                                channelId: "C1000WED",
                                name: "1000-wedding",
                            },
                        ],
                    },
                },
            };
            const chatId = {
                screenName: "gram",
                preferences: [{
                    name: "repo_mapping_flow",
                    value: JSON.stringify({}),
                }],
            };
            const repoLink = "<https://github.com/grievous-angel/sin-city|grievous-angel/sin-city>";
            const channelText = "*#sin-city*";
            const msg = mapRepoMessage(repo, chatId, DefaultBotName);
            assert(msg.attachments.length === 3);
            const linkMsg = msg.attachments[0];
            const hintMsg = msg.attachments[1];
            const stopMsg = msg.attachments[2];
            assert(linkMsg.pretext.indexOf(repoLink) > 0);
            assert(linkMsg.pretext.indexOf(channelText) > 0);
            assert(linkMsg.actions.length === 1);
            assert(linkMsg.actions[0].text === "Go ahead");
            assert(linkMsg.actions[0].type === "button");
            const command = (linkMsg.actions[0] as any).command;
            assert(command.name === "CreateChannel");
            assert(command.parameters.apiUrl === undefined);
            assert(command.parameters.channel === "sin-city");
            assert(command.parameters.owner === "grievous-angel");
            assert(command.parameters.repo === "sin-city");
            const hintFallBack = `or '/invite @atomist' me to a relevant channel and type
'@atomist repo owner=grievous-angel name=sin-city'`;
            assert(hintMsg.fallback === hintFallBack);
            const stopText = "stop receiving similar suggestions for all repositories";
            assert(stopMsg.text.includes(stopText));
            assert(stopMsg.fallback.includes(stopText));
            assert(stopMsg.actions.length === 1);
            assert(stopMsg.actions[0].text === "All Repositories");
            assert(stopMsg.actions[0].type === "button");
            const allStopCmd = (stopMsg.actions[0] as any).command;
            assert(allStopCmd.name === "SetUserPreference");
            assert(allStopCmd.parameters.key === "dm");
            assert(allStopCmd.parameters.name === "disable_for_mapRepo");
            assert(allStopCmd.parameters.value === "true");
        });

        it("should send a message offering to link a repo to existing channel", () => {
            const repo = {
                name: "sin-city",
                owner: "grievous-angel",
                channels: [],
                org: {
                    provider: {
                        providerId: "sierra_records",
                        apiUrl: "https://ghe.gram-parsons.com/v3/",
                        url: "https://ghe.gram-parsons.com/",
                    },
                    chatTeam: {
                        channels: [
                            {
                                channelId: "C1000WED",
                                name: "1000-wedding",
                            },
                            {
                                channelId: "C51NC1TY",
                                name: "sin-city",
                            },
                        ],
                    },
                },
            };
            const chatId = {
                screenName: "gram",
                preferences: [{
                    name: "repo_mapping_flow",
                    value: JSON.stringify({
                        disabled_repos: [
                            "sierra_records:grievous-angel:a-song-for-you",
                            "sierra_records:grievous-angel:in-my-hour-of-darkness",
                            "sierra_records:grievous-angel:return-of-the-grievous-angel",
                        ],
                    }),
                }],
            };
            const repoLink = "<https://ghe.gram-parsons.com/grievous-angel/sin-city|grievous-angel/sin-city>";
            const channelText = "<#C51NC1TY>";
            const bot = "hillman";
            const msg = mapRepoMessage(repo, chatId, bot);
            assert(msg.attachments.length === 3);
            const linkMsg = msg.attachments[0];
            const hintMsg = msg.attachments[1];
            const stopMsg = msg.attachments[2];
            assert(linkMsg.pretext.indexOf(repoLink) > 0);
            assert(linkMsg.pretext.indexOf(channelText) > 0);
            assert(linkMsg.actions.length === 1);
            assert(linkMsg.actions[0].text === "Go ahead");
            assert(linkMsg.actions[0].type === "button");
            const command = (linkMsg.actions[0] as any).command;
            assert(command.name === "AssociateRepo");
            assert(command.parameters.apiUrl === "https://ghe.gram-parsons.com/v3/");
            assert(command.parameters.channelId === "C51NC1TY");
            assert(command.parameters.owner === "grievous-angel");
            assert(command.parameters.repo === "sin-city");
            const hintFallBack = `or '/invite @${bot}' me to a relevant channel and type
'@${bot} repo owner=grievous-angel name=sin-city'`;
            assert(hintMsg.fallback === hintFallBack);
            const stopText = "stop receiving similar suggestions for all repositories";
            assert(stopMsg.text.includes(stopText));
            assert(stopMsg.fallback.includes(stopText));
            assert(stopMsg.actions.length === 1);
            assert(stopMsg.actions[0].text === "All Repositories");
            assert(stopMsg.actions[0].type === "button");
            const allStopCmd = (stopMsg.actions[0] as any).command;
            assert(allStopCmd.name === "SetUserPreference");
            assert(allStopCmd.parameters.key === "dm");
            assert(allStopCmd.parameters.name === "disable_for_mapRepo");
            assert(allStopCmd.parameters.value === "true");
        });

    });

});

import "mocha";
import * as assert from "power-assert";

import { leaveRepoUnmapped } from "../../../../src/handlers/event/push/PushToUnmappedRepo";

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
                    value: JSON.stringify({ disabled_repos: [`${owner}/${name}`] }),
                }],
            };
            assert(leaveRepoUnmapped(repo, chatId) === true);
        });

        it("should not find the unmapped repo", () => {
            const chatId = {
                preferences: [{
                    name: "repo_mapping_flow",
                    value: JSON.stringify({ disabled_repos: ["igot/you", "get/up"] }),
                }],
            };
            assert(leaveRepoUnmapped(repo, chatId) === false);
        });

        it("should find the repo among several", () => {
            const chatId = {
                preferences: [{
                    name: "repo_mapping_flow",
                    value: JSON.stringify({ disabled_repos: ["igot/you", `${owner}/${name}`, "get/up"] }),
                }],
            };
            assert(leaveRepoUnmapped(repo, chatId) === true);
        });

    });
});

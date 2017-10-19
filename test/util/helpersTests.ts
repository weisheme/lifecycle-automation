import "mocha";
import * as assert from "power-assert";

import { LoggingConfig } from "@atomist/automation-client/internal/util/logger";

import { isDmDisabled } from "../../src/util/helpers";

LoggingConfig.format = "cli";

describe("helpers", () => {

    it("test if DMs are enabled", () => {
        const chatId = {
            preferences: [ {
                name: "repo_mapping_flow",
                value: "{\"disable_for_all\":true,\"disabled_repos\":[],\"disabled_for_unmapped_user\":false}",
            }, {
                name: "dm",
                value: "{\"disable_for_all\":false}",
            },
            ],
        };
        assert(isDmDisabled(chatId) === false);

      });

    it("test if DMs are disabled", () => {
        const chatId = {
            preferences: [ {
                name: "repo_mapping_flow",
                value: "{\"disable_for_all\":true,\"disabled_repos\":[],\"disabled_for_unmapped_user\":false}",
            }, {
                name: "dm",
                value: "{\"disable_for_all\":true}",
            },
            ],
        };
        assert(isDmDisabled(chatId) === true);

    });

    it("test if DMs for builds are disabled", () => {
        const chatId = {
            preferences: [ {
                name: "repo_mapping_flow",
                value: "{\"disable_for_all\":true,\"disabled_repos\":[],\"disabled_for_unmapped_user\":false}",
            }, {
                name: "dm",
                value: "{\"disable_for_all\":false, \"disable_for_build\":true}",
            },
            ],
        };
        assert(isDmDisabled(chatId, "build") === true);
    });

    it("test if DMs are disabled when overridden", () => {
        const chatId = {
            preferences: [ {
                name: "repo_mapping_flow",
                value: "{\"disable_for_all\":true,\"disabled_repos\":[],\"disabled_for_unmapped_user\":false}",
            }, {
                name: "dm",
                value: "{\"disable_for_all\":true, \"disable_for_build\":false}",
            },
            ],
        };
        assert(isDmDisabled(chatId, "build") === true);

    });
});

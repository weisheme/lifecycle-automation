import "mocha";
import * as assert from "power-assert";

import { LinkRepo } from "../../../../src/handlers/command/slack/LinkRepo";

describe("LinkRepo", () => {

    describe("linkRepoCommand", () => {

        const r = "sams-town";
        const o = "the-killers";
        const b = "when-you_were-young";

        it("should respond with defaults", () => {
            assert(LinkRepo.linkRepoCommand() === `@atomist repo owner=OWNER name=REPO`);
        });

        it("should respond with bot", () => {
            assert(LinkRepo.linkRepoCommand(b) === `@${b} repo owner=OWNER name=REPO`);
        });

        it("should respond with repo and owner", () => {
            assert(LinkRepo.linkRepoCommand(b, o) === `@${b} repo owner=${o} name=REPO`);
        });

        it("should respond with repo, owner, and bot", () => {
            assert(LinkRepo.linkRepoCommand(b, o, r) === `@${b} repo owner=${o} name=${r}`);
        });

    });

});

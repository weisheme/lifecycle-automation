import "mocha";
import * as assert from "power-assert";

import { Success } from "@atomist/automation-client";

import { AutoMergeOnStatus } from "../../../../src/handlers/event/pullrequest/AutoMergeOnStatus";

describe("AutoMergeOnStatus", () => {

    describe("handle", () => {

        it("should handle no pull requests", done => {
            const event = {
                data: { Status: [{ commit: {} }] },
                extensions: { operationName: "nothing" },
            };
            const amos = new AutoMergeOnStatus();
            amos.handle(event, {} as any)
                .then(result => {
                    assert(result === Success);
                })
                .then(done, done);
        });

    });

});

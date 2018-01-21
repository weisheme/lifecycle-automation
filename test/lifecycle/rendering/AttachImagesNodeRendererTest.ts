import { SlackMessage } from "@atomist/slack-messages";
import "mocha";
import * as assert from "power-assert";
import { AttachImagesNodeRenderer } from "../../../src/lifecycle/rendering/AttachImagesNodeRenderer";

describe("AttachImagesNodeRenderer", () => {

    it("correctly attach 1 image", done => {

        const renderer = new AttachImagesNodeRenderer();
        const node = {
            body: "This is some basic embedded image https://image.com/folder/test.png within some text",
        };
        const msg: SlackMessage = {
            attachments: [],
        };

        renderer.render(node, [], msg, null)
            .then(rm => {
                assert(rm.attachments.length === 1);
                assert(rm.attachments[0].text === "test.png");
                assert(rm.attachments[0].image_url === "https://image.com/folder/test.png");
            })
            .then(() => done(), done);
    });

    it("correctly attach multiple images", done => {

        const renderer = new AttachImagesNodeRenderer();
        const node = {
            body: "This is some basic embedded image" +
            " https://image.com/folder/test1.png within http://image.de/test2.png some text",
        };

        const msg: SlackMessage = {
            attachments: [],
        };

        renderer.render(node, [], msg, null)
            .then(rm => {
                assert(rm.attachments.length === 2);
                assert(rm.attachments[0].text === "test1.png");
                assert(rm.attachments[0].image_url === "https://image.com/folder/test1.png");
                assert(rm.attachments[1].text === "test2.png");
                assert(rm.attachments[1].image_url === "http://image.de/test2.png");
            })
            .then(() => done(), done);
    });

    it("correctly attach multiple images embedded in markdown", done => {

        const renderer = new AttachImagesNodeRenderer();
        const node = {
            body: "This is some basic embedded image " +
            "<https://image.com/folder/test1.png|test1> within <http://image.de/test2.png|test2> some text",
        };

        const msg: SlackMessage = {
            attachments: [],
        };

        renderer.render(node, [], msg, null)
            .then(rm => {
                assert(rm.attachments.length === 2);
                assert(rm.attachments[0].text === "test1.png");
                assert(rm.attachments[0].image_url === "https://image.com/folder/test1.png");
                assert(rm.attachments[1].text === "test2.png");
                assert(rm.attachments[1].image_url === "http://image.de/test2.png");
            })
            .then(() => done(), done);
    });

    it("correctly attach multiple images embedded in html", done => {

        const renderer = new AttachImagesNodeRenderer();
        const node = {
            body: "This is some basic embedded image " +
            "<img src='https://image.com/folder/test1.png'>test1</img> " +
            "within <img src='http://image.de/test2.png'>test2</img> some text",
        };

        const msg: SlackMessage = {
            attachments: [],
        };

        renderer.render(node, [], msg, null)
            .then(rm => {
                assert(rm.attachments.length === 2);
                assert(rm.attachments[0].text === "test1.png");
                assert(rm.attachments[0].image_url === "https://image.com/folder/test1.png");
                assert(rm.attachments[1].text === "test2.png");
                assert(rm.attachments[1].image_url === "http://image.de/test2.png");
            })
            .then(() => done(), done);
    });

});

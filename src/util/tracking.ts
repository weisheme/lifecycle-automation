import * as namespace from "@atomist/automation-client/internal/util/cls";
import { isSlackMessage } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import * as shortId from "shortid";
import { CardMessage, isCardMessage } from "../lifecycle/card";
import { encode } from "./base64";
import { secret } from "./secrets";

/**
 * Wraps all links inside the given SlackMessage with Mixpanel tracking links
 * @param message
 * @param event
 * @param teamId
 * @param messageId
 * @returns {SlackMessage}
 */
export function wrapLinks(message: SlackMessage | CardMessage, event: string):
    [SlackMessage | CardMessage, Array<[string, string]>] {

    const clonedMessage = _.cloneDeep(message);
    const hashToUrl: Array<[string, string]> = [];

    if (isCardMessage(clonedMessage)) {
        clonedMessage.title.text = wrapLinksInText(clonedMessage.title.text, `${event}/title/text`, hashToUrl);
        clonedMessage.body.text = wrapLinksInText(clonedMessage.body.text, `${event}/body/text`, hashToUrl);
        if (clonedMessage.correlations) {
            clonedMessage.correlations.forEach(c => {
                c.title = wrapLinksInText(c.title, `${event}/correlations/title`, hashToUrl);
                if (c.body) {
                    c.body.forEach(b => {
                        b.text = wrapLinksInText(b.text, `${event}/correlations/body/text`, hashToUrl);
                    });
                }
                c.link = trackableAndShortenedLink(c.link, `${event}/correlations/link`, hashToUrl);
            });
        }
        if (clonedMessage.events) {
            clonedMessage.events.forEach(e => {
                e.text = wrapLinksInText(e.text, `${event}/events/text`, hashToUrl);
            });
        }
    } else if (isSlackMessage(clonedMessage)) {
        clonedMessage.text = wrapLinksInText(clonedMessage.text, `${event}/text`, hashToUrl);
        if (clonedMessage.attachments) {
            clonedMessage.attachments.forEach(a => {
                a.author_link = trackableAndShortenedLink(a.author_link, `${event}/attachment/author_link`, hashToUrl);
                a.title_link = trackableAndShortenedLink(a.title_link, `${event}/attachment/title_link`, hashToUrl);

                a.footer = wrapLinksInText(a.footer, `${event}/attachment/footer`, hashToUrl);
                a.title = wrapLinksInText(a.title, `${event}/attachment/title`, hashToUrl);
                a.text = wrapLinksInText(a.text, `${event}/attachment/text`, hashToUrl);
                a.pretext = wrapLinksInText(a.pretext, `${event}/attachment/pretext`, hashToUrl);
                a.fallback = wrapLinksInText(a.fallback, `${event}/attachment/fallback`, hashToUrl);
            });
        }
    }
    return [clonedMessage, hashToUrl];
}

/**
 * Put event information in JSON structure and base64 encode the
 * stringified result.
 * @param url link URL
 * @param event name of event triggering this message
 * @return base 64 encoded stringified version of JSON payload
 */
export function encodePayload(url: string, event: string): string {
    const token = secret("mixpanel.token");
    const payload = {
        event,
        properties: {
            distinct_id: namespace.get().teamId,
            token,
            messageid: namespace.get().invocationId,
            teamid: namespace.get().teamId,
            url,
            archive: `${namespace.get().name}@${namespace.get().version}`,
            name: namespace.get().operation,
            version: namespace.get().version,
        },
    };
    return encode(JSON.stringify(payload));
}

/**
 * Wraps a given url in a Mixpanel tracking url
 * @param url
 * @param event
 * @param teamId
 * @param messageId
 * @returns {string}
 */
export function trackableAndShortenedLink(url: string, event: string, hashToUrl: Array<[string, string]>): string {
    if (!url) {
        return url;
    }

    if (secret("mixpanel.token")) {
        const data = encodePayload(url, event);
        const encodedUrl = encodeURIComponent(url);
        url = `https://api.mixpanel.com/track/?data=${data}&ip=1&redirect=${encodedUrl}`;
    }

    const [hash, shortUrl] = generateHash();
    hashToUrl.push([hash, url]);

    return shortUrl;
}

export function wrapLinksInText(text: string, event: string, hashToUrl: Array<[string, string]>):
    string {

    if (!text) {
        return text;
    }
    const regex = /<(https?:\/\/\S+?)(\|.+?)?>/g;
    return text.replace(regex, (m, u, n) => {
        const name = (n) ? n : `|${u}`;
        const tracker = trackableAndShortenedLink(u, event, hashToUrl);
        return `<${tracker}${name}>`;
    });
}

function generateHash(): [string, string] {
    const hash = shortId.generate();
    return [hash, `https://r.atomist.com/${hash}`];
}

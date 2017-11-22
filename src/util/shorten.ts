import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import * as namespace from "@atomist/automation-client/internal/util/cls";
import { logger } from "@atomist/automation-client/internal/util/logger";
import { guid } from "@atomist/automation-client/internal/util/string";
import { AutomationEventListenerSupport } from "@atomist/automation-client/server/AutomationEventListener";
import {
    isSlackMessage,
    MessageClient,
    MessageOptions,
} from "@atomist/automation-client/spi/message/MessageClient";
import { MessageClientSupport } from "@atomist/automation-client/spi/message/MessageClientSupport";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import axios from "axios";
import * as cluster from "cluster";
import { wrapLinks } from "./tracking";

function shortenUrls(slackMessage: SlackMessage, options?: MessageOptions): Promise<SlackMessage> {

    // Check if this message was already shortened
    if (isShortened(slackMessage)) {
        return Promise.resolve(slackMessage);
    }

    const nsp = namespace.get();

    if (!nsp) {
        return Promise.resolve(slackMessage);
    }

    logger.debug("Starting url shortening");
    const [wrappedSlackMessage, hashesToUrl] = wrapLinks(slackMessage, nsp.operation);

    if (hashesToUrl.length === 0) {
        logger.debug("No urls shortened");
        return Promise.resolve(wrappedSlackMessage);
    }

    const success = namespace.init().bind<Promise<SlackMessage>>(() => {
        logger.debug("Finished url shortening");
        return markShortened(wrappedSlackMessage);
    });

    const failure = namespace.init().bind<Promise<SlackMessage>>(err => {
        console.warn(`Error shortening urls: '${err.message}'`);
        return markShortened(slackMessage);
    });

    return axios.put("https://r.atomist.com/v2/shorten", {
            teamId: nsp.teamId,
            teamName: nsp.teamName,
            group: "atomist",
            artifact: nsp.name,
            version: nsp.version,
            name: nsp.operation,
            messageId: options && options.id ? options.id : guid(),
            redirects: hashesToUrl.map(([hash, url]) => ({ hash, url })),
        }, { timeout: 2000 })
        .then(() => success(), err => failure(err));
}

function markShortened(slackMessage: SlackMessage): SlackMessage {
    if (cluster.isWorker) {
        (slackMessage as any).__shortened = true;
    }
    return slackMessage;
}

function isShortened(slackMessage: SlackMessage): boolean {
    if ((slackMessage as any).__shortened === true) {
        delete (slackMessage as any).__shortened;
        return true;
    } else {
        return false;
    }
}

class ShortenUrlMessageClient extends MessageClientSupport {

    constructor(public messageClient: MessageClient) {
        super();
    }

    protected doSend(msg: string | SlackMessage, userNames: string | string[],
                     channelNames: string | string[], options?: MessageOptions): Promise<any> {
        if (isSlackMessage(msg)) {
             return shortenUrls(msg as SlackMessage, options)
                 .then(message => this.sendMessage(message, userNames, channelNames, options));
        } else {
            return this.sendMessage(msg, userNames, channelNames, options);
        }
    }

    private sendMessage(message: string | SlackMessage, userNames: string | string[],
                        channelNames: string | string[], options?: MessageOptions) {
        if (userNames && userNames.length > 0) {
            return this.messageClient.addressUsers(message, userNames, options);
        } else {
            return this.messageClient.addressChannels(message, channelNames, options);
        }
    }
}

export class ShortenUrlAutomationEventListener extends AutomationEventListenerSupport {

    public contextCreated(context: HandlerContext): void {
          context.messageClient = new ShortenUrlMessageClient(context.messageClient);
    }
}

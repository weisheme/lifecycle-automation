import {
    AutomationContextAware,
    HandlerContext,
    logger,
} from "@atomist/automation-client";
import { mapActions } from "@atomist/automation-client/internal/transport/websocket/WebSocketMessageClient";
import { toStringArray } from "@atomist/automation-client/internal/util/string";
import { AutomationEventListenerSupport } from "@atomist/automation-client/server/AutomationEventListener";
import { isSlackMessage,
    MessageClient,
    MessageOptions,
} from "@atomist/automation-client/spi/message/MessageClient";
import { MessageClientSupport } from "@atomist/automation-client/spi/message/MessageClientSupport";
import {
    render,
    SlackMessage,
} from "@atomist/slack-messages";
import axios from "axios";
import * as config from "config";
import * as _ from "lodash";

export const DashboardChannelName: string =  "atomist://dashboard";

function raiseEvent(msg: string | SlackMessage,
                    options: MessageOptions,
                    ctx: HandlerContext & AutomationContextAware): void {
    if (options.hasOwnProperty("owner") && options.hasOwnProperty("repository")) {
        const message = isSlackMessage(msg) ? render(msg as SlackMessage) : msg as string;

        // Just fire and forget this one
        axios.put(config.get("endpoints.events"), {
            team_id: ctx.teamId,
            correlation_id: ctx.correlationId,
            invocation_id: ctx.invocationId,
            message,
            type: "event",
            options,
            actions: isSlackMessage(msg) ?
                mapActions(_.cloneDeep(msg as SlackMessage), ctx.context.name, ctx.context.version) : undefined,
        })
        .catch(err => {
            logger.warn("Failed to send to dashboard stream: '%s'", err.message);
        });
    }
}

class EventRaisingMessageClient extends MessageClientSupport {

    constructor(public messageClient: MessageClient, public ctx: HandlerContext) {
        super();
    }

    protected doSend(msg: string | SlackMessage, userNames: string | string[],
                     channelNames: string | string[], options: MessageOptions = {}): Promise<any> {
        if (toStringArray(channelNames).some(c => c === DashboardChannelName)) {
             raiseEvent(msg, options, this.ctx as HandlerContext & AutomationContextAware);
        }
        return this.sendMessage(msg, userNames,
            toStringArray(channelNames).filter(c => c !== DashboardChannelName), options);
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

export class EventRaisingAutomationEventListener extends AutomationEventListenerSupport {

    public contextCreated(context: HandlerContext): void {
        context.messageClient = new EventRaisingMessageClient(context.messageClient, context);
    }
}

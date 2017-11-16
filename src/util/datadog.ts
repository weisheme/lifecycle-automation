import {
    EventFired,
    HandlerContext,
    HandlerResult,
} from "@atomist/automation-client";
import { CommandInvocation } from "@atomist/automation-client/internal/invoker/Payload";
import { RequestProcessor } from "@atomist/automation-client/internal/transport/RequestProcessor";
import * as nsp from "@atomist/automation-client/internal/util/cls";
import { AutomationEventListenerSupport } from "@atomist/automation-client/server/AutomationEventListener";
import { MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages";
import * as appRoot from "app-root-path";
import {
    ClientOptions,
    StatsD,
} from "hot-shots";

/* tslint:disable */
const pj = require(`${appRoot.path}/package.json`);
/* tslint:enable */

export class DatadogAutomationEventListener extends AutomationEventListenerSupport {

    private statsd: StatsD;

    constructor(private options: DatadogOptions) {
        super();
        this.initDatadog();
    }

    public registrationSuccessful(handler: RequestProcessor) {
        this.statsd.increment("counter.registration");
    }

    public commandSuccessful(payload: CommandInvocation, ctx: HandlerContext, result: HandlerResult) {
        this.statsd.increment("counter.operation.success", 1, 1,
            [ `atomist_operation:${payload.name}`, `atomist_operation_type:command` ]);
        this.statsd.timing("timer.operation", Date.now() - nsp.get().ts, 1,
            [ `atomist_operation:${payload.name}`, `atomist_operation_type:command` ]);
    }

    public commandFailed(payload: CommandInvocation, ctx: HandlerContext, err: any) {
        this.statsd.increment("counter.operation.failure", 1, 1,
            [ `atomist_operation:${payload.name}`, `atomist_operation_type:command` ]);
        this.statsd.timing("timer.operation", Date.now() - nsp.get().ts, 1,
            [ `atomist_operation:${payload.name}`, `atomist_operation_type:command` ]);
    }

    public eventSuccessful(payload: EventFired<any>, ctx: HandlerContext, result: HandlerResult[]) {
        this.statsd.increment("counter.operation.success", 1, 1,
            [ `atomist_operation:${payload.extensions.operationName}`, `atomist_operation_type:event` ]);
        this.statsd.timing("timer.operation", Date.now() - nsp.get().ts, 1,
            [ `atomist_operation:${payload.extensions.operationName}`, `atomist_operation_type:event` ]);
    }

    public eventFailed(payload: EventFired<any>, ctx: HandlerContext, err: any) {
        this.statsd.increment("counter.operation.failed", 1, 1,
            [ `atomist_operation:${payload.extensions.operationName}`, `atomist_operation_type:event` ]);
        this.statsd.timing("timer.operation", Date.now() - nsp.get().ts, 1,
            [ `atomist_operation:${payload.extensions.operationName}`, `atomist_operation_type:event` ]);
    }

    public messageSent(message: string | SlackMessage,
                       userNames: string | string[],
                       channelName: string | string[],
                       options?: MessageOptions) {
        let type;
        if (userNames && userNames.length > 0) {
            type = "dm";
        } else if (channelName && channelName.length > 0) {
            type = "channel";
        } else {
            type = "response";
        }
        this.statsd.increment("counter.message", 1, 1, [ `atomist_message_type:${type}` ]);
    }

    private initDatadog() {
        const options: ClientOptions = {
            host: this.options.host || "localhost",
            port: this.options.port || 8125,
            globalTags: [
                `atomist_name:${pj.name.replace("@", "").replace("/", "_")}`,
                `atomist_version:${pj.version}`,
                `atomist_environment:${this.options.environmentId}`,
                `atomist_application_id:${this.options.applicationId}`,
            ],
        };
        this.statsd = new StatsD(options);
    }
}

export interface DatadogOptions {

    environmentId: string;
    applicationId: string;
    host?: string;
    port?: number;

}

import {
    EventFired,
    HandlerContext,
    HandlerResult,
} from "@atomist/automation-client";
import { CommandInvocation } from "@atomist/automation-client/internal/invoker/Payload";
import { RequestProcessor } from "@atomist/automation-client/internal/transport/RequestProcessor";
import * as nsp from "@atomist/automation-client/internal/util/cls";
import { logger } from "@atomist/automation-client/internal/util/logger";
import { registerShutdownHook } from "@atomist/automation-client/internal/util/shutdown";
import { AutomationEventListenerSupport } from "@atomist/automation-client/server/AutomationEventListener";
import { MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages";
import * as appRoot from "app-root-path";
import {
    ClientOptions,
    StatsD,
} from "hot-shots";
import Timer = NodeJS.Timer;

/* tslint:disable */
const stripchar = require("stripchar").StripChar;
const pj = require(`${appRoot.path}/package.json`);
/* tslint:enable */

export class DatadogAutomationEventListener extends AutomationEventListenerSupport {

    private statsd: StatsD;
    private timer: Timer;

    constructor(private options: DatadogOptions) {
        super();
        this.initDatadog();
    }

    public registrationSuccessful(handler: RequestProcessor) {
        this.statsd.increment("counter.registration");
    }

    public commandSuccessful(payload: CommandInvocation, ctx: HandlerContext, result: HandlerResult) {
        const teamDetail = this.teamDetail();
        this.statsd.increment("counter.operation.success", 1, 1,
            [
                `atomist_operation:${payload.name}`,
                `atomist_operation_type:command`,
                ...teamDetail,
            ]);
        this.statsd.timing("timer.operation", Date.now() - nsp.get().ts, 1,
            [
                `atomist_operation:${payload.name}`,
                `atomist_operation_type:command`,
                ...teamDetail,
            ]);
    }

    public commandFailed(payload: CommandInvocation, ctx: HandlerContext, err: any) {
        const teamDetail = this.teamDetail();
        this.statsd.increment("counter.operation.failure", 1, 1,
            [
                `atomist_operation:${payload.name}`,
                `atomist_operation_type:command`,
                ...teamDetail,
            ]);
        this.statsd.timing("timer.operation", Date.now() - nsp.get().ts, 1,
            [
                `atomist_operation:${payload.name}`,
                `atomist_operation_type:command`,
                ...teamDetail,
            ]);
    }

    public eventSuccessful(payload: EventFired<any>, ctx: HandlerContext, result: HandlerResult[]) {
        const teamDetail = this.teamDetail();
        this.statsd.increment("counter.operation.success", 1, 1,
            [
                `atomist_operation:${payload.extensions.operationName}`,
                `atomist_operation_type:event`,
                ...teamDetail,
            ]);
        this.statsd.timing("timer.operation", Date.now() - nsp.get().ts, 1,
            [
                `atomist_operation:${payload.extensions.operationName}`,
                `atomist_operation_type:event`,
                ...teamDetail,
            ]);
    }

    public eventFailed(payload: EventFired<any>, ctx: HandlerContext, err: any) {
        const teamDetail = this.teamDetail();
        this.statsd.increment("counter.operation.failed", 1, 1,
            [
                `atomist_operation:${payload.extensions.operationName}`,
                `atomist_operation_type:event`,
                ...teamDetail,
            ]);
        this.statsd.timing("timer.operation", Date.now() - nsp.get().ts, 1,
            [
                `atomist_operation:${payload.extensions.operationName}`,
                `atomist_operation_type:event`,
                ...teamDetail,
            ]);
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
            prefix: "automation_client.",
            host: this.options.host || "localhost",
            port: this.options.port || 8125,
            globalTags: [
                `atomist_name:${pj.name.replace("@", "").replace("/", ".")}`,
                `atomist_version:${pj.version}`,
                `atomist_environment:${this.options.environmentId}`,
                `atomist_application_id:${this.options.applicationId}`,
                `atomist_process_id:${process.pid}`,
            ],
        };
        this.statsd = new StatsD(options);
        this.timer = setInterval(() => {
            this.submitHeapStats();
        }, 1000);

        // Register orderly shutdown
        registerShutdownHook(() => {
            this.statsd.close(() => {
                logger.debug("StatsD shutdown complete");
            });
            return Promise.resolve(0);
        });
    }

    private teamDetail(): string[] {
        const session = nsp.get();
        return [
            `atomist_team_id:${session.teamId}`,
            `atomist_team_name:${stripchar.RSExceptUnsAlpNum(session.teamName)
                .trim().replace(/ /g, "_")}`,
        ];
    }

    private submitHeapStats() {
        const heap = process.memoryUsage();
        this.statsd.gauge("heap.rss", heap.rss);
        this.statsd.gauge("heap.total", heap.heapTotal);
        this.statsd.gauge("heap.used", heap.heapUsed);
    }
}

export interface DatadogOptions {

    environmentId: string;
    applicationId: string;
    host?: string;
    port?: number;

}

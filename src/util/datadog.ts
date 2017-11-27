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
import Timer = NodeJS.Timer;
import * as cluster from "cluster";
import {
    ClientOptions,
    StatsD,
} from "hot-shots";

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
        this.increment("counter.registration");
        this.event("event.registration", `New registration for ${pj.name}/${pj.version}`);
    }

    public commandSuccessful(payload: CommandInvocation, ctx: HandlerContext, result: HandlerResult): Promise<any> {
        const tags = [
            `atomist_operation:${payload.name}`,
            `atomist_operation_type:command`,
            ...this.teamDetail(),
        ];
        this.increment("counter.operation.success", tags);
        this.timing("timer.operation", tags);
        return Promise.resolve();
    }

    public commandFailed(payload: CommandInvocation, ctx: HandlerContext, err: any): Promise<any> {
        const tags = [
            `atomist_operation:${payload.name}`,
            `atomist_operation_type:command`,
            ...this.teamDetail(),
        ];
        this.increment("counter.operation.failure", tags );
        this.timing("timer.operation", tags);
        this.event("event.operation.failure", "Unsuccessfully invoked command", tags);
        return Promise.resolve();
    }

    public eventSuccessful(payload: EventFired<any>, ctx: HandlerContext, result: HandlerResult[]): Promise<any> {
        const tags = [
            `atomist_operation:${payload.extensions.operationName}`,
            `atomist_operation_type:event`,
            ...this.teamDetail(),
        ];
        this.increment("counter.operation.success", tags);
        this.timing("timer.operation", tags);
        return Promise.resolve();
    }

    public eventFailed(payload: EventFired<any>, ctx: HandlerContext, err: any): Promise<any> {
        const tags = [
            `atomist_operation:${payload.extensions.operationName}`,
            `atomist_operation_type:event`,
            ...this.teamDetail(),
        ];
        this.increment("counter.operation.failure", tags);
        this.timing("timer.operation", tags);
        this.event("event.operation.failure", "Unsuccessfully invoked event", tags);
        return Promise.resolve();
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
        this.increment("counter.message", [
            `atomist_message_type:${type}`,
            ...this.teamDetail(),
        ]);
    }

    private increment(stat: string | string[],
                      tags?: string[]) {
        if (cluster.isMaster) {
            this.statsd.increment(stat, 1, 1, tags, callback);
        }
    }

    private event(title: string, text?: string, tags?: string[]) {
        if (cluster.isMaster) {
            this.statsd.event(`automation_client.${title}`, text, {}, tags, callback);
        }
    }

    private timing(stat: string | string[],
                   tags?: string[]) {
        if (nsp.get().ts && cluster.isMaster) {
            this.statsd.timing(stat, Date.now() - nsp.get().ts, 1, tags, callback);
        }
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
            this.event("event.shutdown", `Shutting down client ${pj.name}/${pj.version}`);
            this.statsd.close(() => {
                logger.debug("Closing StatsD connection");
            });
            return Promise.resolve(0);
        });
    }

    private teamDetail(): string[] {
        const session = nsp.get();
        return [
            `atomist_team_id:${session.teamId}`,
            `atomist_team_name:${session.teamName ? stripchar.RSExceptUnsAlpNum(session.teamName)
                .trim().replace(/ /g, "_") : undefined}`,
        ];
    }

    private submitHeapStats() {
        const heap = process.memoryUsage();
        this.statsd.gauge("heap.rss", heap.rss, 1, [], callback);
        this.statsd.gauge("heap.total", heap.heapTotal, 1, [], callback);
        this.statsd.gauge("heap.used", heap.heapUsed, 1, [], callback);
    }
}

export interface DatadogOptions {

    environmentId: string;
    applicationId: string;
    host?: string;
    port?: number;

}

function callback(err) {
    // Do nothing
}

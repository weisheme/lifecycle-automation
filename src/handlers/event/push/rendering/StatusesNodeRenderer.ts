/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { logger } from "@atomist/automation-client";
import { QueryNoCacheOptions } from "@atomist/automation-client/spi/graph/GraphClient";
import {
    Action,
    Attachment,
    SlackMessage,
    url,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import { Action as CardAction, CardMessage } from "../../../../lifecycle/card";
import {
    AbstractIdentifiableContribution, CardNodeRenderer,
    LifecycleConfiguration,
    RendererContext,
    SlackNodeRenderer,
} from "../../../../lifecycle/Lifecycle";
import { SdmGoalsByCommit } from "../../../../typings/types";
import * as graphql from "../../../../typings/types";
import { sortGoals } from "../../../../util/goals";
import { EMOJI_SCHEME } from "./PushNodeRenderers";

export class StatusesNodeRenderer extends AbstractIdentifiableContribution
    implements SlackNodeRenderer<graphql.PushToPushLifecycle.Push> {

    public showOnPush: boolean;
    public emojiStyle: "default" | "atomist";

    constructor() {
        super("statuses");
    }

    public configure(configuration: LifecycleConfiguration) {
        this.showOnPush = configuration.configuration["show-statuses-on-push"] || true;
        this.emojiStyle = configuration.configuration["emoji-style"] || "default";
    }

    public supports(node: any): boolean {
        if (node.after) {
            return this.showOnPush && node.after.statuses && node.after.statuses.length > 0;
        } else {
            return false;
        }
    }

    public render(push: graphql.PushToPushLifecycle.Push,
                  actions: Action[],
                  msg: SlackMessage,
                  context: RendererContext): Promise<SlackMessage> {

        // List all the statuses on the after commit
        const commit = push.after;
        // exclude build statuses already displayed
        const statuses = commit.statuses.filter(status => notAlreadyDisplayed(push, status));
        if (statuses.length === 0) {
            return Promise.resolve(msg);
        }

        const pending = statuses.filter(s => s.state === "pending").length;
        const success = statuses.filter(s => s.state === "success").length;
        const error = statuses.length - pending - success;

        // Now each one
        const lines = statuses.sort((s1, s2) => s1.context.localeCompare(s2.context)).map(s => {
            if (s.targetUrl != null && s.targetUrl.length > 0) {
                return `${this.emoji(s.state)} ${s.description} | ${url(s.targetUrl, s.context)}`;
            } else {
                return `${this.emoji(s.state)} ${s.description} | ${s.context}`;
            }
        });

        const color =
            pending > 0 ? "#cccc00" :
                error > 0 ? "#D94649" :
                    "#45B254";

        const summary = summarizeStatusCounts(pending, success, error);

        const attachment: Attachment = {
            // author_name: lines.length > 1 ? "Checks" : "Check",
            // author_icon: `https://images.atomist.com/rug/status.png?random=${guid()}`,
            color,
            fallback: summary,
            actions,
            text: lines.join("\n"),
        };
        msg.attachments.push(attachment);

        return Promise.resolve(msg);
    }

    private emoji(state: string): string {
        switch (state) {
            case "pending":
                return EMOJI_SCHEME[this.emojiStyle].build.started;
            case "success":
                return EMOJI_SCHEME[this.emojiStyle].build.passed;
            default:
                return EMOJI_SCHEME[this.emojiStyle].build.failed;
        }
    }
}

export class StatusesCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super("statuses");
    }

    public supports(node: any): boolean {
        if (node.after) {
            return node.after.statuses && node.after.statuses.length > 0;
        } else {
            return false;
        }
    }

    public render(push: graphql.PushToPushLifecycle.Push,
                  actions: CardAction[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {

        // List all the statuses on the after commit
        const commit = push.after;
        // exclude build statuses already displayed
        const statuses = commit.statuses.filter(status => notAlreadyDisplayed(push, status));
        if (statuses.length === 0) {
            return Promise.resolve(msg);
        }

        const success = statuses.filter(s => s.state === "success").length;

        // Now each one
        const body = statuses.sort((s1, s2) => s1.context.localeCompare(s2.context)).map(s => {

            let icon;
            if (s.state === "success") {
                icon = "css://icon-status-check";
            } else if (s.state === "pending") {
                icon = "css://icon-status-check alert";
            } else {
                icon = "css://icon-status-check fail";
            }

            let text;
            if (s.targetUrl != null && s.targetUrl.length > 0) {
                text = `${s.description} | ${url(s.targetUrl, s.context)}`;
            } else {
                text = `${s.description} | ${s.context}`;
            }

            /*msg.events.push({
               icon,
               text,
               ts: Date.parse(s.timestamp),
            });*/

            return {
                icon,
                text,
            };
        });

        msg.correlations.push({
            type: "status",
            icon: "css://icon-status-check",
            shortTitle: `${success}/${statuses.length}`,
            title: `${statuses.length} Check`,
            body,
        });

        return Promise.resolve(msg);
    }
}

export class GoalNodeRenderer extends AbstractIdentifiableContribution
    implements SlackNodeRenderer<graphql.PushToPushLifecycle.Push> {

    public showOnPush: boolean;
    public emojiStyle: "default" | "atomist";

    constructor() {
        super("goals");
    }

    public configure(configuration: LifecycleConfiguration) {
        this.showOnPush = configuration.configuration["show-statuses-on-push"] || true;
        this.emojiStyle = configuration.configuration["emoji-style"] || "default";
    }

    public supports(node: any): boolean {
        if (node.after) {
            return this.showOnPush;
        } else {
            return false;
        }
    }

    public async render(push: graphql.PushToPushLifecycle.Push,
                        actions: Action[],
                        msg: SlackMessage,
                        context: RendererContext): Promise<SlackMessage> {

        const commit = push.after;

        const goals = await context.context.graphClient.query<graphql.SdmGoalsByCommit.Query,
                graphql.SdmGoalsByCommit.Variables>({
                name: "sdmGoalsByCommit",
                variables: {
                    sha: [commit.sha],
                    branch: [push.branch],
                },
            });

        const sortedGoals = [];
        try {
            sortedGoals.push(...sortGoals((goals ? goals.SdmGoal : []) || []));
        } catch (err) {
             logger.warn(`Goal sorting failed with error: '%s'`, err.message);
        }

        const attachments: Attachment[] = [];
        sortedGoals.forEach((sg, ix) => {
                const statuses = sg.goals;

                // "planned" | "requested" | "in_process" | "waiting_for_approval" | "success" | "failure" | "skipped";
                const pending = statuses.filter(s =>
                    ["planned" , "requested" , "in_process", "waiting_for_approval"].includes(s.state)).length;
                const success = statuses.filter(s =>
                    ["success" , "skipped"].includes(s.state) ).length;
                const error = statuses.length - pending - success;
                const nonPlanned = statuses.some(s => s.state !== "planned");

                // Now each one
                const lines = statuses.map(s => {
                    let approval = "";
                    if (s.approval && s.approval.userId) {
                        approval = ` | approved by @${s.approval.userId}`;
                    }
                    if (s.url != null && s.url.length > 0) {
                        return `${this.emoji(s.state)} ${url(s.url, s.description)}${approval}`;
                    } else {
                        return `${this.emoji(s.state)} ${s.description}${approval}`;
                    }
                });

                const color =
                    pending > 0 ? "#cccc00" :
                        error > 0 ? "#D94649" :
                            "#45B254";

                if (ix === 0 || nonPlanned) {
                    const attachment: Attachment = {
                        author_name: ix === 0 ? (lines.length > 1 ? "Goals" : "Goal") : undefined,
                        author_icon: ix === 0 ? "https://images.atomist.com/rug/goals.png" : undefined,
                        color,
                        fallback: `${sg.goals[ 0 ].goalSet} Goals`,
                        text: lines.join("\n"),
                    };
                    attachments.push(attachment);
                }
        });

        if (attachments.length > 0) {
            const ts = goals.SdmGoal.map(g => g.ts);
            const min = _.min(ts);
            const max = _.max(ts);

            const moment = require("moment");
            // The following require is need to initialize the format function
            require("moment-duration-format");

            const duration = moment.duration(max - min, "millisecond").format("h[h] m[m] s[s]");
            const creator = _.flatten<SdmGoalsByCommit.Provenance>(
                goals.SdmGoal.map(g => (g.provenance || [])))
                .find(p => p.name === "SetGoalsOnPush");

            const attachment = attachments.slice(-1)[0];
            attachment.actions = actions;
            if (creator) {
                attachment.footer =
                    `${creator.registration}:${creator.version} | ${goals.SdmGoal[0].goalSet} | ${
                    goals.SdmGoal[0].goalSetId.slice(0, 7)} | ${duration}`;
            } else {
                attachment.footer = duration;
            }
        }

        msg.attachments.push(...attachments);

        return Promise.resolve(msg);
    }

    private emoji(state: string): string {
        switch (state) {
            case "planned":
            case "requested":
                return EMOJI_SCHEME[this.emojiStyle].build.requested;
            case "in_process":
                return EMOJI_SCHEME[this.emojiStyle].build.started;
            case "waiting_for_approval":
                return EMOJI_SCHEME[this.emojiStyle].build.waiting;
            case "success":
                return EMOJI_SCHEME[this.emojiStyle].build.passed;
            case "skipped":
                return EMOJI_SCHEME[this.emojiStyle].build.skipped;
            default:
                return EMOJI_SCHEME[this.emojiStyle].build.failed;
        }
    }
}

export class GoalCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super("goals");
    }

    public supports(node: any): boolean {
        if (node.after) {
            return node.after.statuses && node.after.statuses.length > 0;
        } else {
            return false;
        }
    }

    public render(push: graphql.PushToPushLifecycle.Push,
                  actions: CardAction[],
                  msg: CardMessage,
                  context: RendererContext): Promise<CardMessage> {

        // List all the statuses on the after commit
        const commit = push.after;
        // exclude build statuses already displayed
        const goals = commit.statuses.filter(status => status.context.includes("sdm/"));
        if (goals.length === 0) {
            return Promise.resolve(msg);
        }

        const success = goals.filter(s => s.state === "success").length;

        // Now each one
        const body = goals.sort((s1, s2) => s1.context.localeCompare(s2.context)).map(s => {

            let icon;
            if (s.state === "success") {
                icon = "css://icon-status-check";
            } else if (s.state === "pending") {
                icon = "css://icon-status-check alert";
            } else {
                icon = "css://icon-status-check fail";
            }

            let text;
            if (s.targetUrl != null && s.targetUrl.length > 0) {
                text = `${url(s.targetUrl, s.description)}`;
            } else {
                text = `${s.description}`;
            }

            return {
                icon,
                text,
            };
        });

        msg.correlations.push({
            type: "status",
            icon: "css://icon-panels",
            shortTitle: `${success}/${goals.length}`,
            title: `${goals.length} ${goals.length === 1 ? "Goal" : "Goals"}`,
            body,
        });

        msg.actions.push(...actions);

        return Promise.resolve(msg);
    }
}

function notAlreadyDisplayed(push: any, status: any): boolean {
    if (status.context.indexOf("travis-ci") >= 0 && push.builds != null &&
        push.builds.some(b => b.provider === "travis")) {
        return false;
    }
    if (status.context.indexOf("circleci") >= 0 && push.builds != null &&
        push.builds.some(b => b.provider === "circle")) {
        return false;
    }
    if (status.context.indexOf("jenkins") >= 0 && push.builds != null &&
        push.builds.some(b => b.provider === "jenkins")) {
        return false;
    }
    if (status.context.indexOf("sdm/") >= 0) {
        return false;
    }
    return true;
}

export function summarizeStatusCounts(pending: number,
                                      success: number,
                                      error: number,
                                      labelSingular: string = "check",
                                      labelPlural: string = "checks"): string {

    const parts = [];
    let check = "check";
    if (pending > 0) {
        parts.push(`${pending} pending`);
        if (pending > 1) {
            check = labelPlural;
        }
    }
    if (error > 0) {
        parts.push(`${error} failing`);
        if (error > 1) {
            check = labelPlural;
        } else {
            check = labelSingular;
        }
    }
    if (success > 0) {
        parts.push(`${success} successful`);
        if (success > 1) {
            check = labelPlural;
        } else {
            check = labelSingular;
        }
    }

    // Now each one
    let footerMessage = "";
    let i;
    for (i = 0; i < parts.length; ++i) {
        if (i === 0) {
            footerMessage += parts[i];
        } else if (i === parts.length - 1) {
            footerMessage += " and " + parts[i];
        } else {
            footerMessage += ", " + parts[i];
        }
    }

    return `${footerMessage} ${check}`;
}

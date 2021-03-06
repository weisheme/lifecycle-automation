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
import {
    Action,
    Attachment,
    emoji,
    SlackMessage,
    url,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import {
    Action as CardAction,
    CardMessage,
    Goal,
} from "../../../../lifecycle/card";
import {
    AbstractIdentifiableContribution,
    CardNodeRenderer,
    LifecycleConfiguration,
    RendererContext,
    SlackNodeRenderer,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import {
    SdmGoalsByCommit,
    SdmGoalState,
} from "../../../../typings/types";
import {
    lastGoalSet,
    sortGoals,
} from "../../../../util/goals";
import { GoalSet } from "../PushLifecycle";
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
    implements SlackNodeRenderer<GoalSet> {

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
        if (node.goals && node.goalSetId) {
            return this.showOnPush;
        } else {
            return false;
        }
    }

    public async render(goalSet: GoalSet,
                        actions: Action[],
                        msg: SlackMessage,
                        context: RendererContext): Promise<SlackMessage> {

        const sortedGoals = [];

        try {
            sortedGoals.push(...sortGoals((goalSet ? goalSet.goals : []) || []));
        } catch (err) {
            logger.warn(`Goal sorting failed with error: '%s'`, err.message);
        }

        const attachments: Attachment[] = [];
        sortedGoals.filter(sg => sg.goals && sg.goals.length > 0).forEach((sg, ix) => {
            const statuses = sg.goals;

            // "planned" | "requested" | "in_process" | "waiting_for_approval" | "success" | "failure" | "skipped";
            const pending = statuses.filter(s =>
                ["planned", "requested", "in_process", "waiting_for_approval"].includes(s.state)).length;
            const success = statuses.filter(s =>
                ["success", "skipped"].includes(s.state)).length;
            const error = statuses.length - pending - success;
            const nonPlanned = statuses.some(s => s.state !== "planned" && s.state !== "skipped");

            // Now each one
            const lines = statuses.map(s => {
                let details = "";
                if ((s.state === SdmGoalState.in_process || s.state === SdmGoalState.failure) && s.phase) {
                    details += ` | ${s.phase}`;
                }
                if (s.externalUrl) {
                    details = ` | ${url(s.externalUrl, "Link")}`;
                }
                if (s.approval && s.approval.userId) {
                    details += ` | approved by @${s.approval.userId}`;
                }
                if (s.url != null && s.url.length > 0) {
                    return `${this.emoji(s.state)} ${url(s.url, s.description)}${details}`;
                } else {
                    return `${this.emoji(s.state)} ${s.description}${details}`;
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
                    fallback: `${sg.goals[0].goalSet} Goals`,
                    text: lines.join("\n"),
                };
                attachments.push(attachment);
            }
        });

        if (attachments.length > 0) {
            const lastGoals = lastGoalSet(goalSet.goals);
            const ts = lastGoals.map(g => g.ts);
            const min = _.min(ts);
            const max = _.max(ts);

            const moment = require("moment");
            // The following require is needed to initialize the format function
            require("moment-duration-format");

            const duration = moment.duration(max - min, "millisecond").format("h[h] m[m] s[s]");
            const creator = _.flatten<SdmGoalsByCommit.Provenance>(
                lastGoals.map(g => (g.provenance || [])))
                .find(p => p.name === "SetGoalsOnPush" || p.name === "ResetGoalsOnCommit");

            const attachment = attachments.slice(-1)[0];
            attachment.actions = actions;
            attachment.ts = Math.floor(max / 1000);
            if (creator) {
                attachment.footer =
                    `${creator.registration}:${creator.version} | ${lastGoals[0].goalSet} | ${
                    lastGoals[0].goalSetId.slice(0, 7)} | ${duration}`;
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
    implements CardNodeRenderer<GoalSet> {

    constructor() {
        super("goals");
    }

    public supports(node: any): boolean {
        return node.goals && node.goalSetId;
    }

    public async render(goalSet: GoalSet,
                        actions: CardAction[],
                        msg: CardMessage,
                        context: RendererContext): Promise<CardMessage> {
        const sortedGoals = [];

        try {
            sortedGoals.push(...sortGoals((goalSet ? goalSet.goals : []) || []));
        } catch (err) {
            logger.warn(`Goal sorting failed with error: '%s'`, err.message);
        }

        let total = 0;
        const gs: Goal[] = [];
        sortedGoals.filter(sg => sg.goals && sg.goals.length > 0).forEach(sg => {
            total += sg.goals.length;

            // Now each one
            sg.goals.forEach(s => {
                let details = "";
                if ((s.state === SdmGoalState.in_process || s.state === SdmGoalState.failure) && s.phase) {
                    details += ` | ${s.phase}`;
                }
                if (s.approval && s.approval.userId) {
                    details += ` | approved by @${s.approval.userId}`;
                }
                gs.push({
                    name: s.name,
                    description: `${s.description}${details}`,
                    state: s.state,
                    environment: sg.environment,
                    ts: s.ts,
                    link: s.url,
                });
            });
        });

        if (total > 0) {
            const lastGoals = lastGoalSet(goalSet.goals);
            const ts = lastGoals.map(g => g.ts);
            const min = _.min(ts);
            const max = _.max(ts);

            const creator = _.flatten<SdmGoalsByCommit.Provenance>(
                lastGoals.map(g => (g.provenance || [])))
                .find(p => p.name === "SetGoalsOnPush" || p.name === "ResetGoalsOnCommit");

            let state: SdmGoalState;
            if (lastGoals.some(g => g.state === SdmGoalState.failure)) {
                state = SdmGoalState.failure;
            } else if (lastGoals.some(g => g.state === SdmGoalState.waiting_for_approval)) {
                state = SdmGoalState.waiting_for_approval;
            } else if (lastGoals.some(g => g.state === SdmGoalState.in_process)) {
                state = SdmGoalState.in_process;
            } else if (lastGoals.some(g => g.state === SdmGoalState.requested)) {
                state = SdmGoalState.requested;
            } else if (lastGoals.some(g => g.state === SdmGoalState.planned)) {
                state = SdmGoalState.planned;
            } else if (lastGoals.some(g => g.state === SdmGoalState.success)) {
                state = SdmGoalState.success;
            }

            msg.goalSets.push({
                goalSet: lastGoals[0].goalSet,
                goalSetId: lastGoals[0].goalSetId,
                ts: Date.now(),
                duration: max - min,
                actions,
                goals: gs,
                registration: creator ? `${creator.registration}:${creator.version}` : undefined,
                state,
            });
        }

        return Promise.resolve(msg);
    }
}

function notAlreadyDisplayed(push: any, status: any): boolean {
    if (status.context.includes("travis-ci") && push.builds != null &&
        push.builds.some(b => b.provider === "travis")) {
        return false;
    }
    if (status.context.includes("circleci") && push.builds != null &&
        push.builds.some(b => b.provider === "circle")) {
        return false;
    }
    if (status.context.includes("jenkins") && push.builds != null &&
        push.builds.some(b => b.provider === "jenkins")) {
        return false;
    }
    if (status.context.includes("codeship") && push.builds != null &&
        push.builds.some(b => b.provider.includes("codeship"))) {
        return false;
    }
    if (status.context.includes("sdm/")) {
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

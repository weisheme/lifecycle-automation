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
import * as graphql from "../../../../typings/types";
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

export class PhaseNodeRenderer extends AbstractIdentifiableContribution
    implements SlackNodeRenderer<graphql.PushToPushLifecycle.Push> {

    public showOnPush: boolean;
    public emojiStyle: "default" | "atomist";

    constructor() {
        super("phases");
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
        const phases = commit.statuses.filter(status => status.context.includes("sdm/"))
            .sort((s1, s2) => s1.context.localeCompare(s2.context)) as graphql.PushToPushLifecycle.Statuses[];
        if (phases.length === 0) {
            return Promise.resolve(msg);
        }

        // sdm/atomist/#-env/#-name
        const EnvRegexp = /sdm\/atomist\/([0-9]*-[a-zA-Z]*)\/.*/i;
        const grouped = _.groupBy(phases, s => {
            const result = EnvRegexp.exec(s.context);
            if (result) {
                return result[1];
            }  else {
                return null;
            }
        });

        let counter = 0;
        const attachments: Attachment[] = [];
        for (const key in grouped) {
            if (grouped.hasOwnProperty(key)) {
                const statuses = grouped[key];

                const pending = statuses.filter(s => s.state === "pending").length;
                const success = statuses.filter(s => s.state === "success").length;
                const error = statuses.length - pending - success;

                // Now each one
                const lines = statuses.sort((s1, s2) => s1.context.localeCompare(s2.context)).map(s => {
                    if (s.targetUrl != null && s.targetUrl.length > 0) {
                        return `${this.emoji(s.state)} ${url(s.targetUrl, s.description)}`;
                    } else {
                        return `${this.emoji(s.state)} ${s.description}`;
                    }
                });

                const color =
                    pending > 0 ? "#cccc00" :
                        error > 0 ? "#D94649" :
                            "#45B254";

                const summary = summarizeStatusCounts(pending, success, error, "phase", "phases");

                const attachment: Attachment = {
                    author_name: counter === 0 ? (lines.length > 1 ? "Phases" : "Phase") : undefined,
                    author_icon: counter === 0 ? "https://images.atomist.com/rug/phases.png" : undefined,
                    color,
                    fallback: summary,
                    text: lines.join("\n"),
                };
                attachments.push(attachment);
                counter++;
            }
        }

        if (attachments.length > 0) {
            attachments.slice(-1)[0].actions = actions;
        }

        msg.attachments.push(...attachments);

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

export class PhaseCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<graphql.PushToPushLifecycle.Push> {

    constructor() {
        super("phases");
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
        const statuses = commit.statuses.filter(status => status.context.includes("sdm/"));
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
            shortTitle: `${success}/${statuses.length}`,
            title: `${statuses.length} Phase`,
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

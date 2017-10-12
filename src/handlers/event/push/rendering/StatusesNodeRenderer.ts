import {
    Action,
    Attachment,
    SlackMessage,
    url,
} from "@atomist/slack-messages/SlackMessages";
import {
    AbstractIdentifiableContribution,
    LifecycleConfiguration,
    NodeRenderer,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import { EMOJI_SCHEME } from "./PushNodeRenderers";

export class StatusesNodeRenderer extends AbstractIdentifiableContribution implements NodeRenderer<any> {

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

    public render(push: any, actions: Action[], msg: SlackMessage, context: RendererContext): Promise<SlackMessage> {

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
                return `${this.emoji(s.state)} ${s.description} - ${url(s.targetUrl, s.context)}`;
            } else {
                return `${this.emoji(s.state)} ${s.description} - ${s.context}`;
            }
        });

        const color =
            pending > 0 ? "#cccc00" :
                error > 0 ? "#D94649" :
                    "#45B254";

        const summary = summarizeStatusCounts(pending, success, error);

        const attachment: Attachment = {
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
    return true;
}

export function summarizeStatusCounts(pending: number, success: number, error: number): string {

    const parts = [];
    let check = "check";
    if (pending > 0) {
        parts.push(`${pending} pending`);
        if (pending > 1) {
            check = "checks";
        }
    }
    if (error > 0) {
        parts.push(`${error} failing`);
        if (error > 1) {
            check = "checks";
        } else {
            check = "check";
        }
    }
    if (success > 0) {
        parts.push(`${success} successful`);
        if (success > 1) {
            check = "checks";
        } else {
            check = "check";
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

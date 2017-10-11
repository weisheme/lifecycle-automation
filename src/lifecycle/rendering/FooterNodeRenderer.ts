import { Action, emoji, SlackMessage, url } from "@atomist/slack-messages/SlackMessages";
import { NodeRenderer, RendererContext } from "../Lifecycle";

import * as base64 from "../../util/Base64";

export class FooterNodeRenderer implements NodeRenderer<any> {

    constructor(private matches: (node: any) => boolean) { }

    public id() {
        return "footer";
    }

    public supports(node: any): boolean {
        return this.matches(node);
    }

    public render(node: any, actions: Action[], msg: SlackMessage, context: RendererContext): Promise<SlackMessage> {
        const attachment = msg.attachments[msg.attachments.length - 1];
        if (!attachment.ts) {
            const date = Math.floor(new Date().getTime() / 1000);
            // attachment.footer = `<!date^${date}^Updated {date_short_pretty} at {time_secs}|${date}>`;
            attachment.ts = date;
        }

        // Render feedback url in the footer
        const feedbackUrl =
            `https://atomist.typeform.com/to/yvnyOj?message_id=${base64.encode(context.context.invocationId)}`;
        const feedbackFooter = `${url(feedbackUrl, "Feedback?")}`;
        if (attachment.footer != null) {
            const footer = `${attachment.footer} | ${feedbackFooter}`;
            if (footer.length <= 300) {
                attachment.footer = footer;
            }
        } else {
            attachment.footer = feedbackFooter;
        }

        // Make sure markdown is enabled for the footer
        if (attachment.mrkdwn_in != null) {
            attachment.mrkdwn_in.push("footer");
        } else {
            attachment.mrkdwn_in = ["footer"];
        }
        return Promise.resolve(msg);
    }
}

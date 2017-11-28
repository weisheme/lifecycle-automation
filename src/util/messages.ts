import { Action, SlackMessage } from "@atomist/slack-messages";

export function warning(title: string, text: string, actions?: Action[]): SlackMessage {
    const msg: SlackMessage = {
        attachments: [{
            author_icon: `https://images.atomist.com/rug/warning-yellow.png`,
            author_name: title,
            text,
            fallback: text,
            color: "#ffcc00",
            mrkdwn_in: [ "text" ],
            actions,
        }],
    };
    return msg;
}

import {
    Action,
    Attachment,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import {
    extractLinkedIssues,
    issueUrl,
    prUrl,
    truncateCommitMessage,
} from "../../util/helpers";
import {
    AbstractIdentifiableContribution,
    NodeRenderer,
    RendererContext,
} from "../Lifecycle";

export class AttachImagesNodeRenderer extends AbstractIdentifiableContribution
    implements NodeRenderer<any> {

    constructor(private callback: (node: any) => boolean = () => true) {
        super("attachimages");
    }

    public supports(node: any): boolean {
        return node.body && this.callback(node);
    }

    public render(node: any, actions: Action[], msg: SlackMessage, context: RendererContext):
        Promise<SlackMessage> {

        const imageRegExp = /https?:\/\/.*?\/(.*?\.(?:png|jpg|gif|jpeg|bmp))/gi;
        let match;

        // tslint:disable-next-line:no-conditional-assignment
        while (match = imageRegExp.exec(node.body)) {
            const url = match[0];
            const image = match[1];
            msg.attachments.push({
                text: image.split("/").slice(-1)[0],
                image_url: url,
                fallback: image,
            });
        }

        return Promise.resolve(msg);
    }
}

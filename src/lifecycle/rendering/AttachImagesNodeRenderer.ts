import {
    Action,
    Attachment,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import {
    extractImageUrls,
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
    implements NodeRenderer<any, SlackMessage> {

    constructor(private callback: (node: any) => boolean = () => true) {
        super("attachimages");
    }

    public supports(node: any): boolean {
        return node.body && this.callback(node);
    }

    public render(node: any, actions: Action[], msg: SlackMessage, context: RendererContext):
        Promise<SlackMessage> {

        msg.attachments.push(...extractImageUrls(node.body));
        return Promise.resolve(msg);
    }
}

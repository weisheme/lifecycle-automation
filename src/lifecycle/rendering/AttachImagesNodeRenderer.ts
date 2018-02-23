import {
    Action,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import {
    extractImageUrls,
} from "../../util/helpers";
import {
    AbstractIdentifiableContribution,
    RendererContext,
    SlackNodeRenderer,
} from "../Lifecycle";

export class AttachImagesNodeRenderer extends AbstractIdentifiableContribution
    implements SlackNodeRenderer<any> {

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

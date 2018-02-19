import {
    Action, Attachment,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import {
    AbstractIdentifiableContribution,
    NodeRenderer,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import { chartUrlFromWorkflow } from "./ChartUrl";
import {circleWorkflowtoStages, PushTrigger} from "./CircleWorkflow";

export class WorkflowNodeRenderer extends AbstractIdentifiableContribution
    implements NodeRenderer<graphql.PushToPushLifecycle.Builds, SlackMessage> {

    constructor() {
        super("workflow");
    }

    public supports(node: any): boolean {
        return node.config && node.provider === "circle";
    }

    public render(workflow: graphql.PushToPushLifecycle.Workflow, actions: Action[], msg: SlackMessage,
                  context: RendererContext): Promise<SlackMessage> {
        const push = context.lifecycle.extract("push") as graphql.PushToPushLifecycle.Push;
        const pushTrigger: PushTrigger = {
            name: push.branch,
            type: "branch", // we only trigger on branch pushes currently, though the logic here would handle tags
        };
        const chartUrl = chartUrlFromWorkflow(circleWorkflowtoStages(workflow, pushTrigger));
        if (chartUrl) {
            const attachment: Attachment = {
                author_name: "Workflow",
                author_icon: "https://images.atomist.com/rug/flow.png",
                title: "Circle CI",
                title_link: `https://circleci.com/workflow-run/${workflow.id.slice(10)}`,
                fallback: "Workflow",
                image_url: chartUrl,
            };
            msg.attachments.push(attachment);
        }
        return Promise.resolve(msg);
    }
}

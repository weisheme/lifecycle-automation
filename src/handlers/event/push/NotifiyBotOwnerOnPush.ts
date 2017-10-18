import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { AbstractNotifyBotOwner } from "../AbstractNotifyBotOwner";

@EventHandler("Notify the bot owner of GitHub activity in Slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyBotOwnerOnPush"))
@Tags("lifecycle", "notification")
export class NotifyBotOwnerOnPush extends AbstractNotifyBotOwner {
}

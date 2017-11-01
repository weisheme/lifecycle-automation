import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import { Preferences } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { AbstractNotifyBotOwner } from "../AbstractNotifyBotOwner";

@EventHandler("Notify the bot owner of GitHub activity in Slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyBotOwnerOnPush"))
@Tags("lifecycle", "notification")
export class NotifyBotOwnerOnPush extends AbstractNotifyBotOwner<graphql.NotifyBotOwnerOnPush.Subscription> {

    protected extractPreferences(event: EventFired<graphql.NotifyBotOwnerOnPush.Subscription>): Preferences[] {
        return _.get(event, "data.Push[0].repo.org.chatTeam.preferences");
    }

}

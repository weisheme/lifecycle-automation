import {
    EventFired,
    EventHandler,
    Tags,
} from "@atomist/automation-client";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as _ from "lodash";
import { ChatTeam } from "../../../lifecycle/Lifecycle";
import * as graphql from "../../../typings/types";
import { AbstractNotifyBotOwner } from "../AbstractNotifyBotOwner";

@EventHandler("Notify the bot owner of GitHub activity in Slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyBotOwnerOnPush"))
@Tags("lifecycle", "notification")
export class NotifyBotOwnerOnPush extends AbstractNotifyBotOwner<graphql.NotifyBotOwnerOnPush.Subscription> {

    protected extractChatTeams(event: EventFired<graphql.NotifyBotOwnerOnPush.Subscription>)
        : ChatTeam[] {
        return _.get(event, "data.Push[0].repo.org.team.chatTeams");
    }

}

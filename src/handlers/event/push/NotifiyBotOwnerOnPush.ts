import { EventHandler, Tags } from "@atomist/automation-client/decorators";
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import { EventFired } from "@atomist/automation-client/Handlers";
import { Failure, HandleEvent, HandlerContext, HandlerResult, Success } from "@atomist/automation-client/Handlers";
import * as graphql from "../../../typings/types";

@EventHandler("Notify the bot owner of GitHub activity in Slack",
    GraphQL.subscriptionFromFile("graphql/subscription/notifyPusherOnBuild"))
@Tags("lifecycle", "notification")
export class NotifyBotOwnerOnPush implements HandleEvent<graphql.NotifyPusherOnBuild.Subscription> {

    public handle(root: EventFired<graphql.NotifyPusherOnBuild.Subscription>,
                  ctx: HandlerContext): Promise<HandlerResult> {
        const build = root.data.Build[0];
        if (build.status === "broken" || build.status === "failed") {
            return buildNotification(build, build.repo, ctx)
                .then(() => Success)
                .catch(() => Failure);
        }
        return Promise.resolve(Success);
    }
}

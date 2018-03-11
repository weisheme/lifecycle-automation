import {
    EventFired,
    EventHandler,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    Tags,
} from "@atomist/automation-client";
import * as GraqhQL from "@atomist/automation-client/graph/graphQL";
import * as graphql from "../../../typings/types";

@EventHandler("Displays a welcome message when a repo is enrolled",
    GraqhQL.subscriptionFromFile("../../../graphql/subscription/repoOnboarded", __dirname))
@Tags("enrollment")
export class RepositoryOnboarded implements HandleEvent<graphql.RepoOnboarded.Subscription> {

    public handle(
        event: EventFired<graphql.RepoOnboarded.Subscription>,
        ctx: HandlerContext,
    ): Promise<HandlerResult> {

        return null;
    }
}

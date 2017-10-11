import { Ingestor } from "@atomist/automation-client/decorators";
import { EventFired, HandleEvent, HandlerContext, HandlerResult, Success } from "@atomist/automation-client/Handlers";
import { logger } from "@atomist/automation-client/internal/util/logger";

@Ingestor("Ingestor for wercker events", "wercker")
export class WerckerIngestor implements HandleEvent<any> {

    public handle(e: EventFired<any>, ctx: HandlerContext): Promise<HandlerResult> {
        logger.info(`Incoming event had ${e.data}`);

        return Promise.resolve(Success);
    }
}

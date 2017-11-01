import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import {
    CommandHandler,
    Tags,
} from "@atomist/automation-client/Handlers";
import * as cf from "cf-nodejs-client";
import { AbstractCloudFoundryApplicationCommand } from "./AbstractCloudFoundryApplicationCommand";

/**
 * Start a Cloud Foundry application.
 */
@CommandHandler("Stop a Cloud Foundry application", "cf stop")
@Tags("cloudfoundry", "app")
export class StopCloudFoundryApplication extends AbstractCloudFoundryApplicationCommand {

    protected doWithApp(apps: cf.Apps, ctx: HandlerContext): Promise<any> {
        return apps.stop(this.guid);
    }
}

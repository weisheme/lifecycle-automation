import {
    CommandHandler,
    Tags,
} from "@atomist/automation-client";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import * as cf from "cf-nodejs-client";
import { AbstractCloudFoundryApplicationCommand } from "./AbstractCloudFoundryApplicationCommand";

/**
 * Start a Cloud Foundry application.
 */
@CommandHandler("Start a Cloud Foundry application", "cf start")
@Tags("cloudfoundry", "app")
export class StartCloudFoundryApplication extends AbstractCloudFoundryApplicationCommand {

    protected doWithApp(apps: cf.Apps, ctx: HandlerContext): Promise<any> {
        return apps.start(this.guid);
    }
}

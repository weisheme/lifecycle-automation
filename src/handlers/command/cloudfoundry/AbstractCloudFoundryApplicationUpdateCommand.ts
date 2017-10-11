import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import * as cf from "cf-nodejs-client";
import { AbstractCloudFoundryApplicationCommand } from "./AbstractCloudFoundryApplicationCommand";

export abstract class AbstractCloudFoundryApplicationUpdateCommand extends AbstractCloudFoundryApplicationCommand {

    protected doWithApp(apps: cf.Apps, ctx: HandlerContext): Promise<any> {
        return apps.update(this.guid, this.updateApp());
    }

    protected abstract updateApp(): any;
}

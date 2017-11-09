import {
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client";
import {
    Parameter,
    Secret,
} from "@atomist/automation-client/decorators";
import * as cf from "cf-nodejs-client";
import { CloudFoundryParameters } from "./parameters";

export abstract class AbstractCloudFoundryApplicationCommand implements HandleCommand {

    @Parameter(CloudFoundryParameters.guid)
    public guid: string;

    @Secret("secret://team?path=cloudfoundry/user")
    public user: string;

    @Secret("secret://team?path=cloudfoundry/password")
    public password: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        const endpoint = "https://api.run.pivotal.io";
        const controller = new cf.CloudController(endpoint);
        const uaa = new cf.UsersUAA();
        const apps = new cf.Apps(endpoint);

        return controller.getInfo().then(result => {
            uaa.setEndPoint(result.authorization_endpoint);
            return uaa.login(this.user, this.password);
        }).then(result => {
            apps.setToken(result);
            return this.doWithApp(apps, ctx);
        }).then(() => {
            return Success;
        }).catch(err => {
            console.error(err);
            return failure(err);
        });
    }

    protected abstract doWithApp(apps: cf.Apps, ctx: HandlerContext): Promise<any>;
}

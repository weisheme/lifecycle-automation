import {
    CommandHandler,
    Parameter,
    Tags,
} from "@atomist/automation-client";
import { AbstractCloudFoundryApplicationUpdateCommand } from "./AbstractCloudFoundryApplicationUpdateCommand";
import { CloudFoundryParameters } from "./parameters";

/**
 * Scale a Cloud Foundry application.
 */
@CommandHandler("Scale a Cloud Foundry application", "cf scale")
@Tags("cloudfoundry", "app")
export class ScaleCloudFoundryApplication extends AbstractCloudFoundryApplicationUpdateCommand {

    @Parameter(CloudFoundryParameters.guid)
    public guid: string;

    @Parameter({
        displayName: "Instances",
        description: "number of Instances",
        pattern: /^[0-9]*$/,
        validInput: "number of instances",
        minLength: 1,
        maxLength: 100,
        required: true,
    })
    public instances: number;

    protected updateApp(): any {
        return { instances: +this.instances };
    }
}

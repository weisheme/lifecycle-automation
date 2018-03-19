import { automationClient } from "@atomist/automation-client/automationClient";
import {
    findConfiguration,
    loadConfiguration
} from "@atomist/automation-client/configuration";
import { logger } from "@atomist/automation-client/internal/util/logger";
import { enableDefaultScanning } from "@atomist/automation-client/scan";
import {
    loadSecretsFromCloudFoundryEnvironment,
    loadSecretsFromConfigServer,
} from "./util/secrets";

loadSecretsFromConfigServer()
    .then(() => loadSecretsFromCloudFoundryEnvironment())
    .then(() => loadConfiguration())
    .then(configuration => {
        const node = automationClient(configuration);
        return node.run()
            .then(() => logger.info("Successfully completed startup of process '%s'", process.pid));
    });


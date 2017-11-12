import { logger } from "@atomist/automation-client/internal/util/logger";
import { guid } from "@atomist/automation-client/internal/util/string";
import axios from "axios";
import * as cfenv from "cfenv";
import * as _ from "lodash";

export const appEnv = cfenv.getAppEnv();

export const secrets = {
    github: null,
    dashboard: null,
    logzio: null,
    mixpanel: null,
    oauth: null,
    teams: null,
    applicationId: guid(),
    environmentId: "local",
};

/**
 * Obtain a secret value from the environment
 * @param {string} path
 * @param {string} defaultValue
 * @returns {string}
 */
export function secret(path: string, defaultValue?: string): string {
    return _.get(secrets, path, defaultValue);
}

export const loadSecretsFromCloudFoundryEnvironment = () => {
    if (process.env.VCAP_SERVICES) {
        logger.debug("Fetching secrets from Cloud Foundry environment");
        secrets.github = appEnv.getServiceCreds("github-token");
        secrets.dashboard = appEnv.getServiceCreds("dashboard-credentials");
        secrets.logzio = appEnv.getServiceCreds("logzio-credentials");
        secrets.mixpanel = appEnv.getServiceCreds("mixpanel-credentials");
        secrets.oauth = appEnv.getServiceCreds("github-oauth");
        secrets.teams = appEnv.getServiceCreds("teams");
        secrets.applicationId = `cf.${appEnv.app.application_id}`;
        secrets.environmentId = `cf.${appEnv.app.space_name}`;
    }
    return Promise.resolve();
};

export const loadSecretsFromConfigServer = () => {
    const configUrl = process.env.CONFIG_URL;
    if (configUrl) {
        logger.debug("Fetching secrets from config server at '%s'", configUrl);
        return axios.get(configUrl)
            .then(result => {
                const data = JSON.parse(result.data)["secret/automation"];
                secrets.github = data.github;
                secrets.dashboard = data.dashboard;
                secrets.logzio = data.logzio;
                secrets.mixpanel = data.mixpanel;
                secrets.oauth = data.oauth;
                secrets.teams = data.teams;
                secrets.applicationId = process.env.HOSTNAME;
                secrets.environmentId = data.environmentId;
                console.log(JSON.stringify(secrets));
                return Promise.resolve();
            })
            .catch(err => {
                logger.error("Error occurred fetching secrets from config server: %s", err);
                return Promise.resolve();
            });
    } else {
        return Promise.resolve();
    }
};

import {
    failure,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client";
import { HandlerError } from "@atomist/automation-client/HandlerResult";
import * as GitHubApi from "github";
import * as URL from "url";
import { error } from "../../../util/messages";

export function api(token: string, apiUrl: string = "https://api.github.com/"): GitHubApi {
    // separate the url
    const url = URL.parse(apiUrl);

    const gitHubApi = new GitHubApi({
        debug: false,
        host: url.hostname,
        protocol: url.protocol.slice(0, -1),
        port: +url.port,
        followRedirects: false,
    });

    gitHubApi.authenticate({ type: "token", token });
    return gitHubApi;
}

export function handleError(title: string, err: any, ctx: HandlerContext): Promise<HandlerResult> | HandlerError {
    if (err.message) {
        const body = JSON.parse(err.message);
        const message = body.message ? `${body.message}.` : "Error occurred. Please contact support.";
        return ctx.messageClient.respond(error(title, message, ctx))
            .then(() => Success, failure);
    }
    return failure(err);
}

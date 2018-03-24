/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    CommandHandler, ConfigurableCommandHandler,
    Failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameter,
    MappedParameters,
    Parameter,
    Secret,
    Secrets,
    Tags,
} from "@atomist/automation-client";
import {
    codeBlock,
    codeLine,
} from "@atomist/slack-messages";
import axios from "axios";
import {
    error,
    success,
} from "../../../util/messages";

const buildIdParameter = {
    displayName: "Build ID",
    description: "Travis CI identifier of build to restart",
    pattern: /^\d+$/,
};

@ConfigurableCommandHandler("Restart a Travis CI build", {
    intent: [ "restart build", "restart travis build" ],
    autoSubmit: true,
})
@Tags("travis", "ci", "restart")
export class RestartTravisBuild implements HandleCommand {

    @Parameter(buildIdParameter)
    public buildId: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string;

    @Secret(Secrets.userToken(["repo", "read:org", "user:email"]))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        let tld = "com";
        return axios.get(`${this.apiUrl}repos/${this.owner}/${this.repo}`,
            { headers: { Authorization: `token ${this.githubToken}` } })
            .then(result => {
                return result.data.private as boolean;
            })
            .then(flag => {
                tld = flag ? "com" : "org";
            })
            .then(() => {
                return axios.post(`https://api.travis-ci.${tld}/auth/github`,
                    { github_token: this.githubToken },
                    {
                        headers: {
                            "Accept": "application/vnd.travis-ci.2+json",
                            "Content-Type": "application/json",
                            "User-Agent": "Travis/1.6.8",
                        },
                    });
            })
            .then(response => {
                return response.data.access_token;
            })
            .then(token => {
                return axios.post(`https://api.travis-ci.${tld}/builds/${this.buildId}/restart`,
                    {},
                    {
                        headers: {
                            "Accept": "application/vnd.travis-ci.2+json",
                            "Authorization": `token ${token}`,
                            "User-Agent": "Travis/1.6.8",
                        },
                    });
            })
            .then(() => {
                return ctx.messageClient.respond(success(
                    "Restart Build",
                    `Successfully restarted build ${
                        codeLine(this.buildId)} on ${codeLine(`${this.owner}/${this.repo}`)}`));
            })
            .then(() => {
                return Promise.resolve({ code: 0 });
            })
            .catch(reason => {
                return ctx.messageClient.respond(error(
                    "Restart Build",
                    `Failed to restart build ${codeLine(this.buildId)}:\n ${codeBlock(reason)}`, ctx))
                    .then(() => {
                        return Failure;
                    });
            });
    }
}

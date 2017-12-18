import {
    CommandHandler, failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    logger,
    MappedParameter,
    MappedParameters,
    Parameter,
    Secret,
    Secrets, Success, SuccessPromise,
} from "@atomist/automation-client";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import { secret } from "../../../util/secrets";

// tslint:disable-next-line:no-var-requires
const Intercom = require("intercom-client");

@CommandHandler("Initiate a conversation with Atomist support staff", "ask", "support", "message")
export class InitiateConversation implements HandleCommand {

    @Secret(Secrets.userToken("user"))
    public userToken: string;

    @MappedParameter(MappedParameters.SlackUser)
    public slackUser: string;

    @Parameter({ description: "Question or feedback you want to send", pattern: /[\s\S]*/})
    public q: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        if (ctx && ctx.graphClient && ctx.userId) {
            return ctx.graphClient.executeQueryFromFile<graphql.EMailAndGitHubIdByUserId.Query,
                graphql.EMailAndGitHubIdByUserId.Variables > (
                "graphql/query/emailAndGitHubIdByUserId",
                { userId: ctx.userId })
                .then(result => {
                    let login;
                    let email;
                    let name;
                    if (result.ChatId && result.ChatId[0] && result.ChatId[0].person) {
                        email = _.get(result, "ChatId[0].person.emails[0].address");
                        login = _.get(result, "ChatId[0].person.gitHubId.login");
                        name = `${result.ChatId[0].person.forename} ${result.ChatId[0].person.surname}`;
                    } else if (result.ChatId && result.ChatId[0]) {
                        email = _.get(result, "ChatId[0].emails[0].address");
                        name = result.ChatId[0].screenName;
                    }

                    logger.info(
                        `Creating conversation for email '${email}', login '${login}' and name '${name}'`);

                    if (email) {
                        const payload = {
                            from: {
                                type: "user",
                                email,
                            },
                            body: this.q,
                        };

                        const client = new Intercom.Client({ token: secret("intercom.secret") });
                        return client.messages.create(payload)
                            .then(() => Success, failure);
                    }
                    return Success;
                });
        }
        return SuccessPromise;
    }
}

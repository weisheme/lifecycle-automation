import { AutomationContextAware, HandlerContext, logger } from "@atomist/automation-client";
import { CommandInvocation } from "@atomist/automation-client/internal/invoker/Payload";
import { AutomationEventListenerSupport } from "@atomist/automation-client/server/AutomationEventListener";
import * as _ from "lodash";
import * as graphql from "../typings/types";

// tslint:disable-next-line:no-var-requires
const Intercom = require("intercom-client");

export class IntercomAutomationEventListener extends AutomationEventListenerSupport {

    private client;

    constructor(private token: string) {
        super();
        this.client = new Intercom.Client({ token });
    }

    public commandStarting(payload: CommandInvocation, ctx: HandlerContext) {
        if (ctx && ctx.graphClient && ctx.userId) {
            ctx.graphClient.executeQueryFromFile<graphql.EMailAndGitHubIdByUserId.Query,
                graphql.EMailAndGitHubIdByUserId.Variables > (
                "graphql/query/emailAndGitHubIdByUserId",
                { userId: ctx.userId })
                .then(result => {
                    if (result.ChatId && result.ChatId[0] && result.ChatId[0].person) {
                        const email = _.get(result, "ChatId[0].person.emails[0].address");
                        const login = _.get(result, "ChatId[0].person.gitHubId.login");
                        const name = `${result.ChatId[0].person.forename} ${result.ChatId[0].person.surname}`;

                        if (email) {

                            logger.info(
                                `Updating intercom activity for email '${email}', login '${login}' and name '${name}'`);

                            const actx = ctx as any as AutomationContextAware;
                            this.client.users.create({
                                name,
                                email,
                                user_id: login,
                                update_last_request_at: true,
                                new_session: true,
                                custom_attributes: {
                                    team_id: ctx.teamId,
                                    team_name: actx.context.teamName,
                                },
                            })
                            .then(() => {
                                return this.client.users.find({ email })
                                    .then(user => {
                                        if (user && user.body) {
                                            if (!user.body.signed_up_at || user.body.signed_up_at == null) {
                                                this.client.users.create({
                                                    email,
                                                    signed_up_at: Math.floor(Date.now() / 1000),
                                                });
                                            }
                                        }
                                        return Promise.resolve();
                                    });
                            })
                            .then(() => {
                                return this.client.events.create({
                                    event_name: "slack.command",
                                    created_at: Math.floor(Date.now() / 1000),
                                    email,
                                    metadata: {
                                        name: `${actx.context.name}@${actx.context.version}`,
                                        command: actx.context.operation,
                                        team_id: ctx.teamId,
                                        team_name: actx.context.teamName,
                                    },
                                });
                            });
                        }
                    }
                });
        }
    }
}

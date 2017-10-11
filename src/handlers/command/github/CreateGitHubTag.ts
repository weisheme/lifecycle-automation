import {
    CommandHandler,
    MappedParameter,
    Parameter,
    Secret,
    Tags,
} from "@atomist/automation-client/decorators";
import {
    HandleCommand,
    HandlerContext,
    HandlerResult,
    MappedParameters,
    Secrets,
    Success,
} from "@atomist/automation-client/Handlers";
import * as _ from "lodash";
import * as graphql from "../../../typings/types";
import * as github from "./gitHubApi";

@CommandHandler("Create a tag on GitHub", "create tag")
@Tags("github", "tag")
export class CreateGitHubTag implements HandleCommand {

    @Parameter({
        displayName: "Tag",
        description: "tag to create",
        pattern: /^\w(?:[-.\w/]*\w)*$/,
        validInput: "valid git tag, starting and ending with a alphanumeric character and containing alphanumeric,"
        + "_, -, ., and / characters",
        minLength: 1,
        maxLength: 100,
    })
    public tag: string;

    @Parameter({
        displayName: "SHA",
        description: "commit SHA to create tag on",
        pattern: /^[a-f0-9]+$/,
        validInput: "",
        minLength: 7,
        maxLength: 40,
    })
    public sha: string;

    @Parameter({
        displayName: "Message",
        description: "message for the annotated tag",
        pattern: /^.*$/,
        validInput: "arbitrary string",
        minLength: 0,
        maxLength: 200,
        required: false,
    })
    public message: string = "";

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubApiUrl)
    public apiUrl: string = "https://api.github.com/";

    @MappedParameter(MappedParameters.SlackUser)
    public requester: string;

    @Secret(Secrets.userToken(["repo"]))
    public githubToken: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {

        return ctx.graphClient.executeFile<graphql.ChatId.Query, graphql.ChatId.Variables>("graphql/query/chatId",
            { teamId: ctx.teamId, chatId: this.requester })
            .then(result => {
                const person = _.get(result, "ChatTeam[0].members[0].person") as graphql.ChatId.Person;
                if (person) {
                    return person;
                } else {
                    return null;
                }
            })
            .then(person => {
                const tagger = {
                    name: person.gitHubId && person.gitHubId.name ? person.gitHubId.name : "Atomist Bot",
                    email: person.emails && person.emails.length > 0 ? person.emails[0].address : "bot@atomist.com",
                    date: new Date().toISOString(),
                };
                return (github.api(this.githubToken, this.apiUrl).gitdata as any).createTag({
                    owner: this.owner,
                    repo: this.repo,
                    tag: this.tag,
                    message: this.message,
                    object: this.sha,
                    type: "commit",
                    tagger,
                });
            })
            .then(() => {
                return github.api(this.githubToken, this.apiUrl).gitdata.createReference({
                    owner: this.owner,
                    repo: this.repo,
                    ref: `refs/tags/${this.tag}`,
                    sha: this.sha,
                });
            })
            .then(() => Success)
            .catch(err => ({ code: 1, message: err.message, stack: err.stack }));
    }
}

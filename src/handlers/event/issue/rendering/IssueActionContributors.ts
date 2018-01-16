import { ApolloGraphClient } from "@atomist/automation-client/graph/ApolloGraphClient";
import {
    buttonForCommand,
    menuForCommand,
    MenuSpecification,
} from "@atomist/automation-client/spi/message/MessageClient";
import { Action } from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import {
    AbstractIdentifiableContribution,
    ActionContributor,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import { AssignToMe, AssignToMeGitHubIssue } from "../../../command/github/AssignToMeGitHubIssue";
import { LifecycleActionPreferences } from "../../preferences";

export abstract class AbstractIssueActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    public supports(node: any): boolean {
        return node.title && node.state === "open";
    }

    public buttonsFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const buttons = [];

        if (context.rendererId === "issue") {
            const button = this.createButton(issue, repo);
            if (button != null) {
                buttons.push(button);
            }
        }
        return Promise.resolve(buttons);
    }

    public menusFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const menus = [];

        if (context.rendererId === "issue") {
            const menu = this.createMenu(issue, repo);
            if (menu != null) {
                menus.push(menu);
            }
        }
        return Promise.resolve(menus);
    }

    protected createButton(issue: graphql.IssueToIssueLifecycle.Issue,
                           repo: graphql.IssueToIssueLifecycle.Repo): Action {
        return null;
    }

    protected createMenu(issue: graphql.IssueToIssueLifecycle.Issue,
                         repo: graphql.IssueToIssueLifecycle.Repo): Action {
        return null;
    }
}

export class DisplayAssignActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super(LifecycleActionPreferences.issue.assign.id);
    }

    public supports(node: any): boolean {
        return node.title && node.state === "open";
    }

    public buttonsFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        if (context.rendererId === "issue") {
            if (!context.has("show_assign")) {
                return Promise.resolve([
                    buttonForCommand({ text: "Assign \u02C5" },
                        "DisplayGitHubIssue",
                        {
                            repo: repo.name,
                            owner: repo.owner,
                            issue: issue.number,
                            showMore: "assign_+",
                        }),
                ]);
            } else {
                return Promise.resolve([
                    buttonForCommand({ text: "Assign \u02C4" },
                        "DisplayGitHubIssue",
                        {
                            repo: repo.name,
                            owner: repo.owner,
                            issue: issue.number,
                            showMore: "assign_-",
                        }),
                ]);
            }
        }
        return Promise.resolve([]);
    }

    public menusFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }
}

export class AssignToMeActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super(LifecycleActionPreferences.issue.assign.id);
    }

    public supports(node: any): boolean {
        return node.title && node.state === "open";
    }

    public menusFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }

    public buttonsFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");

        if (context.rendererId === "assign" && context.has("show_assign")) {
            const handler = new AssignToMeGitHubIssue();
            handler.repo = repo.name;
            handler.owner = repo.owner;
            handler.issue = issue.number;
            handler.assignee = AssignToMe;
            return Promise.resolve([
                buttonForCommand({ text: "Assign to Me" }, handler),
            ]);
        }
        return Promise.resolve([]);
    }
}

export class AssignActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super(LifecycleActionPreferences.issue.assign.id);
    }

    public supports(node: any): boolean {
        return node.title && node.state === "open";
    }

    public buttonsFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }

    public menusFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");

        if (context.rendererId === "assign" && context.has("show_assign")) {
            const client = new ApolloGraphClient("https://api.github.com/graphql",
                { Authorization: `bearer ${context.orgToken}` });

            return client.executeQueryFromFile("suggestedAssignees",
                { owner: repo.owner, name: repo.name },
                {},
                __dirname)
                .then(result => {
                    const assignees = issue.assignees.map(a => a.login);
                    const suggestedAssignees = (_.get(result, "repository.assignableUsers.nodes") || [])
                        .map(a => a.login)
                        .filter(a => !assignees.includes(a))
                        .sort((a1, a2) => a1.localeCompare(a2));

                    const menu: MenuSpecification = {
                        text: "Assign",
                        options: [
                            {
                                text: "Unassign",
                                options: assignees.map(l => ({ text: l, value: l })),
                            },
                            {
                                text: "Assign",
                                options: suggestedAssignees.map(l => ({ text: l, value: l})),
                            },
                        ],
                    };

                    const handler = new AssignToMeGitHubIssue();
                    handler.repo = repo.name;
                    handler.owner = repo.owner;
                    handler.issue = issue.number;
                    return [
                        menuForCommand(menu, handler, "assignee"),
                    ];
                });
        }
        return Promise.resolve([]);
    }
}

export class LabelActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super(LifecycleActionPreferences.issue.label.id);
    }

    public supports(node: any): boolean {
        return node.title && node.state === "open";
    }

    public buttonsFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        return Promise.resolve([]);
    }

    public menusFor(issue: graphql.IssueToIssueLifecycle.Issue, context: RendererContext): Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");

        if (context.rendererId === "issue") {
            let options = [];
            if (repo.labels != null && repo.labels.length > 0) {
                const labels = [...repo.labels];
                labels.sort((l1, l2) => l1.name.localeCompare(l2.name))
                    .forEach(l => options.push({ text: l.name, value: l.name }));
            } else {
                options = [{ text: "bug", value: "bug" }, { text: "duplicate", value: "duplicate" },
                    { text: "enhancement", value: "enhancement" }, { text: "help wanted", value: "help wanted" },
                    { text: "invalid", value: "invalid" }, { text: "question", value: "question" },
                    { text: "wontfix", value: "wontfix" }];
            }

            const existingLabels = (issue.labels != null ?
                issue.labels.sort((l1, l2) => l1.name.localeCompare(l2.name))
                    .map(l => l.name) : []);
            const unusedLabels = options.filter(l => existingLabels.indexOf(l.text) < 0);

            const menu: MenuSpecification = {
                text: "Label",
                options: [{
                    text: "Remove", options: existingLabels.map(l => {
                        return { text: l, value: l };
                    }),
                },
                    { text: "Add", options: unusedLabels },
                ],
            };

            return Promise.resolve([
                menuForCommand(menu,
                    "ToggleLabelGitHubIssue", "label",
                    { issue: issue.number, repo: repo.name, owner: repo.owner }),
            ]);
        }
        return Promise.resolve([]);
    }
}

export class CloseActionContributor extends AbstractIssueActionContributor
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super(LifecycleActionPreferences.issue.close.id);
    }

    protected createButton(issue: graphql.IssueToIssueLifecycle.Issue,
                           repo: graphql.IssueToIssueLifecycle.Repo): Action {
        return buttonForCommand({ text: "Close" },
            "CloseGitHubIssue", { issue: issue.number, repo: repo.name, owner: repo.owner });
    }
}

export class CommentActionContributor extends AbstractIssueActionContributor
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super(LifecycleActionPreferences.issue.comment.id);
    }

    protected createButton(issue: graphql.IssueToIssueLifecycle.Issue,
                           repo: graphql.IssueToIssueLifecycle.Repo): Action {
        return buttonForCommand({ text: "Comment" },
            "CommentGitHubIssue", { issue: issue.number, repo: repo.name, owner: repo.owner });
    }
}

export class ReactionActionContributor extends AbstractIssueActionContributor
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super(LifecycleActionPreferences.issue.thumps_up.id);
    }

    protected createButton(issue: graphql.IssueToIssueLifecycle.Issue,
                           repo: graphql.IssueToIssueLifecycle.Repo): Action {
        return buttonForCommand({ text: ":+1:" },
            "ReactGitHubIssue", { issue: issue.number, repo: repo.name, owner: repo.owner, reaction: "+1" });
    }
}

export class ReopenActionContributor extends AbstractIssueActionContributor
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super(LifecycleActionPreferences.issue.reopen.id);
    }

    public supports(node: any): boolean {
        return node.title && node.state === "closed";
    }

    protected createButton(issue: graphql.IssueToIssueLifecycle.Issue,
                           repo: graphql.IssueToIssueLifecycle.Repo): Action {
        return buttonForCommand({ text: "Reopen" },
            "ReopenGitHubIssue", { issue: issue.number, repo: repo.name, owner: repo.owner });
    }
}

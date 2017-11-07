import {
    buttonForCommand,
    menuForCommand,
    MenuSpecification,
} from "@atomist/automation-client/spi/message/MessageClient";
import { Action } from "@atomist/slack-messages/SlackMessages";
import {
    AbstractIdentifiableContribution,
    ActionContributor,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";

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

export class AssignActionContributor extends AbstractIssueActionContributor
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super("assign");
    }

    protected createButton(issue: graphql.IssueToIssueLifecycle.Issue, repo: any): Action {
        return buttonForCommand({ text: "Assign to Me" },
            "AssignToMeGitHubIssue", { issue: issue.number, repo: repo.name, owner: repo.owner });
    }
}

export class LabelActionContributor extends AbstractIssueActionContributor
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super("label");
    }

    protected createMenu(issue: graphql.IssueToIssueLifecycle.Issue, repo: graphql.IssueToIssueLifecycle.Repo): Action {
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

        const existingLabels = (issue.labels != null ? issue.labels.
            sort((l1, l2) => l1.name.localeCompare(l2.name)).map(l => l.name) : []);
        const unusedLabels = options.filter(l => existingLabels.indexOf(l.text) < 0);

        const menu: MenuSpecification = {
            text: "Label",
            options: [{
                text: "\u2611", options: existingLabels.map(l => {
                    return { text: l, value: l };
                }),
            },
            { text: "\u2610", options: unusedLabels },
            ],
        };

        return menuForCommand(menu,
            "ToggleLabelGitHubIssue", "label",
            { issue: issue.number, repo: repo.name, owner: repo.owner });
    }
}

export class CloseActionContributor extends AbstractIssueActionContributor
    implements ActionContributor<graphql.IssueToIssueLifecycle.Issue> {

    constructor() {
        super("close");
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
        super("comment");
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
        super("reaction");
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
        super("reopen");
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

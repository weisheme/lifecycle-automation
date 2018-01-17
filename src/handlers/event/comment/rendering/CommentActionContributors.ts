import {
    buttonForCommand,
    menuForCommand,
    MenuSpecification,
} from "@atomist/automation-client/spi/message/MessageClient";
import { Action } from "@atomist/slack-messages/SlackMessages";
import {
    AbstractIdentifiableContribution, ActionContributor,
    RendererContext,
} from "../../../../lifecycle/Lifecycle";
import * as graphql from "../../../../typings/types";
import { LifecycleActionPreferences } from "../../preferences";

export abstract class AbstractCommentActionContributor extends AbstractIdentifiableContribution
    implements ActionContributor<any> {

    constructor(private identifier: string, private forIssue: boolean, private forPr: boolean) {
        super(identifier);
    }

    public supports(node: any): boolean {
        if (node.body && (node.issue || node.pullRequest)) {
            const comment = node as any;
            return (comment.issue != null && comment.issue.state === "open")
                || (comment.pullRequest != null && comment.pullRequest.state === "open");

        } else {
            return false;
        }
    }

    public buttonsFor(comment: any, context: RendererContext):
        Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const issue = context.lifecycle.extract("issue");
        const pr = context.lifecycle.extract("pullrequest");

        const buttons = [];

        if (context.rendererId === "issue_comment" || context.rendererId === "pullrequest_comment") {
            let button;

            if (this.forIssue && issue != null) {
                button = this.createButton(comment, issue.number, repo);
            } else if (this.forPr && pr != null) {
                button = this.createButton(comment, pr.number, repo);
            }

            if (button != null) {
                buttons.push(button);
            }
        }
        return Promise.resolve(buttons);
    }

    public menusFor(comment: any, context: RendererContext)
        : Promise<Action[]> {
        const repo = context.lifecycle.extract("repo");
        const issue = context.lifecycle.extract("issue");
        const pr = context.lifecycle.extract("pullrequest");

        const menues = [];

        if (context.rendererId === "issue_comment" || context.rendererId === "pullrequest_comment") {
            let menu;

            if (this.forIssue && issue != null) {
                menu = this.createMenu(comment, issue.number, issue.labels, repo);
            } else if (this.forPr && pr != null) {
                menu = this.createMenu(comment, pr.number, (pr as any).labels, repo);
            }

            if (menu != null) {
                menues.push(menu);
            }
        }
        return Promise.resolve(menues);
    }

    protected abstract createButton(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                                    repo: graphql.CommentToIssueCommentLifecycle.Repo): Action;

    protected abstract createMenu(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                                  labels: graphql.CommentToIssueCommentLifecycle.Labels[],
                                  repo: graphql.CommentToIssueCommentLifecycle.Repo): Action;
}

export class DetailsActionContributor extends AbstractCommentActionContributor
    implements ActionContributor<graphql.CommentToIssueCommentLifecycle.Comment> {

    constructor() {
        super(LifecycleActionPreferences.comment.details.id, true, false);
    }

    protected createButton(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                           repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return buttonForCommand({ text: "Details" },
            "DisplayGitHubIssue",
            {
                repo: repo.name,
                owner: repo.owner,
                issue: comment.issue.number,
            });
    }

    protected createMenu(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                         labels: graphql.CommentToIssueCommentLifecycle.Labels[],
                         repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return null;
    }
}

export class AssignActionContributor extends AbstractCommentActionContributor
    implements ActionContributor<graphql.CommentToIssueCommentLifecycle.Comment> {

    constructor() {
        super(LifecycleActionPreferences.comment.assign.id, true, false);
    }

    protected createButton(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                           repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return buttonForCommand({ text: "Assign to Me" }, "AssignToMeGitHubIssue", {
            issue: id,
            repo: repo.name,
            owner: repo.owner,
        });
    }

    protected createMenu(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                         labels: graphql.CommentToIssueCommentLifecycle.Labels[],
                         repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return null;
    }
}

export class LabelActionContributor extends AbstractCommentActionContributor
    implements ActionContributor<graphql.CommentToIssueCommentLifecycle.Comment> {

    constructor() {
        super(LifecycleActionPreferences.comment.label.id, true, false);
    }

    protected createButton(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                           repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return null;
    }

    protected createMenu(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                         labels: graphql.CommentToIssueCommentLifecycle.Labels[],
                         repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        let options = [];
        if (repo.labels != null && repo.labels.length > 0) {
            repo.labels.sort((l1, l2) => l1.name.localeCompare(l2.name))
                .forEach(l => options.push({ text: l.name, value: l.name }));
        } else {
            options = [{ text: "bug", value: "bug" }, { text: "duplicate", value: "duplicate" },
            { text: "enhancement", value: "enhancement" }, { text: "help wanted", value: "help wanted" },
            { text: "invalid", value: "invalid" }, { text: "question", value: "question" },
            { text: "wontfix", value: "wontfix" }];
        }

        const existingLabels = (labels != null ? labels.
            sort((l1, l2) => l1.name.localeCompare(l2.name)).map(l => l.name) : []);
        const unusedLabels = options.filter(l => existingLabels.indexOf(l.text) < 0);

        const menu: MenuSpecification = {
            text: "Label",
            options: [{
                text: "Remove",
                options: existingLabels.map(l => ({ text: l, value: l })),
            },
            {
                text: "Add",
                options: unusedLabels },
            ],
        };

        return menuForCommand(menu, "ToggleLabelGitHubIssue", "label", {
            issue: id,
            repo: repo.name,
            owner: repo.owner,
        });
    }
}

export class CloseActionContributor extends AbstractCommentActionContributor
    implements ActionContributor<graphql.CommentToIssueCommentLifecycle.Comment> {

    constructor() {
        super(LifecycleActionPreferences.comment.close.id, true, false);
    }

    protected createButton(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                           repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return buttonForCommand({ text: "Close" }, "CloseGitHubIssue", {
            issue: id,
            repo: repo.name,
            owner: repo.owner,
        });
    }

    protected createMenu(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                         labels: graphql.CommentToIssueCommentLifecycle.Labels[],
                         repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return null;
    }
}

export class CommentActionContributor extends AbstractCommentActionContributor
    implements ActionContributor<graphql.CommentToIssueCommentLifecycle.Comment> {

    constructor() {
        super(LifecycleActionPreferences.comment.comment.id, true, true);
    }

    protected createButton(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                           repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return buttonForCommand({ text: "Comment" }, "CommentGitHubIssue", {
            issue: id,
            repo: repo.name,
            owner: repo.owner,
        });
    }

    protected createMenu(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                         labels: graphql.CommentToIssueCommentLifecycle.Labels[],
                         repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return null;
    }
}

export class ReactionActionContributor extends AbstractCommentActionContributor
    implements ActionContributor<graphql.CommentToIssueCommentLifecycle.Comment> {

    constructor() {
        super(LifecycleActionPreferences.comment.thumps_up.id, true, true);
    }

    protected createButton(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                           repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return buttonForCommand({ text: ":+1:" }, "ReactGitHubIssueComment", {
            comment: comment.gitHubId,
            repo: repo.name,
            owner: repo.owner,
            reaction: "+1",
        });
    }

    protected createMenu(comment: graphql.CommentToIssueCommentLifecycle.Comment, id: number,
                         labels: graphql.CommentToIssueCommentLifecycle.Labels[],
                         repo: graphql.CommentToIssueCommentLifecycle.Repo): Action {
        return null;
    }
}

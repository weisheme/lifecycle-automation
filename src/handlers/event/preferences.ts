export const LifecyclePreferences = {

    key: "lifecycles",

    push: {
        id: "push",
        name: "Push Lifecycle",
        description: "Lifecycle messages for GitHub pushes, including builds, status etc",
    },
    issue: {
        id: "issue",
        name: "Issue Lifecycle",
        description: "Lifecycle messages for GitHub issues",
    },
    pull_request: {
        id: "pull_request",
        name: "Pull Request Lifecycle",
        description: "Lifecycle messages for GitHub pull requests",
    },
    comment: {
        id: "comment",
        name: "Comment Lifecycle",
        description: "Lifecycle messages for GitHub issues and pull request comments",
    },
    review: {
        id: "review",
        name: "Review Lifecycle",
        description: "Lifecycle messages for GitHub pull request reviews",
    },

};

export const LifecycleActionPreferences = {

    key: "lifecycle_actions",

    push: {
        restart_build: {
            id: "restart_build",
            name: "Restart Failed Builds",
            description: "Restart a failed build on the connected CI system",
        },
        release: {
            id: "release",
            name: "GitHub Release",
            description: "Create a release on GitHub for the given Git tag",
        },
        tag: {
            id: "tag",
            name: "Git Tag",
            description: "Create a Git tag",
        },
        raise_pullrequest: {
            id: "raise_pullrequest",
            name: "Raise GitHub Pull Request",
            description: "Raise a GitHub pull request for any pushes to non-default branches",
        },
        cf_application: {
            id: "cf_application",
            name: "Manage Cloud Foundry Applications",
            description: "Start, Stop, Scale and retrieve application information for Cloud Foundry applications",
        },
    },

    comment: {
        assign: {
            id: "assign",
            name: "Assign To Me",
            description: "Assign GitHub issues to me",
        },
        label: {
            id: "label",
            name: "Toggle Labels",
            description: "Add or remove labels to GitHub issue",
        },
        close: {
            id: "close",
            name: "Close Issue",
            description: "Close GitHub issue",
        },
        comment: {
            id: "comment",
            name: "Add Comment",
            description: "Add comment to GitHub issue and pull request",
        },
        thumps_up: {
            id: "thumps_up",
            name: "Add :+1: Reaction",
            description: "Add reaction to GitHub issue or pull request comment",
        },
    },

    issue: {
        assign: {
            id: "assign",
            name: "Assign To Me",
            description: "Assign GitHub issues to me",
        },
        label: {
            id: "label",
            name: "Toggle Labels",
            description: "Add or remove labels to GitHub issue",
        },
        close: {
            id: "close",
            name: "Close Issue",
            description: "Close GitHub issue",
        },
        comment: {
            id: "comment",
            name: "Add Comment",
            description: "Add comment to GitHub issue",
        },
        thumps_up: {
            id: "thumps_up",
            name: "Add :+1: Reaction",
            description: "Add reaction to GitHub issue",
        },
        reopen: {
            id: "reopen",
            name: "Reopen Issue",
            description: "Reopen GitHub issue",
        },
    },

    pull_request: {
        merge: {
            id: "merge",
            name: "Merge Pull Request",
            description: "Merge GitHub pull request",
        },
        auto_merge: {
            id: "auto_merge",
            name: "Auto Merge Pull Request",
            description: "Auto merge a GitHub pull request after successful status checks and reviews",
        },
        approve: {
            id: "approve",
            name: "Approve Breaking Change",
            description: "Approve a breaking fingerprint change",
        },
        delete: {
            id: "delete",
            name: "Delete Branch",
            description: "Delete a GitHub branch",
        },
        comment: {
            id: "comment",
            name: "Add Comment",
            description: "Add comment on GitHub pull request",
        },
        thumps_up: {
            id: "thumps_up",
            name: "Add :+1: Reaction",
            description: "Add reaction to GitHub issue",
        },
        assign_reviewer: {
            id: "assign_reviewer",
            name: "Assign Pull Request Reviewer",
            description: "Assign reviewer to GitHub pull request",
        },
    },

    review: {
        comment: {
            id: "comment",
            name: "Add Comemnt",
            description: "Add comment on GitHub review",
        },
    },

};

export const DirectMessagePreferences = {

    key: "dm",

    build: {
        id: "build",
        name: "Failed Builds",
        description: "DM me when my build fails",
    },
    mention: {
        id: "mention",
        name: "@-Mentions",
        description: "DM me when someone @-mentions me in issues or pull requests",
    },
    assignee: {
        id: "assignee",
        name: "Assignments",
        description: "DM me when someone assigns me an issue or pull request",
    },
    review: {
        id: "review",
        name: "Review Comments",
        description: "DM me when I get new review comments on my pull requests",
    },
    reviewee: {
        id: "reviewee",
        name: "Review Requests",
        description: "DM me when I'm asked to review a pull request",
    },
    prUpdates: {
        id: "prUpdates",
        name: "Commits to reviewed Pull Requests",
        description: "DM me when a commit is pushed to a pull request that I'm reviewing",
    },
    merge: {
        id: "merge",
        name: "Pull Request Merges",
        description: "DM me when my pull request is manually or automatically merged",
    },
    mapRepo: {
        id: "mapRepo",
        name: "Map Repository To Channel",
        description: "DM me when my commits are pushed to a repository not mapped to a chat channel",
    },

};

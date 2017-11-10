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
            name: "Add Comment (on Pull Request)",
            description: "Add comment on GitHub pull request",
        },
        thumps_up: {
            id: "thumps_up",
            name: "Add :+1: Reaction (on Pull Request)",
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

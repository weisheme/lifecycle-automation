export const DirectMessagePreferences = {

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

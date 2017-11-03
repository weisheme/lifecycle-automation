import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import { githubToSlack } from "@atomist/slack-messages/Markdown";
import {
    bold,
    SlackMessage,
    url,
} from "@atomist/slack-messages/SlackMessages";
import * as _ from "lodash";
import { DirectMessagePreferences } from "../handlers/command/preferences/preferences";
import * as graphql from "../typings/types";
import {
    avatarUrl,
    commitUrl,
    getGitHubUsers,
    isAssigner,
    isDmDisabled,
    issueUrl,
    linkGitHubUsers,
    linkIssues,
    loadChatIdByGitHubId,
    prUrl,
    repoAndChannelFooter,
    repoSlug,
    repoUrl,
    reviewUrl,
    truncateCommitMessage,
    userUrl,
} from "./helpers";

export function issueNotification(
    id: string, prefix: string, body: string, login: string, issue: graphql.NotifyMentionedOnIssue.Issue,
    repo: graphql.NotifyMentionedOnIssue.Repo, ctx: HandlerContext): Promise<any[]> {

    const matches = getGitHubUsers(body);
    return linkGitHubUsers(githubToSlack(body), ctx)
        .then(b => {
            if (matches != null) {
                return Promise.all(matches.map(m => {
                    return loadChatIdByGitHubId(ctx, m)
                        .then(notifier => {
                            if (m !== login
                                && notifier
                                && !isDmDisabled(notifier, DirectMessagePreferences.mention.id)) {
                                // tslint:disable-next-line:variable-name
                                const footer_icon = `https://images.atomist.com/rug/issue-${issue.state}.png`;
                                const text = `${prefix} ${url(issueUrl(repo, issue),
                                    bold(`#${issue.number}: ${issue.title}`))}`;
                                const slackMessage: SlackMessage = {
                                    text,
                                    attachments: [
                                        {
                                            author_name: `@${login}`,
                                            author_link: userUrl(repo, login),
                                            author_icon: avatarUrl(repo, login),
                                            text: linkIssues(b, repo),
                                            mrkdwn_in: ["text"],
                                            fallback: `${prefix} #${issue.number}: ${issue.title}`,
                                            footer: repoAndChannelFooter(repo),
                                            footer_icon,
                                            ts: Math.floor(new Date().getTime() / 1000),
                                        },
                                    ],
                                };
                                const msgId =
                                    // tslint:disable-next-line:max-line-length
                                    `user_message/issue/mention/${notifier.screenName}/${repo.owner}/${repo.name}/${id}`;
                                return ctx.messageClient.addressUsers(slackMessage, notifier.screenName, { id: msgId });
                            }
                            return Promise.resolve(null);
                        });
                }));
            }
            return Promise.resolve(null);
        });
}

export function prNotification(
    id: string, prefix: string, body: string, login: string, pr: graphql.NotifyMentionedOnPullRequest.PullRequest,
    repo: graphql.NotifyMentionedOnPullRequest.Repo, ctx: HandlerContext): Promise<any[]> {

    const state = (pr.state === "closed" ? (pr.merged ? "merged" : "closed") : "open");

    const matches = getGitHubUsers(body);
    return linkGitHubUsers(githubToSlack(body), ctx)
        .then(b => {
            if (matches != null) {
                return Promise.all(matches.map(m => {
                    return loadChatIdByGitHubId(ctx, m)
                        .then(notifier => {
                            if (m !== login
                                && notifier
                                && !isDmDisabled(notifier, DirectMessagePreferences.mention.id)) {
                                // tslint:disable-next-line:variable-name
                                const footer_icon = `https://images.atomist.com/rug/pull-request-${state}.png`;
                                const text = `${prefix} ${url(prUrl(repo, pr),
                                    bold(`#${pr.number}: ${pr.title}`))}`;
                                const slackMessage: SlackMessage = {
                                    text,
                                    attachments: [
                                        {
                                            author_name: `@${pr.author.login}`,
                                            author_link: userUrl(repo, login),
                                            author_icon: avatarUrl(repo, login),
                                            text: linkIssues(b, repo),
                                            mrkdwn_in: ["text"],
                                            fallback: `${prefix} #${pr.number}: ${pr.title}`,
                                            footer: repoAndChannelFooter(repo),
                                            footer_icon,
                                            ts: Math.floor(new Date().getTime() / 1000),
                                        },
                                    ],
                                };
                                const msgId =
                                    // tslint:disable-next-line:max-line-length
                                    `user_message/pullrequest/mention/${notifier.screenName}/${repo.owner}/${repo.name}/${id}`;
                                return ctx.messageClient.addressUsers(slackMessage, notifier.screenName, { id: msgId });
                            }
                            return Promise.resolve(null);
                        });
                }));
            }
            return Promise.resolve(null);
        });
}

export function issueAssigneeNotification(
    id: string, prefix: string, body: string, assignee: graphql.NotifyMentionedOnIssue.Assignees,
    issue: graphql.NotifyMentionedOnIssue.Issue, repo: graphql.NotifyMentionedOnIssue.Repo,
    ctx: HandlerContext): Promise<any> {

    return linkGitHubUsers(githubToSlack(body), ctx)
        .then(b => {
            const screenName = _.get(assignee, "person.chatId.screenName");
            if (!isAssigner(issue, assignee.login)
                && screenName
                && issue.openedBy.login !== assignee.login
                && !isDmDisabled(assignee.person.chatId, DirectMessagePreferences.assignee.id)) {
                // tslint:disable-next-line:variable-name
                const footer_icon = `https://images.atomist.com/rug/issue-${issue.state}.png`;
                const text = `${prefix} ${url(issueUrl(repo, issue),
                    bold(`#${issue.number}: ${issue.title}`))}`;
                const slackMessage: SlackMessage = {
                    text,
                    attachments: [
                        {
                            author_name: `@${issue.openedBy.login}`,
                            author_link: userUrl(repo, issue.openedBy.login),
                            author_icon: avatarUrl(repo, issue.openedBy.login),
                            text: linkIssues(b, repo),
                            mrkdwn_in: ["text"],
                            fallback: `${prefix} #${issue.number}: ${issue.title}`,
                            footer: repoAndChannelFooter(repo),
                            footer_icon,
                            ts: Math.floor(new Date().getTime() / 1000),
                        },
                    ],
                };
                const msgId =
                    `user_message/issue/assignee/${screenName}/${repo.owner}/${repo.name}/${id}`;
                return ctx.messageClient.addressUsers(slackMessage, screenName, { id: msgId });
            }
            return Promise.resolve(null);
        });
}

export function prAssigneeNotification(
    id: string, prefix: string, body: string, assignee: graphql.NotifyMentionedOnPullRequest.Assignees,
    pr: graphql.NotifyMentionedOnPullRequest.PullRequest, repo: graphql.NotifyMentionedOnIssue.Repo,
    ctx: HandlerContext): Promise<any> {

    const state = (pr.state === "closed" ? (pr.merged ? "merged" : "closed") : "open");

    return linkGitHubUsers(githubToSlack(body), ctx)
        .then(b => {
            const screenName = _.get(assignee, "person.chatId.screenName");
            if (!isAssigner(pr, assignee.login)
                && screenName
                && pr.author.login !== assignee.login
                && !isDmDisabled(assignee.person.chatId, DirectMessagePreferences.assignee.id)) {
                // tslint:disable-next-line:variable-name
                const footer_icon = `https://images.atomist.com/rug/pull-request-${state}.png`;
                const text = `${prefix} ${url(prUrl(repo, pr),
                    bold(`#${pr.number}: ${pr.title}`))}`;
                const slackMessage: SlackMessage = {
                    text,
                    attachments: [
                        {
                            author_name: `@${pr.author.login}`,
                            author_link: userUrl(repo, pr.author.login),
                            author_icon: avatarUrl(repo, pr.author.login),
                            text: linkIssues(b, repo),
                            mrkdwn_in: ["text"],
                            fallback: `${prefix} #${pr.number}: ${pr.title}`,
                            footer: repoAndChannelFooter(repo),
                            footer_icon,
                            ts: Math.floor(new Date().getTime() / 1000),
                        },
                    ],
                };
                const msgId =
                    `user_message/pullrequest/assignee/${screenName}/${repo.owner}/${repo.name}/${id}`;
                return ctx.messageClient.addressUsers(slackMessage, screenName, { id: msgId });
            }
            return Promise.resolve(null);
        });
}

export function prRevieweeNotification(
    id: string, prefix: string, body: string, review: graphql.NotifyMentionedOnPullRequest.Reviewers,
    pr: graphql.NotifyMentionedOnPullRequest.PullRequest, repo: graphql.NotifyMentionedOnIssue.Repo,
    ctx: HandlerContext): Promise<any> {

    const state = (pr.state === "closed" ? (pr.merged ? "merged" : "closed") : "open");

    return linkGitHubUsers(githubToSlack(body), ctx)
        .then(b => {
            const login = _.get(review, "person.chatId.screenName");
            if (login
                && pr.author.login !== login
                && !isDmDisabled(review.person.chatId, DirectMessagePreferences.reviewee.id)) {
                // tslint:disable-next-line:variable-name
                const footer_icon = `https://images.atomist.com/rug/pull-request-${state}.png`;
                const text = `${prefix} ${url(prUrl(repo, pr),
                    bold(`#${pr.number}: ${pr.title}`))}`;
                const slackMessage: SlackMessage = {
                    text,
                    attachments: [
                        {
                            author_name: `@${pr.author.login}`,
                            author_link: userUrl(repo, pr.author.login),
                            author_icon: avatarUrl(repo, pr.author.login),
                            text: linkIssues(b, repo),
                            mrkdwn_in: ["text"],
                            fallback: `${prefix} #${pr.number}: ${pr.title}`,
                            footer: repoAndChannelFooter(repo),
                            footer_icon,
                            ts: Math.floor(new Date().getTime() / 1000),
                        },
                    ],
                };
                const msgId =
                    `user_message/pullrequest/reviewee/${login}/${repo.owner}/${repo.name}/${id}`;
                return ctx.messageClient.addressUsers(slackMessage, login, { id: msgId });
            }
            return Promise.resolve(null);
        });
}

export function prAuthorMergeNotification(
    id: string, pr: graphql.NotifyMentionedOnPullRequest.PullRequest, repo: graphql.NotifyMentionedOnPullRequest.Repo,
    ctx: HandlerContext): Promise<any> {

    const state = (pr.state === "closed" ? (pr.merged ? "merged" : "closed") : "open");

    const body = pr.body ? githubToSlack(pr.body) : undefined;
    return linkGitHubUsers(body, ctx)
        .then(b => {
            if (_.get(pr, "author.person.chatId.screenName")
                && !isDmDisabled(pr.author.person.chatId, DirectMessagePreferences.merge.id)
                && pr.merger && pr.merger.login !== pr.author.login) {
                const login = pr.author.person.chatId.screenName;
                // tslint:disable-next-line:variable-name
                const footer_icon = `https://images.atomist.com/rug/pull-request-${state}.png`;
                const text = `${url(userUrl(repo, pr.merger.login),
                    `@${pr.merger.login}`)} ${state} your pull request ${url(prUrl(repo, pr),
                        bold(`#${pr.number}: ${pr.title}`))}`;
                const slackMessage: SlackMessage = {
                    text,
                    attachments: [
                        {
                            author_name: `@${pr.author.login}`,
                            author_link: userUrl(repo, pr.author.login),
                            author_icon: avatarUrl(repo, pr.author.login),
                            text: linkIssues(b, repo),
                            mrkdwn_in: ["text"],
                            fallback: `Pull Request #${pr.number}: ${pr.title} ${state}`,
                            footer: repoAndChannelFooter(repo),
                            footer_icon,
                            ts: Math.floor(new Date().getTime() / 1000),
                        },
                    ],
                };
                const msgId =
                    `user_message/pullrequest/author/merge/${login}/${repo.owner}/${repo.name}/${id}`;
                return ctx.messageClient.addressUsers(slackMessage, login, { id: msgId });
            }
            return Promise.resolve(null);
        });
}

export function prAuthorReviewNotification(
    id: string, review: graphql.NotifyAuthorOnReview.Review,
    pr: graphql.NotifyAuthorOnReview.PullRequest, repo: graphql.NotifyAuthorOnReview.Repo,
    ctx: HandlerContext): Promise<any> {

    const state = (pr.state === "closed" ? (pr.merged ? "merged" : "closed") : "open");

    const body = review.body ? githubToSlack(review.body) : undefined;
    return linkGitHubUsers(body, ctx)
        .then(b => {
            if (_.get(pr, "author.person.chatId.screenName")
                && !isDmDisabled(pr.author.person.chatId, DirectMessagePreferences.review.id)
                && !review.by.some(r => r.login === pr.author.login)) {
                const login = pr.author.person.chatId.screenName;
                // tslint:disable-next-line:variable-name
                const footer_icon = `https://images.atomist.com/rug/pull-request-${state}.png`;
                const text = `${url(reviewUrl(repo, pr, review), "New review")}`
                    + ` on your ${state} pull request ${url(prUrl(repo, pr),
                        bold(`#${pr.number}: ${pr.title}`))}`;
                let color;
                let title;
                if (review.state === "approved") {
                    title = "Approved";
                    color = "#45B254";
                } else if (review.state === "changes_requested") {
                    title = "Changes requested";
                    color = "#D94649";
                } else {
                    title = _.upperFirst(review.state);
                    // color = "#cccc00";
                }
                const slackMessage: SlackMessage = {
                    text,
                    attachments: [
                        {
                            color,
                            title,
                            title_link: reviewUrl(repo, pr, review),
                            text: linkIssues(b, repo),
                            author_name: `@${review.by[0].login}`,
                            author_icon: avatarUrl(repo, review.by[0].login),
                            author_link: userUrl(repo, review.by[0].login),
                            fallback: `New review on #${pr.number} ${pr.title}`,
                            mrkdwn_in: ["text", "pretext"],
                            footer: repoAndChannelFooter(repo),
                            footer_icon,
                            ts: Math.floor(new Date().getTime() / 1000),
                        },
                    ],
                };
                const msgId =
                    `user_message/pullrequest/author/review/${login}/${repo.owner}/${repo.name}/${id}`;
                return ctx.messageClient.addressUsers(slackMessage, login, { id: msgId });
            }
            return Promise.resolve(null);
        });
}

export function buildNotification(build: graphql.NotifyPusherOnBuild.Build, repo: graphql.NotifyPusherOnBuild.Repo,
                                  ctx: HandlerContext): Promise<any> {

    const login = _.get(build, "commit.author.person.chatId.screenName");
    if (!login || isDmDisabled(build.commit.author.person.chatId, DirectMessagePreferences.build.id)) {
        return Promise.resolve(null);
    }

    const commit = build.commit;
    const slackMessage: SlackMessage = {
        // tslint:disable-next-line:max-line-length
        text: `${url(build.buildUrl, `Build #${build.name}`)} of your push to ${url(repoUrl(repo), repoSlug(repo))} failed`,
        attachments: [
            {
                author_name: `@${commit.author.login}`,
                author_link: userUrl(repo, commit.author.login),
                author_icon: avatarUrl(repo, commit.author.login),
                // tslint:disable-next-line:max-line-length
                text: "`" + url(commitUrl(repo, commit), commit.sha.substring(0, 7))
                    + "` " + truncateCommitMessage(commit.message, repo),
                mrkdwn_in: ["text"],
                fallback: `Build #${build.name} of your push failed`,
                color: "#D94649",
                footer: repoAndChannelFooter(repo),
                footer_icon: "http://images.atomist.com/rug/commit.png",
                ts: Math.floor(new Date().getTime() / 1000),
            },
        ],
    };
    const msgId =
        `user_message/build/${login}/${repo.owner}/${repo.name}/${build._id}`;
    return ctx.messageClient.addressUsers(slackMessage, login, { id: msgId });
}

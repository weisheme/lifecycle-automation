import { Configuration } from "@atomist/automation-client/configuration";
import { guid } from "@atomist/automation-client/internal/util/string";
import * as appRoot from "app-root-path";
import * as config from "config";
import { CloudFoundryApplicationDetail } from "./handlers/command/cloudfoundry/CloudFoundryApplicationDetail";
import { ScaleCloudFoundryApplication } from "./handlers/command/cloudfoundry/ScaleCloudFoundryApplication";
import { StartCloudFoundryApplication } from "./handlers/command/cloudfoundry/StartCloudFoundryApplication";
import { StopCloudFoundryApplication } from "./handlers/command/cloudfoundry/StopCloudFoundryApplication";
import { ApproveGitHubCommit } from "./handlers/command/github/ApproveGitHubCommit";
import { AssignGitHubPullRequestReviewer } from "./handlers/command/github/AssignGitHubPullRequestReviewer";
import { AssignToMeGitHubIssue } from "./handlers/command/github/AssignToMeGitHubIssue";
import { CloseGitHubIssue } from "./handlers/command/github/CloseGitHubIssue";
import { CommentGitHubIssue } from "./handlers/command/github/CommentGitHubIssue";
import { CreateGitHubIssue } from "./handlers/command/github/CreateGitHubIssue";
import { CreateGitHubRelease } from "./handlers/command/github/CreateGitHubRelease";
import { CreateGitHubTag } from "./handlers/command/github/CreateGitHubTag";
import { DeleteGitHubBranch } from "./handlers/command/github/DeleteGitHubBranch";
import { DisplayGitHubIssue } from "./handlers/command/github/DisplayGitHubIssue";
import { EnableGitHubPullRequestAutoMerge } from "./handlers/command/github/EnableGitHubPullRequestAutoMerge";
import {
    InstallGitHubOrgWebhook,
    InstallGitHubRepoWebhook,
} from "./handlers/command/github/InstallGitHubWebhook";
import { ListMyGitHubIssues } from "./handlers/command/github/ListMyGitHubIssues";
import { MergeGitHubPullRequest } from "./handlers/command/github/MergeGitHubPullRequest";
import { RaiseGitHubPullRequest } from "./handlers/command/github/RaiseGitHubPullRequest";
import { ReactGitHubIssue } from "./handlers/command/github/ReactGitHubIssue";
import { ReactGitHubIssueComment } from "./handlers/command/github/ReactGitHubIssueComment";
import { ReopenGitHubIssue } from "./handlers/command/github/ReopenGitHubIssue";
import { SearchGitHubRepositoryIssues } from "./handlers/command/github/SearchGitHubRepositoryIssues";
import { ToggleLabelGitHubIssue } from "./handlers/command/github/ToggleLabelGitHubIssue";
import {
    ConfigureDirectMessageUserPreferences,
} from "./handlers/command/preferences/ConfigureDirectMessageUserPreferences";
import { SetUserPreference } from "./handlers/command/preferences/SetUserPreference";
import { AssociateRepo } from "./handlers/command/slack/AssociateRepo";
import { CreateChannel } from "./handlers/command/slack/CreateChannel";
import { RestartTravisBuild } from "./handlers/command/travis/RestartTravisBuild";
import { NotifyPusherOnBuild } from "./handlers/event/build/NotifyPusherOnBuild";
import { CommentToIssueCommentLifecycle } from "./handlers/event/comment/CommentToIssueCommentLifecycle";
import { CommentToPullRequestCommentLifecycle } from "./handlers/event/comment/CommentToPullRequestCommentLifecycle";
import { IssueToIssueCommentLifecycle } from "./handlers/event/comment/IssueToIssueCommentLifecycle";
import { NotifyMentionedOnIssueComment } from "./handlers/event/comment/NotifyMentionedOnIssueComment";
import { NotifyMentionedOnPullRequestComment } from "./handlers/event/comment/NotifyMentionedOnPullRequestComment";
import {
    PullRequestToPullRequestCommentLifecycle,
} from "./handlers/event/comment/PullRequestToPullRequestCommentLifecycle";
import { IssueToIssueLifecycle } from "./handlers/event/issue/IssueToIssueLifecycle";
import { NotifyMentionedOnIssue } from "./handlers/event/issue/NotifyMentionedOnIssue";
import { StatusOnParentImpact } from "./handlers/event/parentimpact/StatusOnParentImpact";
import { AutoMergeOnBuild } from "./handlers/event/pullrequest/AutoMergeOnBuild";
import { AutoMergeOnPullRequest } from "./handlers/event/pullrequest/AutoMergeOnPullRequest";
import { AutoMergeOnReview } from "./handlers/event/pullrequest/AutoMergeOnReview";
import { AutoMergeOnStatus } from "./handlers/event/pullrequest/AutoMergeOnStatus";
import { BranchToPullRequestLifecycle } from "./handlers/event/pullrequest/BranchToPullRequestLifecycle";
import { CommentToPullRequestLifecycle } from "./handlers/event/pullrequest/CommentToPullRequestLifecycle";
import { CommitToPullRequestLifecycle } from "./handlers/event/pullrequest/CommitToPullRequestLifecycle";
import { NotifyMentionedOnPullRequest } from "./handlers/event/pullrequest/NotifyMentionedOnPullRequest";
import { PullRequestToPullRequestLifecycle } from "./handlers/event/pullrequest/PullRequestToPullRequestLifecycle";
import { ReviewToPullRequestLifecycle } from "./handlers/event/pullrequest/ReviewToPullRequestLifecycle";
import { StatusToPullRequestLifecycle } from "./handlers/event/pullrequest/StatusToPullRequestLifecycle";
import { ApplicationToPushLifecycle } from "./handlers/event/push/ApplicationToPushLifecycle";
import { BuildToPushLifecycle } from "./handlers/event/push/BuildToPushLifecycle";
import { IssueToPushLifecycle } from "./handlers/event/push/IssueToPushLifecycle";
import { K8PodToPushLifecycle } from "./handlers/event/push/K8PodToPushLifecycle";
import { NotifyBotOwnerOnPush } from "./handlers/event/push/NotifiyBotOwnerOnPush";
import { ParentImpactToPushLifecycle } from "./handlers/event/push/ParentImpactToPushLifecycle";
import { PushToPushLifecycle } from "./handlers/event/push/PushToPushLifecycle";
import { PushToUnmappedRepo } from "./handlers/event/push/PushToUnmappedRepo";
import { ReleaseToPushLifecycle } from "./handlers/event/push/ReleaseToPushLifecycle";
import { StatusToPushLifecycle } from "./handlers/event/push/StatusToPushLifecycle";
import { TagToPushLifecycle } from "./handlers/event/push/TagToPushLifecycle";
import { NotifyAuthorOnReview } from "./handlers/event/review/NotifyAuthorOnReview";
import { LogzioAutomationEventListener, LogzioOptions } from "./util/logzio";
import { GcCommand, HeapDumpCommand, initMemoryMonitoring, MemoryUsageCommand } from "./util/men";
import { appEnv, secret } from "./util/secrets";

// tslint:disable-next-line:no-var-requires
const pj = require(`${appRoot}/package.json`);

const token = secret("github.token", process.env.GITHUB_TOKEN);

const authEnabled = !appEnv.isLocal;

const logzioOptions: LogzioOptions = {
    applicationId: appEnv.app ? `cf.${appEnv.app.application_id}` : guid(),
    environmentId: appEnv.app ? `cf.${appEnv.app.space_name}` : "local",
    token: secret("logzio.token", process.env.LOGZIO_TOKEN),
};

export const configuration = {
    name: pj.name,
    version: pj.version,
    teamIds: config.get("teamIds"),
    groups: config.get("groups"),
    commands: [
        // cloudfoundry
        () => new CloudFoundryApplicationDetail(),
        () => new ScaleCloudFoundryApplication(),
        () => new StartCloudFoundryApplication(),
        () => new StopCloudFoundryApplication(),

        // github
        () => new ApproveGitHubCommit(),
        () => new AssignGitHubPullRequestReviewer(),
        () => new AssignToMeGitHubIssue(),
        () => new CloseGitHubIssue(),
        () => new CommentGitHubIssue(),
        () => new CreateGitHubIssue(),
        () => new CreateGitHubRelease(),
        () => new CreateGitHubTag(),
        () => new DeleteGitHubBranch(),
        () => new DisplayGitHubIssue(),
        () => new EnableGitHubPullRequestAutoMerge(),
        () => new InstallGitHubOrgWebhook(),
        () => new InstallGitHubRepoWebhook(),
        () => new ListMyGitHubIssues(),
        () => new MergeGitHubPullRequest(),
        () => new RaiseGitHubPullRequest(),
        () => new ReactGitHubIssue(),
        () => new ReactGitHubIssueComment(),
        () => new ReopenGitHubIssue(),
        () => new SearchGitHubRepositoryIssues(),
        () => new ToggleLabelGitHubIssue(),

        // preferences
        () => new ConfigureDirectMessageUserPreferences(),
        () => new SetUserPreference(),

        // slack
        () => new AssociateRepo(),
        () => new CreateChannel(),

        // travis
        () => new RestartTravisBuild(),

        () => new HeapDumpCommand(),
        () => new MemoryUsageCommand(),
        () => new GcCommand(),
    ],
    events: [
        // build
        () => new NotifyPusherOnBuild(),

        // parentimpact
        () => new StatusOnParentImpact(),

        // push
        () => new ApplicationToPushLifecycle(),
        () => new BuildToPushLifecycle(),
        () => new IssueToPushLifecycle(),
        () => new K8PodToPushLifecycle(),
        () => new NotifyBotOwnerOnPush(),
        () => new ParentImpactToPushLifecycle(),
        () => new PushToPushLifecycle(),
        () => new PushToUnmappedRepo(),
        () => new ReleaseToPushLifecycle(),
        () => new StatusToPushLifecycle(),
        () => new TagToPushLifecycle(),

        // issue
        () => new IssueToIssueLifecycle(),
        () => new NotifyMentionedOnIssue(),

        // pullRequest
        () => new AutoMergeOnBuild(),
        () => new AutoMergeOnPullRequest(),
        () => new AutoMergeOnReview(),
        () => new AutoMergeOnStatus(),
        () => new BranchToPullRequestLifecycle(),
        () => new CommentToPullRequestLifecycle(),
        () => new CommitToPullRequestLifecycle(),
        () => new NotifyMentionedOnPullRequest(),
        () => new PullRequestToPullRequestLifecycle(),
        () => new ReviewToPullRequestLifecycle(),
        () => new StatusToPullRequestLifecycle(),

        // comment
        () => new CommentToIssueCommentLifecycle(),
        () => new CommentToPullRequestCommentLifecycle(),
        () => new IssueToIssueCommentLifecycle(),
        () => new NotifyMentionedOnIssueComment(),
        () => new NotifyMentionedOnPullRequestComment(),
        () => new PullRequestToPullRequestCommentLifecycle(),

        // review
        () => new NotifyAuthorOnReview(),
        // () => new PullRequestToReviewLifecycle(),
        // () => new ReviewToReviewLifecycle(),
    ],
    listeners: logzioOptions.token ? [new LogzioAutomationEventListener(logzioOptions)] : [],
    token,
    http: {
        enabled: true,
        forceSecure: authEnabled,
        auth: {
            basic: {
                enabled: process.env.NODE_ENV === "staging",
                username: secret("dashboard.user"),
                password: secret("dashboard.password"),
            },
            bearer: {
                enabled: authEnabled,
                token,
            },
            github: {
                enabled: authEnabled && process.env.NODE_ENV === "production",
                clientId: secret("oauth.clientId"),
                clientSecret: secret("oauth.clientSecret"),
                callbackUrl: secret("oauth.callbackUrl"),
                org: "atomisthqa",
            },
        },
    },
    endpoints: {
        graphql: config.get("endpoints.graphql"),
        api: config.get("endpoints.api"),
    },
    applicationEvents: {
        enabled: true,
        teamId: "T095SFFBK",
    },
};

initMemoryMonitoring(`${appRoot.path}/node_modules/@atomist/automation-client/public/heap`);

import { initMemoryMonitoring } from "@atomist/automation-client/internal/util/memory";
import * as secured from "@atomist/automation-client/secured";
import * as appRoot from "app-root-path";
import * as config from "config";
import { CloudFoundryApplicationDetail } from "./handlers/command/cloudfoundry/CloudFoundryApplicationDetail";
import { ScaleCloudFoundryApplication } from "./handlers/command/cloudfoundry/ScaleCloudFoundryApplication";
import { StartCloudFoundryApplication } from "./handlers/command/cloudfoundry/StartCloudFoundryApplication";
import { StopCloudFoundryApplication } from "./handlers/command/cloudfoundry/StopCloudFoundryApplication";
import { ApproveGitHubCommit } from "./handlers/command/github/ApproveGitHubCommit";
import { ApproveGitHubPhaseStatus } from "./handlers/command/github/ApproveGitHubPhaseStatus";
import { AssignGitHubPullRequestReviewer } from "./handlers/command/github/AssignGitHubPullRequestReviewer";
import { AssignToMeGitHubIssue } from "./handlers/command/github/AssignToMeGitHubIssue";
import { CloseGitHubIssue } from "./handlers/command/github/CloseGitHubIssue";
import { CommentGitHubIssue } from "./handlers/command/github/CommentGitHubIssue";
import { CreateGitHubIssue } from "./handlers/command/github/CreateGitHubIssue";
import { CreateGitHubRelease } from "./handlers/command/github/CreateGitHubRelease";
import { CreateGitHubTag } from "./handlers/command/github/CreateGitHubTag";
import { DeleteGitHubBranch } from "./handlers/command/github/DeleteGitHubBranch";
import { DisplayGitHubIssue } from "./handlers/command/github/DisplayGitHubIssue";
import { DisplayGitHubPullRequest } from "./handlers/command/github/DisplayGitHubPullRequest";
import { EnableGitHubPullRequestAutoMerge } from "./handlers/command/github/EnableGitHubPullRequestAutoMerge";
import {
    InstallGitHubOrgWebhook,
    InstallGitHubReposWebhook,
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
import { ConfigureLifecyclePreferences } from "./handlers/command/preferences/ConfigureLifecyclePreferences";
import { SetTeamPreference } from "./handlers/command/preferences/SetTeamPreference";
import { SetUserPreference } from "./handlers/command/preferences/SetUserPreference";
import { AddBotToChannel } from "./handlers/command/slack/AddBotToChannel";
import { AssociateRepo } from "./handlers/command/slack/AssociateRepo";
import { CreateChannel } from "./handlers/command/slack/CreateChannel";
import { LinkOwnerRepo } from "./handlers/command/slack/LinkOwnerRepo";
import { LinkRepo } from "./handlers/command/slack/LinkRepo";
import { ListRepoLinks } from "./handlers/command/slack/ListRepoLinks";
import { NoLinkRepo } from "./handlers/command/slack/NoLinkRepo";
import { UnlinkRepo } from "./handlers/command/slack/UnlinkRepo";
import { RestartTravisBuild } from "./handlers/command/travis/RestartTravisBuild";
import { BranchToBranchLifecycle } from "./handlers/event/branch/BranchToBranchLifecycle";
import { DeletedBranchToBranchLifecycle } from "./handlers/event/branch/DeletedBranchToBranchLifecycle";
import { PullRequestToBranchLifecycle } from "./handlers/event/branch/PullRequestToBranchLifecycle";
import { NotifyPusherOnBuild } from "./handlers/event/build/NotifyPusherOnBuild";
import { BotJoinedChannel } from "./handlers/event/channellink/BotJoinedChannel";
import { ChannelLinkCreated } from "./handlers/event/channellink/ChannelLinkCreated";
import { CommentToIssueCommentLifecycle } from "./handlers/event/comment/CommentToIssueCommentLifecycle";
import { CommentToPullRequestCommentLifecycle} from "./handlers/event/comment/CommentToPullRequestCommentLifecycle";
import { IssueToIssueCommentLifecycle } from "./handlers/event/comment/IssueToIssueCommentLifecycle";
import { NotifyMentionedOnIssueComment } from "./handlers/event/comment/NotifyMentionedOnIssueComment";
import { NotifyMentionedOnPullRequestComment } from "./handlers/event/comment/NotifyMentionedOnPullRequestComment";
import {
    PullRequestToPullRequestCommentLifecycle,
} from "./handlers/event/comment/PullRequestToPullRequestCommentLifecycle";
import { CommentToIssueCardLifecycle } from "./handlers/event/issue/CommentToIssueLifecycle";
import { IssueToIssueCardLifecycle, IssueToIssueLifecycle } from "./handlers/event/issue/IssueToIssueLifecycle";
import { NotifyMentionedOnIssue } from "./handlers/event/issue/NotifyMentionedOnIssue";
import { StatusOnParentImpact } from "./handlers/event/parentimpact/StatusOnParentImpact";
import { AutoMergeOnBuild } from "./handlers/event/pullrequest/AutoMergeOnBuild";
import { AutoMergeOnPullRequest } from "./handlers/event/pullrequest/AutoMergeOnPullRequest";
import { AutoMergeOnReview } from "./handlers/event/pullrequest/AutoMergeOnReview";
import { AutoMergeOnStatus } from "./handlers/event/pullrequest/AutoMergeOnStatus";
import { BranchToPullRequestLifecycle } from "./handlers/event/pullrequest/BranchToPullRequestLifecycle";
import { CommentToPullRequestLifecycle } from "./handlers/event/pullrequest/CommentToPullRequestLifecycle";
import { CommitToPullRequestLifecycle } from "./handlers/event/pullrequest/CommitToPullRequestLifecycle";
import { DeletedBranchToPullRequestLifecycle } from "./handlers/event/pullrequest/DeletedBranchToPullRequestLifecycle";
import { NotifyMentionedOnPullRequest } from "./handlers/event/pullrequest/NotifyMentionedOnPullRequest";
import {
    PullRequestToPullRequestCardLifecycle,
    PullRequestToPullRequestLifecycle,
} from "./handlers/event/pullrequest/PullRequestToPullRequestLifecycle";
import { ReviewToPullRequestLifecycle } from "./handlers/event/pullrequest/ReviewToPullRequestLifecycle";
import { StatusToPullRequestLifecycle } from "./handlers/event/pullrequest/StatusToPullRequestLifecycle";
import {
    ApplicationToPushCardLifecycle,
    ApplicationToPushLifecycle,
} from "./handlers/event/push/ApplicationToPushLifecycle";
import {
    BuildToPushCardLifecycle,
    BuildToPushLifecycle,
} from "./handlers/event/push/BuildToPushLifecycle";
import {
    IssueToPushCardLifecycle,
    IssueToPushLifecycle,
} from "./handlers/event/push/IssueToPushLifecycle";
import {
    K8PodToPushCardLifecycle,
    K8PodToPushLifecycle,
} from "./handlers/event/push/K8PodToPushLifecycle";
import { NotifyBotOwnerOnPush } from "./handlers/event/push/NotifyBotOwnerOnPush";
import { NotifyReviewerOnPush } from "./handlers/event/push/NotifyReviewerOnPush";
import {
    ParentImpactToPushCardLifecycle,
    ParentImpactToPushLifecycle,
} from "./handlers/event/push/ParentImpactToPushLifecycle";
import {
    PushToPushCardLifecycle,
    PushToPushLifecycle,
} from "./handlers/event/push/PushToPushLifecycle";
import { PushToUnmappedRepo } from "./handlers/event/push/PushToUnmappedRepo";
import {
    ReleaseToPushCardLifecycle,
    ReleaseToPushLifecycle,
} from "./handlers/event/push/ReleaseToPushLifecycle";
import {
    StatusToPushCardLifecycle,
    StatusToPushLifecycle,
} from "./handlers/event/push/StatusToPushLifecycle";
import {
    TagToPushCardLifecycle,
    TagToPushLifecycle,
} from "./handlers/event/push/TagToPushLifecycle";
import { NotifyAuthorOnReview } from "./handlers/event/review/NotifyAuthorOnReview";
import { GitHubWebhookCreated } from "./handlers/event/webhook/GitHubWebhookCreated";
import {
    DatadogAutomationEventListener,
    DatadogOptions,
} from "./util/datadog";
import {
    LogzioAutomationEventListener,
    LogzioOptions,
} from "./util/logzio";
import { secret } from "./util/secrets";
import { ShortenUrlAutomationEventListener } from "./util/shorten";

// tslint:disable-next-line:no-var-requires
const pj = require(`${appRoot.path}/package.json`);

const token = secret("github.token", process.env.GITHUB_TOKEN);

const notLocal = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging";

const logzioOptions: LogzioOptions = {
    applicationId: secret("applicationId"),
    environmentId: secret("environmentId"),
    token: secret("logzio.token", process.env.LOGZIO_TOKEN),
};

const datadogOptions: DatadogOptions = {
    applicationId: secret("applicationId"),
    environmentId: secret("environmentId"),
    host: "dd-agent",
    port: 8125,
};

// Set uo automation event listeners
const listeners = [
    new ShortenUrlAutomationEventListener(),
];

// Logz.io will only work in certain environments
if (logzioOptions.token) {
    listeners.push(new LogzioAutomationEventListener(logzioOptions));
}

// StatsD/Datadog servers aren't available locally either
if (notLocal) {
    listeners.push(new DatadogAutomationEventListener(datadogOptions));
}

const AdminTeam = "atomist-automation";

export const configuration: any = {
    name: pj.name,
    version: pj.version,
    policy: config.get("policy"),
    teamIds: config.get("teamIds"),
    groups: config.get("groups"),
    commands: [
        // cloudfoundry
        secured.githubTeam(() => new CloudFoundryApplicationDetail(), AdminTeam),
        secured.githubTeam(() => new ScaleCloudFoundryApplication(), AdminTeam),
        secured.githubTeam(() => new StartCloudFoundryApplication(), AdminTeam),
        secured.githubTeam(() => new StopCloudFoundryApplication(), AdminTeam),

        // github
        () => new ApproveGitHubCommit(),
        () => new ApproveGitHubPhaseStatus(),
        () => new AssignGitHubPullRequestReviewer(),
        () => new AssignToMeGitHubIssue(),
        () => new CloseGitHubIssue(),
        () => new CommentGitHubIssue(),
        () => new CreateGitHubIssue(),
        () => new CreateGitHubRelease(),
        () => new CreateGitHubTag(),
        () => new DeleteGitHubBranch(),
        () => new DisplayGitHubIssue(),
        () => new DisplayGitHubPullRequest(),
        () => new EnableGitHubPullRequestAutoMerge(),
        () => new InstallGitHubOrgWebhook(),
        () => new InstallGitHubRepoWebhook(),
        () => new InstallGitHubReposWebhook(),
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
        () => new ConfigureLifecyclePreferences(),
        () => new SetTeamPreference(),
        () => new SetUserPreference(),

        // slack
        () => new AddBotToChannel(),
        () => new AssociateRepo(),
        () => new CreateChannel(),
        () => new LinkOwnerRepo(),
        () => new LinkRepo(),
        () => new ListRepoLinks(),
        () => new NoLinkRepo(),
        () => new UnlinkRepo(),

        // travis
        () => new RestartTravisBuild(),
    ],
    events: [
        // branch
        () => new BranchToBranchLifecycle(),
        () => new DeletedBranchToBranchLifecycle(),
        () => new PullRequestToBranchLifecycle(),

        // build
        () => new NotifyPusherOnBuild(),

        // channellink
        () => new BotJoinedChannel(),
        () => new ChannelLinkCreated(),

        // parentimpact
        () => new StatusOnParentImpact(),

        // push
        () => new ApplicationToPushLifecycle(),
        () => new BuildToPushLifecycle(),
        () => new IssueToPushLifecycle(),
        () => new K8PodToPushLifecycle(),
        () => new NotifyBotOwnerOnPush(),
        () => new NotifyReviewerOnPush(),
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
        () => new DeletedBranchToPullRequestLifecycle(),
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

        // webhook
        () => new GitHubWebhookCreated(),

        // add card handlers

        // push
        () => new ApplicationToPushCardLifecycle(),
        () => new BuildToPushCardLifecycle(),
        () => new IssueToPushCardLifecycle(),
        () => new K8PodToPushCardLifecycle(),
        () => new ParentImpactToPushCardLifecycle(),
        () => new PushToPushCardLifecycle(),
        () => new ReleaseToPushCardLifecycle(),
        () => new StatusToPushCardLifecycle(),
        () => new TagToPushCardLifecycle(),

        // pullRequest
        () => new PullRequestToPullRequestCardLifecycle(),

        // issue
        () => new IssueToIssueCardLifecycle(),
        () => new CommentToIssueCardLifecycle(),
    ],
    listeners,
    token,
    http: {
        enabled: true,
        auth: {
            basic: {
                enabled: config.get("http.auth.basic.enabled"),
                username: secret("dashboard.user"),
                password: secret("dashboard.password"),
            },
            bearer: {
                enabled: config.get("http.auth.bearer.enabled"),
                adminOrg: "atomisthq",
            },
        },
    },
    endpoints: {
        graphql: config.get("endpoints.graphql"),
        api: config.get("endpoints.api"),
    },
    applicationEvents: {
        enabled: true,
        teamId: "T29E48P34",
    },
    cluster: {
        enabled: notLocal,
        // worker: 2,
    },
    ws: {
        enabled: true,
        termination: {
            graceful: notLocal,
        },
        compress: false,
    },
};

// For now, we enable a couple of interesting memory and heap commands on this automation-client
initMemoryMonitoring(`${appRoot.path}/heap`, false);

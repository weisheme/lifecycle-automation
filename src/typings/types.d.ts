/* tslint:disable */

/* Long type */
export type Long = any;
/* Enum for IssueState */
export type IssueState = "open" | "closed";

/* Ordering Enum for Issue */
export type _IssueOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "number_asc" | "number_desc" | "name_asc" | "name_desc" | "title_asc" | "title_desc" | "body_asc" | "body_desc" | "state_asc" | "state_desc" | "timestamp_asc" | "timestamp_desc" | "action_asc" | "action_desc" | "createdAt_asc" | "createdAt_desc" | "updatedAt_asc" | "updatedAt_desc" | "closedAt_asc" | "closedAt_desc";

/* Ordering Enum for Repo */
export type _RepoOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "owner_asc" | "owner_desc" | "name_asc" | "name_desc" | "allowRebaseMerge_asc" | "allowRebaseMerge_desc" | "allowSquashMerge_asc" | "allowSquashMerge_desc" | "allowMergeCommit_asc" | "allowMergeCommit_desc" | "gitHubId_asc" | "gitHubId_desc" | "defaultBranch_asc" | "defaultBranch_desc";

/* Ordering Enum for Label */
export type _LabelOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "default_asc" | "default_desc" | "color_asc" | "color_desc";

/* Ordering Enum for ChatChannel */
export type _ChatChannelOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "provider_asc" | "provider_desc" | "normalizedName_asc" | "normalizedName_desc" | "channelId_asc" | "channelId_desc" | "isDefault_asc" | "isDefault_desc" | "botInvitedSelf_asc" | "botInvitedSelf_desc";

/* Ordering Enum for ChatId */
export type _ChatIdOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "screenName_asc" | "screenName_desc" | "userId_asc" | "userId_desc" | "provider_asc" | "provider_desc" | "isAtomistBot_asc" | "isAtomistBot_desc" | "isOwner_asc" | "isOwner_desc" | "isPrimaryOwner_asc" | "isPrimaryOwner_desc" | "isAdmin_asc" | "isAdmin_desc" | "isBot_asc" | "isBot_desc" | "timezoneLabel_asc" | "timezoneLabel_desc";

/* Ordering Enum for Email */
export type _EmailOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "address_asc" | "address_desc";

/* Ordering Enum for GitHubId */
export type _GitHubIdOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "login_asc" | "login_desc" | "name_asc" | "name_desc";

/* Ordering Enum for GitHubProvider */
export type _GitHubProviderOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "url_asc" | "url_desc" | "providerId_asc" | "providerId_desc" | "apiUrl_asc" | "apiUrl_desc" | "gitUrl_asc" | "gitUrl_desc";

/* Ordering Enum for Team */
export type _TeamOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc";

/* Ordering Enum for Person */
export type _PersonOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "forename_asc" | "forename_desc" | "surname_asc" | "surname_desc";

/* Enum for OwnerType */
export type OwnerType = "user" | "organization";

/* Ordering Enum for Org */
export type _OrgOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "owner_asc" | "owner_desc" | "ownerType_asc" | "ownerType_desc";

/* Enum for WebhookType */
export type WebhookType = "organization" | "repository";

/* Ordering Enum for GitHubOrgWebhook */
export type _GitHubOrgWebhookOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "url_asc" | "url_desc" | "webhookType_asc" | "webhookType_desc";

/* Ordering Enum for ChatTeam */
export type _ChatTeamOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "provider_asc" | "provider_desc" | "domain_asc" | "domain_desc" | "messageCount_asc" | "messageCount_desc" | "emailDomain_asc" | "emailDomain_desc";

/* Ordering Enum for ChannelLink */
export type _ChannelLinkOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc";

/* Ordering Enum for PullRequest */
export type _PullRequestOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "number_asc" | "number_desc" | "prId_asc" | "prId_desc" | "name_asc" | "name_desc" | "body_asc" | "body_desc" | "state_asc" | "state_desc" | "merged_asc" | "merged_desc" | "timestamp_asc" | "timestamp_desc" | "baseBranchName_asc" | "baseBranchName_desc" | "branchName_asc" | "branchName_desc" | "title_asc" | "title_desc" | "createdAt_asc" | "createdAt_desc" | "updatedAt_asc" | "updatedAt_desc" | "closedAt_asc" | "closedAt_desc" | "mergedAt_asc" | "mergedAt_desc";

/* Ordering Enum for Commit */
export type _CommitOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "sha_asc" | "sha_desc" | "message_asc" | "message_desc" | "timestamp_asc" | "timestamp_desc";

/* Enum for BuildStatus */
export type BuildStatus = "passed" | "broken" | "failed" | "started" | "canceled";

/* Enum for BuildTrigger */
export type BuildTrigger = "pull_request" | "push" | "tag" | "cron";

/* Ordering Enum for Build */
export type _BuildOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "buildId_asc" | "buildId_desc" | "name_asc" | "name_desc" | "status_asc" | "status_desc" | "buildUrl_asc" | "buildUrl_desc" | "compareUrl_asc" | "compareUrl_desc" | "trigger_asc" | "trigger_desc" | "provider_asc" | "provider_desc" | "pullRequestNumber_asc" | "pullRequestNumber_desc" | "startedAt_asc" | "startedAt_desc" | "finishedAt_asc" | "finishedAt_desc" | "timestamp_asc" | "timestamp_desc" | "workflowId_asc" | "workflowId_desc" | "jobName_asc" | "jobName_desc" | "jobId_asc" | "jobId_desc";

/* Ordering Enum for Push */
export type _PushOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "timestamp_asc" | "timestamp_desc" | "branch_asc" | "branch_desc";

/* Ordering Enum for Tag */
export type _TagOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "description_asc" | "description_desc" | "ref_asc" | "ref_desc" | "timestamp_asc" | "timestamp_desc";

/* Ordering Enum for Release */
export type _ReleaseOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "timestamp_asc" | "timestamp_desc";

/* Ordering Enum for DockerImage */
export type _DockerImageOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "image_asc" | "image_desc";

/* Ordering Enum for K8Spec */
export type _K8SpecOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "name_asc" | "name_desc" | "kind_asc" | "kind_desc" | "curHash_asc" | "curHash_desc" | "fsha_asc" | "fsha_desc" | "timestamp_asc" | "timestamp_desc";

/* Ordering Enum for K8Pod */
export type _K8PodOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "name_asc" | "name_desc" | "state_asc" | "state_desc" | "host_asc" | "host_desc" | "timestamp_asc" | "timestamp_desc";

/* Ordering Enum for Environment */
export type _EnvironmentOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "name_asc" | "name_desc" | "vpcName_asc" | "vpcName_desc";

/* Ordering Enum for SpinnakerPipeline */
export type _SpinnakerPipelineOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "executionId_asc" | "executionId_desc" | "application_asc" | "application_desc" | "eventType_asc" | "eventType_desc" | "taskName_asc" | "taskName_desc" | "stageName_asc" | "stageName_desc" | "stageType_asc" | "stageType_desc" | "waitingForJudgement_asc" | "waitingForJudgement_desc";

/* Ordering Enum for SpinnakerStage */
export type _SpinnakerStageOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "type_asc" | "type_desc" | "status_asc" | "status_desc" | "startTime_asc" | "startTime_desc" | "endTime_asc" | "endTime_desc" | "refId_asc" | "refId_desc";

/* Ordering Enum for Workflow */
export type _WorkflowOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "workflowId_asc" | "workflowId_desc" | "provider_asc" | "provider_desc" | "config_asc" | "config_desc";

/* Enum for StatusState */
export type StatusState = "pending" | "success" | "error" | "failure";

/* Ordering Enum for Status */
export type _StatusOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "state_asc" | "state_desc" | "description_asc" | "description_desc" | "targetUrl_asc" | "targetUrl_desc" | "context_asc" | "context_desc" | "timestamp_asc" | "timestamp_desc";

/* Ordering Enum for HerokuApp */
export type _HerokuAppOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "app_asc" | "app_desc" | "url_asc" | "url_desc" | "timestamp_asc" | "timestamp_desc" | "user_asc" | "user_desc" | "appId_asc" | "appId_desc" | "release_asc" | "release_desc";

/* Ordering Enum for Application */
export type _ApplicationOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "state_asc" | "state_desc" | "host_asc" | "host_desc" | "timestamp_asc" | "timestamp_desc" | "domain_asc" | "domain_desc" | "data_asc" | "data_desc";

/* Ordering Enum for Fingerprint */
export type _FingerprintOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "name_asc" | "name_desc" | "sha_asc" | "sha_desc" | "data_asc" | "data_desc";

/* Ordering Enum for ParentImpact */
export type _ParentImpactOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "url_asc" | "url_desc" | "data_asc" | "data_desc";

/* Ordering Enum for Branch */
export type _BranchOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "timestamp_asc" | "timestamp_desc";

/* Enum for ReviewState */
export type ReviewState = "requested" | "pending" | "approved" | "commented" | "changes_requested";

/* Ordering Enum for Review */
export type _ReviewOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "gitHubId_asc" | "gitHubId_desc" | "body_asc" | "body_desc" | "state_asc" | "state_desc" | "submittedAt_asc" | "submittedAt_desc" | "htmlUrl_asc" | "htmlUrl_desc";

/* Enum for CommentCommentType */
export type CommentCommentType = "review" | "pullRequest" | "issue";

/* Ordering Enum for Comment */
export type _CommentOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "body_asc" | "body_desc" | "timestamp_asc" | "timestamp_desc" | "gitHubId_asc" | "gitHubId_desc" | "path_asc" | "path_desc" | "position_asc" | "position_desc" | "htmlUrl_asc" | "htmlUrl_desc" | "commentType_asc" | "commentType_desc";

/* Ordering Enum for DeletedBranch */
export type _DeletedBranchOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "timestamp_asc" | "timestamp_desc";

/* Ordering Enum for K8Cluster */
export type _K8ClusterOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "name_asc" | "name_desc" | "availabilityZone_asc" | "availabilityZone_desc";

/* Ordering Enum for PushImpact */
export type _PushImpactOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "url_asc" | "url_desc" | "data_asc" | "data_desc";

/* Ordering Enum for PullRequestImpact */
export type _PullRequestImpactOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "url_asc" | "url_desc" | "data_asc" | "data_desc";

/* Ordering Enum for UserJoinedChannel */
export type _UserJoinedChannelOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc";

export namespace AddBotToSlackChannel {
  export type Variables = {
    teamId: string;
    channelId: string;
  }

  export type Mutation = {
    addBotToSlackChannel?: AddBotToSlackChannel | null; 
  } 

  export type AddBotToSlackChannel = {
    id?: string | null; 
  } 
}
export namespace CreateSlackChannel {
  export type Variables = {
    teamId: string;
    name: string;
  }

  export type Mutation = {
    createSlackChannel?: CreateSlackChannel | null; 
  } 

  export type CreateSlackChannel = {
    id?: string | null; 
  } 
}
export namespace InviteUserToSlackChannel {
  export type Variables = {
    teamId: string;
    channelId: string;
    userId: string;
  }

  export type Mutation = {
    inviteUserToSlackChannel?: InviteUserToSlackChannel | null; 
  } 

  export type InviteUserToSlackChannel = {
    id?: string | null; 
  } 
}
export namespace LinkSlackChannelToRepo {
  export type Variables = {
    teamId: string;
    channelId: string;
    repo: string;
    owner: string;
    providerId?: string | null;
  }

  export type Mutation = {
    linkSlackChannelToRepo?: LinkSlackChannelToRepo | null; 
  } 

  export type LinkSlackChannelToRepo = {
    id?: string | null; 
  } 
}
export namespace SetChatTeamPreference {
  export type Variables = {
    teamId: string;
    name: string;
    value: string;
  }

  export type Mutation = {
    setChatTeamPreference?: SetChatTeamPreference[] | null; 
  } 

  export type SetChatTeamPreference = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace SetChatUserPreference {
  export type Variables = {
    teamId: string;
    userId: string;
    name: string;
    value: string;
  }

  export type Mutation = {
    setChatUserPreference?: SetChatUserPreference[] | null; 
  } 

  export type SetChatUserPreference = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace UnlinkSlackChannelFromRepo {
  export type Variables = {
    teamId: string;
    channelId: string;
    repo: string;
    owner: string;
  }

  export type Mutation = {
    unlinkSlackChannelFromRepo?: UnlinkSlackChannelFromRepo | null; 
  } 

  export type UnlinkSlackChannelFromRepo = {
    id?: string | null; 
  } 
}
export namespace BotOwner {
  export type Variables = {
    teamId: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    members?: Members[] | null; 
  } 

  export type Members = {
    isOwner?: string | null; 
    isAdmin?: string | null; 
    isPrimaryOwner?: string | null; 
    screenName?: string | null; 
  } 
}
export namespace Branch {
  export type Variables = {
    owner: string;
    repo: string;
    branch: string;
  }

  export type Query = {
    Repo?: Repo[] | null; 
  } 

  export type Repo = {
    branches?: Branches[] | null; 
  } 

  export type Branches = {
    name?: string | null; 
    pullRequests?: PullRequests[] | null; 
  } 

  export type PullRequests = {
    state?: string | null; 
    commits?: Commits[] | null; 
  } 

  export type Commits = {
    sha?: string | null; 
  } 
}
export namespace BranchWithPullRequest {
  export type Variables = {
    id: string;
  }

  export type Query = {
    Branch?: Branch[] | null; 
  } 

  export type Branch = {
    id?: string | null; 
    pullRequests?: PullRequests[] | null; 
    commit?: Commit | null; 
    name?: string | null; 
    repo?: Repo | null; 
    timestamp?: string | null; 
  } 

  export type PullRequests = {
    merged?: boolean | null; 
  } 

  export type Commit = {
    sha?: string | null; 
    message?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    defaultBranch?: string | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
    name?: string | null; 
  } 

  export type Org = {
    team?: _Team | null; 
    provider?: Provider | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Provider = {
    id?: string | null; 
    apiUrl?: string | null; 
    url?: string | null; 
  } 
}
export namespace Channels {
  export type Variables = {
    teamId: string;
    first: number;
    offset: number;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    channels?: Channels[] | null; 
  } 

  export type Channels = {
    repos?: Repos[] | null; 
  } 

  export type Repos = {
    name?: string | null; 
    owner?: string | null; 
  } 
}
export namespace ChatChannel {
  export type Variables = {
    teamId: string;
    channelName: string;
    repoOwner: string;
    repoName: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    channels?: Channels[] | null; 
  } 

  export type Channels = {
    name?: string | null; 
    repos?: Repos[] | null; 
  } 

  export type Repos = {
    name?: string | null; 
    owner?: string | null; 
  } 
}
export namespace ChatChannelByChannelId {
  export type Variables = {
    teamId: string;
    channelName: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    channels?: Channels[] | null; 
  } 

  export type Channels = {
    name?: string | null; 
    repos?: Repos[] | null; 
  } 

  export type Repos = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    url?: string | null; 
  } 
}
export namespace ChatId {
  export type Variables = {
    teamId: string;
    chatId: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    members?: Members[] | null; 
  } 

  export type Members = {
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
    gitHubId?: GitHubId | null; 
    emails?: Emails[] | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    chatTeam?: _ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type _ChatTeam = {
    id?: string | null; 
    name?: string | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
    name?: string | null; 
  } 

  export type Emails = {
    address?: string | null; 
  } 
}
export namespace ChatTeam {
  export type Variables = {
    teamId: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    channels?: Channels[] | null; 
  } 

  export type Channels = {
    name?: string | null; 
    channelId?: string | null; 
    repos?: Repos[] | null; 
  } 

  export type Repos = {
    name?: string | null; 
    owner?: string | null; 
  } 
}
export namespace ChatTeamPreferences {
  export type Variables = {
    teamId: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace EMailAndGitHubIdByUserId {
  export type Variables = {
    userId: string;
  }

  export type Query = {
    ChatId?: ChatId[] | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    emails?: Emails[] | null; 
    person?: Person | null; 
  } 

  export type Emails = {
    address?: string | null; 
  } 

  export type Person = {
    surname?: string | null; 
    forename?: string | null; 
    emails?: _Emails[] | null; 
    gitHubId?: GitHubId | null; 
  } 

  export type _Emails = {
    address?: string | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 
}
export namespace GitHubId {
  export type Variables = {
    gitHubIds: string[];
  }

  export type Query = {
    GitHubId?: GitHubId[] | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    id?: string | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
    name?: string | null; 
  } 
}
export namespace Issue {
  export type Variables = {
    teamId: string;
    orgOwner: string;
    repoName: string;
    issueName: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    team?: Team | null; 
  } 

  export type Team = {
    orgs?: Orgs[] | null; 
  } 

  export type Orgs = {
    repo?: Repo[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    issue?: Issue[] | null; 
  } 

  export type Issue = {
    _id?: Long | null; 
    name?: string | null; 
    title?: string | null; 
    body?: string | null; 
    state?: IssueState | null; 
    number?: number | null; 
    createdAt?: string | null; 
    updatedAt?: string | null; 
    closedAt?: string | null; 
    resolvingCommits?: ResolvingCommits[] | null; 
    openedBy?: OpenedBy | null; 
    closedBy?: ClosedBy | null; 
    assignees?: Assignees[] | null; 
    repo: _Repo; 
    labels?: _Labels[] | null; 
    timestamp?: string | null; 
  } 

  export type ResolvingCommits = {
    author?: Author | null; 
  } 

  export type Author = {
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 

  export type OpenedBy = {
    login?: string | null; 
  } 

  export type ClosedBy = {
    login?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
  } 

  export type _Repo = {
    name?: string | null; 
    owner?: string | null; 
    labels?: Labels[] | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    gitUrl?: string | null; 
    url?: string | null; 
  } 

  export type _Labels = {
    name?: string | null; 
  } 
}
export namespace IssueOrPr {
  export type Variables = {
    owner: string;
    repo: string;
    names: string[];
  }

  export type Query = {
    Org?: Org[] | null; 
  } 

  export type Org = {
    repo?: Repo[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    pullRequest?: PullRequest[] | null; 
    issue?: Issue[] | null; 
  } 

  export type PullRequest = {
    state?: string | null; 
    merged?: boolean | null; 
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    repo?: _Repo | null; 
  } 

  export type _Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: _Org | null; 
  } 

  export type _Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type Issue = {
    _id?: Long | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
    number?: number | null; 
    repo: __Repo; 
  } 

  export type __Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: __Org | null; 
  } 

  export type __Org = {
    provider?: _Provider | null; 
  } 

  export type _Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 
}
export namespace MappedChannels {
  export type Variables = {
    teamId: string;
    name: string;
  }

  export type Query = {
    ChatChannel?: ChatChannel[] | null; 
  } 

  export type ChatChannel = {
    team?: Team | null; 
    repos?: Repos[] | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Repos = {
    owner?: string | null; 
    name?: string | null; 
  } 
}
export namespace OpenPr {
  export type Variables = {
    repo: string;
    owner: string;
    branch: string;
  }

  export type Query = {
    Repo?: Repo[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    branches?: Branches[] | null; 
  } 

  export type Branches = {
    name?: string | null; 
    pullRequests?: PullRequests[] | null; 
  } 

  export type PullRequests = {
    state?: string | null; 
    merged?: boolean | null; 
    number?: number | null; 
    title?: string | null; 
  } 
}
export namespace ProviderIdFromOrg {
  export type Variables = {
    owner: string;
  }

  export type Query = {
    Org?: Org[] | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    providerId?: string | null; 
  } 
}
export namespace PullRequest {
  export type Variables = {
    teamId: string;
    orgOwner: string;
    repoName: string;
    prName: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[] | null; 
  } 

  export type ChatTeam = {
    team?: Team | null; 
  } 

  export type Team = {
    orgs?: Orgs[] | null; 
  } 

  export type Orgs = {
    repo?: Repo[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    pullRequest?: PullRequest[] | null; 
  } 

  export type PullRequest = {
    _id?: Long | null; 
    number?: number | null; 
    name?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    title?: string | null; 
    createdAt?: string | null; 
    mergedAt?: string | null; 
    baseBranchName?: string | null; 
    branchName?: string | null; 
    head?: Head | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    closedAt?: string | null; 
    branch?: Branch | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    comments?: Comments[] | null; 
    commits?: Commits[] | null; 
    builds?: _Builds[] | null; 
    reviews?: Reviews[] | null; 
    repo?: _Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    gitHubId?: GitHubId | null; 
    chatId?: ChatId | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId | null; 
    chatId?: _ChatId | null; 
  } 

  export type _GitHubId = {
    login?: string | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    name?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId | null; 
    chatId?: __ChatId | null; 
  } 

  export type __GitHubId = {
    login?: string | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    name?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId | null; 
    chatId?: ___ChatId | null; 
  } 

  export type ___GitHubId = {
    login?: string | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    name?: string | null; 
    person?: ____Person | null; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId | null; 
    chatId?: ____ChatId | null; 
  } 

  export type ____GitHubId = {
    login?: string | null; 
  } 

  export type ____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    timestamp?: string | null; 
    tags?: Tags[] | null; 
    statuses?: Statuses[] | null; 
    author?: _Author | null; 
    builds?: Builds[] | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
  } 

  export type Release = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    description?: string | null; 
    context?: string | null; 
    targetUrl?: string | null; 
  } 

  export type _Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _____Person | null; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId | null; 
    chatId?: _____ChatId | null; 
  } 

  export type _____GitHubId = {
    login?: string | null; 
  } 

  export type _____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
  } 

  export type _Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type _Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    allowRebaseMerge?: boolean | null; 
    allowSquashMerge?: boolean | null; 
    allowMergeCommit?: boolean | null; 
    defaultBranch?: string | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: _Team | null; 
  } 

  export type _Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: __Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type __Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace Webhook {
  export type Variables = {
    owner: string;
  }

  export type Query = {
    GitHubOrgWebhook?: GitHubOrgWebhook[] | null; 
  } 

  export type GitHubOrgWebhook = {
    url?: string | null; 
    webhookType?: WebhookType | null; 
    org?: Org | null; 
  } 

  export type Org = {
    owner?: string | null; 
  } 
}
export namespace ApplicationToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Application?: Application[] | null; 
  } 

  export type Application = {
    _id?: Long | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
  } 

  export type Commits = {
    pushes?: Pushes[] | null; 
    timestamp?: string | null; 
  } 

  export type Pushes = {
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: _Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type _Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: _Release | null; 
    containers?: Containers[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}
export namespace AutoMergeOnBuild {
  export type Variables = {
  }

  export type Subscription = {
    Build?: Build[] | null; 
  } 

  export type Build = {
    _id?: Long | null; 
    pullRequest?: PullRequest | null; 
  } 

  export type PullRequest = {
    number?: number | null; 
    body?: string | null; 
    title?: string | null; 
    labels?: Labels[] | null; 
    branch?: Branch | null; 
    head?: Head | null; 
    reviews?: Reviews[] | null; 
    commits?: Commits[] | null; 
    repo?: Repo | null; 
    comments?: Comments[] | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
  } 

  export type Head = {
    sha?: string | null; 
    statuses?: Statuses[] | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Commits = {
    message?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 
}
export namespace AutoMergeOnPullRequest {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[] | null; 
  } 

  export type PullRequest = {
    _id?: Long | null; 
    number?: number | null; 
    body?: string | null; 
    title?: string | null; 
    labels?: Labels[] | null; 
    branch?: Branch | null; 
    head?: Head | null; 
    reviews?: Reviews[] | null; 
    commits?: Commits[] | null; 
    repo?: Repo | null; 
    comments?: Comments[] | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
  } 

  export type Head = {
    sha?: string | null; 
    statuses?: Statuses[] | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Commits = {
    message?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 
}
export namespace AutoMergeOnReview {
  export type Variables = {
  }

  export type Subscription = {
    Review?: Review[] | null; 
  } 

  export type Review = {
    _id?: Long | null; 
    pullRequest?: PullRequest | null; 
  } 

  export type PullRequest = {
    number?: number | null; 
    body?: string | null; 
    title?: string | null; 
    labels?: Labels[] | null; 
    branch?: Branch | null; 
    head?: Head | null; 
    reviews?: Reviews[] | null; 
    commits?: Commits[] | null; 
    repo?: Repo | null; 
    comments?: Comments[] | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
  } 

  export type Head = {
    sha?: string | null; 
    statuses?: Statuses[] | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Commits = {
    message?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 
}
export namespace AutoMergeOnStatus {
  export type Variables = {
  }

  export type Subscription = {
    Status?: Status[] | null; 
  } 

  export type Status = {
    _id?: Long | null; 
    commit?: Commit | null; 
  } 

  export type Commit = {
    pullRequests?: PullRequests[] | null; 
  } 

  export type PullRequests = {
    number?: number | null; 
    body?: string | null; 
    title?: string | null; 
    branch?: Branch | null; 
    labels?: Labels[] | null; 
    head?: Head | null; 
    reviews?: Reviews[] | null; 
    commits?: Commits[] | null; 
    repo?: Repo | null; 
    comments?: Comments[] | null; 
  } 

  export type Branch = {
    name?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Head = {
    sha?: string | null; 
    statuses?: Statuses[] | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Commits = {
    message?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 
}
export namespace BotJoinedChannel {
  export type Variables = {
  }

  export type Subscription = {
    UserJoinedChannel?: UserJoinedChannel[] | null; 
  } 

  export type UserJoinedChannel = {
    user?: User | null; 
    channel?: Channel | null; 
  } 

  export type User = {
    isAtomistBot?: string | null; 
    screenName?: string | null; 
    userId?: string | null; 
  } 

  export type Channel = {
    botInvitedSelf?: boolean | null; 
    channelId?: string | null; 
    name?: string | null; 
    repos?: Repos[] | null; 
    team?: Team | null; 
  } 

  export type Repos = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    url?: string | null; 
  } 

  export type Team = {
    id?: string | null; 
    orgs?: Orgs[] | null; 
  } 

  export type Orgs = {
    owner?: string | null; 
    provider?: _Provider | null; 
    repo?: Repo[] | null; 
  } 

  export type _Provider = {
    apiUrl?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
  } 
}
export namespace BranchToBranchLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Branch?: Branch[] | null; 
  } 

  export type Branch = {
    id?: string | null; 
    pullRequests?: PullRequests[] | null; 
    commit?: Commit | null; 
    name?: string | null; 
    repo?: Repo | null; 
    timestamp?: string | null; 
  } 

  export type PullRequests = {
    merged?: boolean | null; 
  } 

  export type Commit = {
    sha?: string | null; 
    message?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    defaultBranch?: string | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
    name?: string | null; 
  } 

  export type Org = {
    team?: _Team | null; 
    provider?: Provider | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Provider = {
    id?: string | null; 
    apiUrl?: string | null; 
    url?: string | null; 
  } 
}
export namespace BranchToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Branch?: Branch[] | null; 
  } 

  export type Branch = {
    _id?: Long | null; 
    pullRequests?: PullRequests[] | null; 
  } 

  export type PullRequests = {
    number?: number | null; 
    name?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    title?: string | null; 
    baseBranchName?: string | null; 
    branchName?: string | null; 
    createdAt?: string | null; 
    mergedAt?: string | null; 
    head?: Head | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    closedAt?: string | null; 
    branch?: _Branch | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    comments?: Comments[] | null; 
    commits?: Commits[] | null; 
    builds?: _Builds[] | null; 
    reviews?: Reviews[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    gitHubId?: GitHubId | null; 
    chatId?: ChatId | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type _Branch = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId | null; 
    chatId?: _ChatId | null; 
  } 

  export type _GitHubId = {
    login?: string | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    name?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId | null; 
    chatId?: __ChatId | null; 
  } 

  export type __GitHubId = {
    login?: string | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    name?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId | null; 
    chatId?: ___ChatId | null; 
  } 

  export type ___GitHubId = {
    login?: string | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    name?: string | null; 
    person?: ____Person | null; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId | null; 
    chatId?: ____ChatId | null; 
  } 

  export type ____GitHubId = {
    login?: string | null; 
  } 

  export type ____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    timestamp?: string | null; 
    message?: string | null; 
    tags?: Tags[] | null; 
    statuses?: Statuses[] | null; 
    author?: _Author | null; 
    builds?: Builds[] | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
  } 

  export type Release = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    description?: string | null; 
    context?: string | null; 
    targetUrl?: string | null; 
  } 

  export type _Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _____Person | null; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId | null; 
    chatId?: _____ChatId | null; 
  } 

  export type _____GitHubId = {
    login?: string | null; 
  } 

  export type _____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type _Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    allowRebaseMerge?: boolean | null; 
    allowSquashMerge?: boolean | null; 
    allowMergeCommit?: boolean | null; 
    defaultBranch?: string | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace BuildToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Build?: Build[] | null; 
  } 

  export type Build = {
    _id?: Long | null; 
    push?: Push | null; 
    timestamp?: string | null; 
  } 

  export type Push = {
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: _Release | null; 
    containers?: Containers[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}
export namespace ChannelLinkCreated {
  export type Variables = {
  }

  export type Subscription = {
    ChannelLink?: ChannelLink[] | null; 
  } 

  export type ChannelLink = {
    channel?: Channel | null; 
    repo?: Repo | null; 
  } 

  export type Channel = {
    name?: string | null; 
    normalizedName?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    ownerType?: OwnerType | null; 
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    url?: string | null; 
    providerId?: string | null; 
  } 
}
export namespace CommentToIssueCommentLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[] | null; 
  } 

  export type Comment = {
    _id?: Long | null; 
    gitHubId?: string | null; 
    timestamp?: string | null; 
    body?: string | null; 
    by?: By | null; 
    issue?: Issue | null; 
  } 

  export type By = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
    gitHubId?: GitHubId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type Issue = {
    title?: string | null; 
    number?: number | null; 
    state?: IssueState | null; 
    repo: Repo; 
    openedBy?: OpenedBy | null; 
    closedBy?: ClosedBy | null; 
    assignees?: Assignees[] | null; 
    resolvingCommits?: ResolvingCommits[] | null; 
    labels?: _Labels[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
    labels?: Labels[] | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    url?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type OpenedBy = {
    login?: string | null; 
  } 

  export type ClosedBy = {
    login?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
  } 

  export type ResolvingCommits = {
    sha?: string | null; 
    message?: string | null; 
    author?: Author | null; 
  } 

  export type Author = {
    person?: _Person | null; 
  } 

  export type _Person = {
    chatId?: _ChatId | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
  } 

  export type _Labels = {
    name?: string | null; 
  } 
}
export namespace CommentToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[] | null; 
  } 

  export type Comment = {
    _id?: Long | null; 
    pullRequest?: PullRequest | null; 
  } 

  export type PullRequest = {
    number?: number | null; 
    name?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    title?: string | null; 
    createdAt?: string | null; 
    mergedAt?: string | null; 
    baseBranchName?: string | null; 
    branchName?: string | null; 
    head?: Head | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    closedAt?: string | null; 
    branch?: Branch | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    comments?: Comments[] | null; 
    commits?: Commits[] | null; 
    builds?: _Builds[] | null; 
    reviews?: Reviews[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    gitHubId?: GitHubId | null; 
    chatId?: ChatId | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId | null; 
    chatId?: _ChatId | null; 
  } 

  export type _GitHubId = {
    login?: string | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    name?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId | null; 
    chatId?: __ChatId | null; 
  } 

  export type __GitHubId = {
    login?: string | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    name?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId | null; 
    chatId?: ___ChatId | null; 
  } 

  export type ___GitHubId = {
    login?: string | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    name?: string | null; 
    person?: ____Person | null; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId | null; 
    chatId?: ____ChatId | null; 
  } 

  export type ____GitHubId = {
    login?: string | null; 
  } 

  export type ____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    timestamp?: string | null; 
    tags?: Tags[] | null; 
    statuses?: Statuses[] | null; 
    author?: _Author | null; 
    builds?: Builds[] | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
  } 

  export type Release = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    description?: string | null; 
    context?: string | null; 
    targetUrl?: string | null; 
  } 

  export type _Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _____Person | null; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId | null; 
    chatId?: _____ChatId | null; 
  } 

  export type _____GitHubId = {
    login?: string | null; 
  } 

  export type _____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type _Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    allowRebaseMerge?: boolean | null; 
    allowSquashMerge?: boolean | null; 
    allowMergeCommit?: boolean | null; 
    defaultBranch?: string | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace CommentToPullRequestCommentLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[] | null; 
  } 

  export type Comment = {
    _id?: Long | null; 
    gitHubId?: string | null; 
    timestamp?: string | null; 
    body?: string | null; 
    by?: By | null; 
    pullRequest?: PullRequest | null; 
  } 

  export type By = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
    gitHubId?: GitHubId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type PullRequest = {
    title?: string | null; 
    number?: number | null; 
    state?: string | null; 
    merged?: boolean | null; 
    repo?: Repo | null; 
    author?: Author | null; 
    assignees?: Assignees[] | null; 
    labels?: _Labels[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
    labels?: Labels[] | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    url?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    chatId?: _ChatId | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    chatId?: __ChatId | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
  } 

  export type _Labels = {
    name?: string | null; 
  } 
}
export namespace CommitToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Commit?: Commit[] | null; 
  } 

  export type Commit = {
    _id?: Long | null; 
    pullRequests?: PullRequests[] | null; 
  } 

  export type PullRequests = {
    number?: number | null; 
    name?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    title?: string | null; 
    createdAt?: string | null; 
    mergedAt?: string | null; 
    baseBranchName?: string | null; 
    branchName?: string | null; 
    head?: Head | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    closedAt?: string | null; 
    branch?: Branch | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    comments?: Comments[] | null; 
    commits?: Commits[] | null; 
    builds?: _Builds[] | null; 
    reviews?: Reviews[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    gitHubId?: GitHubId | null; 
    chatId?: ChatId | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId | null; 
    chatId?: _ChatId | null; 
  } 

  export type _GitHubId = {
    login?: string | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    name?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId | null; 
    chatId?: __ChatId | null; 
  } 

  export type __GitHubId = {
    login?: string | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    name?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId | null; 
    chatId?: ___ChatId | null; 
  } 

  export type ___GitHubId = {
    login?: string | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    name?: string | null; 
    person?: ____Person | null; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId | null; 
    chatId?: ____ChatId | null; 
  } 

  export type ____GitHubId = {
    login?: string | null; 
  } 

  export type ____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    timestamp?: string | null; 
    tags?: Tags[] | null; 
    statuses?: Statuses[] | null; 
    author?: _Author | null; 
    builds?: Builds[] | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
  } 

  export type Release = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    description?: string | null; 
    context?: string | null; 
    targetUrl?: string | null; 
  } 

  export type _Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _____Person | null; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId | null; 
    chatId?: _____ChatId | null; 
  } 

  export type _____GitHubId = {
    login?: string | null; 
  } 

  export type _____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type _Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    allowRebaseMerge?: boolean | null; 
    allowSquashMerge?: boolean | null; 
    allowMergeCommit?: boolean | null; 
    defaultBranch?: string | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace DeletedBranchToBranchLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    DeletedBranch?: DeletedBranch[] | null; 
  } 

  export type DeletedBranch = {
    id?: string | null; 
    pullRequests?: PullRequests[] | null; 
    commit?: Commit | null; 
    name?: string | null; 
    repo?: Repo | null; 
    timestamp?: string | null; 
  } 

  export type PullRequests = {
    merged?: boolean | null; 
  } 

  export type Commit = {
    sha?: string | null; 
    message?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    defaultBranch?: string | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
    name?: string | null; 
  } 

  export type Org = {
    team?: _Team | null; 
    provider?: Provider | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Provider = {
    id?: string | null; 
    apiUrl?: string | null; 
    url?: string | null; 
  } 
}
export namespace DeletedBranchToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    DeletedBranch?: DeletedBranch[] | null; 
  } 

  export type DeletedBranch = {
    id?: string | null; 
    pullRequests?: PullRequests[] | null; 
  } 

  export type PullRequests = {
    number?: number | null; 
    name?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    title?: string | null; 
    createdAt?: string | null; 
    mergedAt?: string | null; 
    baseBranchName?: string | null; 
    branchName?: string | null; 
    head?: Head | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    closedAt?: string | null; 
    branch?: Branch | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    comments?: Comments[] | null; 
    commits?: Commits[] | null; 
    builds?: _Builds[] | null; 
    reviews?: Reviews[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    gitHubId?: GitHubId | null; 
    chatId?: ChatId | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId | null; 
    chatId?: _ChatId | null; 
  } 

  export type _GitHubId = {
    login?: string | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    name?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId | null; 
    chatId?: __ChatId | null; 
  } 

  export type __GitHubId = {
    login?: string | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    name?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId | null; 
    chatId?: ___ChatId | null; 
  } 

  export type ___GitHubId = {
    login?: string | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    name?: string | null; 
    person?: ____Person | null; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId | null; 
    chatId?: ____ChatId | null; 
  } 

  export type ____GitHubId = {
    login?: string | null; 
  } 

  export type ____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    timestamp?: string | null; 
    tags?: Tags[] | null; 
    statuses?: Statuses[] | null; 
    author?: _Author | null; 
    builds?: Builds[] | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
  } 

  export type Release = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    description?: string | null; 
    context?: string | null; 
    targetUrl?: string | null; 
  } 

  export type _Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _____Person | null; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId | null; 
    chatId?: _____ChatId | null; 
  } 

  export type _____GitHubId = {
    login?: string | null; 
  } 

  export type _____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type _Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    allowRebaseMerge?: boolean | null; 
    allowSquashMerge?: boolean | null; 
    allowMergeCommit?: boolean | null; 
    defaultBranch?: string | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace GitHubWebhookCreated {
  export type Variables = {
  }

  export type Subscription = {
    GitHubOrgWebhook?: GitHubOrgWebhook[] | null; 
  } 

  export type GitHubOrgWebhook = {
    org?: Org | null; 
  } 

  export type Org = {
    team?: Team | null; 
  } 

  export type Team = {
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    members?: Members[] | null; 
    channels?: Channels[] | null; 
  } 

  export type Members = {
    isAtomistBot?: string | null; 
    isOwner?: string | null; 
    screenName?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    channelId?: string | null; 
  } 
}
export namespace IssueToIssueLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Issue?: Issue[] | null; 
  } 

  export type Issue = {
    _id?: Long | null; 
    name?: string | null; 
    title?: string | null; 
    body?: string | null; 
    state?: IssueState | null; 
    number?: number | null; 
    createdAt?: string | null; 
    updatedAt?: string | null; 
    closedAt?: string | null; 
    resolvingCommits?: ResolvingCommits[] | null; 
    openedBy?: OpenedBy | null; 
    closedBy?: ClosedBy | null; 
    assignees?: Assignees[] | null; 
    repo: Repo; 
    labels?: _Labels[] | null; 
    timestamp?: string | null; 
  } 

  export type ResolvingCommits = {
    author?: Author | null; 
  } 

  export type Author = {
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 

  export type OpenedBy = {
    login?: string | null; 
  } 

  export type ClosedBy = {
    login?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    labels?: Labels[] | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    gitUrl?: string | null; 
    url?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type _Labels = {
    name?: string | null; 
  } 
}
export namespace IssueToIssueCommentLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Issue?: Issue[] | null; 
  } 

  export type Issue = {
    _id?: Long | null; 
    title?: string | null; 
    number?: number | null; 
    state?: IssueState | null; 
    repo: Repo; 
    openedBy?: OpenedBy | null; 
    closedBy?: ClosedBy | null; 
    assignees?: Assignees[] | null; 
    resolvingCommits?: ResolvingCommits[] | null; 
    labels?: _Labels[] | null; 
    comments?: Comments[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
    labels?: Labels[] | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    url?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type OpenedBy = {
    login?: string | null; 
  } 

  export type ClosedBy = {
    login?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
  } 

  export type ResolvingCommits = {
    sha?: string | null; 
    message?: string | null; 
    author?: Author | null; 
  } 

  export type Author = {
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 

  export type _Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    gitHubId?: string | null; 
    timestamp?: string | null; 
    body?: string | null; 
    by?: By | null; 
    issue?: _Issue | null; 
  } 

  export type By = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    chatId?: _ChatId | null; 
    gitHubId?: GitHubId | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type _Issue = {
    number?: number | null; 
    state?: IssueState | null; 
    title?: string | null; 
  } 
}
export namespace IssueToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Issue?: Issue[] | null; 
  } 

  export type Issue = {
    _id?: Long | null; 
    resolvingCommits?: ResolvingCommits[] | null; 
    timestamp?: string | null; 
  } 

  export type ResolvingCommits = {
    pushes?: Pushes[] | null; 
    timestamp?: string | null; 
  } 

  export type Pushes = {
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: _Release | null; 
    containers?: Containers[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}
export namespace K8PodToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    K8Pod?: K8Pod[] | null; 
  } 

  export type K8Pod = {
    _id?: Long | null; 
    name?: string | null; 
    state?: string | null; 
    images?: Images[] | null; 
    timestamp?: string | null; 
  } 

  export type Images = {
    tag?: Tag | null; 
  } 

  export type Tag = {
    commit?: Commit | null; 
    timestamp?: string | null; 
  } 

  export type Commit = {
    pushes?: Pushes[] | null; 
    timestamp?: string | null; 
  } 

  export type Pushes = {
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    id?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: _Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type _Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: _Release | null; 
    containers?: Containers[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}
export namespace NotifyAuthorOnReview {
  export type Variables = {
  }

  export type Subscription = {
    Review?: Review[] | null; 
  } 

  export type Review = {
    _id?: Long | null; 
    body?: string | null; 
    state?: ReviewState | null; 
    htmlUrl?: string | null; 
    by?: By[] | null; 
    pullRequest?: PullRequest | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type PullRequest = {
    head?: Head | null; 
    author?: Author | null; 
    number?: number | null; 
    title?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    labels?: Labels[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
    channels?: Channels[] | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    url?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    channelId?: string | null; 
  } 
}
export namespace NotifyBotOwnerOnPush {
  export type Variables = {
  }

  export type Subscription = {
    Push?: Push[] | null; 
  } 

  export type Push = {
    id?: string | null; 
    repo?: Repo | null; 
  } 

  export type Repo = {
    org?: Org | null; 
  } 

  export type Org = {
    team?: Team | null; 
  } 

  export type Team = {
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace NotifyMentionedOnIssue {
  export type Variables = {
  }

  export type Subscription = {
    Issue?: Issue[] | null; 
  } 

  export type Issue = {
    _id?: Long | null; 
    name?: string | null; 
    number?: number | null; 
    title?: string | null; 
    body?: string | null; 
    state?: IssueState | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    openedBy?: OpenedBy | null; 
    closedBy?: ClosedBy | null; 
    assignees?: Assignees[] | null; 
    repo: Repo; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
  } 

  export type OpenedBy = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
  } 

  export type ClosedBy = {
    login?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    chatId?: _ChatId | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    preferences?: _Preferences[] | null; 
  } 

  export type _Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    chatId?: __ChatId | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    preferences?: __Preferences[] | null; 
    chatTeam?: _ChatTeam | null; 
  } 

  export type __Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type _ChatTeam = {
    id?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    labels?: Labels[] | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    channelId?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    gitUrl?: string | null; 
    url?: string | null; 
  } 
}
export namespace NotifyMentionedOnIssueComment {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[] | null; 
  } 

  export type Comment = {
    _id?: Long | null; 
    gitHubId?: string | null; 
    body?: string | null; 
    by?: By | null; 
    issue?: Issue | null; 
  } 

  export type By = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
  } 

  export type Issue = {
    title?: string | null; 
    body?: string | null; 
    state?: IssueState | null; 
    timestamp?: string | null; 
    number?: number | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    openedBy?: OpenedBy | null; 
    repo: Repo; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
  } 

  export type OpenedBy = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
    channels?: Channels[] | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    url?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    channelId?: string | null; 
  } 
}
export namespace NotifyMentionedOnPullRequest {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[] | null; 
  } 

  export type PullRequest = {
    _id?: Long | null; 
    name?: string | null; 
    number?: number | null; 
    title?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    repo?: Repo | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    chatId?: _ChatId | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    preferences?: _Preferences[] | null; 
  } 

  export type _Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    chatId?: __ChatId | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    preferences?: __Preferences[] | null; 
    chatTeam?: _ChatTeam | null; 
  } 

  export type __Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type _ChatTeam = {
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    chatId?: ___ChatId | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    preferences?: ___Preferences[] | null; 
    chatTeam?: __ChatTeam | null; 
  } 

  export type ___Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type __ChatTeam = {
    id?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    labels?: Labels[] | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    channelId?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    gitUrl?: string | null; 
    url?: string | null; 
  } 
}
export namespace NotifyMentionedOnPullRequestComment {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[] | null; 
  } 

  export type Comment = {
    _id?: Long | null; 
    gitHubId?: string | null; 
    body?: string | null; 
    by?: By | null; 
    pullRequest?: PullRequest | null; 
  } 

  export type By = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
  } 

  export type PullRequest = {
    title?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    number?: number | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    author?: Author | null; 
    repo?: Repo | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
    channels?: Channels[] | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    url?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    channelId?: string | null; 
  } 
}
export namespace NotifyPusherOnBuild {
  export type Variables = {
  }

  export type Subscription = {
    Build?: Build[] | null; 
  } 

  export type Build = {
    _id?: Long | null; 
    status?: BuildStatus | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    buildId?: string | null; 
    commit?: Commit | null; 
    repo?: Repo | null; 
  } 

  export type Commit = {
    sha?: string | null; 
    message?: string | null; 
    author?: Author | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
    channels?: Channels[] | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    channelId?: string | null; 
  } 
}
export namespace NotifyReviewerOnPush {
  export type Variables = {
  }

  export type Subscription = {
    Push?: Push[] | null; 
  } 

  export type Push = {
    branch?: string | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    owner?: string | null; 
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    url?: string | null; 
    providerId?: string | null; 
  } 

  export type Commits = {
    author?: Author | null; 
    sha?: string | null; 
    pullRequests?: PullRequests[] | null; 
  } 

  export type Author = {
    login?: string | null; 
  } 

  export type PullRequests = {
    author?: _Author | null; 
    name?: string | null; 
    number?: number | null; 
    title?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    reviewers?: Reviewers[] | null; 
    reviews?: Reviews[] | null; 
  } 

  export type _Author = {
    login?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: Preferences[] | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
  } 
}
export namespace ParentImpactToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    ParentImpact?: ParentImpact[] | null; 
  } 

  export type ParentImpact = {
    _id?: Long | null; 
    commit?: Commit | null; 
  } 

  export type Commit = {
    pushes?: Pushes[] | null; 
    timestamp?: string | null; 
  } 

  export type Pushes = {
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: _Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type _Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: _Release | null; 
    containers?: Containers[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}
export namespace PullRequestToBranchLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[] | null; 
  } 

  export type PullRequest = {
    branch?: Branch | null; 
  } 

  export type Branch = {
    id?: string | null; 
  } 
}
export namespace PullRequestToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[] | null; 
  } 

  export type PullRequest = {
    _id?: Long | null; 
    number?: number | null; 
    name?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    title?: string | null; 
    createdAt?: string | null; 
    mergedAt?: string | null; 
    baseBranchName?: string | null; 
    branchName?: string | null; 
    head?: Head | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    closedAt?: string | null; 
    branch?: Branch | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    comments?: Comments[] | null; 
    commits?: Commits[] | null; 
    builds?: _Builds[] | null; 
    reviews?: Reviews[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    gitHubId?: GitHubId | null; 
    chatId?: ChatId | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId | null; 
    chatId?: _ChatId | null; 
  } 

  export type _GitHubId = {
    login?: string | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    name?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId | null; 
    chatId?: __ChatId | null; 
  } 

  export type __GitHubId = {
    login?: string | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    name?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId | null; 
    chatId?: ___ChatId | null; 
  } 

  export type ___GitHubId = {
    login?: string | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    name?: string | null; 
    person?: ____Person | null; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId | null; 
    chatId?: ____ChatId | null; 
  } 

  export type ____GitHubId = {
    login?: string | null; 
  } 

  export type ____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    timestamp?: string | null; 
    tags?: Tags[] | null; 
    statuses?: Statuses[] | null; 
    author?: _Author | null; 
    builds?: Builds[] | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
  } 

  export type Release = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    description?: string | null; 
    context?: string | null; 
    targetUrl?: string | null; 
  } 

  export type _Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _____Person | null; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId | null; 
    chatId?: _____ChatId | null; 
  } 

  export type _____GitHubId = {
    login?: string | null; 
  } 

  export type _____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type _Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    allowRebaseMerge?: boolean | null; 
    allowSquashMerge?: boolean | null; 
    allowMergeCommit?: boolean | null; 
    defaultBranch?: string | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace PullRequestToPullRequestCommentLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[] | null; 
  } 

  export type PullRequest = {
    _id?: Long | null; 
    title?: string | null; 
    number?: number | null; 
    state?: string | null; 
    merged?: boolean | null; 
    repo?: Repo | null; 
    assignees?: Assignees[] | null; 
    labels?: _Labels[] | null; 
    comments?: Comments[] | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
    labels?: Labels[] | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
    url?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 

  export type _Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    gitHubId?: string | null; 
    timestamp?: string | null; 
    body?: string | null; 
    by?: By | null; 
    pullRequest?: _PullRequest | null; 
  } 

  export type By = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    chatId?: _ChatId | null; 
    gitHubId?: GitHubId | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type _PullRequest = {
    number?: number | null; 
    state?: string | null; 
    title?: string | null; 
  } 
}
export namespace PullRequestToReviewLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[] | null; 
  } 

  export type PullRequest = {
    _id?: Long | null; 
    reviews?: Reviews[] | null; 
  } 

  export type Reviews = {
    _id?: Long | null; 
    body?: string | null; 
    state?: ReviewState | null; 
    htmlUrl?: string | null; 
    by?: By[] | null; 
    pullRequest?: _PullRequest | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type _PullRequest = {
    head?: Head | null; 
    number?: number | null; 
    title?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
    channels?: Channels[] | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
  } 

  export type Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: _Team | null; 
  } 

  export type _Team = {
    id?: string | null; 
  } 
}
export namespace PushToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Push?: Push[] | null; 
  } 

  export type Push = {
    _id?: Long | null; 
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: _Release | null; 
    containers?: Containers[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}
export namespace PushToUnmappedRepo {
  export type Variables = {
  }

  export type Subscription = {
    Push?: Push[] | null; 
  } 

  export type Push = {
    repo?: Repo | null; 
    commits?: Commits[] | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    providerId?: string | null; 
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    channels?: _Channels[] | null; 
    members?: Members[] | null; 
    preferences?: Preferences[] | null; 
  } 

  export type _Channels = {
    channelId?: string | null; 
    name?: string | null; 
  } 

  export type Members = {
    isAtomistBot?: string | null; 
    screenName?: string | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    author?: Author | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    preferences?: _Preferences[] | null; 
    chatTeam?: ChatTeam | null; 
  } 

  export type _Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type ChatTeam = {
    id?: string | null; 
  } 
}
export namespace ReleaseToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Release?: Release[] | null; 
  } 

  export type Release = {
    _id?: Long | null; 
    tag?: Tag | null; 
    timestamp?: string | null; 
  } 

  export type Tag = {
    commit?: Commit | null; 
  } 

  export type Commit = {
    pushes?: Pushes[] | null; 
    timestamp?: string | null; 
  } 

  export type Pushes = {
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: _Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type _Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: _Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: __Release | null; 
    containers?: Containers[] | null; 
  } 

  export type __Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}
export namespace ReviewToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Review?: Review[] | null; 
  } 

  export type Review = {
    _id?: Long | null; 
    pullRequest?: PullRequest | null; 
  } 

  export type PullRequest = {
    number?: number | null; 
    name?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    title?: string | null; 
    createdAt?: string | null; 
    mergedAt?: string | null; 
    baseBranchName?: string | null; 
    branchName?: string | null; 
    head?: Head | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    closedAt?: string | null; 
    branch?: Branch | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    comments?: Comments[] | null; 
    commits?: Commits[] | null; 
    builds?: _Builds[] | null; 
    reviews?: Reviews[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    gitHubId?: GitHubId | null; 
    chatId?: ChatId | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId | null; 
    chatId?: _ChatId | null; 
  } 

  export type _GitHubId = {
    login?: string | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    name?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId | null; 
    chatId?: __ChatId | null; 
  } 

  export type __GitHubId = {
    login?: string | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    name?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId | null; 
    chatId?: ___ChatId | null; 
  } 

  export type ___GitHubId = {
    login?: string | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    name?: string | null; 
    person?: ____Person | null; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId | null; 
    chatId?: ____ChatId | null; 
  } 

  export type ____GitHubId = {
    login?: string | null; 
  } 

  export type ____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    timestamp?: string | null; 
    tags?: Tags[] | null; 
    statuses?: Statuses[] | null; 
    author?: _Author | null; 
    builds?: Builds[] | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
  } 

  export type Release = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    description?: string | null; 
    context?: string | null; 
    targetUrl?: string | null; 
  } 

  export type _Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _____Person | null; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId | null; 
    chatId?: _____ChatId | null; 
  } 

  export type _____GitHubId = {
    login?: string | null; 
  } 

  export type _____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type _Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    allowRebaseMerge?: boolean | null; 
    allowSquashMerge?: boolean | null; 
    allowMergeCommit?: boolean | null; 
    defaultBranch?: string | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace ReviewToReviewLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Review?: Review[] | null; 
  } 

  export type Review = {
    _id?: Long | null; 
    body?: string | null; 
    state?: ReviewState | null; 
    htmlUrl?: string | null; 
    by?: By[] | null; 
    pullRequest?: PullRequest | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type PullRequest = {
    head?: Head | null; 
    number?: number | null; 
    title?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
    channels?: Channels[] | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
  } 

  export type Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: _Team | null; 
  } 

  export type _Team = {
    id?: string | null; 
  } 
}
export namespace StatusOnParentImpact {
  export type Variables = {
  }

  export type Subscription = {
    ParentImpact?: ParentImpact[] | null; 
  } 

  export type ParentImpact = {
    _id?: Long | null; 
    data?: string | null; 
    url?: string | null; 
    commit?: Commit | null; 
  } 

  export type Commit = {
    sha?: string | null; 
    repo?: Repo | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    org?: Org | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
  } 

  export type Provider = {
    apiUrl?: string | null; 
  } 
}
export namespace StatusToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Status?: Status[] | null; 
  } 

  export type Status = {
    _id?: Long | null; 
    commit?: Commit | null; 
  } 

  export type Commit = {
    pullRequests?: PullRequests[] | null; 
  } 

  export type PullRequests = {
    number?: number | null; 
    name?: string | null; 
    body?: string | null; 
    state?: string | null; 
    merged?: boolean | null; 
    timestamp?: string | null; 
    title?: string | null; 
    createdAt?: string | null; 
    mergedAt?: string | null; 
    baseBranchName?: string | null; 
    branchName?: string | null; 
    head?: Head | null; 
    lastAssignedBy?: LastAssignedBy | null; 
    closedAt?: string | null; 
    branch?: Branch | null; 
    author?: Author | null; 
    merger?: Merger | null; 
    assignees?: Assignees[] | null; 
    reviewers?: Reviewers[] | null; 
    labels?: Labels[] | null; 
    comments?: Comments[] | null; 
    commits?: Commits[] | null; 
    builds?: _Builds[] | null; 
    reviews?: Reviews[] | null; 
    repo?: Repo | null; 
  } 

  export type Head = {
    sha?: string | null; 
  } 

  export type LastAssignedBy = {
    login?: string | null; 
    name?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    gitHubId?: GitHubId | null; 
    chatId?: ChatId | null; 
  } 

  export type GitHubId = {
    login?: string | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Branch = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _Person | null; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId | null; 
    chatId?: _ChatId | null; 
  } 

  export type _GitHubId = {
    login?: string | null; 
  } 

  export type _ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Merger = {
    login?: string | null; 
    name?: string | null; 
    person?: __Person | null; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId | null; 
    chatId?: __ChatId | null; 
  } 

  export type __GitHubId = {
    login?: string | null; 
  } 

  export type __ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Assignees = {
    login?: string | null; 
    name?: string | null; 
    person?: ___Person | null; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId | null; 
    chatId?: ___ChatId | null; 
  } 

  export type ___GitHubId = {
    login?: string | null; 
  } 

  export type ___ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Reviewers = {
    login?: string | null; 
    name?: string | null; 
    person?: ____Person | null; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId | null; 
    chatId?: ____ChatId | null; 
  } 

  export type ____GitHubId = {
    login?: string | null; 
  } 

  export type ____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Comments = {
    body?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    timestamp?: string | null; 
    tags?: Tags[] | null; 
    statuses?: Statuses[] | null; 
    author?: _Author | null; 
    builds?: Builds[] | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
  } 

  export type Release = {
    name?: string | null; 
    timestamp?: string | null; 
  } 

  export type Statuses = {
    state?: StatusState | null; 
    description?: string | null; 
    context?: string | null; 
    targetUrl?: string | null; 
  } 

  export type _Author = {
    login?: string | null; 
    name?: string | null; 
    person?: _____Person | null; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId | null; 
    chatId?: _____ChatId | null; 
  } 

  export type _____GitHubId = {
    login?: string | null; 
  } 

  export type _____ChatId = {
    screenName?: string | null; 
    id?: string | null; 
  } 

  export type Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type _Builds = {
    name?: string | null; 
    buildUrl?: string | null; 
    buildId?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Reviews = {
    state?: ReviewState | null; 
    by?: By[] | null; 
  } 

  export type By = {
    login?: string | null; 
  } 

  export type Repo = {
    name?: string | null; 
    owner?: string | null; 
    channels?: Channels[] | null; 
    allowRebaseMerge?: boolean | null; 
    allowSquashMerge?: boolean | null; 
    allowMergeCommit?: boolean | null; 
    defaultBranch?: string | null; 
    org?: Org | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 
}
export namespace StatusToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Status?: Status[] | null; 
  } 

  export type Status = {
    _id?: Long | null; 
    commit?: Commit | null; 
  } 

  export type Commit = {
    pushes?: Pushes[] | null; 
    timestamp?: string | null; 
  } 

  export type Pushes = {
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: _Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type _Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: _Release | null; 
    containers?: Containers[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}
export namespace TagToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Tag?: Tag[] | null; 
  } 

  export type Tag = {
    _id?: Long | null; 
    commit?: Commit | null; 
    timestamp?: string | null; 
  } 

  export type Commit = {
    pushes?: Pushes[] | null; 
    timestamp?: string | null; 
  } 

  export type Pushes = {
    builds?: Builds[] | null; 
    before?: Before | null; 
    after?: After | null; 
    repo?: Repo | null; 
    commits?: Commits[] | null; 
    timestamp?: string | null; 
    branch?: string | null; 
  } 

  export type Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    commit?: _Commit | null; 
    timestamp?: string | null; 
    workflow?: Workflow | null; 
  } 

  export type _Commit = {
    sha?: string | null; 
  } 

  export type Workflow = {
    id?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    config?: string | null; 
    builds?: _Builds[] | null; 
  } 

  export type _Builds = {
    jobId?: string | null; 
    jobName?: string | null; 
    finishedAt?: string | null; 
    startedAt?: string | null; 
    status?: BuildStatus | null; 
    id?: string | null; 
    buildUrl?: string | null; 
  } 

  export type Before = {
    sha?: string | null; 
  } 

  export type After = {
    sha?: string | null; 
    message?: string | null; 
    statuses?: Statuses[] | null; 
    tags?: Tags[] | null; 
  } 

  export type Statuses = {
    context?: string | null; 
    description?: string | null; 
    targetUrl?: string | null; 
    state?: StatusState | null; 
  } 

  export type Tags = {
    name?: string | null; 
    release?: Release | null; 
    builds?: __Builds[] | null; 
  } 

  export type Release = {
    name?: string | null; 
  } 

  export type __Builds = {
    buildId?: string | null; 
    buildUrl?: string | null; 
    name?: string | null; 
    provider?: string | null; 
    status?: BuildStatus | null; 
    timestamp?: string | null; 
  } 

  export type Repo = {
    owner?: string | null; 
    name?: string | null; 
    channels?: Channels[] | null; 
    labels?: Labels[] | null; 
    org?: Org | null; 
    defaultBranch?: string | null; 
  } 

  export type Channels = {
    name?: string | null; 
    team?: Team | null; 
  } 

  export type Team = {
    id?: string | null; 
  } 

  export type Labels = {
    name?: string | null; 
  } 

  export type Org = {
    provider?: Provider | null; 
    team?: _Team | null; 
  } 

  export type Provider = {
    url?: string | null; 
    apiUrl?: string | null; 
    gitUrl?: string | null; 
  } 

  export type _Team = {
    id?: string | null; 
    chatTeams?: ChatTeams[] | null; 
  } 

  export type ChatTeams = {
    id?: string | null; 
    preferences?: Preferences[] | null; 
  } 

  export type Preferences = {
    name?: string | null; 
    value?: string | null; 
  } 

  export type Commits = {
    sha?: string | null; 
    message?: string | null; 
    resolves?: Resolves[] | null; 
    impact?: Impact | null; 
    apps?: Apps[] | null; 
    tags?: _Tags[] | null; 
    author?: Author | null; 
    timestamp?: string | null; 
  } 

  export type Resolves = {
    number?: number | null; 
    name?: string | null; 
    title?: string | null; 
    state?: IssueState | null; 
  } 

  export type Impact = {
    data?: string | null; 
    url?: string | null; 
  } 

  export type Apps = {
    state?: string | null; 
    host?: string | null; 
    domain?: string | null; 
    data?: string | null; 
  } 

  export type _Tags = {
    name?: string | null; 
    release?: _Release | null; 
    containers?: Containers[] | null; 
  } 

  export type _Release = {
    name?: string | null; 
  } 

  export type Containers = {
    pods?: Pods[] | null; 
    image?: string | null; 
  } 

  export type Pods = {
    host?: string | null; 
    state?: string | null; 
    name?: string | null; 
  } 

  export type Author = {
    login?: string | null; 
    person?: Person | null; 
  } 

  export type Person = {
    chatId?: ChatId | null; 
  } 

  export type ChatId = {
    screenName?: string | null; 
  } 
}

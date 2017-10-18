/* tslint:disable */

/* Long type */
export type Long = any;
/* Enum for IssueState */
export type IssueState = "open" | "closed";

/* Ordering Enum for Issue */
export type _IssueOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "number_asc" | "number_desc" | "name_asc" | "name_desc" | "title_asc" | "title_desc" | "body_asc" | "body_desc" | "state_asc" | "state_desc" | "timestamp_asc" | "timestamp_desc" | "action_asc" | "action_desc" | "createdAt_asc" | "createdAt_desc" | "updatedAt_asc" | "updatedAt_desc" | "closedAt_asc" | "closedAt_desc";

/* Ordering Enum for Repo */
export type _RepoOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "owner_asc" | "owner_desc" | "name_asc" | "name_desc" | "allowRebaseMerge_asc" | "allowRebaseMerge_desc" | "allowSquashMerge_asc" | "allowSquashMerge_desc" | "allowMergeCommit_asc" | "allowMergeCommit_desc" | "defaultBranch_asc" | "defaultBranch_desc";

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

/* Ordering Enum for Person */
export type _PersonOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "forename_asc" | "forename_desc" | "surname_asc" | "surname_desc";

/* Ordering Enum for ChatTeam */
export type _ChatTeamOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "provider_asc" | "provider_desc" | "domain_asc" | "domain_desc" | "messageCount_asc" | "messageCount_desc" | "emailDomain_asc" | "emailDomain_desc";

/* Ordering Enum for Org */
export type _OrgOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "owner_asc" | "owner_desc";

/* Ordering Enum for GitHubOrgWebhook */
export type _GitHubOrgWebhookOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "url_asc" | "url_desc";

/* Ordering Enum for ChannelLink */
export type _ChannelLinkOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc";

/* Ordering Enum for PullRequest */
export type _PullRequestOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "number_asc" | "number_desc" | "name_asc" | "name_desc" | "body_asc" | "body_desc" | "state_asc" | "state_desc" | "merged_asc" | "merged_desc" | "timestamp_asc" | "timestamp_desc" | "baseBranchName_asc" | "baseBranchName_desc" | "branchName_asc" | "branchName_desc" | "title_asc" | "title_desc" | "createdAt_asc" | "createdAt_desc" | "updatedAt_asc" | "updatedAt_desc" | "closedAt_asc" | "closedAt_desc" | "mergedAt_asc" | "mergedAt_desc";

/* Ordering Enum for Commit */
export type _CommitOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "sha_asc" | "sha_desc" | "message_asc" | "message_desc" | "timestamp_asc" | "timestamp_desc";

/* Enum for BuildStatus */
export type BuildStatus = "passed" | "broken" | "failed" | "started" | "canceled";

/* Enum for BuildTrigger */
export type BuildTrigger = "pull_request" | "push";

/* Ordering Enum for Build */
export type _BuildOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "buildId_asc" | "buildId_desc" | "name_asc" | "name_desc" | "status_asc" | "status_desc" | "buildUrl_asc" | "buildUrl_desc" | "compareUrl_asc" | "compareUrl_desc" | "trigger_asc" | "trigger_desc" | "provider_asc" | "provider_desc" | "pullRequestNumber_asc" | "pullRequestNumber_desc" | "startedAt_asc" | "startedAt_desc" | "finishedAt_asc" | "finishedAt_desc" | "timestamp_asc" | "timestamp_desc";

/* Ordering Enum for Push */
export type _PushOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "timestamp_asc" | "timestamp_desc" | "branch_asc" | "branch_desc";

/* Ordering Enum for SpinnakerPipeline */
export type _SpinnakerPipelineOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "executionId_asc" | "executionId_desc" | "application_asc" | "application_desc" | "eventType_asc" | "eventType_desc" | "taskName_asc" | "taskName_desc" | "stageName_asc" | "stageName_desc" | "stageType_asc" | "stageType_desc" | "waitingForJudgement_asc" | "waitingForJudgement_desc";

/* Ordering Enum for SpinnakerStage */
export type _SpinnakerStageOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "type_asc" | "type_desc" | "status_asc" | "status_desc" | "startTime_asc" | "startTime_desc" | "endTime_asc" | "endTime_desc" | "refId_asc" | "refId_desc";

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
export type _BranchOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "name_asc" | "name_desc" | "deleted_asc" | "deleted_desc" | "timestamp_asc" | "timestamp_desc";

/* Enum for ReviewState */
export type ReviewState = "requested" | "pending" | "approved" | "commented" | "changes_requested";

/* Ordering Enum for Review */
export type _ReviewOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "gitHubId_asc" | "gitHubId_desc" | "body_asc" | "body_desc" | "state_asc" | "state_desc" | "submittedAt_asc" | "submittedAt_desc" | "htmlUrl_asc" | "htmlUrl_desc";

/* Enum for CommentCommentType */
export type CommentCommentType = "review" | "pullRequest" | "issue";

/* Ordering Enum for Comment */
export type _CommentOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "body_asc" | "body_desc" | "timestamp_asc" | "timestamp_desc" | "gitHubId_asc" | "gitHubId_desc" | "path_asc" | "path_desc" | "position_asc" | "position_desc" | "htmlUrl_asc" | "htmlUrl_desc" | "commentType_asc" | "commentType_desc";

/* Ordering Enum for K8Cluster */
export type _K8ClusterOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "name_asc" | "name_desc" | "availabilityZone_asc" | "availabilityZone_desc";

/* Ordering Enum for PushImpact */
export type _PushImpactOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "url_asc" | "url_desc" | "data_asc" | "data_desc";

/* Ordering Enum for PullRequestImpact */
export type _PullRequestImpactOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc" | "url_asc" | "url_desc" | "data_asc" | "data_desc";

/* Ordering Enum for UserJoinedChannel */
export type _UserJoinedChannelOrdering = "atmTeamId_asc" | "atmTeamId_desc" | "id_asc" | "id_desc";

export namespace SetTeamnPreference {
  export type Variables = {
    name: string;
    value: string;
  }

  export type Mutation = {
    setTeamPreference?: SetTeamPreference[]; 
  } 

  export type SetTeamPreference = {
    name?: string; 
    value?: string; 
  } 
}
export namespace SetUserPreference {
  export type Variables = {
    userId: string;
    name: string;
    value: string;
  }

  export type Mutation = {
    setUserPreference?: SetUserPreference[]; 
  } 

  export type SetUserPreference = {
    name?: string; 
    value?: string; 
  } 
}
export namespace BotOwner {
  export type Variables = {
  }

  export type Query = {
    ChatId?: ChatId[]; 
  } 

  export type ChatId = {
    isOwner?: boolean; 
    isAdmin?: boolean; 
    isPrimaryOwner?: boolean; 
    screenName?: string; 
  } 
}
export namespace Branch {
  export type Variables = {
    teamId: string;
    repoOwner: string;
    repoName: string;
    branchName: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[]; 
  } 

  export type ChatTeam = {
    orgs?: Orgs[]; 
  } 

  export type Orgs = {
    repo?: Repo[]; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    branches?: Branches[]; 
  } 

  export type Branches = {
    name?: string; 
    deleted?: boolean; 
    pullRequests?: PullRequests[]; 
  } 

  export type PullRequests = {
    state?: string; 
    commits?: Commits[]; 
  } 

  export type Commits = {
    sha?: string; 
  } 
}
export namespace Channels {
  export type Variables = {
    first: number;
    offset: number;
  }

  export type Query = {
    Repo?: Repo[]; 
  } 

  export type Repo = {
    name?: string; 
    channels?: Channels[]; 
  } 

  export type Channels = {
    name?: string; 
  } 
}
export namespace Repo {
  export type Variables = {
    channelName: string;
    repoOwner: string;
    repoName: string;
  }

  export type Query = {
    ChatChannel?: ChatChannel[]; 
  } 

  export type ChatChannel = {
    name?: string; 
    repos?: Repos[]; 
  } 

  export type Repos = {
    name?: string; 
    owner?: string; 
  } 
}
export namespace ChatId {
  export type Variables = {
    teamId: string;
    chatId: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[]; 
  } 

  export type ChatTeam = {
    members?: Members[]; 
  } 

  export type Members = {
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
    gitHubId?: GitHubId; 
    emails?: Emails[]; 
  } 

  export type ChatId = {
    screenName?: string; 
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type GitHubId = {
    login?: string; 
    name?: string; 
  } 

  export type Emails = {
    address?: string; 
  } 
}
export namespace Commit {
  export type Variables = {
    sha: string;
  }

  export type Query = {
    Commit?: Commit[]; 
  } 

  export type Commit = {
    pushes?: Pushes[]; 
    timestamp?: string; 
  } 

  export type Pushes = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    id?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: _Commit; 
  } 

  export type _Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: Tags[]; 
    author?: Author; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
    containers?: Containers[]; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace GitHubId {
  export type Variables = {
    teamId: string;
    gitHubId: string;
  }

  export type Query = {
    GitHubId?: GitHubId[]; 
  } 

  export type GitHubId = {
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
    preferences?: Preferences[]; 
    id?: string; 
    chatTeam?: ChatTeam; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type ChatTeam = {
    name?: string; 
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
    ChatTeam?: ChatTeam[]; 
  } 

  export type ChatTeam = {
    orgs?: Orgs[]; 
  } 

  export type Orgs = {
    repo?: Repo[]; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    issue?: Issue[]; 
  } 

  export type Issue = {
    _id?: Long; 
    name?: string; 
    title?: string; 
    body?: string; 
    state?: IssueState; 
    number?: number; 
    createdAt?: string; 
    updatedAt?: string; 
    closedAt?: string; 
    resolvingCommits?: ResolvingCommits[]; 
    openedBy?: OpenedBy; 
    closedBy?: ClosedBy; 
    assignees?: Assignees[]; 
    repo: _Repo; 
    labels?: _Labels[]; 
    timestamp?: string; 
  } 

  export type ResolvingCommits = {
    author?: Author; 
  } 

  export type Author = {
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 

  export type OpenedBy = {
    login?: string; 
  } 

  export type ClosedBy = {
    login?: string; 
  } 

  export type Assignees = {
    login?: string; 
  } 

  export type _Repo = {
    name?: string; 
    owner?: string; 
    labels?: Labels[]; 
    channels?: Channels[]; 
    org?: Org; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
    gitUrl?: string; 
    url?: string; 
  } 

  export type _Labels = {
    name?: string; 
  } 
}
export namespace Pr {
  export type Variables = {
    teamId: string;
    orgOwner: string;
    repoName: string;
    prName: string;
  }

  export type Query = {
    ChatTeam?: ChatTeam[]; 
  } 

  export type ChatTeam = {
    orgs?: Orgs[]; 
  } 

  export type Orgs = {
    repo?: Repo[]; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    pullRequest?: PullRequest[]; 
  } 

  export type PullRequest = {
    state?: string; 
    number?: number; 
    name?: string; 
    title?: string; 
    body?: string; 
    repo?: _Repo; 
  } 

  export type _Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 
}
export namespace ApplicationToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Application?: Application[]; 
  } 

  export type Application = {
    _id?: Long; 
    commits?: Commits[]; 
    timestamp?: string; 
  } 

  export type Commits = {
    pushes?: Pushes[]; 
    timestamp?: string; 
  } 

  export type Pushes = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: _Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    buildId?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: Commit; 
    timestamp?: string; 
  } 

  export type Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type _Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: _Release; 
    containers?: Containers[]; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace AutoMergeOnBuild {
  export type Variables = {
  }

  export type Subscription = {
    Build?: Build[]; 
  } 

  export type Build = {
    _id?: Long; 
    pullRequest?: PullRequest; 
  } 

  export type PullRequest = {
    number?: number; 
    body?: string; 
    title?: string; 
    branch?: Branch; 
    head?: Head; 
    reviews?: Reviews[]; 
    commits?: Commits[]; 
    repo?: Repo; 
    comments?: Comments[]; 
  } 

  export type Branch = {
    name?: string; 
  } 

  export type Head = {
    sha?: string; 
    statuses?: Statuses[]; 
  } 

  export type Statuses = {
    state?: StatusState; 
    context?: string; 
    description?: string; 
    targetUrl?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Commits = {
    message?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 
}
export namespace AutoMergeOnPullRequest {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[]; 
  } 

  export type PullRequest = {
    _id?: Long; 
    number?: number; 
    body?: string; 
    title?: string; 
    branch?: Branch; 
    head?: Head; 
    reviews?: Reviews[]; 
    commits?: Commits[]; 
    repo?: Repo; 
    comments?: Comments[]; 
  } 

  export type Branch = {
    name?: string; 
  } 

  export type Head = {
    sha?: string; 
    statuses?: Statuses[]; 
  } 

  export type Statuses = {
    state?: StatusState; 
    context?: string; 
    description?: string; 
    targetUrl?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Commits = {
    message?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 
}
export namespace AutoMergeOnReview {
  export type Variables = {
  }

  export type Subscription = {
    Review?: Review[]; 
  } 

  export type Review = {
    _id?: Long; 
    pullRequest?: PullRequest; 
  } 

  export type PullRequest = {
    number?: number; 
    body?: string; 
    title?: string; 
    branch?: Branch; 
    head?: Head; 
    reviews?: Reviews[]; 
    commits?: Commits[]; 
    repo?: Repo; 
    comments?: Comments[]; 
  } 

  export type Branch = {
    name?: string; 
  } 

  export type Head = {
    sha?: string; 
    statuses?: Statuses[]; 
  } 

  export type Statuses = {
    state?: StatusState; 
    context?: string; 
    description?: string; 
    targetUrl?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Commits = {
    message?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 
}
export namespace AutoMergeOnStatus {
  export type Variables = {
  }

  export type Subscription = {
    Status?: Status[]; 
  } 

  export type Status = {
    _id?: Long; 
    commit?: Commit; 
  } 

  export type Commit = {
    pullRequests?: PullRequests[]; 
  } 

  export type PullRequests = {
    number?: number; 
    body?: string; 
    title?: string; 
    branch?: Branch; 
    head?: Head; 
    reviews?: Reviews[]; 
    commits?: Commits[]; 
    repo?: Repo; 
    comments?: Comments[]; 
  } 

  export type Branch = {
    name?: string; 
  } 

  export type Head = {
    sha?: string; 
    statuses?: Statuses[]; 
  } 

  export type Statuses = {
    state?: StatusState; 
    context?: string; 
    description?: string; 
    targetUrl?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Commits = {
    message?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 
}
export namespace BranchToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Branch?: Branch[]; 
  } 

  export type Branch = {
    _id?: Long; 
    pullRequests?: PullRequests[]; 
  } 

  export type PullRequests = {
    number?: number; 
    name?: string; 
    body?: string; 
    state?: string; 
    merged?: boolean; 
    timestamp?: string; 
    title?: string; 
    baseBranchName?: string; 
    branchName?: string; 
    createdAt?: string; 
    mergedAt?: string; 
    head?: Head; 
    lastAssignedBy?: LastAssignedBy; 
    closedAt?: string; 
    branch?: _Branch; 
    author?: Author; 
    merger?: Merger; 
    assignees?: Assignees[]; 
    reviewers?: Reviewers[]; 
    labels?: Labels[]; 
    comments?: Comments[]; 
    commits?: Commits[]; 
    builds?: Builds[]; 
    reviews?: Reviews[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type LastAssignedBy = {
    login?: string; 
    name?: string; 
    person?: Person; 
  } 

  export type Person = {
    gitHubId?: GitHubId; 
    chatId?: ChatId; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type _Branch = {
    name?: string; 
    deleted?: boolean; 
    timestamp?: string; 
  } 

  export type Author = {
    login?: string; 
    name?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId; 
    chatId?: _ChatId; 
  } 

  export type _GitHubId = {
    login?: string; 
  } 

  export type _ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Merger = {
    login?: string; 
    name?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId; 
    chatId?: __ChatId; 
  } 

  export type __GitHubId = {
    login?: string; 
  } 

  export type __ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Assignees = {
    login?: string; 
    name?: string; 
    person?: ___Person; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId; 
    chatId?: ___ChatId; 
  } 

  export type ___GitHubId = {
    login?: string; 
  } 

  export type ___ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Reviewers = {
    login?: string; 
    name?: string; 
    person?: ____Person; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId; 
    chatId?: ____ChatId; 
  } 

  export type ____GitHubId = {
    login?: string; 
  } 

  export type ____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 

  export type Commits = {
    sha?: string; 
    timestamp?: string; 
    message?: string; 
    tags?: Tags[]; 
    statuses?: Statuses[]; 
    author?: _Author; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
    timestamp?: string; 
  } 

  export type Statuses = {
    state?: StatusState; 
    description?: string; 
    context?: string; 
    targetUrl?: string; 
  } 

  export type _Author = {
    login?: string; 
    name?: string; 
    person?: _____Person; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId; 
    chatId?: _____ChatId; 
  } 

  export type _____GitHubId = {
    login?: string; 
  } 

  export type _____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Builds = {
    name?: string; 
    status?: BuildStatus; 
    buildUrl?: string; 
    provider?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    allowRebaseMerge?: boolean; 
    allowSquashMerge?: boolean; 
    allowMergeCommit?: boolean; 
    defaultBranch?: string; 
    org?: Org; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 
}
export namespace BuildToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Build?: Build[]; 
  } 

  export type Build = {
    _id?: Long; 
    push?: Push; 
    timestamp?: string; 
  } 

  export type Push = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    buildId?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: Commit; 
    timestamp?: string; 
  } 

  export type Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: _Release; 
    containers?: Containers[]; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace CommentToIssueCommentLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[]; 
  } 

  export type Comment = {
    _id?: Long; 
    gitHubId?: string; 
    timestamp?: string; 
    body?: string; 
    by?: By; 
    issue?: Issue; 
  } 

  export type By = {
    login?: string; 
    name?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
    gitHubId?: GitHubId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type Issue = {
    title?: string; 
    number?: number; 
    state?: IssueState; 
    repo: Repo; 
    openedBy?: OpenedBy; 
    closedBy?: ClosedBy; 
    assignees?: Assignees[]; 
    resolvingCommits?: ResolvingCommits[]; 
    labels?: _Labels[]; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    org?: Org; 
    labels?: Labels[]; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
    url?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type OpenedBy = {
    login?: string; 
  } 

  export type ClosedBy = {
    login?: string; 
  } 

  export type Assignees = {
    login?: string; 
  } 

  export type ResolvingCommits = {
    sha?: string; 
    message?: string; 
    author?: Author; 
  } 

  export type Author = {
    person?: _Person; 
  } 

  export type _Person = {
    chatId?: _ChatId; 
  } 

  export type _ChatId = {
    screenName?: string; 
  } 

  export type _Labels = {
    name?: string; 
  } 
}
export namespace CommentToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[]; 
  } 

  export type Comment = {
    _id?: Long; 
    pullRequest?: PullRequest; 
  } 

  export type PullRequest = {
    number?: number; 
    name?: string; 
    body?: string; 
    state?: string; 
    merged?: boolean; 
    timestamp?: string; 
    title?: string; 
    createdAt?: string; 
    mergedAt?: string; 
    baseBranchName?: string; 
    branchName?: string; 
    head?: Head; 
    lastAssignedBy?: LastAssignedBy; 
    closedAt?: string; 
    branch?: Branch; 
    author?: Author; 
    merger?: Merger; 
    assignees?: Assignees[]; 
    reviewers?: Reviewers[]; 
    labels?: Labels[]; 
    comments?: Comments[]; 
    commits?: Commits[]; 
    builds?: Builds[]; 
    reviews?: Reviews[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type LastAssignedBy = {
    login?: string; 
    name?: string; 
    person?: Person; 
  } 

  export type Person = {
    gitHubId?: GitHubId; 
    chatId?: ChatId; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Branch = {
    name?: string; 
    deleted?: boolean; 
    timestamp?: string; 
  } 

  export type Author = {
    login?: string; 
    name?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId; 
    chatId?: _ChatId; 
  } 

  export type _GitHubId = {
    login?: string; 
  } 

  export type _ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Merger = {
    login?: string; 
    name?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId; 
    chatId?: __ChatId; 
  } 

  export type __GitHubId = {
    login?: string; 
  } 

  export type __ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Assignees = {
    login?: string; 
    name?: string; 
    person?: ___Person; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId; 
    chatId?: ___ChatId; 
  } 

  export type ___GitHubId = {
    login?: string; 
  } 

  export type ___ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Reviewers = {
    login?: string; 
    name?: string; 
    person?: ____Person; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId; 
    chatId?: ____ChatId; 
  } 

  export type ____GitHubId = {
    login?: string; 
  } 

  export type ____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    timestamp?: string; 
    tags?: Tags[]; 
    statuses?: Statuses[]; 
    author?: _Author; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
    timestamp?: string; 
  } 

  export type Statuses = {
    state?: StatusState; 
    description?: string; 
    context?: string; 
    targetUrl?: string; 
  } 

  export type _Author = {
    login?: string; 
    name?: string; 
    person?: _____Person; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId; 
    chatId?: _____ChatId; 
  } 

  export type _____GitHubId = {
    login?: string; 
  } 

  export type _____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Builds = {
    name?: string; 
    status?: BuildStatus; 
    buildUrl?: string; 
    provider?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    allowRebaseMerge?: boolean; 
    allowSquashMerge?: boolean; 
    allowMergeCommit?: boolean; 
    defaultBranch?: string; 
    org?: Org; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 
}
export namespace CommentToPullRequestCommentLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[]; 
  } 

  export type Comment = {
    _id?: Long; 
    gitHubId?: string; 
    timestamp?: string; 
    body?: string; 
    by?: By; 
    pullRequest?: PullRequest; 
  } 

  export type By = {
    login?: string; 
    name?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
    gitHubId?: GitHubId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type PullRequest = {
    title?: string; 
    number?: number; 
    state?: string; 
    merged?: boolean; 
    repo?: Repo; 
    author?: Author; 
    assignees?: Assignees[]; 
    labels?: _Labels[]; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    org?: Org; 
    labels?: Labels[]; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
    url?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    chatId?: _ChatId; 
  } 

  export type _ChatId = {
    screenName?: string; 
  } 

  export type Assignees = {
    login?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    chatId?: __ChatId; 
  } 

  export type __ChatId = {
    screenName?: string; 
  } 

  export type _Labels = {
    name?: string; 
  } 
}
export namespace CommitToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Commit?: Commit[]; 
  } 

  export type Commit = {
    _id?: Long; 
    pullRequests?: PullRequests[]; 
  } 

  export type PullRequests = {
    number?: number; 
    name?: string; 
    body?: string; 
    state?: string; 
    merged?: boolean; 
    timestamp?: string; 
    title?: string; 
    createdAt?: string; 
    mergedAt?: string; 
    baseBranchName?: string; 
    branchName?: string; 
    head?: Head; 
    lastAssignedBy?: LastAssignedBy; 
    closedAt?: string; 
    branch?: Branch; 
    author?: Author; 
    merger?: Merger; 
    assignees?: Assignees[]; 
    reviewers?: Reviewers[]; 
    labels?: Labels[]; 
    comments?: Comments[]; 
    commits?: Commits[]; 
    builds?: Builds[]; 
    reviews?: Reviews[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type LastAssignedBy = {
    login?: string; 
    name?: string; 
    person?: Person; 
  } 

  export type Person = {
    gitHubId?: GitHubId; 
    chatId?: ChatId; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Branch = {
    name?: string; 
    deleted?: boolean; 
    timestamp?: string; 
  } 

  export type Author = {
    login?: string; 
    name?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId; 
    chatId?: _ChatId; 
  } 

  export type _GitHubId = {
    login?: string; 
  } 

  export type _ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Merger = {
    login?: string; 
    name?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId; 
    chatId?: __ChatId; 
  } 

  export type __GitHubId = {
    login?: string; 
  } 

  export type __ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Assignees = {
    login?: string; 
    name?: string; 
    person?: ___Person; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId; 
    chatId?: ___ChatId; 
  } 

  export type ___GitHubId = {
    login?: string; 
  } 

  export type ___ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Reviewers = {
    login?: string; 
    name?: string; 
    person?: ____Person; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId; 
    chatId?: ____ChatId; 
  } 

  export type ____GitHubId = {
    login?: string; 
  } 

  export type ____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    timestamp?: string; 
    tags?: Tags[]; 
    statuses?: Statuses[]; 
    author?: _Author; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
    timestamp?: string; 
  } 

  export type Statuses = {
    state?: StatusState; 
    description?: string; 
    context?: string; 
    targetUrl?: string; 
  } 

  export type _Author = {
    login?: string; 
    name?: string; 
    person?: _____Person; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId; 
    chatId?: _____ChatId; 
  } 

  export type _____GitHubId = {
    login?: string; 
  } 

  export type _____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Builds = {
    name?: string; 
    status?: BuildStatus; 
    buildUrl?: string; 
    provider?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    allowRebaseMerge?: boolean; 
    allowSquashMerge?: boolean; 
    allowMergeCommit?: boolean; 
    defaultBranch?: string; 
    org?: Org; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 
}
export namespace IssueToIssueLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Issue?: Issue[]; 
  } 

  export type Issue = {
    _id?: Long; 
    name?: string; 
    title?: string; 
    body?: string; 
    state?: IssueState; 
    number?: number; 
    createdAt?: string; 
    updatedAt?: string; 
    closedAt?: string; 
    resolvingCommits?: ResolvingCommits[]; 
    openedBy?: OpenedBy; 
    closedBy?: ClosedBy; 
    assignees?: Assignees[]; 
    repo: Repo; 
    labels?: _Labels[]; 
    timestamp?: string; 
  } 

  export type ResolvingCommits = {
    author?: Author; 
  } 

  export type Author = {
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 

  export type OpenedBy = {
    login?: string; 
  } 

  export type ClosedBy = {
    login?: string; 
  } 

  export type Assignees = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    labels?: Labels[]; 
    channels?: Channels[]; 
    org?: Org; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
    gitUrl?: string; 
    url?: string; 
  } 

  export type _Labels = {
    name?: string; 
  } 
}
export namespace IssueToIssueCommentLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Issue?: Issue[]; 
  } 

  export type Issue = {
    _id?: Long; 
    title?: string; 
    number?: number; 
    state?: IssueState; 
    repo: Repo; 
    openedBy?: OpenedBy; 
    closedBy?: ClosedBy; 
    assignees?: Assignees[]; 
    resolvingCommits?: ResolvingCommits[]; 
    labels?: _Labels[]; 
    comments?: Comments[]; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    org?: Org; 
    labels?: Labels[]; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
    url?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type OpenedBy = {
    login?: string; 
  } 

  export type ClosedBy = {
    login?: string; 
  } 

  export type Assignees = {
    login?: string; 
  } 

  export type ResolvingCommits = {
    sha?: string; 
    message?: string; 
    author?: Author; 
  } 

  export type Author = {
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 

  export type _Labels = {
    name?: string; 
  } 

  export type Comments = {
    gitHubId?: string; 
    timestamp?: string; 
    body?: string; 
    by?: By; 
    issue?: _Issue; 
  } 

  export type By = {
    login?: string; 
    name?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    chatId?: _ChatId; 
    gitHubId?: GitHubId; 
  } 

  export type _ChatId = {
    screenName?: string; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type _Issue = {
    number?: number; 
    state?: IssueState; 
  } 
}
export namespace IssueToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Issue?: Issue[]; 
  } 

  export type Issue = {
    _id?: Long; 
    resolvingCommits?: ResolvingCommits[]; 
    timestamp?: string; 
  } 

  export type ResolvingCommits = {
    pushes?: Pushes[]; 
    timestamp?: string; 
  } 

  export type Pushes = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    buildId?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: Commit; 
    timestamp?: string; 
  } 

  export type Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: _Release; 
    containers?: Containers[]; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace K8PodToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    K8Pod?: K8Pod[]; 
  } 

  export type K8Pod = {
    _id?: Long; 
    name?: string; 
    state?: string; 
    images?: Images[]; 
    timestamp?: string; 
  } 

  export type Images = {
    tag?: Tag; 
  } 

  export type Tag = {
    commit?: Commit; 
    timestamp?: string; 
  } 

  export type Commit = {
    pushes?: Pushes[]; 
    timestamp?: string; 
  } 

  export type Pushes = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    id?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: _Commit; 
    timestamp?: string; 
  } 

  export type _Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: _Release; 
    containers?: Containers[]; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace NotifyAuthorOnReview {
  export type Variables = {
  }

  export type Subscription = {
    Review?: Review[]; 
  } 

  export type Review = {
    _id?: Long; 
    body?: string; 
    state?: ReviewState; 
    htmlUrl?: string; 
    by?: By[]; 
    pullRequest?: PullRequest; 
  } 

  export type By = {
    login?: string; 
  } 

  export type PullRequest = {
    head?: Head; 
    author?: Author; 
    number?: number; 
    title?: string; 
    state?: string; 
    merged?: boolean; 
    labels?: Labels[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
    channels?: Channels[]; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
  } 

  export type Channels = {
    name?: string; 
    channelId?: string; 
  } 
}
export namespace NotifiyBotOwnerOnPush {
  export type Variables = {
  }

  export type Subscription = {
    Push?: Push[]; 
  } 

  export type Push = {
    id?: string; 
    repo?: Repo; 
  } 

  export type Repo = {
    org?: Org; 
  } 

  export type Org = {
    chatTeam?: ChatTeam; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 
}
export namespace NotifyMentionedOnIssue {
  export type Variables = {
  }

  export type Subscription = {
    Issue?: Issue[]; 
  } 

  export type Issue = {
    _id?: Long; 
    name?: string; 
    number?: number; 
    title?: string; 
    body?: string; 
    state?: IssueState; 
    lastAssignedBy?: LastAssignedBy; 
    openedBy?: OpenedBy; 
    closedBy?: ClosedBy; 
    assignees?: Assignees[]; 
    repo: Repo; 
  } 

  export type LastAssignedBy = {
    login?: string; 
  } 

  export type OpenedBy = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type ClosedBy = {
    login?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    chatId?: _ChatId; 
  } 

  export type _ChatId = {
    screenName?: string; 
    preferences?: _Preferences[]; 
  } 

  export type _Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Assignees = {
    login?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    chatId?: __ChatId; 
  } 

  export type __ChatId = {
    screenName?: string; 
    preferences?: __Preferences[]; 
  } 

  export type __Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    labels?: Labels[]; 
    channels?: Channels[]; 
    org?: Org; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Channels = {
    name?: string; 
    channelId?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
    gitUrl?: string; 
    url?: string; 
  } 
}
export namespace NotifyMentionedOnIssueComment {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[]; 
  } 

  export type Comment = {
    _id?: Long; 
    gitHubId?: string; 
    body?: string; 
    by?: By; 
    issue?: Issue; 
  } 

  export type By = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Issue = {
    title?: string; 
    body?: string; 
    state?: IssueState; 
    timestamp?: string; 
    number?: number; 
    lastAssignedBy?: LastAssignedBy; 
    openedBy?: OpenedBy; 
    repo: Repo; 
  } 

  export type LastAssignedBy = {
    login?: string; 
  } 

  export type OpenedBy = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
    channels?: Channels[]; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
  } 

  export type Channels = {
    name?: string; 
    channelId?: string; 
  } 
}
export namespace NotifyMentionedOnPullRequest {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[]; 
  } 

  export type PullRequest = {
    _id?: Long; 
    name?: string; 
    number?: number; 
    title?: string; 
    body?: string; 
    state?: string; 
    merged?: boolean; 
    lastAssignedBy?: LastAssignedBy; 
    author?: Author; 
    merger?: Merger; 
    assignees?: Assignees[]; 
    reviewers?: Reviewers[]; 
    repo?: Repo; 
  } 

  export type LastAssignedBy = {
    login?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Merger = {
    login?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    chatId?: _ChatId; 
  } 

  export type _ChatId = {
    screenName?: string; 
    preferences?: _Preferences[]; 
  } 

  export type _Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Assignees = {
    login?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    chatId?: __ChatId; 
  } 

  export type __ChatId = {
    screenName?: string; 
    preferences?: __Preferences[]; 
  } 

  export type __Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Reviewers = {
    login?: string; 
    person?: ___Person; 
  } 

  export type ___Person = {
    chatId?: ___ChatId; 
  } 

  export type ___ChatId = {
    screenName?: string; 
    preferences?: ___Preferences[]; 
  } 

  export type ___Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    labels?: Labels[]; 
    channels?: Channels[]; 
    org?: Org; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Channels = {
    name?: string; 
    channelId?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
    gitUrl?: string; 
    url?: string; 
  } 
}
export namespace NotifyMentionedOnPullRequestComment {
  export type Variables = {
  }

  export type Subscription = {
    Comment?: Comment[]; 
  } 

  export type Comment = {
    _id?: Long; 
    gitHubId?: string; 
    body?: string; 
    by?: By; 
    pullRequest?: PullRequest; 
  } 

  export type By = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type PullRequest = {
    title?: string; 
    body?: string; 
    state?: string; 
    timestamp?: string; 
    number?: number; 
    lastAssignedBy?: LastAssignedBy; 
    author?: Author; 
    repo?: Repo; 
  } 

  export type LastAssignedBy = {
    login?: string; 
  } 

  export type Author = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
    channels?: Channels[]; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
  } 

  export type Channels = {
    name?: string; 
    channelId?: string; 
  } 
}
export namespace NotifyPusherOnBuild {
  export type Variables = {
  }

  export type Subscription = {
    Build?: Build[]; 
  } 

  export type Build = {
    _id?: Long; 
    status?: BuildStatus; 
    buildUrl?: string; 
    name?: string; 
    commit?: Commit; 
    repo?: Repo; 
  } 

  export type Commit = {
    sha?: string; 
    message?: string; 
    author?: Author; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
    channels?: Channels[]; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
  } 

  export type Channels = {
    name?: string; 
    channelId?: string; 
  } 
}
export namespace ParentImpactToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    ParentImpact?: ParentImpact[]; 
  } 

  export type ParentImpact = {
    _id?: Long; 
    commit?: Commit; 
  } 

  export type Commit = {
    pushes?: Pushes[]; 
    timestamp?: string; 
  } 

  export type Pushes = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    buildId?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: _Commit; 
    timestamp?: string; 
  } 

  export type _Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: _Release; 
    containers?: Containers[]; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace PullRequestToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[]; 
  } 

  export type PullRequest = {
    _id?: Long; 
    number?: number; 
    name?: string; 
    body?: string; 
    state?: string; 
    merged?: boolean; 
    timestamp?: string; 
    title?: string; 
    createdAt?: string; 
    mergedAt?: string; 
    baseBranchName?: string; 
    branchName?: string; 
    head?: Head; 
    lastAssignedBy?: LastAssignedBy; 
    closedAt?: string; 
    branch?: Branch; 
    author?: Author; 
    merger?: Merger; 
    assignees?: Assignees[]; 
    reviewers?: Reviewers[]; 
    labels?: Labels[]; 
    comments?: Comments[]; 
    commits?: Commits[]; 
    builds?: Builds[]; 
    reviews?: Reviews[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type LastAssignedBy = {
    login?: string; 
    name?: string; 
    person?: Person; 
  } 

  export type Person = {
    gitHubId?: GitHubId; 
    chatId?: ChatId; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Branch = {
    name?: string; 
    deleted?: boolean; 
    timestamp?: string; 
  } 

  export type Author = {
    login?: string; 
    name?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId; 
    chatId?: _ChatId; 
  } 

  export type _GitHubId = {
    login?: string; 
  } 

  export type _ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Merger = {
    login?: string; 
    name?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId; 
    chatId?: __ChatId; 
  } 

  export type __GitHubId = {
    login?: string; 
  } 

  export type __ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Assignees = {
    login?: string; 
    name?: string; 
    person?: ___Person; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId; 
    chatId?: ___ChatId; 
  } 

  export type ___GitHubId = {
    login?: string; 
  } 

  export type ___ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Reviewers = {
    login?: string; 
    name?: string; 
    person?: ____Person; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId; 
    chatId?: ____ChatId; 
  } 

  export type ____GitHubId = {
    login?: string; 
  } 

  export type ____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    timestamp?: string; 
    tags?: Tags[]; 
    statuses?: Statuses[]; 
    author?: _Author; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
    timestamp?: string; 
  } 

  export type Statuses = {
    state?: StatusState; 
    description?: string; 
    context?: string; 
    targetUrl?: string; 
  } 

  export type _Author = {
    login?: string; 
    name?: string; 
    person?: _____Person; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId; 
    chatId?: _____ChatId; 
  } 

  export type _____GitHubId = {
    login?: string; 
  } 

  export type _____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Builds = {
    name?: string; 
    status?: BuildStatus; 
    buildUrl?: string; 
    provider?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    allowRebaseMerge?: boolean; 
    allowSquashMerge?: boolean; 
    allowMergeCommit?: boolean; 
    defaultBranch?: string; 
    org?: Org; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 
}
export namespace PullRequestToPullRequestCommentLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[]; 
  } 

  export type PullRequest = {
    _id?: Long; 
    title?: string; 
    number?: number; 
    state?: string; 
    merged?: boolean; 
    repo?: Repo; 
    assignees?: Assignees[]; 
    labels?: _Labels[]; 
    comments?: Comments[]; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    org?: Org; 
    labels?: Labels[]; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
    url?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Assignees = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 

  export type _Labels = {
    name?: string; 
  } 

  export type Comments = {
    gitHubId?: string; 
    timestamp?: string; 
    body?: string; 
    by?: By; 
    pullRequest?: _PullRequest; 
  } 

  export type By = {
    login?: string; 
    name?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    chatId?: _ChatId; 
    gitHubId?: GitHubId; 
  } 

  export type _ChatId = {
    screenName?: string; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type _PullRequest = {
    number?: number; 
    state?: string; 
  } 
}
export namespace PullRequestToReviewLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    PullRequest?: PullRequest[]; 
  } 

  export type PullRequest = {
    _id?: Long; 
    reviews?: Reviews[]; 
  } 

  export type Reviews = {
    _id?: Long; 
    body?: string; 
    state?: ReviewState; 
    htmlUrl?: string; 
    by?: By[]; 
    pullRequest?: _PullRequest; 
  } 

  export type By = {
    login?: string; 
  } 

  export type _PullRequest = {
    head?: Head; 
    number?: number; 
    title?: string; 
    state?: string; 
    merged?: boolean; 
    reviewers?: Reviewers[]; 
    labels?: Labels[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type Reviewers = {
    login?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
    channels?: Channels[]; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 
}
export namespace PushToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Push?: Push[]; 
  } 

  export type Push = {
    _id?: Long; 
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    buildId?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: Commit; 
    timestamp?: string; 
  } 

  export type Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: _Release; 
    containers?: Containers[]; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace ReleaseToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Release?: Release[]; 
  } 

  export type Release = {
    _id?: Long; 
    tag?: Tag; 
    timestamp?: string; 
  } 

  export type Tag = {
    commit?: Commit; 
  } 

  export type Commit = {
    pushes?: Pushes[]; 
    timestamp?: string; 
  } 

  export type Pushes = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    buildId?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: _Commit; 
    timestamp?: string; 
  } 

  export type _Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: _Release; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: __Release; 
    containers?: Containers[]; 
  } 

  export type __Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace ReviewToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Review?: Review[]; 
  } 

  export type Review = {
    _id?: Long; 
    pullRequest?: PullRequest; 
  } 

  export type PullRequest = {
    number?: number; 
    name?: string; 
    body?: string; 
    state?: string; 
    merged?: boolean; 
    timestamp?: string; 
    title?: string; 
    createdAt?: string; 
    mergedAt?: string; 
    baseBranchName?: string; 
    branchName?: string; 
    head?: Head; 
    lastAssignedBy?: LastAssignedBy; 
    closedAt?: string; 
    branch?: Branch; 
    author?: Author; 
    merger?: Merger; 
    assignees?: Assignees[]; 
    reviewers?: Reviewers[]; 
    labels?: Labels[]; 
    comments?: Comments[]; 
    commits?: Commits[]; 
    builds?: Builds[]; 
    reviews?: Reviews[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type LastAssignedBy = {
    login?: string; 
    name?: string; 
    person?: Person; 
  } 

  export type Person = {
    gitHubId?: GitHubId; 
    chatId?: ChatId; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Branch = {
    name?: string; 
    deleted?: boolean; 
    timestamp?: string; 
  } 

  export type Author = {
    login?: string; 
    name?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId; 
    chatId?: _ChatId; 
  } 

  export type _GitHubId = {
    login?: string; 
  } 

  export type _ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Merger = {
    login?: string; 
    name?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId; 
    chatId?: __ChatId; 
  } 

  export type __GitHubId = {
    login?: string; 
  } 

  export type __ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Assignees = {
    login?: string; 
    name?: string; 
    person?: ___Person; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId; 
    chatId?: ___ChatId; 
  } 

  export type ___GitHubId = {
    login?: string; 
  } 

  export type ___ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Reviewers = {
    login?: string; 
    name?: string; 
    person?: ____Person; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId; 
    chatId?: ____ChatId; 
  } 

  export type ____GitHubId = {
    login?: string; 
  } 

  export type ____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    timestamp?: string; 
    tags?: Tags[]; 
    statuses?: Statuses[]; 
    author?: _Author; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
    timestamp?: string; 
  } 

  export type Statuses = {
    state?: StatusState; 
    description?: string; 
    context?: string; 
    targetUrl?: string; 
  } 

  export type _Author = {
    login?: string; 
    name?: string; 
    person?: _____Person; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId; 
    chatId?: _____ChatId; 
  } 

  export type _____GitHubId = {
    login?: string; 
  } 

  export type _____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Builds = {
    name?: string; 
    status?: BuildStatus; 
    buildUrl?: string; 
    provider?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    allowRebaseMerge?: boolean; 
    allowSquashMerge?: boolean; 
    allowMergeCommit?: boolean; 
    defaultBranch?: string; 
    org?: Org; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 
}
export namespace ReviewToReviewLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Review?: Review[]; 
  } 

  export type Review = {
    _id?: Long; 
    body?: string; 
    state?: ReviewState; 
    htmlUrl?: string; 
    by?: By[]; 
    pullRequest?: PullRequest; 
  } 

  export type By = {
    login?: string; 
  } 

  export type PullRequest = {
    head?: Head; 
    number?: number; 
    title?: string; 
    state?: string; 
    merged?: boolean; 
    reviewers?: Reviewers[]; 
    labels?: Labels[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type Reviewers = {
    login?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
    channels?: Channels[]; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 
}
export namespace StatusOnParentImpact {
  export type Variables = {
  }

  export type Subscription = {
    ParentImpact?: ParentImpact[]; 
  } 

  export type ParentImpact = {
    _id?: Long; 
    data?: string; 
    url?: string; 
    commit?: Commit; 
  } 

  export type Commit = {
    sha?: string; 
    repo?: Repo; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    org?: Org; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    apiUrl?: string; 
  } 
}
export namespace StatusToPullRequestLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Status?: Status[]; 
  } 

  export type Status = {
    _id?: Long; 
    commit?: Commit; 
  } 

  export type Commit = {
    pullRequests?: PullRequests[]; 
  } 

  export type PullRequests = {
    number?: number; 
    name?: string; 
    body?: string; 
    state?: string; 
    merged?: boolean; 
    timestamp?: string; 
    title?: string; 
    createdAt?: string; 
    mergedAt?: string; 
    baseBranchName?: string; 
    branchName?: string; 
    head?: Head; 
    lastAssignedBy?: LastAssignedBy; 
    closedAt?: string; 
    branch?: Branch; 
    author?: Author; 
    merger?: Merger; 
    assignees?: Assignees[]; 
    reviewers?: Reviewers[]; 
    labels?: Labels[]; 
    comments?: Comments[]; 
    commits?: Commits[]; 
    builds?: Builds[]; 
    reviews?: Reviews[]; 
    repo?: Repo; 
  } 

  export type Head = {
    sha?: string; 
  } 

  export type LastAssignedBy = {
    login?: string; 
    name?: string; 
    person?: Person; 
  } 

  export type Person = {
    gitHubId?: GitHubId; 
    chatId?: ChatId; 
  } 

  export type GitHubId = {
    login?: string; 
  } 

  export type ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Branch = {
    name?: string; 
    deleted?: boolean; 
    timestamp?: string; 
  } 

  export type Author = {
    login?: string; 
    name?: string; 
    person?: _Person; 
  } 

  export type _Person = {
    gitHubId?: _GitHubId; 
    chatId?: _ChatId; 
  } 

  export type _GitHubId = {
    login?: string; 
  } 

  export type _ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Merger = {
    login?: string; 
    name?: string; 
    person?: __Person; 
  } 

  export type __Person = {
    gitHubId?: __GitHubId; 
    chatId?: __ChatId; 
  } 

  export type __GitHubId = {
    login?: string; 
  } 

  export type __ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Assignees = {
    login?: string; 
    name?: string; 
    person?: ___Person; 
  } 

  export type ___Person = {
    gitHubId?: ___GitHubId; 
    chatId?: ___ChatId; 
  } 

  export type ___GitHubId = {
    login?: string; 
  } 

  export type ___ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Reviewers = {
    login?: string; 
    name?: string; 
    person?: ____Person; 
  } 

  export type ____Person = {
    gitHubId?: ____GitHubId; 
    chatId?: ____ChatId; 
  } 

  export type ____GitHubId = {
    login?: string; 
  } 

  export type ____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Comments = {
    body?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    timestamp?: string; 
    tags?: Tags[]; 
    statuses?: Statuses[]; 
    author?: _Author; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
    timestamp?: string; 
  } 

  export type Statuses = {
    state?: StatusState; 
    description?: string; 
    context?: string; 
    targetUrl?: string; 
  } 

  export type _Author = {
    login?: string; 
    name?: string; 
    person?: _____Person; 
  } 

  export type _____Person = {
    gitHubId?: _____GitHubId; 
    chatId?: _____ChatId; 
  } 

  export type _____GitHubId = {
    login?: string; 
  } 

  export type _____ChatId = {
    screenName?: string; 
    id?: string; 
  } 

  export type Builds = {
    name?: string; 
    status?: BuildStatus; 
    buildUrl?: string; 
    provider?: string; 
  } 

  export type Reviews = {
    state?: ReviewState; 
    by?: By[]; 
  } 

  export type By = {
    login?: string; 
  } 

  export type Repo = {
    name?: string; 
    owner?: string; 
    channels?: Channels[]; 
    allowRebaseMerge?: boolean; 
    allowSquashMerge?: boolean; 
    allowMergeCommit?: boolean; 
    defaultBranch?: string; 
    org?: Org; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 
}
export namespace StatusToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Status?: Status[]; 
  } 

  export type Status = {
    _id?: Long; 
    commit?: Commit; 
  } 

  export type Commit = {
    pushes?: Pushes[]; 
    timestamp?: string; 
  } 

  export type Pushes = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    buildId?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: _Commit; 
    timestamp?: string; 
  } 

  export type _Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: _Release; 
    containers?: Containers[]; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}
export namespace TagToPushLifecycle {
  export type Variables = {
  }

  export type Subscription = {
    Tag?: Tag[]; 
  } 

  export type Tag = {
    _id?: Long; 
    commit?: Commit; 
    timestamp?: string; 
  } 

  export type Commit = {
    pushes?: Pushes[]; 
    timestamp?: string; 
  } 

  export type Pushes = {
    builds?: Builds[]; 
    before?: Before; 
    after?: After; 
    repo?: Repo; 
    commits?: Commits[]; 
    timestamp?: string; 
    branch?: string; 
  } 

  export type Builds = {
    buildId?: string; 
    buildUrl?: string; 
    name?: string; 
    provider?: string; 
    status?: BuildStatus; 
    commit?: _Commit; 
    timestamp?: string; 
  } 

  export type _Commit = {
    sha?: string; 
  } 

  export type Before = {
    sha?: string; 
  } 

  export type After = {
    sha?: string; 
    message?: string; 
    statuses?: Statuses[]; 
    tags?: Tags[]; 
  } 

  export type Statuses = {
    context?: string; 
    description?: string; 
    targetUrl?: string; 
    state?: StatusState; 
  } 

  export type Tags = {
    name?: string; 
    release?: Release; 
  } 

  export type Release = {
    name?: string; 
  } 

  export type Repo = {
    owner?: string; 
    name?: string; 
    channels?: Channels[]; 
    labels?: Labels[]; 
    org?: Org; 
    defaultBranch?: string; 
  } 

  export type Channels = {
    name?: string; 
  } 

  export type Labels = {
    name?: string; 
  } 

  export type Org = {
    provider?: Provider; 
    chatTeam?: ChatTeam; 
  } 

  export type Provider = {
    url?: string; 
    apiUrl?: string; 
    gitUrl?: string; 
  } 

  export type ChatTeam = {
    preferences?: Preferences[]; 
  } 

  export type Preferences = {
    name?: string; 
    value?: string; 
  } 

  export type Commits = {
    sha?: string; 
    message?: string; 
    resolves?: Resolves[]; 
    impact?: Impact; 
    apps?: Apps[]; 
    tags?: _Tags[]; 
    author?: Author; 
    timestamp?: string; 
  } 

  export type Resolves = {
    number?: number; 
    name?: string; 
    title?: string; 
    state?: IssueState; 
  } 

  export type Impact = {
    data?: string; 
    url?: string; 
  } 

  export type Apps = {
    state?: string; 
    host?: string; 
    domain?: string; 
    data?: string; 
  } 

  export type _Tags = {
    name?: string; 
    release?: _Release; 
    containers?: Containers[]; 
  } 

  export type _Release = {
    name?: string; 
  } 

  export type Containers = {
    pods?: Pods[]; 
    image?: string; 
  } 

  export type Pods = {
    host?: string; 
    state?: string; 
    name?: string; 
  } 

  export type Author = {
    login?: string; 
    person?: Person; 
  } 

  export type Person = {
    chatId?: ChatId; 
  } 

  export type ChatId = {
    screenName?: string; 
  } 
}

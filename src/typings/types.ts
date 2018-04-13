/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* tslint:disable */

/* Long type */
export type Long = any;
/* Enum for IssueState */
export enum IssueState {
  open = "open",
  closed = "closed"
}

/* Ordering Enum for Issue */
export enum _IssueOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  number_asc = "number_asc",
  number_desc = "number_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  title_asc = "title_asc",
  title_desc = "title_desc",
  body_asc = "body_asc",
  body_desc = "body_desc",
  state_asc = "state_asc",
  state_desc = "state_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  action_asc = "action_asc",
  action_desc = "action_desc",
  createdAt_asc = "createdAt_asc",
  createdAt_desc = "createdAt_desc",
  updatedAt_asc = "updatedAt_asc",
  updatedAt_desc = "updatedAt_desc",
  closedAt_asc = "closedAt_asc",
  closedAt_desc = "closedAt_desc"
}

/* Ordering Enum for Repo */
export enum _RepoOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  owner_asc = "owner_asc",
  owner_desc = "owner_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  allowRebaseMerge_asc = "allowRebaseMerge_asc",
  allowRebaseMerge_desc = "allowRebaseMerge_desc",
  allowSquashMerge_asc = "allowSquashMerge_asc",
  allowSquashMerge_desc = "allowSquashMerge_desc",
  allowMergeCommit_asc = "allowMergeCommit_asc",
  allowMergeCommit_desc = "allowMergeCommit_desc",
  gitHubId_asc = "gitHubId_asc",
  gitHubId_desc = "gitHubId_desc",
  defaultBranch_asc = "defaultBranch_asc",
  defaultBranch_desc = "defaultBranch_desc"
}

/* Ordering Enum for Label */
export enum _LabelOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  default_asc = "default_asc",
  default_desc = "default_desc",
  color_asc = "color_asc",
  color_desc = "color_desc"
}

/* Ordering Enum for ChatChannel */
export enum _ChatChannelOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  provider_asc = "provider_asc",
  provider_desc = "provider_desc",
  normalizedName_asc = "normalizedName_asc",
  normalizedName_desc = "normalizedName_desc",
  channelId_asc = "channelId_asc",
  channelId_desc = "channelId_desc",
  isDefault_asc = "isDefault_asc",
  isDefault_desc = "isDefault_desc",
  botInvitedSelf_asc = "botInvitedSelf_asc",
  botInvitedSelf_desc = "botInvitedSelf_desc"
}

/* Ordering Enum for ChatId */
export enum _ChatIdOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  screenName_asc = "screenName_asc",
  screenName_desc = "screenName_desc",
  userId_asc = "userId_asc",
  userId_desc = "userId_desc",
  provider_asc = "provider_asc",
  provider_desc = "provider_desc",
  isAtomistBot_asc = "isAtomistBot_asc",
  isAtomistBot_desc = "isAtomistBot_desc",
  isOwner_asc = "isOwner_asc",
  isOwner_desc = "isOwner_desc",
  isPrimaryOwner_asc = "isPrimaryOwner_asc",
  isPrimaryOwner_desc = "isPrimaryOwner_desc",
  isAdmin_asc = "isAdmin_asc",
  isAdmin_desc = "isAdmin_desc",
  isBot_asc = "isBot_asc",
  isBot_desc = "isBot_desc",
  timezoneLabel_asc = "timezoneLabel_asc",
  timezoneLabel_desc = "timezoneLabel_desc"
}

/* Ordering Enum for Email */
export enum _EmailOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  address_asc = "address_asc",
  address_desc = "address_desc"
}

/* Ordering Enum for GitHubId */
export enum _GitHubIdOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  login_asc = "login_asc",
  login_desc = "login_desc",
  name_asc = "name_asc",
  name_desc = "name_desc"
}

/* Enum for ProviderType */
export enum ProviderType {
  bitbucket_cloud = "bitbucket_cloud",
  github_com = "github_com",
  ghe = "ghe",
  bitbucket = "bitbucket"
}

/* Ordering Enum for GitHubProvider */
export enum _GitHubProviderOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  url_asc = "url_asc",
  url_desc = "url_desc",
  providerId_asc = "providerId_asc",
  providerId_desc = "providerId_desc",
  apiUrl_asc = "apiUrl_asc",
  apiUrl_desc = "apiUrl_desc",
  gitUrl_asc = "gitUrl_asc",
  gitUrl_desc = "gitUrl_desc",
  providerType_asc = "providerType_asc",
  providerType_desc = "providerType_desc"
}

/* Ordering Enum for Team */
export enum _TeamOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  description_asc = "description_asc",
  description_desc = "description_desc",
  iconUrl_asc = "iconUrl_asc",
  iconUrl_desc = "iconUrl_desc"
}

/* Ordering Enum for Person */
export enum _PersonOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  forename_asc = "forename_asc",
  forename_desc = "forename_desc",
  surname_asc = "surname_asc",
  surname_desc = "surname_desc",
  name_asc = "name_asc",
  name_desc = "name_desc"
}

/* Enum for OwnerType */
export enum OwnerType {
  user = "user",
  organization = "organization"
}

/* Ordering Enum for Org */
export enum _OrgOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  owner_asc = "owner_asc",
  owner_desc = "owner_desc",
  ownerType_asc = "ownerType_asc",
  ownerType_desc = "ownerType_desc"
}

/* Ordering Enum for SCMProvider */
export enum _SCMProviderOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  url_asc = "url_asc",
  url_desc = "url_desc",
  providerId_asc = "providerId_asc",
  providerId_desc = "providerId_desc",
  apiUrl_asc = "apiUrl_asc",
  apiUrl_desc = "apiUrl_desc",
  gitUrl_asc = "gitUrl_asc",
  gitUrl_desc = "gitUrl_desc",
  providerType_asc = "providerType_asc",
  providerType_desc = "providerType_desc"
}

/* Enum for WebhookType */
export enum WebhookType {
  organization = "organization",
  repository = "repository"
}

/* Ordering Enum for GitHubOrgWebhook */
export enum _GitHubOrgWebhookOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  url_asc = "url_asc",
  url_desc = "url_desc",
  webhookType_asc = "webhookType_asc",
  webhookType_desc = "webhookType_desc"
}

/* Ordering Enum for Webhook */
export enum _WebhookOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  url_asc = "url_asc",
  url_desc = "url_desc",
  webhookType_asc = "webhookType_asc",
  webhookType_desc = "webhookType_desc"
}

/* Ordering Enum for ChatTeam */
export enum _ChatTeamOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  provider_asc = "provider_asc",
  provider_desc = "provider_desc",
  domain_asc = "domain_asc",
  domain_desc = "domain_desc",
  messageCount_asc = "messageCount_asc",
  messageCount_desc = "messageCount_desc",
  emailDomain_asc = "emailDomain_asc",
  emailDomain_desc = "emailDomain_desc"
}

/* Ordering Enum for ChannelLink */
export enum _ChannelLinkOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc"
}

/* Ordering Enum for PullRequest */
export enum _PullRequestOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  number_asc = "number_asc",
  number_desc = "number_desc",
  prId_asc = "prId_asc",
  prId_desc = "prId_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  body_asc = "body_asc",
  body_desc = "body_desc",
  state_asc = "state_asc",
  state_desc = "state_desc",
  merged_asc = "merged_asc",
  merged_desc = "merged_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  baseBranchName_asc = "baseBranchName_asc",
  baseBranchName_desc = "baseBranchName_desc",
  branchName_asc = "branchName_asc",
  branchName_desc = "branchName_desc",
  title_asc = "title_asc",
  title_desc = "title_desc",
  createdAt_asc = "createdAt_asc",
  createdAt_desc = "createdAt_desc",
  updatedAt_asc = "updatedAt_asc",
  updatedAt_desc = "updatedAt_desc",
  closedAt_asc = "closedAt_asc",
  closedAt_desc = "closedAt_desc",
  mergedAt_asc = "mergedAt_asc",
  mergedAt_desc = "mergedAt_desc"
}

/* Ordering Enum for Commit */
export enum _CommitOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  sha_asc = "sha_asc",
  sha_desc = "sha_desc",
  message_asc = "message_asc",
  message_desc = "message_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc"
}

/* Enum for BuildStatus */
export enum BuildStatus {
  passed = "passed",
  broken = "broken",
  failed = "failed",
  started = "started",
  canceled = "canceled"
}

/* Enum for BuildTrigger */
export enum BuildTrigger {
  pull_request = "pull_request",
  push = "push",
  tag = "tag",
  cron = "cron"
}

/* Ordering Enum for Build */
export enum _BuildOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  buildId_asc = "buildId_asc",
  buildId_desc = "buildId_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  status_asc = "status_asc",
  status_desc = "status_desc",
  buildUrl_asc = "buildUrl_asc",
  buildUrl_desc = "buildUrl_desc",
  compareUrl_asc = "compareUrl_asc",
  compareUrl_desc = "compareUrl_desc",
  trigger_asc = "trigger_asc",
  trigger_desc = "trigger_desc",
  provider_asc = "provider_asc",
  provider_desc = "provider_desc",
  pullRequestNumber_asc = "pullRequestNumber_asc",
  pullRequestNumber_desc = "pullRequestNumber_desc",
  startedAt_asc = "startedAt_asc",
  startedAt_desc = "startedAt_desc",
  finishedAt_asc = "finishedAt_asc",
  finishedAt_desc = "finishedAt_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  workflowId_asc = "workflowId_asc",
  workflowId_desc = "workflowId_desc",
  jobName_asc = "jobName_asc",
  jobName_desc = "jobName_desc",
  jobId_asc = "jobId_asc",
  jobId_desc = "jobId_desc",
  data_asc = "data_asc",
  data_desc = "data_desc"
}

/* Ordering Enum for Push */
export enum _PushOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  branch_asc = "branch_asc",
  branch_desc = "branch_desc"
}

/* Ordering Enum for Tag */
export enum _TagOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  description_asc = "description_asc",
  description_desc = "description_desc",
  ref_asc = "ref_asc",
  ref_desc = "ref_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc"
}

/* Ordering Enum for Release */
export enum _ReleaseOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc"
}

/* Ordering Enum for DockerImage */
export enum _DockerImageOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  image_asc = "image_asc",
  image_desc = "image_desc",
  imageName_asc = "imageName_asc",
  imageName_desc = "imageName_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc"
}

/* Ordering Enum for K8Pod */
export enum _K8PodOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  phase_asc = "phase_asc",
  phase_desc = "phase_desc",
  environment_asc = "environment_asc",
  environment_desc = "environment_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  baseName_asc = "baseName_asc",
  baseName_desc = "baseName_desc",
  namespace_asc = "namespace_asc",
  namespace_desc = "namespace_desc",
  statusJSON_asc = "statusJSON_asc",
  statusJSON_desc = "statusJSON_desc",
  host_asc = "host_asc",
  host_desc = "host_desc",
  state_asc = "state_asc",
  state_desc = "state_desc",
  specsJSON_asc = "specsJSON_asc",
  specsJSON_desc = "specsJSON_desc",
  envJSON_asc = "envJSON_asc",
  envJSON_desc = "envJSON_desc",
  metadataJSON_asc = "metadataJSON_asc",
  metadataJSON_desc = "metadataJSON_desc",
  resourceVersion_asc = "resourceVersion_asc",
  resourceVersion_desc = "resourceVersion_desc"
}

/* Ordering Enum for K8Container */
export enum _K8ContainerOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  imageName_asc = "imageName_asc",
  imageName_desc = "imageName_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  environment_asc = "environment_asc",
  environment_desc = "environment_desc",
  containerJSON_asc = "containerJSON_asc",
  containerJSON_desc = "containerJSON_desc",
  state_asc = "state_asc",
  state_desc = "state_desc",
  ready_asc = "ready_asc",
  ready_desc = "ready_desc",
  restartCount_asc = "restartCount_asc",
  restartCount_desc = "restartCount_desc",
  statusJSON_asc = "statusJSON_asc",
  statusJSON_desc = "statusJSON_desc",
  resourceVersion_asc = "resourceVersion_asc",
  resourceVersion_desc = "resourceVersion_desc",
  containerID_asc = "containerID_asc",
  containerID_desc = "containerID_desc"
}

/* Ordering Enum for SpinnakerPipeline */
export enum _SpinnakerPipelineOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  executionId_asc = "executionId_asc",
  executionId_desc = "executionId_desc",
  application_asc = "application_asc",
  application_desc = "application_desc",
  eventType_asc = "eventType_asc",
  eventType_desc = "eventType_desc",
  taskName_asc = "taskName_asc",
  taskName_desc = "taskName_desc",
  stageName_asc = "stageName_asc",
  stageName_desc = "stageName_desc",
  stageType_asc = "stageType_asc",
  stageType_desc = "stageType_desc",
  waitingForJudgement_asc = "waitingForJudgement_asc",
  waitingForJudgement_desc = "waitingForJudgement_desc"
}

/* Ordering Enum for SpinnakerStage */
export enum _SpinnakerStageOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  type_asc = "type_asc",
  type_desc = "type_desc",
  status_asc = "status_asc",
  status_desc = "status_desc",
  startTime_asc = "startTime_asc",
  startTime_desc = "startTime_desc",
  endTime_asc = "endTime_asc",
  endTime_desc = "endTime_desc",
  refId_asc = "refId_asc",
  refId_desc = "refId_desc"
}

/* Ordering Enum for Workflow */
export enum _WorkflowOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  workflowId_asc = "workflowId_asc",
  workflowId_desc = "workflowId_desc",
  provider_asc = "provider_asc",
  provider_desc = "provider_desc",
  config_asc = "config_asc",
  config_desc = "config_desc"
}

/* Enum for StatusState */
export enum StatusState {
  pending = "pending",
  success = "success",
  error = "error",
  failure = "failure"
}

/* Ordering Enum for Status */
export enum _StatusOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  state_asc = "state_asc",
  state_desc = "state_desc",
  description_asc = "description_asc",
  description_desc = "description_desc",
  targetUrl_asc = "targetUrl_asc",
  targetUrl_desc = "targetUrl_desc",
  context_asc = "context_asc",
  context_desc = "context_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc"
}

/* Ordering Enum for HerokuApp */
export enum _HerokuAppOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  app_asc = "app_asc",
  app_desc = "app_desc",
  url_asc = "url_asc",
  url_desc = "url_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  user_asc = "user_asc",
  user_desc = "user_desc",
  appId_asc = "appId_asc",
  appId_desc = "appId_desc",
  release_asc = "release_asc",
  release_desc = "release_desc"
}

/* Ordering Enum for Application */
export enum _ApplicationOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  state_asc = "state_asc",
  state_desc = "state_desc",
  host_asc = "host_asc",
  host_desc = "host_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  domain_asc = "domain_asc",
  domain_desc = "domain_desc",
  data_asc = "data_asc",
  data_desc = "data_desc"
}

/* Ordering Enum for Fingerprint */
export enum _FingerprintOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  sha_asc = "sha_asc",
  sha_desc = "sha_desc",
  data_asc = "data_asc",
  data_desc = "data_desc"
}

/* Ordering Enum for ParentImpact */
export enum _ParentImpactOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  url_asc = "url_asc",
  url_desc = "url_desc",
  data_asc = "data_asc",
  data_desc = "data_desc"
}

/* Ordering Enum for Branch */
export enum _BranchOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc"
}

/* Enum for ReviewState */
export enum ReviewState {
  requested = "requested",
  pending = "pending",
  approved = "approved",
  commented = "commented",
  changes_requested = "changes_requested"
}

/* Ordering Enum for Review */
export enum _ReviewOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  gitHubId_asc = "gitHubId_asc",
  gitHubId_desc = "gitHubId_desc",
  body_asc = "body_asc",
  body_desc = "body_desc",
  state_asc = "state_asc",
  state_desc = "state_desc",
  submittedAt_asc = "submittedAt_asc",
  submittedAt_desc = "submittedAt_desc",
  htmlUrl_asc = "htmlUrl_asc",
  htmlUrl_desc = "htmlUrl_desc"
}

/* Enum for CommentCommentType */
export enum CommentCommentType {
  review = "review",
  pullRequest = "pullRequest",
  issue = "issue"
}

/* Ordering Enum for Comment */
export enum _CommentOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  body_asc = "body_asc",
  body_desc = "body_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc",
  gitHubId_asc = "gitHubId_asc",
  gitHubId_desc = "gitHubId_desc",
  path_asc = "path_asc",
  path_desc = "path_desc",
  position_asc = "position_asc",
  position_desc = "position_desc",
  htmlUrl_asc = "htmlUrl_asc",
  htmlUrl_desc = "htmlUrl_desc",
  commentType_asc = "commentType_asc",
  commentType_desc = "commentType_desc"
}

/* Ordering Enum for DeletedBranch */
export enum _DeletedBranchOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  name_asc = "name_asc",
  name_desc = "name_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc"
}

/* Ordering Enum for ImageLinked */
export enum _ImageLinkedOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  timestamp_asc = "timestamp_asc",
  timestamp_desc = "timestamp_desc"
}

/* Ordering Enum for PushImpact */
export enum _PushImpactOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  url_asc = "url_asc",
  url_desc = "url_desc",
  data_asc = "data_asc",
  data_desc = "data_desc"
}

/* Ordering Enum for PullRequestImpact */
export enum _PullRequestImpactOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc",
  url_asc = "url_asc",
  url_desc = "url_desc",
  data_asc = "data_asc",
  data_desc = "data_desc"
}

/* Ordering Enum for UserJoinedChannel */
export enum _UserJoinedChannelOrdering {
  atmTeamId_asc = "atmTeamId_asc",
  atmTeamId_desc = "atmTeamId_desc",
  id_asc = "id_asc",
  id_desc = "id_desc"
}

/* asc or desc ordering. Must be used with orderBy */
export enum _Ordering {
  desc = "desc",
  asc = "asc"
}

export namespace AddBotToSlackChannel {
  export type Variables = {
    teamId: string;
    channelId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    addBotToSlackChannel?: AddBotToSlackChannel | null;
  };

  export type AddBotToSlackChannel = {
    __typename?: "SlackChannel";
    id?: string | null;
  };
}
export namespace CreateSlackChannel {
  export type Variables = {
    teamId: string;
    name: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    createSlackChannel?: CreateSlackChannel | null;
  };

  export type CreateSlackChannel = {
    __typename?: "SlackChannel";
    id?: string | null;
  };
}
export namespace InviteUserToSlackChannel {
  export type Variables = {
    teamId: string;
    channelId: string;
    userId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    inviteUserToSlackChannel?: InviteUserToSlackChannel | null;
  };

  export type InviteUserToSlackChannel = {
    __typename?: "SlackChannel";
    id?: string | null;
  };
}
export namespace LinkSlackChannelToRepo {
  export type Variables = {
    teamId: string;
    channelId: string;
    repo: string;
    owner: string;
    providerId?: string | null;
  };

  export type Mutation = {
    __typename?: "Mutation";
    linkSlackChannelToRepo?: LinkSlackChannelToRepo | null;
  };

  export type LinkSlackChannelToRepo = {
    __typename?: "SlackChannel";
    id?: string | null;
  };
}
export namespace SetChatTeamPreference {
  export type Variables = {
    teamId: string;
    name: string;
    value: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    setChatTeamPreference?: SetChatTeamPreference[] | null;
  };

  export type SetChatTeamPreference = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };
}
export namespace SetChatUserPreference {
  export type Variables = {
    teamId: string;
    userId: string;
    name: string;
    value: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    setChatUserPreference?: SetChatUserPreference[] | null;
  };

  export type SetChatUserPreference = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };
}
export namespace SetOwnerLogin {
  export type Variables = {
    owner: string;
    login: string;
    providerId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    setOwnerLogin?: SetOwnerLogin | null;
  };

  export type SetOwnerLogin = {
    __typename?: "OwnerLogin";
    owner?: string | null;
    providerId?: string | null;
    login?: string | null;
  };
}
export namespace SetRepoLogin {
  export type Variables = {
    owner: string;
    repo: string;
    login: string;
    providerId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    setRepoLogin?: SetRepoLogin | null;
  };

  export type SetRepoLogin = {
    __typename?: "RepoLogin";
    owner?: string | null;
    repo?: string | null;
    providerId?: string | null;
    login?: string | null;
  };
}
export namespace UnlinkSlackChannelFromRepo {
  export type Variables = {
    teamId: string;
    channelId: string;
    repo: string;
    owner: string;
    providerId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    unlinkSlackChannelFromRepo?: UnlinkSlackChannelFromRepo | null;
  };

  export type UnlinkSlackChannelFromRepo = {
    __typename?: "SlackChannel";
    id?: string | null;
  };
}
export namespace BotOwner {
  export type Variables = {
    teamId: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    members?: Members[] | null;
  };

  export type Members = {
    __typename?: "ChatId";
    screenName?: string | null;
  };
}
export namespace Branch {
  export type Variables = {
    owner: string;
    repo: string;
    branch: string;
  };

  export type Query = {
    __typename?: "Query";
    Repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    branches?: Branches[] | null;
  };

  export type Branches = {
    __typename?: "Branch";
    name?: string | null;
    pullRequests?: PullRequests[] | null;
  };

  export type PullRequests = {
    __typename?: "PullRequest";
    state?: string | null;
    commits?: Commits[] | null;
  };

  export type Commits = {
    __typename?: "Commit";
    sha?: string | null;
  };
}
export namespace BranchWithPullRequest {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";
    Branch?: Branch[] | null;
  };

  export type Branch = {
    __typename?: "Branch";
    id?: string | null;
    pullRequests?: PullRequests[] | null;
    commit?: Commit | null;
    name?: string | null;
    repo?: Repo | null;
    timestamp?: string | null;
  };

  export type PullRequests = {
    __typename?: "PullRequest";
    merged?: boolean | null;
  };

  export type Commit = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    defaultBranch?: string | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
    name?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    team?: _Team | null;
    provider?: Provider | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    id?: string | null;
    apiUrl?: string | null;
    url?: string | null;
  };
}
export namespace CardEvents {
  export type Variables = {
    key: string[];
  };

  export type Query = {
    __typename?: "Query";
    Card?: Card[] | null;
  };

  export type Card = {
    __typename?: "Card";
    events?: Events[] | null;
  };

  export type Events = {
    __typename?: "CardEvent";
    icon?: string | null;
    text?: string | null;
    ts?: number | null;
    actions?: Actions[] | null;
    actionGroups?: ActionGroups[] | null;
  };

  export type Actions = {
    __typename?: "CardAction";
    text?: string | null;
    type?: string | null;
    registration?: string | null;
    command?: string | null;
    parameters?: Parameters[] | null;
    parameterName?: string | null;
    parameterOptions?: ParameterOptions[] | null;
    parameterOptionGroups?: ParameterOptionGroups[] | null;
    role?: string | null;
  };

  export type Parameters = {
    __typename?: "CardActionParameter";
    name?: string | null;
    value?: string | null;
  };

  export type ParameterOptions = {
    __typename?: "CardActionParameterOption";
    name?: string | null;
    value?: string | null;
  };

  export type ParameterOptionGroups = {
    __typename?: "CardActionParameterOptionGroup";
    name?: string | null;
    options?: Options[] | null;
  };

  export type Options = {
    __typename?: "CardActionParameterOption";
    name?: string | null;
    value?: string | null;
  };

  export type ActionGroups = {
    __typename?: "CardActionGroup";
    actions?: _Actions[] | null;
  };

  export type _Actions = {
    __typename?: "CardAction";
    text?: string | null;
    type?: string | null;
    registration?: string | null;
    command?: string | null;
    parameters?: _Parameters[] | null;
    parameterName?: string | null;
    parameterOptions?: _ParameterOptions[] | null;
    parameterOptionGroups?: _ParameterOptionGroups[] | null;
    role?: string | null;
  };

  export type _Parameters = {
    __typename?: "CardActionParameter";
    name?: string | null;
    value?: string | null;
  };

  export type _ParameterOptions = {
    __typename?: "CardActionParameterOption";
    name?: string | null;
    value?: string | null;
  };

  export type _ParameterOptionGroups = {
    __typename?: "CardActionParameterOptionGroup";
    name?: string | null;
    options?: _Options[] | null;
  };

  export type _Options = {
    __typename?: "CardActionParameterOption";
    name?: string | null;
    value?: string | null;
  };
}
export namespace Channels {
  export type Variables = {
    teamId: string;
    first: number;
    offset: number;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    channels?: Channels[] | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    repos?: Repos[] | null;
  };

  export type Repos = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
  };
}
export namespace ChatChannel {
  export type Variables = {
    teamId: string;
    channelName: string;
    repoOwner: string;
    repoName: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    channels?: Channels[] | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    repos?: Repos[] | null;
  };

  export type Repos = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
  };
}
export namespace ChatChannelByChannelId {
  export type Variables = {
    teamId: string;
    channelName: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    channels?: Channels[] | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    repos?: Repos[] | null;
  };

  export type Repos = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    providerId?: string | null;
  };
}
export namespace ChatId {
  export type Variables = {
    teamId?: string | null;
    chatId: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    members?: Members[] | null;
  };

  export type Members = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    chatTeam?: _ChatTeam | null;
    person?: Person | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type _ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
    name?: string | null;
  };

  export type Person = {
    __typename?: "Person";
    gitHubId?: GitHubId | null;
    emails?: Emails[] | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
  };

  export type Emails = {
    __typename?: "Email";
    address?: string | null;
  };
}
export namespace ChatTeam {
  export type Variables = {
    teamId: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    channels?: Channels[] | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    channelId?: string | null;
    repos?: Repos[] | null;
  };

  export type Repos = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
  };
}
export namespace ChatTeamPreferences {
  export type Variables = {
    teamId: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    domain?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };
}
export namespace EMailAndGitHubIdByUserId {
  export type Variables = {
    userId: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatId?: ChatId[] | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    emails?: Emails[] | null;
    person?: Person | null;
  };

  export type Emails = {
    __typename?: "Email";
    address?: string | null;
  };

  export type Person = {
    __typename?: "Person";
    surname?: string | null;
    forename?: string | null;
    emails?: _Emails[] | null;
    gitHubId?: GitHubId | null;
  };

  export type _Emails = {
    __typename?: "Email";
    address?: string | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };
}
export namespace GitHubId {
  export type Variables = {
    gitHubIds: string[];
  };

  export type Query = {
    __typename?: "Query";
    GitHubId?: GitHubId[] | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    id?: string | null;
    chatTeam?: ChatTeam | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
    name?: string | null;
  };
}
export namespace Issue {
  export type Variables = {
    teamId: string;
    orgOwner: string;
    repoName: string;
    issueName: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    team?: Team | null;
  };

  export type Team = {
    __typename?: "Team";
    orgs?: Orgs[] | null;
  };

  export type Orgs = {
    __typename?: "Org";
    repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    issue?: Issue[] | null;
  };

  export type Issue = {
    __typename?: "Issue";
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
  };

  export type ResolvingCommits = {
    __typename?: "Commit";
    author?: Author | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ClosedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    labels?: Labels[] | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: _Team | null;
  };

  export type _Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    gitUrl?: string | null;
    url?: string | null;
    providerId?: string | null;
  };

  export type _Labels = {
    __typename?: "Label";
    name?: string | null;
  };
}
export namespace IssueOrPr {
  export type Variables = {
    owner: string;
    repo: string;
    names: string[];
  };

  export type Query = {
    __typename?: "Query";
    Org?: Org[] | null;
  };

  export type Org = {
    __typename?: "Org";
    repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    pullRequest?: PullRequest[] | null;
    issue?: Issue[] | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
    state?: string | null;
    merged?: boolean | null;
    number?: number | null;
    name?: string | null;
    title?: string | null;
    repo?: _Repo | null;
    author?: Author | null;
  };

  export type _Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: _Org | null;
  };

  export type _Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Issue = {
    __typename?: "Issue";
    _id?: Long | null;
    name?: string | null;
    title?: string | null;
    state?: IssueState | null;
    number?: number | null;
    repo: __Repo;
    openedBy?: OpenedBy | null;
  };

  export type __Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: __Org | null;
  };

  export type __Org = {
    __typename?: "Org";
    provider?: _Provider | null;
  };

  export type _Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };
}
export namespace LastCommitOnBranch {
  export type Variables = {
    name: string;
    owner: string;
    branch: string;
  };

  export type Query = {
    __typename?: "Query";
    Repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    branches?: Branches[] | null;
  };

  export type Branches = {
    __typename?: "Branch";
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    author?: Author | null;
    statuses?: Statuses[] | null;
    tags?: Tags[] | null;
    images?: Images[] | null;
    fingerprints?: Fingerprints[] | null;
    timestamp?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type Statuses = {
    __typename?: "Status";
    context?: string | null;
    description?: string | null;
    targetUrl?: string | null;
    state?: StatusState | null;
    timestamp?: string | null;
  };

  export type Tags = {
    __typename?: "Tag";
    name?: string | null;
    release?: Release | null;
    builds?: Builds[] | null;
    timestamp?: string | null;
  };

  export type Release = {
    __typename?: "Release";
    name?: string | null;
    timestamp?: string | null;
  };

  export type Builds = {
    __typename?: "Build";
    buildId?: string | null;
    buildUrl?: string | null;
    name?: string | null;
    provider?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type Images = {
    __typename?: "DockerImage";
    _id?: Long | null;
    image?: string | null;
    imageName?: string | null;
    pods?: Pods[] | null;
    timestamp?: string | null;
  };

  export type Pods = {
    __typename?: "K8Pod";
    _id?: Long | null;
    name?: string | null;
    phase?: string | null;
    environment?: string | null;
    timestamp?: string | null;
    baseName?: string | null;
    namespace?: string | null;
    resourceVersion?: Long | null;
    containers?: Containers[] | null;
  };

  export type Containers = {
    __typename?: "K8Container";
    _id?: Long | null;
    name?: string | null;
    imageName?: string | null;
    timestamp?: string | null;
    environment?: string | null;
    state?: string | null;
    ready?: boolean | null;
    restartCount?: Long | null;
    statusJSON?: string | null;
    resourceVersion?: Long | null;
  };

  export type Fingerprints = {
    __typename?: "Fingerprint";
    name?: string | null;
    sha?: string | null;
    data?: string | null;
  };
}
export namespace LastIssueOnRepo {
  export type Variables = {
    name: string;
    owner: string;
  };

  export type Query = {
    __typename?: "Query";
    Repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    issue?: Issue[] | null;
  };

  export type Issue = {
    __typename?: "Issue";
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
  };

  export type ResolvingCommits = {
    __typename?: "Commit";
    author?: Author | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ClosedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    labels?: Labels[] | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    gitUrl?: string | null;
    url?: string | null;
    providerId?: string | null;
  };

  export type _Labels = {
    __typename?: "Label";
    name?: string | null;
  };
}
export namespace LastPullRequestOnRepo {
  export type Variables = {
    name: string;
    owner: string;
  };

  export type Query = {
    __typename?: "Query";
    Repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    pullRequest?: PullRequest[] | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
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
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type LastAssignedBy = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    gitHubId?: GitHubId | null;
    chatId?: ChatId | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Branch = {
    __typename?: "Branch";
    name?: string | null;
    timestamp?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    gitHubId?: _GitHubId | null;
    chatId?: _ChatId | null;
  };

  export type _GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Merger = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: __Person | null;
  };

  export type __Person = {
    __typename?: "Person";
    gitHubId?: __GitHubId | null;
    chatId?: __ChatId | null;
  };

  export type __GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type __ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: ___Person | null;
  };

  export type ___Person = {
    __typename?: "Person";
    gitHubId?: ___GitHubId | null;
    chatId?: ___ChatId | null;
  };

  export type ___GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ___ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Reviewers = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: ____Person | null;
  };

  export type ____Person = {
    __typename?: "Person";
    gitHubId?: ____GitHubId | null;
    chatId?: ____ChatId | null;
  };

  export type ____GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ____ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    body?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    timestamp?: string | null;
    tags?: Tags[] | null;
    statuses?: Statuses[] | null;
    author?: _Author | null;
    builds?: Builds[] | null;
  };

  export type Tags = {
    __typename?: "Tag";
    name?: string | null;
    release?: Release | null;
  };

  export type Release = {
    __typename?: "Release";
    name?: string | null;
    timestamp?: string | null;
  };

  export type Statuses = {
    __typename?: "Status";
    state?: StatusState | null;
    description?: string | null;
    context?: string | null;
    targetUrl?: string | null;
  };

  export type _Author = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: _____Person | null;
  };

  export type _____Person = {
    __typename?: "Person";
    gitHubId?: _____GitHubId | null;
    chatId?: _____ChatId | null;
  };

  export type _____GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _____ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Builds = {
    __typename?: "Build";
    name?: string | null;
    buildUrl?: string | null;
    buildId?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type _Builds = {
    __typename?: "Build";
    name?: string | null;
    buildUrl?: string | null;
    buildId?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type Reviews = {
    __typename?: "Review";
    state?: ReviewState | null;
    by?: By[] | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    channels?: Channels[] | null;
    allowRebaseMerge?: boolean | null;
    allowSquashMerge?: boolean | null;
    allowMergeCommit?: boolean | null;
    defaultBranch?: string | null;
    org?: Org | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };
}
export namespace LastPushOnBranch {
  export type Variables = {
    name: string;
    owner: string;
    branch: string;
  };

  export type Query = {
    __typename?: "Query";
    Repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    branches?: Branches[] | null;
  };

  export type Branches = {
    __typename?: "Branch";
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
  };

  export type Pushes = {
    __typename?: "Push";
    id?: string | null;
  };
}
export namespace MappedChannels {
  export type Variables = {
    teamId: string;
    name: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatChannel?: ChatChannel[] | null;
  };

  export type ChatChannel = {
    __typename?: "ChatChannel";
    team?: Team | null;
    repos?: Repos[] | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Repos = {
    __typename?: "Repo";
    owner?: string | null;
    name?: string | null;
  };
}
export namespace OpenPr {
  export type Variables = {
    repo: string;
    owner: string;
    branch: string;
  };

  export type Query = {
    __typename?: "Query";
    Repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    branches?: Branches[] | null;
  };

  export type Branches = {
    __typename?: "Branch";
    name?: string | null;
    pullRequests?: PullRequests[] | null;
  };

  export type PullRequests = {
    __typename?: "PullRequest";
    state?: string | null;
    merged?: boolean | null;
    number?: number | null;
    title?: string | null;
  };
}
export namespace OrgRepos {
  export type Variables = {
    owner: string;
    providerId: string;
  };

  export type Query = {
    __typename?: "Query";
    Repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    org?: Org | null;
    name?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    owner?: string | null;
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    providerId?: string | null;
  };
}
export namespace Orgs {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    Org?: Org[] | null;
  };

  export type Org = {
    __typename?: "Org";
    owner?: string | null;
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    providerId?: string | null;
  };
}
export namespace ProviderIdFromOrg {
  export type Variables = {
    owner: string;
  };

  export type Query = {
    __typename?: "Query";
    Org?: Org[] | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    providerId?: string | null;
  };
}
export namespace PullRequest {
  export type Variables = {
    teamId: string;
    orgOwner: string;
    repoName: string;
    prName: string;
  };

  export type Query = {
    __typename?: "Query";
    ChatTeam?: ChatTeam[] | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    team?: Team | null;
  };

  export type Team = {
    __typename?: "Team";
    orgs?: Orgs[] | null;
  };

  export type Orgs = {
    __typename?: "Org";
    repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    pullRequest?: PullRequest[] | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
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
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type LastAssignedBy = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    gitHubId?: GitHubId | null;
    chatId?: ChatId | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Branch = {
    __typename?: "Branch";
    name?: string | null;
    timestamp?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    gitHubId?: _GitHubId | null;
    chatId?: _ChatId | null;
  };

  export type _GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Merger = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: __Person | null;
  };

  export type __Person = {
    __typename?: "Person";
    gitHubId?: __GitHubId | null;
    chatId?: __ChatId | null;
  };

  export type __GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type __ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: ___Person | null;
  };

  export type ___Person = {
    __typename?: "Person";
    gitHubId?: ___GitHubId | null;
    chatId?: ___ChatId | null;
  };

  export type ___GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ___ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Reviewers = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: ____Person | null;
  };

  export type ____Person = {
    __typename?: "Person";
    gitHubId?: ____GitHubId | null;
    chatId?: ____ChatId | null;
  };

  export type ____GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ____ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    body?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    timestamp?: string | null;
    tags?: Tags[] | null;
    statuses?: Statuses[] | null;
    author?: _Author | null;
    builds?: Builds[] | null;
  };

  export type Tags = {
    __typename?: "Tag";
    name?: string | null;
    release?: Release | null;
  };

  export type Release = {
    __typename?: "Release";
    name?: string | null;
    timestamp?: string | null;
  };

  export type Statuses = {
    __typename?: "Status";
    state?: StatusState | null;
    description?: string | null;
    context?: string | null;
    targetUrl?: string | null;
  };

  export type _Author = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: _____Person | null;
  };

  export type _____Person = {
    __typename?: "Person";
    gitHubId?: _____GitHubId | null;
    chatId?: _____ChatId | null;
  };

  export type _____GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _____ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Builds = {
    __typename?: "Build";
    name?: string | null;
    buildUrl?: string | null;
    buildId?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type _Builds = {
    __typename?: "Build";
    name?: string | null;
    buildUrl?: string | null;
    buildId?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type Reviews = {
    __typename?: "Review";
    state?: ReviewState | null;
    by?: By[] | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    channels?: Channels[] | null;
    allowRebaseMerge?: boolean | null;
    allowSquashMerge?: boolean | null;
    allowMergeCommit?: boolean | null;
    defaultBranch?: string | null;
    org?: Org | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: _Team | null;
  };

  export type _Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: __Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type __Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };
}
export namespace PushById {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";
    Push?: Push[] | null;
  };

  export type Push = {
    __typename?: "Push";
    _id?: Long | null;
    builds?: Builds[] | null;
    before?: Before | null;
    after?: After | null;
    repo?: Repo | null;
    commits?: Commits[] | null;
    timestamp?: string | null;
    branch?: string | null;
  };

  export type Builds = {
    __typename?: "Build";
    buildId?: string | null;
    buildUrl?: string | null;
    name?: string | null;
    provider?: string | null;
    status?: BuildStatus | null;
    commit?: Commit | null;
    timestamp?: string | null;
    workflow?: Workflow | null;
  };

  export type Commit = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type Workflow = {
    __typename?: "Workflow";
    id?: string | null;
    name?: string | null;
    provider?: string | null;
    config?: string | null;
    builds?: _Builds[] | null;
  };

  export type _Builds = {
    __typename?: "Build";
    jobId?: string | null;
    jobName?: string | null;
    finishedAt?: string | null;
    startedAt?: string | null;
    status?: BuildStatus | null;
    id?: string | null;
    buildUrl?: string | null;
  };

  export type Before = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type After = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    author?: Author | null;
    statuses?: Statuses[] | null;
    tags?: Tags[] | null;
    images?: Images[] | null;
    fingerprints?: Fingerprints[] | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type Statuses = {
    __typename?: "Status";
    context?: string | null;
    description?: string | null;
    targetUrl?: string | null;
    state?: StatusState | null;
    timestamp?: string | null;
  };

  export type Tags = {
    __typename?: "Tag";
    name?: string | null;
    release?: Release | null;
    builds?: __Builds[] | null;
    timestamp?: string | null;
  };

  export type Release = {
    __typename?: "Release";
    name?: string | null;
    timestamp?: string | null;
  };

  export type __Builds = {
    __typename?: "Build";
    buildId?: string | null;
    buildUrl?: string | null;
    name?: string | null;
    provider?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type Images = {
    __typename?: "DockerImage";
    _id?: Long | null;
    image?: string | null;
    imageName?: string | null;
    pods?: Pods[] | null;
    timestamp?: string | null;
  };

  export type Pods = {
    __typename?: "K8Pod";
    _id?: Long | null;
    name?: string | null;
    phase?: string | null;
    environment?: string | null;
    timestamp?: string | null;
    baseName?: string | null;
    namespace?: string | null;
    resourceVersion?: Long | null;
    containers?: Containers[] | null;
  };

  export type Containers = {
    __typename?: "K8Container";
    _id?: Long | null;
    name?: string | null;
    imageName?: string | null;
    timestamp?: string | null;
    environment?: string | null;
    state?: string | null;
    ready?: boolean | null;
    restartCount?: Long | null;
    statusJSON?: string | null;
    resourceVersion?: Long | null;
  };

  export type Fingerprints = {
    __typename?: "Fingerprint";
    name?: string | null;
    sha?: string | null;
    data?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    owner?: string | null;
    name?: string | null;
    channels?: Channels[] | null;
    labels?: Labels[] | null;
    org?: Org | null;
    defaultBranch?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    resolves?: Resolves[] | null;
    impact?: Impact | null;
    apps?: Apps[] | null;
    tags?: _Tags[] | null;
    author?: _Author | null;
    timestamp?: string | null;
  };

  export type Resolves = {
    __typename?: "Issue";
    number?: number | null;
    name?: string | null;
    title?: string | null;
    state?: IssueState | null;
    openedBy?: OpenedBy | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Impact = {
    __typename?: "ParentImpact";
    data?: string | null;
    url?: string | null;
  };

  export type Apps = {
    __typename?: "Application";
    state?: string | null;
    host?: string | null;
    domain?: string | null;
    data?: string | null;
  };

  export type _Tags = {
    __typename?: "Tag";
    name?: string | null;
    release?: _Release | null;
    containers?: _Containers[] | null;
  };

  export type _Release = {
    __typename?: "Release";
    name?: string | null;
  };

  export type _Containers = {
    __typename?: "DockerImage";
    pods?: _Pods[] | null;
    image?: string | null;
  };

  export type _Pods = {
    __typename?: "K8Pod";
    host?: string | null;
    state?: string | null;
    name?: string | null;
  };

  export type _Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    chatId?: _ChatId | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };
}
export namespace PushByShaAndBranch {
  export type Variables = {
    sha: string;
    branch: string;
  };

  export type Query = {
    __typename?: "Query";
    Commit?: Commit[] | null;
  };

  export type Commit = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
  };

  export type Pushes = PushFields.Fragment;
}
export namespace RepoIssues {
  export type Variables = {
    name: string;
    owner: string;
  };

  export type Query = {
    __typename?: "Query";
    Repo?: Repo[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    issue?: Issue[] | null;
  };

  export type Issue = {
    __typename?: "Issue";
    number?: number | null;
    title?: string | null;
  };
}
export namespace SdmGoalById {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";
    SdmGoal?: SdmGoal[] | null;
  };

  export type SdmGoal = {
    __typename?: "SdmGoal";
    id?: string | null;
    environment?: string | null;
    uniqueName?: string | null;
    name?: string | null;
    sha?: string | null;
    branch?: string | null;
    repo?: Repo | null;
    fulfillment?: Fulfillment | null;
    description?: string | null;
    url?: string | null;
    state?: string | null;
    externalKey?: string | null;
    goalSet?: string | null;
    ts?: number | null;
    error?: string | null;
    retryFeasible?: boolean | null;
    preConditions?: PreConditions[] | null;
    approval?: Approval | null;
    provenance?: Provenance[] | null;
    data?: string | null;
  };

  export type Repo = {
    __typename?: "SdmRepository";
    name?: string | null;
    owner?: string | null;
    providerId?: string | null;
  };

  export type Fulfillment = {
    __typename?: "SdmGoalFulfillment";
    method?: string | null;
    name?: string | null;
  };

  export type PreConditions = {
    __typename?: "SdmCondition";
    environment?: string | null;
    name?: string | null;
  };

  export type Approval = {
    __typename?: "SdmProvenance";
    correlationId?: string | null;
    registration?: string | null;
    name?: string | null;
    version?: string | null;
    ts?: number | null;
    userId?: string | null;
    channelId?: string | null;
  };

  export type Provenance = {
    __typename?: "SdmProvenance";
    correlationId?: string | null;
    registration?: string | null;
    name?: string | null;
    version?: string | null;
    ts?: number | null;
    userId?: string | null;
    channelId?: string | null;
  };
}
export namespace SdmGoalsByCommit {
  export type Variables = {
    sha?: string[] | null;
    branch?: string[] | null;
  };

  export type Query = {
    __typename?: "Query";
    SdmGoal?: SdmGoal[] | null;
  };

  export type SdmGoal = {
    __typename?: "SdmGoal";
    id?: string | null;
    name?: string | null;
    state?: string | null;
    description?: string | null;
    goalSet?: string | null;
    url?: string | null;
    uniqueName?: string | null;
    environment?: string | null;
    preConditions?: PreConditions[] | null;
    provenance?: Provenance[] | null;
    ts?: number | null;
  };

  export type PreConditions = {
    __typename?: "SdmCondition";
    environment?: string | null;
    name?: string | null;
  };

  export type Provenance = {
    __typename?: "SdmProvenance";
    registration?: string | null;
    name?: string | null;
    version?: string | null;
  };
}
export namespace TagByName {
  export type Variables = {
    owner: string;
    repo: string;
    name: string;
  };

  export type Query = {
    __typename?: "Query";
    Tag?: Tag[] | null;
  };

  export type Tag = {
    __typename?: "Tag";
    name?: string | null;
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    repo?: Repo | null;
  };

  export type Repo = {
    __typename?: "Repo";
    owner?: string | null;
    name?: string | null;
  };
}
export namespace Webhook {
  export type Variables = {
    owner: string;
  };

  export type Query = {
    __typename?: "Query";
    GitHubOrgWebhook?: GitHubOrgWebhook[] | null;
  };

  export type GitHubOrgWebhook = {
    __typename?: "GitHubOrgWebhook";
    url?: string | null;
    webhookType?: WebhookType | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    owner?: string | null;
  };
}
export namespace ApplicationToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Application?: Application[] | null;
  };

  export type Application = {
    __typename?: "Application";
    _id?: Long | null;
    commits?: Commits[] | null;
    timestamp?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
    timestamp?: string | null;
  };

  export type Pushes = PushFields.Fragment;
}
export namespace AutoMergeOnBuild {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Build?: Build[] | null;
  };

  export type Build = {
    __typename?: "Build";
    _id?: Long | null;
    pullRequest?: PullRequest | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
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
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Branch = {
    __typename?: "Branch";
    name?: string | null;
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
    statuses?: Statuses[] | null;
  };

  export type Statuses = {
    __typename?: "Status";
    state?: StatusState | null;
    context?: string | null;
    description?: string | null;
    targetUrl?: string | null;
  };

  export type Reviews = {
    __typename?: "Review";
    state?: ReviewState | null;
    by?: By[] | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    message?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    body?: string | null;
  };
}
export namespace AutoMergeOnPullRequest {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    PullRequest?: PullRequest[] | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
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
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Branch = {
    __typename?: "Branch";
    name?: string | null;
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
    statuses?: Statuses[] | null;
  };

  export type Statuses = {
    __typename?: "Status";
    state?: StatusState | null;
    context?: string | null;
    description?: string | null;
    targetUrl?: string | null;
  };

  export type Reviews = {
    __typename?: "Review";
    state?: ReviewState | null;
    by?: By[] | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    message?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    body?: string | null;
  };
}
export namespace AutoMergeOnReview {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Review?: Review[] | null;
  };

  export type Review = {
    __typename?: "Review";
    _id?: Long | null;
    pullRequest?: PullRequest | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
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
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Branch = {
    __typename?: "Branch";
    name?: string | null;
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
    statuses?: Statuses[] | null;
  };

  export type Statuses = {
    __typename?: "Status";
    state?: StatusState | null;
    context?: string | null;
    description?: string | null;
    targetUrl?: string | null;
  };

  export type Reviews = {
    __typename?: "Review";
    state?: ReviewState | null;
    by?: By[] | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    message?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    body?: string | null;
  };
}
export namespace AutoMergeOnStatus {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Status?: Status[] | null;
  };

  export type Status = {
    __typename?: "Status";
    _id?: Long | null;
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    pullRequests?: PullRequests[] | null;
  };

  export type PullRequests = {
    __typename?: "PullRequest";
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
  };

  export type Branch = {
    __typename?: "Branch";
    name?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
    statuses?: Statuses[] | null;
  };

  export type Statuses = {
    __typename?: "Status";
    state?: StatusState | null;
    context?: string | null;
    description?: string | null;
    targetUrl?: string | null;
  };

  export type Reviews = {
    __typename?: "Review";
    state?: ReviewState | null;
    by?: By[] | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    message?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    body?: string | null;
  };
}
export namespace BotJoinedChannel {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    UserJoinedChannel?: UserJoinedChannel[] | null;
  };

  export type UserJoinedChannel = {
    __typename?: "UserJoinedChannel";
    user?: User | null;
    channel?: Channel | null;
  };

  export type User = {
    __typename?: "ChatId";
    isAtomistBot?: string | null;
    screenName?: string | null;
    userId?: string | null;
  };

  export type Channel = {
    __typename?: "ChatChannel";
    botInvitedSelf?: boolean | null;
    channelId?: string | null;
    name?: string | null;
    repos?: Repos[] | null;
    team?: Team | null;
  };

  export type Repos = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
    orgs?: Orgs[] | null;
  };

  export type Orgs = {
    __typename?: "Org";
    owner?: string | null;
    ownerType?: OwnerType | null;
    provider?: _Provider | null;
    repo?: Repo[] | null;
  };

  export type _Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
  };
}
export namespace BranchToBranchLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Branch?: Branch[] | null;
  };

  export type Branch = BranchFields.Fragment;
}
export namespace BranchToPullRequestLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Branch?: Branch[] | null;
  };

  export type Branch = {
    __typename?: "Branch";
    _id?: Long | null;
    pullRequests?: PullRequests[] | null;
  };

  export type PullRequests = PullRequestFields.Fragment;
}
export namespace BuildToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Build?: Build[] | null;
  };

  export type Build = {
    __typename?: "Build";
    _id?: Long | null;
    buildId?: string | null;
    buildUrl?: string | null;
    name?: string | null;
    provider?: string | null;
    status?: BuildStatus | null;
    push?: Push | null;
    timestamp?: string | null;
  };

  export type Push = PushFields.Fragment;
}
export namespace ChannelLinkCreated {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    ChannelLink?: ChannelLink[] | null;
  };

  export type ChannelLink = {
    __typename?: "ChannelLink";
    channel?: Channel | null;
    repo?: Repo | null;
  };

  export type Channel = {
    __typename?: "ChatChannel";
    name?: string | null;
    normalizedName?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    defaultBranch?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    ownerType?: OwnerType | null;
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    url?: string | null;
    providerId?: string | null;
    providerType?: ProviderType | null;
  };
}
export namespace CommentOnRelatedIssueClosed {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Issue?: Issue[] | null;
  };

  export type Issue = {
    __typename?: "Issue";
    number?: number | null;
    repo: Repo;
    closedBy?: ClosedBy | null;
  };

  export type Repo = {
    __typename?: "Repo";
    owner?: string | null;
    name?: string | null;
  };

  export type ClosedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };
}
export namespace CommentToIssueLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Comment?: Comment[] | null;
  };

  export type Comment = {
    __typename?: "Comment";
    _id?: Long | null;
    by?: By | null;
    body?: string | null;
    issue?: Issue | null;
    timestamp?: string | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Issue = IssueFields.Fragment;
}
export namespace CommentToIssueCommentLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Comment?: Comment[] | null;
  };

  export type Comment = {
    __typename?: "Comment";
    _id?: Long | null;
    gitHubId?: string | null;
    timestamp?: string | null;
    body?: string | null;
    by?: By | null;
    issue?: Issue | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
    gitHubId?: GitHubId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Issue = {
    __typename?: "Issue";
    title?: string | null;
    number?: number | null;
    state?: IssueState | null;
    repo: Repo;
    openedBy?: OpenedBy | null;
    closedBy?: ClosedBy | null;
    assignees?: Assignees[] | null;
    resolvingCommits?: ResolvingCommits[] | null;
    labels?: _Labels[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    channels?: Channels[] | null;
    org?: Org | null;
    labels?: Labels[] | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    url?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ClosedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ResolvingCommits = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    author?: Author | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    chatId?: _ChatId | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type _Labels = {
    __typename?: "Label";
    name?: string | null;
  };
}
export namespace CommentToPullRequestLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Comment?: Comment[] | null;
  };

  export type Comment = {
    __typename?: "Comment";
    _id?: Long | null;
    pullRequest?: PullRequest | null;
  };

  export type PullRequest = PullRequestFields.Fragment;
}
export namespace CommentToPullRequestCommentLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Comment?: Comment[] | null;
  };

  export type Comment = {
    __typename?: "Comment";
    _id?: Long | null;
    gitHubId?: string | null;
    timestamp?: string | null;
    body?: string | null;
    by?: By | null;
    pullRequest?: PullRequest | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
    gitHubId?: GitHubId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
    title?: string | null;
    number?: number | null;
    state?: string | null;
    merged?: boolean | null;
    repo?: Repo | null;
    author?: Author | null;
    assignees?: Assignees[] | null;
    labels?: _Labels[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    channels?: Channels[] | null;
    org?: Org | null;
    labels?: Labels[] | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    url?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    chatId?: _ChatId | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: __Person | null;
  };

  export type __Person = {
    __typename?: "Person";
    chatId?: __ChatId | null;
  };

  export type __ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type _Labels = {
    __typename?: "Label";
    name?: string | null;
  };
}
export namespace CommitToPullRequestLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Commit?: Commit[] | null;
  };

  export type Commit = {
    __typename?: "Commit";
    _id?: Long | null;
    pullRequests?: PullRequests[] | null;
  };

  export type PullRequests = PullRequestFields.Fragment;
}
export namespace DeletedBranchToBranchLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    DeletedBranch?: DeletedBranch[] | null;
  };

  export type DeletedBranch = DeletedBranchFields.Fragment;
}
export namespace DeletedBranchToPullRequestLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    DeletedBranch?: DeletedBranch[] | null;
  };

  export type DeletedBranch = {
    __typename?: "DeletedBranch";
    id?: string | null;
    pullRequests?: PullRequests[] | null;
  };

  export type PullRequests = PullRequestFields.Fragment;
}
export namespace IssueToIssueLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Issue?: Issue[] | null;
  };

  export type Issue = IssueFields.Fragment;
}
export namespace IssueToIssueCommentLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Issue?: Issue[] | null;
  };

  export type Issue = {
    __typename?: "Issue";
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
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    channels?: Channels[] | null;
    org?: Org | null;
    labels?: Labels[] | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    url?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ClosedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ResolvingCommits = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    author?: Author | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type _Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    gitHubId?: string | null;
    timestamp?: string | null;
    body?: string | null;
    by?: By | null;
    issue?: _Issue | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    chatId?: _ChatId | null;
    gitHubId?: GitHubId | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _Issue = {
    __typename?: "Issue";
    number?: number | null;
    state?: IssueState | null;
    title?: string | null;
  };
}
export namespace IssueToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Issue?: Issue[] | null;
  };

  export type Issue = {
    __typename?: "Issue";
    _id?: Long | null;
    resolvingCommits?: ResolvingCommits[] | null;
    timestamp?: string | null;
  };

  export type ResolvingCommits = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
    timestamp?: string | null;
  };

  export type Pushes = PushFields.Fragment;
}
export namespace K8PodToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    K8Pod?: K8Pod[] | null;
  };

  export type K8Pod = {
    __typename?: "K8Pod";
    _id?: Long | null;
    name?: string | null;
    state?: string | null;
    images?: Images[] | null;
    timestamp?: string | null;
  };

  export type Images = {
    __typename?: "DockerImage";
    commits?: Commits[] | null;
    timestamp?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
    timestamp?: string | null;
  };

  export type Pushes = PushFields.Fragment;
}
export namespace NotifyAuthorOnReview {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Review?: Review[] | null;
  };

  export type Review = {
    __typename?: "Review";
    _id?: Long | null;
    body?: string | null;
    state?: ReviewState | null;
    htmlUrl?: string | null;
    by?: By[] | null;
    pullRequest?: PullRequest | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
    head?: Head | null;
    author?: Author | null;
    number?: number | null;
    title?: string | null;
    state?: string | null;
    merged?: boolean | null;
    labels?: Labels[] | null;
    repo?: Repo | null;
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    chatTeam?: ChatTeam | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
    channels?: Channels[] | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    channelId?: string | null;
  };
}
export namespace NotifyBotOwnerOnPush {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Push?: Push[] | null;
  };

  export type Push = {
    __typename?: "Push";
    id?: string | null;
    repo?: Repo | null;
  };

  export type Repo = {
    __typename?: "Repo";
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    team?: Team | null;
  };

  export type Team = {
    __typename?: "Team";
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };
}
export namespace NotifyMentionedOnIssue {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Issue?: Issue[] | null;
  };

  export type Issue = {
    __typename?: "Issue";
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
  };

  export type LastAssignedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    chatTeam?: ChatTeam | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type ClosedBy = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    chatId?: _ChatId | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: _Preferences[] | null;
  };

  export type _Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: __Person | null;
  };

  export type __Person = {
    __typename?: "Person";
    chatId?: __ChatId | null;
  };

  export type __ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: __Preferences[] | null;
    chatTeam?: _ChatTeam | null;
  };

  export type __Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type _ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    labels?: Labels[] | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    channelId?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    gitUrl?: string | null;
    url?: string | null;
  };
}
export namespace NotifyMentionedOnIssueComment {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Comment?: Comment[] | null;
  };

  export type Comment = {
    __typename?: "Comment";
    _id?: Long | null;
    gitHubId?: string | null;
    body?: string | null;
    by?: By | null;
    issue?: Issue | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    chatTeam?: ChatTeam | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Issue = {
    __typename?: "Issue";
    title?: string | null;
    body?: string | null;
    state?: IssueState | null;
    timestamp?: string | null;
    number?: number | null;
    lastAssignedBy?: LastAssignedBy | null;
    openedBy?: OpenedBy | null;
    repo: Repo;
  };

  export type LastAssignedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
    channels?: Channels[] | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    channelId?: string | null;
  };
}
export namespace NotifyMentionedOnPullRequest {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    PullRequest?: PullRequest[] | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
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
  };

  export type LastAssignedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    chatTeam?: ChatTeam | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Merger = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    chatId?: _ChatId | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: _Preferences[] | null;
  };

  export type _Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: __Person | null;
  };

  export type __Person = {
    __typename?: "Person";
    chatId?: __ChatId | null;
  };

  export type __ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: __Preferences[] | null;
    chatTeam?: _ChatTeam | null;
  };

  export type __Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type _ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Reviewers = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: ___Person | null;
  };

  export type ___Person = {
    __typename?: "Person";
    chatId?: ___ChatId | null;
  };

  export type ___ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: ___Preferences[] | null;
    chatTeam?: __ChatTeam | null;
  };

  export type ___Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type __ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    labels?: Labels[] | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    channelId?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    gitUrl?: string | null;
    url?: string | null;
  };
}
export namespace NotifyMentionedOnPullRequestComment {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Comment?: Comment[] | null;
  };

  export type Comment = {
    __typename?: "Comment";
    _id?: Long | null;
    gitHubId?: string | null;
    body?: string | null;
    by?: By | null;
    pullRequest?: PullRequest | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    chatTeam?: ChatTeam | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
    title?: string | null;
    body?: string | null;
    state?: string | null;
    merged?: boolean | null;
    timestamp?: string | null;
    number?: number | null;
    lastAssignedBy?: LastAssignedBy | null;
    author?: Author | null;
    repo?: Repo | null;
  };

  export type LastAssignedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
    channels?: Channels[] | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    channelId?: string | null;
  };
}
export namespace NotifyPusherOnBuild {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Build?: Build[] | null;
  };

  export type Build = {
    __typename?: "Build";
    _id?: Long | null;
    status?: BuildStatus | null;
    buildUrl?: string | null;
    name?: string | null;
    provider?: string | null;
    buildId?: string | null;
    commit?: Commit | null;
    repo?: Repo | null;
  };

  export type Commit = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    author?: Author | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    chatTeam?: ChatTeam | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: _Preferences[] | null;
  };

  export type _Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
    channels?: Channels[] | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    channelId?: string | null;
  };
}
export namespace NotifyReviewerOnPush {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Push?: Push[] | null;
  };

  export type Push = {
    __typename?: "Push";
    branch?: string | null;
    repo?: Repo | null;
    commits?: Commits[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    owner?: string | null;
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    url?: string | null;
    providerId?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    author?: Author | null;
    sha?: string | null;
    pullRequests?: PullRequests[] | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type PullRequests = {
    __typename?: "PullRequest";
    author?: _Author | null;
    name?: string | null;
    number?: number | null;
    title?: string | null;
    body?: string | null;
    state?: string | null;
    merged?: boolean | null;
    reviewers?: Reviewers[] | null;
    reviews?: Reviews[] | null;
  };

  export type _Author = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Reviewers = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Reviews = {
    __typename?: "Review";
    state?: ReviewState | null;
    by?: By[] | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: Preferences[] | null;
    chatTeam?: ChatTeam | null;
  };

  export type Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };
}
export namespace WebhookCreated {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Webhook?: Webhook[] | null;
  };

  export type Webhook = {
    __typename?: "Webhook";
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    owner?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "Team";
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    members?: Members[] | null;
    channels?: Channels[] | null;
  };

  export type Members = {
    __typename?: "ChatId";
    isAtomistBot?: string | null;
    isOwner?: string | null;
    screenName?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    channelId?: string | null;
  };
}
export namespace ParentImpactToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    ParentImpact?: ParentImpact[] | null;
  };

  export type ParentImpact = {
    __typename?: "ParentImpact";
    _id?: Long | null;
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
    timestamp?: string | null;
  };

  export type Pushes = PushFields.Fragment;
}
export namespace PullRequestToBranchLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    PullRequest?: PullRequest[] | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
    branch?: Branch | null;
  };

  export type Branch = {
    __typename?: "Branch";
    id?: string | null;
  };
}
export namespace PullRequestToPullRequestLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    PullRequest?: PullRequest[] | null;
  };

  export type PullRequest = PullRequestFields.Fragment;
}
export namespace PullRequestToPullRequestCommentLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    PullRequest?: PullRequest[] | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
    _id?: Long | null;
    title?: string | null;
    number?: number | null;
    state?: string | null;
    merged?: boolean | null;
    repo?: Repo | null;
    assignees?: Assignees[] | null;
    labels?: _Labels[] | null;
    comments?: Comments[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    channels?: Channels[] | null;
    org?: Org | null;
    labels?: Labels[] | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    url?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type _Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    gitHubId?: string | null;
    timestamp?: string | null;
    body?: string | null;
    by?: By | null;
    pullRequest?: _PullRequest | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    chatId?: _ChatId | null;
    gitHubId?: GitHubId | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _PullRequest = {
    __typename?: "PullRequest";
    number?: number | null;
    state?: string | null;
    title?: string | null;
  };
}
export namespace PullRequestToReviewLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    PullRequest?: PullRequest[] | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
    _id?: Long | null;
    reviews?: Reviews[] | null;
  };

  export type Reviews = {
    __typename?: "Review";
    _id?: Long | null;
    body?: string | null;
    state?: ReviewState | null;
    htmlUrl?: string | null;
    by?: By[] | null;
    pullRequest?: _PullRequest | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _PullRequest = {
    __typename?: "PullRequest";
    head?: Head | null;
    number?: number | null;
    title?: string | null;
    state?: string | null;
    merged?: boolean | null;
    reviewers?: Reviewers[] | null;
    labels?: Labels[] | null;
    repo?: Repo | null;
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type Reviewers = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
    channels?: Channels[] | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
  };

  export type Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: _Team | null;
  };

  export type _Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };
}
export namespace PushToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Push?: Push[] | null;
  };

  export type Push = PushFields.Fragment;
}
export namespace PushToUnmappedRepo {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Push?: Push[] | null;
  };

  export type Push = {
    __typename?: "Push";
    repo?: Repo | null;
    commits?: Commits[] | null;
  };

  export type Repo = {
    __typename?: "Repo";
    owner?: string | null;
    name?: string | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    providerId?: string | null;
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    channels?: _Channels[] | null;
    members?: Members[] | null;
    preferences?: Preferences[] | null;
  };

  export type _Channels = {
    __typename?: "ChatChannel";
    channelId?: string | null;
    name?: string | null;
  };

  export type Members = {
    __typename?: "ChatId";
    isAtomistBot?: string | null;
    screenName?: string | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    author?: Author | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    preferences?: _Preferences[] | null;
    chatTeam?: ChatTeam | null;
  };

  export type _Preferences = {
    __typename?: "UserPreference";
    name?: string | null;
    value?: string | null;
  };

  export type ChatTeam = {
    __typename?: "ChatTeam";
    id?: string | null;
  };
}
export namespace ReleaseToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Release?: Release[] | null;
  };

  export type Release = {
    __typename?: "Release";
    _id?: Long | null;
    name?: string | null;
    tag?: Tag | null;
    timestamp?: string | null;
  };

  export type Tag = {
    __typename?: "Tag";
    name?: string | null;
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
    timestamp?: string | null;
  };

  export type Pushes = PushFields.Fragment;
}
export namespace RepoOnboarded {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    RepoOnboarded?: RepoOnboarded[] | null;
  };

  export type RepoOnboarded = {
    __typename?: "RepoOnboarded";
    repo: Repo;
  };

  export type Repo = {
    __typename?: "Repo";
    owner?: string | null;
    name?: string | null;
    org?: Org | null;
    defaultBranch?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type Team = {
    __typename?: "Team";
    id?: string | null;
  };
}
export namespace ReviewToPullRequestLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Review?: Review[] | null;
  };

  export type Review = {
    __typename?: "Review";
    _id?: Long | null;
    pullRequest?: PullRequest | null;
  };

  export type PullRequest = PullRequestFields.Fragment;
}
export namespace ReviewToReviewLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Review?: Review[] | null;
  };

  export type Review = {
    __typename?: "Review";
    _id?: Long | null;
    body?: string | null;
    state?: ReviewState | null;
    htmlUrl?: string | null;
    by?: By[] | null;
    pullRequest?: PullRequest | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type PullRequest = {
    __typename?: "PullRequest";
    head?: Head | null;
    number?: number | null;
    title?: string | null;
    state?: string | null;
    merged?: boolean | null;
    reviewers?: Reviewers[] | null;
    labels?: Labels[] | null;
    repo?: Repo | null;
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type Reviewers = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
    channels?: Channels[] | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
  };

  export type Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: _Team | null;
  };

  export type _Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };
}
export namespace SdmGoalToPush {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    SdmGoal?: SdmGoal[] | null;
  };

  export type SdmGoal = {
    __typename?: "SdmGoal";
    sha?: string | null;
    branch?: string | null;
    repo?: Repo | null;
  };

  export type Repo = {
    __typename?: "SdmRepository";
    name?: string | null;
    owner?: string | null;
    providerId?: string | null;
  };
}
export namespace StatusOnParentImpact {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    ParentImpact?: ParentImpact[] | null;
  };

  export type ParentImpact = {
    __typename?: "ParentImpact";
    _id?: Long | null;
    data?: string | null;
    url?: string | null;
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    sha?: string | null;
    repo?: Repo | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    org?: Org | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
  };
}
export namespace StatusToPullRequestLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Status?: Status[] | null;
  };

  export type Status = {
    __typename?: "Status";
    _id?: Long | null;
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    pullRequests?: PullRequests[] | null;
  };

  export type PullRequests = PullRequestFields.Fragment;
}
export namespace StatusToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Status?: Status[] | null;
  };

  export type Status = {
    __typename?: "Status";
    _id?: Long | null;
    context?: string | null;
    description?: string | null;
    targetUrl?: string | null;
    state?: StatusState | null;
    commit?: Commit | null;
  };

  export type Commit = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
    timestamp?: string | null;
  };

  export type Pushes = PushFields.Fragment;
}
export namespace TagToPushLifecycle {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    Tag?: Tag[] | null;
  };

  export type Tag = {
    __typename?: "Tag";
    _id?: Long | null;
    name?: string | null;
    commit?: Commit | null;
    timestamp?: string | null;
  };

  export type Commit = {
    __typename?: "Commit";
    pushes?: Pushes[] | null;
    timestamp?: string | null;
  };

  export type Pushes = PushFields.Fragment;
}

export namespace BranchFields {
  export type Fragment = {
    __typename?: "Branch";
    _id?: Long | null;
    pullRequests?: PullRequests[] | null;
    commit?: Commit | null;
    name?: string | null;
    repo?: Repo | null;
    timestamp?: string | null;
  };

  export type PullRequests = {
    __typename?: "PullRequest";
    merged?: boolean | null;
  };

  export type Commit = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    defaultBranch?: string | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
    name?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    team?: _Team | null;
    provider?: Provider | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    id?: string | null;
    apiUrl?: string | null;
    url?: string | null;
  };
}

export namespace DeletedBranchFields {
  export type Fragment = {
    __typename?: "DeletedBranch";
    _id?: Long | null;
    pullRequests?: PullRequests[] | null;
    commit?: Commit | null;
    name?: string | null;
    repo?: Repo | null;
    timestamp?: string | null;
  };

  export type PullRequests = {
    __typename?: "PullRequest";
    merged?: boolean | null;
  };

  export type Commit = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    defaultBranch?: string | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
    name?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    team?: _Team | null;
    provider?: Provider | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    id?: string | null;
    apiUrl?: string | null;
    url?: string | null;
  };
}

export namespace IssueFields {
  export type Fragment = {
    __typename?: "Issue";
    _id?: Long | null;
    name?: string | null;
    title?: string | null;
    body?: string | null;
    state?: IssueState | null;
    number?: number | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    closedAt?: string | null;
    comments?: Comments[] | null;
    resolvingCommits?: ResolvingCommits[] | null;
    openedBy?: OpenedBy | null;
    closedBy?: ClosedBy | null;
    assignees?: Assignees[] | null;
    repo: Repo;
    labels?: _Labels[] | null;
    timestamp?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    by?: By | null;
    body?: string | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ResolvingCommits = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    author?: Author | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ClosedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    labels?: Labels[] | null;
    channels?: Channels[] | null;
    org?: Org | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    apiUrl?: string | null;
    gitUrl?: string | null;
    url?: string | null;
    providerId?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type _Labels = {
    __typename?: "Label";
    name?: string | null;
  };
}

export namespace PullRequestFields {
  export type Fragment = {
    __typename?: "PullRequest";
    _id?: Long | null;
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
  };

  export type Head = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
  };

  export type LastAssignedBy = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    gitHubId?: GitHubId | null;
    chatId?: ChatId | null;
  };

  export type GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Branch = {
    __typename?: "Branch";
    name?: string | null;
    timestamp?: string | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    gitHubId?: _GitHubId | null;
    chatId?: _ChatId | null;
  };

  export type _GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Merger = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: __Person | null;
  };

  export type __Person = {
    __typename?: "Person";
    gitHubId?: __GitHubId | null;
    chatId?: __ChatId | null;
  };

  export type __GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type __ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Assignees = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: ___Person | null;
  };

  export type ___Person = {
    __typename?: "Person";
    gitHubId?: ___GitHubId | null;
    chatId?: ___ChatId | null;
  };

  export type ___GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ___ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Reviewers = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: ____Person | null;
  };

  export type ____Person = {
    __typename?: "Person";
    gitHubId?: ____GitHubId | null;
    chatId?: ____ChatId | null;
  };

  export type ____GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type ____ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Comments = {
    __typename?: "Comment";
    body?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    sha?: string | null;
    timestamp?: string | null;
    message?: string | null;
    tags?: Tags[] | null;
    statuses?: Statuses[] | null;
    author?: _Author | null;
    builds?: Builds[] | null;
  };

  export type Tags = {
    __typename?: "Tag";
    name?: string | null;
    release?: Release | null;
  };

  export type Release = {
    __typename?: "Release";
    name?: string | null;
    timestamp?: string | null;
  };

  export type Statuses = {
    __typename?: "Status";
    state?: StatusState | null;
    description?: string | null;
    context?: string | null;
    targetUrl?: string | null;
    timestamp?: string | null;
  };

  export type _Author = {
    __typename?: "GitHubId";
    login?: string | null;
    name?: string | null;
    person?: _____Person | null;
  };

  export type _____Person = {
    __typename?: "Person";
    gitHubId?: _____GitHubId | null;
    chatId?: _____ChatId | null;
  };

  export type _____GitHubId = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type _____ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
    id?: string | null;
  };

  export type Builds = {
    __typename?: "Build";
    name?: string | null;
    buildUrl?: string | null;
    buildId?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type _Builds = {
    __typename?: "Build";
    name?: string | null;
    buildUrl?: string | null;
    buildId?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type Reviews = {
    __typename?: "Review";
    state?: ReviewState | null;
    by?: By[] | null;
    body?: string | null;
  };

  export type By = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    name?: string | null;
    owner?: string | null;
    channels?: Channels[] | null;
    allowRebaseMerge?: boolean | null;
    allowSquashMerge?: boolean | null;
    allowMergeCommit?: boolean | null;
    defaultBranch?: string | null;
    org?: Org | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };
}

export namespace PushFields {
  export type Fragment = {
    __typename?: "Push";
    _id?: Long | null;
    builds?: Builds[] | null;
    before?: Before | null;
    after?: After | null;
    repo?: Repo | null;
    commits?: Commits[] | null;
    timestamp?: string | null;
    branch?: string | null;
  };

  export type Builds = {
    __typename?: "Build";
    buildId?: string | null;
    buildUrl?: string | null;
    name?: string | null;
    provider?: string | null;
    status?: BuildStatus | null;
    commit?: Commit | null;
    timestamp?: string | null;
    workflow?: Workflow | null;
  };

  export type Commit = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type Workflow = {
    __typename?: "Workflow";
    id?: string | null;
    name?: string | null;
    provider?: string | null;
    config?: string | null;
    builds?: _Builds[] | null;
  };

  export type _Builds = {
    __typename?: "Build";
    jobId?: string | null;
    jobName?: string | null;
    finishedAt?: string | null;
    startedAt?: string | null;
    status?: BuildStatus | null;
    id?: string | null;
    buildUrl?: string | null;
  };

  export type Before = {
    __typename?: "Commit";
    sha?: string | null;
  };

  export type After = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    author?: Author | null;
    statuses?: Statuses[] | null;
    tags?: Tags[] | null;
    images?: Images[] | null;
    fingerprints?: Fingerprints[] | null;
  };

  export type Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: Person | null;
  };

  export type Person = {
    __typename?: "Person";
    chatId?: ChatId | null;
  };

  export type ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };

  export type Statuses = {
    __typename?: "Status";
    context?: string | null;
    description?: string | null;
    targetUrl?: string | null;
    state?: StatusState | null;
    timestamp?: string | null;
  };

  export type Tags = {
    __typename?: "Tag";
    name?: string | null;
    release?: Release | null;
    builds?: __Builds[] | null;
    timestamp?: string | null;
  };

  export type Release = {
    __typename?: "Release";
    name?: string | null;
    timestamp?: string | null;
  };

  export type __Builds = {
    __typename?: "Build";
    buildId?: string | null;
    buildUrl?: string | null;
    name?: string | null;
    provider?: string | null;
    status?: BuildStatus | null;
    timestamp?: string | null;
  };

  export type Images = {
    __typename?: "DockerImage";
    _id?: Long | null;
    image?: string | null;
    imageName?: string | null;
    pods?: Pods[] | null;
    timestamp?: string | null;
  };

  export type Pods = {
    __typename?: "K8Pod";
    _id?: Long | null;
    name?: string | null;
    phase?: string | null;
    environment?: string | null;
    timestamp?: string | null;
    baseName?: string | null;
    namespace?: string | null;
    resourceVersion?: Long | null;
    containers?: Containers[] | null;
  };

  export type Containers = {
    __typename?: "K8Container";
    _id?: Long | null;
    name?: string | null;
    imageName?: string | null;
    timestamp?: string | null;
    environment?: string | null;
    state?: string | null;
    ready?: boolean | null;
    restartCount?: Long | null;
    statusJSON?: string | null;
    resourceVersion?: Long | null;
  };

  export type Fingerprints = {
    __typename?: "Fingerprint";
    name?: string | null;
    sha?: string | null;
    data?: string | null;
  };

  export type Repo = {
    __typename?: "Repo";
    owner?: string | null;
    name?: string | null;
    channels?: Channels[] | null;
    labels?: Labels[] | null;
    org?: Org | null;
    defaultBranch?: string | null;
  };

  export type Channels = {
    __typename?: "ChatChannel";
    name?: string | null;
    team?: Team | null;
  };

  export type Team = {
    __typename?: "ChatTeam";
    id?: string | null;
  };

  export type Labels = {
    __typename?: "Label";
    name?: string | null;
  };

  export type Org = {
    __typename?: "Org";
    provider?: Provider | null;
    team?: _Team | null;
  };

  export type Provider = {
    __typename?: "GitHubProvider";
    url?: string | null;
    apiUrl?: string | null;
    gitUrl?: string | null;
  };

  export type _Team = {
    __typename?: "Team";
    id?: string | null;
    chatTeams?: ChatTeams[] | null;
  };

  export type ChatTeams = {
    __typename?: "ChatTeam";
    id?: string | null;
    preferences?: Preferences[] | null;
  };

  export type Preferences = {
    __typename?: "TeamPreference";
    name?: string | null;
    value?: string | null;
  };

  export type Commits = {
    __typename?: "Commit";
    sha?: string | null;
    message?: string | null;
    resolves?: Resolves[] | null;
    impact?: Impact | null;
    apps?: Apps[] | null;
    tags?: _Tags[] | null;
    author?: _Author | null;
    timestamp?: string | null;
  };

  export type Resolves = {
    __typename?: "Issue";
    number?: number | null;
    name?: string | null;
    title?: string | null;
    state?: IssueState | null;
    openedBy?: OpenedBy | null;
  };

  export type OpenedBy = {
    __typename?: "GitHubId";
    login?: string | null;
  };

  export type Impact = {
    __typename?: "ParentImpact";
    data?: string | null;
    url?: string | null;
  };

  export type Apps = {
    __typename?: "Application";
    state?: string | null;
    host?: string | null;
    domain?: string | null;
    data?: string | null;
  };

  export type _Tags = {
    __typename?: "Tag";
    name?: string | null;
    release?: _Release | null;
    containers?: _Containers[] | null;
  };

  export type _Release = {
    __typename?: "Release";
    name?: string | null;
  };

  export type _Containers = {
    __typename?: "DockerImage";
    pods?: _Pods[] | null;
    image?: string | null;
  };

  export type _Pods = {
    __typename?: "K8Pod";
    host?: string | null;
    state?: string | null;
    name?: string | null;
  };

  export type _Author = {
    __typename?: "GitHubId";
    login?: string | null;
    person?: _Person | null;
  };

  export type _Person = {
    __typename?: "Person";
    chatId?: _ChatId | null;
  };

  export type _ChatId = {
    __typename?: "ChatId";
    screenName?: string | null;
  };
}

export namespace SdmGoalFields {
  export type Fragment = {
    __typename?: "SdmGoal";
    goalSet?: string | null;
    environment?: string | null;
    name?: string | null;
    uniqueName?: string | null;
    sha?: string | null;
    branch?: string | null;
    state?: string | null;
    fulfillment?: Fulfillment | null;
    description?: string | null;
    url?: string | null;
    externalKey?: string | null;
    ts?: number | null;
    preConditions?: PreConditions[] | null;
    provenance?: Provenance[] | null;
    data?: string | null;
  };

  export type Fulfillment = {
    __typename?: "SdmGoalFulfillment";
    method?: string | null;
    name?: string | null;
  };

  export type PreConditions = {
    __typename?: "SdmCondition";
    environment?: string | null;
    name?: string | null;
  };

  export type Provenance = {
    __typename?: "SdmProvenance";
    registration?: string | null;
    version?: string | null;
    name?: string | null;
    correlationId?: string | null;
    ts?: number | null;
  };
}

export namespace SdmGoalRepo {
  export type Fragment = {
    __typename?: "SdmGoal";
    repo?: Repo | null;
  };

  export type Repo = {
    __typename?: "SdmRepository";
    name?: string | null;
    owner?: string | null;
    providerId?: string | null;
  };
}

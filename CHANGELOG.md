# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased](https://github.com/atomist/lifecycle-automation/compare/0.8.43...HEAD)

## [0.8.43](https://github.com/atomist/lifecycle-automation/compare/0.8.42...0.8.43) - 2018-07-15

### Added

-   Raise PR button shows when goal set is still running. [#237](https://github.com/atomist/lifecycle-automation/issues/237)

## [0.8.42](https://github.com/atomist/lifecycle-automation/compare/0.8.41...0.8.42) - 2018-07-13

## [0.8.41](https://github.com/atomist/lifecycle-automation/compare/0.8.40...0.8.41) - 2018-07-13

## [0.8.40](https://github.com/atomist/lifecycle-automation/compare/0.8.39...0.8.40) - 2018-07-12

### Added

-   Bitbucket support for links in Push message. [#194](https://github.com/atomist/lifecycle-automation/issues/194)

## [0.8.39](https://github.com/atomist/lifecycle-automation/compare/0.8.38...0.8.39) - 2018-07-10

### Added

-   Some lifecycle event handlers are missing for PR on cards. [#236](https://github.com/atomist/lifecycle-automation/issues/236)

## [0.8.38](https://github.com/atomist/lifecycle-automation/compare/0.8.37...0.8.38) - 2018-07-10

## [0.8.37](https://github.com/atomist/lifecycle-automation/compare/0.8.36...0.8.37) - 2018-07-10

## [0.8.36](https://github.com/atomist/lifecycle-automation/compare/0.8.35...0.8.36) - 2018-07-10

## [0.8.35](https://github.com/atomist/lifecycle-automation/compare/0.8.34...0.8.35) - 2018-07-08

## [0.8.34](https://github.com/atomist/lifecycle-automation/compare/0.8.33...0.8.34) - 2018-07-06

### Fixed

-   Goal approval missing in push rendering. [#234](https://github.com/atomist/lifecycle-automation/issues/234)

## [0.8.33](https://github.com/atomist/lifecycle-automation/compare/0.8.32...0.8.33) - 2018-07-04

### Added

-   Fallback to email address on commit if there is no author. [#231](https://github.com/atomist/lifecycle-automation/issues/231)

### Fixed

-   Restart button missing on retry-able goals. [#233](https://github.com/atomist/lifecycle-automation/issues/233)

## [0.8.32](https://github.com/atomist/lifecycle-automation/compare/0.8.31...0.8.32) - 2018-06-30

### Added

-   Hide SDM status from dashboard cards. [#230](https://github.com/atomist/lifecycle-automation/issues/230)

### Fixed

-   Update logzio extension to latest version. [#229](https://github.com/atomist/lifecycle-automation/issues/229)

## [0.8.31](https://github.com/atomist/lifecycle-automation/compare/0.2.6...0.8.31) - 2018-06-28

### Fixed

-   Make sure branch is available on PullRequestToBranchLifecycle.
-   Ensure msgId is set before trying to extract the screen name.
-   Do not match partial image URLs. [#104](https://github.com/atomist/lifecycle-automation/issues/104)
-   Provide path to GitHubApi for GHE instances. [#121](https://github.com/atomist/lifecycle-automation/issues/121)
-   Account for channels without names. [#123](https://github.com/atomist/lifecycle-automation/issues/123)
-   Fetch repositories from GitHub. [#59](https://github.com/atomist/lifecycle-automation/issues/59)
-   Catastrophic backtracking in image URL regular expression. [#136](https://github.com/atomist/lifecycle-automation/issues/136)

## [0.2.6](https://github.com/atomist/lifecycle-automation/compare/0.2.5...0.2.6) - 2017-11-15

### Added

-   Metrics tracking via Datadog now.

### Changed

-   Auto-Merge now uses a repo rather a comment.

## [0.2.5](https://github.com/atomist/lifecycle-automation/compare/0.2.4...0.2.5) - 2017-11-15

### Added

-   Request Review is now a drop-down if there are suggested reviewers on GitHub.

### Fixed

-   Auto-Merge button now correctly disappears again once auto-merge is enabled.

## [0.2.4](https://github.com/atomist/lifecycle-automation/compare/0.2.3...0.2.4) - 2017-11-13

### Changed

-   Properly cache graph client instances.

## [0.2.3](https://github.com/atomist/lifecycle-automation/compare/0.2.2...0.2.3) - 2017-11-13

### Changed

-   Updated to new automation-client to use Cluster infrastructure.

## [0.2.2](https://github.com/atomist/lifecycle-automation/compare/0.2.1...0.2.2) - 2017-11-12

### Changed

-   Deploy to internal Kube clusters.

## [0.2.1](https://github.com/atomist/lifecycle-automation/compare/0.2.0...0.2.1) - 2017-11-11

### Removed

-   Due to endless loop removed circle workflow rendering.

## [0.2.0](https://github.com/atomist/lifecycle-automation/compare/0.1.38...0.2.0) - 2017-11-10

### Added

-   Ability to configure lifecycles via `@atomist configure lifecycle` per channel.

### Fixed

-   `NotifyBotOwnerOnPush` was not sending `HandlerResult`.

## [0.1.38](https://github.com/atomist/lifecycle-automation/compare/0.1.37...0.1.38) - 2017-11-09

### Added

-   Tag button on tags.

### Changed

-   Only 3 referenced issues and pull request will now be displayed.

## [0.1.37](https://github.com/atomist/lifecycle-automation/compare/0.1.36...0.1.37) - 2017-11-09

### Added

-   Link repository to channel command and event handlers.
-   Send message when bot joins a channel.

### Changed

-   Updated package scripts to have standard names and be platform.

### Fixed

-   Provide warning when someone tries to link a repo to a non-public.

## [0.1.0](https://github.com/atomist/lifecycle-automation/tree/0.1.0) - 2017-10-11

### Added

-   Lifecycle rendering for Github Issues, PullRequest, Pushes as well.

# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

[Unreleased]: https://github.com/atomist/lifecycle-automation/compare/0.2.6...HEAD

### Fixed

-   Make sure branch is available on PullRequestToBranchLifecycle
-   Ensure msgId is set before trying to extract the screen name
-   Do not match partial image URLs [#104][104]
-   Provide path to GitHubApi for GHE instances [#121][121]
-   Account for channels without names [#123][123]
-   Fetch repositories from GitHub [#59][59]
-   Catastrophic backtracking in image URL regular expression [#136][136]

[104]: https://github.com/atomist/lifecycle-automation/issues/104
[121]: https://github.com/atomist/lifecycle-automation/issues/121
[123]: https://github.com/atomist/lifecycle-automation/issues/123
[59]: https://github.com/atomist/lifecycle-automation/issues/59
[136]: https://github.com/atomist/lifecycle-automation/issues/136

## [0.2.6][] - 2017-11-15

[0.2.6]: https://github.com/atomist/lifecycle-automation/compare/0.2.5...0.2.6

Datadog Stats release

### Added

-   Metrics tracking via Datadog now

### Changed

-   Auto-Merge now uses a repo rather a comment

## [0.2.5][] - 2017-11-15

[0.2.5]: https://github.com/atomist/lifecycle-automation/compare/0.2.4...0.2.5

Remove Auto-Merge button release

### Fixed

-   Auto-Merge button now correctly disappears again once auto-merge is enabled

### Added

-   Request Review is now a drop-down if there are suggested reviewers on GitHub

## [0.2.4][] - 2017-11-13

[0.2.4]: https://github.com/atomist/lifecycle-automation/compare/0.2.3...0.2.4

Caching release

### Changed

-   Properly cache graph client instances

## [0.2.3][] - 2017-11-13

[0.2.3]: https://github.com/atomist/lifecycle-automation/compare/0.2.2...0.2.3

Cluster release

### Changed

-   Updated to new automation-client to use Cluster infrastructure

## [0.2.2][] - 2017-11-12

[0.2.2]: https://github.com/atomist/lifecycle-automation/compare/0.2.1...0.2.2

Kube release

### Changed

-   Deploy to internal Kube clusters

## [0.2.1][] - 2017-11-11

[0.2.1]: https://github.com/atomist/lifecycle-automation/compare/0.2.0...0.2.1

Remove workflow rendering

### Removed

-   Due to endless loop removed circle workflow rendering

## [0.2.0][] - 2017-11-10

[0.2.0]: https://github.com/atomist/lifecycle-automation/compare/0.1.38...0.2.0

Configuration release

### Added

-   Ability to configure lifecycles via `@atomist configure lifecycle` per channel

### Fixed

-   `NotifyBotOwnerOnPush` was not sending `HandlerResult`

## [0.1.38][] - 2017-11-09

[0.1.38]: https://github.com/atomist/lifecycle-automation/compare/0.1.37...0.1.38

Limit Referenced Issues release

### Added

-   Tag button on tags

### Changed

-   Only 3 referenced issues and pull request will now be displayed

## [0.1.37][] - 2017-11-09

[0.1.37]: https://github.com/atomist/lifecycle-automation/compare/0.1.36...0.1.37

Replacement release

### Added

-   Link repository to channel command and event handlers
-   Send message when bot joins a channel

### Changed

-   Updated package scripts to have standard names and be platform
    agnostic

### Fixed

-   Provide warning when someone tries to link a repo to a non-public
    channel [#34][34]

[34]: https://github.com/atomist/lifecycle-automation/issues/34

## [0.1.0][] - 2017-10-11

[0.1.0]: https://github.com/atomist/lifecycle-automation/tree/0.1.0

Initial Release

### Added

-   Lifecycle rendering for Github Issues, PullRequest, Pushes as well
    as Builds etc.

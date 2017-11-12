# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

[Unreleased]: https://github.com/atomist/lifecycle-automation/compare/0.2.2...HEAD

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

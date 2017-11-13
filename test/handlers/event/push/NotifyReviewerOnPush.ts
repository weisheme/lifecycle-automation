import { EventFired } from "@atomist/automation-client/HandleEvent";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import { MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { MessageClientSupport } from "@atomist/automation-client/spi/message/MessageClientSupport";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import "mocha";
import * as assert from "power-assert";
import { NotifyReviewerOnPush } from "../../../../src/handlers/event/push/NotifyReviewerOnPush";

describe("NotifyReviewerOnPush", () => {

    /* tslint:disable */
    const payload1= `
    {
  "data": {
    "Push": [{
      "branch": "atomist-travisorg-patch-3",
      "repo": {
        "name": "handlers",
        "owner": "atomisthqa",
        "org": {
          "owner": "atomisthqa",
          "provider": null
        }
      },
      "commits": [{
        "author": {
          "login": "atomist-travisorg"
        },
        "sha": "815c9e15134c761e0febe1a8222f3cb53dd22d13",
        "pullRequests": [{
          "author": {
            "login": "atomist-travisorg"
          },
          "name": "1186",
          "number": 1186,
          "title": "Update README.md",
          "body": "",
          "state": "open",
          "merged": false,
          "reviewers": [{
            "login": "cdupuis"
          }],            
          "reviews": [{
            "state": "changes_requested",
            "by": [{
              "login": "cdupuis",
              "person": {
                "chatId": {
                  "screenName": "atomista",
                  "preferences": [{
                    "name": "dm",
                    "value": "{\\"disable_for_build\\":false,\\"disable_for_assignee\\":false,\\"disable_for_mention\\":false,\\"disable_for_prUpdates\\":false}"
                  }]
                }
              }
            }]
          }]
        }]
      }]
    }]
  },
  "extensions": {
    "type": "READ_ONLY",
    "operationName": "NotifyReviewerOnPush",
    "team_id": "T1L0VDKJP",
    "team_name": "atomista",
    "correlation_id": "a9187300-bc60-41bd-9801-ab2a284e4313"
  }
}`
    /* tslint:enable */

    it("correctly send message to reviewer on new commit", done => {
        let messageSend = false;
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(userNames === "atomista");
                messageSend = true;
                return Promise.resolve();
            }

        }

        const ctx: any = {
            messageClient: new MockMessageClient(),
        };
        const handler = new NotifyReviewerOnPush();

        handler.handle(JSON.parse(payload1) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(messageSend);
                assert(result.code === 0);
            })
            .then(done, done);

    });

    /* tslint:disable */
    const payload11 = `
    {
  "data": {
    "Push": [{
      "branch": "atomist-travisorg-patch-3",
      "repo": {
        "name": "handlers",
        "owner": "atomisthqa",
        "org": {
          "owner": "atomisthqa",
          "provider": null
        }
      },
      "commits": [{
        "author": {
          "login": "atomist-travisorg"
        },
        "sha": "815c9e15134c761e0febe1a8222f3cb53dd22d13",
        "pullRequests": [{
          "author": {
            "login": "atomist-travisorg"
          },
          "name": "1186",
          "number": 1186,
          "title": "Update README.md",
          "body": "",
          "state": "open",
          "merged": false,
          "reviewers": [],            
          "reviews": [{
            "state": "commented",
            "by": [{
              "login": "cdupuis",
              "person": {
                "chatId": {
                  "screenName": "atomista",
                  "preferences": [{
                    "name": "dm",
                    "value": "{\\"disable_for_build\\":false,\\"disable_for_assignee\\":false,\\"disable_for_mention\\":false,\\"disable_for_prUpdates\\":false}"
                  }]
                }
              }
            }]
          }]
        }]
      }]
    }]
  },
  "extensions": {
    "type": "READ_ONLY",
    "operationName": "NotifyReviewerOnPush",
    "team_id": "T1L0VDKJP",
    "team_name": "atomista",
    "correlation_id": "a9187300-bc60-41bd-9801-ab2a284e4313"
  }
}`
    /* tslint:enable */

    it("correctly don't send message to reviewer commented on new commit", done => {
        let messageSend = false;
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(userNames === "atomista");
                messageSend = true;
                return Promise.resolve();
            }

        }

        const ctx: any = {
            messageClient: new MockMessageClient(),
        };
        const handler = new NotifyReviewerOnPush();

        handler.handle(JSON.parse(payload11) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(!messageSend);
                assert(result.code === 0);
            })
            .then(done, done);

    });

    /* tslint:disable */
    const payload2 = `
    {
  "data": {
    "Push": [{
      "branch": "atomist-travisorg-patch-3",
      "repo": {
        "name": "handlers",
        "owner": "atomisthqa",
        "org": {
          "owner": "atomisthqa",
          "provider": null
        }
      },
      "commits": [{
        "author": {
          "login": "atomist-travisorg"
        },
        "sha": "815c9e15134c761e0febe1a8222f3cb53dd22d13",
        "pullRequests": [{
          "author": {
            "login": "atomist-travisorg"
          },
          "name": "1186",
          "number": 1186,
          "title": "Update README.md",
          "body": "",
          "state": "open",
          "merged": false,
          "reviews": [{
            "state": "requested",
            "by": [{
              "login": "cdupuis",
              "person": {
                "chatId": {
                  "screenName": "atomista",
                  "preferences": [{
                    "name": "dm",
                    "value": "{\\"disable_for_build\\":false,\\"disable_for_assignee\\":false,\\"disable_for_mention\\":false,\\"disable_for_prUpdates\\":false}"
                  }]
                }
              }
            }]
          }]
        }]
      }]
    }]
  },
  "extensions": {
    "type": "READ_ONLY",
    "operationName": "NotifyReviewerOnPush",
    "team_id": "T1L0VDKJP",
    "team_name": "atomista",
    "correlation_id": "a9187300-bc60-41bd-9801-ab2a284e4313"
  }
}`
    /* tslint:enable */

    it("don't send message to reviewer on new commit if review is requested", done => {
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(false);
                return Promise.resolve();
            }

        }

        const ctx: any = {
            messageClient: new MockMessageClient(),
        };
        const handler = new NotifyReviewerOnPush();

        handler.handle(JSON.parse(payload2) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(result.code === 0);
            })
            .then(done, done);

    });

    /* tslint:disable */
    const payload3 = `
    {
  "data": {
    "Push": [{
      "branch": "atomist-travisorg-patch-3",
      "repo": {
        "name": "handlers",
        "owner": "atomisthqa",
        "org": {
          "owner": "atomisthqa",
          "provider": null
        }
      },
      "commits": [{
        "author": {
          "login": "atomist-travisorg"
        },
        "sha": "815c9e15134c761e0febe1a8222f3cb53dd22d13",
        "pullRequests": [{
          "author": {
            "login": "atomist-travisorg"
          },
          "name": "1186",
          "number": 1186,
          "title": "Update README.md",
          "body": "",
          "state": "open",
          "merged": false,
          "reviews": [{
            "state": "requested",
            "by": [{
              "login": "cdupuis",
              "person": {
                "chatId": {
                  "screenName": "atomista",
                  "preferences": [{
                    "name": "dm",
                    "value": "{\\"disable_for_build\\":false,\\"disable_for_assignee\\":false,\\"disable_for_mention\\":false,\\"disable_for_prUpdates\\":true}"
                  }]
                }
              }
            }]
          }]
        }]
      }]
    }]
  },
  "extensions": {
    "type": "READ_ONLY",
    "operationName": "NotifyReviewerOnPush",
    "team_id": "T1L0VDKJP",
    "team_name": "atomista",
    "correlation_id": "a9187300-bc60-41bd-9801-ab2a284e4313"
  }
}`
    /* tslint:enable */

    it("don't send message to reviewer on new commit if dm is disabled", done => {
        class MockMessageClient extends MessageClientSupport {

            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert(false);
                return Promise.resolve();
            }

        }

        const ctx: any = {
            messageClient: new MockMessageClient(),
        };
        const handler = new NotifyReviewerOnPush();

        handler.handle(JSON.parse(payload3) as EventFired<any>, ctx as HandlerContext)
            .then(result => {
                assert(result.code === 0);
            })
            .then(done, done);

    });

});

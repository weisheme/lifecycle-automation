import { Success } from "@atomist/automation-client";
import { EventFired } from "@atomist/automation-client/HandleEvent";
import { guid } from "@atomist/automation-client/internal/util/string";
import { Destination, MessageOptions, SlackDestination } from "@atomist/automation-client/spi/message/MessageClient";
import { MessageClientSupport } from "@atomist/automation-client/spi/message/MessageClientSupport";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import "mocha";
import * as assert from "power-assert";
import { BuildToPushLifecycle } from "../../../../src/handlers/event/push/BuildToPushLifecycle";

describe("BuildToPushLifecycle", () => {

    /* tslint:disable */
    const payload = `{
  "data": {
    "Build": [{
      "push": {
        "builds": [{
          "id": "T095SFFBK_280825123",
          "buildUrl": "https://travis-ci.org/atomisthq/lifecycle-demo/builds/280825123",
          "name": "133",
          "provider": "travis",
          "status": "started",
          "commit": {
            "sha": "4dd9c968915d3b01e5252fb6f430ada5fc024f63"
          },
          "timestamp": "2017-09-28T11:23:56.760Z"
        }],
        "before": null,
        "after": {
          "sha": "4dd9c968915d3b01e5252fb6f430ada5fc024f63",
          "message": "Testing PR reviews\\n\\nSome text",
          "statuses": [{
            "context": "continuous-integration/travis-ci/push",
            "description": "The Travis CI build is in progress",
            "targetUrl": "https://travis-ci.org/atomisthq/lifecycle-demo/builds/280825123?utm_source=github_status&utm_medium=notification",
            "state": "pending"
          }],
          "tags": []
        },
        "repo": {
          "owner": "atomisthq",
          "name": "lifecycle-demo",
          "channels": [{
            "name": "lifecycle-demo",
            "team": {
                "id": "T095SFFBK"
            }
          }],
          "labels": [{
            "name": "duplicate"
          }, {
            "name": "duplicate"
          }, {
            "name": "question"
          }, {
            "name": "bug"
          }, {
            "name": "enhancement"
          }],
          "org": {
            "provider": null
          },
          "defaultBranch": "master"
        },
        "commits": [{
          "sha": "4dd9c968915d3b01e5252fb6f430ada5fc024f63",
          "message": "Testing PR reviews\\n\\nSome text",
          "resolves": [],
          "impact": null,
          "apps": [],
          "tags": [],
          "author": {
            "login": "cdupuis",
            "person": {
              "chatId": {
                "screenName": "cd"
              }
            }
          },
          "timestamp": "2017-09-28T13:23:47+02:00"
        }],
        "timestamp": "2017-09-28T11:23:48.993Z",
        "branch": "cdupuis-patch-7"
      },
      "timestamp": "2017-09-28T11:23:56.760Z"
    }]
  },
  "extensions": {
    "type": "READ_ONLY",
    "operationName": "BuildToPushLifecycle",
    "team_id": "T095SFFBK",
    "correlation_id": "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9"
  }
}`;
    /* tslint:enable */

    it("render correct number of attachments", done => {
        class MockMessageClient {

            public send(msg: any, destinations: Destination, options?: MessageOptions): Promise<any> {
                assert((destinations as SlackDestination).channels[0] === "lifecycle-demo");
                assert(options.id ===
                    "push_lifecycle/atomisthq/lifecycle-demo/cdupuis-patch-7/4dd9c968915d3b01e5252fb6f430ada5fc024f63");
                const sm = msg as SlackMessage;
                assert(sm.attachments.length === 1);
                return Promise.resolve();
            }
        }

        const ctx: any = {
            teamId: "T095SFFBK",
            correlationId: "14340b3c-e5bc-4101-9b0a-24cb69fc6bb9",
            invocationId: guid(),
            graphClient: {
                executeQueryFromFile(name: string, variables?: any): Promise<any> {
                    return Promise.resolve();
                },
            },
            messageClient: new MockMessageClient(),
        };
        const handler = new BuildToPushLifecycle();
        handler.handle(JSON.parse(payload) as EventFired<any>, ctx)
            .then(result => {
                assert.deepEqual(result, Success);
            })
            .then(done, done);

    });
});

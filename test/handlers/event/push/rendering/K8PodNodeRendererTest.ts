import { EventFired } from "@atomist/automation-client/HandleEvent";
import "mocha";
import * as assert from "power-assert";
import { K8PodNodeRenderer } from "../../../../../src/handlers/event/push/rendering/PushNodeRenderers";
import * as graphql from "../../../../../src/typings/types";

describe("K8PodNodeRenderer", () => {

    /* tslint:disable */
    const payload = `{
  "data": {
    "Status": [
      {
        "commit": {
          "pushes": [
            {
              "builds": [
                {
                  "buildId": "55689928",
                  "buildUrl": "https://travis-ci.com/atomisthq/rug-runner/builds/55689928",
                  "name": "1166",
                  "provider": "travis",
                  "status": "passed",
                  "commit": {
                    "sha": "1f5236e8dd9da0b5f7f8af06dec9c07fa51a65f5"
                  },
                  "timestamp": "2017-09-28T17:58:45.247Z"
                }
              ],
              "before": {
                "sha": "637f465bd44d6992482574f33415288fbd5a9692"
              },
              "after": {
                "sha": "1f5236e8dd9da0b5f7f8af06dec9c07fa51a65f5",
                "message": "Update README.md",
                "statuses": [
                  {
                    "context": "continuous-integration/travis-ci/push",
                    "description": "The Travis CI build passed",
                    "targetUrl": "https://travis-ci.com/atomisthq/rug-runner/builds/55689928?utm_source=github_status&utm_medium=notification",
                    "state": "success"
                  },
                  {
                    "context": "fingerprint/atomist",
                    "description": "No blocking Fingerprint changes",
                    "targetUrl": "",
                    "state": "success"
                  }
                ],
                "tags": [
                  {
                    "name": "2.2.0-20170928175629+travis1166"
                  },
                  {
                    "name": "2.2.0-20170928175629"
                  }
                ]
              },
              "repo": {
                "owner": "atomisthq",
                "name": "rug-runner",
                "channels": [
                  {
                    "name": "rug-runner"
                  }
                ],
                "labels": [
                  {
                    "name": "bug"
                  },
                  {
                    "name": "enhancement"
                  }
                ],
                "org": {
                  "provider": null
                },
                "defaultBranch": "master"
              },
              "commits": [
                {
                  "sha": "1f5236e8dd9da0b5f7f8af06dec9c07fa51a65f5",
                  "message": "Update README.md",
                  "resolves": [],
                  "impact": {
                    "data": "[[[\\"travis\\",0],[\\"docker\\",0],[\\"props\\",0],[\\"rest\\",0],[\\"plugsMgt\\",0],[\\"depsMgt\\",0],[\\"plugins\\",0],[\\"deps\\",0]]]",
                    "url": ""
                  },
                  "apps": [],
                  "tags": [
                    {
                      "name": "2.2.0-20170928175629+travis1166",
                      "release": null,
                      "containers": []
                    },
                    {
                      "name": "2.2.0-20170928175629",
                      "release": null,
                      "containers": []
                    }
                  ],
                  "author": {
                    "login": "cdupuis",
                    "person": {
                      "chatId": {
                        "screenName": "cd"
                      }
                    }
                  },
                  "timestamp": "2017-09-28T19:53:38+02:00"
                }
              ],
              "timestamp": "2017-09-28T17:53:39.382Z",
              "branch": "master"
            }
          ],
          "timestamp": "2017-09-28T19:53:38+02:00"
        }
      }
    ]
  },
  "extensions": {
    "type": "READ_ONLY",
    "operationName": "StatusToPushLifecycle",
    "team_id": "T095SFFBK",
    "correlation_id": "d6e489ed-c251-4318-9f18-af6d68a11c97"
  }
}`;
    /* tslint:enable */

    it("no container attachement", () => {
        const event = JSON.parse(payload) as EventFired<graphql.StatusToPushLifecycle.Subscription>;
        const status = event.data.Status[0];
        const push = status.commit.pushes[0];
        const renderer = new K8PodNodeRenderer();
        assert(!renderer.supports(push));
    });

});

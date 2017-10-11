import "mocha";
import * as assert from "power-assert";
import { replaceChatIdWithGitHubId } from "../../src/util/Helpers";
// import { CortexToken } from "../../src/atomist.config";

describe("Helper", () => {

    /*  it("should replace chatIds in string", done => {
          const ctx: HandlerContext = {
              teamId: "T1L0VDKJP",
              correlationId: "xxx",
              graphClient: new ApolloGraphClient(DefaultStagingAtomistGraphQLServer, process),
          };
          const body = `some bla and bla and <@U1L22E3SA> some more bla. And some more from <@U1N8YRTPD>.`;

          replaceChatIdWithGitHubId(body, ctx)
              .then(result => {
                  console.log(result);
                  assert(result.indexOf("cd") > 0);
                  done();
              })
              .catch(err => {
                  console.log(`Encountered ${err}`);
              });
      }).timeout(5000); */
});

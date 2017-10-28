/* tslint:disable:max-line-length */

export const createSlackChannel = `mutation CreateSlackChannel($name: String!) {
  createSlackChannel(name: $name) {
    name
    id
  }
}`;

export const addBotToSlackChannel = `mutation AddBotToSlackChannel($channelId: String!) {
  addBotToSlackChannel(channelId: $channelId) {
    name
    id
  }
}`;

export const linkSlackChannelToRepo = `mutation LinkSlackChannelToRepo($channelId: String!, $repo: String!, $owner: String!) {
  linkSlackChannelToRepo(channelId: $channelId, repo: $repo, owner: $owner) {
    name
    id
  }
}`;

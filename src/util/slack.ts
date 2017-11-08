/**
 * Make sure channel is a public channel.
 *
 * @param id channel ID
 * @return true if the channel is a public channel
 */
export function isChannelPublic(id: string): boolean {
    return id.indexOf("C") === 0;
}

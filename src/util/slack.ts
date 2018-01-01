/**
 * Make sure channel is a public or private channel.
 * DMs are not supported right now.
 *
 * @param id channel ID
 * @return true if the channel is a public channel
 */
export function isPublic(id: string): boolean {
    return id.indexOf("C") === 0 || id.indexOf("G") === 0;
}

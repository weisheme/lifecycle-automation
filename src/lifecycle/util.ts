import { ChatTeam, Preferences } from "./Lifecycle";

export function chatTeamsToPreferences(chatTeams: ChatTeam[] = []): { [teamId: string]: Preferences[] } {
    const preferences: {
        [teamId: string]: Preferences[];
    } = {};
    chatTeams.forEach(ct => preferences[ct.id] = ct.preferences);
    return preferences;
}

export function normalizeTimestamp(timestamp: string): number {
    let pd = new Date().getTime();
    try {
        const date = Date.parse(timestamp);
        if (!isNaN(date)) {
            pd = date;
        }
    } catch (e) {
        // Ignore
    }
    return Math.floor(pd / 1000);
}

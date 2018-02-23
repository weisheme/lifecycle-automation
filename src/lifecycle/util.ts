import { ChatTeam, Preferences } from "./Lifecycle";

export function chatTeamsToPreferences(chatTeams: ChatTeam[] = []): { [teamId: string]: Preferences[] } {
    const preferences: {
        [teamId: string]: Preferences[];
    } = {};
    chatTeams.forEach(ct => preferences[ct.id] = ct.preferences);
    return preferences;
}

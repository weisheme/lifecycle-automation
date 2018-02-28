export function newCardMessage(type: string, ts: number = Date.now()): CardMessage {
    return {
        id: null,
        key: null,
        ts,
        ttl: null,
        type,
        correlations: [],
        collaborators: [],
        events: [],
        actions: [],
        actionGroups: [],
    };
}

export function isCardMessage(object: any): object is CardMessage {
    return object.title && object.body;
}

export function addCollaborator(collaborator: { avatar: string, login: string, link: string}, card: CardMessage) {
    if (!card.collaborators) {
        card.collaborators = [];
    }
    /* tslint:disable */
    /**
        if (card.body && card.body.login === collaborator.login) {
            return;
        }
     */
    /* tslint:enable */
    if (!card.collaborators.some(c => c.login === collaborator.login)) {
        card.collaborators.push(collaborator);
    }
}

export interface CardMessage {
    id: string;
    key: string;

    ts: number;
    ttl: number;
    post?: "update_only" | "always";
    type: string;

    repository?: {
        owner: string;
        name: string;
    };

    shortTitle?: string;

    title?: {
        icon: string;
        text: string;
    };

    body?: Body;

    correlations?: Correlation[];

    collaborators?: Array<{
        avatar: string;
        login: string;
        link: string;
    }>;

    events?: Event[];

    actions?: Action[];
    actionGroups?: ActionGroup[];

    comments?: Body[];
    reactions?: Array<{
        avatar: string;
        login: string;
        reaction: string;
    }>;
}

export interface Body {
    avatar: string;
    login: string;
    text: string;
    hint?: string;
    ts: number;
}

export interface Correlation {
    type: string;
    icon: string;
    title: string;
    shortTitle: string;
    link?: string;
    body?: Array<{
        icon?: string;
        text: string;
    }>;
}

export interface Event {
    icon: string;
    text: string;
    ts: number;
    actions?: Action[];
    actionGroups?: ActionGroup[];
}

export interface ActionGroup {

    actions: Action[];
}

export interface Action {

    text: string;
    type: "button" | "menu";

    registration: string;
    command: string;
    parameters?: Array<{
        name: string;
        value: string;
    }>;

    parameterName?: string;
    parameterOptions?: Option[];
    parameterOptionGroups?: OptionGroup[];

    role?: "global" | "comment" | "react";
}

export interface Option {
    name: string;
    value: string;
}

export interface OptionGroup {
    name: string;
    options: Option[];
}

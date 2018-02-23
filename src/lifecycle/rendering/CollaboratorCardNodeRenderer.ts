import {
    avatarUrl,
    userUrl,
} from "../../util/helpers";
import { Action, addCollaborator, CardMessage } from "../card";
import {
    AbstractIdentifiableContribution, CardNodeRenderer,
    RendererContext,
} from "../Lifecycle";

export class CollaboratorCardNodeRenderer extends AbstractIdentifiableContribution
    implements CardNodeRenderer<any> {

    constructor(private callback: (node: any) => boolean = () => true, private keys: string[] = ["login"]) {
        super("collaborator");
    }

    public supports(node: any): boolean {
        return this.callback(node);
    }

    public render(node: any, actions: Action[], msg: CardMessage, context: RendererContext):
        Promise<CardMessage> {
        const repo = context.lifecycle.extract("repo");

        const values = [];
        find(node, this.keys, values);

        values.forEach(v => addCollaborator({
            avatar: avatarUrl(repo, v),
            login: v,
            link: userUrl(repo, v),
        }, msg));

        return Promise.resolve(msg);
    }
}

function find(obj: any, keys: string[], values: string[]) {
    for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === "object") {
                find(obj[property], keys, values);
            } else if (keys.includes(property)) {
                if (!values.includes(obj[property])) {
                    values.push(obj[property]);
                }
            }
        }
    }
}

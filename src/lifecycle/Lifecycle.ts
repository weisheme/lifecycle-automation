import {
    EventFired,
    Failure,
    failure,
    HandleEvent,
    HandlerResult,
    Success,
} from "@atomist/automation-client/Handlers";
import { HandlerContext } from "@atomist/automation-client/Handlers";
import { clean } from "@atomist/automation-client/internal/transport/websocket/WebSocketMessageClient";
import { logger } from "@atomist/automation-client/internal/util/logger";
import {
    MessageClient,
    MessageOptions,
} from "@atomist/automation-client/spi/message/MessageClient";
import {
    Action,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as config from "config";
import * as deepmerge from "deepmerge";

/**
 * Base Event Handler implementation that handles rendering of lifecycle messages.
 */
export abstract class LifecycleHandler<R> implements HandleEvent<R> {

    public defaultConfigurations = config.get("lifecycles") || {};

    public handle(event: EventFired<R>, ctx: HandlerContext): Promise<HandlerResult> {
        // Let the concrete handler configure the lifecycle message
        const lifecycles = this.prepareLifecycle(event);

        // Bail out if something isn't correctly linked up
        if (lifecycles == null || lifecycles.length === 0) {
            return Promise.resolve({ code: 0, message: "No lifecycle created" });
        }

        const results = lifecycles.filter(l => this.validate(l)).map(lifecycle => {

            // Merge default and handler provided configuration
            const configuration = deepmerge(
                this.defaultConfigurations[lifecycle.name] as LifecycleConfiguration,
                this.prepareConfiguration(event, lifecycle.name));

            if (configuration) {
                lifecycle.renderers = this.configureRenderers(lifecycle.renderers, configuration);
                lifecycle.contributors = this.configureContributors(lifecycle.contributors, configuration);
            }

            const renderers: any[] = [];

            // Call all NodeRenderers and ButtonContributors
            lifecycle.renderers.forEach(r => {
                lifecycle.nodes.filter(n => r.supports(n)).forEach(n => {
                    // First collect all buttons/actions for the given node
                    const context = new RendererContext(r.id(), lifecycle, configuration, ctx);

                    const contributors: any[] = [];
                    lifecycle.contributors.filter(c => c.supports(n)).forEach(c => {

                        contributors.push(
                            c.buttonsFor(n, context).then(buttons => {
                                return buttons;
                            }));

                        contributors.push(
                            c.menusFor(n, context).then(selects => {
                                return selects;
                            }));
                    });

                    // Secondly trigger rendering
                    renderers.push(msg => {
                        return Promise.all(contributors)
                            .then(contributorResults => {
                                const actions = [];
                                contributorResults.filter(cr => cr && cr.length > 0)
                                    .forEach(cr => actions.push(...cr));
                                return r.render(n, actions, msg, context);
                            });
                    });
                });
            });

            // Prepare message and instructions
            const message: SlackMessage = {
                text: null,
                attachments: [],
            };

            return renderers.reduce((p, f) => p.then(f), Promise.resolve(message))
                .then(msg => {
                    // Finally create the UpdatableMessage from the populated SlackMessage
                    return this.createMessage(msg, lifecycle, ctx.messageClient);
                });

        });

        return Promise.all(results)
            .then(resolved => {
                const error = resolved.some(r => r.some(ri => ri.code !== 0));
                return error ? Failure : Success;
            });
    }

    /**
     * Extension point to configure nodes and rendering of those nodes for a given path expression match.
     * @param event the cortex event the path expression matched
     */
    protected abstract prepareLifecycle(event: EventFired<R>): Lifecycle[];

    /**
     * Extension point for handlers to extract preferences from user or chatteam nodes.
     * @param {EventFired<R>} event
     * @returns {Preferences[]}
     */
    protected extractPreferences(event: EventFired<R>): Preferences[] {
        return [];
    }

    private prepareConfiguration(event: EventFired<R>, name: string): LifecycleConfiguration {
        const preferences = this.extractPreferences(event);
        if (preferences) {
            const lifecycles = preferences.find(p => p.name === "lifecycles");
            if (lifecycles && lifecycles.value) {
                try {
                    const configuration = JSON.parse(lifecycles.value)[name] as LifecycleConfiguration;
                    if (configuration) {
                        return configuration;
                    }
                } catch (err) {
                    console.warn(`Lifecycle configuration corrupt: '${lifecycles.value}'`);
                }
            }
        }
        return {} as LifecycleConfiguration;
    }

    private createMessage(message: SlackMessage, lifecycle: Lifecycle,
                          messageClient: MessageClient): Promise<any> {
        message.unfurl_links = false;
        message.unfurl_media = true;

        let ts = this.normalizeTimestamp(lifecycle.timestamp);
        if (ts == null) {
            ts = new Date().getTime().toString();
        }

        const options: MessageOptions = {
            id: lifecycle.id,
            ttl: +lifecycle.ttl,
            ts: +ts,
            post: lifecycle.post,
        };

        return this.sendMessage(message, options, lifecycle, messageClient);
    }

    private sendMessage(slackMessage: SlackMessage, options: MessageOptions, lifecycle: Lifecycle,
                        messageClient: MessageClient): Promise<any> {
        const msgs: Array<Promise<any>> = [];
        if (lifecycle.channels && lifecycle.channels.length > 0) {
            msgs.push(messageClient.addressChannels(slackMessage, lifecycle.channels, options)
                .then(() => {
                    logger.info("Sending lifecycle message '%s' to channels '%s'", lifecycle.id,
                        lifecycle.channels.join(", "));
                    return Success;
                })
                .catch(err => failure(err)));
        }
        if (lifecycle.users && lifecycle.users.length > 0) {
            msgs.push(messageClient.addressUsers(slackMessage, lifecycle.users, options)
                .then(() => {
                    logger.info("Sending lifecycle message '%s' to users '%s'", lifecycle.id,
                        lifecycle.users.join(", "));
                    return Success;
                })
                .catch(err => failure(err)));
        }
        if (lifecycle.respond && lifecycle.respond === true) {
            msgs.push(messageClient.respond(slackMessage, options)
                .then(() => {
                    logger.info("Sending lifecycle response message '%s'", lifecycle.id);
                    return Success;
                })
                .catch(err => failure(err)));
        }
        return Promise.all(msgs);
    }

    private validate(lifecycle: Lifecycle): boolean {
        // Make sure there is a lifecycle
        if (lifecycle == null) {
            return false;
        }

        lifecycle.channels = clean(lifecycle.channels);
        lifecycle.users = clean(lifecycle.users);

        // Verify that lifecycle has channels, users or is a response message
        return (lifecycle.channels && lifecycle.channels.length > 0)
            || (lifecycle.users && lifecycle.users.length > 0)
            || (lifecycle.respond && lifecycle.respond === true);
    }

    private normalizeTimestamp(timestamp: string): string {
        try {
            const date = Date.parse(timestamp);
            if (!isNaN(date)) {
                return date.toString();
            } else {
                return timestamp;
            }
        } catch (e) {
            // ignore
        }
        return new Date().getTime().toString();
    }

    private configureContributors(contributors: Array<ActionContributor<any>>,
                                  configuration: LifecycleConfiguration) {
        if (configuration) {
            if (configuration.contributors) {
                contributors = this.filterAndSort(contributors,
                    configuration.contributors) as Array<ActionContributor<any>>;
            }
        } else {
            configuration = {} as LifecycleConfiguration;
        }
        contributors.forEach(c => {
           if (c.configure) {
               c.configure(configuration);
           }
        });
        return contributors;
    }

    private configureRenderers(renderers: Array<NodeRenderer<any>>,
                               configuration: LifecycleConfiguration): Array<NodeRenderer<any>> {
        if (configuration) {
            if (configuration.renderers) {
                renderers = this.filterAndSort(renderers, configuration.renderers) as Array<NodeRenderer<any>>;
            }
        } else {
            configuration = {} as LifecycleConfiguration;
        }
        renderers.forEach(c => {
            if (c.configure) {
                c.configure(configuration);
            }
        });
        return renderers;
    }

    private filterAndSort(sortable: IdentifiableContribution[], configuration: string[]): IdentifiableContribution[] {
        let sorted = sortable.filter(r => configuration.indexOf(r.id()) >= 0);
        // Sort based on configuration
        sorted = sorted.sort((r1, r2) => {
            const i1 = configuration.indexOf(r1.id());
            const i2 = configuration.indexOf(r2.id());
            return i1 - i2;
        });
        return sorted;
    }
}

export interface LifecycleConfiguration {

    renderers: string[];
    contributors: string[];
    configuration: any;
}

export interface Preferences {
    name?: string;
    value?: string;
}

/**
 * Returned by LifecycleHandler.prepareLifecycle in order to link path expressions matches up with
 * NodeRenderer and ActionContributor.
 */
export interface Lifecycle {

    /**
     * The name of the lifecycle
     */
    name: string;

    /**
     * The id to be used to identify the lifecycle message in Slack.
     * Only lifecycle messages with matching ids are being overwritten.
     */
    id: string;

    /**
     * Timestamp of the lifecycle message. This is used to drop out-of-order messages.
     */
    timestamp: string;

    /**
     * Timestamp after which message should be re-written.
     */
    ttl?: string;

    /**
     * Indicate if this message should only be an update to an existing message
     */
    post?: "update_only" | "always";

    /**
     * The channels the lifecycle message should be send to.
     */
    channels: string[];

    /**
     * The name of users to send this lifecycle message to.
     */
    users?: string[];

    /**
     * If this lifecycle is in response to a user invoking a command.
     */
    respond?: boolean;

    /**
     * The cortex nodes that should be rendered.
     * The order of the nodes in the returned array determines the rendering order: the first node
     * in the array will be passed to the NodeRenderes first, etc.
     */
    nodes: any[];

    /**
     * The NodeRenderers to use for rendering.
     * The order of renderers in the returned array determines the rendering order.
     */
    renderers: Array<NodeRenderer<any>>;

    /**
     * The ActionContributor to use for adding buttons to messages.
     */
    contributors?: Array<ActionContributor<any>>;

    /**
     * The NodeExtractor to help extract nodes from the root
     */
    extract: (type: string) => any;
}

export interface IdentifiableContribution {

    /**
     * Unique id of this renderer
     */
    id(): string;

    /**
     * Configure the contributions with the provided configuration
     * @param {LifecycleConfiguration} config
     */
    configure?(config: LifecycleConfiguration);
}

/**
 * A NodeRenderer is responsible to render a given and supported cortex node into the provided
 * SlackMessage.
 */
export interface NodeRenderer<T> extends IdentifiableContribution {

    /**
     * Indicate if a NodeRenderer supports a provided cortex node.
     */
    supports(node: T): boolean;

    /**
     * Render the given node and actions into the given SlackMessage.
     */
    render(node: T, actions: Action[], msg: SlackMessage, context: RendererContext): Promise<SlackMessage>;
}

/**
 * A ActionContributor can add one or multiple buttons/actions for a given cortex node.
 */
export interface ActionContributor<T> extends IdentifiableContribution {

    /**
     * Indicate if a ActionContributor supports a provided cortex node.
     */
    supports(node: any): boolean;

    /**
     * Create buttons for the provided node.
     */
    buttonsFor(node: T, context: RendererContext): Promise<Action[]>;

    /**
     * Create menus for the provided node.
     */
    menusFor(node: T, context: RendererContext): Promise<Action[]>;
}

export class RendererContext {

    constructor(public rendererId: string, public lifecycle: Lifecycle,
                public configuration: LifecycleConfiguration, public context: HandlerContext) { }
}

export abstract class AbstractIdentifiableContribution implements IdentifiableContribution {

    // tslint:disable-next-line:variable-name
    constructor(private _id: string) { }

    public id(): string {
        return this._id;
    }
}

import {
    EventFired,
    Failure,
    failure,
    HandleEvent,
    HandlerResult,
    Secret,
    Secrets,
    Success,
    SuccessPromise,
} from "@atomist/automation-client";
import { HandlerContext } from "@atomist/automation-client";
import { logger } from "@atomist/automation-client/internal/util/logger";
import {
    addressSlackChannels,
    MessageClient,
    MessageOptions,
} from "@atomist/automation-client/spi/message/MessageClient";
import {
    Action,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import * as config from "config";
import * as deepmerge from "deepmerge";
import * as _ from "lodash";
import {
    LifecycleActionPreferences,
    LifecyclePreferences,
    LifecycleRendererPreferences,
} from "../handlers/event/preferences";

/**
 * Base Event Handler implementation that handles rendering of lifecycle messages.
 */
export abstract class LifecycleHandler<R> implements HandleEvent<R> {

    @Secret(Secrets.OrgToken)
    public orgToken: string;

    public defaultConfigurations = config.get("lifecycles") || {};

    public handle(event: EventFired<R>, ctx: HandlerContext): Promise<HandlerResult> {
        // Let the concrete handler configure the lifecycle message
        const lifecycles = this.prepareLifecycle(event);
        const preferences = this.extractPreferences(event);

        // Bail out if something isn't correctly linked up
        if (lifecycles == null || lifecycles.length === 0) {
            return Promise.resolve({ code: 0, message: "No lifecycle created" });
        }

        const results = lifecycles.map(lifecycle => {

            const channelResults = this.groupChannels(lifecycle, preferences).map(channels => {

                // Merge default and handler provided configuration
                const configuration = deepmerge(
                    this.defaultConfigurations[lifecycle.name] as LifecycleConfiguration,
                    this.prepareConfiguration(lifecycle.name, channels, preferences));

                if (configuration) {
                    lifecycle.renderers = this.configureRenderers(lifecycle.renderers, configuration,
                        lifecycle.name, channels, preferences);
                    lifecycle.contributors = this.configureContributors(lifecycle.contributors, configuration,
                        lifecycle.name, channels, preferences);
                }

                const renderers: any[] = [];
                const store = new Map<string, any>();

                lifecycle = this.processLifecycle(lifecycle, store);

                // Call all NodeRenderers and ButtonContributors
                lifecycle.renderers.forEach(r => {
                    lifecycle.nodes.filter(n => r.supports(n)).forEach(n => {
                        // First collect all buttons/actions for the given node
                        const context = new RendererContext(
                            r.id(), lifecycle, configuration, this.orgToken, ctx, store);

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
                        return this.createAndSendMessage(msg, lifecycle, channels, ctx.messageClient);
                    });
            });

            return Promise.all(channelResults);

        });

        return Promise.all(results)
            .then(resolved => {
                const error = resolved.some(r => r.some(ri => ri.code !== 0));
                return error ? Failure : Success;
            });
    }

    protected extractPreferences(event: EventFired<any>): { [teamId: string]: Preferences[] } {
        const preferences: {
                [teamId: string]: Preferences[];
            } = {};

        const chatTeams = this.extractChatTeams(event) || [];
        chatTeams.forEach(ct => preferences[ct.id] = ct.preferences);

        return preferences;
    }

    protected processLifecycle(lifecycle: Lifecycle, store: Map<string, any>): Lifecycle {
        return lifecycle;
    }

    /**
     * Extension point to configure nodes and rendering of those nodes for a given path expression match.
     * @param event the cortex event the path expression matched
     */
    protected abstract prepareLifecycle(event: EventFired<R>): Lifecycle[];

    /**
     * Extension point for handlers to extract preferences from ChatId or ChatTeam nodes.
     * @param {EventFired<R>} event
     * @returns {Preferences[]}
     */
    protected abstract extractChatTeams(event: EventFired<R>): ChatTeam[];

    private prepareConfiguration(name: string,
                                 channels: { teamId: string, channels: string[] },
                                 preferences: { [teamId: string]: Preferences[] }): LifecycleConfiguration {
        if (preferences && preferences[channels.teamId]) {
            const lifecycles = preferences[channels.teamId].find(p => p.name === "lifecycle_preferences");
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

    private createAndSendMessage(message: SlackMessage,
                                 lifecycle: Lifecycle,
                                 channels: { teamId: string, channels: string[] },
                                 messageClient: MessageClient): Promise<any> {
        message.unfurl_links = false;
        message.unfurl_media = true;

        let ts = this.normalizeTimestamp(lifecycle.timestamp);
        if (ts == null) {
            ts = Date.now().toString();
        }

        const options: MessageOptions = {
            id: lifecycle.id,
            ttl: +lifecycle.ttl,
            ts: +ts,
            post: lifecycle.post,
        };

        return this.sendMessage(message, options, channels, messageClient);
    }

    private sendMessage(slackMessage: SlackMessage,
                        options: MessageOptions,
                        channels: { teamId: string, channels: string[] },
                        messageClient: MessageClient): Promise<any> {
        // Make sure we don't send empty messages
        if (slackMessage.text === null &&
            (slackMessage.attachments === null || slackMessage.attachments.length === 0)) {
            return SuccessPromise;
        }

        return messageClient.send(slackMessage, addressSlackChannels(channels.teamId, ...channels.channels), options)
            .then(() => {
                logger.info("Sending lifecycle message '%s' to channel '%s'", options.id, channels.channels.join(", "));
                return Success;
            })
            .catch(failure);
    }

    private lifecycleEnabled(lifecycle: Lifecycle,
                             channel: Channel,
                             preferences: { [teamId: string]: Preferences[] }): boolean {
        if (preferences && preferences[channel.teamId]) {
            const preference = preferences[channel.teamId].find(p => p.name === LifecyclePreferences.key);
            if (preference) {
                const preferenceValue = JSON.parse(preference.value) || {};
                if (preferenceValue[channel.name]) {
                    if (preferenceValue[channel.name][lifecycle.name] === true) {
                        return true;
                    } else if (preferenceValue[channel.name][lifecycle.name] === false) {
                        return false;
                    }
                }
            }
        }

        // Check the default
        return LifecyclePreferences[lifecycle.name].enabled;
    }

    /**
     * Clean up the list of channels; look for channels that can be processed together as they don't have
     * any configuration.
     */
    private groupChannels(lifecycle: Lifecycle,
                          preferences: { [teamId: string]: Preferences[] } = {})
                          : Array<{teamId: string, channels: string[]}> {

        if (lifecycle == null) {
            return [];
        }

        // First filter out channel / lifecycle combinations that aren't enabled
        const channels = lifecycle.channels.filter(c => c.name && c.teamId)
            .filter(channel => this.lifecycleEnabled(lifecycle, channel, preferences));

        const unconfiguredChannels: Array<{teamId: string, channels: string[]}> = [];
        const configuredChannels: Array<{teamId: string, channels: string[]}> = [];

        channels.forEach(c => {
           if (preferences[c.teamId] && this.channelConfigured(c,
                   preferences[c.teamId].find(p => p.name === LifecycleActionPreferences.key))) {
               configuredChannels.push({teamId: c.teamId, channels: [c.name]});
           } else if (preferences[c.teamId] && this.channelConfigured(c,
                   preferences[c.teamId].find(p => p.name === LifecycleRendererPreferences.key))) {
               configuredChannels.push({teamId: c.teamId, channels: [c.name]});
           } else {
               if (unconfiguredChannels.some(uc => uc.teamId === c.teamId)) {
                   unconfiguredChannels.find(uc => uc.teamId === c.teamId).channels.push(c.name);
               } else {
                   unconfiguredChannels.push({teamId: c.teamId, channels: [c.name]});
               }
           }
        });

        if (unconfiguredChannels.length > 0) {
            return [ ...configuredChannels, ...unconfiguredChannels];
        } else {
            return configuredChannels;
        }
    }

    private channelConfigured(channel: Channel, preference: any): boolean {
        if (preference) {
            try {
                const preferenceValue = JSON.parse(preference.value) || {};
                if (preferenceValue[channel.name]) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                console.error(`Failed to parse lifecycle configuration: '${preference.value}'`);
                return false;
            }
        } else {
            return false;
        }
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
                                  configuration: LifecycleConfiguration = {} as LifecycleConfiguration,
                                  name: string,
                                  channels: { teamId: string, channels: string[] },
                                  preferences: { [teamId: string]: Preferences[] }) {
        contributors = this.filterAndSortContributions("action", contributors, configuration.contributors,
            name, channels, preferences) as Array<ActionContributor<any>>;
        contributors.forEach(c => {
           if (c.configure) {
               c.configure(configuration);
           }
        });
        return contributors;
    }

    private configureRenderers(renderers: Array<NodeRenderer<any>>,
                               configuration: LifecycleConfiguration = {} as LifecycleConfiguration,
                               name: string,
                               channels: { teamId: string, channels: string[] },
                               preferences: { [teamId: string]: Preferences[] }): Array<NodeRenderer<any>> {
        renderers = this.filterAndSortContributions("renderer", renderers, configuration.renderers,
            name, channels, preferences) as Array<NodeRenderer<any>>;
        renderers.forEach(c => {
            if (c.configure) {
                c.configure(configuration);
            }
        });
        return renderers;
    }

    private filterAndSortContributions(kind: "action" | "renderer",
                                       contributions: IdentifiableContribution[],
                                       configuration: string[],
                                       name: string,
                                       channels: { teamId: string, channels: string[] },
                                       preferences: { [teamId: string]: Preferences[] }): IdentifiableContribution[] {
        let preference;
        if (kind === "action" && preferences[channels.teamId]) {
            preference = preferences[channels.teamId].find(p => p.name === LifecycleActionPreferences.key);
        } else if (kind === "renderer" && preferences[channels.teamId]) {
            preference = preferences[channels.teamId].find(p => p.name === LifecycleRendererPreferences.key);
        }
        let preferenceConfiguration;
        if (kind === "action") {
            preferenceConfiguration = LifecycleActionPreferences[name] || {};
        } else if (kind === "renderer") {
            preferenceConfiguration = LifecycleRendererPreferences[name] || {};
        }
        if (preference && channels.channels.length === 1) {
            try {
                const channel = channels.channels[0];
                const preferenceValue = JSON.parse(preference.value) || {};
                if (preferenceValue[channel]) {
                    const channelPreferences = preferenceValue[channel];
                    contributions = contributions.filter(c => {
                        const channelPreference = _.get(channelPreferences, `${name}.${c.id()}`);
                        if (channelPreference != null) {
                            return channelPreference === true;
                        }
                        if (preferenceConfiguration && preferenceConfiguration[c.id()]) {
                            return preferenceConfiguration[c.id()].enabled;
                        } else {
                            return true;
                        }
                    });
                } else {
                    contributions = contributions.filter(c =>
                        preferenceConfiguration[c.id()] == null || preferenceConfiguration[c.id()].enabled);
                }
            } catch (e) {
                console.error(`Failed to parse lifecycle configuration: '${preference.value}'`);
            }
        } else {
            contributions = contributions.filter(c =>
                preferenceConfiguration[c.id()] == null || preferenceConfiguration[c.id()].enabled);
        }

        if (configuration) {
            contributions = contributions.filter(r => configuration.indexOf(r.id()) >= 0);

            // Sort based on configuration
            contributions = contributions.sort((r1, r2) => {
                const i1 = configuration.indexOf(r1.id());
                const i2 = configuration.indexOf(r2.id());
                return i1 - i2;
            });
        }
        return contributions;
    }
}

export interface LifecycleConfiguration {

    renderers: string[];
    contributors: string[];
    configuration: any;
}

export interface ChatTeam {
    id: string;
    preferences: Preferences[];
}

export interface Preferences {
    name?: string;
    value?: string;
}

export interface Channel {
    name: string;
    teamId: string;
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
    channels: Channel[];

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

    constructor(public rendererId: string,
                public lifecycle: Lifecycle,
                public configuration: LifecycleConfiguration,
                public orgToken: string,
                public context: HandlerContext,
                private store: Map<string, any>) { }

    public set(key: string, value: any) {
        this.store.set(key, value);
    }

    public get(key: string) {
        return this.store.get(key);
    }

    public has(key: string) {
        return this.store.has(key);
    }
}

export abstract class AbstractIdentifiableContribution implements IdentifiableContribution {

    // tslint:disable-next-line:variable-name
    constructor(private _id: string) { }

    public id(): string {
        return this._id;
    }
}

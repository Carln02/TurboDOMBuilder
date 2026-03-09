import {Propagation} from "../../../turboFunctions/event/event.types";
import {TurboEventManager} from "../../../eventHandling/turboEventManager/turboEventManager";

/**
 * @type {ListenerProperties}
 * @group Components
 * @category Listener
 *
 * @template {Node} TargetType - The type of the event target.
 * @template {ListenerCallback<TargetType>} CallbackType - The type of the callback executed by this listener.
 * @description Configuration object used to construct a {@link Listener}.
 *
 * @property {string} type - Event type (e.g., `"click"`, `"pointermove"`).
 * @property {CallbackType} callback - Listener callback.
 * @property {TargetType} [target] - Target node.
 * @property {string} [toolName] - Tool name to bind this listener to (if applicable).
 * @property {ListenerOptions} [options] - Options controlling registration and execution behaviors.
 * @property {TurboEventManager} [manager] - Event manager to use. Defaults to {@link TurboEventManager.instance}.
 */
type ListenerProperties<
    TargetType extends Node = Node,
    CallbackType extends ListenerCallback<TargetType> = ListenerCallback<TargetType>
> = {
    type: string,
    callback: CallbackType,
    target?: TargetType,
    toolName?: string,
    options?: ListenerOptions,
    manager?: TurboEventManager
};

/**
 * @type {MatchListenerProperties}
 * @group Components
 * @category Listener
 *
 * @template {Node} TargetType - The type of the event target.
 * @template {ListenerCallback<TargetType>} CallbackType - The type of the callback executed by this listener.
 * @extends ListenerProperties
 * @description Properties used for matching listeners (see {@link Listener.match}).
 *
 * @property {string[]} [optionsToSkip] - List of option keys to ignore when matching `options`.
 */
type MatchListenerProperties<
    TargetType extends Node = Node,
    CallbackType extends ListenerCallback<TargetType> = ListenerCallback<TargetType>
> = Partial<ListenerProperties<TargetType, CallbackType>> & {
    optionsToSkip?: string[]
};

/**
 * @callback ListenerCallback
 * @group Components
 * @category Listener
 * @template {Node} Type - The type of the event target.
 *
 * @description Callback signature for listeners. Receives the native event and the resolved target.
 *
 * @param {Event} e - The native event.
 * @param {Type} el - The target element/node the listener is bound to.
 * @returns {Propagation | any} A propagation directive (or any value).
 */
type ListenerCallback<Type extends Node = Node> = ((e: Event, el: Type) => Propagation | any);

/**
 * @type {ListenerOptions}
 * @group Components
 * @category Listener
 * @extends AddEventListenerOptions
 * @description Options used for listeners.
 *
 * @property {boolean} [checkSubstrates] - If true, checks substrates before execution. Defaults to true.
 * @property {boolean} [solveSubstrates] - If true, triggers substrate solving after execution. Defaults to true.
 * @property {number} [throttleEveryFrames] - Throttle execution to at most once every N animation frames.
 * @property {number} [throttleEveryMs] - Throttle execution to at most once every N milliseconds.
 */
type ListenerOptions = AddEventListenerOptions & {
    checkSubstrates?: boolean,
    solveSubstrates?: boolean,
    throttleEveryFrames?: number,
    throttleEveryMs?: number,
};

export {ListenerProperties, ListenerOptions, ListenerCallback, MatchListenerProperties};
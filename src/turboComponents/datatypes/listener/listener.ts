import {TurboEventManager} from "../../../eventHandling/turboEventManager/turboEventManager";
import {Propagation} from "../../../turboFunctions/event/event.types";
import {ListenerCallback, ListenerOptions, ListenerProperties, MatchListenerProperties} from "./listener.types";
import {TurboSelector} from "../../../turboFunctions/turboSelector";

/**
 * @class Listener
 * @group Components
 * @category Listener
 *
 * @template {Node} TargetType - The type of the event target.
 * @template {ListenerCallback<TargetType>} CallbackType - The type of the callback executed by this listener.
 * @description Object representing an event listener, storing its metadata (type, target, toolName, options,
 * manager) and providing utilities to execute and match it.
 */
class Listener<
    TargetType extends Node = Node,
    CallbackType extends ListenerCallback<TargetType> = ListenerCallback<TargetType>
> {
    /** @description Event type (e.g., `"click"`, `"pointermove"`). */
    public readonly type: string;

    /** @description Target node this listener is associated with. */
    public target: TargetType;

    /** @description Name of the tool this listener is bound to (if any). */
    public readonly toolName: string;

    /** @description Callback provided by the user. */
    public readonly callback: CallbackType;

    /**
     * @description Bundled listener that adapts native events to the {@link ListenerCallback} signature.
     */
    public readonly bundledListener: ((e: Event) => Propagation | any);

    /** @description Listener options used for registration and additional behaviors.*/
    public readonly options: ListenerOptions;

    /** @description Associated event manager used to coordinate listener execution. */
    public readonly manager: TurboEventManager;

    /** @description Last animation frame index during which this listener executed. */
    public lastExecutionFrame: number;

    /** @description Last timestamp (ms) at which this listener executed. */
    public lastExecutionTime: number;

    /**
     * @constructor
     * @param {ListenerProperties<TargetType, CallbackType>} properties - Listener configuration.
     * @description Creates a {@link Listener}.
     */
    public constructor(properties: ListenerProperties<TargetType, CallbackType>) {
        if (properties.target instanceof TurboSelector) properties.target = properties.target.element;
        this.type = properties.type;
        this.target = properties.target;
        this.toolName = properties.toolName;

        this.callback = properties.callback;
        this.bundledListener = (e: Event) => this.callback(e, this.target);

        this.options = properties.options ?? {};
        this.manager = properties.manager ?? TurboEventManager.instance;
    }

    /**
     * @function execute
     * @description Executes the listener using its bundled signature.
     * @param {Event} e - Event passed to the callback.
     * @returns {Propagation} Propagation returned by the callback.
     */
    public execute(e: Event): Propagation {
        return this.bundledListener(e);
    }

    /**
     * @function executeOn
     * @description Executes the underlying callback on an explicit target.
     * @param {Event} e - Event passed to the callback.
     * @param {TargetType} target - Target node.
     * @param {...any[]} args - Additional arguments forwarded to the callback.
     * @returns {any} Whatever the callback returns (typically {@link Propagation}).
     */
    public executeOn(e: Event, target: TargetType, ...args: any[]): any {
        return (this.callback as any)(e, target, ...args);
    }

    /**
     * @function match
     * @description Checks whether this listener matches a subset of properties.
     * @param {MatchListenerProperties<TargetType, CallbackType>} [properties={}] - Properties to match against.
     * @returns {boolean} Whether this listener matches.
     */
    public match(properties: MatchListenerProperties = {}): boolean {
        for (let [key, value] of Object.entries(properties)) {
            if (key === "target" && value instanceof TurboSelector) value = value.element;
            if (value === undefined || key === "optionsToSkip") continue;
            if (typeof value === "object") {
                if (typeof this[key] !== "object") return false;
                for (const [subKey, subValue] of Object.entries(value)) {
                    if (key === "options" && properties.optionsToSkip?.includes(subKey)) continue;
                    if (subValue === undefined) continue;
                    if (this[key][subKey] !== subValue) return false;
                }
                continue;
            }
            if (this[key] !== value) return false;
        }
        return true;
    }
}

export {Listener};
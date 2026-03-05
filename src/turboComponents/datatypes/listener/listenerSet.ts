import {Listener} from "./listener";
import {ListenerCallback, ListenerProperties, MatchListenerProperties} from "./listener.types";

/**
 * @class ListenerSet
 * @group Components
 * @category Listener
 *
 * @template {Node} TargetType - The type of the event target.
 * @template {ListenerCallback<TargetType>} CallbackType - The type of the callback executed by this listener.
 * @description Collection of {@link Listener} instances indexed by event type.
 * Provides helpers to add/remove/query listeners and to remove listeners matching criteria.
 */
class ListenerSet<
    TargetType extends Node = Node,
    CallbackType extends ListenerCallback<TargetType> = ListenerCallback<TargetType>
> {
    /**
     * @description Map from event type to a set of listeners registered for that type.
     */
    public readonly listeners: Map<string, Set<Listener<TargetType, CallbackType>>> = new Map();

    /**
     * @readonly
     * @description Flattened array of all listeners in the set.
     */
    public get listenersArray(): Listener<TargetType, CallbackType>[] {
        const listeners: Listener<TargetType, CallbackType>[] = [];
        for (const set of this.listeners.values()) {
            for (const entry of set.values()) {
                listeners.push(entry);
            }
        }
        return listeners;
    }

    /**
     * @function addListener
     * @description Adds a listener to the set.
     * @param {ListenerProperties<TargetType, CallbackType>} properties - The listener properties to add.
     */
    public addListener(properties: ListenerProperties<TargetType, CallbackType>): void;

    /**
     * @function addListener
     * @description Adds a listener to the set.
     * @param {Listener<TargetType, CallbackType>} listener - The listener to add.
     */
    public addListener(listener: Listener<TargetType, CallbackType>): void;
    public addListener(value: Listener<TargetType, CallbackType> | ListenerProperties<TargetType, CallbackType>): void {
        if (typeof value === "object" && !(value instanceof Listener)) value = new Listener(value);
        if (!value.type) return;
        if (!this.listeners.has(value.type)) this.listeners.set(value.type, new Set());
        this.listeners.get(value.type).add(value as Listener<TargetType, CallbackType>);
    }

    /**
     * @function removeListener
     * @description Removes a listener from the set.
     * @param {ListenerCallback<TargetType>} callback - The listener callback to remove.
     */
    public removeListener(callback: ListenerCallback<TargetType>): void;

    /**
     * @function removeListener
     * @description Removes a listener from the set.
     * @param {Listener<TargetType, CallbackType>} listener - The listener to remove.
     */
    public removeListener(listener: Listener<TargetType, CallbackType>): void;
    public removeListener(value: Listener<TargetType, CallbackType> | ListenerCallback<TargetType>): void {
        if (!value) return;
        if (value instanceof Listener) this.listeners.get(value.type)?.delete(value as Listener<TargetType, CallbackType>);
        else {
            const listener = this.listenersArray.find(listener => listener.callback === value);
            if (!listener) return;
            this.listeners.get(listener.type)?.delete(listener);
        }
    }

    /**
     * @function removeMatchingListeners
     * @description Removes all listeners that match the provided properties (see {@link Listener.match}).
     * @param {MatchListenerProperties<TargetType, CallbackType>} [matchingProperties={}] - Properties to match.
     */
    public removeMatchingListeners(matchingProperties: MatchListenerProperties<TargetType, CallbackType> = {}): void {
        this.getListeners(matchingProperties).forEach((listener: Listener<TargetType, CallbackType>) => {
            // listener.target?.removeEventListener(listener.type, listener.bundledListener, listener.options);
            this.removeListener(listener);
        });
    }

    /**
     * @function getListeners
     * @description Returns all listeners matching the provided properties (see {@link Listener.match}).
     * @param {MatchListenerProperties<TargetType, CallbackType>} [matchingProperties={}] - Properties to match.
     * @returns {Listener[]} Matching listeners.
     */
    public getListeners(matchingProperties: MatchListenerProperties<TargetType, CallbackType> = {}): Listener[] {
        return this.listenersArray.filter(listener => listener.match(matchingProperties));
    }

    /**
     * @function getListenersByType
     * @description Returns the set of listeners registered for the given event type.
     * @param {string} type - Event type.
     * @returns {Set<Listener<TargetType, CallbackType>>} Set of listeners for that type.
     */
    public getListenersByType(type: string): Set<Listener<TargetType, CallbackType>> {
        if (!type || !this.listeners.has(type)) return new Set();
        return this.listeners.get(type);
    }
}

export {ListenerSet};
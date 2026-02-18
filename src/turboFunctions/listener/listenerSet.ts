import {Listener} from "./listener";
import {ListenerCallback, ListenerProperties, MatchListenerProperties} from "./listener.types";

class ListenerSet<
    TargetType extends Node = Node,
    CallbackType extends ListenerCallback<TargetType> = ListenerCallback<TargetType>
> {
    public readonly listeners: Map<string, Set<Listener<TargetType, CallbackType>>> = new Map();

    public get listenersArray(): Listener<TargetType, CallbackType>[] {
        const listeners: Listener<TargetType, CallbackType>[] = [];
        for (const set of this.listeners.values()) {
            for (const entry of set.values()) {
                listeners.push(entry);
            }
        }
        return listeners;
    }

    public addListener(properties: ListenerProperties<TargetType, CallbackType>): void;
    public addListener(listener: Listener<TargetType, CallbackType>): void;
    public addListener(value: Listener<TargetType, CallbackType> | ListenerProperties<TargetType, CallbackType>): void {
        if (typeof value === "object" && !(value instanceof Listener)) value = new Listener(value);
        if (!value.type) return;
        if (!this.listeners.has(value.type)) this.listeners.set(value.type, new Set());
        this.listeners.get(value.type).add(value as Listener<TargetType, CallbackType>);
    }

    public removeListener(callback: ListenerCallback<TargetType>): void;
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

    public removeMatchingListeners(matchingProperties: MatchListenerProperties<TargetType, CallbackType> = {}): void {
        this.getListeners(matchingProperties).forEach((listener: Listener<TargetType, CallbackType>) => {
            // listener.target?.removeEventListener(listener.type, listener.bundledListener, listener.options);
            this.removeListener(listener);
        });
    }

    public getListeners(matchingProperties: MatchListenerProperties<TargetType, CallbackType> = {}): Listener[] {
        return this.listenersArray.filter(listener => listener.match(matchingProperties));
    }

    public getListenersByType(type: string): Set<Listener<TargetType, CallbackType>> {
        if (!type || !this.listeners.has(type)) return new Set();
        return this.listeners.get(type);
    }
}

export {ListenerSet};
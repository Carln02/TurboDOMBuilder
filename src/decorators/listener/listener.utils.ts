import {ListenerProperties} from "../../turboFunctions/listener/listener.types";

type ListenerConstructorType = {
    listeners: Map<PropertyKey, DecoratorListenerProperties>,
};

export type DecoratorListenerProperties = Omit<ListenerProperties, "callback"> & {
    methodName: PropertyKey,
    kind: "listener" | "behavior",
};

export class ListenerUtils {
    private constructorMap = new WeakMap<object, ListenerConstructorType>();

    public constructorData(prototype: object) {
        let obj = this.constructorMap.get(prototype);
        if (!obj) {
            obj = {listeners: new Map()};
            this.constructorMap.set(prototype, obj);
        }
        return obj!;
    }

    public addListener(prototype: object, listener: DecoratorListenerProperties) {
        if (!listener.methodName) return;
        const data = this.constructorData(prototype)?.listeners;
        if (!data || data.has(listener.methodName)) return;
        data.set(listener.methodName, listener);
    }

    public getAllListeners(instance: object) {
        let prototype = Object.getPrototypeOf(instance);
        const results: Map<PropertyKey, DecoratorListenerProperties> = new Map();
        while (prototype && prototype !== Object.prototype) {
            const map = this.constructorData(prototype).listeners;
            if (map?.size) for (const [key, value] of map.entries()) {
                if (!results.has(key)) results.set(key, value);
            }
            prototype = Object.getPrototypeOf(prototype);
        }
        return results;
    }
}
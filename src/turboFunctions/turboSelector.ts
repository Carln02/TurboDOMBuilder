/**
 * @class TurboSelector
 * @group TurboSelector
 *
 * @template {object} Type - The type of the object it wraps.
 * @description Selector class that wraps an object and augments it with useful functions to manipulate it. It also
 * proxies the object, so you can access properties and methods on the underlying object directly through the selector.
 */
class TurboSelector<Type extends object = Node> {
    /**
     * @description The underlying, wrapped object.
     */
    public element: Type;

    #generateProxy() {
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop in target) return Reflect.get(target, prop, receiver);
                const value = target.element?.[prop];
                return typeof value === "function" ? value.bind(target.element) : value;
            },
            set(target, prop, value, receiver) {
                if (prop in target) return Reflect.set(target, prop, value, receiver);
                target.element[prop] = value;
                return true;
            },
            has(target, prop) {
                return prop in target || prop in target.element;
            },
            ownKeys(target) {
                return Array.from([...Reflect.ownKeys(target), ...Reflect.ownKeys(target.element)]);
            },
            getOwnPropertyDescriptor(target, prop) {
                return Reflect.getOwnPropertyDescriptor(target, prop)
                    || Object.getOwnPropertyDescriptor(target.element, prop)
                    || undefined;
            }
        });
    }

    public constructor() {
        return this.#generateProxy();
    }
}

export {TurboSelector};
import {getFirstDescriptorInChain} from "../utils/dataManipulation/prototype";

/**
 * @decorator
 * @function expose
 * @group Decorators
 * @category Augmentation
 *
 * @description Stage-3 decorator that augments fields, accessors, and methods to expose fields and methods
 * from inner instances.
 *
 * @example
 * ```ts
 * protected model: TurboModel;
 * @expose("model") public color: string;
 * ```
 * Is equivalent to:
 * ```ts
 * protected model: TurboModel;
 *
 * public get color(): string {
 *     return this.model.color;
 * }
 *
 * public set color(value: string) {
 *     this.model.color = value;
 * }
 * ```
 */
function expose(rootKey: string, exposeSetter?: boolean): any;
/**
 * @function expose
 * @group Decorators
 * @category Augmentation
 *
 * @description Imperatively exposes a specific field from an inner instance onto a host object.
 * @param {object} host - The host object to define the exposed property on.
 * @param {string} rootKey - The property key of the inner instance to expose from.
 * @param {string} key - The property key to expose.
 * @param {boolean} [exposeSetter=true] - Whether to expose a setter for the property. Defaults to true.
 *
 * @example
 * ```ts
 * expose(this, "model", "color");
 * expose(this, "model", "readonlyProp", false);
 * ```
 */
function expose(host: object, rootKey: string, key: string, exposeSetter?: boolean): void;
function expose(...args: any[]): any {
    if (typeof args[0] === "object") {
        if (args.length < 3) return;
        return applyExpose(args[0], args[2], args[1], args[3] ?? true);
    } else {
        return function(value: any, context: any) {
            return exposeDecorator(args[0], args[1] ?? true, value, context);
        };
    }
}

function applyExpose(host: any, key: string, rootKey: string, exposeSetter: boolean) {
    const nestedRoots = rootKey.split(".").filter(Boolean);
    const getLowestRoot = (h: any) => nestedRoots.reduce((p, r) => p?.[r], h);

    const descriptor = getFirstDescriptorInChain(host, key);
    Object.defineProperty(host, key, {
        configurable: true,
        enumerable: descriptor?.enumerable ?? true,
        get() { return getLowestRoot(this)?.[key]; },
        set(value) { if (exposeSetter) { const r = getLowestRoot(this); if (r) r[key] = value; } },
    });
}

function exposeDecorator<Type extends object, Value>(
    rootKey: string,
    exposeSetter: boolean,
    value: any,
    context: ClassFieldDecoratorContext<Type, Value>
        | ClassAccessorDecoratorContext<Type, Value>
        | ClassMethodDecoratorContext<Type>
): any {
    if (!rootKey) return value;
    const {kind, name} = context;
    const key = String(name);
    const nestedRoots = rootKey.split(".").filter(Boolean);

    const getLowestRoot = (host: any) => nestedRoots.reduce((p, r) => p?.[r], host);

    if (kind === "method") {
        return function (this: any, ...args: any[]) {
            const root = getLowestRoot(this);
            const fn = root?.[key];
            if (typeof fn === "function") return fn.apply(root, args);
        };
    }

    context.addInitializer(function (this: any) {
        applyExpose(this, key, rootKey, exposeSetter);
    });
}

export {expose};
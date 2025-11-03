import {getFirstDescriptorInChain} from "../utils/dataManipulation/prototypeManipulation";

/**
 * @decorator
 * @function expose
 * @description Stage-3 decorator that augments fields, accessors, and methods to expose fields and methods
 * from inner instances.
 * @param {string} rootKey - The property key of the instance to expose from.
 * @param {boolean} [exposeSetter=true] - Whether to expose a setter for the property. Defaults to true.
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
 *    return this.model.color;
 * }
 *
 * public set color(value: string) {
 *    this.model.color = value;
 * }
 * ```
 */
function expose(rootKey: string, exposeSetter: boolean = true) {
    return function <Type extends object, Value>(
        value:
            | ((initial: Value) => Value)
            | { get?: (this: Type) => Value; set?: (this: Type, value: Value) => void }
            | ((this: Type, ...args: any[]) => any),
        context:
            | ClassFieldDecoratorContext<Type, Value>
            | ClassAccessorDecoratorContext<Type, Value>
            | ClassMethodDecoratorContext<Type>
    ): any {
        if (!rootKey) return value;
        const {kind, name} = context;
        const key = String(name);
        const nestedRoots = rootKey.split(".").filter(Boolean);

        const getLowestRoot = function (host: any) {
            if (!host) return;
            let parent = host;
            for (const root of nestedRoots) {
                parent = parent[root];
                if (!parent) return;
            }
            return parent;
        };

        if (kind === "method") {
            return function (this: any, ...args: any[]) {
                const root = getLowestRoot(this);
                const fn = root?.[key];
                if (typeof fn === "function") return fn.apply(root, args);
            };
        }

        context.addInitializer(function (this: any) {
            const read = function (this: any) {return getLowestRoot(this)?.[key]};
            const write = function (this: any, value: Value): void {
                const root = getLowestRoot(this);
                if (root) root[key] = value;
            };

            if (kind === "field" || kind === "accessor") {
                const descriptor = getFirstDescriptorInChain(this, key);
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor?.enumerable ?? true,
                    get: () => read.call(this),
                    set: (value: Value) => {
                        if (exposeSetter) write.call(this, value);
                    },
                });
            }
        });
    }
}

export {expose};
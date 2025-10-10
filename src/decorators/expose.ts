import {getFirstDescriptorInChain} from "../utils/dataManipulation/prototypeManipulation";

function expose(rootKey: string) {
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
        const {kind, name} = context;
        const key = String(name);

        if (kind === "method") {
            return function (this: any, ...args: any[]) {
                const root = this[rootKey];
                const fn = root?.[key];
                if (typeof fn === "function") return fn.apply(root, args);
            };
        }

        context.addInitializer(function (this: any) {
            const read = function (this: any) {return this[rootKey]?.[key]};
            const write = function (this: any, value: Value): void {
                if (this[rootKey]) this[rootKey][key] = value;
            };

            if (kind === "field" || kind === "accessor") {
                const descriptor = getFirstDescriptorInChain(this, key);
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor?.enumerable ?? true,
                    get: () => read.call(this),
                    set: (value: Value) => write.call(this, value),
                });
            }
        });
    }
}

export {expose};
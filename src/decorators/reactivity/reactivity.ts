import {ReactivityUtils} from "./reactivity.utils";
import {SignalBox, SignalEntry} from "./reactivity.types";
import {SignalUtils} from "./reactivity.signal";
import {EffectUtils} from "./reactivity.effect";
import {TurboModel} from "../../mvc/model/model";
import {isUndefined} from "../../utils/dataManipulation/misc";
import {DataKeyType} from "../../mvc/model/model.types";

const utils = new ReactivityUtils();
const signalUtils = new SignalUtils(utils);
const effectUtils = new EffectUtils(utils);

/**
 * @overload
 * @function signal
 * @group Decorators
 * @category Signal
 *
 * @description Create a standalone reactive signal box.
 * Returns a {@link SignalBox} wrapping the initial value.
 *
 * @template Value
 * @param {Value} [initial] - Initial value stored by the signal.
 * @param {object} [target] - The target to which the signal is bound.
 * @param {...PropertyKey[]} keys - The key path at which the signal will be stored in the target.
 * @returns {SignalBox<Value>} A reactive box for reading/updating the value.
 *
 * @example
 * ```ts
 * const count = signal(0);
 * const nested = signal(0, target, "users", "42", "score");
 * ```
 */
function signal<Value>(initial?: Value, target?: object, ...keys: DataKeyType[]): SignalBox<Value>;

/**
 * @overload
 * @function signal
 * @group Decorators
 * @category Signal
 *
 * @description Create a standalone reactive signal box that mirrors a getter and a setter.
 * Returns a {@link SignalBox} wrapping the initial value.
 *
 * @template Value
 * @param {() => Value} get - Getter that returns the value.
 * @param {(value: Value) => void} set - Setter that changes the value and emits the signal.
 * @param {object} [target] - The target to which the signal is bound.
 * @param {...PropertyKey[]} keys - The key path at which the signal will be stored in the target.
 * @returns {SignalBox<Value>} A reactive box for reading/updating the value.
 *
 * @example
 * ```ts
 * const nested = signal(() => target.get("users", "42"), v => target.set(v, "users", "42"), target, "users", "42");
 * ```
 */
function signal<Value>(get: () => Value, set: (value: Value) => void, target?: object, ...keys: DataKeyType[]): SignalBox<Value>;

/**
 * @overload
 * @decorator
 * @function signal
 * @group Decorators
 * @category Signal
 *
 * @description Stage-3 decorator that turns a field, getter, setter, or accessor into a reactive signal.
 *
 * @example
 * ```ts
 * class Counter {
 *   @signal count = 0;
 *
 *   @effect
 *   log() { console.log(this.count); }
 * }
 *
 * const c = new Counter();
 * c.count++; // triggers effect, logs updated value
 * ```
 */
function signal<Type extends object, Value>(
    value:
        | ((initial: Value) => Value)
        | ((this: Type) => Value)
        | ((this: Type, v: Value) => void)
        | { get?: (this: Type) => Value; set?: (this: Type, value: Value) => void },
    context:
        | ClassFieldDecoratorContext<Type, Value>
        | ClassGetterDecoratorContext<Type, Value>
        | ClassSetterDecoratorContext<Type, Value>
        | ClassAccessorDecoratorContext<Type, Value>
): any;
function signal(...args: any): any {
    // Decorator
    if (args.length === 2 && args[1] && typeof args[1] === "object"
        && "kind" in args[1] && "name" in args[1] && "static" in args[1] && "private" in args[1]) {
        return signalUtils.signalDecorator(args[0], args[1]);
    }
    // Getter + setter: signal(get, set, target?, ...keys)
    if (typeof args[0] === "function" && typeof args[1] === "function") {
        const [get, set, target, ...keys] = args;
        const key = keys.length === 1 ? keys[0] : keys.length > 1 ? utils.serializePath(keys) : undefined;
        return signalUtils.createBoxFromEntry(
            utils.createSignalEntry(undefined, target, key, get, set)
        );
    }
    // From value: signal(initial?, target?, ...keys)
    const [initial, target, ...keys] = args;
    const key = keys.length === 1 ? keys[0] : keys.length > 1 ? utils.serializePath(keys) : undefined;
    return signalUtils.createBoxFromEntry(
        utils.createSignalEntry(initial, target, key)
    );
}


/**
 * @decorator
 * @function modelSignal
 * @group Decorators
 * @category Signal
 *
 * @description Decorator that binds a reactive signal to a key path in the model's data,
 * read via `this.get(...keys)` and written via `this.set(value, ...keys)`.
 *
 * @param {...string[]} keys - The key path into the model's data. Defaults to the decorated member name if omitted.
 *
 * @example
 * ```ts
 * class TodoModel extends TurboModel {
 *   @modelSignal() title = "";
 *   @modelSignal("meta", "author") author = "";
 * }
 * ```
 * Is equivalent to:
 * ```ts
 * class TodoModel extends TurboModel {
 *   @signal get title() { return this.get("title"); }
 *   set title(value) { this.set(value, "title"); }
 *
 *   @signal get author() { return this.get("meta", "author"); }
 *   set author(value) { this.set(value, "meta", "author"); }
 * }
 * ```
 */
function modelSignal(...keys: DataKeyType[]) {
    return function <Type extends object, Value>(
        value:
            | ((initial: Value) => Value)
            | ((this: Type) => Value)
            | ((this: Type, v: Value) => void)
            | { get?: (this: Type) => Value; set?: (this: Type, value: Value) => void },
        context:
            | ClassFieldDecoratorContext<Type, Value>
            | ClassGetterDecoratorContext<Type, Value>
            | ClassSetterDecoratorContext<Type, Value>
            | ClassAccessorDecoratorContext<Type, Value>
    ): any {
        const resolvedKeys = keys.length > 0 ? keys : [String(context.name)];
        context.addInitializer(function (this: any) {
            utils.bindPath(this, context.name, resolvedKeys);
        });
        return signalUtils.signalDecorator(
            value,
            context,
            function (this: any) {
                return this.get?.(...resolvedKeys);
            },
            function (this: any, value: Value) {
                this.set?.(value, ...resolvedKeys);
            }
        );
    };
}

/**
 * @decorator
 * @function nestedModelSignal
 * @group Decorators
 * @category Signal
 *
 * @description Decorator that binds a reactive signal to a nested {@link TurboModel} instance at the given key path.
 * - Getter returns the nested model instance via `this.getNested(...keys)`.
 * - Setter assigns the new value to the nested model's root data via `this.getNested(...keys).data = value`.
 *
 * @param {...string[]} keys - The key path navigating to the nested model.
 *
 * @example
 * ```ts
 * class AppModel extends TurboModel {
 *   @nestedModelSignal("users", "42") user = undefined;
 * }
 * ```
 * Is equivalent to:
 * ```ts
 * class AppModel extends TurboModel {
 *   @signal get user() { return this.getNested("users", "42"); }
 *   set user(value) { this.getNested("users", "42").data = value; }
 * }
 * ```
 */
function nestedModelSignal(...keys: string[]) {
    return function <Type extends object, Value>(
        value:
            | ((initial: Value) => Value)
            | ((this: Type) => Value)
            | ((this: Type, v: Value) => void)
            | { get?: (this: Type) => Value; set?: (this: Type, value: Value) => void },
        context:
            | ClassFieldDecoratorContext<Type, Value>
            | ClassGetterDecoratorContext<Type, Value>
            | ClassSetterDecoratorContext<Type, Value>
            | ClassAccessorDecoratorContext<Type, Value>
    ): any {
        const resolvedKeys = keys.length > 0 ? keys : [String(context.name)];
        context.addInitializer(function (this: any) {
            utils.bindPath(this, context.name, resolvedKeys);
        });
        return signalUtils.signalDecorator(
            value,
            context,
            function (this: any) {
                return this.nest?.(...resolvedKeys);
            },
            function (this: any, value: Value) {
                this.set?.(value, ...resolvedKeys);
            }
        );
    };
}

/**
 * @overload
 * @function effect
 * @group Decorators
 * @category Effect
 *
 * @description Bind a standalone effect callback to any signal it includes. The callback will be fired everytime
 * the signal's value changes.
 *
 * @param {() => void} callback - The callback to process.
 * @returns {() => void} A callback that, once called, disposes of the created effect.
 *
 * @example
 * ```ts
 * const count = signal(0);
 * effect(() => console.log(count.value));
 * ```
 */
function effect(callback: () => void): () => void;

/**
 * @overload
 * @decorator
 * @function effect
 * @group Decorators
 * @category Effect
 *
 * @description Stage-3 decorator that turns a function or getter into an effect callback bound to any signal it includes.
 * The callback will be fired everytime the signal's value changes.
 *
 * @example
 * ```ts
 * class Counter {
 *   @signal count = 0;
 *
 *   @effect log = () => console.log(this.count);
 * }
 *
 * const c = new Counter();
 * c.count++; // triggers effect, logs updated value
 * ```
 */
function effect<Type extends object>(
    value: ((this: Type) => void) | (() => void),
    context?:
        | ClassMethodDecoratorContext<Type, any>
        | ClassGetterDecoratorContext<Type, any>
        | ClassFieldDecoratorContext<Type, any>
): any;
function effect(...args: any[]): any {
    const value = args[0];
    const context = args[1];
    if (context && typeof context === "object" && "kind" in context
        && "name" in context && "static" in context && "private" in context) {
        const {kind, name, static: isStatic} = context as any;
        const key = String(name);

        if (kind !== "method" && kind !== "getter" && !(kind === "field" && typeof value === "function"))
            throw new Error("@effect can only decorate zero-arg instance methods or getters.");
        if (isStatic) throw new Error("@effect does not support static methods/getters.");

        context.addInitializer?.(function (this: any) {
            const self = this;
            const fn = function () {
                value?.call(this)
            }
            const eff = effectUtils.makeEffect(() => fn.call(self));
            utils.setEffect(self, key, eff);
        });
    } else if (typeof value === "function") {
        const eff = effectUtils.makeEffect(value);
        eff.run();
        return () => eff.dispose();
    }
}

/**
 * @function getSignal
 * @group Decorators
 * @category Signal
 *
 * @template Type
 * @description Retrieve the signal at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 * @return {SignalEntry<Type>} - The signal entry.
 */
function getSignal<Type = any>(target: object, key: PropertyKey): SignalEntry<Type> {
    return utils.getSignal(target, key);
}

/**
 * @function setSignal
 * @group Decorators
 * @category Signal
 *
 * @template Type
 * @description Set the value of the signal at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 * @param {Type} value - The new value of the signal.
 */
function setSignal<Type = any>(target: object, key: PropertyKey, value: Type) {
    return utils.setSignal(target, key, value);
}

/**
 * @overload
 * @function markDirty
 * @group Decorators
 * @category Signal
 *
 * @description Marks the signal at the given `key` inside `target` as dirty and fires all of its attached effects.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 */
function markDirty(target: object, key: PropertyKey): void;

/**
 * @overload
 * @function markDirty
 * @group Decorators
 * @category Signal
 *
 * @description Marks the signal bound to the given key path inside `target` as dirty and fires all attached effects.
 * @param {object} target - The target to which the signal is bound.
 * @param {...(string | number | symbol)[]} keys - The key path of the data.
 */
function markDirty(target: object, ...keys: DataKeyType[]): void;
function markDirty(target: object, ...keys: DataKeyType[]) {
    const computedKey = keys.length > 1
        ? utils.getKeyFromPath(target, keys)
        : keys[0];
    return utils.markDirty(target, computedKey ?? keys[0]);
}

/**
 * @function initializeEffects
 * @group Decorators
 * @category Effect
 *
 * @description Initializes and runs all the effects attached to the given `target`.
 * @param {object} target - The target to which the effects are bound.
 */
function initializeEffects(target: object) {
    for (const [, entry] of utils.data(target).propertyKeyMap) entry.effect?.run();
}

/**
 * @function disposeEffect
 * @group Decorators
 * @category Effect
 *
 * @description Disposes of all the effects attached to the given `target`.
 * @param {object} target - The target to which the effects are bound.
 */
function disposeEffect(target: object): void;

/**
 * @function disposeEffect
 * @group Decorators
 * @category Effect
 *
 * @description Disposes of the effect at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 */
function disposeEffect(target: object, key: PropertyKey): void;
function disposeEffect(target: object, key?: PropertyKey) {
    const dispose = (data) => {
        data.effect?.dispose();
        data.effect = undefined;
    };

    if (key !== undefined) dispose(utils.getReactivityData(target, key));
    else for (const [, entry] of utils.data(target).propertyKeyMap) dispose(entry);
}

export {
    effect,
    setSignal,
    signal,
    modelSignal,
    nestedModelSignal,
    getSignal,
    markDirty,
    initializeEffects,
    disposeEffect
};
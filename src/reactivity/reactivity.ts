import {ReactivityUtils} from "./reactivity.utils";
import {SignalBox, SignalEntry} from "./reactivity.types";
import {SignalUtils} from "./reactivity.signal";
import {EffectUtils} from "./reactivity.effect";

const utils = new ReactivityUtils();
const signalUtils = new SignalUtils(utils);
const effectUtils = new EffectUtils(utils);

/**
 * @overload
 * @function signal
 * @description Create a standalone reactive signal box.
 * Returns a {@link SignalBox} wrapping the initial value.
 *
 * @template Value
 * @param {Value} [initial] - Initial value stored by the signal.
 * @returns {SignalBox<Value>} A reactive box for reading/updating the value.
 *
 * @example
 * ```ts
 * // Standalone signal
 * const count = signal(0);
 * // e.g., count.get(), count.set(1)
 * ```
 */
function signal<Value>(initial?: Value): SignalBox<Value>;

/**
 * @overload
 * @decorator
 * @function signal
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
    if (args[1] && typeof args[1] === "object" && "kind" in args[1]
        && "name" in args[1] && "static" in args[1] && "private" in args[1]) return signalUtils.signalDecorator(args[0], args[1]);
    const initial = args[0];
    return signalUtils.createBoxFromEntry(utils.createSignalEntry(initial));
}

/**
 * @decorator
 * @function modelSignal
 * @description Decorator that binds a reactive signal to a **model field**
 * retrieved via `this.getData(key, blockKey)` and stored via `this.setData(key, value, blockKey)`.
 * Useful to create signals in TurboModel classes.
 *
 * @param {string} dataKey - key to read/write (defaults to decorated member name when falsy).
 * @param {string | number} [blockKey] - Optional blockKey identifier.
 *
 * @example
 * ```ts
 * class TodoModel extends TurboModel {
 *   @modelSignal() title = "";
 * }
 * ```
 * Is equivalent to:
 * ```ts
 * class TodoModel extends TurboModel {
 *   @signal public get title() {
 *      return this.getData("title");
 *   }
 *
 *   public set title(value) {
 *      this.setData("title", value);
 *   }
 * }
 *
 * ```
 */
function modelSignal(dataKey?: string, blockKey?: string | number) {
    return function <Type extends object, Value>(
        value:
            | ((initial: Value) => Value)
            | ((this: Type) => Value)
            | ((this: Type, v: Value) => void)
            | {get?: (this: Type) => Value; set?: (this: Type, value: Value) => void},
        context:
            | ClassFieldDecoratorContext<Type, Value>
            | ClassGetterDecoratorContext<Type, Value>
            | ClassSetterDecoratorContext<Type, Value>
            | ClassAccessorDecoratorContext<Type, Value>
    ): any {
        const key = dataKey ?? String(context.name);
        return signalUtils.signalDecorator(value, context, function () {return this.getData?.(key, blockKey)},
            function (value) {this.setData?.(key, value, blockKey);});
    }
}

/**
 * @overload
 * @function effect
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
        const { kind, name, static: isStatic } = context as any;
        const key = String(name);

        if (kind !== "method" && kind !== "getter" && !(kind === "field" && typeof value === "function"))
            throw new Error("@effect can only decorate zero-arg instance methods or getters.");
        if (isStatic) throw new Error("@effect does not support static methods/getters.");

        context.addInitializer?.(function (this: any) {
            const self = this;
            const fn = function () {value?.call(this)}
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
 * @function markDirty
 * @description Marks the signal at the given `key` inside `target` as dirty and fires all of its attached effects.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 */
function markDirty(target: object, key: PropertyKey) {
    return utils.markDirty(target, key);
}

/**
 * @function initializeEffects
 * @description Initializes and runs all the effects attached to the given `target`.
 * @param {object} target - The target to which the effects are bound.
 */
function initializeEffects(target: object) {
    for (const [, entry] of utils.data(target)) entry.effect?.run();
}

/**
 * @function disposeEffect
 * @description Disposes of the effect at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 */
function disposeEffect(target: object, key: PropertyKey) {
    const data = utils.getReactivityData(target, key);
    data.effect?.dispose();
    data.effect = undefined;
}

/**
 * @function disposeEffects
 * @description Disposes of all the effects attached to the given `target`.
 * @param {object} target - The target to which the effects are bound.
 */
function disposeEffects(target: object) {
    for (const [, entry] of utils.data(target)) {
        entry.effect?.dispose();
        entry.effect = undefined;
    }
}

export {effect, setSignal, signal, modelSignal, getSignal, markDirty, initializeEffects, disposeEffect, disposeEffects};
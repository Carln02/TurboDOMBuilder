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
function modelSignal(dataKey: string, blockKey?: string | number) {
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
        const key = dataKey || String(context.name);
        return signalUtils.signalDecorator(value, context, function () {return this.getData?.(key, blockKey)},
            function (value) {this.setData?.(key, value, blockKey);});
    }
}

function effect(callback: () => void): () => void;
function effect<Type extends object>(
    value: (this: Type) => void,
    context?:
        | ClassMethodDecoratorContext<Type, any>
        | ClassGetterDecoratorContext<Type, any>
): any;
function effect(...args: any): any {
    if (args[1] && typeof args[1] === "object" && "kind" in args[1]
        && "name" in args[1] && "static" in args[1] && "private" in args[1]) {
        const { kind, name, static: isStatic } = args[1] as any;
        const key = String(name);

        if (kind !== "method" && kind !== "getter") throw new Error("@effect can only decorate zero-arg instance methods or getters.");
        if (isStatic) throw new Error("@effect does not support static methods/getters.");

        args[1].addInitializer(function (this: any) {
            const self = this;
            const eff = effectUtils.makeEffect(() => args[0]?.call(self));
            utils.setEffect(self, key, eff);
        });
    } else if (typeof args[0] === "function") {
        const eff = effectUtils.makeEffect(args[0]);
        eff.run();
        return () => eff.dispose();
    }
}

function getSignal<Type = any>(target: object, key: PropertyKey): SignalEntry<Type> {
    return utils.getSignal(target, key);
}

function setSignal<Type = any>(target: object, key: PropertyKey, next: Type) {
    return utils.setSignal(target, key, next);
}

function markDirty(target: object, key: PropertyKey) {
    return utils.markDirty(target, key);
}

function initializeEffects(target: object) {
    for (const [, entry] of utils.data(target)) entry.effect?.run();
}

function disposeEffect(target: object, key: PropertyKey) {
    const data = utils.getReactivityData(target, key);
    data.effect?.dispose();
    data.effect = undefined;
}

function disposeEffects(target: object) {
    for (const [, entry] of utils.data(target)) {
        entry.effect?.dispose();
        entry.effect = undefined;
    }
}

export {effect, setSignal, signal, modelSignal, getSignal, markDirty, initializeEffects, disposeEffect, disposeEffects};
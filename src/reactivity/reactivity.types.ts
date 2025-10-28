export type SignalSubscriber = () => void;
export type Read<Type> = () => Type;
export type Write<Type> = (value: Type) => void;

/**
 * @type {SignalEntry}
 * @template Type
 * @description Type that represents a base signal object.
 * @property {function(): Type} get - Retrieve the signal value.
 * @property {function(value: Type): void} set - Set the signal value.
 * @property {function(updater: (previous: Type) => Type): void} update - Set the value using a pure updater based
 * on the previous value.
 * @property {(fn: SignalSubscriber) => () => void} sub - Subscribe to change notifications. Returns an unsubscribe
 * function.
 * @property {() => void} emit - Force a notification cycle without changing the value (useful after in-place
 * mutation of structural data).
 *
 * @example
 * ```ts
 * const count: SignalEntry<number> = makeSignal(0);
 * const unsub = count.sub(() => console.log("count:", count.get()));
 * count.set(1); // logs "count: 1"
 * count.update(c => c+1); // logs "count: 2"
 * unsub();
 * ```
 */
type SignalEntry<Type = any> = {
    get(): Type,
    set(value: Type): void,
    update(updater: (previous: Type) => Type): void,
    sub(fn: SignalSubscriber): () => void,
    emit(): void
}

/**
 * @type {Effect}
 * @description Internal representation of a reactive effect. Effects are scheduled procedures that re-run when any
 * of their tracked dependencies (signals read during `run()`) change.
 *
 * @property {() => void} callback - User callback that will be executed on each run.
 * @property {Set<SignalEntry>} dependencies - Signals read during the last run.
 * @property {Array<() => void>} cleanups - Cleanup handlers to run before the next execution.
 * @property {boolean} scheduled - Implementation flag to coalesce/schedule runs.
 * @method run - Execute the effect: run cleanups, (re)collect dependencies, and schedule future notifications.
 * @method dispose - Stop the effect: remove subscriptions and run remaining cleanups.
 */
export type Effect = {
    callback: () => void,
    dependencies: Set<SignalEntry>,
    cleanups: Array<() => void>,
    scheduled: boolean,
    run(): void,
    dispose(): void
}

/**
 * @type {SignalBox}
 * @template Type
 * @description A signal entry that is also usable like its underlying primitive/object.
 *
 * ### Interop Notes
 * - `toJSON()` returns the raw value.
 * - `valueOf()` returns the raw value.
 * - `Symbol.toPrimitive(hint)`:
 *    - `"number"` → numeric coercion from the inner value
 *    - `"string"` or `"default"` → string coercion from the inner value
 * - The `value` getter/setter mirrors `get()`/`set()` for ergonomic usage.
 *
 * @example
 * ```ts
 * const count: SignalBox<number> = signal(0);
 *
 * // Read
 * console.log(count.get()); // 0
 * console.log(count.value); // 0
 * console.log(+count); // 0
 *
 * // Write
 * count.set(5);
 * count.value = 6;
 * count.update(v => v + 1); // 7
 *
 * // JSON / string
 * console.log(`${count}`); // "7"
 * console.log(JSON.stringify(count)); // 7
 *
 * // Reactivity
 * const unsub = count.sub(() => console.log("changed to", count.get()));
 * count.set(8); // triggers subscriber
 * unsub();
 * ```
 */
type SignalBox<Type> = Type & SignalEntry<Type> & {
    toJSON(): Type,
    valueOf(): Type,
    value: Type,
    [Symbol.toPrimitive](hint: "default" | "number" | "string"): string | number
};

export {SignalEntry, SignalBox};
export type SignalSubscriber = () => void;
export type Read<Type> = () => Type;
export type Write<Type> = (value: Type) => void;

/**
 * @internal
 */
export type SignalEntry<Type = any> = {
    get(): Type,
    set(value: Type): void,
    update(updater: (previous: Type) => Type): void,
    sub(fn: SignalSubscriber): () => void,
    emit(): void
}

/**
 * @internal
 */
export type Effect = {
    callback: () => void,
    dependencies: Set<SignalEntry>,
    cleanups: Array<() => void>,
    scheduled: boolean,
    run(): void,
    dispose(): void
}

type SignalBox<Value> = Value & {
    get(): Value;
    set(v: Value): void;
    update(fn: (prev: Value) => Value): void;
    sub(fn: SignalSubscriber): () => void;
    toJSON(): Value;
    valueOf(): Value;
    value: Value;
    [Symbol.toPrimitive](hint: "default" | "number" | "string"): string | number;
};

export {SignalBox};
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
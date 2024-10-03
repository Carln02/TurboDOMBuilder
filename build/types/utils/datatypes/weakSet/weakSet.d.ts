declare class TurboWeakSet<Type extends object = object> {
    private readonly _weakRefs;
    constructor();
    add(obj: Type): this;
    has(obj: Type): boolean;
    delete(obj: Type): boolean;
    cleanup(): void;
    toArray(): Type[];
    get size(): number;
    clear(): void;
}
export { TurboWeakSet };

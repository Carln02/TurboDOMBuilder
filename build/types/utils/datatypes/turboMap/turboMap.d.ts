declare class TurboMap<KeyType, ValueType> extends Map<KeyType, ValueType> {
    enforceImmutability: boolean;
    set(key: KeyType, value: ValueType): any;
    get(key: KeyType): ValueType;
    get first(): ValueType | null;
    get last(): ValueType | null;
    keysArray(): KeyType[];
    valuesArray(): ValueType[];
    private copy;
    mapKeys<C>(callback: (key: KeyType, value: ValueType) => C): TurboMap<C, ValueType>;
    mapValues<C>(callback: (key: KeyType, value: ValueType) => C): TurboMap<KeyType, C>;
    filter(callback: (key: KeyType, value: ValueType) => boolean): TurboMap<KeyType, ValueType>;
    merge(map: Map<KeyType, ValueType>): TurboMap<KeyType, ValueType>;
}
export { TurboMap };

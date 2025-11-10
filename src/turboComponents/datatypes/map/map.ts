/**
 * @group Components
 * @category TurboMap
 */
class TurboMap<KeyType, ValueType> extends Map<KeyType, ValueType> {
    public enforceImmutability: boolean = true;

    public set(key: KeyType, value: ValueType): any {
        return super.set(key, this.enforceImmutability ? this.copy(value) : value);
    }

    public get(key: KeyType): ValueType {
        const result = super.get(key);
        return this.enforceImmutability ? this.copy(result) : result;
    }

    public get first(): ValueType | null {
        if (this.size == 0) return null;
        const result = this.values().next().value;
        return this.enforceImmutability ? this.copy(result) : result;
    }

    public get last(): ValueType | null {
        if (this.size == 0) return null;
        const result = this.valuesArray()[this.size - 1];
        return this.enforceImmutability ? this.copy(result) : result;
    }

    public keysArray(): KeyType[] {
        return Array.from(this.keys());
    }

    public valuesArray(): ValueType[] {
        return Array.from(this.values());
    }

    private copy(value: ValueType): ValueType {
        if (value && typeof value == "object") {
            if (value instanceof Array) return value.map(item => this.copy(item)) as any;
            if (value.constructor && value.constructor != Object) {
                if (typeof (value as any).clone == "function") return (value as any).clone();
                if (typeof (value as any).copy == "function") return (value as any).copy();
            }
            return {...value};
        }
        return value;
    }

    public mapKeys<C>(callback: (key: KeyType, value: ValueType) => C): TurboMap<C, ValueType> {
        const newMap = new TurboMap<C, ValueType>();
        for (let [key, value] of this) {
            newMap.set(callback(key, value), value);
        }
        return newMap;
    }

    public mapValues<C>(callback: (key: KeyType, value: ValueType) => C): TurboMap<KeyType, C> {
        const newMap = new TurboMap<KeyType, C>();
        for (let [key, value] of this) {
            newMap.set(key, callback(key, value));
        }
        return newMap;
    }

    public filter(callback: (key: KeyType, value: ValueType) => boolean): TurboMap<KeyType, ValueType> {
        const newMap = new TurboMap<KeyType, ValueType>();
        for (let [key, value] of this) {
            if (callback(key, value)) newMap.set(key, value);
        }
        return newMap;
    }

    public merge(map: Map<KeyType, ValueType>): TurboMap<KeyType, ValueType> {
        for (let [key, value] of map) {
            this.set(key, value);
        }
        return this;
    }
}

export {TurboMap};
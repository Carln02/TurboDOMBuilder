class TurboMap<A, B> extends Map<A, B> {
    public enforceImmutability: boolean = true;

    public set(key: A, value: B): any {
        return super.set(key, this.enforceImmutability ? this.copy(value) : value);
    }

    public get(key: A): B {
        const result = super.get(key);
        return this.enforceImmutability ? this.copy(result) : result;
    }

    public get first(): B | null {
        if (this.size == 0) return null;
        const result = this.values().next().value;
        return this.enforceImmutability ? this.copy(result) : result;
    }

    public get last(): B | null {
        if (this.size == 0) return null;
        const result = this.valuesArray()[this.size - 1];
        return this.enforceImmutability ? this.copy(result) : result;
    }

    public keysArray(): A[] {
        return Array.from(this.keys());
    }

    public valuesArray(): B[] {
        return Array.from(this.values());
    }

    private copy(value: B): B {
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

    public mapKeys<C>(callback: (key: A, value: B) => C): TurboMap<C, B> {
        const newMap = new TurboMap<C, B>();
        for (let [key, value] of this) {
            newMap.set(callback(key, value), value);
        }
        return newMap;
    }

    public mapValues<C>(callback: (key: A, value: B) => C): TurboMap<A, C> {
        const newMap = new TurboMap<A, C>();
        for (let [key, value] of this) {
            newMap.set(key, callback(key, value));
        }
        return newMap;
    }

    public filter(callback: (key: A, value: B) => boolean): TurboMap<A, B> {
        const newMap = new TurboMap<A, B>();
        for (let [key, value] of this) {
            if (callback(key, value)) newMap.set(key, value);
        }
        return newMap;
    }

    public merge(map: Map<A, B>): TurboMap<A, B> {
        for (let [key, value] of map) {
            this.set(key, value);
        }
        return this;
    }
}

export {TurboMap};
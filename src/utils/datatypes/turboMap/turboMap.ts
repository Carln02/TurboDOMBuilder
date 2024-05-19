class TurboMap<A, B> extends Map<A, B> {
    public set(key: A, value: B): any {
        return super.set(key, this.copy(value));
    }

    public get(key: A): B {
        return this.copy(super.get(key));
    }

    public get first(): B | null {
        if (this.size == 0) return null;
        return this.copy(this.values().next().value);
    }

    public get last(): B | null {
        if (this.size == 0) return null;
        return this.valuesArray()[this.size - 1];
    }

    public keysArray(): A[] {
        return Array.from(this.keys());
    }

    public valuesArray(): B[] {
        return Array.from(this.values());
    }

    private copy(value: B): B {
        if (value && typeof value == "object") return {...value};
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
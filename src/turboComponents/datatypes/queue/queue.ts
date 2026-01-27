class TurboQueue<Type = any> {
    private items: Type[] = [];
    private head = 0;

    public push(...values: Type[]): this {
        values.forEach(value => this.items.push(value));
        return this;
    }

    public addOnTop(...values: Type[]): this {
        this.items = [...values, ...this.items];
        return this;
    }

    public pop(): Type | undefined {
        if (this.head >= this.items.length) return undefined;

        const value = this.items[this.head];
        this.items[this.head] = undefined;
        this.head++;

        if (this.head > 1024 && this.head * 2 > this.items.length) {
            this.items = this.items.slice(this.head);
            this.head = 0;
        }

        return value;
    }

    public peek(): Type {
        return this.head < this.items.length ? this.items[this.head] : undefined;
    }

    public has(value: Type): boolean {
        return this.items.includes(value);
    }

    public get size(): number {
        return this.items.length - this.head;
    }

    public get isEmpty(): boolean {
        return this.size === 0;
    }

    public removeDuplicates(entry?: Type): this {
        const uniques = new Set();
        const toDelete = [];
        for (let i = 0; i < this.items.length; i++) {
            if (entry && this.items[i] !== entry) continue;
            if (!uniques.has(this.items[i])) uniques.add(this.items[i]);
            else toDelete.push(i);
        }

        for (let i = toDelete.length - 1; i >= 0; i--) this.items.splice(i, 1);
        return this;
    }

    public clear(): this {
        this.items = [];
        this.head = 0;
        return this;
    }

    public toArray(): Type[] {
        const arr = [];
        for (let i = this.head; i < this.items.length; i += 1) arr.push(this.items[i]);
        return arr;
    }

    public clone(): TurboQueue<Type> {
        const queue = new TurboQueue();
        for (let i = this.head; i < this.items.length; i += 1) queue.push(this.items[i]);
        return queue;
    }

    public remove(value: Type): boolean {
        for (let i = this.head; i < this.items.length; i += 1) {
            if (this.items[i] !== value) continue;
            this.items.splice(i, 1);
            return true;
        }
        return false;
    }
}

export {TurboQueue};
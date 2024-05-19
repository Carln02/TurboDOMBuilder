class Delegate<T extends (...args: any[]) => any> {
    private callbacks: Set<T> = new Set();

    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    public add(callback: T) {
        this.callbacks.add(callback);
    }

    /**
     * @description Removes a callback from the list.
     * @param callback - The callback function to remove.
     * @returns A boolean indicating whether the callback was found and removed.
     */
    public remove(callback: T): boolean {
        return this.callbacks.delete(callback);
    }

    /**
     * @description Invokes all callbacks with the provided arguments.
     * @param args - The arguments to pass to the callbacks.
     */
    public fire(...args: Parameters<T>) {
        for (const callback of this.callbacks) {
            try {
                callback(...args);
            } catch (error) {
                console.error("Error invoking callback:", error);
            }
        }
    }

    /**
     * @description Clears added callbacks
     */
    public clear() {
        this.callbacks.clear();
    }
}

export {Delegate};
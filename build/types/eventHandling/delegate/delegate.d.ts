declare class Delegate<CallbackType extends (...args: any[]) => any> {
    private callbacks;
    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    add(callback: CallbackType): void;
    /**
     * @description Removes a callback from the list.
     * @param callback - The callback function to remove.
     * @returns A boolean indicating whether the callback was found and removed.
     */
    remove(callback: CallbackType): boolean;
    /**
     * @description Invokes all callbacks with the provided arguments.
     * @param args - The arguments to pass to the callbacks.
     */
    fire(...args: Parameters<CallbackType>): void;
    /**
     * @description Clears added callbacks
     */
    clear(): void;
}
export { Delegate };

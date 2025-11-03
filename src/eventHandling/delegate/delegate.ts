import {isUndefined} from "../../utils/dataManipulation/misc";

/**
 * @class Delegate
 * @template {(...args: any[]) => any} CallbackType - The type of callbacks accepted by the delegate.
 * @description Class representing a set of callbacks that can be maintained and executed together.
 */
class SimpleDelegate<CallbackType extends (...args: any[]) => any> {
    private callbacks: Set<CallbackType> = new Set();

    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    public add(callback: CallbackType) {
        this.callbacks.add(callback);
    }

    /**
     * @description Removes a callback from the list.
     * @param callback - The callback function to remove.
     * @returns A boolean indicating whether the callback was found and removed.
     */
    public remove(callback: CallbackType): boolean {
        return this.callbacks.delete(callback);
    }

    /**
     * @description Checks whether a callback is in the list.
     * @param callback - The callback function to check for.
     * @returns A boolean indicating whether the callback was found.
     */
    public has(callback: CallbackType): boolean {
        return this.callbacks.has(callback);
    }

    /**
     * @description Invokes all callbacks with the provided arguments.
     * @param args - The arguments to pass to the callbacks.
     */
    public fire(...args: Parameters<CallbackType>): ReturnType<CallbackType> {
        let returnValue: ReturnType<CallbackType>;
        for (const callback of this.callbacks) {
            try {
                const value = callback(...args);
                if (!isUndefined(value)) returnValue = value;
            } catch (error) {
                console.error("Error invoking callback:", error);
            }
        }
        return returnValue;
    }

    /**
     * @description Clears added callbacks
     */
    public clear() {
        this.callbacks.clear();
    }
}

/**
 * @class Delegate
 * @template {(...args: any[]) => any} CallbackType - The type of callbacks accepted by the delegate.
 * @description Class representing a set of callbacks that can be maintained and executed together.
 */
class Delegate<CallbackType extends (...args: any[]) => any> extends SimpleDelegate<CallbackType> {
    /**
     * @description Delegate fired when a callback is added.
     */
    public onAdded: SimpleDelegate<(callback: CallbackType) => void> = new SimpleDelegate();

    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    public add(callback: CallbackType) {
        super.add(callback);
        this.onAdded.fire(callback);
    }
}

export {Delegate};
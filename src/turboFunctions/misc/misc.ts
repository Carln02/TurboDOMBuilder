import {TurboSelector} from "../turboSelector";

function setupMiscFunctions() {
    /**
     * @description Execute a callback on the node while still benefiting from chaining.
     * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.execute = function _execute
    (this: TurboSelector, callback: (el: TurboSelector) => void): TurboSelector {
        callback(this);
        return this;
    };
}

export {setupMiscFunctions};
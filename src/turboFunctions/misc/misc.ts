import {TurboSelector} from "../turboSelector";
import {isUndefined} from "../../utils/dataManipulation/misc";
import {ApplyDefaultsMergeProperties, ApplyDefaultsOptions} from "./misc.types";

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

    TurboSelector.prototype.applyDefaults = function applyDefaults(
        this: TurboSelector,
        defaults: Record<string, any>,
        options: ApplyDefaultsOptions = {}
    ): TurboSelector {
        if (!this.element || typeof this.element !== "object") return this;
        const {
            mergeProperties = ApplyDefaultsMergeProperties,
            removeDuplicates = true
        } = options;

        for (const [key, value] of Object.entries(defaults)) {
            const isMergeKey = mergeProperties?.includes(key as any);

            if (isMergeKey) {
                const defaultArray = Array.isArray(value) ? value : [value];
                const currentArray = isUndefined(this.element[key]) ? []
                    : Array.isArray(this.element[key]) ? this.element[key].slice()
                        : [this.element[key]];

                let merged = currentArray.concat(defaultArray);
                if (removeDuplicates) merged = Array.from(new Set(merged));
                this.element[key] = merged;
            } else if (isUndefined(this.element[key])) {
                this.element[key] = value;
            }
        }

        return this;
    };
}

export {setupMiscFunctions};
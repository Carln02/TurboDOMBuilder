import {TurboSelector} from "../turboSelector";
import {isUndefined} from "../../utils/dataManipulation/misc";
import {ApplyDefaultsMergeProperties, ApplyDefaultsOptions} from "./misc.types";

export function setupMiscFunctions() {
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

    TurboSelector.prototype.apply = function apply(
        this: TurboSelector,
        properties: Record<string, any>
    ): TurboSelector {
        if (!this.element || typeof this.element !== "object") return this;
        if (!properties || typeof properties !== "object") return this;
        for (const [key, value] of Object.entries(properties)) {
            try { this.element[key] = value; } catch {}
        }
        return this;
    };

    TurboSelector.prototype.removeFields = function removeFields(
        this: TurboSelector,
        keys: string[]
    ): TurboSelector {
        if (!this.element || typeof this.element !== "object") return this;
        if (!keys || !Array.isArray(keys)) return this;
        for (const key of keys) {
            try { delete this.element[key]; } catch {
                try { delete this.element[key]; } catch {}
            }
        }
        return this;
    };

    TurboSelector.prototype.getDefaults = function getDefaults(
        this: TurboSelector,
        defaults: string[]
    ): Record<string, any> {
        if (!this.element || typeof this.element !== "object") return {};
        if (!defaults || typeof defaults !== "object") return {};
        const result: Record<string, any> = {};
        for (const key of defaults) {
            if (!isUndefined(this.element[key])) result[key] = this.element[key];
        }
        return result;
    };

    TurboSelector.prototype.getIntersection = function getIntersection(
        this: TurboSelector,
        other: Record<string, any>
    ): Record<string, any> {
        if (!this.element || typeof this.element !== "object") return {};
        if (!other || typeof other !== "object") return {};
        const result: Record<string, any> = {};
        for (const key of Object.keys(other)) {
            if (!isUndefined(this.element[key])) result[key] = this.element[key];
        }
        return result;
    };

    TurboSelector.prototype.getDifference = function getDifference(
        this: TurboSelector,
        other: Record<string, any>
    ): Record<string, any> {
        if (!this.element || typeof this.element !== "object") return {};
        if (!other || typeof other !== "object") return {};
        const result: Record<string, any> = {};
        for (const key of Object.keys(this.element)) {
            if (isUndefined(other[key])) result[key] = this.element[key];
        }
        return result;
    };

    TurboSelector.prototype.extract = function extract(
        this: TurboSelector,
        keys: string[]
    ): Record<string, any> {
        if (!this.element || typeof this.element !== "object") return {};
        if (!keys || !Array.isArray(keys)) return {};
        const result: Record<string, any> = {};
        for (const key of keys) {
            if (isUndefined(this.element[key])) continue;
            result[key] = this.element[key];
            delete this.element[key];
        }
        return result;
    };

    TurboSelector.prototype.applyDefaults = function applyDefaults(
        this: TurboSelector,
        defaults: Record<string, any>,
        options: ApplyDefaultsOptions = {}
    ): TurboSelector {
        if (!this.element || typeof this.element !== "object") return this;
        if (!defaults || typeof defaults !== "object") return this;

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
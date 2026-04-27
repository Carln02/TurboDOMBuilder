/**
 * @constant
 * @group Types
 * @category Misc
 * @description Default array-like keys to merge when applying defaults with {@link TurboSelector.applyDefaults}.
 */
const ApplyDefaultsMergeProperties = ["interactors", "tools", "enforcers", "operators", "handlers"] as const;

/**
 * @type {ApplyDefaultsOptions}
 * @group Types
 * @category Misc
 *
 * @description Options for {@link TurboSelector.applyDefaults}.
 * @property {string[]} [mergeProperties] - Array-like keys to merge. Defaults to {@link ApplyDefaultsMergeProperties}.
 * @property {boolean} [removeDuplicates] - Whether to remove duplicates when merging arrays. Defaults to `true`.
 */
type ApplyDefaultsOptions = {
    mergeProperties?: string[],
    removeDuplicates?: boolean
};

declare module "../turboSelector" {
    interface TurboSelector {
        /**
         * @description Execute a callback on the node while still benefiting from chaining.
         * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance
         * itself.
         * @returns {this} Itself, allowing for method chaining.
         */
        execute(callback: ((el: this) => void)): this;

        apply(properties: Partial<this["element"]> & Record<string, any>): this;

        removeFields(keys: (keyof this["element"] | string)[]): this;

        getDefaults(defaults: (keyof this["element"] | string)[]): Partial<this["element"]> & Record<string, any>;

        getIntersection(other: Partial<this["element"]> & Record<string, any>): Partial<this["element"]> & Record<string, any>;

        getDifference(other: Partial<this["element"]> & Record<string, any>): Partial<this["element"]> & Record<string, any>;

        extract(keys: (keyof this["element"] | string)[]): Partial<this["element"]> & Record<string, any>;

        /**
         * @function applyDefaults
         * @description Apply default properties to the underlying object, with optional smart merging for
         * array-like keys. By default, merging will happen on all MVC properties that accept arrays (like
         * `operators`, `handlers`, `tools`, etc.) to allow for concatenation of such MVC pieces.
         *
         * @param {Record<string, any>} defaults - Key/value map of defaults to apply on the object.
         * @param {ApplyDefaultsOptions} [options] - Optional configuration for merging keys.
         * @returns {this} The same selector instance for chaining.
         *
         * @example
         * ```ts
         * const properties = {...};
         * turbo(properties).applyDefaults({
         *   tag: "my-el",
         *   view: MyElementView,
         *   tools: [selectTool, panTool],
         *   operators: KeyboardOperator
         * });
         * ```
         */
        applyDefaults(defaults: Partial<this["element"]> & Record<string, any>, options?: ApplyDefaultsOptions): this;
    }
}

export {ApplyDefaultsOptions, ApplyDefaultsMergeProperties};
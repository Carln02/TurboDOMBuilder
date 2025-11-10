/**
 * @type DefineOptions
 * @group Decorators
 * @category Attributes & DOM
 *
 * @description Options object type for the `@define` decorator.
 * @property {boolean} [injectAttributeBridge] - If true, injects an `attributeChangedCallback` into the
 * class (if it's missing). It defaults to `true`.
 */
type DefineOptions = {
    injectAttributeBridge?: boolean;
};

export {DefineOptions};
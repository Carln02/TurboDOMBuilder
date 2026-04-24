/**
 * @type {DefineOptions}
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Options object for the {@link define} decorator and imperative function.
 * @property {boolean} [injectAttributeBridge=true] - Whether to inject an `attributeChangedCallback`
 * into the class prototype if one is not already present. When enabled, HTML attribute changes are
 * automatically mirrored to their associated `@observe`-decorated fields, and vice versa.
 */
type DefineOptions = {
    injectAttributeBridge?: boolean;
};

/**
 * @enum {string} RegistryCategory
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Categorizes registered classes by their base type in the TurboDom registry.
 * Categories are ordered from most to least specific within each group, which determines
 * how {@link inferCategory} resolves ambiguous inheritance chains.
 *
 * **TurboDom elements** (most to least specific):
 * - `TurboProxiedElement`, `TurboElement`, `TurboBaseElement`, `TurboHeadlessElement`
 *
 * **Native DOM elements** (most to least specific):
 * - `SVGElement`, `MathMLElement`, `HTMLElement`, `Element`, `Node`
 *
 * **MVC pieces:**
 * - `TurboController`, `TurboHandler`, `TurboInteractor`, `TurboTool`, `TurboSubstrate`,
 *   `TurboView`, `TurboEmitter`, `TurboModel`
 *
 * **Fallback:**
 * - `Other` — for classes that do not match any recognized base type.
 */
enum RegistryCategory {
    TurboElement = "TurboElement",
    TurboBaseElement = "TurboBaseElement",
    TurboHeadlessElement = "TurboHeadlessElement",
    TurboProxiedElement = "TurboProxiedElement",

    HTMLElement = "HTMLElement",
    SVGElement = "SVGElement",
    MathMLElement = "MathMLElement",
    Element = "Element",
    Node = "Node",

    TurboModel = "TurboModel",
    TurboView = "TurboView",
    TurboEmitter = "TurboEmitter",
    TurboController = "TurboController",
    TurboHandler = "TurboHandler",
    TurboInteractor = "TurboInteractor",
    TurboTool = "TurboTool",
    TurboSubstrate = "TurboSubstrate",

    Other = "Other",
}

/**
 * @type {RegistryEntry}
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Represents a single entry in the TurboDom class registry, as stored and returned
 * by {@link findRegistered} and related query functions.
 * @property {new (...args: any[]) => any} constructor - The registered class constructor.
 * @property {RegistryCategory} category - The category the class was registered under,
 * either explicitly provided or inferred from its inheritance chain.
 * @property {string} name - The registered name of the class, used as the registry key.
 * Typically the class name as passed to {@link define}.
 * @property {string} [tag] - The custom element tag name associated with this class.
 * Only present for classes registered as custom HTML elements via {@link define}.
 */
type RegistryEntry = {
    constructor: new (...args: any[]) => any;
    category: RegistryCategory | string;
    tag?: string;
    name: string;
};

export {DefineOptions, RegistryEntry, RegistryCategory};
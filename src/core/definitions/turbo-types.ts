import {TurboWrapper} from "../turbo-wrapper";

type HTMLElementNonFunctions<K extends Element = HTMLElement> = {
    [T in keyof K]: K[T] extends Function ? never : T;
}[keyof K];

type HTMLElementMutableFields<K extends Element = HTMLElement> =
    Omit<Partial<Pick<K, HTMLElementNonFunctions<K>>>, "children" | "className" | "style">;

/**
 * @type {TurboCompatible}
 * @description All types that are compatible with Turbo functions (any element and TurboWrappers).
 */
type TurboCompatible = Element | TurboWrapper;

/**
 * @type {ChildHandler}
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
 */
type ChildHandler = Element | ShadowRoot;

/**
 * @type {StylesRoot}
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */
type StylesRoot = ShadowRoot | HTMLHeadElement;

/**
 * @type {ElementTagMap}
 * @description A type that represents a union of HTML, SVG, and MathML tag name maps.
 */
type ElementTagMap = HTMLElementTagNameMap & SVGElementTagNameMap & MathMLElementTagNameMap;

/**
 * @type {ElementTagDefinition}
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {ElementTagMap} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svg" or "mathML" is provided,
 * the corresponding namespace will be used to create the element. Otherwise, the custom namespace provided will be used.
 */
type ElementTagDefinition<T extends keyof ElementTagMap = "div"> = {
    tag?: T;
    namespace?: string;
};

/**
 * @type {TurboProperties}
 * @description Object containing properties for configuring a TurboWrapper, a TurboElement, or any Element. A tag (and
 * possibly a namespace) can be provided for TurboWrappers or for element creation. TurboElements will ignore these
 * properties if set.
 * Any HTML attribute can be passed as key to be processed by the class/function. A few of these attributes were
 * explicitly defined here for autocompletion in JavaScript. Use TypeScript for optimal autocompletion (with the target
 * generic type, if needed). The type also has the following described custom properties:
 *
 * @property {string} [id] - The ID of the element.
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of
 * space-separated classes or an array of class names).
 * @property {string} [style] - The inline style of the element. Use the css literal function for autocompletion.
 * @property {string} [stylesheet] - The associated stylesheet (if any) with the element. Declaring this property will
 * generate automatically a new style element in the element's corresponding root. Use the css literal function
 * for autocompletion.
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: TurboCompatible) => void)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {TurboCompatible | TurboCompatible[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {TurboCompatible} [parent] - The parent element or wrapper to which the created element will be appended.
 * @property {string} [text] - The text content of the element (if any).
 * @property {boolean} [shadowDOM] - If true, indicate that the element or wrapper will be created under a shadow root.
 *
 * @property alt
 * @property src
 * @property href
 * @property target
 * @property action
 * @property method
 * @property type
 * @property value
 * @property placeholder
 * @property name
 * @property disabled
 * @property checked
 * @property selected
 */
type TurboProperties<T extends keyof ElementTagMap = "div"> =
    HTMLElementMutableFields<ElementTagMap[T]>
    & ElementTagDefinition<T>
    & {
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    listeners?: Record<string, EventListenerOrEventListenerObject | ((e: Event, el: TurboCompatible) => void)>
    children?: TurboCompatible | TurboCompatible[];
    parent?: TurboCompatible;
    text?: string;
    shadowDOM?: boolean;
    [key: string]: any;
};

export {TurboCompatible, ChildHandler, StylesRoot, ElementTagMap, TurboProperties};
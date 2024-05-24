type HTMLElementNonFunctions<T extends keyof ElementTagMap = "div"> = {
    [K in keyof ElementTagMap[T]]: ElementTagMap[T][K] extends Function ? never : K;
}[keyof ElementTagMap[T]];

type HTMLElementMutableFields<T extends keyof ElementTagMap = "div"> =
    Omit<Partial<Pick<ElementTagMap[T], HTMLElementNonFunctions<T>>>, "children" | "className" | "style">;

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
type ElementTagMap = HTMLElementTagNameMap & Omit<SVGElementTagNameMap, "style"> & MathMLElementTagNameMap;

/**
 * @type {ElementTagDefinition}
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {ElementTagMap} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML" is provided,
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
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: Element) => void)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {Element | Element[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {Element} [parent] - The parent element or wrapper to which the created element will be appended.
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
    HTMLElementMutableFields<T> & ElementTagDefinition<T> & {
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    listeners?: Record<string, EventListenerOrEventListenerObject | ((e: Event, el: Element) => void)>
    children?: Element | Element[];
    parent?: Element;
    text?: string;
    shadowDOM?: boolean;
    [key: string]: any;
};

export {ChildHandler, StylesRoot, ElementTagMap, TurboProperties};
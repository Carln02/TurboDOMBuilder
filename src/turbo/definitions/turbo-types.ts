import {TurboWrapper} from "../elements/turbo-wrapper";

/**
 * @type {TurboCompatible}
 * @description A type that encapsulates both HTML elements (and thus TurboElements), and TurboWrappers.
 */
type TurboCompatible = (TurboWrapper | HTMLElement);

/**
 * @type {TurboProperties}
 * @description Object containing properties for configuring a TurboWrapper or a TurboElement. Any HTML attribute can
 * be passed as key to be processed by the class/function. A few of these attributes were explicitly defined here
 * for autocompletion in JavaScript. Use TypeScript for optimal autocompletion (with the target generic type, if
 * needed). The type also has the following described custom properties:
 *
 * @property {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap} [tag="div"] -
 * For TurboWrapper only. The HTML tag of the element (e.g., "div", "span", "input").
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
 * @property {boolean} [useProxy] - For TurboWrapper only. A boolean that indicates whether to use a proxy for
 * TurboWrappers or not. If set to true, every function called from the TurboWrapper instance will return a proxy
 * which, if trying to access a property or function non-existent on TurboWrapper, will try to delegate it to the
 * underlying HTML element. This proxy might lead to a small additional performance overhead.
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
type TurboProperties<K extends HTMLElement = HTMLElement> =
    Omit<Partial<Pick<K, keyof K>>, "children" | "className" | "style"> & {
    tag?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap;
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    listeners?: Record<string, EventListenerOrEventListenerObject | ((e: Event, el: TurboCompatible) => void)>
    children?: TurboCompatible | TurboCompatible[];
    parent?: TurboCompatible;
    text?: string;
    shadowDOM?: boolean;
    useProxy?: boolean;
    [key: string]: any;
};

export {TurboCompatible, TurboProperties};
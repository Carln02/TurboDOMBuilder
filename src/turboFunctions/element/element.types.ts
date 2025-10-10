import {ValidElement, ValidTag} from "../../core.types";
import {MvcGenerationProperties} from "../../mvc/mvc.types";

/**
 * @description Ensures that non-function properties of an element are selected.
 */
type HTMLElementNonFunctions<Tag extends ValidTag = ValidTag> = {
    [ElementField in keyof ValidElement<Tag>]: ValidElement<Tag>[ElementField] extends Function ? never : ElementField;
}[keyof ValidElement<Tag>];

/**
 * @description Represents mutable fields of an HTML element, excluding specific fields.
 */
type HTMLElementMutableFields<Tag extends ValidTag = ValidTag> =
    Omit<Partial<Pick<ValidElement<Tag>, HTMLElementNonFunctions<Tag>>>, "children" | "className" | "style">

/**
 * @type {ElementTagDefinition}
 * @template {ValidTag} Tag
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {Tag} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML" is provided,
 * the corresponding namespace will be used to create the element. Otherwise, the custom namespace provided will be used.
 */
type ElementTagDefinition = {
    tag?: string;
    namespace?: string;
};

/**
 * @type {TurboProperties}
 * @template {ValidTag} Tag - The HTML (or other) tag of the element, if passing it as a property. Defaults to "div".
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 *
 * @description Object containing properties for configuring a TurboElement, or any Element. A tag (and
 * possibly a namespace) can be provided for TurboProxiedElements for element creation. TurboElements will ignore these
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
 * @property {Element} [parent] - The parent element to which the created element will be appended.
 * @property {string | Element} [out] - If defined, declares (or sets) the element in the parent as a field with the given value
 * as name.
 * @property {string} [text] - The text content of the element (if any).
 * @property {boolean} [shadowDOM] - If true, indicate that the element will be created under a shadow root.
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
type TurboProperties<
    Tag extends ValidTag = "div",
> = HTMLElementMutableFields<Tag> & ElementTagDefinition & {
    id?: string;
    classes?: string | string[];

    style?: string;
    stylesheet?: string;
    shadowDOM?: boolean;

    parent?: Element;
    children?: Element | Element[];
    text?: string;

    listeners?: Record<string, ((e: Event, el: ValidElement<Tag>) => void)>,

    out?: string | Node;
    [key: string]: any;
};

declare module "../turboSelector" {
    interface TurboSelector {
        /**
         * Sets the declared properties to the element.
         * @param {TurboProperties<Tag>} properties - The properties object.
         * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
         * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
         * @returns {this} Itself, allowing for method chaining.
         * @template Tag
         */
        setProperties<Tag extends ValidTag>(properties: TurboProperties<Tag>, setOnlyBaseProperties?: boolean): this;

        setMvc(properties: MvcGenerationProperties): this;

        /**
         * @description Destroys the node by removing it from the document and removing all its bound listeners.
         * @returns {this} Itself, allowing for method chaining.
         */
        destroy(): this;

        /**
         * @description Sets the value of an attribute on the underlying element.
         * @param {string} name The name of the attribute.
         * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent
         * a true boolean.
         * @returns {this} Itself, allowing for method chaining.
         */
        setAttribute(name: string, value?: string | number | boolean): this;

        /**
         * @description Removes an attribute from the underlying element.
         * @param {string} name The name of the attribute to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAttribute(name: string): this;

        /**
         * @description Causes the element to lose focus.
         * @returns {this} Itself, allowing for method chaining.
         */
        blur(): this;

        /**
         * @description Sets focus on the element.
         * @returns {this} Itself, allowing for method chaining.
         */
        focus(): this;
    }
}

export {TurboProperties};
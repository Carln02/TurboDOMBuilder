import {ValidElement, ValidTag} from "../../core.types";
import {MvcGenerationProperties} from "../../mvc/mvc.types";
import {Mvc} from "../../mvc/mvc";

/**
 * @description Type of non-function properties of an element.
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
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {string} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML"
 * is provided, the corresponding namespace will be used to create the element. Otherwise, the custom namespace
 * provided will be used.
 */
type ElementTagDefinition = {
    tag?: string;
    namespace?: string;
};

/**
 * @type {TurboProperties}
 * @template {ValidTag} Tag - The HTML (or other) tag of the element, if passing it as a property. Defaults to "div".
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Object containing properties for configuring an Element. A tag (and
 * possibly a namespace) can be provided for element creation. Already-created elements will ignore these
 * properties if set.
 * Any HTML attribute can be passed as key to be processed by the class/function. The type has the following
 * described custom properties:
 *
 * @property {string} [id] - The ID of the element.
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of
 * space-separated classes or an array of class names).
 * @property {string} [style] - The inline style of the element. Use the css literal function for autocompletion.
 * @property {string} [stylesheet] - The associated stylesheet (if any) with the element. Declaring this property will
 * generate automatically a new style element in the element's corresponding root. Use the css literal function
 * for autocompletion.
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: Element) => boolean)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {(e: Event, el: Element) => boolean} [onClick] - Click event listener.
 * @property {(e: Event, el: Element) => boolean} [onDrag] - Drag event listener.
 * @property {Element | Element[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {Element} [parent] - The parent element to which the created element will be appended.
 * @property {string | Element} [out] - If defined, declares (or sets) the element in the parent as a field with the
 * given value as key.
 * @property {string} [text] - The text content of the element (if any).
 * @property {boolean} [shadowDOM] - If true, indicate that the element will be created under a shadow root.
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

    listeners?: Record<string, ((e: Event, el: ValidElement<Tag>) => boolean)>,
    onClick?: (e: Event, el: ValidElement<Tag>) => boolean,
    onDrag?: (e: Event, el: ValidElement<Tag>) => boolean,

    out?: string | Node;
    [key: string]: any;
};

declare module "../turboSelector" {
    interface TurboSelector {
        /**
         * @function setProperties
         * @template {ValidTag} Tag - The HTML tag of the element (for accurate autocompletion of available properties).
         * @description Sets the declared properties to the element (if possible).
         * @param {TurboProperties<Tag>} properties - The properties object.
         * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
         * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
         * @returns {this} Itself, allowing for method chaining.
         */
        setProperties<Tag extends ValidTag>(properties: TurboProperties<Tag>, setOnlyBaseProperties?: boolean): this;

        /**
         * @function setMvc
         * @description Sets MVC properties for a certain object. If no `mvc` field exists on the object, a new
         * {@link Mvc} object will be created with the given properties.
         * @param {MvcGenerationProperties} properties - The properties to configure the MVC structure.
         * @return {Mvc} - The created or retrieved {@link Mvc} object.
         */
        setMvc(properties: MvcGenerationProperties): Mvc;

        /**
         * @description Destroys the element by removing it from the document and removing all its bound listeners.
         * @returns {this} Itself, allowing for method chaining.
         */
        destroy(): this;

        /**
         * @description Sets the value of an attribute on the element.
         * @param {string} name The name of the attribute.
         * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent
         * a true boolean.
         * @returns {this} Itself, allowing for method chaining.
         */
        setAttribute(name: string, value?: string | number | boolean): this;

        /**
         * @description Removes an attribute from the element.
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
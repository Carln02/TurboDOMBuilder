import {ValidElement, ValidTag} from "../core.types";
import {TurboView} from "../mvc/turboView";
import {TurboModel} from "../mvc/turboModel";
import {MvcHandlerProperties} from "../mvc/mvc.types";
import {TurboEmitter} from "../mvc/turboEmitter";

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
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {Tag} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML" is provided,
 * the corresponding namespace will be used to create the element. Otherwise, the custom namespace provided will be used.
 * @template {ValidTag} Tag
 */
type ElementTagDefinition<Tag extends ValidTag> = {
    tag?: Tag;
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
 * @property {string | Element} [out] - If defined, declares (or sets) the element in the parent as a field with the given value
 * as name.
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
type TurboProperties<
    Tag extends ValidTag = "div",
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = HTMLElementMutableFields<Tag> & ElementTagDefinition<Tag>
    & Omit<MvcHandlerProperties<object, ViewType, DataType, ModelType, EmitterType>, "element">
    & {
    id?: string;
    classes?: string | string[];

    style?: string;
    stylesheet?: string;
    shadowDOM?: boolean;

    parent?: Element;
    children?: Element | Element[];
    text?: string;

    listeners?: Record<string, EventListenerOrEventListenerObject | ((e: Event, el: ValidElement<Tag>) => void)>

    out?: string | Element;
    [key: string]: any;
};

type TurboCustomProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboProperties<"div", ViewType, DataType, ModelType, EmitterType>;

export {TurboProperties, TurboCustomProperties};
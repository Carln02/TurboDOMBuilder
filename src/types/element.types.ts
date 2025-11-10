import {SVGTag, SVGTagMap, ValidSVGElement} from "./svgElement.types";
import {HTMLTag, ValidHTMLElement} from "./htmlElement.types";
import {MathMLTag, ValidMathMLElement} from "./mathMlElement.types";

/**
 * @group Types
 * @category Element
 * @description A type that represents a union of HTML, SVG, and MathML tag name maps.`
 */
type ElementTagMap = HTMLElementTagNameMap & SVGTagMap & MathMLElementTagNameMap & TurboElementTagNameMap;

/**
 * @group Types
 * @category Element
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type ValidTag<Tag extends keyof ElementTagMap = keyof ElementTagMap> = Tag;

/**
 * @group Types
 * @category Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidElement<Tag extends ValidTag = ValidTag> = Tag extends HTMLTag ? ValidHTMLElement<Tag>
    : (Tag extends SVGTag ? ValidSVGElement<Tag>
        : (Tag extends MathMLTag ? ValidMathMLElement<Tag>
            : (ElementTagMap[Tag] extends Element ? ElementTagMap[Tag]
                : Element)));

/**
 * @group Types
 * @category Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidNode<Tag = ValidTag> = Tag extends ValidTag ? ValidElement<Tag> : Node;

/**
 * @group Types
 * @category Element
 * @description Type of non-function properties of an element.
 */
type HTMLElementNonFunctions<Tag extends ValidTag = ValidTag> = {
    [ElementField in keyof ValidElement<Tag>]: ValidElement<Tag>[ElementField] extends Function ? never : ElementField;
}[keyof ValidElement<Tag>];

/**
 * @group Types
 * @category Element
 * @description Represents mutable fields of an HTML element, excluding specific fields.
 */
type HTMLElementMutableFields<Tag extends ValidTag = ValidTag> =
    Omit<Partial<Pick<ValidElement<Tag>, HTMLElementNonFunctions<Tag>>>, "children" | "className" | "style">

/**
 * @type {ElementTagDefinition}
 * @group Types
 * @category Element
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

export interface TurboElementTagNameMap {
}

declare global {
    //Document interfaces
    interface Document extends Node {}
    interface DocumentFragment extends Node {}
    interface HTMLDocument extends Document {}
    interface XMLDocument extends Document {}

    //CharacterData interfaces
    interface CharacterData extends Node {}
    interface Text extends CharacterData {}
    interface Comment extends CharacterData {}
    interface CDATASection extends CharacterData {}

    //Element interfaces
    interface Element extends Node {}
    interface ShadowRoot extends Element {}

    //Other interfaces
    interface ChildNode extends Node {}
    interface ParentNode extends Node {}
    interface ProcessingInstruction extends Node {}
    interface DocumentType extends Node {}

    //Deprecated interfaces
    interface EntityReference extends Node {}
    interface Entity extends Node {}
    interface Notation extends Node {}
}

export {ElementTagMap, ValidTag, ValidElement, ValidNode, HTMLElementNonFunctions, HTMLElementMutableFields, ElementTagDefinition};
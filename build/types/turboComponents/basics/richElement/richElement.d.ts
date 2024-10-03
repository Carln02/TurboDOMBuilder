import { TurboIcon } from "../icon/icon";
import { TurboElement } from "../../../domBuilding/turboElement/turboElement";
import { ValidElement, ValidTag } from "../../../domBuilding/core.types";
import { TurboRichElementConfig, TurboRichElementProperties } from "./richElement.types";
import { TurboProperties } from "../../../domBuilding/turboElement/turboElement.types";
/**
 * Button class for creating Turbo button elements.
 * @class TurboRichElement
 * @extends TurboElement
 */
declare class TurboRichElement<ElementTag extends ValidTag = "h4"> extends TurboElement {
    /**
     * @description Object containing the children of the button.
     */
    private readonly elements;
    static readonly config: TurboRichElementConfig;
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboRichElementProperties<ElementTag>);
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {Element | Element[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition;
    /**
     * @description The tag of the text element in the button
     */
    set elementTag(value: ElementTag);
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements(): Element | Element[];
    set leftCustomElements(value: Element | Element[]);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): TurboIcon;
    set leftIcon(value: string | TurboIcon);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get prefixEntry(): HTMLElement;
    set prefixEntry(value: string | HTMLElement);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get element(): ValidElement<ElementTag>;
    set element(value: string | TurboProperties<ElementTag> | ValidElement<ElementTag>);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get text(): string;
    set text(value: string);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get suffixEntry(): HTMLElement;
    set suffixEntry(value: string | HTMLElement);
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): TurboIcon;
    set rightIcon(value: string | TurboIcon);
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements(): Element | Element[];
    set rightCustomElements(value: Element | Element[]);
}
declare function richElement<ElementTag extends ValidTag = "h4">(properties: TurboRichElementProperties<ElementTag>): TurboRichElement<ElementTag>;
export { TurboRichElement, richElement };

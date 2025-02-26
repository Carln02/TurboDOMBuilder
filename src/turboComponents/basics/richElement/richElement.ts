import {TurboIcon} from "../icon/icon";
import {element} from "../../../domBuilding/elementCreation/element";
import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {define} from "../../../domBuilding/decorators/define";
import {ValidElement, ValidTag} from "../../../domBuilding/core.types";
import {TurboRichElementChildren, TurboRichElementConfig, TurboRichElementProperties} from "./richElement.types";
import {auto} from "../../../domBuilding/decorators/auto/auto";
import {TurboProperties} from "../../../domBuilding/turboElement/turboElement.types";
import {TurboView} from "../../../domBuilding/turboElement/turboView";
import {TurboModel} from "../../../domBuilding/turboElement/turboModel";

/**
 * Class for creating a rich turbo element (an element that is possibly accompanied by icons (or other elements) on
 * its left and/or right).
 * @class TurboRichElement
 * @extends TurboElement
 * @template {ValidTag} ElementTag - The tag of the main element to create the rich element from.
 */
@define("turbo-rich-element")
class TurboRichElement<
    ElementTag extends ValidTag = any,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboElement<ViewType, DataType, ModelType> {
    /**
     * @description Object containing the children of the rich element.
     */
    private readonly elements: TurboRichElementChildren<ElementTag>;

    public static readonly config: TurboRichElementConfig = {...TurboElement.config, defaultElementTag: "h4"};

    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType>) {
        if (properties.text && !properties.element) properties.element = properties.text;
        super({...properties, text: null});

        if (!properties.unsetDefaultClasses) this.addClass((this.constructor as typeof TurboElement).config.defaultClasses);
        this.elementTag = properties.elementTag;

        this.elements = {
            leftCustomElements: null,
            leftIcon: null,
            prefixEntry: null,
            element: null,
            suffixEntry: null,
            rightIcon: null,
            rightCustomElements: null,
        };

        this.leftCustomElements = properties.leftCustomElements;
        this.leftIcon = properties.leftIcon;
        this.prefixEntry = properties.prefixEntry;
        this.element = properties.element;
        this.suffixEntry = properties.suffixEntry;
        this.rightIcon = properties.rightIcon;
        this.rightCustomElements = properties.rightCustomElements;
    }

    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {Element | Element[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition(element?: Element | Element[], type?: keyof TurboRichElementChildren) {
        if (!element || !type) return;

        let nextSiblingIndex = 0;
        for (let key in this.elements) {
            if (key == type) break;
            if (this.elements[key]) nextSiblingIndex++;
        }

        this.addChild(element, nextSiblingIndex);
    }

    /**
     * @description The tag of the text element in the button
     */
    @auto({callBefore: (value: ElementTag) => TurboRichElement.config.defaultElementTag || "h4"})
    public set elementTag(value: ElementTag) {}

    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    public get leftCustomElements(): Element | Element[] {
        return this.elements.leftCustomElements;
    }

    public set leftCustomElements(value: Element | Element[]) {
        this.removeChild(this.leftCustomElements);
        if (!value) return;
        this.addAtPosition(value, "leftCustomElements");
        this.elements.leftCustomElements = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get leftIcon(): TurboIcon {
        return this.elements.leftIcon;
    }

    public set leftIcon(value: string | TurboIcon) {
        if (!value) {
            this.removeChild(this.leftIcon);
            return;
        }

        if (typeof value == "string") {
            if (this.leftIcon) {
                this.leftIcon.icon = value;
                return;
            }
            value = new TurboIcon({icon: value});
        }

        this.removeChild(this.leftIcon);
        this.addAtPosition(value, "leftIcon");
        this.elements.leftIcon = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get prefixEntry(): HTMLElement {
        return this.elements.prefixEntry;
    }

    public set prefixEntry(value: string | HTMLElement) {
        if (!value) {
            this.removeChild(this.prefixEntry);
            return;
        }

        if (typeof value == "string") {
            if (this.prefixEntry) {
                this.prefixEntry.innerText = value;
                return;
            }
            value = element({text: value}) as HTMLElement;
        }

        this.removeChild(this.prefixEntry);
        this.addAtPosition(value, "prefixEntry");
        this.elements.prefixEntry = value;
    }

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    public get element(): ValidElement<ElementTag> {
        return this.elements.element;
    }

    public set element(value: string | TurboProperties<ElementTag> | ValidElement<ElementTag>) {
        if (!value) {
            this.removeChild(this.element);
            return;
        }

        if (typeof value == "string") {
            if (this.element && "innerText" in this.element) {
                this.element.innerText = value;
                return;
            }
            value = element({tag: this.elementTag, text: value} as TurboProperties<ElementTag>);
        } else if (typeof value == "object" && !(value instanceof Element)) {
            value = element(value);
        }

        this.removeChild(this.element);
        this.addAtPosition(value, "element");
        this.elements.element = value;
    }

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    public get text(): string {
        const element = this.elements.element;
        if (!element) return "";
        if ("innerText" in element) return element.innerText;
        return element.innerHTML;
    }

    public set text(value: string) {
        if (!value) return;
        this.element = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get suffixEntry(): HTMLElement {
        return this.elements.prefixEntry;
    }

    public set suffixEntry(value: string | HTMLElement) {
        if (!value) {
            this.removeChild(this.suffixEntry);
            return;
        }

        if (typeof value == "string") {
            if (this.suffixEntry) {
                this.suffixEntry.innerText = value;
                return;
            }
            value = element({text: value}) as HTMLElement;
        }

        this.removeChild(this.suffixEntry);
        this.addAtPosition(value, "suffixEntry");
        this.elements.suffixEntry = value;
    }

    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get rightIcon(): TurboIcon {
        return this.elements.rightIcon;
    }

    public set rightIcon(value: string | TurboIcon) {
        if (!value) {
            this.removeChild(this.rightIcon);
            return;
        }

        if (typeof value == "string") {
            if (this.rightIcon) {
                this.rightIcon.icon = value;
                return;
            }
            value = new TurboIcon({icon: value});
        }

        this.removeChild(this.rightIcon);
        this.addAtPosition(value, "rightIcon");
        this.elements.rightIcon = value;
    }

    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    public get rightCustomElements(): Element | Element[] {
        return this.elements.rightCustomElements;
    }

    public set rightCustomElements(value: Element | Element[]) {
        this.removeChild(this.rightCustomElements);
        if (!value) return;
        this.addAtPosition(value, "rightCustomElements");
        this.elements.rightCustomElements = value;
    }
}

export {TurboRichElement};
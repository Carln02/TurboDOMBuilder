import {TurboIcon} from "../icon/icon";
import {element} from "../../turbo-element-creation/element";
import {ButtonChildren, TurboButtonConfig, TurboButtonProperties} from "./button-types";
import {TurboElement} from "../../core/turbo-element";
import {HTMLTag, TurboCompatible} from "../../core/definitions/turbo-types";
import "./button.css";

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
class TurboButton extends TurboElement {
    private _elements: ButtonChildren;
    private _buttonTextTag: HTMLTag;

    static readonly config: TurboButtonConfig = {defaultTextTag: "h4"};

    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboButtonProperties) {
        super(properties);

        this.elements = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };

        this.buttonTextTag = properties.customTextTag;

        if (!properties.unsetDefaultClasses) this.addClass(TurboButton.config.defaultClasses);

        if (properties.leftCustomElements) this.leftCustomElements = properties.leftCustomElements;
        if (properties.leftIcon) this.leftIcon = properties.leftIcon;
        if (properties.buttonText) this.buttonText = properties.buttonText;
        if (properties.rightIcon) this.rightIcon = properties.rightIcon;
        if (properties.rightCustomElements) this.rightCustomElements = properties.rightCustomElements;
    }

    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition(element: TurboCompatible | TurboCompatible[] | null, type: keyof ButtonChildren) {
        if (!element) return;

        let nextSiblingIndex = 0;
        for (let key in this.elements) {
            if (key == type) break;
            if ((this.elements as any)[key]) nextSiblingIndex++;
        }

        this.addChildBefore(element, this.children[nextSiblingIndex]);
    }

    /**
     * @description Removes a given element or elements from the button.
     * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to remove.
     */
    private removeElement(element: TurboCompatible | TurboCompatible[] | null) {
        if (!element) return;
        if (!Array.isArray(element)) this.remChild(element);
        else element.forEach(el =>  this.remChild(el));
    }

    // Getters and setters

    /**
     * @description Object containing the children of the button.
     */
    private get elements(): ButtonChildren {
        return this._elements;
    }

    private set elements(value: ButtonChildren) {
        this._elements = value;
    }

    /**
     * @description The tag of the text element in the button
     */
    public get buttonTextTag(): HTMLTag {
        return this._buttonTextTag;
    }

    public set buttonTextTag(value: HTMLTag | undefined) {
        if (!value) value = TurboButton.config.defaultTextTag || "h4";
        this._buttonTextTag = value;
    }

    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    public get leftCustomElements(): TurboCompatible | TurboCompatible[] | null {
        return this.elements.leftCustomElements;
    }

    public set leftCustomElements(value: TurboCompatible | TurboCompatible[] | null) {
        this.addAtPosition(value, "leftCustomElements");
        this.removeElement(this.leftCustomElements);
        this.elements.leftCustomElements = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get leftIcon(): TurboCompatible | null {
        return this.elements.leftIcon;
    }

    public set leftIcon(value: string | TurboCompatible | null) {
        if (typeof value == "string") value = new TurboIcon({icon: value});
        this.addAtPosition(value, "leftIcon");
        this.removeElement(this.leftIcon);
        this.elements.leftIcon = value;
    }

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    public get buttonText(): TurboCompatible | null {
        return this.elements.buttonText;
    }

    public set buttonText(value: string | TurboCompatible | null) {
        if (typeof value == "string") {
            if (this.buttonText && "innerText" in this.buttonText) {
                this.buttonText.innerText = value;
                return;
            }
            value = element({tag: this.buttonTextTag, text: value});
        }

        this.addAtPosition(value, "buttonText");
        this.removeElement(this.buttonText);
        this.elements.buttonText = value;
    }

    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get rightIcon(): TurboCompatible | null {
        return this.elements.rightIcon;
    }

    public set rightIcon(value: string | TurboCompatible | null) {
        if (typeof value == "string") value = new TurboIcon({icon: value});
        this.addAtPosition(value, "rightIcon");
        this.removeElement(this.rightIcon);
        this.elements.rightIcon = value;
    }

    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    public get rightCustomElements(): TurboCompatible | TurboCompatible[] | null {
        return this.elements.rightCustomElements;
    }

    public set rightCustomElements(value: TurboCompatible | TurboCompatible[] | null) {
        this.addAtPosition(value, "rightCustomElements");
        this.removeElement(this.rightCustomElements);
        this.elements.rightCustomElements = value;
    }
}

customElements.define("turbo-button", TurboButton);

function button(properties: TurboButtonProperties): TurboButton {
    return new TurboButton(properties);
}

export {TurboButton, button};
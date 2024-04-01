import {icon, TurboIcon} from "../icon/icon";
import {element} from "../../element";
import {ButtonChildren, TurboButtonConfig, TurboButtonProperties} from "./button-types";
import {Turbo} from "../../../core/turbo";
import {setProperties} from "../../../turbo-functions/element-manipulation/set-properties";

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
class TurboButton extends Turbo(HTMLButtonElement) {
    private textTag: keyof HTMLElementTagNameMap;
    private _elements: ButtonChildren;

    static readonly config: TurboButtonConfig = {defaultTextTag: "h4"};

    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboButtonProperties) {
        properties.tag = "button";
        super(properties);

        this.elements  = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };

        this.textTag = properties.customTextTag ? properties.customTextTag
            : TurboButton.config.defaultTextTag ? TurboButton.config.defaultTextTag : "h4";

        if (!properties.unsetDefaultClasses) this.addClass(TurboButton.config.defaultClasses);

        if (properties.leftCustomElements) this.leftCustomElements = properties.leftCustomElements;
        if (properties.leftIcon) this.leftIcon = properties.leftIcon;
        if (properties.buttonText) this.buttonText = properties.buttonText;
        if (properties.rightIcon) this.rightIcon = properties.rightIcon;
        if (properties.rightCustomElements) this.rightCustomElements = properties.rightCustomElements;
    }

    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {HTMLElement | HTMLElement[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition(element: HTMLElement | HTMLElement[] | null,
                                    type: keyof ButtonChildren) {
        let nextSiblingIndex = 0;
        for (let key in this.elements) {
            if (key == type) break;
            if ((this.elements as any)[key]) nextSiblingIndex++;
        }

        let nextSibling = this.children[nextSiblingIndex];

        if (element) {
            if (nextSibling) this.addChildBefore(element, nextSibling as HTMLElement);
            else this.addChild(element);
        }
    }

    /**
     * @description Removes a given element or elements from the button.
     * @param {HTMLElement | HTMLElement[] | null} element - The element(s) to remove.
     */
    private removeElement(element: HTMLElement | HTMLElement[] | null) {
        if (!element) return;
        if (element) {
            if (element instanceof HTMLElement) element.remove();
            else element.forEach(el => el.remove());
        }
    }

    // Getters and setters

    /**
     * @description Object containing the button's children.
     */
    private get elements() {
        return this._elements;
    }

    private set elements(value: ButtonChildren) {
        this._elements = value;
    }

    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements() {
        return this.elements.leftCustomElements;
    }

    set leftCustomElements(value: HTMLElement | HTMLElement[] | null) {
        this.addAtPosition(value, "leftCustomElements");
        this.removeElement(this.leftCustomElements);
        this.elements.leftCustomElements = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): HTMLElement | null {
        return this.elements.leftIcon;
    }

    set leftIcon(value: string | HTMLElement | null) {
        if (typeof value == "string") value = icon({icon: value});
        this.addAtPosition(value, "leftIcon");
        this.removeElement(this.leftIcon);
        this.elements.leftIcon = value;
    }

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText(): HTMLElement | null {
        return this.elements.buttonText;
    }

    set buttonText(value: string | HTMLElement | null) {
        if (typeof value == "string") {
            if (value && this.buttonText) {
                this.buttonText.innerText = value;
                return;
            }
            value = element({tag: this.textTag, text: value});
        }
        this.addAtPosition(value, "buttonText");
        this.removeElement(this.buttonText);
        this.elements.buttonText = value;
    }

    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): HTMLElement | null {
        return this.elements.rightIcon;
    }

    set rightIcon(value: string | HTMLElement | null) {
        if (typeof value == "string") value = icon({icon: value});
        this.addAtPosition(value, "rightIcon");
        this.removeElement(this.rightIcon);
        this.elements.rightIcon = value;
    }

    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements() {
        return this.elements.rightCustomElements;
    }

    set rightCustomElements(value: HTMLElement | HTMLElement[] | null) {
        this.addAtPosition(value, "rightCustomElements");
        this.removeElement(this.rightCustomElements);
        this.elements.rightCustomElements = value;
    }
}

customElements.define("turbo-button", TurboButton, {extends: "button"});

function button(properties: TurboButtonProperties): TurboButton {
    let el = document.createElement("turbo-button") as TurboButton;
    setProperties(el, properties);
    return el;
}

export {TurboButton, button};
import {Icon} from "./icon";
import {TurboCompatible, TurboProperties} from "../../turbo/definitions/turbo-types";
import {element} from "../element";
import {TurboWrapper} from "../../turbo/elements/turbo-wrapper";
import {Turbo} from "../../turbo/core/turbo";

/**
 * @type {TurboButtonProperties}
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string | TurboCompatible} [buttonText] - The text content of the button.
 * @property {string | TurboCompatible} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | TurboCompatible} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {TurboCompatible | TurboCompatible[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {TurboCompatible | TurboCompatible[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {keyof HTMLElementTagNameMap} [customTextTag] - The HTML tag to be used for the text element. If not
 * specified, the default tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 */
type TurboButtonProperties = TurboProperties & {
    buttonText?: string | TurboCompatible;
    leftIcon?: string | TurboCompatible;
    rightIcon?: string | TurboCompatible;
    leftCustomElements?: TurboCompatible | TurboCompatible[];
    rightCustomElements?: TurboCompatible | TurboCompatible[];

    type?: "button" | "submit" | "reset";

    customTextTag?: keyof HTMLElementTagNameMap;
    unsetDefaultClasses?: boolean;
};

/**
 * @type {ButtonChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {TurboCompatible | TurboCompatible[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {TurboCompatible | null} leftIcon - The icon placed on the left side of the button.
 * @property {TurboCompatible | null} text - The text element of the button.
 * @property {TurboCompatible | null} rightIcon - The icon placed on the right side of the button.
 * @property {TurboCompatible | TurboCompatible[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type ButtonChildren = {
    leftCustomElements: TurboCompatible | TurboCompatible[] | null,
    leftIcon: TurboCompatible | null,
    buttonText: TurboCompatible | null,
    rightIcon: TurboCompatible | null,
    rightCustomElements: TurboCompatible | TurboCompatible[] | null,
};

/**
 * @type {TurboButtonConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {keyof HTMLElementTagNameMap} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = {
    defaultTextTag?: keyof HTMLElementTagNameMap;
    defaultClasses?: string | string[];
}

/**
 * Button class for creating Turbo button elements.
 * @class Button
 * @extends TurboElement
 */
class Button extends Turbo(HTMLButtonElement) {
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

        this._elements = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };
        this.elements  = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };

        this.textTag = properties.customTextTag ? properties.customTextTag
            : Button.config.defaultTextTag ? Button.config.defaultTextTag : "h4";

        if (!properties.unsetDefaultClasses) this.addClass(Button.config.defaultClasses);

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
    private addAtPosition(element: TurboCompatible | TurboCompatible[] | null,
                                    type: keyof ButtonChildren) {
        let nextSiblingIndex = 0;
        for (let key in this.elements) {
            if (key == type) break;
            if ((this.elements as any)[key]) nextSiblingIndex++;
        }

        let nextSibling = this.children[nextSiblingIndex];

        if (element) {
            if (nextSibling) this.addBefore(element, nextSibling as HTMLElement);
            else this.addChild(element);
        }
    }

    /**
     * @description Removes a given element or elements from the button.
     * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to remove.
     */
    private removeElement(element: TurboCompatible | TurboCompatible[] | null) {
        if (!element) return;
        if (element) {
            if (element instanceof HTMLElement) element.remove();
            else if (element instanceof TurboWrapper) element.remove();
            else element.forEach(el => {
                    if (el instanceof TurboWrapper) el.element.remove();
                    else el.remove();
                });
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

    set leftCustomElements(value: TurboCompatible | TurboCompatible[] | null) {
        this.addAtPosition(value, "leftCustomElements");
        this.removeElement(this.leftCustomElements);
        this.elements.leftCustomElements = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): TurboCompatible | null {
        return this.elements.leftIcon;
    }

    set leftIcon(value: string | TurboCompatible | null) {
        if (typeof value == "string") value = new Icon({icon: value});
        this.addAtPosition(value, "leftIcon");
        this.removeElement(this.leftIcon);
        this.elements.leftIcon = value;
    }

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText(): TurboCompatible | null {
        return this.elements.buttonText;
    }

    set buttonText(value: string | TurboCompatible | null) {
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
    get rightIcon(): TurboCompatible | null {
        return this.elements.rightIcon;
    }

    set rightIcon(value: string | TurboCompatible | null) {
        if (typeof value == "string") value = new Icon({icon: value});
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

    set rightCustomElements(value: TurboCompatible | TurboCompatible[] | null) {
        this.addAtPosition(value, "rightCustomElements");
        this.removeElement(this.rightCustomElements);
        this.elements.rightCustomElements = value;
    }
}

customElements.define("turbo-button", Button, {extends: "button"});

export {Button, TurboButtonProperties, TurboButtonConfig};
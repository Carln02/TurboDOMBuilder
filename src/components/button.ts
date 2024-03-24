import {TurboElement, TurboElementProperties} from "../turbo-element";
import {icon, Icon} from "./icon";
import {element} from "../turbo-functions";

/**
 * @type {TurboButtonProperties}
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboElementProperties
 *
 * @property {string | TurboElement | HTMLElement} [buttonText] - The text content of the button.
 * @property {string | Icon} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | Icon} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {keyof HTMLElementTagNameMap} [customTextTag] - The HTML tag to be used for the text element. If not
 * specified, the default tag specified in the Button class will be used.
 */
type TurboButtonProperties = TurboElementProperties & {
    buttonText?: string | TurboElement | HTMLElement;
    leftIcon?: string | Icon;
    rightIcon?: string | Icon;
    leftCustomElements?: TurboElement | HTMLElement | (TurboElement | HTMLElement)[];
    rightCustomElements?: TurboElement | HTMLElement | (TurboElement | HTMLElement)[];
    type?: "button" | "submit" | "reset";
    customTextTag?: keyof HTMLElementTagNameMap;
};

/**
 * @type {ButtonChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {Icon | HTMLElement | null} leftIcon - The icon placed on the left side of the button.
 * @property {TurboElement | HTMLElement | null} text - The text element of the button.
 * @property {Icon | HTMLElement | null} rightIcon - The icon placed on the right side of the button.
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type ButtonChildren = {
    leftCustomElements: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null,
    leftIcon: Icon | HTMLElement | null,
    buttonText: TurboElement | HTMLElement | null,
    rightIcon: Icon | HTMLElement | null,
    rightCustomElements: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null,
};

/**
 * Button class for creating Turbo button elements.
 * @class Button
 * @extends TurboElement
 */
class Button extends TurboElement<HTMLButtonElement> {
    private customTextTag: keyof HTMLElementTagNameMap = null;
    private _elements: ButtonChildren = null;

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

        if (properties.leftCustomElements) this.leftCustomElements = properties.leftCustomElements;
        if (properties.leftIcon) this.leftIcon = properties.leftIcon;
        if (properties.buttonText) this.buttonText = properties.buttonText;
        if (properties.rightIcon) this.rightIcon = properties.rightIcon;
        if (properties.rightCustomElements) this.rightCustomElements = properties.rightCustomElements;

        return this.generateProxy() as Button;
    }

    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition(element: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null,
                                    type: keyof ButtonChildren) {
        let nextSiblingIndex = 0;
        for (let key in this.elements) {
            if (key == type) break;
            if (this.elements[key]) nextSiblingIndex++;
        }

        let nextSibling = this.element.children[nextSiblingIndex];

        if (element) {
            if (nextSibling) this.addBefore(element, nextSibling as HTMLElement);
            else this.addChild(element);
        }
    }

    /**
     * @description Removes a given element or elements from the button.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} element - The element(s) to remove.
     */
    private removeElement(element: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null) {
        if (!element) return;
        if (element) {
            if (element instanceof HTMLElement) element.remove();
            else if (element instanceof TurboElement) element.remove();
            else element.forEach(el => {
                    if (el instanceof TurboElement) el.element.remove();
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

    set leftCustomElements(value: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null) {
        this.addAtPosition(value, "leftCustomElements");
        this.removeElement(this.leftCustomElements);
        this.elements.leftCustomElements = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): Icon | HTMLElement | null {
        return this.elements.leftIcon;
    }

    set leftIcon(value: string | Icon | HTMLElement | null) {
        if (typeof value == "string") value = icon({icon: value});
        this.addAtPosition(value, "leftIcon");
        this.removeElement(this.leftIcon);
        this.elements.leftIcon = value;
    }

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText(): TurboElement | HTMLElement | null {
        return this.elements.buttonText;
    }

    set buttonText(value: string | TurboElement | HTMLElement | null) {
        if (typeof value == "string") {
            if (value && this.buttonText) {
                this.buttonText.innerText = value;
                return;
            }
            value = element({tag: this.customTextTag ?
                    this.customTextTag : Button.defaultTextTag, text: value});
        }
        this.addAtPosition(value, "buttonText");
        this.removeElement(this.buttonText);
        this.elements.buttonText = value;
    }

    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): Icon | HTMLElement | null {
        return this.elements.rightIcon;
    }

    set rightIcon(value: string | Icon | HTMLElement | null) {
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

    set rightCustomElements(value: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null) {
        this.addAtPosition(value, "rightCustomElements");
        this.removeElement(this.rightCustomElements);
        this.elements.rightCustomElements = value;
    }

    //Static fields

    private static _defaultTextTag: keyof HTMLElementTagNameMap = "h4";
    private static _defaultClasses: string | string[] = null;

    /**
     * @description The default tag for the text element in buttons.
     */
    static get defaultTextTag() {
        return this._defaultTextTag;
    }

    static set defaultTextTag(value: keyof HTMLElementTagNameMap) {
        this._defaultTextTag = value;
    }

    /**
     * @description The default classes to assign to newly created icons.
     */
    static get defaultClasses() {
        return this._defaultClasses;
    }

    static set defaultClasses(value: string | string[] | null) {
        this._defaultClasses = value;
    }
}

/**
 * @description Creates a TurboElement Button.
 * @param {TurboButtonProperties} properties - Object containing properties of the button.
 * @returns {Button} The created Turbo button.
 */
function button(properties: TurboButtonProperties): Button {
    return new Button(properties);
}

export {Button, button, TurboButtonProperties};
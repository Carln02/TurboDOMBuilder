import {StylesType} from "./style.types";
import {TurboSelector} from "../turboSelector";
import {StyleFunctionsUtils} from "./style.utils";
import {PartialRecord} from "../../types/basic.types";

const utils = new StyleFunctionsUtils();

export function setupStyleFunctions() {
    /**
     * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
     */
    Object.defineProperty(TurboSelector.prototype, "closestRoot", {
        get: function () {
            let node = this.element;
            while (node) {
                if (node instanceof Element && node.shadowRoot) return node.shadowRoot;
                node = node.parentElement;
            }

            return document.head;
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string | number} value - A string representing the value to set the attribute to.
     * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
     * animation frame.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.setStyle = function _setStyle(this: TurboSelector, attribute: keyof CSSStyleDeclaration,
                                                          value: string | number, instant: boolean = false): TurboSelector {
        if (!attribute || value == undefined) return this;
        if (!(this.element instanceof HTMLElement) && !(this.element instanceof SVGElement)) return this;
        utils.setStyle(this as TurboSelector<HTMLElement | SVGElement>, attribute, value, instant);
        return this;
    };

    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @param {string} [separator=", "] - The separator to use between the existing and new value.
     * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
     * animation frame.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.appendStyle = function _appendStyle(this: TurboSelector, attribute: keyof CSSStyleDeclaration,
                                                                value: string, separator: string = ", ", instant: boolean = false): TurboSelector {
        if (!attribute || value == undefined) return this;
        if (!(this.element instanceof HTMLElement) && !(this.element instanceof SVGElement)) return this;
        const currentStyle = (this.element.style[attribute] || "") as string;
        separator = currentStyle.length > 0 ? separator : "";
        utils.setStyle(this as TurboSelector<HTMLElement | SVGElement>, attribute, currentStyle + separator + value, instant);
        return this;
    };

    /**
     * @description Parses and applies the given CSS to the element's inline styles.
     * @param {StylesType} styles - A CSS string of style attributes and their values, seperated by semicolons,
     * or an object of CSS properties. Use the css literal function for autocompletion.
     * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
     * animation frame.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.setStyles = function _setStyles(this: TurboSelector, styles: StylesType, instant: boolean = false): TurboSelector {
        if (!styles || typeof styles == "number") return this;
        if (!(this.element instanceof HTMLElement) && !(this.element instanceof SVGElement)) return this;

        let stylesObject: PartialRecord<keyof CSSStyleDeclaration, string | number> = {};
        if (typeof styles === "object") stylesObject = styles;
        else if (typeof styles == "string") {
            styles.split(";").forEach(entry => {
                const [property, value] = entry.split(":").map(part => part.trim());
                if (!property || !value) return;
                stylesObject[property] = value;
            });
        }

        Object.entries(stylesObject).forEach(([key, value]) =>
            utils.setStyle(this as TurboSelector<HTMLElement | SVGElement>, key as keyof CSSStyleDeclaration, value, instant, false));
        if (!instant) utils.applyStyles(this as TurboSelector<HTMLElement | SVGElement>);
        return this;
    };
}
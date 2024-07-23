import "./styleManipulation.types";
import {InOut} from "../../../utils/datatypes/basicDatatypes.types";
import {Transition} from "../../transition/transition";
import {TransitionHandler} from "../../transition/transitionHandler";
import {StylesType} from "./styleManipulation.types";

function addStylesManipulationToElementPrototype() {
    const showTransition = new Transition({
        properties: "visibility",
        defaultStyles: {in: "visible", out: "hidden"}
    });

    /**
     * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
     */
    Object.defineProperty(Node.prototype, "closestRoot", {
        get: function () {
            let node = this;
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
     * @description Adds a readonly "transitions" property to HTMLElement prototype.
     */
    Object.defineProperty(HTMLElement.prototype, "transitions", {
        get: function () {
            if (!this._transitions) this._transitions = new TransitionHandler(this);
            return this._transitions;
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Adds a configurable "showTransition" property to HTMLElement prototype. Defaults to a global
     * transition assigned to all elements.
     */
    Object.defineProperty(HTMLElement.prototype, "showTransition", {
        value: showTransition,
        writable: true,
        configurable: true,
        enumerable: true
    });

    /**
     * @description Boolean indicating whether the element is shown or not, based on its showTransition.
     */
    Object.defineProperty(HTMLElement.prototype, "isShown", {
        get: function () {
            const state = this.showTransition.stateOf(this);
            if (state == InOut.in) return true;
            else if (state == InOut.out) return false;

            return this.style.display != "none" && this.style.visibility != "hidden" && this.style.opacity != "0";
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
    HTMLElement.prototype.setStyle = function _setStyle<Type extends HTMLElement>
    (this: Type, attribute: keyof CSSStyleDeclaration, value: string | number, instant: boolean = false): Type {
        if (!attribute || value == undefined) return this;
        if (!this.pendingStyles) this.pendingStyles = {};

        if (instant) (this.style as any)[attribute] = value.toString();
        else this.pendingStyles[attribute] = value.toString();

        if (!instant) this.applyStyles();
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
    HTMLElement.prototype.appendStyle = function _appendStyle<Type extends HTMLElement>
    (this: Type, attribute: keyof CSSStyleDeclaration, value: string, separator: string = ", ",
     instant: boolean = false): Type {
        if (!attribute || value == undefined) return this;
        if (!this.pendingStyles) this.pendingStyles = {};

        const currentStyle = (this.style[attribute] || "") as string;
        separator = currentStyle.length > 0 ? separator : "";

        if (instant) (this.style as any)[attribute] = currentStyle + separator + value;
        else this.pendingStyles[attribute] = currentStyle + separator + value;

        if (!instant) this.applyStyles();
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
    HTMLElement.prototype.setStyles = function _setStyles<Type extends HTMLElement>
    (this: Type, styles: StylesType, instant: boolean = false): Type {
        if (!styles || typeof styles == "number") return this;
        if (!this.pendingStyles) this.pendingStyles = {};

        if (typeof styles == "string") styles.split(";").forEach(entry => {
            const [property, value] = entry.split(":").map(part => part.trim());
            if (!property || !value) return;

            if (instant) (this.style as any)[property] = value;
            else this.pendingStyles[property] = value;
        });
        else for (const [property, value] of Object.entries(styles)) {
            if (instant) (this.style as any)[property] = value.toString();
            else this.pendingStyles[property] = value.toString();
        }

        if (!instant) this.applyStyles();
        return this;
    };

    /**
     * @description Apply the pending styles to the element.
     */
    HTMLElement.prototype.applyStyles = function _applyStyles(this: HTMLElement): void {
        requestAnimationFrame(() => {
            for (const property in this.pendingStyles) {
                if (property == "cssText") this.style.cssText += ";" + (this.pendingStyles as any)["cssText"];
                else (this.style as any)[property] = this.pendingStyles[property];
            }
            this.pendingStyles = {};
        });
    };

    /**
     * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
     * @param {boolean} b - Whether to show the element or not
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.show = function _show<Type extends HTMLElement>(this: Type, b: boolean): Type {
        this.showTransition.apply(b ? InOut.in : InOut.out, this);
        return this;
    };
}

export {addStylesManipulationToElementPrototype};
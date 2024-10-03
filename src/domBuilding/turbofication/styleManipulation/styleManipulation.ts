import "./styleManipulation.types";
import {StylesType} from "./styleManipulation.types";

function addStylesManipulationToElementPrototype() {
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
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string | number} value - A string representing the value to set the attribute to.
     * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
     * animation frame.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.setStyle = function _setStyle<Type extends Node>
    (this: Type, attribute: keyof CSSStyleDeclaration, value: string | number, instant: boolean = false): Type {
        if (!attribute || value == undefined) return this;
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement)) return this;
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
    Node.prototype.appendStyle = function _appendStyle<Type extends Node>
    (this: Type, attribute: keyof CSSStyleDeclaration, value: string, separator: string = ", ",
     instant: boolean = false): Type {
        if (!attribute || value == undefined) return this;
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement)) return this;
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
    Node.prototype.setStyles = function _setStyles<Type extends Node>
    (this: Type, styles: StylesType, instant: boolean = false): Type {
        if (!styles || typeof styles == "number") return this;
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement)) return this;
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
    Node.prototype.applyStyles = function _applyStyles(this: Node): void {
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement)) return;

        requestAnimationFrame(() => {
            for (const property in this.pendingStyles) {
                if (property == "cssText") this.style.cssText += ";" + (this.pendingStyles as any)["cssText"];
                else (this.style as any)[property] = this.pendingStyles[property];
            }
            this.pendingStyles = {};
        });
    };
}

export {addStylesManipulationToElementPrototype};
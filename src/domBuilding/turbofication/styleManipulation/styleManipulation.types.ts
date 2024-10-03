import {PartialRecord} from "../../core.types";

/**
 * @type {StylesRoot}
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */
type StylesRoot = ShadowRoot | HTMLHeadElement;

/**
 * @type {StylesType}
 * @description A type that represents types that are accepted as styles entries (mainly by the HTMLElement.setStyles()
 * method).
 */
type StylesType = string | number | PartialRecord<keyof CSSStyleDeclaration, string | number>

declare global {
    interface Node {
        /**
         * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
         */
        readonly closestRoot: StylesRoot;

        /**
         * @description Object containing the pending styles to be applied on next animation frame.
         */
        pendingStyles: PartialRecord<keyof CSSStyleDeclaration, string>;

        /**
         * @description Set a certain style attribute of the element to the provided value.
         * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
         * @param {string} value - A string representing the value to set the attribute to.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        setStyle(attribute: keyof CSSStyleDeclaration, value: string | number, instant?: boolean): this;

        /**
         * @description Set a certain style attribute of the element to the provided value.
         * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
         * @param {string} value - A string representing the value to set the attribute to.
         * @param {string} [separator=", "] - The separator to use between the existing and new value.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        appendStyle(attribute: keyof CSSStyleDeclaration, value: string | number, separator?: string, instant?: boolean): this;

        /**
         * @description Parses and applies the given CSS to the element's inline styles.
         * @param {string | PartialRecord<keyof CSSStyleDeclaration, string | number>} styles - A CSS string of style
         * attributes and their values, seperated by semicolons, or an object of CSS properties. Use the css literal
         * function for autocompletion.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        setStyles(styles: StylesType, instant?: boolean): this;

        /**
         * @description Apply the pending styles to the element.
         */
        applyStyles(): void;
    }
}

export {StylesRoot, StylesType};

import {PartialRecord} from "../../types/basic.types";

/**
 * @type {StylesRoot}
 * @group Types
 * @category Style
 *
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */
type StylesRoot = ShadowRoot | HTMLHeadElement;

/**
 * @type {StylesType}
 * @group Types
 * @category Style
 *
 * @description A type that represents the types that are accepted as styles entries (mainly by the HTMLElement.setStyles()
 * method). It includes strings, numbers, and records of CSS attributes to strings or numbers.
 */
type StylesType = string | number | PartialRecord<keyof CSSStyleDeclaration, string | number>

declare module "../turboSelector" {
    interface TurboSelector {
        /**
         * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
         */
        readonly closestRoot: StylesRoot;

        /**
         * @function setStyle
         * @description Set a certain style attribute of the element to the provided value.
         * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
         * @param {string | number} value - THe value to append.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        setStyle(attribute: keyof CSSStyleDeclaration, value: string | number, instant?: boolean): this;

        /**
         * @function appendStyle
         * @description Append the provided value to a certain style attribute.
         * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to append to.
         * @param {string | number} value - The value to append.
         * @param {string} [separator=", "] - The separator to use between the existing and new values.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        appendStyle(attribute: keyof CSSStyleDeclaration, value: string | number, separator?: string, instant?: boolean): this;

        /**
         * @function setStyles
         * @description Parses and applies the given CSS to the element's inline styles.
         * @param {StylesType} styles - Acceptable styles to set.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        setStyles(styles: StylesType, instant?: boolean): this;
    }
}

export {StylesRoot, StylesType};

import {PartialRecord} from "../../core.types";
import {TransitionHandler} from "../../transition/transitionHandler";
import {Transition} from "../../transition/transition";

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
    interface Element {
        /**
         * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
         */
        readonly closestRoot: StylesRoot;
    }

    interface HTMLElement {
        /**
         * @description Handler for all Transitions attached to this element.
         */
        readonly transitions: TransitionHandler;

        /**
         * @description The transition used by the element's show() and isShown methods. Directly modifying its
         * value will modify all elements' default showTransition. Unless this is the desired outcome, set it to a
         * new custom Transition.
         */
        showTransition: Transition;

        /**
         * @description Object containing the pending styles to be applied on next animation frame.
         */
        pendingStyles: PartialRecord<keyof CSSStyleDeclaration, string>;

        /**
         * @description Boolean indicating whether the element is shown or not, based on its showTransition.
         */
        readonly isShown: boolean;

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

        /**
         * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
         * @param {boolean} b - Whether to show the element or not
         * @returns {this} Itself, allowing for method chaining.
         */
        show(b: boolean): this;
    }
}

export {StylesRoot, StylesType};

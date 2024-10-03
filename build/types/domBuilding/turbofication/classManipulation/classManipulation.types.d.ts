declare global {
    interface Element {
        /**
         * @description Add one or more CSS classes to the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @returns {this} Itself, allowing for method chaining.
         */
        addClass(classes?: string | string[]): this;
        /**
         * @description Remove one or more CSS classes from the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeClass(classes?: string | string[]): this;
        /**
         * @description Toggle one or more CSS classes in the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
         * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
         * @returns {this} Itself, allowing for method chaining.
         */
        toggleClass(classes?: string | string[], force?: boolean): this;
        /**
         * @description Check if the element's class list contains the provided class(es).
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings
         * @return A boolean indicating whether the provided classes are included
         */
        hasClass(classes?: string | string[]): boolean;
    }
}
export {};

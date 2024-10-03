declare global {
    interface Node {
        /**
         * @description Execute a callback on the node while still benefiting from chaining.
         * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance
         * itself.
         * @returns {this} Itself, allowing for method chaining.
         */
        execute(callback: ((el: this) => void)): this;
    }
    interface Element {
        /**
         * @description Sets the value of an attribute on the underlying element.
         * @param {string} name The name of the attribute.
         * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent
         * a true boolean.
         * @returns {this} Itself, allowing for method chaining.
         */
        setAttribute(name: string, value?: string | number | boolean): this;
        /**
         * @description Removes an attribute from the underlying element.
         * @param {string} name The name of the attribute to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAttribute(name: string): this;
    }
    interface HTMLElement {
        /**
         * @description Causes the element to lose focus.
         * @returns {this} Itself, allowing for method chaining.
         */
        blur(): this;
        /**
         * @description Sets focus on the element.
         * @returns {this} Itself, allowing for method chaining.
         */
        focus(): this;
    }
}
export {};

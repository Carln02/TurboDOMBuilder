import "./chainingProperties.types";

function updateChainingPropertiesInElementPrototype() {
    const originalSetAttribute = Element.prototype.setAttribute;
    const originalRemoveAttribute = Element.prototype.removeAttribute;
    const originalBlur = HTMLElement.prototype.blur;
    const originalFocus = HTMLElement.prototype.focus;

    /**
     * @description Execute a callback on the node while still benefiting from chaining.
     * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.execute = function _execute<Type extends Node>(this: Type, callback: (el: Type) => void): Type {
        callback(this);
        return this;
    };

    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent a
     * true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.setAttribute = function _setAttribute<Type extends Element>
    (this: Type, name: string, value: string | number | boolean): Type {
        originalSetAttribute.call(this, name, value?.toString() || "true");
        return this;
    };

    /**
     * @description Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeAttribute = function _removeAttribute<Type extends Element>
    (this: Type, name: string): Type {
        originalRemoveAttribute.call(this, name);
        return this;
    };

    /**
     * @description Causes the element to lose focus.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.blur = function _blur<Type extends Element>(this: Type): Type {
        originalBlur.call(this);
        return this;
    };

    /**
     * @description Sets focus on the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.focus = function _focus<Type extends Element>(this: Type): Type {
        originalFocus.call(this);
        return this;
    };
}

export {updateChainingPropertiesInElementPrototype};
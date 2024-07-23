import "./classManipulation.types";

function addClassManipulationToElementPrototype() {
    /**
     * @description Utility function to operate on the provided classes
     * @param element
     * @param classes
     * @param callback
     */
    function operateOnClasses<Type extends Element>(element: Type, classes?: string | string[],
                                                    callback: (classEntry: string) => void = (() => {})): Type {
        if (!element || !classes) return element;

        try {
            // If string provided --> split by spaces
            if (typeof classes === "string") classes = classes.split(" ");
            classes.filter(entry => entry.trim().length > 0)
                .forEach(entry => callback(entry));
        } catch (e) {
            console.error(e);
        }

        return element;
    }

    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addClass = function _addClass<Type extends Element>(this: Type, classes?: string | string[]): Type {
        return operateOnClasses(this, classes, entry => this.classList.add(entry));
    };

    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeClass = function _removeClass<Type extends Element>(this: Type, classes?: string | string[]): Type {
        return operateOnClasses(this, classes, entry => this.classList.remove(entry));
    };

    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.toggleClass = function _toggleClass<Type extends Element>
    (this: Type, classes?: string | string[], force?: boolean): Type {
        return operateOnClasses(this, classes, entry => this.classList.toggle(entry, force));
    };

    /**
     * @description Check if the element's class list contains the provided class(es).
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings
     * @return A boolean indicating whether the provided classes are included
     */
    Element.prototype.hasClass = function _hasClass(this: Element, classes?: string | string[]): boolean {
        if (!this || !classes) return false;

        if (typeof classes === "string") return this.classList.contains(classes);
        for (let entry of classes) {
            if (!this.classList.contains(entry)) return false;
        }
        return true;
    }
}

export {addClassManipulationToElementPrototype};
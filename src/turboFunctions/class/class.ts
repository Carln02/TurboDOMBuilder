import "./class.types";
import {TurboSelector} from "../turboSelector";
import {ClassFunctionsUtils} from "./class.utils";

const utils = new ClassFunctionsUtils();

function setupClassFunctions() {
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.addClass = function _addClass(this: TurboSelector, classes?: string | string[]): TurboSelector {
        if (!(this.element instanceof Element)) return this;
        return utils.operateOnClasses(this, classes, entry => (this.element as Element).classList.add(entry));
    };

    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeClass = function _removeClass(this: TurboSelector, classes?: string | string[]): TurboSelector {
        if (!(this.element instanceof Element)) return this;
        return utils.operateOnClasses(this, classes, entry => (this.element as Element).classList.remove(entry));
    };

    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.toggleClass = function _toggleClass
    (this: TurboSelector, classes?: string | string[], force?: boolean): TurboSelector {
        if (!(this.element instanceof Element)) return this;
        return utils.operateOnClasses(this, classes, entry => (this.element as Element).classList.toggle(entry, force));
    };

    /**
     * @description Check if the element's class list contains the provided class(es).
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings
     * @return A boolean indicating whether the provided classes are included
     */
    TurboSelector.prototype.hasClass = function _hasClass(this: TurboSelector, classes?: string | string[]): boolean {
        if (!this || !classes || !(this.element instanceof Element)) return false;

        if (typeof classes === "string") return this.element.classList.contains(classes);
        for (let entry of classes) {
            if (!this.element.classList.contains(entry)) return false;
        }
        return true;
    }
}

export {setupClassFunctions};
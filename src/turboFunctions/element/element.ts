import "./element.types";
import {$, TurboSelector} from "../turboFunctions";
import {ValidElement, ValidTag} from "../../core.types";
import {TurboProperties} from "../../turboElement/turboElement.types";
import {stylesheet} from "../../elementCreation/miscElements";

function setupElementFunctions() {
    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties<Tag>} [properties] - The properties object.
     * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
     * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
     * @returns {this} Itself, allowing for method chaining.
     * @template Tag
     */
    TurboSelector.prototype.setProperties = function _setProperties<Tag extends ValidTag>
    (this: TurboSelector<ValidElement<Tag>>, properties: TurboProperties<Tag> = {} as TurboProperties<Tag>,
     setOnlyBaseProperties: boolean = false): TurboSelector<ValidElement<Tag>> {
        if (!this) return this;

        if (properties.out) {
            if (typeof properties.out == "string") this["__outName"] = properties.out;
            else Object.assign(properties.out, this);
        }

        Object.keys(properties).forEach(property => {
            switch (property) {
                case "tag":
                case "namespace":
                case "shadowDOM":
                    return;
                case "text":
                    if (!(this instanceof HTMLElement)) return;
                    this.innerText = properties.text;
                    return;
                case "style":
                    if (!(this instanceof HTMLElement || this instanceof SVGElement)) return;
                    this.style.cssText += properties.style;
                    return;
                case "stylesheet":
                    stylesheet(properties.stylesheet, this.closestRoot);
                    return;
                case "id":
                    this.element.id = properties.id;
                    return;
                case "classes":
                    this.addClass(properties.classes);
                    return;
                case "listeners":
                    Object.keys(properties.listeners).forEach(listenerType =>
                        this.on(listenerType, properties.listeners[listenerType], this as Node));
                    return;
                case "children":
                    this.addChild(properties.children);
                    return;
                case "parent":
                    if (!properties.parent) return;
                    $(properties.parent).addChild(this.element);
                    return;
                default:
                    if (setOnlyBaseProperties) return;
                    try {
                        (this as any)[property] = properties[property];
                    } catch (e) {
                        console.error(e);
                    }
                    return;
            }
        });

        return this;
    };

    /**
     * @description Destroys the node by removing it from the document and removing all its bound listeners.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.destroy = function _destroy(this: TurboSelector): TurboSelector {
        this.removeAllListeners();
        this.remove();
        return this;
    }

    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent a
     * true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.setAttribute = function _setAttribute
    (this: TurboSelector, name: string, value: string | number | boolean): TurboSelector {
        if (this.element instanceof Element) this.element.setAttribute(name, value?.toString() || "true");
        return this;
    };

    /**
     * @description Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeAttribute = function _removeAttribute
    (this: TurboSelector, name: string): TurboSelector {
        if (this.element instanceof Element) this.element.removeAttribute(name);
        return this;
    };

    /**
     * @description Causes the element to lose focus.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.blur = function _blur(this: TurboSelector): TurboSelector {
        if (this.element instanceof HTMLElement) this.element.blur();
        return this;
    };

    /**
     * @description Sets focus on the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.focus = function _focus(this: TurboSelector): TurboSelector {
        if (this.element instanceof HTMLElement) this.element.focus();
        return this;
    };
}

export {setupElementFunctions};
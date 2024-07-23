import {TurboProperties} from "../../turboElement/turboElement.types";
import {stylesheet} from "../../elementCreation/miscElements";
import "./elementManipulation.types";
import {ValidElement, ValidTag} from "../../core.types";

function addElementManipulationToElementPrototype() {
    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties<Tag>} [properties] - The properties object.
     * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
     * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
     * @returns {this} Itself, allowing for method chaining.
     * @template Tag
     */
    Element.prototype.setProperties = function _setProperties<Tag extends ValidTag>
    (this: ValidElement<Tag>, properties: TurboProperties<Tag> = {} as TurboProperties<Tag>,
     setOnlyBaseProperties: boolean = false): ValidElement<Tag> {
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
                    this.id = properties.id;
                    return;
                case "classes":
                    this.addClass(properties.classes);
                    return;
                case "listeners":
                    Object.keys(properties.listeners).forEach(listenerType =>
                        this.addListener(listenerType, properties.listeners[listenerType], this));
                    return;
                case "children":
                    this.addChild(properties.children);
                    return;
                case "parent":
                    if (!properties.parent) return;
                    properties.parent.addChild(this);
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
    Node.prototype.destroy = function _destroy<Type extends Node>(this: Type): Type {
        this.removeAllListeners();
        this.remove();
        return this;
    }
}

export {addElementManipulationToElementPrototype};
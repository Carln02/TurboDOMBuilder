import "./element.types";
import {TurboSelector} from "../turboSelector";
import {PartialRecord, ValidElement, ValidTag} from "../../core.types";
import {TurboProperties} from "./element.types";
import {stylesheet} from "../../elementCreation/miscElements";
import {$} from "../turboFunctions";
import {Mvc} from "../../mvc/mvc";
import {TurboModel} from "../../mvc/core/model";
import {DefaultEventName} from "../../eventHandling/eventNaming";
import {stringify} from "../../utils/dataManipulation/stringManipulation";

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

        if (!this.element.shadowRoot) {
            let shadowDOM = !!properties.shadowDOM;
            if ("getPropertiesValue" in this.element && typeof this.element.getPropertiesValue === "function")
                shadowDOM = this.element.getPropertiesValue(properties.shadowDOM, "shadowDOM");
            if (shadowDOM) try {this.element.attachShadow({mode: "open"})} catch {}
        }

        const mvc = this.element?.["mvc"] instanceof Mvc ? this.element["mvc"]
            : "model" in this.element && "view" in this.element ? this.element : undefined;

        for (const property of Object.keys(properties)) {
            const value = properties[property];
            if (value === undefined) continue;

            switch (property) {
                case "tag":
                case "namespace":
                case "shadowDOM":
                    break;

                case "text":
                    if (this.element instanceof HTMLElement) this.element.innerText = value;
                    break;
                case "style":
                    if (!(this.element instanceof HTMLElement || this.element instanceof SVGElement)) break;
                    this.setStyles(value, true);
                    break;
                case "stylesheet":
                    stylesheet(value, this.closestRoot);
                    break;
                case "id":
                    this.element.id = value;
                    break;
                case "classes":
                    this.addClass(value);
                    break;
                case "listeners":
                    Object.entries(value).forEach(([type, callback]) =>
                        this.on(type, callback as any));
                    break;
                case "onClick":
                    this.on(DefaultEventName.click, value as any);
                    break;
                case "onDrag":
                    this.on(DefaultEventName.drag, value as any);
                    break;
                case "children":
                    this.addChild(value);
                    break;
                case "parent":
                    $(value).addChild(this.element);
                    break;

                case "data":
                case "initialize":
                    if (mvc) break;

                case "model":
                case "view":
                case "emitter":
                case "controllers":
                case "handlers":
                case "interactors":
                case "tools":
                case "substrates":
                    if (setOnlyBaseProperties) break;
                    if (mvc) {
                        try {
                            mvc[property] = value;
                            if (property === "model" && properties.data && mvc["model"] instanceof TurboModel) {
                                mvc["model"].setBlock(properties.data, undefined, undefined, false);
                            }
                        } catch {}
                        break;
                    }

                default:
                    if (setOnlyBaseProperties) break;
                    try {this.element[property] = value}
                    catch (e) {
                        try {this.setAttribute(property, stringify(value))}
                        catch (e) {console.error(e)}
                    }
                    break;
            }
        }

        if (properties.initialize === undefined || properties.initialize) {
            if (this.element && "initialize" in this.element && typeof this.element.initialize === "function") this.element.initialize();
            else if (mvc && "initialize" in mvc && typeof mvc.initialize === "function") mvc.initialize();
        }

        return this;
    };

    /**
     * @description Destroys the node by removing it from the document and removing all its bound listeners.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.destroy = function _destroy(this: TurboSelector): TurboSelector {
        this.removeAllListeners();
        this.remove();
        if (this.element && "destroy" in this.element && typeof this.element.destroy === "function") this.element.destroy();
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
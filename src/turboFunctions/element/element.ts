import "./element.types";
import {TurboSelector} from "../turboSelector";
import {CloneElementOptions, FeedforwardProperties, TurboProperties} from "./element.types";
import {stylesheet} from "../../elementCreation/miscElements";
import {Mvc} from "../../mvc/mvc";
import {TurboModel} from "../../mvc/core/model";
import {MvcGenerationProperties} from "../../mvc/mvc.types";
import {ValidElement, ValidTag} from "../../types/element.types";
import {DefaultEventName} from "../../types/eventNaming.types";
import {stringify} from "../../utils/dataManipulation/string";
import {turbo} from "../turboFunctions";
import {getPrototypeChain} from "../../utils/dataManipulation/prototype";
import {equalToAny} from "../../utils/computations/equity";
import {ElementFunctionsUtils} from "./element.utils";
import {TurboElementProperties} from "../../turboElement/turboElement.types";

const utils = new ElementFunctionsUtils();

export function setupElementFunctions() {
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
            if (shadowDOM) try {
                this.element.attachShadow({mode: "open"})
            } catch {
            }
        }

        const mvc = this.element?.["mvc"] instanceof Mvc ? this.element["mvc"]
            : "model" in this.element && "view" in this.element ? this.element : undefined;

        if (!setOnlyBaseProperties && mvc) {
            for (const property of ["model", "view", "emitter", "controllers", "handlers", "interactors", "tools", "substrates"]) {
                const value = properties[property];
                if (value === undefined) continue;
                try {
                    mvc[property] = value;
                    if (property === "model" && properties.data && mvc["model"] instanceof TurboModel) {
                        mvc["model"].setBlock(properties.data, properties.dataId, undefined, false);
                    }
                } catch {
                }
            }
        }

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
                    break;

                case "data":
                case "dataId":
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
                    break;

                default:
                    if (setOnlyBaseProperties) break;
                    try {
                        this.element[property] = value
                    } catch (e) {
                        try {
                            this.setAttribute(property, stringify(value))
                        } catch (e) {
                            console.error(e)
                        }
                    }
                    break;
            }
        }

        if (properties.parent) this.addToParent(properties.parent);

        if (properties.initialize === undefined || properties.initialize) {
            if (this.element && "initialize" in this.element && typeof this.element.initialize === "function") {
                if (!this.element["initialized"]) this.element.initialize();
            } else if (mvc && "initialize" in mvc && typeof mvc.initialize === "function") mvc.initialize();
        }

        return this;
    };

    //TODO maybe use .cloneNode() for vanilla nodes
    TurboSelector.prototype.clone = function _clone<Tag extends ValidTag>(
        this: TurboSelector<ValidElement<Tag>>,
        options: CloneElementOptions = {}
    ): ValidElement<Tag> {
        const originElement = this.element instanceof Node ? this.element : undefined;
        if (!originElement) return;

        const exclude = new Set<PropertyKey>(options.exclude ?? []);
        const force = new Set<PropertyKey>(options.forceInclude ?? []);
        const deepClone = new Set<PropertyKey>(options.deepClone ?? []);
        const copyReference = new Set<PropertyKey>(options.copyReference ?? []);

        const shouldCopy = (key: PropertyKey, value: any, prototype: any) => {
            if (force.has(key)) return true;
            if (exclude.has(key) || key === "mvc" || key === "__proto__" || key === "prototype") return false;
            if (typeof value === "function") return false;
            if (key === "model" || key === "view" || key === "emitter" || key === "controllers"
                || key === "handlers" || key === "interactors" || key === "tools" || key === "substrates") return false;

            const desc = Object.getOwnPropertyDescriptor(prototype, key);
            if (!desc) return false;
            if (desc.get && !desc.set && !force.has(key)) return false;
            if ("writable" in desc && desc.writable === false && !force.has(key)) return false;

            return true;
        };

        const copyField = (key: PropertyKey, value: any): any => {
            if (!value || typeof value !== "object") return value;
            if (copyReference.has(key)) return value;

            try {
                if (value instanceof Node) {
                    if (deepClone.has(key) || options.deepCloneNodes) return turbo(value).clone(options);
                    if (options.copyNodes) return value;
                } else {
                    if (options.deepCloneObjects || deepClone.has(key)) {
                        if (typeof structuredClone === "function") return structuredClone(value);
                    }
                    return value;
                }
            } catch {}
        };

        const constructor = originElement.constructor as any;
        const prototypeChain = getPrototypeChain(originElement);
        const mvc = originElement["mvc"];
        let properties = {};

        if (mvc && mvc instanceof Mvc) {
            const defaultProperties: any = {};
            for (let i = 0; i < prototypeChain.length; i++) {
                turbo(defaultProperties).applyDefaults(prototypeChain[i]?.defaultProperties);
            }
            properties = mvc.getDifference(defaultProperties);
        }

        //TODO maybe clone the data
        if (originElement["model"] && originElement["data"]) properties["data"] = originElement["data"];

        const clone = typeof constructor.create === "function" ? constructor.create(properties)
            : turbo(document.createElement(originElement.tagName)).setProperties(properties).element;

        for (const attr of Array.from(originElement.attributes)) {
            if (!exclude.has(attr.name)) clone.setAttribute(attr.name, attr.value);
        }

        const keys: Map<PropertyKey, any> = new Map();
        const addKeys = (prototype: any) => {
            for (const property of Object.getOwnPropertyNames(prototype)) if (!keys.has(property)) keys.set(property, prototype);
            for (const property of Object.getOwnPropertySymbols(prototype)) if (!keys.has(property)) keys.set(property, prototype);
        }

        addKeys(originElement);
        for (const prototype of prototypeChain) {
            if (equalToAny(prototype, Element.prototype, Node.prototype, HTMLElement.prototype,
                SVGElement.prototype, MathMLElement.prototype, EventTarget.prototype, Object.prototype)) break;
            addKeys(prototype);
        }

        for (const [key, prototype] of keys.entries()) {
            const value = originElement[key];
            if (!shouldCopy(key, value, prototype)) continue;
            let newValue = copyField(key, value);
            if (newValue !== undefined) try {clone[key] = newValue} catch {}
        }

        return clone;
    };

    TurboSelector.prototype.setMvc = function _setMvc(this: TurboSelector, properties: MvcGenerationProperties): Mvc {
        if (!this.element) return undefined;
        if ("mvc" in this.element && this.element.mvc instanceof Mvc) {
            this.element.mvc.generate(properties);
            return this.element.mvc;
        }
        return new Mvc({...properties, element: this.element});
    }

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

    TurboSelector.prototype.feedforward = function _feedforward<Tag extends ValidTag>(
        this: TurboSelector<ValidElement<Tag>>,
        properties: FeedforwardProperties = {}
    ): ValidElement<Tag> {
        if (!this.element) return;
        const type = properties?.type ?? "___DEFAULT___";
        const feedforwardElements = utils.data(this.element).feedforwardElements;
        if (!feedforwardElements) return;

        let saved = feedforwardElements.get(type);
        if (!saved) {
            if (typeof this.element["clone"] === "function") saved = this.element["clone"](properties?.cloneOptions);
            else saved = this.clone(properties?.cloneOptions);
        }
        turbo(saved).setProperties(this.defaultFeedforwardProperties ?? {})
            .setProperties({...properties, cloneOptions: undefined, type: undefined, removeOnPointerRelease: undefined});
        feedforwardElements.set(type, saved);

        if (properties.removeOnPointerRelease) turbo(document.body).on(DefaultEventName.clickEnd, () => {
            if (typeof saved["remove"] === "function") saved["remove"]();
            feedforwardElements.delete(type);

        }, {capture: true});
        return saved as any;
    }

    Object.defineProperty(TurboSelector.prototype, "defaultFeedforwardProperties", {
        get: function () {
            if ("defaultFeedforwardProperties" in this.element) return this.element.defaultFeedforwardProperties;
            return utils.data(this.element).defaultFeedforwardProperties;
        },
        set: function (value: TurboElementProperties) {
            if ("defaultFeedforwardProperties" in this.element) this.element.defaultFeedforwardProperties = value;
            utils.data(this.element).defaultFeedforwardProperties = value;
        },
        configurable: true,
        enumerable: true
    });
}
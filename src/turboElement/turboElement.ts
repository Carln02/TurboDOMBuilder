import {TurboEmitter} from "../mvc/emitter/emitter";
import {TurboModel} from "../mvc/model/model";
import {TurboView} from "../mvc/view/view";
import {defineDefaultProperties} from "./setup/default/default";
import {defineMvcAccessors} from "./setup/mvc/mvc";
import {defineUIPrototype} from "./setup/ui/ui";
import {TurboElementProperties} from "./turboElement.types";
import {Delegate} from "../turboComponents/datatypes/delegate/delegate";
import {element} from "../elementCreation/element";
import {turbo} from "../turboFunctions/turboFunctions";
import {getPrototypeChain} from "../utils/dataManipulation/prototype";
import {isUndefined} from "../utils/dataManipulation/misc";
import {kebabToCamelCase} from "../utils/dataManipulation/string";
import {parse} from "@ungap/structured-clone/json";
import {addRegistryCategory} from "../decorators/define/define";

/**
 * @class TurboElement
 * @group TurboElement
 * @category TurboElement
 *
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few useful tools and functions.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
class TurboElement<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> extends HTMLElement {
    /**
     * @description Default properties assigned to a new instance.
     */
    public static defaultProperties: TurboElementProperties = {
        defaultSelectedClasses: "selected"
    };

    public static create<Type extends new (...args: any[]) => TurboElement>
    (this: Type, properties: InstanceType<Type>["properties"] = {}): InstanceType<Type> {
        return (this as any).customCreate.call(this, properties);
    }

    protected static customCreate(properties: object): object {
        const prototypeChain = getPrototypeChain(this);
        for (const prototype of prototypeChain) turbo(properties).applyDefaults(prototype["defaultProperties"] ?? {});
        return element({...properties});
    }

    public declare readonly properties: TurboElementProperties;

    /**
     * @description Delegate fired when the element is attached to DOM.
     */
    public readonly onAttach: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @description Delegate fired when the element is detached from the DOM.
     */
    public readonly onDetach: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @description Delegate fired when the element is adopted by a new parent in the DOM.
     */
    public readonly onAdopt: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks. Called on `initialize()`.
     * @protected
     */
    protected setupChangedCallbacks(): void {
    }

    /**
     * @function setupUIElements
     * @description Setup method intended to initialize all direct sub-elements attached to this element, and store
     * them in fields. Called on `initialize()`.
     * @protected
     */
    protected setupUIElements(): void {
    }

    /**
     * @function setupUILayout
     * @description Setup method to create the layout structure of the element by adding all created sub-elements to
     * this element's child tree. Called on `initialize()`.
     * @protected
     */
    protected setupUILayout(): void {
    }

    /**
     * @function setupUIListeners
     * @description Setup method to initialize and define all input/DOM event listeners of the element. Called on
     * `initialize()`.
     * @protected
     */
    protected setupUIListeners(): void {
    }

    /**
     * @function connectedCallback
     * @description function called when the element is attached to the DOM.
     */
    public connectedCallback() {
        if (!this.initialized) {
            const prototypeChain = getPrototypeChain(this);
            const defaults = {};
            for (const proto of prototypeChain) turbo(defaults).applyDefaults(proto.constructor?.["defaultProperties"]);
            const toApply = {};
            for (const [key, value] of Object.entries(defaults)) if (isUndefined(this[key])) toApply[key] = value;
            turbo(this).setProperties(toApply);

            for (const attribute of this.constructor["observedAttributes"] ?? []) {
                if (!this.hasAttribute(attribute)) continue;
                const property = kebabToCamelCase(attribute);
                const current = this.getAttribute(attribute);
                this[property] = parse(current);
            }
        }
        this.onAttach.fire();
    }

    /**
     * @function disconnectedCallback
     * @description function called when the element is detached from the DOM.
     */
    public disconnectedCallback() {
        this.onDetach.fire();
    }

    /**
     * @function adoptedCallback
     * @description function called when the element is adopted by a new parent in the DOM.
     */
    public adoptedCallback() {
        this.onAdopt.fire();
    }
}

(() => {
    defineDefaultProperties(TurboElement);
    defineMvcAccessors(TurboElement);
    defineUIPrototype(TurboElement);
})();

addRegistryCategory(TurboElement);
export {TurboElement};
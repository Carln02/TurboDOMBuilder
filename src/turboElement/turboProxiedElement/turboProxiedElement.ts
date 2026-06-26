import {TurboProxiedProperties} from "./turboProxiedElement.types";
import {blindElement} from "../../elementCreation/element";
import {TurboEmitter} from "../../mvc/emitter/emitter";
import {TurboModel} from "../../mvc/model/model";
import {TurboView} from "../../mvc/view/view";
import {defineDefaultProperties} from "../setup/default/default";
import {defineMvcAccessors} from "../setup/mvc/mvc";
import {defineUIPrototype} from "../setup/ui/ui";
import {ValidElement, ValidTag} from "../../types/element.types";
import {TurboElementProperties} from "../turboElement.types";
import {turbo} from "../../turboFunctions/turboFunctions";
import {proxyWrapperSymbol} from "../../turboFunctions/mvc/mvc.utils";
import {MvcFields} from "../../turboFunctions/mvc/mvc";
import {getFirstDescriptorInChain, getPrototypeChain} from "../../utils/dataManipulation/prototype";
import {addRegistryCategory} from "../../decorators/define/define";

const elementSymbol = Symbol("___element___");

/**
 * @class TurboProxiedElement
 * @group TurboElement
 * @category TurboProxiedElement
 *
 * @description TurboProxiedElement class, similar to TurboElement but containing an HTML element instead of being one.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
class TurboProxiedElement<
    ElementTag extends ValidTag = ValidTag,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> {
    /**
     * @description Default properties assigned to a new instance.
     */
    public static defaultProperties: TurboElementProperties = {
        defaultSelectedClasses: "selected"
    };

    public static create<Type extends new (...args: any[]) => TurboProxiedElement>
    (this: Type, properties: InstanceType<Type>["properties"] = {}): InstanceType<Type> {
        const prototypeChain = getPrototypeChain(this);
        for (const prototype of prototypeChain) turbo(properties).applyDefaults(prototype["defaultProperties"] ?? {});
        return (this as any).customCreate.call(this, properties);
    }

    protected static customCreate(properties: object): object {
        const obj = new this();
        obj[elementSymbol] = blindElement({tag: properties["tag"]});
        // turbo(obj) without raw unwraps to obj.element, which is the same key the model getter
        // resolves to later. Using raw=true here would key MVC data under obj instead, making
        // turbo(obj).model return undefined during initialize().
        // The back-reference lets extractClassEssenceName walk obj's prototype chain (FlowEntry,
        // etc.) instead of the raw SVGGElement chain, so handler/operator key derivation works.
        obj[elementSymbol][proxyWrapperSymbol] = obj;
        const shouldInitialize = properties["initialize"] !== false;
        turbo(obj).setProperties(Object.assign({}, properties, {initialize: false}));

        // Dispatch custom wrapper setters that setProperties couldn't reach.
        // turbo(obj) routes through obj.element (the raw DOM node), so properties that have no
        // meaning on the raw element (e.g. FlowEntry.flow) are silently dropped. We replay them
        // onto obj directly — but only when: (1) not an MVC field already handled by TurboSelector,
        // (2) the raw element has no descriptor for the key (setProperties already handled it), and
        // (3) obj's prototype chain has a real setter for the key.
        const rawEl = obj[elementSymbol];
        for (const [key, value] of Object.entries(properties)) {
            if ((MvcFields as string[]).includes(key)) continue;
            if (getFirstDescriptorInChain(rawEl, key)) continue;
            const desc = getFirstDescriptorInChain(obj, key);
            if (desc?.set) obj[key] = value;
        }

        if (shouldInitialize && typeof obj["initialize"] === "function") obj["initialize"]();
        return obj;
    }

    public declare readonly properties: TurboProxiedProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>;

    /**
     * @description The HTML (or other) element wrapped inside this instance.
     */
    public get element(): ValidElement<ElementTag> {
        return this[elementSymbol];
    }

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
}

(() => {
    defineDefaultProperties(TurboProxiedElement);
    defineMvcAccessors(TurboProxiedElement);
    defineUIPrototype(TurboProxiedElement);
})();

addRegistryCategory(TurboProxiedElement);
export {TurboProxiedElement};
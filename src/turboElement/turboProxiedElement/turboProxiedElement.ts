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
import {getPrototypeChain} from "../../utils/dataManipulation/prototype";
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
        return (this as any).customCreate.call(this, properties);
    }

    protected static customCreate(properties: object): object {
        const prototypeChain = getPrototypeChain(this);
        for (const prototype of prototypeChain) turbo(properties).applyDefaults(prototype["defaultProperties"] ?? {});
        const obj = new this();
        obj[elementSymbol] = blindElement(properties);
        return obj;
    }

    public declare readonly properties: TurboProxiedProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>;

    /**
     * @description The HTML (or other) element wrapped inside this instance.
     */
    public get element(): ValidElement<ElementTag> {
        return this[elementSymbol];
    }

    protected setupChangedCallbacks(): void {
    }

    protected setupUIElements(): void {
    }

    protected setupUILayout(): void {
    }

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
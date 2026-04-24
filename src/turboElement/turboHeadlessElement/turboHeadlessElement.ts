import {TurboHeadlessProperties} from "./turboHeadlessElement.types";
import {TurboView} from "../../mvc/view/view";
import {TurboModel} from "../../mvc/model/model";
import {TurboEmitter} from "../../mvc/emitter/emitter";
import {defineMvcAccessors} from "../setup/mvc/mvc";
import {defineDefaultProperties} from "../setup/default/default";
import {turbo} from "../../turboFunctions/turboFunctions";
import {getPrototypeChain} from "../../utils/dataManipulation/prototype";
import {addRegistryCategory} from "../../decorators/define/define";

/**
 * @class TurboHeadlessElement
 * @group TurboElement
 * @category TurboHeadlessElement
 *
 * @description TurboHeadlessElement class, similar to TurboElement but without extending HTMLElement.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
class TurboHeadlessElement<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> {
    /**
     * @description Default properties assigned to a new instance.
     */
    public static defaultProperties: TurboHeadlessProperties = {};

    public static create<Type extends new (...args: any[]) => TurboHeadlessElement>
    (this: Type, properties: InstanceType<Type>["properties"] = {}): InstanceType<Type> {
        return (this as any).customCreate.call(this, properties);
    }

    protected static customCreate(properties: object): object {
        const prototypeChain = getPrototypeChain(this);
        for (const prototype of prototypeChain) turbo(properties).applyDefaults(prototype["defaultProperties"] ?? {});
        const obj = new this();
        turbo(obj).setProperties(properties);
        return obj;
    }

    public declare readonly properties: TurboHeadlessProperties<ViewType, DataType, ModelType, EmitterType>;
}

(() => {
    defineDefaultProperties(TurboHeadlessElement);
    defineMvcAccessors(TurboHeadlessElement);
})();

addRegistryCategory(TurboHeadlessElement);
export {TurboHeadlessElement};
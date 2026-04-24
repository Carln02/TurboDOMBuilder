import {defineDefaultProperties} from "../setup/default/default";
import {turbo} from "../../turboFunctions/turboFunctions";
import {getPrototypeChain} from "../../utils/dataManipulation/prototype";
import {addRegistryCategory} from "../../decorators/define/define";

/**
 * @class TurboBaseElement
 * @group TurboElement
 * @category TurboBaseElement
 *
 * @description TurboHeadlessElement class, similar to TurboElement but without extending HTMLElement.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
class TurboBaseElement {
    /**
     * @description Default properties assigned to a new instance.
     */
    public static defaultProperties: object = {};

    public static create<Type extends new (...args: any[]) => TurboBaseElement>
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
}

(() => {
    defineDefaultProperties(TurboBaseElement);
})();

addRegistryCategory(TurboBaseElement);
export {TurboBaseElement};
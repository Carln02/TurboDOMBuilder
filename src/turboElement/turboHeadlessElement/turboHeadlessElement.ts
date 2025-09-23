import {Mvc} from "../../mvc/mvc";
import {TurboHeadlessProperties} from "./turboHeadlessElement.types";
import {TurboView} from "../../mvc/core/view";
import {TurboModel} from "../../mvc/core/model";
import {TurboEmitter} from "../../mvc/core/emitter";
import {defineMvcAccessors} from "../setup/mvc/mvc";
import {defineDefaultProperties} from "../setup/default/default";
import {callOnce} from "../../decorators/callOnce";

const setup = callOnce(function () {
    defineDefaultProperties(TurboHeadlessElement);
    defineMvcAccessors(TurboHeadlessElement);
});

/**
 * @class TurboHeadlessElement
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
     * @description Static configuration object.
     */
    public static readonly config: any = {};

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) (this.config as any)[key] = val;
        });
    }

    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;

    public constructor(properties: TurboHeadlessProperties<ViewType, DataType, ModelType, EmitterType> = {}) {
        setup();
        this.mvc = new Mvc({...properties, element: this});
    }
}

export {TurboHeadlessElement};
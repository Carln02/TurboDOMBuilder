import {TurboModel} from "../core/model";

/**
 * @class TurboHandler
 * @description The MVC base handler class. It's an extension of the model, and its main job is to provide some utility
 * functions to manipulate the model's data.
 * @template {TurboModel} ModelType - The element's MVC model type.
 */
class TurboHandler<ModelType extends TurboModel = TurboModel> {
    /**
     * @description The key of the handler. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the handler's class name is MyElementSomethingHandler, the key would
     * default to "something".
     */
    public keyName: string;

    /**
     * @description A reference to the MVC model.
     * @protected
     */
    protected readonly model: ModelType;

    public constructor(model: ModelType) {
        this.model = model;
    }
}

export {TurboHandler};
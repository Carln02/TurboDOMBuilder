import {initializeEffects} from "../../decorators/reactivity/reactivity";
import {TurboModel} from "../model/model";

/**
 * @class TurboHandler
 * @group MVC
 * @category Handler
 *
 * @description The MVC base handler class. It's an extension of the model, and its main job is to provide some utility
 * functions to manipulate some of (or all of) the model's data.
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
     * @description The MVC model.
     * @protected
     */
    public model: ModelType;

    public constructor(model?: ModelType) {
        if (this.model) this.model = model;
        this.setup();
    }

    /**
     * @function setup
     * @description Called in the constructor. Use for setup that should happen at instantiation,
     * before `this.initialize()` is called.
     * @protected
     */
    protected setup(): void {
        initializeEffects(this);
    }
}

export {TurboHandler};
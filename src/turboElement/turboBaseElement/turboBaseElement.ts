import {defineDefaultProperties} from "../setup/default/default";

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
     * @description Static configuration object.
     */
    public static readonly config: any = {};

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) this.config[key] = val;
        });
    }
}

(() => {
    defineDefaultProperties(TurboBaseElement);
})();

export {TurboBaseElement};
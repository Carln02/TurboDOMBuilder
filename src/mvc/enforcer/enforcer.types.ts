import {MakeEnforcerOptions} from "../../turboFunctions/enforcer/enforcer.types";
import {TurboModel} from "../model/model";
import {TurboView} from "../view/view";
import {TurboEmitter} from "../emitter/emitter";
import {TurboOperatorProperties} from "../operator/operator.types";

/**
 * @type {TurboEnforcerProperties}
 * @group MVC
 * @category Enforcer
 *
 * @extends TurboOperatorProperties
 * @extends MakeEnforcerOptions
 *
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboEnforcer} attached to an element.
 * @property {string} [enforcerName] - The name of the enforcer.
 */
type TurboEnforcerProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboOperatorProperties<ElementType, ViewType, ModelType, EmitterType> & MakeEnforcerOptions & {
    enforcerName?: string,
};

declare module "./enforcer" {
    interface TurboEnforcer {
        /**
         * @function onActivate
         * @description Function to execute when the enforcer is activated.
         */
        onActivate(): void;

        /**
         * @function onDeactivate
         * @description Function to execute when the enforcer is deactivated.
         */
        onDeactivate(): void;
    }
}

export {TurboEnforcerProperties}

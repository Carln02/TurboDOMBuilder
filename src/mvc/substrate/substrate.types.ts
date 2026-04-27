import {MakeSubstrateOptions} from "../../turboFunctions/substrate/substrate.types";
import {TurboModel} from "../model/model";
import {TurboView} from "../view/view";
import {TurboEmitter} from "../emitter/emitter";
import {TurboOperatorProperties} from "../operator/operator.types";

/**
 * @type {TurboSubstrateProperties}
 * @group MVC
 * @category Substrate
 *
 * @extends TurboOperatorProperties
 * @extends MakeSubstrateOptions
 *
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboSubstrate} attached to an element.
 * @property {string} [substrateName] - The name of the substrate.
 */
type TurboSubstrateProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboOperatorProperties<ElementType, ViewType, ModelType, EmitterType> & MakeSubstrateOptions & {
    substrateName?: string,
};

declare module "./substrate" {
    interface TurboSubstrate {
        /**
         * @function onActivate
         * @description Function to execute when the substrate is activated.
         */
        onActivate(): void;

        /**
         * @function onDeactivate
         * @description Function to execute when the substrate is deactivated.
         */
        onDeactivate(): void;
    }
}

export {TurboSubstrateProperties}
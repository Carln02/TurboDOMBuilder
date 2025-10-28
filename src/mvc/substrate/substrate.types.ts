import {TurboControllerProperties} from "../logic/logic.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";

/**
 * @type {TurboSubstrateProperties}
 * @extends TurboControllerProperties
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboSubstrate} attached to an element.
 * @property {string} [substrateName] - The name of the substrate.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 */
type TurboSubstrateProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    substrateName?: string,
    onActivate?: () => void,
    onDeactivate?: () => void
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
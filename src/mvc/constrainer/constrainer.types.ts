import {MakeConstrainerOptions} from "../../turboFunctions/constrainer/constrainer.types";
import {TurboModel} from "../model/model";
import {TurboView} from "../view/view";
import {TurboEmitter} from "../emitter/emitter";
import {TurboOperatorProperties} from "../operator/operator.types";

/**
 * @type {TurboConstrainerProperties}
 * @group MVC
 * @category Constrainer
 *
 * @extends TurboOperatorProperties
 * @extends MakeConstrainerOptions
 *
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboConstrainer} attached to an element.
 * @property {string} [constrainerName] - The name of the constrainer.
 */
type TurboConstrainerProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboOperatorProperties<ElementType, ViewType, ModelType, EmitterType> & MakeConstrainerOptions & {
    constrainerName?: string,
};

declare module "./constrainer" {
    interface TurboConstrainer {
        /**
         * @function onActivate
         * @description Function to execute when the constrainer is activated.
         */
        onActivate(): void;

        /**
         * @function onDeactivate
         * @description Function to execute when the constrainer is deactivated.
         */
        onDeactivate(): void;
    }
}

export {TurboConstrainerProperties}

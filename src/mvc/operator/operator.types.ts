import {TurboView} from "../view/view";
import {TurboModel} from "../model/model";
import {TurboEmitter} from "../emitter/emitter";
import {TurboViewProperties} from "../view/view.types";

/**
 * @type {TurboOperatorProperties}
 * @group MVC
 * @category Operator
 *
 * @extends {TurboViewProperties}
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description  Options used to create a new {@link TurboOperator} attached to an element.
 * @property {ViewType} [view] - The MVC view.
 */
type TurboOperatorProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboViewProperties<ElementType, ModelType, EmitterType> & {
    view?: ViewType
};

export {TurboOperatorProperties};

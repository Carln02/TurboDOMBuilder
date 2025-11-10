import {TurboViewProperties} from "../core/core.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";

/**
 * @type {TurboControllerProperties}
 * @group MVC
 * @category Controller
 *
 * @extends {TurboViewProperties}
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description  Options used to create a new {@link TurboController} attached to an element.
 * @property {ViewType} [view] - The MVC view.
 */
type TurboControllerProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboViewProperties<ElementType, ModelType, EmitterType> & {
    view?: ViewType
};

export {TurboControllerProperties};
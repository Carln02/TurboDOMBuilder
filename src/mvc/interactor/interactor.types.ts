import {TurboControllerProperties} from "../logic/logic.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";
import {ListenerOptions} from "../../turboFunctions/listener/listener.types";

/**
 * @type {TurboInteractorProperties}
 * @group MVC
 * @category Interactor
 *
 * @extends {TurboControllerProperties}
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description  Options used to create a new {@link TurboInteractor} attached to an element.
 * @property {string} [toolName] - The name of the tool (if any) that the event listeners will listen for.
 * @property {Node} [target] - The target that will listen for the events. Defaults to `this.element`.
 * @property {PartialRecord<DefaultEventNameKey, ListenerOptions>} [listenerOptions] - Custom default options to define
 * for all listeners.
 * @property {TurboEventManager} [manager] - The event manager instance the listeners should register against. Defaults
 * to `TurboEventManager.instance`.
 */
type TurboInteractorProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    manager?: TurboEventManager,
    toolName?: string,
    target?: Node,
    listenerOptions?: ListenerOptions
};

export {TurboInteractorProperties};
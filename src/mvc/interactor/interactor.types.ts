import {TurboControllerProperties} from "../logic/logic.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ListenerOptions} from "../../turboFunctions/event/event.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";
import {DefaultEventNameKey} from "../../types/eventNaming.types";
import {PartialRecord} from "../../types/basic.types";

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
 * @property {Node} [target] - The target that will listen for the events.
 * @property {PartialRecord<DefaultEventNameKey, ListenerOptions>} [listenerOptions] - Custom options to define per
 * event type.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
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
    listenerOptions?: PartialRecord<DefaultEventNameKey, ListenerOptions>
};

declare module "./interactor" {
    interface TurboInteractor {
        /**
         * @description Fired on click start
         * @param e
         */
        clickStart(e: Event): boolean | any;

        /**
         * @description Fired on click
         * @param e
         */
        click(e: Event): boolean | any;

        /**
         * @description Fired on click end
         * @param e
         */
        clickEnd(e: Event): boolean | any;

        /**
         * @description Fired on pointer move
         * @param e
         */
        move(e: Event): boolean | any;

        /**
         * @description Fired on drag start
         * @param e
         */
        dragStart(e: Event): boolean | any;

        /**
         * @description Fired on drag
         * @param e
         */
        drag(e: Event): boolean | any;

        /**
         * @description Fired on drag end
         * @param e
         */
        dragEnd(e: Event): boolean | any;

        input(e: Event): boolean | any;

        focus(e: Event): boolean | any;

        blur(e: Event): boolean | any;
    }
}
export {TurboInteractorProperties};
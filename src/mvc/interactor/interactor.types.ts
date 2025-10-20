import {TurboControllerProperties} from "../logic/logic.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {PartialRecord} from "../../core.types";
import {DefaultEventNameKey} from "../../eventHandling/eventNaming";
import {ListenerOptions} from "../../turboFunctions/event/event.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";

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
        clickStart(e: Event): boolean | void;

        /**
         * @description Fired on click
         * @param e
         */
        click(e: Event): boolean | void;

        /**
         * @description Fired on click end
         * @param e
         */
        clickEnd(e: Event): boolean | void;

        /**
         * @description Fired on pointer move
         * @param e
         */
        move(e: Event): boolean | void;

        /**
         * @description Fired on drag start
         * @param e
         */
        dragStart(e: Event): boolean | void;

        /**
         * @description Fired on drag
         * @param e
         */
        drag(e: Event): boolean | void;

        /**
         * @description Fired on drag end
         * @param e
         */
        dragEnd(e: Event): boolean | void;

        input(e: Event): boolean | void;

        focus(e: Event): boolean | void;

        blur(e: Event): boolean | void;
    }
}
export {TurboInteractorProperties};
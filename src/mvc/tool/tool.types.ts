import {TurboControllerProperties} from "../logic/logic.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEmitter} from "../core/emitter";
import {DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {Turbo} from "../../turboFunctions/turboFunctions.types";

type TurboToolProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    manager?: TurboEventManager,
    toolName?: string,
    embeddedTarget?: Node,
    activationEvent?: DefaultEventNameEntry,
    clickMode?: ClickMode,
    key?: string,
};

declare module "./tool" {
    interface TurboTool {
        customActivation(element: Turbo, manager: TurboEventManager): void,
        onActivation(): void;
        onDeactivation(): void;

        /**
         * @description Fired on click start
         * @param e
         * @param target
         */
        clickStart(e: Event, target: Node): boolean;

        /**
         * @description Fired on click
         * @param e
         * @param target
         */
        click(e: Event, target: Node): boolean;

        /**
         * @description Fired on click end
         * @param e
         * @param target
         */
        clickEnd(e: Event, target: Node): boolean;

        /**
         * @description Fired on pointer move
         * @param e
         * @param target
         */
        move(e: Event, target: Node): boolean;

        /**
         * @description Fired on drag start
         * @param e
         * @param target
         */
        dragStart(e: Event, target: Node): boolean;

        /**
         * @description Fired on drag
         * @param e
         * @param target
         */
        drag(e: Event, target: Node): boolean;

        /**
         * @description Fired on drag end
         * @param e
         * @param target
         */
        dragEnd(e: Event, target: Node): boolean;
    }
}

export {TurboToolProperties};
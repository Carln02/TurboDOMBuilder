import {TurboControllerProperties} from "../logic/logic.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {Turbo} from "../../turboFunctions/turboFunctions.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";

/**
 * @type {TurboToolProperties}
 * @extends TurboControllerProperties
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboTool} attached to an element.
 * @property {string} [toolName] - The name of the tool.
 * @property {Node} [embeddedTarget] - If the tool is embedded, its target.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to. Defaults to the
 * default click event name.
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
 * @property {(element: Turbo<Element>, manager: TurboEventManager) => void} [customActivation] - Custom activation
 * function. If provided, is called with `(el, manager)` to define when the tool is activated.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
 * to `TurboEventManager.instance`.
 */
type TurboToolProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    toolName?: string,
    embeddedTarget?: Node,
    onActivate?: () => void,
    onDeactivate?: () => void,
    activationEvent?: DefaultEventNameEntry,
    clickMode?: ClickMode,
    customActivation?: (element: Turbo<Element>, manager: TurboEventManager) => void,
    key?: string,
    manager?: TurboEventManager,
};

declare module "./tool" {
    interface TurboTool {
        /**
         * @function customActivation
         * @description Custom activation function.
         * @param {Turbo<Element>} element - The tool element itself.
         * @param {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
         * to `TurboEventManager.instance`.
         */
        customActivation(element: Turbo<Element>, manager: TurboEventManager): void;

        /**
         * @function onActivate
         * @description Function to execute when the tool is activated.
         */
        onActivate(): void;

        /**
         * @function onDeactivate
         * @description Function to execute when the tool is deactivated.
         */
        onDeactivate(): void;

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

        input(e: Event, target: Node): boolean;

        focus(e: Event, target: Node): boolean;

        blur(e: Event, target: Node): boolean;
    }
}

export {TurboToolProperties};
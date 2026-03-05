import {TurboControllerProperties} from "../logic/logic.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {Turbo} from "../../turboFunctions/turboFunctions.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";
import {MakeToolOptions} from "../../turboFunctions/tool/tool.types";

/**
 * @type {TurboToolProperties}
 * @group MVC
 * @category Tool
 *
 * @extends TurboControllerProperties
 * @extends MakeToolOptions
 *
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboTool} attached to an element.
 * @property {string} [toolName] - The name of the tool.
 * @property {Node} [embeddedTarget] - If the tool is embedded, its target.
 */
type TurboToolProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & MakeToolOptions & {
    toolName?: string,
    embeddedTarget?: Node
};

declare module "./tool" {
    interface TurboTool<ElementType extends object = object> {
        /**
         * @function customActivation
         * @description Custom activation function.
         * @param {Turbo<Element>} element - The tool element itself.
         * @param {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
         * to `TurboEventManager.instance`.
         */
        customActivation(element: ElementType, manager?: TurboEventManager): void;

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
    }
}

export {TurboToolProperties};
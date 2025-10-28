import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEmitter} from "../core/emitter";
import {TurboToolProperties} from "./tool.types";
import {TurboController} from "../logic/controller";
import {DefaultEventName, DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {$} from "../../turboFunctions/turboFunctions";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";

/**
 * @class TurboTool
 * @extends TurboController
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 * @description Class representing a tool in MVC, bound to the provided element.
 */
class TurboTool<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the tool. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the tool's class name is MyElementSomethingTool, the key would
     * default to "something".
     */
    public declare keyName: string;

    /**
     * @description The name of the tool.
     */
    public toolName: string;

    /**
     * @readonly
     * @description The target of this tool. If defined, will embed the tool.
     */
    public readonly embeddedTarget: Node;

    /**
     * @readonly
     * @description The associated event manager. Defaults to `TurboEventManager.instance`.
     */
    public readonly manager: TurboEventManager;

    /**
     * @readonly
     * @description Custom activation event to listen to. Defaults to the default click event name.
     */
    public readonly activationEvent: DefaultEventNameEntry = DefaultEventName.click;

    /**
     * @readonly
     * @description Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
     */
    public readonly clickMode: ClickMode = ClickMode.left;

    /**
     * @readonly
     * @description Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
     */
    public readonly key: string;

    public constructor(properties: TurboToolProperties<ElementType, ViewType, ModelType, EmitterType>) {
        super(properties);
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        if (properties.embeddedTarget) this.embeddedTarget = properties.embeddedTarget;

        if (properties.onActivate) this.onActivate = properties.onActivate;
        if (properties.onDeactivate) this.onDeactivate = properties.onDeactivate;
        if (properties.activationEvent) this.activationEvent = properties.activationEvent;
        if (properties.clickMode) this.clickMode = properties.clickMode;
        if (properties.customActivation) this.customActivation = properties.customActivation;
        if (properties.key) this.key = properties.key;
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
    }

    /**
     * @function initialize
     * @override
     * @description Initialization function that calls {@link makeTool} on `this.element`, sets it up, and attaches
     * all the defined tool behaviors.
     */
    public initialize(): void {
        super.initialize();
        if (!this.toolName) return;

        $(this).makeTool(this.toolName, {
            onActivate: typeof this.onActivate === "function" ? this.onActivate.bind(this) : undefined,
            onDeactivate: typeof this.onDeactivate === "function" ? this.onDeactivate.bind(this) : undefined,
            activationEvent: this.activationEvent,
            clickMode: this.clickMode,
            customActivation: typeof this.customActivation === "function" ? this.customActivation.bind(this) : undefined,
            key: this.key,
            manager: this.manager,
        });

        if (this.embeddedTarget) $(this).embedTool(this.embeddedTarget, this.manager);

        for (const [methodName, eventName] of Object.entries(DefaultEventName)) {
            const handler = this[methodName];
            if (typeof handler !== "function") continue;
            $(this).addToolBehavior(eventName, (e, target) => handler.call(this, e, target), this.toolName, this.manager);
        }
    }
}

export {TurboTool};
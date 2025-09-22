import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEmitter} from "../core/emitter";
import {TurboToolProperties} from "./tool.types";
import {TurboController} from "../logic/controller";
import {DefaultEventName, DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {$} from "../../turboFunctions/turboFunctions";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";

class TurboTool<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the tool. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the tool's class name is MyElementSomethingTool, the key would
     * default to "something".
     */
    public declare keyName: string;

    public toolName: string;

    public readonly embeddedTarget: Node;

    public readonly manager: TurboEventManager;

    public readonly activationEvent: DefaultEventNameEntry;

    public readonly clickMode: ClickMode;

    public readonly key: string;

    public constructor(properties: TurboToolProperties<ElementType, ViewType, ModelType, EmitterType>) {
        super(properties);
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        if (properties.embeddedTarget) this.embeddedTarget = properties.embeddedTarget;
        if (properties.key) this.key = properties.key;
        if (properties.clickMode) this.clickMode = properties.clickMode;
        if (properties.activationEvent) this.activationEvent = properties.activationEvent;
    }

    public initialize(): void {
        super.initialize();
        if (!this.toolName) return;

        $(this).makeTool(this.toolName, {
            clickMode: this.clickMode,
            key: this.key,
            activationEvent: this.activationEvent,
            onActivation: typeof this["onActivate"] === "function" ? this["onActivate"] : undefined,
            onDeactivation: typeof this["onDeactivate"] === "function" ? this["onDeactivate"] : undefined,
            customActivation: typeof this["customActivation"] === "function" ? this["customActivation"] : undefined,
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
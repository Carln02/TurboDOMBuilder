import {TurboModel} from "../core/model";
import {TurboInteractorProperties} from "./interactor.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboView} from "../core/view";
import {DefaultEventName, DefaultEventNameKey} from "../../eventHandling/eventNaming";
import {$} from "../../turboFunctions/turboFunctions";
import {PartialRecord} from "../../core.types";
import {ListenerOptions} from "../../turboFunctions/event/event.types";
import {TurboEmitter} from "../core/emitter";
import {TurboController} from "../logic/controller";

class TurboInteractor<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the interactor. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the interactor's class name is MyElementSomethingInteractor, the key would
     * default to "something".
     */
    public declare keyName: string;

    public readonly target: Node;

    public readonly toolName: string;

    public readonly manager: TurboEventManager;

    protected readonly options: PartialRecord<DefaultEventNameKey, ListenerOptions>;

    public constructor(properties: TurboInteractorProperties<ElementType, ViewType, ModelType, EmitterType>) {
       super(properties);
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        this.options = properties.listenerOptions ?? {};

        const host = this.element as any;
        this.target = this.target ?? host instanceof Node ? host
            : host?.element instanceof Node ? host.element
                : undefined;
    }

    public initialize(): void {
        const target = this.target ?? this;
        for (const [methodName, eventName] of Object.entries(DefaultEventName)) {
            const handler = this[methodName];
            if (typeof handler !== "function") continue;

            const options = this.options?.[methodName];
            if (this.toolName) $(target).onTool(eventName, this.toolName, e => handler.call(this, e), options, this.manager);
            else $(target).on(eventName, e => handler.call(this, e), options, this.manager);
        }
    }
}

export {TurboInteractor};
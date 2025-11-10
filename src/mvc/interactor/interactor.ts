import {TurboModel} from "../core/model";
import {TurboInteractorProperties} from "./interactor.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboView} from "../core/view";
import {$} from "../../turboFunctions/turboFunctions";
import {ListenerOptions} from "../../turboFunctions/event/event.types";
import {TurboEmitter} from "../core/emitter";
import {TurboController} from "../logic/controller";
import {DefaultEventName, DefaultEventNameKey} from "../../types/eventNaming.types";
import {PartialRecord} from "../../types/basic.types";

/**
 * @class TurboInteractor
 * @group MVC
 * @category Interactor
 *
 * @extends TurboController
 * @template {object} ElementType - The type of the main component.
 * @template {TurboView} ViewType - The element's MVC view type.
 * @template {TurboModel} ModelType - The element's MVC model type.
 * @template {TurboEmitter} EmitterType - The element's MVC emitter type.
 * @description Class representing an MVC interactor. It holds event listeners to set up on the element itself, or
 * the custom defined target.
 */
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

    /**
     * @description The target of the event listeners. Defaults to the element itself.
     */
    public accessor target: Node;

    /**
     * @readonly
     * @description The name of the tool (if any) to listen for.
     */
    public readonly toolName: string;

    /**
     * @readonly
     * @description The associated event manager. Defaults to `TurboEventManager.instance`.
     */
    public readonly manager: TurboEventManager;

    /**
     *
     * @readonly
     * @description Optional custom options to define per event type.
     */
    public readonly options: PartialRecord<DefaultEventNameKey, ListenerOptions>;

    public constructor(properties: TurboInteractorProperties<ElementType, ViewType, ModelType, EmitterType>) {
       super(properties);
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        this.options = properties.listenerOptions ?? {};

        const host = this.element as any;
        this.target = properties.target ?? this.target ?? host instanceof Node ? host
            : host?.element instanceof Node ? host.element
                : undefined;
    }

    /**
     * @function initialize
     * @description Initialization function that sets up all the defined evnt listeners and attaches them to the target.
     */
    public initialize(): void {
        super.initialize();
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
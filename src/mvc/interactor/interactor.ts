import {TurboModel} from "../core/model";
import {TurboInteractorProperties} from "./interactor.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboView} from "../core/view";
import {TurboEmitter} from "../core/emitter";
import {TurboController} from "../logic/controller";
import {ListenerOptions} from "../../turboFunctions/listener/listener.types";

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
    public readonly options: ListenerOptions;

    public constructor(properties: TurboInteractorProperties<ElementType, ViewType, ModelType, EmitterType>) {
       super(properties);
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        this.options = properties.listenerOptions ?? {};

        const host = this.element as any;
        this.target = properties.target ?? this.target ?? host instanceof Node ? host
            : host?.element instanceof Node ? host.element
                : undefined;
        this.setup();
    }
}

export {TurboInteractor};
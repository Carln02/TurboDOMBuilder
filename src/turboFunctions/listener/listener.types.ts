import {Propagation} from "../event/event.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";

type ListenerProperties<
    TargetType extends Node = Node,
    CallbackType extends ListenerCallback<TargetType> = ListenerCallback<TargetType>
> = {
    type: string,
    callback: CallbackType,

    target?: TargetType,
    toolName?: string,
    options?: ListenerOptions,
    manager?: TurboEventManager
};

type MatchListenerProperties<
    TargetType extends Node = Node,
    CallbackType extends ListenerCallback<TargetType> = ListenerCallback<TargetType>
> = Partial<ListenerProperties<TargetType, CallbackType>> & {
    optionsToSkip?: string[]
};

type ListenerCallback<Type extends Node = Node> = ((e: Event, el: Type) => Propagation | any);

/**
 * @group Types
 * @category Event
 */
type ListenerOptions = AddEventListenerOptions & {
    checkSubstrates?: boolean,
    solveSubstrates?: boolean,
    throttleEveryFrames?: number,
    throttleEveryMs?: number,
};

export {ListenerProperties, ListenerOptions, ListenerCallback, MatchListenerProperties};
import {Propagation} from "../event/event.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";

type ListenerProperties<Type extends Node = Node> = {
    type: string,
    callback: ListenerCallback<Type>,

    target?: Type,
    toolName?: string,
    options?: ListenerOptions,
    manager?: TurboEventManager
};

type MatchListenerProperties<Type extends Node = Node> = Partial<ListenerProperties<Type>>;

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
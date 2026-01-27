import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {Propagation} from "../event/event.types";
import {ListenerCallback, ListenerOptions, ListenerProperties, MatchListenerProperties} from "./listener.types";

class Listener<Type extends Node = Node> {
    public readonly type: string;
    public target: Type;
    public readonly toolName: string;

    public readonly callback: ListenerCallback<Type>;
    public readonly bundledListener: ((e: Event) => Propagation | any);

    public readonly options: ListenerOptions;
    public readonly manager: TurboEventManager;

    public lastExecutionFrame: number;
    public lastExecutionTime: number;

    public constructor(properties: ListenerProperties<Type>) {
        this.type = properties.type;
        this.target = properties.target;
        this.toolName = properties.toolName;

        this.callback = properties.callback;
        this.bundledListener = (e: Event) => this.callback(e, this.target);

        this.options = properties.options ?? {};
        this.manager = properties.manager ?? TurboEventManager.instance;
    }

    public execute(e: Event): Propagation {
        return this.bundledListener(e);
    }

    public executeOn(e: Event, target: Type) {
        return this.callback(e, target);
    }

    public match(properties: MatchListenerProperties = {}) {
        for (const [key, value] of Object.entries(properties)) {
            if (value === undefined) continue;
            if (typeof value === "object") {
                if (typeof this[key] !== "object") return false;
                for (const [subKey, subValue] of Object.entries(value)) {
                    if (subValue === undefined) continue;
                    if (this[key][subKey] !== subValue) return false;
                }
            }
            if (this[key] !== value) return false;
        }
        return true;
    }
}

export {Listener};
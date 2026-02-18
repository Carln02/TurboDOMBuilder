import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {Propagation} from "../event/event.types";
import {ListenerCallback, ListenerOptions, ListenerProperties, MatchListenerProperties} from "./listener.types";
import {TurboSelector} from "../turboSelector";

class Listener<
    TargetType extends Node = Node,
    CallbackType extends ListenerCallback<TargetType> = ListenerCallback<TargetType>
> {
    public readonly type: string;
    public target: TargetType;
    public readonly toolName: string;

    public readonly callback: CallbackType;
    public readonly bundledListener: ((e: Event) => Propagation | any);

    public readonly options: ListenerOptions;
    public readonly manager: TurboEventManager;

    public lastExecutionFrame: number;
    public lastExecutionTime: number;

    public constructor(properties: ListenerProperties<TargetType, CallbackType>) {
        if (properties.target instanceof TurboSelector) properties.target = properties.target.element;
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

    public executeOn(e: Event, target: TargetType, ...args: any[]) {
        return (this.callback as any)(e, target, ...args);
    }

    public match(properties: MatchListenerProperties = {}) {
        for (let [key, value] of Object.entries(properties)) {
            if (key === "target" && value instanceof TurboSelector) value = value.element;
            if (value === undefined || key === "optionsToSkip") continue;
            if (typeof value === "object") {
                if (typeof this[key] !== "object") return false;
                for (const [subKey, subValue] of Object.entries(value)) {
                    if (key === "options" && properties.optionsToSkip?.includes(subKey)) continue;
                    if (subValue === undefined) continue;
                    if (this[key][subKey] !== subValue) return false;
                }
                continue;
            }
            if (this[key] !== value) return false;
        }
        return true;
    }
}

export {Listener};
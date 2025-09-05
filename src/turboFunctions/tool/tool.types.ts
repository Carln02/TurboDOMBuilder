import {DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";

declare module "../turboFunctions" {
    interface TurboSelector {
        readonly onToolActivation: Delegate<() => void>;
        readonly onToolDeactivation: Delegate<() => void>;

        makeTool(toolName: string, toolManager: TurboEventManager): void;

        addBehavior(eventName: DefaultEventNameEntry, callback: (event: Event, target: Element) => void): void;

        embedTool(toolName: string, target: Element, toolManager: TurboEventManager): void;

        applyTool(target: Element, eventType: string, event: Event, toolManager: TurboEventManager): boolean;
    }
}

export {};
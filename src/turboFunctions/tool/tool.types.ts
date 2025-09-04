import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {DefaultEventNameEntry} from "../../eventHandling/eventNaming";

declare module "../turboFunctions" {
    interface TurboSelector {
        makeTool(toolName: string, toolManager: TurboEventManager): void;

        addBehavior(eventName: DefaultEventNameEntry, callback: (event: Event, target: Element) => void): void;

        embedTool(toolName: string, target: Element, toolManager: TurboEventManager): void;
    }
}

export {};
import {DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {Turbo} from "../turboFunctions.types";

type MakeToolOptions = {
    activationEvent?: DefaultEventNameEntry,
    clickMode?: ClickMode,
    activateOn?: ((el: Turbo, manager: TurboEventManager) => void),
    key?: string,
    manager?: TurboEventManager
};

declare module "../turboFunctions" {
    interface TurboSelector {
        readonly onToolActivation: Delegate<() => void>;
        readonly onToolDeactivation: Delegate<() => void>;

        makeTool(toolName: string, options?: MakeToolOptions): void;

        isTool(manager?: TurboEventManager): boolean;

        getToolName(manager?: TurboEventManager): string;

        addToolBehavior(eventName: DefaultEventNameEntry, callback: (event: Event, target: Node) => void, manager?: TurboEventManager): void;

        hasToolBehavior(eventName: DefaultEventNameEntry, manager?: TurboEventManager): boolean;

        applyTool(target: Node, eventType: string, event: Event, manager?: TurboEventManager): boolean;

        embedTool(toolName: string, target: Node, manager?: TurboEventManager): void;

        isEmbeddedTool(manager?: TurboEventManager): boolean;

        getEmbeddedToolTarget(manager?: TurboEventManager): Node;
    }
}

export {MakeToolOptions};
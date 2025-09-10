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

type ToolBehaviorCallback = (event: Event, target: Node, options?: any) => boolean;

type ToolBehaviorOptions = {
    isEmbedded?: boolean,
    embeddedTarget?: Node,//TODO
}

declare module "../turboFunctions" {
    interface TurboSelector {
        readonly onToolActivation: Delegate<() => void>;
        readonly onToolDeactivation: Delegate<() => void>;

        /*
         *
         *
         * Basic tool manipulation
         *
         *
         */

        makeTool(toolName: string, options?: MakeToolOptions): void;

        isTool(manager?: TurboEventManager): boolean;

        getToolNames(manager?: TurboEventManager): string[];

        getToolName(manager?: TurboEventManager): string;

        /*
         *
         *
         * Tool behavior manipulation
         *
         *
         */

        addToolBehavior(type: string, callback: ToolBehaviorCallback, toolName?: string,
                        manager?: TurboEventManager): void;

        hasToolBehavior(type: string, toolName?: string, manager?: TurboEventManager): boolean;

        removeToolBehaviors(type: string, toolName?: string, manager?: TurboEventManager): void;

        applyTool(toolName: string, type: string, event: Event, manager?: TurboEventManager): boolean;

        /*
         *
         *
         * Embedded tool manipulation
         *
         *
         */

        embedTool(target: Node, manager?: TurboEventManager): void;

        isEmbeddedTool(manager?: TurboEventManager): boolean;

        getEmbeddedToolTarget(manager?: TurboEventManager): Node;
    }
}

export {MakeToolOptions, ToolBehaviorCallback, ToolBehaviorOptions};
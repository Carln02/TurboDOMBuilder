import {TurboEventManagerModel} from "../turboEventManager.model";
import {TurboEventManager} from "../turboEventManager";
import {ClickMode} from "../turboEventManager.types";
import {TurboEvent} from "../../events/turboEvent";
import {TurboRawEventProperties} from "../../events/turboEvent.types";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {TurboOperator} from "../../../mvc/operator/operator";
import {TurboKeyEventName, TurboMoveEventName} from "../../../types/eventNaming.types";
import {TurboDragEvent} from "../../events/turboDragEvent";
import {Propagation} from "../../../turboFunctions/event/event.types";

export class TurboEventManagerDispatchOperator extends TurboOperator<TurboEventManager, any, TurboEventManagerModel> {
    public keyName: string = "dispatch";

    private boundHooks: Map<string, (e: Event) => void> = new Map();

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.emitter.add("dispatchEvent", this.dispatchEvent);
    }

    protected dispatchEvent = <
        EventType extends TurboEvent = TurboEvent,
        PropertiesType extends TurboRawEventProperties = TurboRawEventProperties
    >(target: Node, eventType: new (properties: PropertiesType) => EventType, properties: Partial<PropertiesType>) => {
        if (!target) return;
        properties.keys = this.model.currentKeys;
        properties.toolName = this.element.getCurrentToolName(this.model.currentClick) as string;
        properties.clickMode = this.model.currentClick;
        properties.inputDevice = this.model.inputDevice;
        properties.eventManager = this.element;
        properties.eventInitDict = {bubbles: true, cancelable: true, composed: true};

        properties.authorizeScaling = this.element.authorizeEventScaling;
        properties.scalePosition = this.element.scaleEventPosition;

        if (properties.eventName === TurboKeyEventName.keyPressed) this.element.setToolByKey(properties["keyPressed"]);
        else if (properties.eventName === TurboKeyEventName.keyReleased) this.element.setTool(undefined, ClickMode.key, {select: false});

        target.dispatchEvent(new eventType(properties as PropertiesType));
    }

    private getToolHandlingCallback(type: string, e: Event) {
        const toolName = this.element.getCurrentToolName(this.model.currentClick);

        // For move events, composedPath() is the drag-origin's ancestor chain and never
        // includes non-topmost components at the current cursor (e.g. Playback behind
        // ClipRenderer). Use the full z-stack at the cursor instead, dispatching topmost-first
        // and stopping at the first handler that returns non-propagate.
        if (type === TurboMoveEventName.move && e instanceof TurboDragEvent && e.position) {
            const {x, y} = e.position;
            const stack = document.elementsFromPoint?.(x, y) ?? [];
            for (const el of stack) {
                if (!(el instanceof Node)) continue;
                const propagate = turbo(el as Node).executeAction(type, toolName, e, undefined, this.element);
                if (propagate !== Propagation.propagate) break;
            }
            return;
        }

        const path = e.composedPath?.() || [];

        for (let i = path.length - 1; i >= 0; i--) {
            if (!(path[i] instanceof Node)) continue;
            const propagate = turbo(path[i] as Node).executeAction(type, toolName, e, {capture: true}, this.element);
            if (propagate !== Propagation.propagate) {
                e.stopPropagation();
                break;
            }
        }

        for (let i = 0; i < path.length; i++) {
            if (!(path[i] instanceof Node)) continue;
            const propagate = turbo(path[i] as Node).executeAction(type, toolName, e, undefined, this.element);
            if (propagate !== Propagation.propagate) {
                e.stopPropagation();
                break;
            }
        }
    }

    public setupCustomDispatcher(type: string): void {
        if (this.boundHooks.has(type)) return;
        const hook = (e: Event) => this.getToolHandlingCallback(type, e);
        this.boundHooks.set(type, hook);
        document.addEventListener(type, hook, {capture: true});
    }

    public removeCustomDispatcher(type: string): void {
        const hook = this.boundHooks.get(type);
        if (!hook) return;
        document.removeEventListener(type, hook, {capture: true});
        this.boundHooks.delete(type);
    }
}

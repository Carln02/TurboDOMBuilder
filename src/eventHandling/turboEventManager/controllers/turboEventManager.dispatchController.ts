import {TurboController} from "../../../turboElement/mvc/turboController";
import {TurboEventManagerModel} from "../turboEventManager.model";
import {TurboEventManager} from "../turboEventManager";
import {ClickMode} from "../turboEventManager.types";
import {TurboEvent} from "../../events/turboEvent";
import {TurboRawEventProperties} from "../../events/turboEvent.types";
import {TurboKeyEventName} from "../../eventNaming";
import {$} from "../../../turboFunctions/turboFunctions";

export class TurboEventManagerDispatchController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
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
        properties.keys = this.model.currentKeys;
        properties.toolName = this.element.getCurrentToolName(this.model.currentClick) as string;
        properties.clickMode = this.model.currentClick;
        properties.eventManager = this.element;
        properties.eventInitDict = {bubbles: true, cancelable: true, composed: true};

        properties.authorizeScaling = this.element.authorizeEventScaling;
        properties.scalePosition = this.element.scaleEventPosition;

        if (properties.eventName === TurboKeyEventName.keyPressed) this.element.setToolByKey(properties["keyPressed"]);
        else if (properties.eventName === TurboKeyEventName.keyReleased) this.element.setTool(undefined, ClickMode.key, {select: false});

        target.dispatchEvent(new eventType(properties as PropertiesType));
    }

    private getToolHandlingCallback(type: string, e: Event) {
        return () => {
            const toolName = this.element.getCurrentToolName(this.model.currentClick);
            const tool = this.element.getCurrentTool(this.model.currentClick);
            if (!tool || !$(tool).hasToolBehavior(type)) return;

            const path = e.composedPath?.() || [];

            for (let i = path.length - 1; i >= 0; i--) {
                if (!(path[i] instanceof Node)) continue;
                if ($(path[i] as Node).executeAction(type, toolName, e, {capture: true}, this.element)) {
                    e.stopPropagation();
                    break;
                }
            }

            for (let i = 0; i < path.length; i++) {
                if (!(path[i] instanceof Node)) continue;
                if ($(path[i] as Node).executeAction(type, toolName, e, undefined, this.element)) {
                    e.stopPropagation();
                    break;
                }
            }
        };
    }

    public setupCustomDispatcher(type: string): void {
        if (this.boundHooks.has(type)) return;
        const hook = (e: Event) => this.getToolHandlingCallback(type, e);
        this.boundHooks.set(type, hook);
        $(document).on(type, hook, {capture: true});
    }

    public removeCustomDispatcher(type: string): void {
        const hook = this.boundHooks.get(type);
        if (!hook) return;
        $(document).removeListener(type, hook);
        this.boundHooks.delete(type);
    }
}
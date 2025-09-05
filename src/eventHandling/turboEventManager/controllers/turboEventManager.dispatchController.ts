import {TurboController} from "../../../turboElement/mvc/turboController";
import {TurboEventManagerModel} from "../turboEventManager.model";
import {TurboEventManager} from "../turboEventManager";
import {ClickMode} from "../turboEventManager.types";
import {TurboEvent} from "../../events/turboEvent";
import {TurboRawEventProperties} from "../../events/turboEvent.types";
import {TurboEventNameEntry, TurboKeyEventName} from "../../eventNaming";
import {$} from "../../../turboFunctions/turboFunctions";

export class TurboEventManagerDispatchController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    private boundHooks: Map<TurboEventNameEntry, (e: TurboEvent) => void> = new Map();

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.emitter.add("dispatchEvent", this.dispatchEvent);
    }

    protected dispatchEvent<
        EventType extends TurboEvent = TurboEvent,
        PropertiesType extends TurboRawEventProperties = TurboRawEventProperties
    >(target: Node, eventType: new (properties: PropertiesType) => EventType, properties: Partial<PropertiesType>) {
        properties.keys = this.model.currentKeys;
        properties.toolName = this.element.getToolName(this.model.currentClick) as string;
        properties.clickMode = this.model.currentClick;
        properties.eventManager = this.element;
        properties.eventInitDict = {bubbles: true, cancelable: true, composed: true};

        properties.authorizeScaling = this.element.authorizeEventScaling;
        properties.scalePosition = this.element.scaleEventPosition;

        if (properties.eventName === TurboKeyEventName.keyPressed) this.element.setToolByKey(properties["keyPressed"]);
        else if (properties.eventName === TurboKeyEventName.keyReleased) this.element.setTool(null, ClickMode.key, {select: false});

        target.dispatchEvent(new eventType(properties as PropertiesType));
    }

    public hookToolHandling(type: TurboEventNameEntry): void {
        if (this.boundHooks.has(type)) return;
        const hook = (e: Event) => {
            const path = e.composedPath?.() || [];
            const targetEl = path.find(n => n instanceof Element) as Element;
            if (!targetEl) return;

            $(targetEl).on(type, (e: Event) =>
                this.recurInteractionCheck(targetEl, type, e, this.element.getToolName()),
                null, {capture: true, once: true});
        };

        this.boundHooks.set(type, hook);
        $(document).on(type, hook, document, {capture: true});
    }

    public unhookToolHandling(type: TurboEventNameEntry): void {
        const hook = this.boundHooks.get(type);
        if (!hook) return;
        $(document).removeListener(type, hook, {capture: true});
        this.boundHooks.delete(type);
    }

    private recurInteractionCheck(element: Element, eventType: string, event: Event, toolName?: string) {
        if (!element) return;
        const el = $(element);
        if (el.hasListenersByType(eventType, toolName)) return;
        if (toolName && $(this.element.getToolByName(toolName))?.applyTool(element, eventType, event, this.element)) {
            event.stopPropagation();
            return;
        }
        if (el.hasListenersByType(eventType)) return;
        this.recurInteractionCheck(element.parentElement, eventType, event, toolName);
    }
}
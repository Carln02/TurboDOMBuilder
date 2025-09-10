import {$, TurboSelector} from "../turboFunctions";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {ListenerEntry, ListenerOptions} from "./event.types";

export class EventFunctionsUtils {
    private dataMap = new WeakMap<Node, Record<string, any>>;

    public data(element: Node) {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {};
        if (!this.dataMap.has(element)) this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }

    public getSingleListeners(element: Node, manager: TurboEventManager) {
        if (!this.data(element).managers) this.data(element).managers = new WeakMap<TurboEventManager, Record<string, any>>();
        const managers = this.data(element).managers;
        if (!managers.get(manager)) managers.set(manager, {});
        return managers.get(manager);
    }

    public getPreventDefaultListeners(element: Node): Record<string, (e: Event) => void> {
        let map = this.data(element).preventDefaultListeners;
        if (!map) {
            map = {};
            this.data(element).preventDefaultListeners = map;
        }
        return map;
    }

    public bypassManager(element: Element, eventManager: TurboEventManager,
                           bypassResults: boolean | TurboEventManagerStateProperties) {
        if (typeof bypassResults == "boolean") eventManager.lock(element, {
            enabled: bypassResults,
            preventDefaultWheel: bypassResults,
            preventDefaultMouse: bypassResults,
            preventDefaultTouch: bypassResults
        });

        else eventManager.lock(element, {
            enabled: bypassResults.enabled ?? false,
            preventDefaultWheel: bypassResults.preventDefaultWheel ?? false,
            preventDefaultMouse: bypassResults.preventDefaultMouse ?? false,
            preventDefaultTouch: bypassResults.preventDefaultTouch ?? false,
        });
    }

    public getBoundListenersSet(element: Node, type: string): Set<ListenerEntry> {
        const selector = element instanceof TurboSelector ? element : $(element);
        let set = selector.boundListeners?.get(type);
        if (!set) {
            set = new Set();
            selector.boundListeners.set(type, set);
        }
        return set;
    }

    public getBoundListeners(element: Node, type: string, toolName: string, options?: ListenerOptions,
                             manager: TurboEventManager = TurboEventManager.instance): ListenerEntry[] {
        if (!options) options = {};
            return [...this.getBoundListenersSet(element, type).values()].
            filter(entry => entry.manager === manager && (entry.toolName === toolName || !toolName))
            .filter(entry => {
                for (const [option, value] of Object.entries(options)) {
                    if (entry.options[option] !== value) return false;
                }
                return true;
            });
    }
}
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {Propagation, ListenerEntry, ListenerOptions} from "./event.types";
import {TurboSelector} from "../turboSelector";

export class EventFunctionsUtils {
    private dataMap = new WeakMap<Node, Record<string, any>>;

    public data(element: Node) {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {};
        if (!this.dataMap.has(element)) this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }

    public getBoundListenersSet(element: Node): Set<ListenerEntry> {
        let set = this.data(element).boundListeners;
        if (!set) {
            set = new Set();
            this.data(element).boundListeners = set;
        }
        return set;
    }

    public getPreventDefaultListeners(element: Node): Record<string, (e: Event) => boolean> {
        let map = this.data(element).preventDefaultListeners;
        if (!map) {
            map = {};
            this.data(element).preventDefaultListeners = map;
        }
        return map;
    }

    public bypassManager(element: Node, eventManager: TurboEventManager,
                         bypassResults: boolean | TurboEventManagerStateProperties) {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return;
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

    public getBoundListeners(element: Node, type: string, toolName: string, options?: ListenerOptions,
                             manager: TurboEventManager = TurboEventManager.instance): ListenerEntry[] {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return [];
        if (!options) options = {};
        return [...this.getBoundListenersSet(element)]
            .filter(entry => entry.type === type && entry.manager === manager && entry.toolName === toolName)
            .filter(entry => {
                for (const [option, value] of Object.entries(options)) {
                    if (option === "checkSubstrates" || option === "solveSubstrates") continue;
                    if (entry.options?.[option] !== value) return false;
                }
                return true;
            });
    }

    public processPropagation(
        currentPropagation: Propagation | any,
        storedPropagation: Propagation = Propagation.propagate,
        defaultPropagation: Propagation = Propagation.stopPropagation
    ): Propagation {
        const orderedValues = [
            Propagation.propagate,
            Propagation.stopPropagation,
            Propagation.stopImmediatePropagation
        ];

        if (!orderedValues.includes(currentPropagation)) currentPropagation = defaultPropagation;
        return orderedValues.indexOf(currentPropagation) <= orderedValues.indexOf(storedPropagation)
            ? storedPropagation : currentPropagation;
    }
}
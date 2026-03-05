import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {Propagation} from "./event.types";
import {TurboSelector} from "../turboSelector";
import {Listener} from "../../turboComponents/datatypes/listener/listener";
import {MatchListenerProperties} from "../../turboComponents/datatypes/listener/listener.types";
import {ListenerSet} from "../../turboComponents/datatypes/listener/listenerSet";

type ObjectListeners = {
    boundListeners: ListenerSet,
    preventDefaultListeners: Record<string, (e: Event) => boolean>,
    preventDefaultOn?: (type: string, e: Event) => boolean
};

export class EventFunctionsUtils {
    private dataMap = new WeakMap<Node, ObjectListeners>;

    public data(element: Node): ObjectListeners {
        if (element instanceof TurboSelector) element = element.element;
        if (!element || !this.dataMap.has(element)) {
            const entry = {
                boundListeners: new ListenerSet(),
                preventDefaultListeners: {},
            };
            if (element) this.dataMap.set(element, entry);
        }
        return this.dataMap.get(element);
    }

    public getBoundListenersSet(element: Node): ListenerSet {
        let set = this.data(element).boundListeners;
        if (!set) {
            set = new ListenerSet();
            this.data(element).boundListeners = set;
        }
        return set;
    }

    public getBoundListeners(properties: MatchListenerProperties): Listener[] {
        if (!properties.target) return [];
        if (!properties.manager) properties.manager = TurboEventManager.instance;
        return this.getBoundListenersSet(properties.target).getListeners({
            ...properties,
            optionsToSkip: ["checkSubstrates", "solveSubstrates"]
        });
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

    //TODO FIX IDK
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
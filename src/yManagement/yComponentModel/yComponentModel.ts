import {YModel} from "../yModel/yModel";
import {YMap} from "yjs/dist/src/types/YMap";
import {YMapEvent} from "yjs";
import {MvcBlockKeyType} from "../../mvc/core/core.types";

/**
 * @class YComponentModel
 * @extends YModel
 * @description An MVC model that handles a Yjs map and observes changes on its direct fields, firing change
 * callbacks at the keys that changed through the emitter.
 */
class YComponentModel extends YModel<any, YMap, string> {
    protected observeChanges(event: YMapEvent, transaction: any, blockKey?: MvcBlockKeyType): void {
        event.keysChanged.forEach(key => {
            const change = event.changes.keys.get(key);
            if (!change) {
                console.warn(`No change info for key "${key}". Event:`, event);
                return;
            }
            this.fireKeyChangedCallback(key, blockKey, change?.action === "delete");
        });
    }
}

export {YComponentModel};

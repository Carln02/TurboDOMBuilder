import { TurboEvent } from "../turboEvent";
import { ClickMode } from "../../turboEventManager/turboEventManager.types";
import { TurboEventNameEntry } from "../../eventNaming";
import { Point } from "../../../utils/datatypes/point/point";
/**
 * @class TurboKeyEvent
 * @extends TurboEvent
 * @description Custom key event
 */
declare class TurboKeyEvent extends TurboEvent {
    /**
     * @description The key pressed (if any) when the event was fired
     */
    readonly keyPressed: string;
    /**
     * @description The key released (if any) when the event was fired
     */
    readonly keyReleased: string;
    constructor(keyPressed: string, keyReleased: string, clickMode: ClickMode, keys: string[], eventName?: TurboEventNameEntry, authorizeScaling?: boolean | (() => boolean), scalePosition?: (position: Point) => Point, eventInitDict?: EventInit);
}
export { TurboKeyEvent };

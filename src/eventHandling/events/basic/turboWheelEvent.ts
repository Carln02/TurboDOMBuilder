import {TurboEvent} from "../turboEvent";
import {Point} from "../../../utils/datatypes/point/point";
import {ClickMode} from "../../turboEventManager/turboEventManager.types";
import {TurboEventNameEntry} from "../../eventNaming";

/**
 * @class TurboWheelEvent
 * @extends TurboEvent
 * @description Custom wheel event
 */
class TurboWheelEvent extends TurboEvent {
    /**
     * @description The delta amount of scrolling
     */
    public readonly delta: Point;

    constructor(delta: Point, keys: string[], eventName: TurboEventNameEntry, authorizeScaling?: boolean
                    | (() => boolean), scalePosition?: (position: Point) => Point, eventInitDict?: EventInit) {
        super(null, ClickMode.none, keys, eventName, authorizeScaling, scalePosition,
            {bubbles: true, cancelable: true, ...eventInitDict});
        this.delta = delta;
    }
}

export {TurboWheelEvent};
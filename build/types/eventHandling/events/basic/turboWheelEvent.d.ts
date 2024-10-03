import { TurboEvent } from "../turboEvent";
import { Point } from "../../../utils/datatypes/point/point";
import { TurboEventNameEntry } from "../../eventNaming";
/**
 * @class TurboWheelEvent
 * @extends TurboEvent
 * @description Custom wheel event
 */
declare class TurboWheelEvent extends TurboEvent {
    /**
     * @description The delta amount of scrolling
     */
    readonly delta: Point;
    constructor(delta: Point, keys: string[], eventName: TurboEventNameEntry, authorizeScaling?: boolean | (() => boolean), scalePosition?: (position: Point) => Point, eventInitDict?: EventInit);
}
export { TurboWheelEvent };

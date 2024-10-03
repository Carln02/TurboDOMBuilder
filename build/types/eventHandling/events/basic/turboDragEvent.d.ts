import { TurboEvent } from "../turboEvent";
import { ClickMode } from "../../turboEventManager/turboEventManager.types";
import { TurboMap } from "../../../utils/datatypes/turboMap/turboMap";
import { Point } from "../../../utils/datatypes/point/point";
import { TurboEventNameEntry } from "../../eventNaming";
/**
 * @class TurboDragEvent
 * @extends TurboEvent
 * @description Turbo drag event class, fired on turbo-drag, turbo-drag-start, turbo-drag-end, etc.
 */
declare class TurboDragEvent extends TurboEvent {
    /**
     * @description Map containing the origins of the dragging points
     */
    readonly origins: TurboMap<number, Point>;
    /**
     * @description Map containing the previous positions of the dragging points
     */
    readonly previousPositions: TurboMap<number, Point>;
    /**
     * @description Map containing the positions of the dragging points
     */
    readonly positions: TurboMap<number, Point>;
    constructor(origins: TurboMap<number, Point>, previousPositions: TurboMap<number, Point>, positions: TurboMap<number, Point>, clickMode: ClickMode, keys: string[], eventName?: TurboEventNameEntry, authorizeScaling?: boolean | (() => boolean), scalePosition?: (position: Point) => Point, eventInitDict?: EventInit);
    /**
     * @description Map of the origins mapped to the current canvas translation and scale
     */
    get scaledOrigins(): TurboMap<number, Point>;
    /**
     * @description Map of the previous positions mapped to the current canvas translation and scale
     */
    get scaledPreviousPositions(): TurboMap<number, Point>;
    /**
     * @description Map of the positions mapped to the current canvas translation and scale
     */
    get scaledPositions(): TurboMap<number, Point>;
    get deltaPositions(): TurboMap<number, Point>;
    get deltaPosition(): Point;
    get scaledDeltaPositions(): TurboMap<number, Point>;
    get scaledDeltaPosition(): Point;
}
export { TurboDragEvent };

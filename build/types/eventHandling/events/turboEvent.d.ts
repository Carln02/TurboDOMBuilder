import { ClickMode } from "../turboEventManager/turboEventManager.types";
import { Point } from "../../utils/datatypes/point/point";
import { ClosestOrigin } from "./turboEvent.types";
import { TurboMap } from "../../utils/datatypes/turboMap/turboMap";
import { TurboEventNameEntry } from "../eventNaming";
/**
 * Generic turbo event
 */
declare class TurboEvent extends Event {
    /**
     * @description The click mode of the fired event
     */
    readonly clickMode: ClickMode;
    /**
     * @description The keys pressed when the event was fired
     */
    readonly keys: string[];
    /**
     * @description The screen position from where the event was fired
     */
    readonly position: Point;
    /**
     * @description Callback function (or boolean) to be overridden to specify when to allow transformation
     * and/or scaling.
     */
    authorizeScaling: boolean | (() => boolean);
    /**
     * @description Callback function to be overridden to specify how to transform a position from screen to
     * document space.
     */
    scalePosition: (position: Point) => Point;
    constructor(position: Point, clickMode: ClickMode, keys: string[], eventName: TurboEventNameEntry, authorizeScaling?: boolean | (() => boolean), scalePosition?: (position: Point) => Point, eventInitDict?: EventInit);
    /**
     * @description Returns the closest element of the provided type to the target (Searches through the element and
     * all its parents to find one of matching type).
     * @param type
     * @param strict
     * @param from
     */
    closest<T extends Element>(type: new (...args: any[]) => T, strict?: boolean, from?: ClosestOrigin): T | null;
    /**
     * @description Checks if the position is inside the given element's bounding box.
     * @param position
     * @param element
     */
    private isPositionInsideElement;
    /**
     * @description The target of the event (as an Element - or the document)
     */
    get target(): Element | Document;
    /**
     * @description The position of the fired event transformed and/or scaled using the class's scalePosition().
     */
    get scaledPosition(): Point;
    /**
     * @description Specifies whether to allow transformation and/or scaling.
     */
    get scalingAuthorized(): boolean;
    /**
     * @private
     * @description Takes a map of points and returns a new map where each point is transformed accordingly.
     * @param positions
     */
    protected scalePositionsMap(positions?: TurboMap<number, Point>): TurboMap<number, Point>;
}
export { TurboEvent };

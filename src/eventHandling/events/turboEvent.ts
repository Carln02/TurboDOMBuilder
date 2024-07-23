import {ClickMode} from "../turboEventManager/turboEventManager.types";
import {Point} from "../../utils/datatypes/point/point";
import {ClosestOrigin} from "./turboEvent.types";
import {TurboMap} from "../../utils/datatypes/turboMap/turboMap";
import {TurboEventNameEntry} from "../eventNaming";
import {cache} from "../../domBuilding/decorators/cache/cache";

/**
 * Generic turbo event
 */
class TurboEvent extends Event {
    /**
     * @description The click mode of the fired event
     */
    public readonly clickMode: ClickMode;

    /**
     * @description The keys pressed when the event was fired
     */
    public readonly keys: string[];

    /**
     * @description The screen position from where the event was fired
     */
    public readonly position: Point;

    constructor(position: Point, clickMode: ClickMode, keys: string[], eventName: TurboEventNameEntry,
                eventInitDict?: EventInit) {
        super(eventName, {bubbles: true, cancelable: true, ...eventInitDict});
        this.clickMode = clickMode;
        this.keys = keys;
        this.position = position;
    }

    /**
     * @description Returns the closest element of the provided type to the target (Searches through the element and
     * all its parents to find one of matching type).
     * @param type
     * @param strict
     * @param from
     */
    @cache()
    public closest<T extends Element>(type: new (...args: any[]) => T, strict: boolean = true,
                                      from: ClosestOrigin = ClosestOrigin.target): T | null {
        const elements = from == ClosestOrigin.target ? [this.target]
            : document.elementsFromPoint(this.position.x, this.position.y);

        for (let element of elements) {
            while (element && !((element instanceof type)
                && (!strict || this.isPositionInsideElement(this.position, element as Element))
            )) element = element.parentElement;

            if (element) return element as T;
        }
        return null;
    }

    /**
     * @description Checks if the position is inside the given element's bounding box.
     * @param position
     * @param element
     */
    private isPositionInsideElement(position: Point, element: Element): boolean {
        const rect = element.getBoundingClientRect();
        return position.x >= rect.left && position.x <= rect.right
            && position.y >= rect.top && position.y <= rect.bottom;
    }

    /**
     * @description The target of the event (as an Element - or the document)
     */
    public get target() {
        return (super.target as Element) || document;
    }

    /**
     * @description The position of the fired event transformed and/or scaled using the class's scalePosition().
     */
    @cache()
    public get scaledPosition() {
        if (!this.authorizeScaling()) return this.position;
        return this.scalePosition(this.position);
    }

    /**
     * @description Function to be overridden to specify how to transform a position from screen to document space.
     * @param position
     */
    public scalePosition(position: Point): Point {
        return position;
    }

    /**
     * @description Function to be overridden to specify when to allow transformation and/or scaling (or not).
     */
    public authorizeScaling(): boolean {
        return true;
    }

    /**
     * @private
     * @description Takes a map of points and returns a new map where each point is transformed accordingly.
     * @param positions
     */
    protected scalePositionsMap(positions?: TurboMap<number, Point>) {
        return positions.mapValues((key, position) => this.scalePosition(position));
    }
}

export {TurboEvent};
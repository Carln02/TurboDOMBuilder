import {ClickMode} from "../turboEventManager/turboEventManager.types";
import {Point} from "../../utils/datatypes/point/point";
import {ClosestOrigin, TurboEventProperties} from "./turboEvent.types";
import {TurboMap} from "../../utils/datatypes/turboMap/turboMap";
import {TurboEventNameEntry} from "../eventNaming";
import {cache} from "../../decorators/cache/cache";
import {TurboEventManager} from "../turboEventManager/turboEventManager";

/**
 * Generic turbo event
 */
class TurboEvent extends Event {
    /**
     * @description The event manager that fired this event.
     */
    public readonly eventManager: TurboEventManager;

    /**
     * @description The name of the tool (if any) associated with this event.
     */
    public readonly toolName: string;

    /**
     * @description The name of the event.
     */
    public readonly eventName: TurboEventNameEntry;

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

    /**
     * @description Callback function (or boolean) to be overridden to specify when to allow transformation
     * and/or scaling.
     */
    public authorizeScaling: boolean | (() => boolean);

    /**
     * @description Callback function to be overridden to specify how to transform a position from screen to
     * document space.
     */
    public scalePosition: (position: Point) => Point;

    public constructor(properties: TurboEventProperties) {
        super(properties.eventName, {bubbles: true, cancelable: true, ...properties.eventInitDict});

        this.eventManager = properties.eventManager ?? TurboEventManager.instance;

        this.authorizeScaling = properties.authorizeScaling ?? true;
        this.scalePosition = properties.scalePosition ?? ((position: Point) => position);

        this.clickMode = properties.clickMode ?? TurboEventManager.instance.currentClick;
        this.keys = properties.keys ?? TurboEventManager.instance.currentKeys;

        this.eventName = properties.eventName;
        this.position = properties.position;
        this.toolName = properties.toolName;
    }

    /**
     * @description The tool (if any) associated with this event.
     */
    public get tool(): Node {
        if (!this.toolName || !(this.eventManager instanceof TurboEventManager)) return null;
        return this.eventManager.getToolByName(this.toolName);
    }

    /**
     * @description Returns the closest element of the provided type to the target (Searches through the element and
     * all its parents to find one of matching type).
     * @param type
     * @param strict
     * @param from
     */
    @cache()
    public closest<T extends Element>(type: new (...args: any[]) => T, strict: Element | boolean = true,
                                      from: ClosestOrigin = ClosestOrigin.target): T | null {
        const elements = from == ClosestOrigin.target ? [this.target]
            : document.elementsFromPoint(this.position.x, this.position.y);

        const strictElement = strict instanceof Element ? strict : null;
        const isStrict = strict === true || strictElement !== null;

        for (let element of elements) {
            while (element && !((element instanceof type)
                && (!isStrict || this.isPositionInsideElement(this.position, strictElement ?? element))
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
        if (!this.scalingAuthorized) return this.position;
        return this.scalePosition(this.position);
    }

    /**
     * @description Specifies whether to allow transformation and/or scaling.
     */
    public get scalingAuthorized(): boolean {
        return typeof this.authorizeScaling == "function" ? this.authorizeScaling() : this.authorizeScaling;
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
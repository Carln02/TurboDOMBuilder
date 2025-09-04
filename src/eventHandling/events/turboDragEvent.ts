import {TurboDragEventProperties} from "./turboEvent.types";
import {TurboEvent} from "./turboEvent";
import {TurboMap} from "../../utils/datatypes/turboMap/turboMap";
import {Point} from "../../utils/datatypes/point/point";
import {cache} from "../../decorators/cache/cache";

/**
 * @class TurboDragEvent
 * @extends TurboEvent
 * @description Turbo drag event class, fired on turbo-drag, turbo-drag-start, turbo-drag-end, etc.
 */
class TurboDragEvent extends TurboEvent {
    /**
     * @description Map containing the origins of the dragging points
     */
    public readonly origins: TurboMap<number, Point>;

    /**
     * @description Map containing the previous positions of the dragging points
     */
    public readonly previousPositions: TurboMap<number, Point>;

    /**
     * @description Map containing the positions of the dragging points
     */
    public readonly positions: TurboMap<number, Point>;

    constructor(properties: TurboDragEventProperties) {
        super({...properties, position: properties.positions.first});
        this.origins = properties.origins;
        this.previousPositions = properties.previousPositions;
        this.positions = properties.positions; //TODO MOVE TO DEFAULT EVENT
    }

    /**
     * @description Map of the origins mapped to the current canvas translation and scale
     */
    @cache()
    public get scaledOrigins() {
        if (!this.scalingAuthorized) return this.origins;
        return this.scalePositionsMap(this.origins);
    }

    /**
     * @description Map of the previous positions mapped to the current canvas translation and scale
     */
    @cache()
    public get scaledPreviousPositions() {
        if (!this.scalingAuthorized) return this.previousPositions;
        return this.scalePositionsMap(this.previousPositions);
    }

    /**
     * @description Map of the positions mapped to the current canvas translation and scale
     */
    @cache()
    public get scaledPositions() {
        if (!this.scalingAuthorized) return this.positions;
        return this.scalePositionsMap(this.positions);
    }

    @cache()
    public get deltaPositions() {
        return this.positions.mapValues((key, position) => {
            const previousPosition = this.previousPositions.get(key);
            if (previousPosition) return position.sub(previousPosition);
        });
    }

    @cache()
    public get deltaPosition() {
        return Point.midPoint(...this.deltaPositions.valuesArray());
    }

    @cache()
    public get scaledDeltaPositions() {
        return this.scaledPositions.mapValues((key, position) => {
            const previousPosition = this.scaledPreviousPositions.get(key);
            if (previousPosition) return position.sub(previousPosition);
        });
    }

    @cache()
    public get scaledDeltaPosition() {
        return Point.midPoint(...this.scaledDeltaPositions.valuesArray());
    }
}

export {TurboDragEvent};
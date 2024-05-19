import {TurboEvent} from "../turboEvent";
import {ClickMode} from "../../eventManager/eventManager.types";
import {PositionsMap, TurboEventName} from "../turboEvent.types";

class TurboDragEvent extends TurboEvent {
    private _origins: PositionsMap;
    private _previousPositions: PositionsMap;
    private _positions: PositionsMap;

    constructor(origins: PositionsMap, previousPositions: PositionsMap, positions: PositionsMap,
                clickMode: ClickMode, keys: string[], eventName: TurboEventName = TurboEventName.drag, eventInitDict?: EventInit) {
        super(positions.first, clickMode, keys, eventName, {bubbles: true, cancelable: true, ...eventInitDict});

        this.origins = origins;
        this.previousPositions = previousPositions;
        this.positions = positions;
    }

    //Origins

    public get origins() {
        return this._origins;
    }

    private set origins(value: PositionsMap) {
        this._origins = value;
    }

    //Previous positions

    public get previousPositions() {
        return this._previousPositions;
    }

    private set previousPositions(value: PositionsMap) {
        this._previousPositions = value;
    }

    //Positions

    public get positions() {
        return this._positions;
    }

    private set positions(value: PositionsMap) {
        this._positions = value;
    }
}

export {TurboDragEvent};
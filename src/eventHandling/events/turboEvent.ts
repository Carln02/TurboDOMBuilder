import {ClickMode} from "../eventManager/eventManager.types";
import {Point} from "../../utils/datatypes/point/point";
import {closest} from "../../domBuilding/elementManipulation/element/closest";
import {TurboEventName} from "./turboEvent.types";

class TurboEvent extends Event {
    public readonly clickMode: ClickMode;
    public readonly keys: string[];

    public readonly firePosition: Point;

    constructor(firePosition: Point, clickMode: ClickMode, keys: string[], eventName: TurboEventName, eventInitDict?: EventInit) {
        super(eventName, {bubbles: true, cancelable: true, ...eventInitDict});

        this.clickMode = clickMode;
        this.keys = keys;

        this.firePosition = firePosition;
    }

    public closest<T extends Element>(type: new (...args: any[]) => T): T | null {
        return closest(this.target as Element, type);
    }

    public get target() {
        return (super.target as Element) || document;
    }
}

export {TurboEvent};
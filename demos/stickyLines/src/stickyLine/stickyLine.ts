import {define, TurboElement, expose, Point, TurboRect} from "../../../../build/turbodombuilder.esm";
import {StickyLineView} from "./stickyLine.view";
import {StickyLineModel} from "./stickyLine.model";
import "./stickyLine.css";
import {StickyLineSubstrate} from "./stickyLine.substrate";

@define("sticky-line")
export class StickyLine extends TurboElement<StickyLineView, any, StickyLineModel> {
    @expose("model") public origin: Point;

    public get startPoint(): Point {
        return this.view.startHandle.position;
    }

    public get endPoint(): Point {
        return this.view.endHandle.position;
    }

    public static defaultProperties = {
        model: StickyLineModel,
        view: StickyLineView,
        substrates: StickyLineSubstrate,
        origin: new Point(500, 300),
    };

    public move(delta: Point) {
        this.view.startHandle?.move(delta);
        this.view.endHandle?.move(delta);
    }

    public getBoundingClientRect() {
        return TurboRect.fromSegment(this.startPoint, this.endPoint, 10);
    }
}
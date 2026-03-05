import {define, TurboElement, expose, Point, TurboRect} from "../../../../build/turbodombuilder.esm";
import {StickyLineView} from "./stickyLine.view";
import {StickyLineModel} from "./stickyLine.model";
import "./stickyLine.css";
import {StickyLineSubstrate} from "./stickyLine.substrate";
import {Square} from "../square/square";

@define("sticky-line")
export class StickyLine extends TurboElement<StickyLineView, any, StickyLineModel> {
    @expose("view", false) public accessor startHandle: Square;
    @expose("view", false) public accessor endHandle: Square;

    public get position(): Point {
        return Point.midPoint(this.startHandle.position, this.endHandle.position);
    }

    public set position(value: Point) {
        this.move(value.sub(this.position));
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
        return TurboRect.fromSegment(this.startHandle.position, this.endHandle.position, 10);
    }
}
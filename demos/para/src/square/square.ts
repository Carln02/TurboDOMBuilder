import {define, TurboElement, Point, expose, TurboRect, Color} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {SquareView} from "./square.view";
import "./square.css";

//Custom square element, defined as a custom element
export class Square extends TurboElement<SquareView, any, SquareModel> {
    public modifiable: boolean = true;

    //Expose fields from the model
    @expose("model", true) color: Color;
    @expose("model") elementSize: number;
    @expose("model") position: Point;
    @expose("model") rotation: number;

    public static defaultProperties = {
        view: SquareView,
        model: SquareModel,
    };

    public defaultFeedforwardProperties = {style: "opacity: 0.4"};

    public move(delta: Point) {
        this.model.position = delta.add(this.model.position);
    }

    public rotate(angle: number) {
        this.model.rotation += angle;
    }

    public resize(delta: Point) {
        this.model.elementSize = delta.min;
    }

    public getBoundingClientRect(): DOMRect {
        const offset = this.model.centerAnchor ? this.model.elementSize / 2 : 0;
        return new TurboRect({
            x: this.model.position.x - offset,
            y: this.model.position.y - offset,
            width: this.elementSize,
            height: this.elementSize,
            angleDeg: this.rotation
        });
    }
}

define(Square, "demo-square");
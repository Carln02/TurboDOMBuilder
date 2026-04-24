import {define, TurboElement, Point, expose, auto, turbo, p, Color} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {SquareView} from "./square.view";
import "./square.css";

//Custom square element, defined as a custom element
@define("demo-square")
export class Square extends TurboElement<SquareView, any, SquareModel> {
    //Expose fields from the model
    @expose("model") color: Color;
    @expose("model") elementSize: number;
    @expose("model") position: Point;
    @expose("model") rotation: number;

    public static defaultProperties = {
        view: SquareView,
        model: SquareModel,
        isSpacer: false,
        isPusher: false,
    };

    @auto({defaultValue: false}) public set isPusher(value: boolean) {
        if (value) this.isSpacer = false;
        turbo(this).removeAllChildren();
        if (value) turbo(this).addChild(p({text: "Pusher"}));
    }

    @auto({defaultValue: false}) public set isSpacer(value: boolean) {
        if (value) this.isPusher = false;
        turbo(this).removeAllChildren();
        if (value) turbo(this).addChild(p({text: "Spacer"}));
    }

    public move(delta: Point) {
        this.model.position = delta.add(this.model.position);
    }

    public rotate(angle: number) {
        this.model.rotation += angle;
    }

    public resize(delta: Point) {
        this.model.elementSize = delta.min;
    }
}
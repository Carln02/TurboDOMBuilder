import {define, TurboElement, Point, element, expose, auto, p, turbo} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {SquareView} from "./square.view";
import {SquareProperties} from "./square.types";
import "./square.css";

//Custom square element, defined as a custom element
@define("demo-square")
export class Square extends TurboElement<SquareView, any, SquareModel> {
    //Expose fields from the model
    @expose("model") color: string;
    @expose("model") size: number;
    @expose("model") position: Point;

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

    public resize(delta: Point) {
        this.model.size = delta.min;
    }
}

//Factory function to create squares
export function square(properties: SquareProperties = {}): Square {
    if (!properties.tag) properties.tag = "demo-square";
    const el = element({...properties,
        position: undefined,
        view: SquareView,
        model: SquareModel,
        isPusher: false,
        isSpacer: false,
    }) as Square;
    if (properties.position) el.model.position = properties.position;
    return el;
}
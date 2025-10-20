import {define, TurboElement, Point, element, expose} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {SquareView} from "./square.view";
import {SquareProperties} from "./square.types";
import "./square.css";

@define("demo-square")
export class Square extends TurboElement<SquareView, any, SquareModel> {
    @expose("model") color: string;
    @expose("model") size: number;

    public move(delta: Point) {
        this.model.position = delta.add(this.model.position).object;
    }

    public resize(delta: Point) {
        this.model.size = delta.min;
    }
}

export function square(properties: SquareProperties = {}): Square {
    const el = element({...properties, view: SquareView, model: SquareModel, tag: "demo-square"}) as Square;
    if (properties.position) el.model.position = properties.position;
    return el;
}
import {$, define, TurboElement, Point} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {SquareView} from "./square.view";
import {SquareProperties} from "./square.types";
import "./square.css";

@define("demo-square")
export class Square extends TurboElement<SquareView, any, SquareModel> {
    public constructor(properties: SquareProperties = {}) {
        super(properties);
        this.mvc.generate({
            view: SquareView,
            model: SquareModel,
        });
        if (properties.position) this.model.position = properties.position;
    }

    //TODO
    // @expose color: string;

    public get color(): string {
        return this.model.color;
    }

    public set color(color: string) {
        this.model.color = color;
    }

    public get size(): number {
        return this.model.size;
    }

    public set size(size: number) {
        this.model.size = size;
    }

    public move(delta: Point) {
        this.model.position = delta.add(this.model.position).object;
    }

    public resize(delta: Point) {
        this.model.size = delta.min;
    }
}

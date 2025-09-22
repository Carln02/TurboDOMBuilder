import {$, define, TurboElement, Point} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {SquareView} from "./square.view";

@define("demo-square")
export class Square extends TurboElement<SquareView, any, SquareModel> {
    public constructor(properties = {}) {
        super(properties);
        $(this).addClass("square");
        this.mvc.generate({
            view: SquareView,
            model: SquareModel,
        });
    }

    //TODO
    // @expose color: string;

    public get color(): string {
        return this.model.color;
    }

    public set color(color: string) {
        this.model.color = color;
    }

    public move(delta: Point) {
        this.model.position = delta.add(this.model.position).object;
    }

    public resize(delta: Point) {
        this.model.size = delta.min;
    }
}

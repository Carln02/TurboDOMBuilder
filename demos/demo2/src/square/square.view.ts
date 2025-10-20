import {$, effect, TurboView} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {Square} from "./square";

export class SquareView extends TurboView<Square, SquareModel> {
    @effect private updatePosition() {
        $(this).setStyle("transform", `translate(${this.model.position.x}px, ${this.model.position.y}px)`);
    }

    @effect private updateColor() {
        $(this).setStyle("backgroundColor", this.model.color);
    }

    @effect private updateSize() {
        $(this).setStyles({width: this.model.size + "px", height: this.model.size + "px"});
    }
}
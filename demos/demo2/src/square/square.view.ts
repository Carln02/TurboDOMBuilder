import {turbo, effect, TurboView} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {Square} from "./square";

//View of the square element
export class SquareView extends TurboView<Square, SquareModel> {
    //@effect methods will be called when the values of the signals they use change
    @effect private updatePosition() {
        turbo(this).setStyle("transform", `translate(${this.model.position.x}px, ${this.model.position.y}px)`);
    }

    @effect private updateColor() {
        turbo(this).setStyle("backgroundColor", this.model.color);
    }

    @effect private updateSize() {
        turbo(this).setStyles({width: this.model.size + "px", height: this.model.size + "px"});
    }
}
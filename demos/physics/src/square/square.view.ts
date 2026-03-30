import {turbo, effect, TurboView} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {Square} from "./square";

//View of the square element
export class SquareView extends TurboView<Square, SquareModel> {
    //@effect methods will be called when the values of the signals they use change
    @effect private updatePosition() {
        const offset = this.model.centerAnchor ? this.model.elementSize / 2 : 0;
        turbo(this).setStyle("transform", `
        translate(${this.model.position.x - offset}px, ${this.model.position.y - offset}px)
        rotate(${this.model.rotation}rad)
        `);
    }

    @effect private updateColor() {
        turbo(this).setStyle("backgroundColor", this.model.color);
    }

    @effect private updateSize() {
        turbo(this).setStyles({width: this.model.elementSize + "px", height: this.model.elementSize + "px"});
    }
}
import {$, effect, TurboView} from "../../../../build/turbodombuilder.esm";
import {SquareModel} from "./square.model";
import {Square} from "./square";

export class SquareView extends TurboView<Square, SquareModel> {
    initialize() {
        super.initialize();

        effect(() => $(this).setStyle("transform",
            `translate(${this.model.position.x}px, ${this.model.position.y}px)`));
        effect(() => $(this).setStyle("backgroundColor", this.model.color));
        effect(() => $(this).setStyle("width", this.model.size + "px")
            .setStyle("height", this.model.size + "px"));
    }

    //TODO
    // @effect private fn() {
    //     $(this).setStyle("backgroundColor", this.model.color)
    // }
}
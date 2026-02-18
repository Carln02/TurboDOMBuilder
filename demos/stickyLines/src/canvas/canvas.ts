import {define, TurboElement} from "../../../../build/turbodombuilder.esm";
import "./canvas.css";
import {CanvasSubstrate} from "./canvas.mainSubstrate";

@define("my-canvas")
export class Canvas extends TurboElement {
    public static defaultProperties = {
        substrates: [CanvasSubstrate]
    };
}
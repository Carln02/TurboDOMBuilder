import {define, TurboElement} from "../../../../build/turbodombuilder.esm";
import "./canvas.css";
import {CanvasConstrainer} from "./canvas.mainConstrainer";

@define("my-canvas")
export class Canvas extends TurboElement {
    public static defaultProperties = {
        constrainers: [CanvasConstrainer]
    };
}
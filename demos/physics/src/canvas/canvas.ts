import {define, TurboElement} from "../../../../build/turbodombuilder.esm";
import {CanvasPusherSubstrate} from "./canvas.pusherSubstrate";
import "./canvas.css";
import {CanvasSubstrate} from "./canvas.mainSubstrate";
import {CanvasSpacerSubstrate} from "./canvas.spacerSubstrate";

@define("my-canvas")
export class Canvas extends TurboElement {
    public static defaultProperties = {
        substrates: [CanvasPusherSubstrate, CanvasSubstrate, CanvasSpacerSubstrate],
    }
}
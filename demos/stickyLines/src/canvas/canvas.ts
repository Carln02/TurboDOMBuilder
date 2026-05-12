import {define, TurboElement} from "../../../../build/turbodombuilder.esm";
import "./canvas.css";
import {CanvasEnforcer} from "./canvas.mainEnforcer";

@define("my-canvas")
export class Canvas extends TurboElement {
    public static defaultProperties = {
        enforcers: [CanvasEnforcer]
    };
}
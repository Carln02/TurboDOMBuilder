import {define, TurboElement, TurboElementProperties, turbo, element} from "../../../../build/turbodombuilder.esm";
import {CanvasPusherSubstrate} from "./canvas.pusherSubstrate";
import "./canvas.css";

@define("my-canvas")
export class Canvas extends TurboElement {
}

export function myCanvas(properties: TurboElementProperties = {}): Canvas {
    turbo(properties).applyDefaults({
        tag: "my-canvas",
        substrates: [CanvasPusherSubstrate]
    });
    return element({...properties}) as Canvas;
}
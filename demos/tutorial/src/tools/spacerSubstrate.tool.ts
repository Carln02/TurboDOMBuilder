import {turbo} from "../../../../build/turbodombuilder.esm";
import {SelectTool} from "./select.tool";
import {Canvas} from "../canvas/canvas";

//Pusher tool
export class SpacerSubstrateTool extends SelectTool {
    public toolName: string = "spacerSubstrate"; //Define tool name

    protected get canvas(): Canvas {
        return Array.from(document.body.children).find(el => el instanceof Canvas);
    }

    public onActivate() {
        const canvas = this.canvas;
        turbo(canvas).activateSubstrate("spacer");
        turbo(canvas).deactivateSubstrate("pusher", "main");
    }

    public onDeactivate() {
        const canvas = this.canvas;
        turbo(canvas).deactivateSubstrate("spacer", "pusher");
        turbo(canvas).activateSubstrate("main");
    }
}
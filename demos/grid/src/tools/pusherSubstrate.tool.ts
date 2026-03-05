import {turbo} from "../../../../build/turbodombuilder.esm";
import {SelectTool} from "./select.tool";
import {Canvas} from "../canvas/canvas";

//Pusher tool
export class PusherSubstrateTool extends SelectTool {
    public toolName: string = "pusherSubstrate"; //Define tool name

    protected get canvas(): Canvas {
        return Array.from(document.body.children).find(el => el instanceof Canvas);
    }

    public onActivate() {
        const canvas = this.canvas;
        turbo(canvas).activateSubstrate("pusher");
        turbo(canvas).deactivateSubstrate("spacer", "main");
    }

    public onDeactivate() {
        const canvas = this.canvas;
        turbo(canvas).deactivateSubstrate("pusher", "pusher");
        turbo(canvas).activateSubstrate("main");
    }
}
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
        turbo(canvas).activateSubstrate("pusher", true);
        turbo(canvas).activateSubstrate("spacer", false);
        turbo(canvas).activateSubstrate("main", false);
    }

    public onDeactivate() {
        const canvas = this.canvas;
        turbo(canvas).activateSubstrate("pusher", false);
        turbo(canvas).activateSubstrate("spacer", false);
        turbo(canvas).activateSubstrate("main", true);
    }
}
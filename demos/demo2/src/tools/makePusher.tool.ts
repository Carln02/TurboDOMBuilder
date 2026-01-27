import {TurboEvent} from "../../../../build/turbodombuilder.esm";
import {SelectTool} from "./select.tool";

//Pusher tool
export class MakePusherTool extends SelectTool {
    public toolName: string = "makePusher"; //Define tool name

    public click(e: TurboEvent, target: Node) {
        if ("isPusher" in target && typeof target.isPusher === "boolean") target.isPusher = !target.isPusher;
    }
}
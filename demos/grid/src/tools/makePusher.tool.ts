import {TurboEvent, TurboTool, behavior} from "../../../../build/turbodombuilder.esm";

//Pusher tool
export class MakePusherTool extends TurboTool {
    public toolName: string = "makePusher"; //Define tool name

    @behavior() public click(e: TurboEvent, target: Node) {
        if ("isPusher" in target && typeof target.isPusher === "boolean") target.isPusher = !target.isPusher;
    }
}
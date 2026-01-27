import {TurboEvent} from "../../../../build/turbodombuilder.esm";
import {SelectTool} from "./select.tool";

//Pusher tool
export class MakeSpacerTool extends SelectTool {
    public toolName: string = "makeSpacer"; //Define tool name

    public click(e: TurboEvent, target: Node) {
        if ("isSpacer" in target && typeof target.isSpacer === "boolean") target.isSpacer = !target.isSpacer;
    }
}
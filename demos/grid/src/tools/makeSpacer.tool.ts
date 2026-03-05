import {TurboEvent, TurboTool, behavior} from "../../../../build/turbodombuilder.esm";

//Pusher tool
export class MakeSpacerTool extends TurboTool {
    public toolName: string = "makeSpacer"; //Define tool name

    @behavior() public click(e: TurboEvent, target: Node) {
        if ("isSpacer" in target && typeof target.isSpacer === "boolean") target.isSpacer = !target.isSpacer;
    }
}
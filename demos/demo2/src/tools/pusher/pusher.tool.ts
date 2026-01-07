import {TurboDragEvent, turbo} from "../../../../../build/turbodombuilder.esm";
import {Square} from "../../square/square";
import {SelectTool} from "../select.tool";

//Pusher tool
export class PusherTool extends SelectTool {
    public toolName: string = "pusher"; //Define tool name

    //Equivalent to turbo(tool).addToolBehavior("turbo-click-start", "pusher", (e, target) => {...});
    //If interacting with a square --> clear the pusher substrate's object list and add the target to it.
    public clickStart(e: Event, target: Node): boolean {
        if (!(target instanceof Square)) return false;
        turbo(this).setSubstrateObjectList(new Set([target]));
        return true;
    }

    //On click end --> clear the substrate's object list
    public clickEnd() {
        turbo(this).setSubstrateObjectList(new Set());
        return true;
    }
}
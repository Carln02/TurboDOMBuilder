import {TurboDragEvent, turbo} from "../../../../../build/turbodombuilder.esm";
import {Square} from "../../square/square";
import {SelectTool} from "../select.tool";

//Pusher tool
export class PusherTool extends SelectTool {
    public toolName: string = "pusher"; //Define tool name

    private interacting = false;

    //Equivalent to turbo(tool).addToolBehavior("turbo-click-start", "pusher", (e, target) => {...});
    //If interacting with a square --> clear the pusher substrate's object list and add the target to it.
    public clickStart(e: Event, target: Node): boolean {
        if (!(target instanceof Square)) return false;
        this.interacting = true;
        turbo(this).setSubstrateObjectList(new Set([target]));
        return true;
    }

    //On drag (and if interacting with a square) --> resolve the pusher substrate
    //Ideally, in the future, the resolving would be done behind the scenes by the toolkit.
    public drag(e: TurboDragEvent, el: Node): boolean {
        if (!this.interacting) return false;
        if (!super.drag(e, el)) return false;
        turbo(this).resolveSubstrate({
            toolName: this.toolName,
            event: e,
            eventTarget: el
        });
        return true;
    }

    //On click end --> clear the substrate's object list
    public clickEnd() {
        if (!this.interacting) return false;
        this.interacting = false;
        turbo(this).setSubstrateObjectList(new Set());
        return true;
    }
}
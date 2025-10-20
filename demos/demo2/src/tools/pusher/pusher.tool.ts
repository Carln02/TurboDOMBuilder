import {TurboDragEvent, $} from "../../../../../build/turbodombuilder.esm";
import {Square} from "../../square/square";
import {SelectTool} from "../select.tool";

export class PusherTool extends SelectTool {
    public toolName: string = "pusher";
    private interacting = false;

    public clickStart(e: Event, target: Node): boolean {
        if (!(target instanceof Square)) return false;
        this.interacting = true;
        $(this).setSubstrateObjectList(new Set([target]))
        return true;
    }

    public drag(e: TurboDragEvent, el: Node): boolean {
        if (!this.interacting) return false;
        if (!super.drag(e, el)) return false;
        $(this).resolveSubstrate({
            toolName: this.toolName,
            event: e,
            eventTarget: el
        });
        return true;
    }

    public clickEnd() {
        if (!this.interacting) return false;
        this.interacting = false;
        $(this).setSubstrateObjectList(new Set());
        return true;
    }
}
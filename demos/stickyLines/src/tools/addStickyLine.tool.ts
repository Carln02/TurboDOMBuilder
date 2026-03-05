import {TurboTool, TurboEvent, Propagation, behavior} from "../../../../build/turbodombuilder.esm";
import {Canvas} from "../canvas/canvas";
import {StickyLine} from "../stickyLine/stickyLine";

//Add square tool
export class AddStickyLineTool extends TurboTool {
    public toolName: string = "addStickyLine"; //Define the tool name
    protected currentStickyline: StickyLine;

    @behavior() public dragStart(e: TurboEvent, target: Node) {
        if (target instanceof Canvas) {
            this.currentStickyline = StickyLine.create({parent: target});
            this.currentStickyline.startHandle.position = e.scaledPosition;
            this.currentStickyline.endHandle.position = e.scaledPosition;
            return Propagation.stopPropagation;
        }
    }

    @behavior() public drag(e: TurboEvent) {
        if (this.currentStickyline) {
            this.currentStickyline.endHandle.position = e.scaledPosition;
            return Propagation.stopPropagation;
        }
    }

    @behavior() public dragEnd() {
        this.currentStickyline = undefined;
    }
}
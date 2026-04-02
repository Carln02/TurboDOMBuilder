import {TurboTool, TurboEvent, Propagation, behavior} from "../../../../build/turbodombuilder.esm";
import {Canvas} from "../canvas/canvas";
import {SquareList} from "../squareList/squareList";

//Add square tool
export class AddSquareListTool extends TurboTool {
    public toolName: string = "addSquareList"; //Define the tool name
    protected currentSquareList: SquareList;

    @behavior() public dragStart(e: TurboEvent, target: Node) {
        if (target instanceof Canvas) {
            this.currentSquareList = new SquareList();
            (this.currentSquareList as any).initialize();
            this.currentSquareList.startSquare.position = e.scaledPosition;
            this.currentSquareList.endSquare.position = e.scaledPosition;
            return Propagation.stopPropagation;
        }
    }

    @behavior() public drag(e: TurboEvent) {
        if (this.currentSquareList) {
            this.currentSquareList.endSquare.position = e.scaledPosition;
            return Propagation.stopPropagation;
        }
    }

    @behavior() public dragEnd() {
        this.currentSquareList = undefined;
    }
}
import {
    solver,
    SubstrateCallbackProperties
} from "../../../../build/turbodombuilder.esm";
import {CanvasSubstrate} from "./canvas.mainSubstrate";

//Pusher substrate
export class CanvasPusherSubstrate extends CanvasSubstrate {
    //Define the substrate's name. Equivalent to turbo(canvas).makeSubstrate("pusher").
    public substrateName = "pusher";

    public initialize() {
        super.initialize();
        //Remove the spacer solver because spacers are ignored in this substrate.
        this.removeSolver("spacerSolver");
        this.active = false;
    }

    //Redefine the pusher solver to treat interaction with any object in the substrate as a pusher.
    @solver({priority: 10}) protected pusherSolver(properties: SubstrateCallbackProperties) {
        //For each element that overlaps with the target --> push it.
        this.processTargetWithContext(properties, (el, delta, overlap) => {
            const movedValue = this.pushElement(el, overlap, delta);
            if (!movedValue) return;
            this.getObjectData(overlap).movedDelta = movedValue;
            if (!this.queue.has(overlap)) this.queue.push(overlap);
        });
    }
}
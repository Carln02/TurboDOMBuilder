import {
    Point,
    TurboDragEvent,
    solver,
    SubstrateCallbackProperties, TurboElement
} from "../../../../build/turbodombuilder.esm";
import {Toolbar} from "../toolbar/toolbar";
import {CanvasSubstrate} from "./canvas.mainSubstrate";

//Pusher substrate
export class CanvasPusherSubstrate extends CanvasSubstrate {
    public substrateName = "pusher"; //Define the substrate's name
    //equivalent to turbo(canvas).makeSubstrate("pusher")

    //@solver is called on turbo(el).resolveSubstrate()
    //It will be called once for each object in the substrate's list of objects (marking each as processed afterward)
    @solver() protected resolvePush(properties: SubstrateCallbackProperties) {
        const delta: Point = (properties.event as TurboDragEvent)?.deltaPosition;
        const el = properties.target;

        if (!delta || !el || !(el instanceof Element)) return;

        //Get all elements in the substrate's list that overlap with the target
        const list = Array.from(this.objectList).filter(entry => entry instanceof TurboElement && !(entry instanceof Toolbar)) as Element[];
        const overlaps = this.findOverlaps(el);

        //No overlap --> remove it from list
        if (overlaps.length === 0) return;

        //Loop on each overlapping element
        for (const overlap of overlaps) {
            //If the overlapping element is unprocessed, add it so resolveSubstrate() will pick it up later
            if (!this.getObjectPasses(overlap)) {
                this.queue.addOnTop(overlap);
                continue;
            }
            //If the overlapping element was already processed, push the target by the normal component of delta (physics stuff0
            this.pushElement(overlap, el, delta);
        }
    };
}
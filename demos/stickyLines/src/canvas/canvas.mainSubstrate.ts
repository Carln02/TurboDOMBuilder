import {
    TurboEnforcer,
    solver, EnforcerCallbackProperties,
    turbo, TurboRect
} from "../../../../build/turbodombuilder.esm";
import {StickyLine} from "../stickyLine/stickyLine";

//Pusher substrate
export class CanvasSubstrate extends TurboEnforcer {
    //Define the substrate's name. Equivalent to turbo(canvas).makeSubstrate("main").
    public substrateName = "main";

    public defaultQueue = [];

    @solver() protected refreshStickyLinesLists(properties: EnforcerCallbackProperties) {
        const target = properties.target;
        if (!target) return;

        const stickylines = Array.from(this.objectList).filter(entry => entry instanceof StickyLine);
        const overlaps = this.findOverlaps(target, stickylines);

        for (const stickyline of stickylines) {
            if (stickyline === target) continue;
            if (overlaps.includes(stickyline)) turbo(stickyline).getEnforcerObjectList().add(target);
            else if (properties.eventTarget !== stickyline) turbo(stickyline).getEnforcerObjectList().remove(target);
        }

    }

    /**
     * @description Retrieve all elements from the object list that overlap on the screen with the given element.
     * @param {Element} element - The element to check overlaps for.
     * @param pool
     * @return {Element[]} - Array of overlapping elements.
     * @protected
     */
    protected findOverlaps(element: object, pool: object[] = Array.from(this.objectList)): object[] {
        const out: object[] = [];
        //For each element in the substrate's object list
        for (const el of pool) {
            //If it is the reference element --> continue.
            if (el === element) continue;
            //If it overlaps with the reference element --> add it to the out array.
            if (this.overlaps(el, element)) out.push(el);
        }
        return out;
    }

    /**
     * @description Find whether element 1 visually overlaps with element 2.
     * @param {Element} el1 - First element.
     * @param {Element} el2 - Second element.
     * @return Whether they overlap.
     * @protected
     */
    //Finds if element a overlaps with b
    protected overlaps(el1: object, el2: object): boolean {
        //Get bounding rects for each element.
        const r1 = el1["getBoundingClientRect"]?.();
        const r2 = el2["getBoundingClientRect"]?.();
        if (!r1 || !r2 || !(r1 instanceof DOMRect) || !(r2 instanceof DOMRect)) return false;

        if (r1 instanceof TurboRect) return r1.overlaps(r2);
        if (r2 instanceof TurboRect) return r2.overlaps(r1);

        //If any dimension is 0 or undefined --> return.
        if (!r1.width || !r1.height || !r2.width || !r2.height) return false;
        //Return true if any overlap is computed.
        return !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
    }
}
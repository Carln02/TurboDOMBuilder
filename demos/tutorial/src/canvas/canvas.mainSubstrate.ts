import {
    Coordinate,
    Point,
    solver,
    SubstrateCallbackProperties,
    TurboDragEvent,
    TurboSubstrate
} from "../../../../build/turbodombuilder.esm";

//Pusher substrate
export class CanvasSubstrate extends TurboSubstrate {
    //Define the substrate's name. Equivalent to turbo(canvas).makeSubstrate("main").
    public substrateName = "main";

    //On initialize --> set default queue to be an empty array instead of all objects in the list
    //The queue will be dynamically populated with objects the user collides with
    public initialize() {
        super.initialize();
        this.defaultQueue = [];
    }

    /**
     * @description Check if an element is a spacer.
     * @param el - The object to check.
     * @protected
     */
    protected isSpacer(el: object): boolean {
        return el instanceof Element && "isSpacer" in el && el.isSpacer === true;
    }

    /**
     * @description Check if an element is a pusher.
     * @param {object} el - The object to check.
     * @protected
     */
    protected isPusher(el: object): boolean {
        return el instanceof Element && "isPusher" in el && el.isPusher === true;
    }

    /**
     * @description Spacer solver (with higher priority - it executes on the target before the pusher solver).
     * @param {SubstrateCallbackProperties} properties - The solving properties passed down by the toolkit.
     * @protected
     */
    @solver({priority: 5}) protected spacerSolver(properties: SubstrateCallbackProperties) {
        //For each object overlapping with el, and given that el has been moved by delta
        this.processTargetWithContext(properties, (el, delta, overlap) => {
            //If neither el nor overlap are spacers, return.
            if (!this.isSpacer(el) && !this.isSpacer(overlap)) return;
            //Bounce back el so it doesn't overlap anymore, and retrieve the value.
            const movedValue = this.pushElement(el, overlap, delta, true);
            //If el wasn't bounced back --> return.
            if (!movedValue) return;
            //Store el's movement in its temporary data.
            this.getObjectData(el).movedDelta = movedValue;
            //Clear the queue to reinitialize the propagation from el.
            this.queue.clear();
        });
    }

    /**
     * @description Pusher solver (with lower priority - it executes on the target after the spacer solver).
     * @param {SubstrateCallbackProperties} properties - The solving properties passed down by the toolkit.
     * @protected
     */
    @solver({priority: 10}) protected pusherSolver(properties: SubstrateCallbackProperties) {
        //If interaction target is not a pusher --> don't push and return.
        if (!this.isPusher(properties.eventTarget)) return;
        //For each object overlapping with el, and given that el has been moved by delta
        this.processTargetWithContext(properties, (el, delta, overlap) => {
            //Push overlap so it's no longer over el, and retrieve the value.
            const movedValue = this.pushElement(el, overlap, delta);
            //If overlap wasn't pushed --> return.
            if (!movedValue) return;
            //Store overlap's movement in its temporary data.
            this.getObjectData(overlap).movedDelta = movedValue;
            //Add overlap to the queue (if it isn't already in it).
            if (!this.queue.has(overlap)) this.queue.push(overlap);
        });
    }

    /**
     * @description Boilerplate code that ensures the target is an element, computes the delta of the target
     * (by how much it was last moved), and executes the callback on each object overlapping with the target.
     * @param {SubstrateCallbackProperties} properties - The solving properties passed down by the toolkit.
     * @param {(target: Element, delta: Point, overlap: Element) => void} callback - The callback to execute for
     * each overlap.
     * @protected
     */
    protected processTargetWithContext(
        properties: SubstrateCallbackProperties,
        callback: (target: Element, delta: Point, overlap: Element) => void
    ) {
        //If target is undefined or not an Element, return.
        const el = properties.target as Element;
        if (!el || !(el instanceof Element)) return;

        //Compute delta. If the target has a stored movement, use it.
        const delta: Point = this.getObjectData(el).movedDelta ??
            //Otherwise, if the target is also the event target
            (el === properties.eventTarget
                //Use the event's delta position (if defined)
                ? (properties.event as TurboDragEvent)?.deltaPosition
                //Otherwise, undefined.
                : undefined);
        //If delta is undefined --> return.
        if (!delta) return;
        //Loop on all overlaps with target and execute callback.
        for (const overlap of this.findOverlaps(el)) callback(el, delta, overlap);
    }

    /**
     * @description Given a pusher element, an element to be pushed, and a vector indicating the direction and amount
     * by which the pusher was moved --> move either the pushed element or the pusher (depending on the value of
     * pushBack) and return the value of the movement.
     * @param {Element} pusher - The element that pushes.
     * @param {Element} pushed - The element that is pushed.
     * @param {Point} deltaPosition - The vector along which pusher was moved.
     * @param {boolean} [pushBack=false] - If true --> will move the pusher so it doesn't overlap with pushed.
     * Otherwise, will move pushed so it doesn't overlap with pusher.
     * @return {Point} - The amount of the movement.
     * @protected
     */
    protected pushElement(pusher: Element, pushed: Element, deltaPosition: Point, pushBack: boolean = false): Point {
        //Compute mtv axis (physics stuff).
        const mtv = pushBack ? this.mtvAxis(pusher, pushed) : this.mtvAxis(pushed, pusher);
        if (!mtv) return;
        //Get the normal between pushed and pusher.
        let normal = mtv.normal;
        //Dot product between delta and normal
        const alongN = deltaPosition.dot(normal);
        //If pushed will be moved and the vectors are not in the same direction --> return.
        if (!pushBack && alongN <= 0) return;
        //If pusher will be moved and the vectors are in the same direction --> flip the normal.
        if (pushBack && alongN > 0) normal = normal.mul(-1);
        //Compute the vector along which to move the element.
        const move = normal.mul(pushBack ? mtv.depth : alongN);
        //Update the element's position and return the vector if it was applied.
        return this.applyMove(pushBack ? pusher : pushed, move) ? move : undefined;
    }

    /**
     * @description Attempts to move an element by delta.
     * @param {Element} element - The element to move.
     * @param {Point} delta - The amount by which to move.
     * @return Whether the element was moved.
     * @protected
     */
    protected applyMove(element: Element, delta: Point): boolean {
        //If element is undefined, not an Element, or doesn't have a position field --> return.
        if (!element || !(element instanceof Element) || !("position" in element)) return false;
        //If the element's position is not an object --> return.
        const position = element.position;
        if (typeof position !== "object") return false;
        //If position is a Point --> add to it delta.
        if (position instanceof Point) element.position = position.add(delta);
        //Otherwise --> treat it as a coordinate, turn it into a point, and add to it delta.
        else element.position = new Point(position as Coordinate).add(delta);
        return true;
    }

    /**
     * @description Retrieve all elements from the object list that overlap on the screen with the given element.
     * @param {Element} element - The element to check overlaps for.
     * @return {Element[]} - Array of overlapping elements.
     * @protected
     */
    protected findOverlaps(element: Element): Element[] {
        const out: Element[] = [];
        //For each element in the substrate's object list
        for (const el of Array.from(this.objectList)) {
            //If it's not an Element or it is the reference element --> continue.
            if (!(el instanceof Element) || el === element) continue;
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
    protected overlaps(el1: Element, el2: Element): boolean {
        //If any of them is not an element --> return.
        if (!(el1 instanceof Element) || !(el2 instanceof Element)) return false;
        //Get bounding rects for each element.
        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();
        //If any dimension is 0 or undefined --> return.
        if (!r1.width || !r1.height || !r2.width || !r2.height) return false;
        //Return true if any overlap is computed.
        return !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
    }

    //Physics computation stuff
    protected mtvAxis(aEl: Element, bEl: Element): { normal: Point; depth: number } | null {
        if (!this.overlaps(aEl, bEl)) return null;
        const a = aEl.getBoundingClientRect();
        const b = bEl.getBoundingClientRect();

        const ax = a.x + a.width / 2, ay = a.y + a.height / 2;
        const bx = b.x + b.width / 2, by = b.y + b.height / 2;
        const dx = bx - ax, dy = by - ay;

        const px = (a.width + b.width) / 2 - Math.abs(dx);
        const py = (a.height + b.height) / 2 - Math.abs(dy);

        if (px < py) return {normal: new Point(dx < 0 ? 1 : -1, 0), depth: px};
        return {normal: new Point(0, dy < 0 ? 1 : -1), depth: py};
    }
}
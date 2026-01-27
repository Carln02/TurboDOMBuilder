import {
    Coordinate,
    Point,
    solver,
    SubstrateCallbackProperties,
    TurboDragEvent,
    TurboElement,
    TurboSubstrate
} from "../../../../build/turbodombuilder.esm";
import {Toolbar} from "../toolbar/toolbar";

//Pusher substrate
export class CanvasSubstrate extends TurboSubstrate {
    public substrateName = "main"; //Define the substrate's name
    //equivalent to turbo(canvas).makeSubstrate("main")

    public initialize() {
        super.initialize();
        this.maxPasses = 50;
        this.objectList = (this.element as Element).children;
        this.defaultQueue = [];
    }

    protected isSpacer(el: any) {
        return el instanceof Element && "isSpacer" in el && el.isSpacer === true;
    }

    protected isPusher(el: any) {
        return el instanceof Element && "isPusher" in el && el.isPusher === true;
    }

    @solver({priority: 5}) protected spacerSolver(properties: SubstrateCallbackProperties) {
        this.processTargetWithContext(properties, (el, delta, overlap) => {
            if (!this.isSpacer(el) && !this.isSpacer(overlap)) return;
            const movedValue = this.bounceBackElement(el, overlap, delta);
            if (!movedValue) return;
            this.getObjectData(el).movedDelta = movedValue;
            this.queue.clear();
        });
    }

    @solver({priority: 10}) protected pusherSolver(properties: SubstrateCallbackProperties) {
        this.processTargetWithContext(properties, (el, delta, overlap) => {
            const movedValue = this.pushElement(el, overlap, delta);
            if (!movedValue) return;
            this.getObjectData(overlap).movedDelta = movedValue;
            if (!this.queue.has(overlap)) this.queue.push(overlap);
        });
    }

    protected processTargetWithContext(
        properties: SubstrateCallbackProperties,
        callback: (target: Element, delta: Point, overlap: Element) => void
    ) {
        if (!this.isPusher(properties.eventTarget)) return;
        const el = properties.target as Element;
        if (!el || !(el instanceof Element)) return;

        //Get all elements in the substrate's list that overlap with the target
        const delta: Point = this.getObjectData(el).movedDelta ??
            (el === properties.eventTarget
                ? (properties.event as TurboDragEvent)?.deltaPosition
                : undefined);
        if (!delta) return;
        for (const overlap of this.findOverlaps(el)) callback(el, delta, overlap);
    }

    protected pushElement(pusher: Element, pushed: Element, deltaPosition: Point): Point {
        const mtv = this.mtvAxis(pushed, pusher);
        if (!mtv) return;

        let normal = mtv.normal;
        const alongN = deltaPosition.dot(normal);
        if (alongN <= 0) return;
        const move = normal.mul(alongN);

        //Update position directly --> not go through the move()
        return this.applyMove(pushed, move) ? move : undefined;
    }

    protected bounceBackElement(pusher: Element, pushed: Element, deltaPosition: Point): Point {
        const mtv = this.mtvAxis(pusher, pushed);
        if (!mtv) return;

        let normal = mtv.normal;
        const alongN = deltaPosition.dot(normal);

        // We want the correction to be "backwards" relative to the movement.
        // If n points in the same general direction as deltaPosition, flip it.
        if (alongN > 0) normal = normal.mul(-1);

        const correction = normal.mul(mtv.depth);
        return this.applyMove(pusher, correction) ? correction : undefined;
    }

    protected applyMove(element: Element, delta: Point): boolean {
        if (!("position" in element)) return false;
        const position = element.position;
        if (typeof position !== "object") return false;
        if (position instanceof Point) element.position = position.add(delta);
        else element.position = new Point(position as Coordinate).add(delta);
        return true;
    }

    //Finds and returns the elements with which an element overlaps out of the objectList
    protected findOverlaps(element: Element): Element[] {
        const pool = Array.from(this.objectList).filter(entry => entry instanceof TurboElement && !(entry instanceof Toolbar)) as Element[];
        const out: Element[] = [];
        for (const el of pool) {
            if (el === element) continue;
            if (this.overlaps(el, element)) out.push(el);
        }
        return out;
    }

    //Finds if element a overlaps with b
    protected overlaps(a: Element, b: Element): boolean {
        if (!(a instanceof Element) || !(b instanceof Element)) return false;
        const r1 = a.getBoundingClientRect();
        const r2 = b.getBoundingClientRect();
        if (!r1.width || !r1.height || !r2.width || !r2.height) return false;
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
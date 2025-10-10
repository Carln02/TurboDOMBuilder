import {
    TurboSubstrate,
    $,
    SubstrateSolverProperties,
    Point,
    Coordinate,
    TurboDragEvent,
    solver
} from "../../../../../build/turbodombuilder.esm";

export class PusherSubstrate extends TurboSubstrate {
    public substrateName = "pusher";

    public get objectList(): Set<Element> {
        return super.objectList as Set<Element>;
    }

    public set objectList(value: Set<Element>) {
        if (value instanceof Set) super.objectList = value;
    }

    @solver private resolvePush(properties: SubstrateSolverProperties) {
        const delta: Point = (properties.event as TurboDragEvent)?.deltaPosition;
        const el = properties.target;
        if (!delta || !el || !(el instanceof Element)) return;

        const list = Array.from($(document).getSubstrateObjectList()) as Element[];
        const overlaps = this.findOverlaps(el, list);
        if (overlaps.length === 0) {
            //No overlap -> remove from list
            this.objectList.delete(el);
            return;
        }

        for (const overlap of overlaps) {
            //If any overlap is unprocessed, add it so resolve() will pick it up next
            if (!this.isProcessed(overlap)) {
                this.objectList.add(overlap);
                continue;
            }

            //For overlaps with already processed elements, push el by the normal component of delta
            const mtv = this.mtvAxis(el, overlap);
            if (!mtv) continue;

            const alongN = delta.dot(mtv.normal);
            if (alongN > 0) this.move(el, mtv.normal.mul(alongN)); //Move only by the pushing component
        }
    };

    private overlaps(a: Element, b: Element): boolean {
        if (!(a instanceof Element) || !(b instanceof Element)) return false;
        const r1 = a.getBoundingClientRect();
        const r2 = b.getBoundingClientRect();
        if (!r1.width || !r1.height || !r2.width || !r2.height) return false;
        return !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
    }

    private mtvAxis(aEl: Element, bEl: Element): { normal: Point; depth: number } | null {
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

    private findOverlaps(element: Element, pool: Element[]): Element[] {
        const out: Element[] = [];
        for (const el of pool) {
            if (el === element) continue;
            if (this.overlaps(el, element)) out.push(el);
        }
        return out;
    }

    private move(el: Element, delta: Point) {
        if ("move" in el && typeof el.move === "function") el.move(delta);
        else if ("translate" in el && typeof el.translate === "function") el.translate(delta);
        else if ("position" in el && typeof el.position === "object") el.position = delta.add(el.position as Coordinate);
    }
}

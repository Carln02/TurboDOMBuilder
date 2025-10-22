import {
    TurboSubstrate,
    turbo,
    SubstrateSolverProperties,
    Point,
    TurboDragEvent,
    solver,
    Coordinate
} from "../../../../../build/turbodombuilder.esm";

//Pusher substrate
export class PusherSubstrate extends TurboSubstrate {
    public substrateName = "pusher"; //Define the substrate's name

    //@solver is called on turbo(el).resolveSubstrate()
    //It will be called once for each object in the substrate's list of objects (marking each as processed afterward)
    @solver private resolvePush(properties: SubstrateSolverProperties) {
        const delta: Point = (properties.event as TurboDragEvent)?.deltaPosition;
        const el = properties.target;
        if (!delta || !el || !(el instanceof Element)) return;

        //Get all elements in the substrate's list that overlap with the target
        const list = Array.from(turbo(document).getSubstrateObjectList()) as Element[];
        const overlaps = this.findOverlaps(el, list);

        //No overlap --> remove it from list
        if (overlaps.length === 0) {
            turbo(this).removeObjectFromSubstrate(el);
            return;
        }

        //Loop on each overlapping element
        for (const overlap of overlaps) {
            //If the overlapping element is unprocessed, add it so resolveSubstrate() will pick it up later
            if (!this.isProcessed(overlap)) {
                turbo(this).addObjectToSubstrate(overlap);
                continue;
            }

            //If the overlapping element was already processed, push the target by the normal component of delta (physics stuff0
            const mtv = this.mtvAxis(el, overlap);
            if (!mtv) continue;

            const alongN = delta.dot(mtv.normal);
            if (alongN > 0) {
                //Apply select tool + drag to move the square --> doesn't work for the circle
                // turbo(el).applyTool("select", "turbo-drag", {deltaPosition: mtv.normal.mul(alongN)} as any);

                //Update position directly --> not go through the move()
                if ("position" in el) {
                    if (el.position instanceof Point) el.position = el.position.add(mtv.normal.mul(alongN));
                    else if (typeof el.position === "object")
                        el.position = new Point(el.position as Coordinate).add(mtv.normal.mul(alongN));
                }
            }
        }
    };

    //Finds and returns the elements with which an element overlaps out of a list of elements
    private findOverlaps(element: Element, pool: Element[]): Element[] {
        const out: Element[] = [];
        for (const el of pool) {
            if (el === element) continue;
            if (this.overlaps(el, element)) out.push(el);
        }
        return out;
    }

    //Finds if element a overlaps with b
    private overlaps(a: Element, b: Element): boolean {
        if (!(a instanceof Element) || !(b instanceof Element)) return false;
        const r1 = a.getBoundingClientRect();
        const r2 = b.getBoundingClientRect();
        if (!r1.width || !r1.height || !r2.width || !r2.height) return false;
        return !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
    }

    //Physics computation stuff
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
}

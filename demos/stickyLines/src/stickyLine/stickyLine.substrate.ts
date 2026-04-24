import {
    TurboSubstrate,
    solver,
    SubstrateCallbackProperties,
    Point,
    DefaultEventName,
    turbo,
    closestPointOnSegment
} from "../../../../build/turbodombuilder.esm";
import {StickyLine} from "./stickyLine";
import {StickyLineView} from "./stickyLine.view";
import {StickyLineModel} from "./stickyLine.model";

export class StickyLineSubstrate extends TurboSubstrate<StickyLine, StickyLineView, StickyLineModel> {
    public substrateName = "stickyLine";

    protected objectData: WeakMap<object, number> = new WeakMap();

    public initialize(): void {
        super.initialize();
        this.objectList.list = [this.element];

        this.onObjectListChange.add((object: object, status) => {
            if (object === this.element) return;
            if (status === "added") return;
            (turbo(object).feedforward() as any)?.remove();
        });
    }

    @solver() protected ensureAlignment(properties: SubstrateCallbackProperties) {
        const target = properties.target as Element;
        if (!target || !(target instanceof Element) || target instanceof StickyLine) return;

        const manipulatingStickyLine = properties.eventTarget === this.element;
        if (!manipulatingStickyLine && target instanceof StickyLine) return;

        const start = this.view.startHandle?.position;
        const end = this.view.endHandle?.position;
        if (!start || !end) return;

        const rect = target.getBoundingClientRect?.();
        if (!rect || !(rect instanceof DOMRect)) return;
        const center = new Point(rect.left + rect.width / 2, rect.top + rect.height / 2);

        const isFeedforward = properties.eventType !== DefaultEventName.dragEnd
            && !manipulatingStickyLine && !(target instanceof StickyLine);

        if (!manipulatingStickyLine || !this.objectData.has(target))
            this.objectData.set(target, closestPointOnSegment(center, start, end)?.positionOnSegment(start, end));
        const data = this.objectData.get(target);
        if (!data) return;

        const destination = start.add(end.sub(start).mul(data));
        const EPS = 0.25;
        if (Point.dist(center, destination) < EPS) return;

        let toMove = target;
        if (isFeedforward) toMove = turbo(target).feedforward({
            removeOnPointerRelease: true,
            parent: target.parentElement
        });
        this.applyRotation(toMove, Math.atan2(end.y - start.y, end.x - start.x));
        this.applyPosition(toMove, destination);
    }

    protected applyRotation(element: Element, angle: number): boolean {
        //If element is undefined, not an Element, or doesn't have a rotation field --> return.
        if (!element || !(element instanceof Element) || !("rotation" in element)) return false;
        element.rotation = angle;
        return true;
    }

    protected applyPosition(element: Element, position: Point): boolean {
        //If element is undefined, not an Element, or doesn't have a position field --> return.
        if (!element || !(element instanceof Element) || !("position" in element)) return false;
        //If the element's position is not an object --> return.
        element.position = position;
        return true;
    }
}
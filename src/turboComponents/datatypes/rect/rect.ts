import {Point} from "../point/point";
import {AnchorPoint} from "../anchorPoint/anchorPoint";
import {TurboRectProperties} from "./rect.types";
import {trim} from "../../../utils/computations/misc";
import {polygonsIntersect, segmentIntersectsPolygon} from "../../../utils/geometry/polygon";
import {closestPointOnSegment} from "../../../utils/geometry/segment";
import {aabbCorners, closestPointOnAabb} from "../../../utils/geometry/aabb";
import {element} from "../../../elementCreation/element";
import {css} from "../../../utils/styling/css";

/**
 * @class TurboRect
 * @group Components
 * @category TurboRect
 */
class TurboRect extends DOMRect {
    public angleRad: number = 0;
    public anchor: AnchorPoint;

    constructor(properties: TurboRectProperties = {}) {
        super(properties.x ?? 0, properties.y ?? 0, properties.width ?? 0, properties.height ?? 0);
        if (properties.angleRad !== undefined) this.angleRad = properties.angleRad;
        else if (properties.angleDeg !== undefined) this.angleDeg = properties.angleDeg;
        this.anchor = properties.anchor instanceof AnchorPoint ? properties.anchor : new AnchorPoint(properties.anchor);
    }

    public static fromSegment(a: Point, b: Point, thickness: number = 1, properties: TurboRectProperties = {}): TurboRect {
        const dx = b.x - a.x;
        const dy = b.y - a.y;

        const length = Math.hypot(dx, dy);
        const angleRad = Math.atan2(dy, dx);
        const mid = new Point((a.x + b.x) / 2, (a.y + b.y) / 2);

        const x = mid.x - length / 2;
        const y = mid.y - thickness / 2;
        return new TurboRect({x, y, width: length, height: thickness, ...properties, angleRad});
    }

    public static fromDOMRect(rect: DOMRect, properties: TurboRectProperties = {}): TurboRect {
        return new TurboRect({x: rect.x, y: rect.y, width: rect.width, height: rect.height, ...properties});
    }

    public render() {
        return element({tag: "div", style: css`position: absolute; 
                width: ${this.width}px; height: ${this.height}px; 
                top: ${this.y}px; left: ${this.x}px; background-color: red; pointer-events: none; opacity: 0.4;
                transform: rotate(${this.angleRad}rad)`}) as HTMLElement;
    }

    public get angleDeg(): number {
        return (this.angleRad * 180) / Math.PI;
    }

    public set angleDeg(value: number) {
        this.angleRad = (value * Math.PI) / 180;
    }

    public get center(): Point {
        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    public get xAxis(): Point {
        return new Point(Math.cos(this.angleRad), Math.sin(this.angleRad));
    }

    public get yAxis(): Point {
        return new Point(-Math.sin(this.angleRad), Math.cos(this.angleRad));
    }

    public get half(): Point {
        return new Point(this.width / 2, this.height / 2);
    }

    /** Corners in world/screen coords (clockwise) */
    public get points(): [Point, Point, Point, Point] {
        const c = this.center;
        const ux = this.xAxis;
        const uy = this.yAxis;
        const half = this.half;

        const ex = new Point(ux.x * half.x, ux.y * half.x);
        const ey = new Point(uy.x * half.y, uy.y * half.y);

        return [c.sub(ex).sub(ey), c.add(ex).sub(ey), c.add(ex).add(ey), c.sub(ex).add(ey)];
    }

    /** Closest point on (or inside) this rotated rect to p */
    public closestPoint(point: Point): Point;
    public closestPoint(point1: Point, point2: Point): Point; // segment AB
    public closestPoint(rect: DOMRect): Point;                 // other rect (AABB or TurboRect)
    public closestPoint(...args: any[]): Point {
        // (1) Point -> Closest point ON THIS rect to that point
        if (args.length === 1 && args[0] instanceof Point) {
            const point = args[0] as Point;
            const c = this.center;
            const ux = this.xAxis;
            const uy = this.yAxis;

            const d = point.sub(c);
            const lx = d.x * ux.x + d.y * ux.y;
            const ly = d.x * uy.x + d.y * uy.y;

            const cx = trim(lx, this.width / 2, -this.width / 2);
            const cy = trim(ly, this.height / 2, -this.height / 2);

            return c.add(new Point(ux.x * cx, ux.y * cx)).add(new Point(uy.x * cy, uy.y * cy));
        }

        // (2) Segment AB -> Closest point ON THIS rect to segment AB
        if (args.length === 2 && args[0] instanceof Point && args[1] instanceof Point) {
            const a = args[0] as Point;
            const b = args[1] as Point;

            const thisPoly = this.points;

            // If segment intersects this rect, distance is 0.
            const hit = segmentIntersectsPolygon(a, b, thisPoly);
            if (hit) return hit;

            // Candidates on THIS rect:
            // - closest points to endpoints
            // - corners of this rect
            let best = this.closestPoint(a);
            let bestDist = Point.dist(best, a);

            const pb = this.closestPoint(b);
            const db = Point.dist(pb, b);
            if (db < bestDist) {
                bestDist = db;
                best = pb;
            }

            for (const corner of thisPoly) {
                const q = closestPointOnSegment(corner, a, b);
                const d = Point.dist(corner, q);
                if (d < bestDist) {
                    bestDist = d;
                    best = corner;
                }
            }

            return best;
        }

        // (3) Rect (AABB DOMRect or TurboRect)
        if (args.length === 1 && (args[0] instanceof DOMRect || args[0] instanceof TurboRect)) {
            const other = args[0] as DOMRect;
            const thisPoly = this.points;
            const otherPoly: Point[] = other instanceof TurboRect ? other.points : aabbCorners(other);

            // If intersects, any point with distance 0 is fine
            if (polygonsIntersect(thisPoly, otherPoly)) {
                const oc = other instanceof TurboRect ? other.center
                    : new Point(other.x + other.width / 2, other.y + other.height / 2);
                return this.closestPoint(oc);
            }

            // Otherwise pick the point ON THIS rect that minimizes distance to the other shape
            let best = thisPoly[0];
            let bestDist = Infinity;

            // distance from a point p to the other rect
            const distToOther = (p: Point): number => {
                const q = other instanceof TurboRect ? other.closestPoint(p) : closestPointOnAabb(p, other);
                return Point.dist(p, q);
            };

            // 1) corners of THIS rect
            for (const p of thisPoly) {
                const d = distToOther(p);
                if (d < bestDist) {
                    bestDist = d;
                    best = p;
                }
            }

            // 2) closest points on THIS rect to corners of OTHER rect
            for (const p of otherPoly) {
                const q = this.closestPoint(p); // ON THIS rect
                const d = distToOther(q);
                if (d < bestDist) {
                    bestDist = d;
                    best = q;
                }
            }

            return best;
        }

        return;
    }

    public distanceTo(point: Point): number;
    public distanceTo(point1: Point, point2: Point): number;
    public distanceTo(rect: DOMRect): number;
    public distanceTo(...args: any[]): number {
        // Point
        if (args.length === 1 && args[0] instanceof Point) {
            const p = args[0] as Point;
            const q = this.closestPoint(p);
            return Point.dist(p, q);
        }

        // Segment AB
        if (args.length === 2 && args[0] instanceof Point && args[1] instanceof Point) {
            const a = args[0] as Point;
            const b = args[1] as Point;
            const pr = this.closestPoint(a, b);
            const ps = closestPointOnSegment(pr, a, b);
            return Point.dist(pr, ps);
        }

        // Rect
        if (args.length === 1 && (args[0] instanceof DOMRect || args[0] instanceof TurboRect)) {
            const other = args[0] as DOMRect;
            const pr = this.closestPoint(other);
            const po = other instanceof TurboRect ? other.closestPoint(pr) : closestPointOnAabb(pr, other);
            return Point.dist(pr, po);
        }

        return NaN;
    }

    public overlaps(other: DOMRect): boolean;
    public overlaps(point: Point): boolean;
    public overlaps(a: Point, b: Point): boolean; // segment AB
    public overlaps(...args: any[]): boolean {
        // (1) Point
        if (args.length === 1 && args[0] instanceof Point) {
            const p = args[0] as Point;
            const q = this.closestPoint(p);
            return Point.dist(p, q) <= 1e-6;
        }

        // (2) Segment AB
        if (args.length === 2 && args[0] instanceof Point && args[1] instanceof Point) {
            const a = args[0] as Point;
            const b = args[1] as Point;
            return segmentIntersectsPolygon(a, b, this.points) !== null;
        }

        // (3) Rect (DOMRect or TurboRect)
        if (args.length === 1 && (args[0] instanceof TurboRect || args[0] instanceof DOMRect)) {
            const other = args[0] as (DOMRect | TurboRect);
            const polyA = this.points;
            const polyB: Point[] = other instanceof TurboRect ? other.points : aabbCorners(other);
            return polygonsIntersect(polyA, polyB);
        }

        return false;
    }

}

export {TurboRect};
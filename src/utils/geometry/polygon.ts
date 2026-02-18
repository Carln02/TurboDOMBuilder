import {Point} from "../../turboComponents/datatypes/point/point";
import {intersectSegments} from "./segment";

function isPointInConvexPolygon(p: Point, poly: Point[]): boolean {
    let sign = 0;
    for (let i = 0; i < poly.length; i++) {
        const a = poly[i];
        const b = poly[(i + 1) % poly.length];
        const ab = b.sub(a);
        const ap = p.sub(a);
        const z = ab.x * ap.y - ab.y * ap.x;
        if (Math.abs(z) < 1e-12) continue;
        const s = z > 0 ? 1 : -1;
        if (sign === 0) sign = s;
        else if (sign !== s) return false;
    }
    return true;
}

function segmentIntersectsPolygon(a: Point, b: Point, poly: Point[]): Point | null {
    for (let i = 0; i < poly.length; i++) {
        const c = poly[i];
        const d = poly[(i + 1) % poly.length];
        const hit = intersectSegments(a, b, c, d);
        if (hit) return hit;
    }
    if (isPointInConvexPolygon(a, poly)) return a;
    if (isPointInConvexPolygon(b, poly)) return b;
    return null;
}

function projectPolygonOntoAxis(points: Point[], axis: Point): [number, number] {
    const len = Math.hypot(axis.x, axis.y) || 1;
    const ux = axis.x / len, uy = axis.y / len;

    let min = Infinity, max = -Infinity;
    for (const p of points) {
        const v = p.x * ux + p.y * uy;
        if (v < min) min = v;
        if (v > max) max = v;
    }
    return [min, max];
}

function hasSeparatingAxisForPolygons(polyA: Point[], polyB: Point[]): boolean {
    for (let i = 0; i < polyA.length; i++) {
        const p1 = polyA[i];
        const p2 = polyA[(i + 1) % polyA.length];
        const edge = p2.sub(p1);
        const axis = new Point(-edge.y, edge.x);

        const [aMin, aMax] = projectPolygonOntoAxis(polyA, axis);
        const [bMin, bMax] = projectPolygonOntoAxis(polyB, axis);

        if (aMax < bMin || bMax < aMin) return true;
    }
    return false;
}

function polygonsIntersect(a: Point[], b: Point[]): boolean {
    return !hasSeparatingAxisForPolygons(a, b) && !hasSeparatingAxisForPolygons(b, a);
}

export {isPointInConvexPolygon, segmentIntersectsPolygon, projectPolygonOntoAxis, hasSeparatingAxisForPolygons, polygonsIntersect};

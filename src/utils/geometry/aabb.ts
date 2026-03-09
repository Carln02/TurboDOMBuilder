import {Point} from "../../turboComponents/datatypes/point/point";

/**
 * @group Utilities
 * @category Geometry
 */
function aabbCorners(r: DOMRect): [Point, Point, Point, Point] {
    const x0 = r.x, y0 = r.y;
    const x1 = r.x + r.width, y1 = r.y + r.height;
    return [new Point(x0, y0), new Point(x1, y0), new Point(x1, y1), new Point(x0, y1)];
}

/**
 * @group Utilities
 * @category Geometry
 */
function closestPointOnAabb(p: Point, r: DOMRect): Point {
    const x0 = r.x, y0 = r.y;
    const x1 = r.x + r.width, y1 = r.y + r.height;
    const x = Math.max(x0, Math.min(x1, p.x));
    const y = Math.max(y0, Math.min(y1, p.y));
    return new Point(x, y);
}

export {aabbCorners, closestPointOnAabb}
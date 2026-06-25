import {Coordinate} from "../../types/basic.types";
import {trim} from "../computations/misc";
import {Point} from "../../turboComponents/datatypes/point/point";
import {Side} from "../../types/enums.types";

function closestPointOnEdge(pointer: Coordinate, rect: DOMRect): Point {
    const closestPoint = {
        x:  trim(pointer.x, rect.right, rect.left),
        y: trim(pointer.y, rect.bottom, rect.top)
    };

   const axisFromSide = (side: Side) => {
        if (side === Side.top || side === Side.bottom) return "y";
        if (side === Side.left || side === Side.right) return "x";
    };

    let closestSide = Side.top;
    Object.values(Side).forEach(side => {
        if (Math.abs(closestPoint[axisFromSide(side)] - rect[side])
            < Math.abs(closestPoint[axisFromSide(closestSide)] - rect[closestSide])) closestSide = side;
    });

    closestPoint[axisFromSide(closestSide)] = rect[closestSide];
    return new Point(closestPoint);
}

function pointInsideRect(point: Coordinate, rect: DOMRect, margin: number = 5): boolean {
    return (point.x < rect.right + margin && point.x > rect.left - margin)
        && (point.y < rect.bottom + margin && point.y > rect.top - margin);
}

export {closestPointOnEdge, pointInsideRect};
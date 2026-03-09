import {Point} from "../point/point";
import {Anchor} from "../../../types/enums.types";
import {auto} from "../../../decorators/auto/auto";

/**
 * @class AnchorPoint
 * @group Components
 * @category AnchorPoint
 */
class AnchorPoint {
    public constructor(anchor?: Point | Anchor) {
        this.value = anchor;
    }

    @auto({
        preprocessValue: function (value) {
            if (typeof value === "object" && value instanceof Point) return value;
            if (Object.values(Anchor).includes(value)) return AnchorPoint.enumToPoint(value);
            return (this as any)._value;
        }
    }) public set value(value: Point | Anchor) {}
    public get value(): Point {return;}

    public get enum(): Anchor {
        return AnchorPoint.pointToEnum(this.value);
    }

    public static pointToEnum(value: Point): Anchor {
        if (!value) return Anchor.Center;

        const snapAxis = (n: number): -100 | 0 | 100 => n < -50 ? -100 : n > 50 ? 100 : 0;
        const x = snapAxis(value.x);
        const y = snapAxis(value.y);

        if (y === -100) {
            if (x === -100) return Anchor.TopLeft;
            if (x === 0) return Anchor.TopMiddle;
            return Anchor.TopRight;
        }

        if (y === 0) {
            if (x === -100) return Anchor.CenterLeft;
            if (x === 0) return Anchor.Center;
            return Anchor.CenterRight;
        }

        if (x === -100) return Anchor.BottomLeft;
        if (x === 0) return Anchor.BottomMiddle;
        return Anchor.BottomRight;
    }

    public static enumToPoint(value: Anchor): Point {
        if (!value) return new Point();
        switch (value) {
            case Anchor.TopLeft:
                return new Point(-100, -100);
            case Anchor.TopMiddle:
                return new Point(0, -100);
            case Anchor.TopRight:
                return new Point(100, -100);
            case Anchor.CenterLeft:
                return new Point(-100, 0);
            case Anchor.Center:
                return new Point(0, 0);
            case Anchor.CenterRight:
                return new Point(100, 0);
            case Anchor.BottomLeft:
                return new Point(-100, 100);
            case Anchor.BottomMiddle:
                return new Point(0, 100);
            case Anchor.BottomRight:
                return new Point(100, 100);
        }
    }
}

export {AnchorPoint};
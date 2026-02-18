import {Anchor} from "../../../types/enums.types";
import {Point} from "../point/point";
import {AnchorPoint} from "../anchorPoint/anchorPoint";

type TurboRectProperties = {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    angleRad?: number,
    angleDeg?: number,
    anchor?: Point | Anchor | AnchorPoint,
}

export {TurboRectProperties};
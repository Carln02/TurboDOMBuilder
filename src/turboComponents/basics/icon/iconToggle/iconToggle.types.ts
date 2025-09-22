import {TurboIconProperties} from "../icon.types";
import {TurboIconToggle} from "./iconToggle";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";

type TurboIconToggleProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> = TurboIconProperties<ViewType, DataType, ModelType> & {
    toggled?: boolean,
    toggleOnClick?: boolean,
    onToggle?: (value: boolean, el: TurboIconToggle) => void,
}

export {TurboIconToggleProperties};
import {TurboIconProperties} from "../icon.types";
import {TurboIconToggle} from "./iconToggle";
import {TurboView} from "../../../../domBuilding/turboElement/turboView";
import {TurboModel} from "../../../../domBuilding/turboElement/turboModel";

type TurboIconToggleProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
> = TurboIconProperties<ViewType, DataType, ModelType> & {
    toggled?: boolean,
    onToggle?: (value: boolean, el: TurboIconToggle) => void,
}

export {TurboIconToggleProperties};
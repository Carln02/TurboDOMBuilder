import {TurboIconProperties} from "../icon.types";
import {TurboIconToggle} from "./iconToggle";
import {TurboView} from "../../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../../domBuilding/mvc/turboModel";
import {TurboEmitter} from "../../../../domBuilding/mvc/turboEmitter";

type TurboIconToggleProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> = TurboIconProperties<ViewType, DataType, ModelType, EmitterType> & {
    toggled?: boolean,
    onToggle?: (value: boolean, el: TurboIconToggle) => void,
}

export {TurboIconToggleProperties};
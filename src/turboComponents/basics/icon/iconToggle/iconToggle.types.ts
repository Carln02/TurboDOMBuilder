import {TurboIconProperties} from "../icon.types";
import {TurboIconToggle} from "./iconToggle";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";
import {TurboEmitter} from "../../../../mvc/core/emitter";

type TurboIconToggleProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboIconProperties<ViewType, DataType, ModelType, EmitterType> & {
    toggled?: boolean,
    toggleOnClick?: boolean,
    onToggle?: (value: boolean, el: TurboIconToggle) => void,
}

declare module "../../../../core.types" {
    interface TurboElementTagNameMap {
        "turbo-icon-toggle": TurboIconToggle
    }
}

export {TurboIconToggleProperties};
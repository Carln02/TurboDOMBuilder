import {StatefulReifect} from "../../wrappers/statefulReifect/statefulReifect";
import {StatefulReifectProperties} from "../../wrappers/statefulReifect/statefulReifect.types";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";
import {InOut} from "../../../types/enums.types";
import {TurboMarkingMenu} from "./markingMenu";

/**
 * @group Components
 * @category TurboMarkingMenu
 */
type TurboMarkingMenuProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> = TurboElementProperties<ViewType, DataType, ModelType> & {
    transition?: StatefulReifect<InOut> | StatefulReifectProperties<InOut>,

    startAngle?: number,
    endAngle?: number,

    semiMajor?: number,
    semiMinor?: number,
    minDragDistance?: number
}


declare module "../../../types/element.types" {
    interface TurboElementTagNameMap {
        "turbo-marking-menu": TurboMarkingMenu
    }
}

export {TurboMarkingMenuProperties};
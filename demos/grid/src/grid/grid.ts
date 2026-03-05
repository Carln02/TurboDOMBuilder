import {TurboElement, TurboView, TurboEmitter, define} from "../../../../build/turbodombuilder.esm";
import "./grid.css";
import {TurboGridModel} from "./grid.model";
import {TurboGridView} from "./grid.view";

@define("turbo-grid")
class TurboGrid<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboGridModel = TurboGridModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    public static defaultProperties = {
        model: TurboGridModel,
        view: TurboGridView
    };
}

export {TurboGrid};
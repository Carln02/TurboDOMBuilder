import {TurboEmitter} from "../../domBuilding/mvc/turboEmitter";
import {TurboCustomProperties} from "../../domBuilding/turboElement/turboElement.types";
import {ToolManager} from "../toolManager/toolManager";
import {ToolModel} from "./tool.model";
import {ToolView} from "./tool.view";

type ToolProperties<
    ToolType = string,
    ViewType extends ToolView = ToolView<any, any>,
    DataType extends object = object,
    ModelType extends ToolModel = ToolModel<DataType>,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboCustomProperties<ViewType, DataType, ModelType, EmitterType> & {
    toolManager?: ToolManager<ToolType>,
    name?: ToolType,
    key?: string,
    forceNewModel?: boolean
};

export {ToolProperties};
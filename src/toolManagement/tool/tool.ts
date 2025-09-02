import {ToolManager} from "../toolManager/toolManager";
import {TurboElement} from "../../domBuilding/turboElement/turboElement";
import {TurboEmitter} from "../../domBuilding/mvc/turboEmitter";
import {ToolProperties} from "./tool.types";
import {ToolModel} from "./tool.model";
import {ToolView} from "./tool.view";
import {define} from "../../domBuilding/decorators/define";

/**
 * @description General Tool class that defines basic behaviors and "abstract" functions tools could use to handle events
 */
@define("turbo-tool")
class Tool<
    ToolType = string,
    ViewType extends ToolView = ToolView<any, any>,
    DataType extends object = object,
    ModelType extends ToolModel = ToolModel<DataType>,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    /**
     * @description The name of the tool
     */
    public readonly name: ToolType;

    private readonly _toolManager: ToolManager<ToolType>;

    public constructor(properties: ToolProperties<ToolType, ViewType, DataType, ModelType, EmitterType>) {
        if (!properties.modelConstructor) properties.modelConstructor = ToolModel as new () => ModelType;
        if (!properties.viewConstructor) properties.viewConstructor = ToolView as new () => ViewType;

        if (!properties.forceNewModel && !properties.model) properties.model =
            properties.toolManager.getToolByName(properties.name)?.model as ModelType;

        super(properties);
        this.name = properties.name;
        this._toolManager = properties.toolManager;
        if (properties.generate === undefined) this.mvc.generate(properties);

        this.toolManager.addTool(this, properties.key);
    }

    public get toolManager(): ToolManager<ToolType> {
        return this._toolManager;
    }

    /**
     * @description Fired when the tool is picked up
     */
    public activate() {}

    /**
     * Fired when tool is put down (deselected)
     */
    public deactivate() {}

    /**
     * @description Marks whether the tool is selected or not. Accurately reflected on its instances
     */
    public get selected(): boolean {
        return this.model.selected;
    }

    public set selected(value: boolean) {
        this.model.selected = value;
    }
}

export {Tool};
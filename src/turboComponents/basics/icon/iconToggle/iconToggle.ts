import {TurboIcon} from "../icon";
import {TurboIconToggleProperties} from "./iconToggle.types";
import {define} from "../../../../domBuilding/decorators/define";
import {TurboView} from "../../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../../domBuilding/mvc/turboModel";
import {TurboEmitter} from "../../../../domBuilding/mvc/turboEmitter";

@define()
class TurboIconToggle<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboIcon<ViewType, DataType, ModelType, EmitterType> {
    private _toggled: boolean = false;
    private readonly onToggle: (value: boolean, el: TurboIconToggle) => void;

    constructor(properties: TurboIconToggleProperties<ViewType, DataType, ModelType, EmitterType>) {
        super(properties);
        this.toggled = properties.toggled;
        this.onToggle = properties.onToggle;
    }

    public get toggled() {
        return this._toggled;
    }

    public set toggled(value: boolean) {
        this._toggled = value;
        if (this.onToggle) this.onToggle(value, this);
    }

    public toggle() {
        this.toggled = !this.toggled;
    }
}

export {TurboIconToggle};
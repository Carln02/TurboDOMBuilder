import {TurboIcon} from "../icon";
import {TurboIconToggleProperties} from "./iconToggle.types";
import {define} from "../../../../domBuilding/decorators/define";
import {TurboView} from "../../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../../domBuilding/mvc/turboModel";
import {auto} from "../../../../domBuilding/decorators/auto/auto";
import {DefaultEventName} from "../../../../eventHandling/eventNaming";

@define()
class TurboIconToggle<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel
> extends TurboIcon<ViewType, DataType, ModelType> {
    public onToggle: (value: boolean, el: TurboIconToggle) => void;

    public constructor(properties: TurboIconToggleProperties<ViewType, DataType, ModelType>) {
        super(properties);
        this.toggled = properties.toggled ?? false;
        this.onToggle = properties.onToggle;
        this.toggleOnClick = properties.toggleOnClick ?? false;
    }

    @auto({cancelIfUnchanged: true})
    public set toggled(value: boolean) {
        if (this.onToggle) this.onToggle(value, this);
    }

    @auto({cancelIfUnchanged: true})
    public set toggleOnClick(value: boolean) {
        if (value) this.addListener(DefaultEventName.click, this.clickListener);
        else this.removeListener(DefaultEventName.click, this.clickListener);
    }

    public toggle() {
        this.toggled = !this.toggled;
    }

    private clickListener = () => this.toggle();
}

export {TurboIconToggle};
import {TurboIcon} from "../icon";
import {TurboIconToggleProperties} from "./iconToggle.types";
import {DefaultEventName} from "../../../../eventHandling/eventNaming";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";
import {auto} from "../../../../decorators/auto/auto";
import {$} from "../../../../turboFunctions/turboFunctions";

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
        if (value) $(this).on(DefaultEventName.click, this.clickListener);
        else $(this).removeListener(DefaultEventName.click, this.clickListener);
    }

    public toggle() {
        this.toggled = !this.toggled;
    }

    private clickListener = () => this.toggle();
}

export {TurboIconToggle};
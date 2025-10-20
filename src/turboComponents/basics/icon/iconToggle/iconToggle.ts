import {icon, TurboIcon} from "../icon";
import {DefaultEventName} from "../../../../eventHandling/eventNaming";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";
import {auto} from "../../../../decorators/auto/auto";
import {$} from "../../../../turboFunctions/turboFunctions";
import {TurboEmitter} from "../../../../mvc/core/emitter";
import {TurboIconToggleProperties} from "./iconToggle.types";
import {TurboIconConfig} from "../icon.types";

@define("turbo-icon-toggle")
class TurboIconToggle<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboIcon<ViewType, DataType, ModelType, EmitterType> {
    public config: TurboIconConfig = {...TurboIcon.config};

    public stopPropagationOnClick: boolean = true;

    public onToggle: (value: boolean, el: TurboIconToggle) => void;
    private clickListener = () => {
        this.toggle();
        return this.stopPropagationOnClick;
    }

    @auto({initialValue: false})
    public set toggled(value: boolean) {
        if (this.onToggle) this.onToggle(value, this);
    }

    @auto({initialValue: false})
    public set toggleOnClick(value: boolean) {
        if (value) $(this).on(DefaultEventName.click, this.clickListener);
        else $(this).removeListener(DefaultEventName.click, this.clickListener);
    }

    public toggle() {
        this.toggled = !this.toggled;
    }
}

function iconToggle<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(
    properties: TurboIconToggleProperties<ViewType, DataType, ModelType, EmitterType>
): TurboIconToggle<ViewType, DataType, ModelType, EmitterType> {
    if (!properties.tag) properties.tag = "turbo-icon-toggle";
    return icon({...properties}) as any;
}

export {TurboIconToggle, iconToggle};
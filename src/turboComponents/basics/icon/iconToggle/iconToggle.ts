import {TurboIcon} from "../icon";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/view/view";
import {TurboModel} from "../../../../mvc/model/model";
import {auto} from "../../../../decorators/auto/auto";
import {turbo} from "../../../../turboFunctions/turboFunctions";
import {TurboEmitter} from "../../../../mvc/emitter/emitter";
import {DefaultEventName} from "../../../../types/eventNaming.types";
import {TurboIconToggleProperties} from "./iconToggle.types";

/**
 * @group Components
 * @category TurboIconToggle
 */
class TurboIconToggle<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboIcon<ViewType, DataType, ModelType, EmitterType> {
     public declare readonly properties: TurboIconToggleProperties;
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
        if (value) turbo(this).on(DefaultEventName.click, this.clickListener);
        else turbo(this).removeListener(DefaultEventName.click, this.clickListener);
    }

    public toggle() {
        this.toggled = !this.toggled;
    }
}

define(TurboIconToggle);
export {TurboIconToggle};
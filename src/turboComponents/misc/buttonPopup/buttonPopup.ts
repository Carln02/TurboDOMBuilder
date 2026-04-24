import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {ValidTag} from "../../../types/element.types";
import {TurboButton} from "../../basics/button/button";
import {TurboPopup} from "../../containers/popup/popup";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {auto} from "../../../decorators/auto/auto";
import {Propagation} from "../../../turboFunctions/event/event.types";
import {TurboButtonPopupProperties} from "./buttonPopup.types";

/**
 * @class TurboButtonPopup
 * @group Components
 * @category TurboButton
 *
 * @description Button class for creating Turbo button elements.
 * @extends TurboElement
 */
class TurboButtonPopup<
    ElementTag extends ValidTag = any,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboButton<ElementTag, ViewType, DataType, ModelType, EmitterType> {
     public declare readonly properties: TurboButtonPopupProperties;
    private popupOpen: boolean = false;

    @auto({
        callBefore: function () {turbo(this.popup).removeClass(this.popupClasses)},
        callAfter: function () {turbo(this.popup).addClass(this.popupClasses)}
    }) public popupClasses: string | string[];

    /**
     * The dropdown's popup element.
     */
    @auto({defaultValueCallback: () => TurboPopup.create()}) public set popup(value: HTMLElement) {
        if (value instanceof TurboPopup) value.anchor = this;
        turbo(value).addClass(this.popupClasses);
    }

    protected setupUIListeners() {
        super.setupUIListeners();
        turbo(document.body).on(DefaultEventName.click, () => e => {
            if (this.popupOpen && !this.contains(e.target as Node)) this.openPopup(false);
        }, {capture: true});

        turbo(this).on(DefaultEventName.click, (e) => {
            this.openPopup(!this.popupOpen);
            return Propagation.stopPropagation;
        });
    }

    private openPopup(b: boolean) {
        if (this.popupOpen == b) return;
        this.popupOpen = b;
        if ("show" in this.popup && typeof this.popup.show === "function") this.popup.show(b);
        else turbo(this.popup).show(b);
    }
}

define(TurboButtonPopup);
export {TurboButtonPopup};
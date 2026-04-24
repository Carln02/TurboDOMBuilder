import {TurboButton} from "../../basics/button/button";
import "./dropdown.css";
import {TurboSelect} from "../../basics/select/select";
import {TurboPopup} from "../../containers/popup/popup";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {auto} from "../../../decorators/auto/auto";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {HTMLTag} from "../../../types/htmlElement.types";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {stringify} from "../../../utils/dataManipulation/string";
import {Propagation} from "../../../turboFunctions/event/event.types";
import {TurboSelectElement} from "../../basics/selectElement/selectElement";
import {TurboDropdownProperties} from "./dropdown.types";

/**
 * @class TurboDropdown
 * @group Components
 * @category TurboDropdown
 *
 * @description Dropdown class for creating Turbo button elements.
 * @extends TurboElement
 */
class TurboDropdown<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboSelectElement<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> {
    //TODO MOVE DEFAULT CLICK TO MAIN CONFIG
     public declare readonly properties: TurboDropdownProperties;
    public static defaultProperties: TurboDropdownProperties = {
        selectorTag: "h4",
    };

    public readonly select: TurboSelect<ValueType, SecondaryValueType, EntryType> = TurboSelect.create({
        onEntryClicked: () => this.openPopup(false)
    }) as any;

    private popupOpen: boolean = false;

    public selectorTag: HTMLTag;

    @auto({
        callBefore: function () {turbo(this.selector).removeClass(this.selectorClasses)},
        callAfter: function () {turbo(this.selector).addClass(this.selectorClasses)}
    }) public selectorClasses: string | string[];

    @auto({
        callBefore: function () {turbo(this.popup).removeClass(this.popupClasses)},
        callAfter: function () {turbo(this.popup).addClass(this.popupClasses)}
    }) public popupClasses: string | string[];

    /**
     * The dropdown's selector element.
     */
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value: string | HTMLElement) {
            if (value instanceof HTMLElement) return value;
            const text = typeof value === "string" ? value : stringify(this.select.getValue(this.entries[0]));
            if (this.selector instanceof TurboButton) this.selector.text = text;
            else return TurboButton.create({text, elementTag: this.selectorTag});
        }
    }) public set selector(value: string | HTMLElement) {
        if (!(value instanceof HTMLElement)) return;
        turbo(value)
            .addClass(this.selectorClasses)
            .on(DefaultEventName.click, (e) => {
                this.openPopup(!this.popupOpen);
                return Propagation.stopPropagation;
            });
        if (this.popup instanceof TurboPopup) this.popup.anchor = value;
        turbo(this).addChild(value);
        if (value instanceof TurboButton) this.select.onSelect = () => value.text = this.stringSelectedValue;
    }

    public get selector(): HTMLElement {return}

    /**
     * The dropdown's popup element.
     */
    @auto({defaultValueCallback: () => TurboPopup.create()}) public set popup(value: HTMLElement) {
        if (value instanceof TurboPopup) value.anchor = this.selector;
        turbo(value).addClass(this.popupClasses);
        this.select.parent = value;
    }

    public initialize() {
        super.initialize();
        this.selector;
        turbo(document.body).on(DefaultEventName.click, () => e => {
            if (this.popupOpen && !this.contains(e.target as Node)) this.openPopup(false);
        }, {capture: true});
    }

    private openPopup(b: boolean) {
        if (this.popupOpen == b) return;
        this.popupOpen = b;
        if ("show" in this.popup && typeof this.popup.show === "function") this.popup.show(b);
        else turbo(this.popup).show(b);
    }
}

define(TurboDropdown);
export {TurboDropdown};
import {button, TurboButton} from "../../basics/button/button";
import {TurboDropdownConfig, TurboDropdownProperties} from "./dropdown.types";
import "./dropdown.css";
import {TurboSelect} from "../../basics/select/select";
import {popup, TurboPopup} from "../../containers/popup/popup";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {TurboElement} from "../../../turboElement/turboElement";
import {auto} from "../../../decorators/auto/auto";
import {expose} from "../../../decorators/expose";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {element} from "../../../elementCreation/element";
import {HTMLTag} from "../../../types/htmlElement.types";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {stringify} from "../../../utils/dataManipulation/string";

/**
 * @class TurboDropdown
 * @group Components
 * @category TurboDropdown
 *
 * @description Dropdown class for creating Turbo button elements.
 * @extends TurboElement
 */
@define("turbo-dropdown")
class TurboDropdown<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    //TODO MOVE DEFAULT CLICK TO MAIN CONFIG
    public static readonly config: TurboDropdownConfig = {...TurboElement.config, defaultSelectorTag: "h4"};

    public readonly select: TurboSelect<ValueType, SecondaryValueType, EntryType> = new TurboSelect({
        onEntryAdded: (entry: EntryType) => this.onEntryAdded(entry),
    });

    private popupOpen: boolean = false;

    @auto({defaultValueCallback: function () {return this.getPropertiesValue(undefined, "defaultSelectorTag")}})
    public selectorTag: HTMLTag;

    @auto({
        defaultValueCallback: function () {return this.getPropertiesValue(undefined, "defaultSelectorClasses")},
        callBefore: function () {turbo(this.selector).removeClass(this.selectorClasses)},
        callAfter: function () {turbo(this.selector).addClass(this.selectorClasses)}
    }) public selectorClasses: string | string[];

    @auto({
        defaultValueCallback: function () {return this.getPropertiesValue(undefined, "defaultPopupClasses")},
        callBefore: function () {turbo(this.popup).removeClass(this.popupClasses)},
        callAfter: function () {turbo(this.popup).addClass(this.popupClasses)}
    }) public popupClasses: string | string[];

    @expose("select") public entries: HTMLCollection | NodeList | EntryType[];

    // public set values(values: ValueType[]) {
    //     this.select.values = values;
    // }
    //
    // public get values(): ValueType[] {
    //     return this.select.values;
    // }
    @expose("select") public values: ValueType[];

    protected onEntryAdded(entry: EntryType) {
        (this.select as any).initializeSelection();
        turbo(entry).on(DefaultEventName.click, () => {
            this.select.select(entry, !this.select.isSelected(entry));
            this.openPopup(false);
            return true;
        });
    }

    /**
     * The dropdown's selector element.
     */
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value: string | HTMLElement) {
            if (value instanceof HTMLElement) return value;
            const text = typeof value === "string" ? value : stringify(this.select.getValue(this.entries[0]));
            if (this.selector instanceof TurboButton) this.selector.text = text;
            else return button({text, elementTag: this.selectorTag});
        }
    }) public set selector(value: string | HTMLElement) {
        if (!(value instanceof HTMLElement)) return;
        turbo(value)
            .addClass(this.selectorClasses)
            .on(DefaultEventName.click, (e) => {
                this.openPopup(!this.popupOpen);
                return true;
            });
        if (this.popup instanceof TurboPopup) this.popup.anchor = value;
        turbo(this).addChild(value);
        if (value instanceof TurboButton) this.select.onSelect = () => value.text = this.stringSelectedValue;
    }

    public get selector(): HTMLElement {return}

    /**
     * The dropdown's popup element.
     */
    @auto({defaultValueCallback: () => popup()}) public set popup(value: HTMLElement) {
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

    public get selectedValues(): ValueType[] {
        return this.select.selectedValues;
    }

    public get selectedValue(): ValueType {
        return this.select.selectedValue;
    }

    public get selectedSecondaryValues(): SecondaryValueType[] {
        return this.select.selectedSecondaryValues;
    }

    public get selectedSecondaryValue(): SecondaryValueType {
        return this.select.selectedSecondaryValue;
    }

    public get stringSelectedValue(): string {
        return this.select.stringSelectedValue;
    }
}

/**
 * @group Components
 * @category TurboDropdown
 * @param properties
 */
function dropdown<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(properties: TurboDropdownProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> = {}):
    TurboDropdown<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> {
    if (!properties.tag) properties.tag = "turbo-dropdown";
    return element({...properties, text: undefined}) as any;
}

export {TurboDropdown, dropdown};
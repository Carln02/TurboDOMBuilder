import {button, TurboButton} from "../../basics/button/button";
import {TurboDropdownConfig, TurboDropdownProperties} from "./dropdown.types";
import "./dropdown.css";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {TurboSelect} from "../../basics/select/select";
import {popup} from "../../containers/popup/popup";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {$} from "../../../turboFunctions/turboFunctions";
import {TurboElement} from "../../../turboElement/turboElement";
import {auto} from "../../../decorators/auto/auto";
import {HTMLTag} from "../../../core.types";
import {stringify} from "../../../utils/dataManipulation/stringManipulation";
import {expose} from "../../../decorators/expose";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {element} from "../../../elementCreation/element";

/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
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
    public static readonly config: TurboDropdownConfig = {defaultSelectorTag: "h4"};

    private popupOpen: boolean = false;
    public customSelectorTag: HTMLTag;

    @auto() public set customSelectorClasses(value: string | string[]) {
        $(this.selector).addClass(this.getPropertiesValue(value, "defaultSelectorClasses"));
    }

    @auto() public set customPopupClasses(value: string | string[]) {
        $(this.selector).addClass(this.getPropertiesValue(value, "defaultPopupClasses"));
    }

    @expose("select") public entries: HTMLCollection | NodeList | EntryType[];
    @expose("select") public values: ValueType[];

    public readonly select: TurboSelect<ValueType, SecondaryValueType, EntryType> = new TurboSelect({
        onEntryAdded: (entry: EntryType) => $(entry).on(DefaultEventName.click, () => {
            this.select.select(entry);
            this.openPopup(false);
        })
    });

    /**
     * The dropdown's selector element.
     */
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value: string | HTMLElement) {
            if (value instanceof HTMLElement) return value;
            const text = typeof value === "string" ? value : stringify(this.select.getValue(this.entries[0]));
            if (this.selector instanceof TurboButton) this.selector.text = text;
            else return button({text, elementTag: this.getPropertiesValue(this.customSelectorTag, "defaultSelectorTag")});
        }
    }) public set selector(value: string | HTMLElement) {
        if (!(value instanceof HTMLElement)) return;
        $(value).on(DefaultEventName.click, (e) => {
            this.openPopup(!this.popupOpen);
            e.stopImmediatePropagation();
        }).addClass(this.getPropertiesValue(this.customSelectorClasses, "defaultSelectorClasses"));

        $(this).addChild(value);
        if (value instanceof TurboButton) this.select.onSelect = () => value.text = this.stringSelectedValue;
    }

    public get selector(): HTMLElement {return}

    /**
     * The dropdown's popup element.
     */
    @auto({setIfUndefined: true, defaultValue: popup()}) public set popup(value: HTMLElement) {
        $(this).addChild(value);
        $(value).show(false)
            .addClass(this.getPropertiesValue(this.customPopupClasses, "defaultPopupClasses"));
        this.select.parent = value;
    }

    public connectedCallback() {
        super.connectedCallback();
        $(document).on(DefaultEventName.click, e => {
            if (this.popupOpen && !this.contains(e.target as Node)) this.openPopup(false);
        });
    }

    private openPopup(b: boolean) {
        if (this.popupOpen == b) return;
        this.popupOpen = b;
        if (this.popup instanceof TurboElement) this.popup.show(b);
        else this.popup.show(b);
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
    return element({...properties, text: undefined, tag: "turbo-dropdown"} as any) as any;
}

export {TurboDropdown, dropdown};
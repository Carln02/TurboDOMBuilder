import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {button, TurboButton} from "../../basics/button/button";
import {TurboDropdownConfig, TurboDropdownProperties} from "./dropdown.types";
import "./dropdown.css";
import {define} from "../../../domBuilding/decorators/define";
import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {TurboSelect} from "../../basics/select/select";
import {TurboPopup} from "../../containers/popup/popup";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";

/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
 * @extends TurboElement
 */
@define("turbo-dropdown")
class TurboDropdown<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboSelect<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> {
    /**
     * The dropdown's selector element.
     */
    public selector: HTMLElement;

    /**
     * The dropdown's popup element.
     */
    public readonly popup: HTMLElement;

    private popupOpen: boolean = false;

    //TODO MOVE DEFAULT CLICK TO MAIN CONFIG
    public static readonly config: TurboDropdownConfig = {defaultEntryTag: "h4", defaultSelectorTag: "h4"};

    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboDropdownProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType,
        ModelType>) {
        properties.entriesParent = properties.popup || new TurboPopup();
        super(properties);

        this.selector = properties.selector instanceof HTMLElement ? properties.selector : button({buttonText: "",
            customTextTag: properties.customSelectorTag || TurboDropdown.config.defaultSelectorTag});
        this.popup = properties.entriesParent as HTMLElement;

        this.initPopup(properties);
        this.initSelector(properties);

        requestAnimationFrame(() =>  document.addListener(DefaultEventName.click, e => {
            if (this.popupOpen && !this.contains(e.target as Node)) this.openPopup(false);
        }));
    }

    private initSelector(properties: TurboDropdownProperties<ValueType, SecondaryValueType, EntryType, ViewType,
        DataType, ModelType>) {
        if (this.selector instanceof TurboButton) {
            if (typeof properties.selector == "string") this.selector.text = properties.selector;
            else if (!properties.selector) {
                const selectorText = this.entries[0]?.value;
                if (typeof selectorText == "string" && !this.selector.text) this.selector.text = selectorText;
            }
        }

        this.selector.addListener(DefaultEventName.click, (e) => {
            this.openPopup(!this.popupOpen);
            e.stopImmediatePropagation();
        });

        this.addChild(this.selector);
        this.selector.addClass(properties.customSelectorClasses
            ? properties.customSelectorClasses
            : TurboDropdown.config.defaultSelectorClasses);
    }

    private initPopup(properties: TurboDropdownProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType,
        ModelType>) {
        this.addChild(this.popup);
        this.popup.show(false);
        this.popup.addClass(properties.customPopupClasses
            ? properties.customPopupClasses
            : TurboDropdown.config.defaultPopupClasses);
    }

    protected onEntryClick(entry: EntryType) {
        super.onEntryClick(entry);
        this.openPopup(false);
    }

    public select(entry: ValueType | EntryType): this {
        super.select(entry);
        if (this.selector instanceof TurboButton) this.selector.text = this.stringSelectedValue;
        return this;
    }

    private openPopup(b: boolean) {
        if (this.popupOpen == b) return;
        this.popupOpen = b;
        if (this.popup instanceof TurboElement) this.popup.show(b);
        else this.popup.show(b);
    }
}

export {TurboDropdown};
import {define} from "../../../../domBuilding/decorators/define";
import {TurboSelectEntryConfig, TurboSelectEntryProperties} from "./selectEntry.types";
import {input} from "../../../../domBuilding/elementCreation/basicElements";
import {stringify} from "../../../../utils/dataManipulation/stringManipulation";
import {auto} from "../../../../domBuilding/decorators/auto/auto";
import {TurboRichElement} from "../../richElement/richElement";
import {ValidTag} from "../../../../domBuilding/core.types";

/**
 * @class TurboSelectEntry
 * @description Class representing an entry within a TurboSelect.
 * @extends TurboElement
 */

@define("turbo-select-entry")
class TurboSelectEntry<ValueType = string, ElementTag extends ValidTag = "p"> extends TurboRichElement<ElementTag> {
    private _value: ValueType;
    private _selected: boolean;

    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    public selectedClasses: string | string[] = "";

    private readonly action: () => void;
    private readonly onSelected: (selected: boolean) => void;
    private readonly onEnabled: (enabled: boolean) => void;

    private readonly reflectedElement: HTMLElement;

    private inputElement: HTMLInputElement;

    public readonly config: TurboSelectEntryConfig = {};

    /**
     * @description DropdownEntry constructor
     * @param {TurboSelectEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboSelectEntryProperties<ValueType, ElementTag>) {
        super(properties);

        if (!properties.unsetDefaultClasses) this.addClass(TurboSelectEntry.config.defaultClasses);
        this.selectedClasses = properties.selectedClasses;

        this.action = properties.action || (() => {});
        this.onSelected = properties.onSelected || (() => {});
        this.onEnabled = properties.onEnabled || (() => {});

        this.reflectedElement = properties.reflectValueOn != undefined ? properties.reflectValueOn : this;
        this.inputName = properties.inputName;

        this.value = properties.value;

        this.selected = properties.selected || false;
        this.enabled = properties.enabled || true;
    }

    /**
     * @description Toggles the selection of this dropdown entry
     */
    public toggle() {
        this.selected = !this.selected;
    }

    /**
     * @description The value of the dropdown entry
     */
    public get value(): ValueType {
        return this._value;
    }

    public set value(value: ValueType) {
        this._value = value;
        if (this.reflectedElement) {
            if (this.reflectedElement instanceof TurboRichElement) this.reflectedElement.text = this.stringValue;
            else this.reflectedElement.innerText = this.stringValue;
        }
        if (this.inputElement) this.inputElement.value =  this.stringValue;
    }

    public get stringValue(): string {
        return stringify(this.value);
    }

    /**
     * @description Whether or not the dropdown entry is selected
     */
    public get selected() {
        return this._selected;
    }

    public set selected(value: boolean) {
        if (value == this.selected) return;
        this._selected = value;

        this.toggleClass(this.selectedClasses, value);
        if (value) this.action();
        this.onSelected(value);
    }

    @auto()
    public set enabled(value: boolean)  {
        if (!value && this.selected) this.selected = false;

        this.reifects.enabled = value;
        this.setStyle("visibility", value ? "" : "hidden");
        this.onEnabled(value);
    }

    public get inputName(): string {
        return this.inputElement?.name || null;
    }

    public set inputName(value: string) {
        if (!value) return;
        if (!this.inputElement) this.inputElement = input({
            type: "hidden",
            name: value,
            parent: this,
            value: this.stringValue
        });

        else this.inputElement.name = value;
    }
}

function selectEntry<ValueType = string, ElementTag extends ValidTag = "p">
(properties: TurboSelectEntryProperties<ValueType, ElementTag>): TurboSelectEntry<ValueType, ElementTag> {
    return new TurboSelectEntry<ValueType, ElementTag>(properties);
}

export {TurboSelectEntry, selectEntry};
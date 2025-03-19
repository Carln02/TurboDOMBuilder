import {define} from "../../../../domBuilding/decorators/define";
import {TurboSelectEntryConfig, TurboSelectEntryProperties} from "./selectEntry.types";
import {input} from "../../../../domBuilding/elementCreation/basicElements";
import {stringify} from "../../../../utils/dataManipulation/stringManipulation";
import {auto} from "../../../../domBuilding/decorators/auto/auto";
import {TurboRichElement} from "../../richElement/richElement";
import {ValidTag} from "../../../../domBuilding/core.types";
import {TurboView} from "../../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../../domBuilding/mvc/turboModel";

/**
 * @class TurboSelectEntry
 * @description Class representing an entry within a TurboSelect.
 * @extends TurboElement
 */

@define()
class TurboSelectEntry<
    ValueType = string,
    SecondaryValueType = string,
    ElementTag extends ValidTag = "p",
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboRichElement<ElementTag, ViewType, DataType, ModelType> {
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    public selectedClasses: string | string[] = "";

    private readonly action: () => void;
    public onSelected: (selected: boolean) => void;
    public onEnabled: (enabled: boolean) => void;

    private readonly reflectedElement: HTMLElement;

    private inputElement: HTMLInputElement;

    public readonly config: TurboSelectEntryConfig = {};

    /**
     * @description DropdownEntry constructor
     * @param {TurboSelectEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    public constructor(properties: TurboSelectEntryProperties<ValueType, SecondaryValueType, ElementTag, ViewType,
        DataType, ModelType>) {
        super(properties);

        if (!properties.unsetDefaultClasses) this.addClass(TurboSelectEntry.config.defaultClasses);
        this.selectedClasses = properties.selectedClasses;

        this.action = properties.action || (() => {});
        this.onSelected = properties.onSelected || (() => {});
        this.onEnabled = properties.onEnabled || (() => {});

        this.reflectedElement = properties.reflectValueOn != undefined ? properties.reflectValueOn : this;
        this.inputName = properties.inputName;

        this.value = properties.value;
        this.secondaryValue = properties.secondaryValue;

        this.selected = properties.selected || false;
        this.enabled = properties.enabled || true;
    }

    @auto()
    public set secondaryValue(value: SecondaryValueType) {}

    /**
     * @description The value of the dropdown entry
     */
    @auto()
    public set value(value: ValueType) {
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
    @auto()
    public set selected(value: boolean) {
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

    /**
     * @description Toggles the selection of this dropdown entry
     */
    public toggle() {
        this.selected = !this.selected;
    }
}

export {TurboSelectEntry};
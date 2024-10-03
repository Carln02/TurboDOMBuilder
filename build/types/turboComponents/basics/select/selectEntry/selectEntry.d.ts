import { TurboSelectEntryConfig, TurboSelectEntryProperties } from "./selectEntry.types";
import { TurboRichElement } from "../../richElement/richElement";
import { ValidTag } from "../../../../domBuilding/core.types";
/**
 * @class TurboSelectEntry
 * @description Class representing an entry within a TurboSelect.
 * @extends TurboElement
 */
declare class TurboSelectEntry<ValueType = string, ElementTag extends ValidTag = "p"> extends TurboRichElement<ElementTag> {
    private _value;
    private _selected;
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    selectedClasses: string | string[];
    private readonly action;
    private readonly onSelected;
    private readonly onEnabled;
    private readonly reflectedElement;
    private inputElement;
    readonly config: TurboSelectEntryConfig;
    /**
     * @description DropdownEntry constructor
     * @param {TurboSelectEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboSelectEntryProperties<ValueType, ElementTag>);
    /**
     * @description Toggles the selection of this dropdown entry
     */
    toggle(): void;
    /**
     * @description The value of the dropdown entry
     */
    get value(): ValueType;
    set value(value: ValueType);
    get stringValue(): string;
    /**
     * @description Whether or not the dropdown entry is selected
     */
    get selected(): boolean;
    set selected(value: boolean);
    set enabled(value: boolean);
    get inputName(): string;
    set inputName(value: string);
}
declare function selectEntry<ValueType = string, ElementTag extends ValidTag = "p">(properties: TurboSelectEntryProperties<ValueType, ElementTag>): TurboSelectEntry<ValueType, ElementTag>;
export { TurboSelectEntry, selectEntry };

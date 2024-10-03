import { TurboDropdownConfig, TurboDropdownProperties } from "./dropdown.types";
import "./dropdown.css";
import { TurboSelectEntry } from "../../basics/select/selectEntry/selectEntry";
import { TurboSelect } from "../../basics/select/select";
/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
 * @extends TurboElement
 */
declare class TurboDropdown<ValueType = string, EntryType extends TurboSelectEntry<ValueType, any> = TurboSelectEntry<ValueType, any>> extends TurboSelect<ValueType, EntryType> {
    /**
     * The dropdown's selector element.
     */
    selector: HTMLElement;
    /**
     * The dropdown's popup element.
     */
    readonly popup: HTMLElement;
    private popupOpen;
    static readonly config: TurboDropdownConfig;
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboDropdownProperties<ValueType, EntryType>);
    private initSelector;
    private initPopup;
    protected onEntryClick(entry: EntryType): void;
    select(entry: ValueType | EntryType): this;
    private openPopup;
}
declare function dropdown(properties: TurboDropdownProperties): TurboDropdown;
export { TurboDropdown, dropdown };

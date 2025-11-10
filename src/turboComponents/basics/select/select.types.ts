import {TurboRawEventProperties} from "../../../eventHandling/events/turboEvent.types";

export type EntryData = {
    enabled?: boolean,
    selected?: boolean,
};

/**
 * @group Components
 * @category TurboSelect
 */
type TurboSelectProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends object = HTMLElement,
> = {
    selectedEntryClasses?: string | string[],
    entries?: HTMLCollection | NodeList | EntryType[],
    values?: (ValueType | EntryType)[],
    selectedValues?: ValueType[],

    getValue?: (entry: EntryType) => ValueType,
    getSecondaryValue?: (entry: EntryType) => SecondaryValueType,
    createEntry?: (value: ValueType) => EntryType,
    onEntryAdded?: (entry: EntryType, index: number) => void,

    multiSelection?: boolean,
    forceSelection?: boolean,
    inputName?: string,

    parent?: Element,
    onSelect?: (b: boolean, entry: EntryType, index: number) => void,
    onEnabled?: (b: boolean, entry: EntryType, index: number) => void,
};

/**
 * @group Components
 * @category TurboSelect
 */
type TurboSelectConfig = {
    defaultSelectedEntryClasses?: string | string[]
};

/**
 * @group Components
 * @category TurboSelect
 */
type TurboSelectInputEventProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends object = HTMLElement,
> = TurboRawEventProperties & {
    toggledEntry: EntryType,
    values: ValueType[]
};

export {TurboSelectProperties, TurboSelectConfig, TurboSelectInputEventProperties};
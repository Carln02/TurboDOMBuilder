import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElement} from "../../../turboElement/turboElement";
import {auto} from "../../../decorators/auto/auto";
import {expose} from "../../../decorators/expose";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {element} from "../../../elementCreation/element";
import {TurboSelectElementConfig, TurboSelectElementProperties} from "./selectElement.types";
import {TurboSelect} from "../select/select";
import {ValidTag} from "../../../types/element.types";

/**
 * @class TurboSelectElement
 * @group Components
 * @category TurboSelectElement
 *
 * @description Select element class for creating Turbo button elements.
 * @extends TurboElement
 */
@define("turbo-select-element")
class TurboSelectElement<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    public static readonly config: TurboSelectElementConfig = {
        ...TurboElement.config,
        defaultEntriesTag: "turbo-rich-element"
    };

    public readonly select: TurboSelect<ValueType, SecondaryValueType, EntryType> = new TurboSelect();

    @auto({
        defaultValueCallback: function () {
            return this.getPropertiesValue(undefined, "defaultEntriesTag")
        }
    })
    public entriesTag: ValidTag;

    public get entries(): EntryType[] {
        return this.select.entries;
    }

    public set entries(value: HTMLCollection | NodeList | EntryType[]) {
        this.select.entries = value;
    }

    @expose("select") public values: ValueType[];

    @expose("select") public accessor selectedEntries: EntryType[];
    @expose("select", false) public accessor selectedEntry: EntryType;

    @expose("select") public entriesClasses: string | string[];
    @expose("select") public selectedEntriesClasses: string | string[];

    @expose("select") public accessor inputName: string;
    @expose("select", false) public accessor inputField: HTMLInputElement;

    @expose("select") public accessor multiSelection: boolean;
    @expose("select") public accessor forceSelection: boolean;

    @expose("select", false) public accessor enabledEntries: EntryType[];
    @expose("select", false) public accessor enabledValues: ValueType[];
    @expose("select", false) public accessor enabledSecondaryValues: SecondaryValueType[];

    @expose("select", false) public accessor selectedValue: ValueType;
    @expose("select", false) public accessor selectedValues: ValueType[];

    @expose("select", false) public accessor selectedSecondaryValues: SecondaryValueType[];
    @expose("select", false) public accessor selectedSecondaryValue: SecondaryValueType;

    @expose("select", false) public accessor stringSelectedValue: string;

    public initialize() {
        super.initialize();
        if (!this.select.parent) this.select.parent = this;
    }
}

/**
 * @group Components
 * @category TurboDropdown
 * @param properties
 */
function selectElement<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(properties: TurboSelectElementProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> = {}):
    TurboSelectElement<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> {
    if (!properties.tag) properties.tag = "turbo-select-element";
    return element({...properties, text: undefined}) as any;
}

export {TurboSelectElement, selectElement};
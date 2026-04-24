import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboElement} from "../../../turboElement/turboElement";
import {expose} from "../../../decorators/expose";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboSelectElementProperties} from "./selectElement.types";
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
class TurboSelectElement<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
     public declare readonly properties: TurboSelectElementProperties;
    public static defaultProperties: TurboSelectElementProperties = {
        entriesTag: "turbo-rich-element"
    };

    public readonly select: TurboSelect<ValueType, SecondaryValueType, EntryType> = TurboSelect.create() as any;

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

define(TurboSelectElement);
export {TurboSelectElement};
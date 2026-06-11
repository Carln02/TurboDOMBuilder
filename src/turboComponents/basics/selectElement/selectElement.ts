import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboElement} from "../../../turboElement/turboElement";
import {expose} from "../../../decorators/expose";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboSelectElementProperties} from "./selectElement.types";
import {TurboSelect} from "../select/select";
import {ValidTag} from "../../../types/element.types";
import {auto} from "../../../decorators/auto/auto";
import {Reifect} from "../../wrappers/reifect/reifect";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {StatelessReifectProperties} from "../../wrappers/reifect/reifect.types";

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

    protected _sizeTransitionTimeout: ReturnType<typeof setTimeout>;

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

    @expose("select") public accessor selectedIndex: number;
    @expose("select", false) public accessor selectedIndices: number[];

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
        this.select.onSelect.add(() => this.applyTransition());
        super.initialize();
        if (!this.select.parent) this.select.parent = this;
    }

    private _transitionDuration: number = 0;

    public get transitionDuration(): number {
        return this._transitionDuration;
    }

    /**
     * @description Duration of the container size transition in seconds. Kept in sync with
     * `switchTransitionReifect` — set this to change both at once.
     */
    public set transitionDuration(value: number) {
        this._transitionDuration = value;
        if (value <= 0) return;
        if (!this.transitionReifect) this.transitionReifect = new Reifect({});
        this.transitionReifect.styles = `transition: width ${value}s ease-in-out, height ${value}s ease-in-out`;
    }

    @auto({
        preprocessValue: function (value) {
            if (!value) return;
            if (value instanceof Reifect) return value;
            return new Reifect(value);
        }
    }) public set transitionReifect(value: Reifect | StatelessReifectProperties) {
        if (!value) return;
        value.attach(this);
    }
    public get transitionReifect(): Reifect {return;}

    /**
     * @description Animates the container from its current size to the selected entry's natural
     * size. Subclasses should call `super.applyTransition()` then add their own entry-level logic.
     *
     * The sequence:
     * 1. Freeze container at current px size (gives CSS transition a `from` value)
     * 2. Call `beforeResize()` — subclass hook to prepare entries before the frame
     * 3. Next frame: read selected entry's natural size, animate container to it
     * 4. After `transitionDuration`ms: release explicit container size
     */
    protected applyTransition() {
        if (this.transitionDuration <= 0 || !this.transitionReifect) return;
        const selectedEntry = this.selectedEntry;
        if (!selectedEntry) return;

        this.transitionReifect.unapply(this);
        turbo(this).setStyles({width: `${this.offsetWidth}px`, height: `${this.offsetHeight}px`}, true);
        this.transitionReifect.apply(this);

        this.beforeResize(selectedEntry);
        requestAnimationFrame(() => turbo(this).setStyles({
            width: `${selectedEntry.offsetWidth}px`,
            height: `${selectedEntry.offsetHeight}px`
        }));

        clearTimeout(this._sizeTransitionTimeout);
        this._sizeTransitionTimeout = setTimeout(() => {
            turbo(this).setStyles({width: "", height: ""});
            this.afterResize(selectedEntry);
        }, this.transitionDuration * 1000);
    }

    /**
     * @description Called synchronously inside `applyTransition`, before the rAF that reads the
     * selected entry's new size. Use this to reposition/reflow entries so the size read is correct.
     * @param selectedEntry - The newly selected entry.
     */
    protected beforeResize(selectedEntry: EntryType) {}

    /**
     * @description Called after the container size transition completes.
     * @param selectedEntry - The selected entry.
     */
    protected afterResize(selectedEntry: EntryType) {}
}

define(TurboSelectElement);
export {TurboSelectElement};
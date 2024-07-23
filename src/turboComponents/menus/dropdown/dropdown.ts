import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {button, TurboButton} from "../../basics/button/button";
import {TurboDropdownConfig, TurboDropdownProperties} from "./dropdown.types";
import "./dropdown.css";
import {popup} from "../../basics/popup/popup";
import {define} from "../../../domBuilding/decorators/define";
import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {TurboSelect} from "../../basics/select/select";
import {TurboDropdownEntry} from "./dropdownEntry/dropdownEntry";

/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
 * @extends TurboElement
 */
@define("turbo-dropdown")
class TurboDropdown extends TurboSelect<TurboDropdownEntry> {
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
    constructor(properties: TurboDropdownProperties) {
        properties.entriesParent = properties.popup || popup();
        super(properties);

        this.selector = properties.selector instanceof HTMLElement ? properties.selector : button({buttonText: "",
            customTextTag: properties.customSelectorTag || TurboDropdown.config.defaultSelectorTag});
        this.popup = properties.entriesParent as HTMLElement;

        this.initPopup(properties);
        this.initSelector(properties);

        document.addEventListener(DefaultEventName.click, e => {
            if (this.popupOpen && !this.contains(e.target as Node)) this.openPopup(false);
        });
    }

    private initSelector(properties: TurboDropdownProperties) {
        if (this.selector instanceof TurboButton) {
            this.selector.buttonText = typeof properties.selector == "string"
                ? properties.selector
                : typeof properties.values[0] == "string"
                    ? properties.values[0]
                    : properties.values[0].value;
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

    private initPopup(properties: TurboDropdownProperties) {
        this.addChild(this.popup);
        this.popup.show(false);
        this.popup.addClass(properties.customPopupClasses
            ? properties.customPopupClasses
            : TurboDropdown.config.defaultPopupClasses);
    }

    protected onEntryClick(entry: TurboSelectEntry) {
        super.onEntryClick(entry);
        this.openPopup(false);
    }

    public select(entry: string | TurboSelectEntry): this {
        super.select(entry);
        if (this.selector instanceof TurboButton) this.selector.buttonText = this.selectedValue;
        return this;
    }

    private openPopup(b: boolean) {
        if (this.popupOpen == b) return;
        this.popupOpen = b;
        if (this.popup instanceof TurboElement) this.popup.show(b);
        else this.popup.show(b);
    }
}

function dropdown(properties: TurboDropdownProperties): TurboDropdown {
    return new TurboDropdown(properties);
}

export {TurboDropdown, dropdown};
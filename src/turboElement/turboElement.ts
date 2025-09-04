import {TurboCustomProperties} from "./turboElement.types";
import {auto} from "../decorators/auto/auto";
import {TurboView} from "./mvc/turboView";
import {TurboModel} from "./mvc/turboModel";
import {Delegate, kebabToCamelCase, Tool, TurboEmitter, TurboEvent} from "..";
import {MvcHandler} from "./mvc/mvcHandler";
import {$} from "../turboFunctions/turboFunctions";
import {parse} from "@ungap/structured-clone/json";
/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
class TurboElement<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> extends HTMLElement {
    /**
     * @description Static configuration object.
     */
    public static readonly config: any = {shadowDOM: false, defaultSelectedClass: "selected"};

    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: MvcHandler<this, ViewType, DataType, ModelType, EmitterType>;

    /**
     * @description Delegate fired when the element is attached to DOM.
     */
    public readonly onAttach: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @description Delegate fired when the element is detached from the DOM.
     */
    public readonly onDetach: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @description Delegate fired when the element is adopted by a new parent in the DOM.
     */
    public readonly onAdopt: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) (this.config as any)[key] = val;
        });
    }

    public constructor(properties: TurboCustomProperties<ViewType, DataType, ModelType, EmitterType> = {}) {
        super();
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM")) this.attachShadow({mode: "open"});
        $(this).setProperties(properties, true);
        this.mvc = new MvcHandler({...properties, element: this});
    }

    public connectedCallback() {
        this.onAttach.fire();
    }

    public disconnectedCallback() {
        this.onDetach.fire();
    }

    public adoptedCallback() {
        this.onAdopt.fire();
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!newValue || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = parse(newValue);
    }

    /**
     * @function initializeUI
     * @description Initializes the element's UI by calling all the setup methods (setupChangedCallbacks,
     * setupUIElements, setupUILayout, setupUIListeners).
     */
    public initializeUI(): void {
        this.setupChangedCallbacks();
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
    }

    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks.
     * @protected
     */
    protected setupChangedCallbacks(): void {
    }

    /**
     * @function setupUIElements
     * @description Setup method intended to initialize all direct sub-elements attached to this element, and store
     * them in fields.
     * @protected
     */
    protected setupUIElements(): void {
    }

    /**
     * @function setupUILayout
     * @description Setup method to create the layout structure of the element by adding all created sub-elements to
     * this element's child tree.
     * @protected
     */
    protected setupUILayout(): void {
    }

    /**
     * @function setupUIListeners
     * @description Setup method to initialize and define all input/DOM event listeners of the element.
     * @protected
     */
    protected setupUIListeners(): void {
    }

    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class (or whichever default selected class was set in the config) on the element and update the UI.
     */
    @auto()
    public set selected(value: boolean) {
        const selectedClass = this.getPropertiesValue<string>(null, "defaultSelectedClass", "selected");
        $(this).toggleClass(selectedClass, value);
    }

    /**
     * @description The view (if any) of the element. Only when initializing MVC.
     */
    public get view(): ViewType {
        return this.mvc.view;
    }

    public set view(view: ViewType) {
        this.mvc.view = view;
    }

    /**
     * @description The model (if any) of the element. Only when initializing MVC.
     */
    public get model(): ModelType {
        return this.mvc.model;
    }

    public set model(model: ModelType) {
        this.mvc.model = model;
    }

    /**
     * @description The main data block (if any) attached to the element, taken from its model (if any). Only when
     * initializing MVC.
     */
    public get data(): DataType {
        return this.mvc.data;
    }

    public set data(data: DataType) {
        this.mvc.data = data;
    }

    /**
     * @description The ID of the main data block (if any) of the element, taken from its model (if any). Only when
     * initializing MVC.
     */
    public get dataId(): string {
        return this.mvc.dataId;
    }

    public set dataId(value: string) {
        this.mvc.dataId = value;
    }

    /**
     * @description The numerical index of the main data block (if any) of the element, taken from its model (if any).
     * Only when initializing MVC.
     */
    public get dataIndex(): number {
        return this.mvc.dataIndex;
    }

    public set dataIndex(value: number) {
        this.mvc.dataIndex = value;
    }

    /**
     * @description The size (number) of the main data block (if any) of the element, taken from its model (if any).
     * Only when initializing MVC.
     */
    public get dataSize(): number {
        return this.mvc.dataSize;
    }

    public propagatesUp(e: TurboEvent, tool: Tool<any>): boolean {
        return this.mvc.propagatesUp(e, tool);
    }

    public interact(e: TurboEvent, tool: Tool<any>): boolean {
        return this.mvc.interact(e, tool);
    }

    /**
     * @function getPropertiesValue
     * @description Returns the value with some fallback mechanisms on the static config field and a default value.
     * @param {Type} propertiesValue - The actual value; could be null.
     * @param {string} [configFieldName] - The field name of the associated value in the static config. Will be returned
     * if the actual value is null.
     * @param {Type} [defaultValue] - The default fallback value. Will be returned if both the actual and
     * config values are null.
     * @protected
     */
    protected getPropertiesValue<Type>(propertiesValue: Type, configFieldName?: string, defaultValue?: Type): Type {
        if (propertiesValue !== undefined && propertiesValue !== null) return propertiesValue;
        const configValue: Type = (this.constructor as typeof TurboElement).config[configFieldName];
        if (configValue !== undefined && configValue !== null) return configValue;
        return defaultValue;
    }
}

export {TurboElement};
import {TurboProperties} from "./turboElement.types";
import {kebabToCamelCase, parse} from "../../utils/dataManipulation/stringManipulation";
import {TurboView} from "../mvc/turboView";
import {TurboModel} from "../mvc/turboModel";
import {auto} from "../decorators/auto/auto";
import {ValidElement, ValidTag} from "../core.types";
import {blindElement} from "../elementCreation/element";
import {MvcHandler} from "../mvc/mvcHandler";
import {TurboEmitter} from "../mvc/turboEmitter";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {Tool} from "../../toolManagement/tool/tool";

/**
 * @class TurboProxiedElement
 * @description TurboProxiedElement class, similar to TurboElement but containing an HTML element instead of being one.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
class TurboProxiedElement<
    ElementTag extends ValidTag = ValidTag,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> {
    /**
     * @description Static configuration object.
     */
    public static readonly config: any = {shadowDOM: false, defaultSelectedClass: "selected"};

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) (this.config as any)[key] = val;
        });
    }

    /**
     * @description The HTML (or other) element wrapped inside this instance.
     */
    public readonly element: ValidElement<ElementTag>;

    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: MvcHandler<this, ViewType, DataType, ModelType, EmitterType>;

    public constructor(properties: TurboProperties<ElementTag, ViewType, DataType, ModelType, EmitterType> =
                       {} as TurboProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>) {
        this.element = blindElement(properties);
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM")) this.element.attachShadow({mode: "open"});
        this.mvc = new MvcHandler({...properties, element: this});
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!newValue || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = parse(newValue);
    }

    public initializeUI(): void {
        this.setupChangedCallbacks();
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
    }

    protected setupChangedCallbacks(): void {
    }

    protected setupUIElements(): void {
    }

    protected setupUILayout(): void {
    }

    protected setupUIListeners(): void {
    }

    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class (or whichever default selected class was set in the config) on the element and update the UI.
     */
    @auto()
    public set selected(value: boolean) {
        const selectedClass = this.getPropertiesValue<string>(null, "defaultSelectedClass", "selected");
        this.element.toggleClass(selectedClass, value);
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
        const configValue: Type = (this.constructor as typeof TurboProxiedElement).config[configFieldName];
        if (configValue !== undefined && configValue !== null) return configValue;
        return defaultValue;
    }
}

export {TurboProxiedElement};
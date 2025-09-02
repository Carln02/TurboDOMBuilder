import {TurboView} from "./turboView";
import {TurboModel} from "./turboModel";
import {MvcInteractorProperties} from "./mvc.types";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {TurboDragEvent} from "../../eventHandling/events/basic/turboDragEvent";
import {DefaultEventNameEntry, TurboEventName, TurboEventNameEntry} from "../../eventHandling/eventNaming";
import {PartialRecord} from "../core.types";
import {Tool} from "../../toolManagement/tool/tool";

class TurboInteractor<
    ToolType = string,
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel
> {
    /**
     * @description The key of the interactor. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the interactor's class name is MyElementSomethingInteractor, the key would
     * default to "something".
     */
    public keyName: string;

    public propagateUp: boolean | ((e: TurboEvent) => boolean) | PartialRecord<DefaultEventNameEntry, boolean | ((e: TurboEvent) => boolean)>;

    public target: object;

    public readonly tool: ToolType;

    /**
     * @description A reference to the component.
     * @protected
     */
    protected readonly element: ElementType;

    /**
     * @description A reference to the MVC view.
     * @protected
     */
    protected readonly view: ViewType;

    /**
     * @description A reference to the MVC model.
     * @protected
     */
    protected readonly model: ModelType;

    public constructor(properties: MvcInteractorProperties<ElementType, ViewType, ModelType>) {
        this.element = properties.element;
        this.view = properties.view;
        this.model = properties.model;
        this.target = this.element;
        this.propagateUp = false;
    }

    protected readonly reverseTurboEventName = Object.fromEntries(
        Object.entries(TurboEventName).map(([k, v]) => [v, k])
    ) as { [K in TurboEventNameEntry]: keyof typeof TurboEventName };

    public interact(e: TurboEvent, tool: Tool<ToolType>) {
        const eventKey = this.reverseTurboEventName[e.eventName];
        if (eventKey && typeof this[eventKey] === "function") this[eventKey](e, tool);
    }

    public initialize(): void {}

    /**
     * @description Fired on click start
     * @param e
     * @param tool
     */
    public clickStart(e: TurboEvent, tool: Tool<ToolType>) {
    }

    /**
     * @description Fired on click
     * @param e
     * @param tool
     */
    public click(e: TurboEvent, tool: Tool<ToolType>) {
    }

    /**
     * @description Fired on click end
     * @param e
     * @param tool
     */
    public clickEnd(e: TurboEvent, tool: Tool<ToolType>) {
    }

    /**
     * @description Fired on pointer move
     * @param e
     * @param tool
     */
    public move(e: TurboDragEvent, tool: Tool<ToolType>) {
    }

    /**
     * @description Fired on drag start
     * @param e
     * @param tool
     */
    public dragStart(e: TurboDragEvent, tool: Tool<ToolType>) {
    }

    /**
     * @description Fired on drag
     * @param e
     * @param tool
     */
    public drag(e: TurboDragEvent, tool: Tool<ToolType>) {
    }

    /**
     * @description Fired on drag end
     * @param e
     * @param tool
     */
    public dragEnd(e: TurboDragEvent, tool: Tool<ToolType>) {
    }
}

export {TurboInteractor};
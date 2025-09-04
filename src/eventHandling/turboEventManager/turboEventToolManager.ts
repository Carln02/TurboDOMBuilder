import {TurboEventManager} from "./turboEventManager";
import {Tool} from "../../toolManagement/tool/tool";
import {ClickMode} from "./turboEventManager.types";
import {Delegate} from "../delegate/delegate";
import {TurboEvent} from "../events/turboEvent";
import {TurboRawEventProperties} from "../events/turboEvent.types";
import {TurboKeyEventName} from "../eventNaming";
import {SetToolOptions} from "../../toolManagement/toolManager/toolManager.types";
import {TurboWeakSet} from "../../utils/datatypes/weakSet/weakSet";

class TurboEventToolManager<ToolType extends string | symbol = string | symbol> extends TurboEventManager {
    //All created tools
    private readonly tools: Map<ToolType, TurboWeakSet<Element>> = new Map();
    //Tools mapped to keys
    private readonly mappedKeysToTool: Map<string, ToolType> = new Map();

    //Tools currently held by the user (one - or none - per each click button/mode)
    private readonly currentTools: Map<ClickMode, ToolType> = new Map();

    /**
     * @description Delegate fired when a tool is changed on a certain click button/mode
     */
    public readonly onToolChange: Delegate<(oldTool: ToolType, newTool: ToolType, type: ClickMode) => void> = new Delegate();

    protected dispatchEvent<
        EventType extends TurboEvent = TurboEvent,
        PropertiesType extends TurboRawEventProperties = TurboRawEventProperties
    >(target: Node, eventType: new(properties: PropertiesType) => EventType, properties: Partial<PropertiesType>) {
        properties.toolName = this.getToolName(this.currentClick) as string;
        super.dispatchEvent(target, eventType, properties);

        if (properties.eventName === TurboKeyEventName.keyPressed) this.setToolByKey(properties["keyPressed"]);
        else if (properties.eventName === TurboKeyEventName.keyReleased) this.setTool(null, ClickMode.key, {select: false});

        //Listen for all custom events on the document and accordingly execute the corresponding function on the
        //current tool. The tool will manage its actions and what object to interact with

        // document.addListener(TurboEventName.clickStart, (e: TurboEvent) => this.interactWithObject(e), document, {propagate: true});
        // document.addListener(TurboEventName.click, (e: TurboEvent) => this.interactWithObject(e), document, {propagate: true});
        // document.addListener(TurboEventName.clickEnd, (e: TurboEvent) => this.interactWithObject(e), document, {propagate: true});
        //
        // document.addListener(TurboEventName.move, (e: TurboDragEvent) => this.interactWithObject(e), document, {propagate: true});
        //
        // document.addListener(TurboEventName.dragStart, (e: TurboDragEvent) => this.interactWithObject(e), document, {propagate: true});
        // document.addListener(TurboEventName.drag, (e: TurboDragEvent) => this.interactWithObject(e), document, {propagate: true});
        // document.addListener(TurboEventName.dragEnd, (e: TurboDragEvent) => this.interactWithObject(e), document, {propagate: true});
    }

    protected interactWithObject(e: TurboEvent) {
        const tool = this.getFiredTool(e);
        if (!tool) return;

        const interactors: (Element | Document)[] = [];
        let target = e.closest(Element, true, ClosestOrigin.position);

        while (target) {
            if (typeof target["interact"] === "function" && typeof target["propagatesUp"] === "function") {
                interactors.push(target);

                const shouldPropagate = target["propagatesUp"](e, tool);
                if (shouldPropagate === false) break;
            }

            target = target.parentElement;
        }

        // Reverse and interact
        for (let i = interactors.length - 1; i >= 0; i--) {
            interactors[i]["interact"](e, tool);
        }
    }

    private initEvents() {
        //On key press --> set corresponding tool as key mode
        document.addEventListener(TurboEventName.keyPressed, (e: TurboKeyEvent) => this.setToolByKey(e.keyPressed));
        //On key release --> clear set tool on key mode
        document.addEventListener(TurboEventName.keyReleased, () =>
            this.setTool(null, ClickMode.key, {select: false}));

        //Listen for all custom events on the document and accordingly execute the corresponding function on the
        //current tool. The tool will manage its actions and what object to interact with

        document.addListener(TurboEventName.clickStart, (e: TurboEvent) => this.interactWithObject(e), document, {propagate: true});
        document.addListener(TurboEventName.click, (e: TurboEvent) => this.interactWithObject(e), document, {propagate: true});
        document.addListener(TurboEventName.clickEnd, (e: TurboEvent) => this.interactWithObject(e), document, {propagate: true});

        document.addListener(TurboEventName.move, (e: TurboDragEvent) => this.interactWithObject(e), document, {propagate: true});

        document.addListener(TurboEventName.dragStart, (e: TurboDragEvent) => this.interactWithObject(e), document, {propagate: true});
        document.addListener(TurboEventName.drag, (e: TurboDragEvent) => this.interactWithObject(e), document, {propagate: true});
        document.addListener(TurboEventName.dragEnd, (e: TurboDragEvent) => this.interactWithObject(e), document, {propagate: true});
    }

    /**
     * @description Returns all created tools as an array
     */
    public getToolsArray(): Element[] {
        const array: Element[] = [];
        for (const tools of this.tools.values()) array.push(...tools.toArray());
        return array;
    }

    /**
     * @description Returns the tool with the given name (or undefined)
     * @param name
     */
    public getToolsByName(name: ToolType): Element[] {
        return this.tools.get(name).toArray() || [];
    }

    /**
     * @description Returns the tool with the given name (or undefined)
     * @param name
     * @param predicate
     */
    public getToolByName(name: ToolType, predicate?: (tool: Element) => boolean): Element {
        const tools = this.getToolsByName(name);
        return predicate ? tools?.find(predicate) : tools?.[0];
    }

    /**
     * @description Returns the tools associated with the given key
     * @param key
     */
    public getToolsByKey(key: string): Element[] {
        const toolName = this.mappedKeysToTool.get(key);
        if (!toolName) return null;
        return this.getToolsByName(toolName);
    }

    /**
     * @description Returns the tool associated with the given key
     * @param key
     * @param predicate
     */
    public getToolByKey(key: string, predicate?: (tool: Element) => boolean): Element {
        const tools = this.getToolsByKey(key);
        return predicate ? tools?.find(predicate) : tools?.[0];
    }

    /**
     * @description Adds a tool to the tools map, identified by its name. Optionally, provide a key to bind the tool to.
     * @param toolName
     * @param tool
     * @param key
     */
    public addTool(toolName: ToolType, tool: Element, key?: string) {
        if (!this.tools.has(toolName)) this.tools.set(toolName, new TurboWeakSet());
        const tools = this.tools.get(toolName);
        if (!tools.has(tool)) tools.add(tool);
        if (key) this.mappedKeysToTool.set(key, toolName);
    }

    /**
     * @description Returns the name of the tool currently held by the provided click mode
     * @param mode
     */
    public getToolName(mode: ClickMode): ToolType {
        return this.currentTools.get(mode);
    }

    /**
     * @description Returns the tool currently held by the provided click mode
     * @param mode
     */
    public getTool(mode: ClickMode): Element {
        return this.getToolByName(this.getToolName(mode));
    }

    //Utility callback to get the current tool based on the fired event's information
    public getFiredTool(e: TurboEvent): Element {
        let tool: Tool<ToolType>;
        //If keys are pressed --> try to get the tool assigned to key mode
        if (e.keys.length > 0) tool = this.getTool(ClickMode.key);
        //If tool still null --> get tool assigned to event's click mode
        if (!tool) tool = this.getTool(e.clickMode);
        return tool;
    }

    /**
     * @description Sets the provided tool as a current tool associated with the provided type
     * @param tool
     * @param type
     * @param options
     */
    public setTool(tool: Tool<ToolType>, type: ClickMode, options: SetToolOptions = {}) {
        //Initialize undefined options
        if (options.select == undefined) options.select = true;
        if (options.activate == undefined) options.activate = true;
        if (options.setAsNoAction == undefined) options.setAsNoAction = type == ClickMode.left;

        //Get previous tool
        const previousTool = this.currentTools.get(type);
        if (previousTool) {
            //Return if it's the same
            if (previousTool == tool) return;

            //Deselect and deactivate previous tool
            if (options.select) previousTool.selected = false;
            if (options.activate) previousTool.deactivate();
        }

        //Select new tool (and maybe set it as the tool for no click mode)
        this.currentTools.set(type, tool);
        if (options.setAsNoAction) this.currentTools.set(ClickMode.none, tool);

        //Select and activate the tool
        if (options.select && tool) tool.selected = true;
        if (options.activate && tool) tool.activate();

        //Fire tool changed
        this.onToolChange.fire(previousTool, tool, type);
    }

    /**
     * @description Sets tool associated with the provided key as the current tool for the key mode
     * @param key
     */
    public setToolByKey(key: string): boolean {
        const tool = this.getToolByKey(key);
        if (!tool) return false;
        this.setTool(tool, ClickMode.key, {select: false});
        return true;
    }
}

export {TurboEventToolManager};
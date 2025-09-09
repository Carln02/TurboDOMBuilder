import {
    ClickMode,
    InputDevice, SetToolOptions,
    TurboEventManagerProperties,
    TurboEventManagerStateProperties
} from "./turboEventManager.types";
import {Delegate} from "../delegate/delegate";
import {Point} from "../../utils/datatypes/point/point";
import {
    DefaultClickEventName, DefaultDragEventName, DefaultEventNameEntry,
    DefaultKeyEventName, DefaultMoveEventName, DefaultWheelEventName,
    TurboClickEventName,
    TurboDragEventName, TurboEventNameEntry,
    TurboKeyEventName,
    TurboMoveEventName,
    TurboWheelEventName
} from "../eventNaming";
import {$} from "../../turboFunctions/turboFunctions";
import {auto} from "../../decorators/auto/auto";
import {TurboHeadlessElement} from "../../turboElement/turboHeadlessElement";
import {TurboEventManagerModel} from "./turboEventManager.model";
import {TurboEventManagerKeyController} from "./controllers/turboEventManager.keyController";
import {TurboEventManagerWheelController} from "./controllers/turboEventManager.wheelController";
import {TurboEventManagerPointerController} from "./controllers/turboEventManager.pointerController";
import {TurboWeakSet} from "../../utils/datatypes/weakSet/weakSet";
import {TurboEventManagerDispatchController} from "./controllers/turboEventManager.dispatchController";

/**
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
class TurboEventManager<ToolType extends string = string> extends TurboHeadlessElement<any, any, TurboEventManagerModel> {

    /*
     *
     *
     * Static stuff
     *
     *
     */

    protected static managers: TurboEventManager[] = [];

    public static get instance(): TurboEventManager {
        if (TurboEventManager.managers.length > 0) return TurboEventManager.managers[0];
        else return new TurboEventManager();
    }

    public static get allManagers(): TurboEventManager[] {
        return [...this.managers];
    }

    /*
     *
     *
     * Constructor
     *
     *
     */

    public constructor(properties: TurboEventManagerProperties = {}) {
        super();
        this.mvc.generate({
            modelConstructor: TurboEventManagerModel,
            controllerConstructors: [
                TurboEventManagerKeyController,
                TurboEventManagerWheelController,
                TurboEventManagerPointerController,
                TurboEventManagerDispatchController
            ]
        });
        this.model.authorizeEventScaling = properties.authorizeEventScaling;
        this.model.scaleEventPosition = properties.scaleEventPosition;

         this.model.state.enabled = properties.enabled ?? true;
         this.model.state.preventDefaultMouse = properties.preventDefaultMouse ?? true;
         this.model.state.preventDefaultTouch = properties.preventDefaultTouch ?? true;
         this.model.state.preventDefaultWheel = properties.preventDefaultWheel ?? true;
         this.unlock();

        this.model.moveThreshold = properties.moveThreshold || 10;
        this.model.longPressDuration = properties.longPressDuration || 500;

        if (!properties.disableKeyEvents) this.keyEventsEnabled = true;
        if (!properties.disableWheelEvents) this.wheelEventsEnabled = true;
        if (!properties.disableMouseEvents) this.mouseEventsEnabled = true;
        if (!properties.disableTouchEvents) this.touchEventsEnabled = true;
        if (!properties.disableDragEvents) this.dragEventEnabled = true;
        if (!properties.disableClickEvents) this.clickEventEnabled = true;
        if (!properties.disableMoveEvent) this.moveEventsEnabled = true;

        TurboEventManager.managers.push(this);
    }

    /*
     *
     *
     * Controllers & handlers
     *
     *
     */

    protected get keyController(): TurboEventManagerKeyController {
        return this.mvc.getController("key") as TurboEventManagerKeyController;
    }

    protected get wheelController(): TurboEventManagerWheelController {
        return this.mvc.getController("wheel") as TurboEventManagerWheelController;
    }

    protected get pointerController(): TurboEventManagerPointerController {
        return this.mvc.getController("pointer") as TurboEventManagerPointerController;
    }

    protected get dispatchController(): TurboEventManagerDispatchController {
        return this.mvc.getController("dispatch") as TurboEventManagerDispatchController;
    }

    /*
     *
     *
     * Getters and setters
     *
     *
     *
     */

    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
    public get inputDevice() {
        return this.model.inputDevice;
    }

    //Delegate fired when the input device changes
    public get onInputDeviceChange(): Delegate<(device: InputDevice) => void> {
        return this.model.onInputDeviceChange;
    }

    /**
     * @description Delegate fired when a tool is changed on a certain click button/mode
     */
    public get onToolChange(): Delegate<(oldTool: ToolType, newTool: ToolType, type: ClickMode) => void> {
        return this.model.onToolChange;
    }

    public get authorizeEventScaling(): boolean | (() => boolean) {
        return this.model.authorizeEventScaling;
    }

    public set authorizeEventScaling(value: boolean | (() => boolean)) {
        this.model.authorizeEventScaling = value;
    }

    public get scaleEventPosition(): (position: Point) => Point {
        return this.model.scaleEventPosition;
    }

    public set scaleEventPosition(value: (position: Point) => Point) {
        this.model.scaleEventPosition = value;
    }

    public get moveThreshold(): number {
        return this.model.moveThreshold;
    }

    public set moveThreshold(value: number) {
        this.model.moveThreshold = value;
    }

    public get longPressDuration(): number {
        return this.model.longPressDuration;
    }

    public set longPressDuration(value: number) {
        this.model.longPressDuration = value;
    }

    /*
     *
     *
     * Enabling events setters
     *
     *
     *
     */

    @auto({cancelIfUnchanged: true})
    public set keyEventsEnabled(value: boolean) {
        const doc = $(document);
        if (value) {
            doc.on("keydown", this.keyController.keyDown);
            doc.on("keyup", this.keyController.keyUp);
        } else {
            doc.removeListener("keydown", this.keyController.keyDown);
            doc.removeListener("keyup", this.keyController.keyUp);
        }
        this.applyAndHookEvents(TurboKeyEventName, DefaultKeyEventName, value);
    }

    @auto({cancelIfUnchanged: true})
    public set wheelEventsEnabled(value: boolean) {
        if (value) $(document.body).on("wheel", this.wheelController.wheel, {
            passive: false,
            propagate: true
        });
        else $(document).removeListener("wheel", this.wheelController.wheel);
        this.applyAndHookEvents(TurboWheelEventName, DefaultWheelEventName, value);
    }

    @auto({cancelIfUnchanged: true})
    public set moveEventsEnabled(value: boolean) {
        this.applyAndHookEvents(TurboMoveEventName, DefaultMoveEventName, value);
    }

    @auto({cancelIfUnchanged: true})
    public set mouseEventsEnabled(value: boolean) {
        const doc = $(document);
        if (value) {
            doc.on("mousedown", this.pointerController.pointerDown, {propagate: true});
            doc.on("mousemove", this.pointerController.pointerMove, {propagate: true});
            doc.on("mouseup", this.pointerController.pointerUp, {propagate: true});
            doc.on("mouseleave", this.pointerController.pointerLeave, {propagate: true});
        } else {
            doc.removeListener("mousedown", this.pointerController.pointerDown);
            doc.removeListener("mousemove", this.pointerController.pointerMove);
            doc.removeListener("mouseup", this.pointerController.pointerUp);
            doc.removeListener("mouseleave", this.pointerController.pointerLeave);
        }
    }

    @auto({cancelIfUnchanged: true})
    public set touchEventsEnabled(value: boolean) {
        const doc = $(document);
        if (value) {
            doc.on("touchstart", this.pointerController.pointerDown, {passive: false, propagate: true});
            doc.on("touchmove", this.pointerController.pointerMove, {passive: false, propagate: true});
            doc.on("touchend", this.pointerController.pointerUp, {passive: false, propagate: true});
            doc.on("touchcancel", this.pointerController.pointerUp, {passive: false, propagate: true});
        } else {
            doc.removeListener("touchstart", this.pointerController.pointerDown);
            doc.removeListener("touchmove", this.pointerController.pointerMove);
            doc.removeListener("touchend", this.pointerController.pointerUp);
            doc.removeListener("touchcancel", this.pointerController.pointerUp);
        }
    }

    @auto({cancelIfUnchanged: true})
    public set clickEventEnabled(value: boolean) {
        this.applyAndHookEvents(TurboClickEventName, DefaultClickEventName, value);
    }

    @auto({cancelIfUnchanged: true})
    public set dragEventEnabled(value: boolean) {
        this.applyAndHookEvents(TurboDragEventName, DefaultDragEventName, value);
    }

    /*
     *
     *
     * State and lock management
     *
     *
     *
     */

    /**
     * @description Sets the lock state for the event manager.
     * @param origin - The element that initiated the lock state.
     * @param value - The state properties to set.
     */
    public lock(origin: Element, value: TurboEventManagerStateProperties) {
        this.unlock();
        this.model.lockState.lockOrigin = origin;
        for (const key in value) this.model.lockState[key] = value[key];
    }

    /**
     * @description Resets the lock state to the default values.
     */
    public unlock() {
        const s = this.model.state;
        const l = this.model.lockState;

        l.enabled = s.enabled;
        l.preventDefaultMouse = s.preventDefaultMouse;
        l.preventDefaultTouch = s.preventDefaultTouch;
        l.preventDefaultWheel = s.preventDefaultWheel;
        l.lockOrigin = document.body;
    }

    public get enabled() {
        return this.model.state.enabled && this.model.lockState.enabled;
    }

    public set enabled(value: boolean) {
        this.model.state.enabled = value;
    }

    public get preventDefaultWheel() {
        return this.model.state.preventDefaultWheel && this.model.lockState.preventDefaultWheel;
    }

    public set preventDefaultWheel(value: boolean) {
        this.model.state.preventDefaultWheel = value;
    }

    public get preventDefaultMouse() {
        return this.model.state.preventDefaultMouse && this.model.lockState.preventDefaultMouse;
    }

    public set preventDefaultMouse(value: boolean) {
        this.model.state.preventDefaultMouse = value;
    }

    public get preventDefaultTouch() {
        return this.model.state.preventDefaultTouch && this.model.lockState.preventDefaultTouch;
    }

    public set preventDefaultTouch(value: boolean) {
        this.model.state.preventDefaultTouch = value;
    }

    /*
     *
     *
     * Tool management
     *
     *
     *
     */

    /**
     * @description All attached tools in an array
     */
    public get toolsArray(): Node[] {
        const array: Node[] = [];
        for (const tools of this.model.tools.values()) array.push(...tools.toArray());
        return array;
    }

    /**
     * @description Returns the tool with the given name (or undefined)
     * @param name
     */
    public getToolsByName(name: ToolType): Node[] {
        return this.model.tools.get(name)?.toArray() || [];
    }

    /**
     * @description Returns the first tool with the given name (or undefined)
     * @param name
     * @param predicate
     */
    public getToolByName(name: ToolType, predicate?: (tool: Node) => boolean): Node {
        const tools = this.getToolsByName(name);
        return predicate ? tools?.find(predicate) : tools?.[0];
    }

    /**
     * @description Returns the tools associated with the given key
     * @param key
     */
    public getToolsByKey(key: string): Node[] {
        const toolName = this.model.mappedKeysToTool.get(key) as ToolType;
        if (!toolName) return [];
        return this.getToolsByName(toolName);
    }

    /**
     * @description Returns the first tool associated with the given key
     * @param key
     * @param predicate
     */
    public getToolByKey(key: string, predicate?: (tool: Element) => boolean): Node {
        const tools = this.getToolsByKey(key);
        return predicate ? tools?.find(predicate) : tools?.[0];
    }

    /**
     * @description Adds a tool to the tools map, identified by its name. Optionally, provide a key to bind the tool to.
     * @param toolName
     * @param tool
     * @param key
     */
    public addTool(toolName: ToolType, tool: Node, key?: string) {
        if (!this.model.tools.has(toolName)) this.model.tools.set(toolName, new TurboWeakSet());
        const tools = this.model.tools.get(toolName);
        if (!tools.has(tool)) tools.add(tool);
        if (key) this.model.mappedKeysToTool.set(key, toolName);
    }

    /**
     * @description Returns the name of the tool currently held by the provided click mode
     * @param mode
     */
    public getToolName(mode: ClickMode = this.model.currentClick): ToolType {
        return this.model.currentTools.get(mode) as ToolType;
    }

    /**
     * @description Returns the instances of the tool currently held by the provided click mode
     * @param mode
     */
    public getTools(mode: ClickMode = this.model.currentClick): Node[] {
        return this.getToolsByName(this.getToolName(mode));
    }

    public getTool(mode: ClickMode = this.model.currentClick): Node {
        return this.getToolByName(this.getToolName(mode));
    }

    /**
     * @description Sets the provided tool as a current tool associated with the provided type
     * @param toolName
     * @param type
     * @param options
     */
    public setTool(toolName: ToolType, type: ClickMode, options: SetToolOptions = {}) {
        //Initialize undefined options
        if (options.select == undefined) options.select = true;
        if (options.activate == undefined) options.activate = true;
        if (options.setAsNoAction == undefined) options.setAsNoAction = type == ClickMode.left;

        //Get previous tool
        const previousToolName = this.model.currentTools.get(type) as ToolType;
        if (previousToolName) {
            //Return if it's the same
            if (previousToolName === toolName) return;

            //Deselect and deactivate previous tool
            (this.getToolsByName(previousToolName) || []).forEach(tool => {
                if (options.select) this.model.utils.selectTool(tool, false);
                if (options.activate) this.model.utils.activateTool(tool, false);
            });
        }

        //Select new tool (and maybe set it as the tool for no click mode)
        this.model.currentTools.set(type, toolName);
        if (options.setAsNoAction) this.model.currentTools.set(ClickMode.none, toolName);

        //Select and activate the tool
        (this.getToolsByName(toolName) || []).forEach(tool => {
            if (options.select) this.model.utils.selectTool(tool, true);
            if (options.activate) this.model.utils.activateTool(tool, true);
        });

        //Fire tool changed
        this.onToolChange.fire(previousToolName, toolName, type);
    }

    /**
     * @description Sets tool associated with the provided key as the current tool for the key mode
     * @param key
     */
    public setToolByKey(key: string): boolean {
        const toolName = this.model.mappedKeysToTool.get(key) as ToolType;
        if (!toolName) return false;
        this.setTool(toolName, ClickMode.key, {select: false});
        return true;
    }

    /*
     *
     *
     * Utils
     *
     *
     */

    public setupCustomDispatcher(type: string) {
        return this.dispatchController.setupCustomDispatcher(type);
    }

    protected applyAndHookEvents(turboEventNames: Record<string, string>,
                                 defaultEventNames: Record<string, string>, applyTurboEvents: boolean) {
        this.model.utils.applyEventNames(applyTurboEvents ? turboEventNames : defaultEventNames);
        for (const name in turboEventNames) {
            if (applyTurboEvents) this.dispatchController.setupCustomDispatcher(name as TurboEventNameEntry);
            else this.dispatchController.removeCustomDispatcher(name as TurboEventNameEntry);
        }
    }

    public destroy() {
        this.keyEventsEnabled = false;
        this.wheelEventsEnabled = false;
        this.mouseEventsEnabled = false;
        this.touchEventsEnabled = false;
        this.dragEventEnabled = false;
        this.clickEventEnabled = false;
        this.onToolChange.clear();
    }
}

export {TurboEventManager};
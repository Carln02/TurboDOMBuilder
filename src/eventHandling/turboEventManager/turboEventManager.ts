import {
    ClickMode,
    InputDevice,
    SetToolOptions,
    TurboEventManagerProperties,
    TurboEventManagerStateProperties
} from "./turboEventManager.types";
import {$, turbo} from "../../turboFunctions/turboFunctions";
import {auto} from "../../decorators/auto/auto";
import {TurboEventManagerModel} from "./turboEventManager.model";
import {TurboEventManagerKeyController} from "./controllers/turboEventManager.keyController";
import {TurboEventManagerWheelController} from "./controllers/turboEventManager.wheelController";
import {TurboEventManagerPointerController} from "./controllers/turboEventManager.pointerController";
import {TurboEventManagerDispatchController} from "./controllers/turboEventManager.dispatchController";
import {TurboEventManagerUtilsHandler} from "./handlers/turboEventManager.utilsHandler";
import {controller} from "../../decorators/mvc";
import {isUndefined} from "../../utils/dataManipulation/misc";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {Point} from "../../turboComponents/datatypes/point/point";
import {TurboWeakSet} from "../../turboComponents/datatypes/weakSet/weakSet";
import {
    DefaultClickEventName,
    DefaultDragEventName,
    DefaultKeyEventName,
    DefaultMoveEventName,
    DefaultWheelEventName,
    TurboClickEventName,
    TurboDragEventName,
    TurboEventNameEntry,
    TurboKeyEventName,
    TurboMoveEventName,
    TurboWheelEventName
} from "../../types/eventNaming.types";
import {expose} from "../../decorators/expose";
import {TurboBaseElement} from "../../turboElement/turboBaseElement/turboBaseElement";
import {define} from "../../decorators/define/define";

//TODO Create merged events maybe --> fire event x when "mousedown" | "touchstart" | "mousemove" etc.
//ToDO Create "interaction" event --> when element interacted with

/**
 * @class TurboEventManager
 * @group Event Handling
 * @category TurboEventManager
 *
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
class TurboEventManager<ToolType extends string = string> extends TurboBaseElement {
    protected static managers: TurboEventManager[] = [];

    public static get instance(): TurboEventManager {
        return TurboEventManager.managers.length > 0 ? TurboEventManager.managers[0] : TurboEventManager.create();
    }

    public static get allManagers(): TurboEventManager[] {
        return [...this.managers];
    }

    public static set allManagers(managers: TurboEventManager[]) {
        this.managers = managers;
    }

    public get model(): TurboEventManagerModel {
        return turbo(this).model;
    }

    public declare readonly properties: TurboEventManagerProperties;

    public static defaultProperties: TurboEventManagerProperties = {
        model: TurboEventManagerModel,
        controllers: [
            TurboEventManagerKeyController,
            TurboEventManagerWheelController,
            TurboEventManagerPointerController,
            TurboEventManagerDispatchController
        ],
        handlers: TurboEventManagerUtilsHandler,

        keyEventsEnabled: true,
        wheelEventsEnabled: true,
        mouseEventsEnabled: true,
        touchEventsEnabled: true,
        clickEventsEnabled: true,
        dragEventsEnabled: true,
        moveEventsEnabled: true,
    };

    @controller() protected keyController: TurboEventManagerKeyController;
    @controller() protected wheelController: TurboEventManagerWheelController;
    @controller() protected pointerController: TurboEventManagerPointerController;
    @controller() protected dispatchController: TurboEventManagerDispatchController;

    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
    @expose("model", false) public inputDevice: InputDevice;
    @expose("model", false) public onInputDeviceChange: Delegate<(device: InputDevice) => void>;
    @expose("model", false) public currentClick: ClickMode;
    @expose("model", false) public currentKeys: string[];

    /**
     * @description Delegate fired when a tool is changed on a certain click button/mode
     */
    @expose("model", false) public onToolChange: Delegate<(oldTool: Node, newTool: Node, type: ClickMode) => void>;

    @expose("model") public authorizeEventScaling: boolean | (() => boolean);
    @expose("model") public scaleEventPosition: (position: Point) => Point;
    @expose("model") public moveThreshold: number;
    @expose("model") public longPressDuration: number;

    public constructor() {
        super();
        TurboEventManager.managers.push(this);
    }

    public initialize() {
        super.initialize();
        this.unlock();
        document.addEventListener("pointerdown", this.pointerController.pointerDown, {passive: false});
        document.addEventListener("pointermove", this.pointerController.pointerMove, {passive: false});
        document.addEventListener("pointerup", this.pointerController.pointerUp, {passive: false});
        document.addEventListener("pointercancel", this.pointerController.pointerCancel, {passive: false});
        //TODO
        this.dispatchController.setupCustomDispatcher("pointerdown");
    }

    @auto() public set keyEventsEnabled(value: boolean) {
        if (value) {
            document.addEventListener("keydown", this.keyController.keyDown);
            document.addEventListener("keyup", this.keyController.keyUp);
        } else {
            document.removeEventListener("keydown", this.keyController.keyDown);
            document.removeEventListener("keyup", this.keyController.keyUp);
        }
        this.applyAndHookEvents(TurboKeyEventName, DefaultKeyEventName, value);
    }

    @auto() public set wheelEventsEnabled(value: boolean) {
        if (value) document.body.addEventListener("wheel", this.wheelController.wheel, {passive: false});
        else document.body.removeEventListener("wheel", this.wheelController.wheel);
        this.applyAndHookEvents(TurboWheelEventName, DefaultWheelEventName, value);
    }

    @auto() public set moveEventsEnabled(value: boolean) {
        this.applyAndHookEvents(TurboMoveEventName, DefaultMoveEventName, value);
    }

    @auto() public set mouseEventsEnabled(value: boolean) {
        //TODO

        // if (value) {
        //     doc.on("pointerdown", this.pointerController.pointerDown, {passive: false, propagate: true});
        //     doc.on("pointermove", this.pointerController.pointerMove, {passive: false, propagate: true});
        //     doc.on("pointerup", this.pointerController.pointerUp, {passive: false, propagate: true});
        //     doc.on("pointercancel", this.pointerController.pointerCancel, {passive: false, propagate: true});
        // } else {
        //     doc.removeListener("mousedown", this.pointerController.pointerDown);
        //     doc.removeListener("mousemove", this.pointerController.pointerMove);
        //     doc.removeListener("mouseup", this.pointerController.pointerUp);
        //     doc.removeListener("mouseleave", this.pointerController.pointerLeave);
        // }
    }

    @auto() public set touchEventsEnabled(value: boolean) {
        // if (value) {
        //     doc.on("touchstart", this.pointerController.pointerDown, {passive: false, propagate: true});
        //     doc.on("touchmove", this.pointerController.pointerMove, {passive: false, propagate: true});
        //     doc.on("touchend", this.pointerController.pointerUp, {passive: false, propagate: true});
        //     doc.on("touchcancel", this.pointerController.pointerUp, {passive: false, propagate: true});
        // } else {
        //     doc.removeListener("touchstart", this.pointerController.pointerDown);
        //     doc.removeListener("touchmove", this.pointerController.pointerMove);
        //     doc.removeListener("touchend", this.pointerController.pointerUp);
        //     doc.removeListener("touchcancel", this.pointerController.pointerUp);
        // }
    }

    @auto() public set clickEventsEnabled(value: boolean) {
        this.applyAndHookEvents(TurboClickEventName, DefaultClickEventName, value);
    }

    @auto() public set dragEventsEnabled(value: boolean) {
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
    public lock(origin: Node, value: TurboEventManagerStateProperties) {
        this.unlock();
        this.model.lockState.lockOrigin = origin;
        for (const key in value) this.model.lockState[key] = value[key];
    }

    /**
     * @description Resets the lock state to the default values.
     */
    public unlock() {
        this.model.lockState = {lockOrigin: document.body};
    }

    public get enabled() {
        return this.model.state.enabled && (this.model.lockState.enabled ?? true);
    }

    public set enabled(value: boolean) {
        this.model.state.enabled = value;
    }

    public get preventDefaultWheel() {
        return this.model.state.preventDefaultWheel && (this.model.lockState.preventDefaultWheel ?? true);
    }

    public set preventDefaultWheel(value: boolean) {
        this.model.state.preventDefaultWheel = value;
    }

    public get preventDefaultMouse() {
        return this.model.state.preventDefaultMouse && (this.model.lockState.preventDefaultMouse ?? true);
    }

    public set preventDefaultMouse(value: boolean) {
        this.model.state.preventDefaultMouse = value;
    }

    public get preventDefaultTouch() {
        return this.model.state.preventDefaultTouch && (this.model.lockState.preventDefaultTouch ?? true);
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

    public getCurrentTool(mode: ClickMode = this.model.currentClick): Node {
        return this.model.currentTools.get(mode);
    }

    /**
     * @description Returns the instances of the tool currently held by the provided click mode
     * @param mode
     */
    public getCurrentTools(mode: ClickMode = this.model.currentClick): Node[] {
        return this.getToolsByName(this.getCurrentToolName(mode));
    }

    /**
     * @description Returns the name of the tool currently held by the provided click mode
     * @param mode
     */
    public getCurrentToolName(mode: ClickMode = this.model.currentClick): ToolType {
        return this.getToolName(this.getCurrentTool(mode));
    }

    public getToolName(tool: Node): ToolType {
        for (const [toolName, weakSet] of this.model.tools.entries()) {
            if (weakSet.has(tool)) return toolName as ToolType;
        }
    }


    public getSimilarTools(tool: Node): Node[] {
        for (const [toolName, weakSet] of this.model.tools.entries()) {
            if (weakSet.has(tool)) return weakSet.toArray();
        }
        return [];
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
     * @description Sets the provided tool as a current tool associated with the provided type
     * @param tool
     * @param type
     * @param options
     */
    public setTool(tool: Node, type: ClickMode, options: SetToolOptions = {}) {
        if (!isUndefined(tool) && !$(tool).isTool(this)) return;
        turbo(options).applyDefaults({select: true, activate: true, setAsNoAction: type == ClickMode.left});

        //Get previous tool
        const previousTool = this.model.currentTools.get(type);
        if (previousTool) {
            //Return if it's the same
            if (previousTool === tool) return;

            //Deselect and deactivate previous tool
            this.getSimilarTools(previousTool).forEach(element => {
                if (options.select) this.model.utils.selectTool(element, false);
                if (options.activate) this.model.utils.activateTool(element, this.getToolName(previousTool), false);
            });
        }

        //Select new tool (and maybe set it as the tool for no click mode)
        this.model.currentTools.set(type, tool);
        if (options.setAsNoAction) this.model.currentTools.set(ClickMode.none, tool);

        //Select and activate the tool
        this.getSimilarTools(tool).forEach(element => {
            if (options.activate) this.model.utils.activateTool(element, this.getToolName(tool), true);
            if (options.select) this.model.utils.selectTool(element, true);
        });

        //Fire tool changed
        this.onToolChange.fire(previousTool, tool, type);
    }

    /**
     * @description Sets tool associated with the provided key as the current tool for the key mode
     * @param key
     */
    public setToolByKey(key: string): boolean {
        const toolName = this.model.mappedKeysToTool.get(key) as ToolType;
        if (!toolName) return false;
        this.setTool(this.getToolByName(toolName), ClickMode.key, {select: false});
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
        for (const name of Object.values(applyTurboEvents ? turboEventNames : defaultEventNames)) {
            if (applyTurboEvents) this.dispatchController.setupCustomDispatcher(name as TurboEventNameEntry);
            else this.dispatchController.removeCustomDispatcher(name as TurboEventNameEntry);
        }
    }

    public destroy() {
        this.keyEventsEnabled = false;
        this.wheelEventsEnabled = false;
        this.mouseEventsEnabled = false;
        this.touchEventsEnabled = false;
        this.dragEventsEnabled = false;
        this.clickEventsEnabled = false;
        this.onToolChange.clear();
        return this;
    }
}

define(TurboEventManager);
export {TurboEventManager};
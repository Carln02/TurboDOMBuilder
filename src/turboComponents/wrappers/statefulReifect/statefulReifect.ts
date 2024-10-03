import {
    StatefulReifectProperties,
    StatefulReifectCoreProperties,
    ReifectObjectData,
    PropertyConfig,
    ReifectAppliedOptions, ReifectEnabledState, StateSpecificProperty
} from "./statefulReifect.types";
import {PartialRecord} from "../../../domBuilding/core.types";
import {StylesType} from "../../../domBuilding/turbofication/styleManipulation/styleManipulation.types";
import {isNull} from "../../../utils/dataManipulation/misc";
import {eachEqualToAny} from "../../../utils/computations/equity";
import {mod} from "../../../utils/computations/misc";

/**
 * @class StatefulReifect
 * @description A class to manage and apply dynamic state-based properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {string | number | symbol} State - The type of the reifier's states.
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
class StatefulReifect<State extends string | number | symbol, ClassType extends object = Node> {
    //List of attached objects
    protected readonly attachedObjects: ReifectObjectData<State, ClassType>[];

    private _states: State[];
    private readonly _enabled: ReifectEnabledState;

    protected readonly values: StatefulReifectCoreProperties<State, ClassType>;

    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatefulReifectProperties<State, ClassType>} properties - The configuration properties.
     */
    constructor(properties: StatefulReifectProperties<State, ClassType>) {
        this.attachedObjects = [];
        if (properties.attachedObjects) this.attachAll(...properties.attachedObjects);

        //Initializing enabled state
        this._enabled = {
            global: true, properties: true, classes: true, styles: true,
            replaceWith: true, transition: true
        };

        this.values = {
            properties: properties.properties || {},
            classes: properties.classes || {},
            styles: properties.styles || {},
            replaceWith: properties.replaceWith || {},

            transitionProperties: properties.transitionProperties || ["all"],
            transitionDuration: properties.transitionDuration || 0,
            transitionTimingFunction: properties.transitionTimingFunction || "linear",
            transitionDelay: properties.transitionDelay || 0,
        };


        //Disable transition if undefined
        if (!properties.transitionProperties && !properties.transitionDuration
            && !properties.transitionTimingFunction && !properties.transitionDelay)
            this.enabled.transition = false;

        this.states = properties.states;
    }

    //Attached objects management

    /**
     * @function attach
     * @description Attaches an object to the reifier.
     * @param {ClassType} object - The object to attach.
     * @param {(state: State, index: number, total: number, object: ClassType) => void} [onSwitch] - Optional
     * callback fired when the reifier is applied to the object. The callback takes as parameters:
     * - `state: State`: The state being applied to the object.
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     * @param {number} [index] - Optional index to specify the position at which to insert the object in the reifier's
     * attached list.
     * @returns {this} - The reifier itself, for method chaining.
     */
    public attach(object: ClassType, onSwitch?: (state: State, index: number, total: number,
                                                 object: ClassType) => void, index?: number): this {
        const data = this.getData(object);
        if (data && onSwitch) data.onSwitch = onSwitch;
        if (data) return;

        this.attachObject(object, index, onSwitch);
        return this;
    }

    /**
     * @function attachAll
     * @description Attaches multiple objects to the reifier.
     * @param {...ClassType[]} objects - The objects to attach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    public attachAll(...objects: ClassType[]): this {
        objects.forEach(object => {
            if (this.getData(object)) return;
            this.attachObject(object);
        });
        return this;
    }

    /**
     * @function attachAllAt
     * @description Attaches multiple objects to the reifier at a specified index.
     * @param {number} index - The index to specify the position at which to insert the objects in the reifier's
     * attached list.
     * @param {...ClassType[]} objects - The objects to attach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    public attachAllAt(index: number, ...objects: ClassType[]): this {
        objects.forEach((object, count) => {
            if (this.getData(object)) return;
            this.attachObject(object, index + count);
        });
        return this;
    }

    /**
     * @function detach
     * @description Detaches one or more objects from the reifier.
     * @param {...ClassType[]} objects - The objects to detach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    public detach(...objects: ClassType[]): this {
        objects.forEach(object => {
            const data = this.getData(object);
            if (!data) return;
            this.detachObject(data);
        });
        return this;
    }

    /**
     * @function getData
     * @description Retrieve the data entry of a given object.
     * @param {ClassType} object - The object to find the data of.
     * @returns {ReifectObjectData<State, ClassType>} - The corresponding data, or `null` if was not found.
     */
    public getData(object: ClassType): ReifectObjectData<State, ClassType> {
        if (!object) return null;
        for (const entry of this.attachedObjects) {
            const entryObject = this.getObject(entry);
            if (entryObject && entryObject == object) return entry;
        }
        return null;
    }

    /**
     * @function getObject
     * @description Retrieves the object attached to the given data entry.
     * @param {ReifectObjectData<State, ClassType>} data - The data entry to get the corresponding object of.
     * @returns {ClassType} The corresponding object, or `null` if was garbage collected.
     */
    public getObject(data: ReifectObjectData<State, ClassType>): ClassType {
        if (!data) return null;
        const object = data.object.deref();
        return object || null;
    }

    /**
     * @function getEnabledState
     * @description Returns the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to get the state of.
     * @returns {ReifectEnabledState} - The corresponding enabled state.
     */
    public getEnabledState(object: ClassType): ReifectEnabledState {
        return this.getData(object)?.enabled;
    }

    /**
     * @function setEnabledState
     * @description Sets/updates the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to set the state of.
     * @param {boolean | ReifectEnabledState} value - The value to set/update with. Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    public setEnabledState(object: ClassType, value: boolean | ReifectEnabledState) {
        const data = this.getData(object);
        if (!data) return;

        if (typeof value == "boolean") data.enabled.global = value;
        else if (!value) return;
        else for (const [key, state] of Object.entries(value)) {
                data.enabled[key] = state;
            }
    }

    //Getters and setters

    /**
     * @description All possible states.
     */
    public get states(): State[] {
        return this._states;
    }

    public set states(value: State[]) {
        if (!value) this._states = this.getAllStates();
        else this._states = value;
    }


    /**
     * @description The enabled state of the reifier (as a {@link ReifectEnabledState}). Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    public get enabled(): ReifectEnabledState {
        return this._enabled;
    }

    public set enabled(value: boolean | ReifectEnabledState) {
        if (typeof value == "boolean") this._enabled.global = value;
        else if (!value) return;
        else for (const [key, state] of Object.entries(value)) {
                this._enabled[key] = state;
            }
    }

    /**
     * @description The properties to be assigned to the objects. It could take:
     * - A record of `{key: value}` pairs.
     * - A record of `{state: {key: value} pairs or an interpolation function that would return a record of
     * {key: value} pairs}`.
     * - An interpolation function that would return a record of `{key: value}` pairs based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get properties(): PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType> {
        return this.values.properties;
    }

    public set properties(value: PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType>) {
        this.values.properties = value;
    }

    /**
     * @description The styles to be assigned to the objects (only if they are eligible elements). It could take:
     * - A record of `{CSS property: value}` pairs.
     * - A record of `{state: {CSS property: value} pairs or an interpolation function that would return a record of
     * {key: value} pairs}`.
     * - An interpolation function that would return a record of `{key: value}` pairs based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get styles(): PropertyConfig<StylesType, State, ClassType> {
        return this.values.styles;
    }

    public set styles(value: PropertyConfig<StylesType, State, ClassType>) {
        this.values.styles = value;
    }

    /**
     * @description The classes to be assigned to the objects (only if they are eligible elements). It could take:
     * - A string of space-separated classes.
     * - An array of classes.
     * - A record of `{state: space-separated class string, array of classes, or an interpolation function that would
     * return any of the latter}`.
     * - An interpolation function that would return a string of space-separated classes or an array of classes based
     * on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get classes(): PropertyConfig<string | string[], State, ClassType> {
        return this.values.classes;
    }

    public set classes(value: PropertyConfig<string | string[], State, ClassType>) {
        this.values.classes = value;
    }

    /**
     * @description The object that should replace (in the DOM as well if eligible) the attached objects. It could take:
     * - The object to be replaced with.
     * - A record of `{state: object to be replaced with, or an interpolation function that would return an object
     * to be replaced with}`.
     * - An interpolation function that would return the object to be replaced with based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get replaceWith(): PropertyConfig<ClassType, State, ClassType> {
        return this.values.replaceWith;
    }

    public set replaceWith(value: PropertyConfig<ClassType, State, ClassType>) {
        this.values.replaceWith = value;
    }

    /**
     * @description The property(ies) to apply a CSS transition on, on the attached objects. Defaults to "all". It
     * could take:
     * - A string of space-separated CSS properties.
     * - An array of CSS properties.
     * - A record of `{state: space-separated CSS properties string, array of CSS properties, or an interpolation
     * function that would return any of the latter}`.
     * - An interpolation function that would return a string of space-separated CSS properties or an array of
     * CSS properties based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get transitionProperties(): PropertyConfig<string | string[], State, ClassType> {
        return this.values.transitionProperties;
    }

    public set transitionProperties(value: PropertyConfig<string | string[], State, ClassType>) {
        this.values.transitionProperties = value;
    }

    /**
     * @description The duration of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - A record of `{state: duration (number in seconds) or an interpolation function that would return a duration
     * (number in seconds)}`.
     * - An interpolation function that would return a duration (number in seconds) based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get transitionDuration(): PropertyConfig<number, State, ClassType> {
        return this.values.transitionDuration;
    }

    public set transitionDuration(value: PropertyConfig<number, State, ClassType>) {
        this.values.transitionDuration = value;
    }

    /**
     * @description The timing function of the CSS transition to apply on the attached objects. Defaults to "linear."
     * It could take:
     * - A string representing the timing function to apply.
     * - A record of `{state: timing function (string) or an interpolation function that would return a timing
     * function (string)}`.
     * - An interpolation function that would return a timing function (string) based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get transitionTimingFunction(): PropertyConfig<string, State, ClassType> {
        return this.values.transitionTimingFunction;
    }

    public set transitionTimingFunction(value: PropertyConfig<string, State, ClassType>) {
        this.values.transitionTimingFunction = value;
    }

    /**
     * @description The delay of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - A record of `{state: delay (number in seconds) or an interpolation function that would return a delay
     * (number in seconds)}`.
     * - An interpolation function that would return a delay (number in seconds) based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get transitionDelay(): PropertyConfig<number, State, ClassType> {
        return this.values.transitionDelay;
    }

    public set transitionDelay(value: PropertyConfig<number, State, ClassType>) {
        this.values.transitionDelay = value;
    }

    //Usage methods

    public initialize(state: State | boolean, objects?: ClassType | ClassType[],
                      options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled.global) return;

        state = this.parseState(state);
        options = this.initializeOptions(options, objects);

        this.getEnabledObjectsData(objects, options).forEach(data => {
            if (options.recomputeProperties || !data.resolvedValues)
                this.processRawProperties(data, options.propertiesOverride);
            data.lastState = state;

            this.applyResolvedValues(data, data.lastState, true);
            if (data.onSwitch) data.onSwitch(state, data.objectIndex, data.totalObjectCount, this.getObject(data));
        });
    }

    public apply(state: State | boolean, objects?: ClassType | ClassType[],
                 options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled.global) return;

        state = this.parseState(state);
        options = this.initializeOptions(options, objects);

        this.getEnabledObjectsData(objects, options).forEach(data => {
            if (options.recomputeProperties || !data.resolvedValues)
                this.processRawProperties(data, options.propertiesOverride);

            data.lastState = state;
            const handler = (data.object.deref() as Node)?.reifects;
            if (handler) handler.reloadTransitions();

            this.applyResolvedValues(data);
            if (data.onSwitch) data.onSwitch(state, data.objectIndex, data.totalObjectCount, this.getObject(data));
        });
    }

    public toggle(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled.global) return;

        if (!objects) objects = [];
        else if (objects instanceof HTMLCollection) objects = [...objects] as ClassType[];
        else if (!Array.isArray(objects)) objects = [objects];

        const previousState = this.getData(objects[0])?.lastState;
        const nextStateIndex = mod(previousState != undefined
            ? this.states.indexOf(previousState) + 1 : 0, this.states.length);

        this.apply(this.states[nextStateIndex], objects, options);
    }

    /**
     * @function reloadFor
     * @description Generates the transition CSS string for the provided transition with the correct interpolation
     * information.
     * @param {ClassType} object - The element to apply the string to.
     * @returns {this} Itself for method chaining.
     */
    public reloadFor(object: ClassType): this {
        if (!this.enabled.global) return this;

        const data = this.getData(object);
        if (!data || !data.enabled || !data.enabled.global) return this;

        this.applyResolvedValues(data, data.lastState);
        return this;
    }

    public reloadTransitionFor(object: ClassType): this {
        if (!this.enabled.global) return this;

        const data = this.getData(object);
        if (!data || !data.enabled || !data.enabled.global) return this;

        if (this.enabled.transition && data.enabled.transition) this.applyTransition(data, data.lastState);
        return this;
    }

    public getEnabledObjectsData(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>)
        : ReifectObjectData<State, ClassType>[] {
        if (!this.enabled.global) {
            console.warn("The reifier object you are trying to access is disabled.");
            return [];
        }

        if (!objects) objects = [];
        else if (objects instanceof HTMLCollection) objects = [...objects] as ClassType[];
        else if (!Array.isArray(objects)) objects = [objects];

        options = this.initializeOptions(options, objects);
        if (options.attachObjects) objects.forEach(element => this.attach(element));

        if (options.executeForAll) {
            objects = [];
            this.attachedObjects.forEach(entry => {
                const object = entry.object.deref();
                if (object) (objects as ClassType[]).push(object);
            });
        }

        const enabledObjectsData: ReifectObjectData<State, ClassType>[] = [];
        objects.forEach((object) => {
            const data = this.getData(object) || this.generateNewData(object);
            if (!this.filterEnabledObjects(data)) return;

            if (options.recomputeIndices || data.objectIndex == undefined)
                data.objectIndex = enabledObjectsData.length;
            enabledObjectsData.push(data);
        });

        enabledObjectsData.forEach(data => {
            if (options.recomputeIndices || data.totalObjectCount == undefined) {
                data.totalObjectCount = enabledObjectsData.length;
            }
        });

        return enabledObjectsData;
    }

    /**
     * @function stateOf
     * @description Determine the current state of the reifect on the provided object.
     * @param {ClassType} object - The object to determine the state for.
     * @returns {State | undefined} - The current state of the reifect or undefined if not determinable.
     */
    public stateOf(object: ClassType): State {
        if (!object) return undefined;
        const data = this.getData(object);

        if (!data) return undefined;
        if (data.lastState) return data.lastState;
        if (!(object instanceof HTMLElement)) return this.states[0];

        if (!data.resolvedValues) this.processRawProperties(data);
        for (const state of this.states) {
            if (!data.resolvedValues.styles[state]) continue;
            let matches: boolean = true;

            for (const [property, value] of Object.entries(data.resolvedValues.styles[state])) {
                if (object.style[property] != value) {
                    matches = false;
                    break;
                }
            }

            if (!matches) continue;
            data.lastState = state;
            return state;
        }

        return this.states[0];
    }

    //Property setting methods

    public applyResolvedValues(data: ReifectObjectData<State, ClassType>, state: State = data.lastState,
                               skipTransition: boolean = false) {
        if (this.enabled.transition && data.enabled.transition && !skipTransition) this.applyTransition(data, state);
        if (this.enabled.replaceWith && data.enabled.replaceWith) this.replaceObject(data, state);
        if (this.enabled.properties && data.enabled.properties) this.setProperties(data, state);
        if (this.enabled.classes && data.enabled.classes) this.applyClasses(data, state);
        if (this.enabled.styles && data.enabled.styles) this.applyStyles(data, state);
    }

    public replaceObject(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        const newObject = data.resolvedValues.replaceWith[state];
        if (!newObject) return;

        try {
            const object = data.object.deref();
            if (object && object instanceof Node && newObject instanceof Node)
                object.parentNode?.replaceChild(newObject, object);
            data.object = new WeakRef(newObject);
        } catch (e: any) {
            console.error(`Unable to replace object: ${e.message}`);
        }
    }

    public setProperties(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        const properties = data.resolvedValues.properties[state];
        if (!properties) return;

        const object = data.object.deref();
        if (!object) return;

        for (const [field, value] of Object.entries(properties)) {
            if (!field || value == undefined) continue;
            try {
                object[field] = value;
            } catch (e: any) {
                console.error(`Unable to set property ${field} to ${value}: ${e.message}`);
            }
        }
    }

    public applyClasses(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        const classes = data.resolvedValues.classes;
        if (!classes) return;

        const object = data.object.deref();
        if (!object || !(object instanceof Element)) return;

        for (const [key, value] of Object.entries(classes)) {
            object.toggleClass(value as (string | string[]), state == key);
        }
    }

    public applyStyles(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        const object = data.object.deref();
        if (!object || !(object instanceof Element)) return;
        object.setStyles(data.resolvedValues.styles[state]);
    }

    public applyTransition(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        const object = data.object.deref();
        if (!object || !(object instanceof Element)) return;
        object.appendStyle("transition", this.getTransitionString(data, state), ", ", true);
    }

    //General methods (to be overridden for custom functionalities)

    /**
     * @protected
     * @function attachObject
     * @description Function used to generate a data entry for the given object, and add it to the attached list at
     * the provided index (if any).
     * @param {ClassType} object - The object to attach
     * @param {number} [index] - Optional index to specify the position at which to insert the object in the reifier's
     * attached list.
     * @param {(state: State, index: number, total: number, object: ClassType) => void} [onSwitch] - Optional
     * callback fired when the reifier is applied to the object. The callback takes as parameters:
     * - `state: State`: The state being applied to the object.
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     * @returns {ReifectObjectData<State, ClassType>} - The created data entry.
     */
    protected attachObject(object: ClassType, index?: number, onSwitch?:
        (state: State, index: number, total: number, object: ClassType) => void): ReifectObjectData<State, ClassType> {
        if (index == undefined || isNaN(index)) index = this.attachedObjects.length;
        if (index < 0) index = 0;

        const data = this.generateNewData(object, onSwitch);
        this.attachedObjects.splice(index, 0, data);
        return data;
    }

    /**
     * @protected
     * @function detachObject
     * @description Function used to remove a data entry from the attached objects list.
     * @param {ReifectObjectData<State, ClassType>} data - The data entry to remove.
     */
    protected detachObject(data: ReifectObjectData<State, ClassType>) {
        this.attachedObjects.splice(this.attachedObjects.indexOf(data), 1);
    }

    protected filterEnabledObjects(data: ReifectObjectData<State, ClassType>): boolean {
        if (!data.enabled || !data.enabled.global) {
            console.warn("The reified properties instance you are trying to set on an object is " +
                "disabled for this particular object.");
            return false;
        }
        return true;
    }

    //Utilities

    public getAllStates(): State[] {
        const states: State[] = [...this.states];
        for (const values of [this.properties,
            this.classes, this.styles, this.replaceWith]) {
            if (typeof values != "object") continue;
            for (const state of Object.keys(values)) {
                if (!states.includes(state as State)) states.push(state as State);
            }
        }
        if (states.length == 0) console.warn("No states found for this particular reifect:", this);
        return states;
    }

    protected processRawProperties(data: ReifectObjectData<State, ClassType>,
                                   override?: StatefulReifectCoreProperties<State, ClassType>) {
        if (!data.resolvedValues) data.resolvedValues = {
            properties: undefined,
            styles: undefined,
            classes: undefined,
            replaceWith: undefined,

            transitionProperties: undefined,
            transitionDuration: undefined,
            transitionTimingFunction: undefined,
            transitionDelay: undefined
        };

        if (isNull(override)) return;

        const rawProperties = {
            properties: this.properties,
            styles: this.styles,
            classes: this.classes,
            replaceWith: this.replaceWith,

            transitionProperties: this.transitionProperties,
            transitionDuration: this.transitionDuration,
            transitionTimingFunction: this.transitionTimingFunction,
            transitionDelay: this.transitionDelay,

            ...(override || {})
        };

        data.resolvedValues.properties = {};
        this.states.forEach(state => this.processRawPropertyForState(data, "properties",
            rawProperties.properties, state));

        if ("transitionProperties" in rawProperties) {
            data.resolvedValues.transitionProperties = {};
            this.states.forEach(state =>
                this.processRawPropertyForState(data, "transitionProperties",
                    rawProperties.transitionProperties, state));
        }

        for (const [field, values] of Object.entries(rawProperties)) {
            if (field == "transitionProperties" || field == "properties") continue;
            data.resolvedValues[field] = {};
            this.states.forEach(state =>
                this.processRawPropertyForState(data,
                    field as keyof StatefulReifectCoreProperties<State, ClassType>, values, state));
        }
    }

    private generateNewData(object: ClassType, onSwitch?:
        (state: State, index: number, total: number, object: ClassType) => void): ReifectObjectData<State, ClassType> {
        return {
            object: new WeakRef(object),
            enabled: {
                global: true,
                properties: true,
                classes: true,
                styles: true,
                replaceWith: true,
                transition: true
            },
            lastState: this.stateOf(object),
            onSwitch: onSwitch
        };
    }

    private initializeOptions(options?: ReifectAppliedOptions<State, ClassType>,  objects?: ClassType | ClassType[])
        : ReifectAppliedOptions<State, ClassType> {
        if (!objects) objects = [];
        else if (objects instanceof HTMLCollection) objects = [...objects] as ClassType[];
        else if (!Array.isArray(objects)) objects = [objects];

        options = options || {};
        options.attachObjects = options.attachObjects ?? true;
        options.executeForAll = options.executeForAll ?? (objects.length === 0);
        options.recomputeIndices = options.recomputeIndices ?? (objects.length !== 0);
        options.recomputeProperties = options.recomputeProperties ?? (objects.length !== 0);
        return options;
    }

    /**
     * @description Clone the reifect to create a new copy with the same properties but no attached objects.
     * @returns {StatefulReifect<State, ClassType>} - The new reifect.
     */
    public clone(): StatefulReifect<State, ClassType> {
        return new StatefulReifect<State, ClassType>({
            states: this.states,

            properties: this.properties,
            classes: this.classes,
            styles: this.styles,
            replaceWith: this.replaceWith,

            transitionProperties: this.transitionProperties,
            transitionDuration: this.transitionDuration,
            transitionTimingFunction: this.transitionTimingFunction,
            transitionDelay: this.transitionDelay,
        });
    }

    /**
     * @protected
     * @function parseState
     * @description Parses a boolean into the corresponding state value.
     * @param {State | boolean} value - The value to parse.
     * @returns {State} The parsed value, or `null` if the boolean could not be parsed.
     */
    protected parseState(value: State | boolean): State {
        if (typeof value != "boolean") return value;
        else for (const str of value ? ["true", "on", "in", "enabled", "shown"]
            : ["false", "off", "out", "disabled", "hidden"]) {
            if (!this.states.includes(str as State)) continue;
            return str as State;
        }
    }

    /**
     * @function getTransitionString
     * @description Gets the CSS transition string for the specified direction.
     * @param {ReifectObjectData<State, ClassType>} data - The target element's transition data entry.
     * @param state
     * @returns {string} The CSS transition string.
     */
    private getTransitionString(data: ReifectObjectData<State, ClassType>, state: State = data.lastState): string {
        let transitionString = "";
        data.resolvedValues.transitionProperties[state].forEach(property => transitionString
            += ", " + property + " " + (data.resolvedValues.transitionDuration[state] || 0) + "s "
            + (data.resolvedValues.transitionTimingFunction[state] || "linear") + " "
            + (data.resolvedValues.transitionDelay[state] || 0) + "s");

        return transitionString.substring(2);
    }

    protected processRawPropertyForState<Type>(data: ReifectObjectData<State, ClassType>,
                                               field: keyof StatefulReifectCoreProperties<State, ClassType>,
                                               value: PropertyConfig<Type, State, ClassType>,
                                               state: State) {
        let resolvedValue: Type;
        const object = data.object.deref();
        if (!object) return;

        if (typeof value == "function") {
            resolvedValue = (value as Function)(state, data.objectIndex, data.totalObjectCount, object);
        } else if (typeof value == "object" && eachEqualToAny(this.states as string[], ...Object.keys(value))) {
            const currentValue = (value as
                PartialRecord<State, StateSpecificProperty<Type, ClassType>>)[state];

            if (typeof currentValue == "function")
                resolvedValue = currentValue(data.objectIndex, data.totalObjectCount, object);
           else resolvedValue = currentValue as Type;
        } else resolvedValue = value as Type;

        if ((field == "properties" || field == "transitionProperties") && typeof resolvedValue == "string") {
            resolvedValue = resolvedValue.split(" ") as Type;
        } else if (field == "styles") {
            if (data.resolvedValues.styles[state] == undefined) data.resolvedValues.styles[state] = {};

            if (typeof resolvedValue == "number") {
                data.resolvedValues.transitionProperties[state].forEach(property =>
                    data.resolvedValues.styles[state][property] = resolvedValue);
                return;
            } else if (typeof resolvedValue == "string") {
                const splitStyles = resolvedValue.split(";")
                    .map(entry => entry.split(":")
                        .map(part => part.trim()));

                if (splitStyles.length == 1 && splitStyles[0].length == 1) {
                    data.resolvedValues.transitionProperties[state].forEach(property =>
                        data.resolvedValues.styles[state][property] = splitStyles[0][0]);
                    return;
                }
            }
        }

        (data.resolvedValues[field][state] as Type) = resolvedValue;
    }
}

function statefulReifier<State extends string | number | symbol, ClassType extends object = Element>(
    properties: StatefulReifectProperties<State, ClassType>): StatefulReifect<State, ClassType> {
    return new StatefulReifect<State, ClassType>(properties);
}

export {StatefulReifect, statefulReifier};
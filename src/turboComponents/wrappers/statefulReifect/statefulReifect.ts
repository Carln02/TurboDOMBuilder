import {
    BasicPropertyConfig,
    PropertyConfig,
    ReifectAppliedOptions,
    ReifectEnabledObject,
    ReifectInterpolator,
    ReifectObjectData,
    StatefulReifectCoreProperties,
    StatefulReifectProperties,
    StateInterpolator
} from "./statefulReifect.types";
import {isNull, isUndefined} from "../../../utils/dataManipulation/misc";
import {mod} from "../../../utils/computations/misc";
import {auto} from "../../../decorators/auto/auto";
import {StylesType} from "../../../turboFunctions/style/style.types";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {PartialRecord} from "../../../types/basic.types";

/**
 * @class StatefulReifect
 * @group Components
 * @category StatefulReifect
 *
 * @description A class to manage and apply dynamic state-based properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {string | number | symbol} State - The type of the reifier's states.
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
class StatefulReifect<State extends string | number | symbol = any, ClassType extends object = object> {
    protected static readonly fields = ["properties", "classes", "styles",
        "replaceWith", "transitionProperties", "transitionDuration", "transitionTimingFunction", "transitionDelay"] as const;

    protected readonly timeRegex: RegExp = /^(\d+(?:\.\d+)?)(ms|s)?$/i;

    protected readonly attachedObjects: ReifectObjectData<State, ClassType>[] = [];

    /**
     * @description All possible states.
     */
    @auto({defaultValueCallback: function () {return this.getAllStates()}})
    public states: State[];

    @auto({
        defaultValueCallback: () => {
            return {global: true, properties: true, classes: true, styles: true, replaceWith: true, transition: true}
        },
        preprocessValue: function (value) {return typeof value === "boolean" ? {...this.enabled, global: value} : value}
    })
    public get enabled(): ReifectEnabledObject {return}

    public set enabled(value: boolean | ReifectEnabledObject) {
        const object = value as ReifectEnabledObject;
        if (!isUndefined(object.global)) {
            this.refreshResolvedValues();
            return;
        }
        if (!isUndefined(object.properties)) this.refreshProperties();
        if (!isUndefined(object.styles)) this.refreshStyles();
        if (!isUndefined(object.classes)) this.refreshClasses();
        if (!isUndefined(object.replaceWith)) this.refreshReplaceWith();
        if (!isUndefined(object.transition)) this.refreshTransition();
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
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value) {return this.normalizePropertyConfig(this.properties, value)}
    })
    public set properties(value: PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType>) {}

    public get properties(): PartialRecord<State, ReifectInterpolator<PartialRecord<keyof ClassType, any>, ClassType>> {return}

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
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value) {return this.normalizePropertyConfig(this.styles, value)}
    })
    public set styles(value: PropertyConfig<StylesType, State, ClassType>) {}

    public get styles(): PartialRecord<State, ReifectInterpolator<StylesType, ClassType>> {return}

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
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value) {return this.normalizePropertyConfig(this.classes, value)}
    })
    public set classes(value: PropertyConfig<string | string[], State, ClassType>) {}

    public get classes(): PartialRecord<State, ReifectInterpolator<string | string[], ClassType>> {return}

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
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value) {return this.normalizePropertyConfig(this.replaceWith, value)}
    })
    public set replaceWith(value: PropertyConfig<ClassType, State, ClassType>) {}

    public get replaceWith(): PartialRecord<State, ReifectInterpolator<ClassType, ClassType>> {return}

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
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value) {return this.normalizePropertyConfig(this.transitionProperties, value)}
    })
    public set transitionProperties(value: PropertyConfig<string | string[], State, ClassType>) {}

    public get transitionProperties(): PartialRecord<State, ReifectInterpolator<string | string[], ClassType>> {return}

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
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value) {return this.normalizePropertyConfig(this.transitionDuration, value)}
    })
    public set transitionDuration(value: PropertyConfig<number, State, ClassType>) {}

    public get transitionDuration(): PartialRecord<State, ReifectInterpolator<number, ClassType>> {return}

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
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value) {return this.normalizePropertyConfig(this.transitionTimingFunction, value)}
    })
    public set transitionTimingFunction(value: PropertyConfig<string, State, ClassType>) {}

    public get transitionTimingFunction(): PartialRecord<State, ReifectInterpolator<string, ClassType>> {return}

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
    @auto({
        setIfUndefined: true,
        preprocessValue: function (value) {return this.normalizePropertyConfig(this.transitionDelay, value)}
    })
    public set transitionDelay(value: PropertyConfig<number, State, ClassType>) {}

    public get transitionDelay(): PartialRecord<State, ReifectInterpolator<number, ClassType>> {return}

    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatefulReifectProperties<State, ClassType>} properties - The configuration properties.
     */
    public constructor(properties: StatefulReifectProperties<State, ClassType>) {
        if (properties.states) this.states = properties.states;
        Object.entries(properties).forEach(([key, value]) => {
            if (key === "attachedObjects" || key === "states") return;
            this[key] = value;
        });

        //Disable transition if undefined
        if (!properties.transition && !properties.transitionProperties && !properties.transitionDuration
            && !properties.transitionTimingFunction && !properties.transitionDelay)
            this.enabled.transition = false;

        if (properties.attachedObjects) this.attachAll(...properties.attachedObjects);
    }

    /*
     *
     * *********************************
     *
     * Attached objects management
     *
     * *********************************
     *
     */

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
        if (!data) this.attachObject(object, index, onSwitch);
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
            if (!this.getData(object)) this.attachObject(object);
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
            if (!this.getData(object)) this.attachObject(object, index + count);
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
            if (data) this.detachObject(data);
        });
        return this;
    }

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
    protected attachObject(object: ClassType, index?: number, onSwitch?: (
        state: State, index: number, total: number, object: ClassType) => void
    ): ReifectObjectData<State, ClassType> {
        if (index == undefined || isNaN(index)) index = this.attachedObjects.length;
        if (index < 0) index = 0;

        const data = this.generateNewData(object, onSwitch);
        this.attachedObjects.splice(index!, 0, data);
        turbo(object).attachReifect(this);

        data.lastState = this.stateOf(object);
        this.applyResolvedValues(data, false, true);
        // this.applyTransition(data);

        return data;
    }

    /**
     * @protected
     * @function detachObject
     * @description Function used to remove a data entry from the attached objects list.
     * @param {ReifectObjectData<State, ClassType>} data - The data entry to remove.
     */
    protected detachObject(data: ReifectObjectData<State, ClassType>) {
        if (!this.attachedObjects.includes(data)) return;
        const object = data.object.deref();
        this.attachedObjects.splice(this.attachedObjects.indexOf(data), 1);
        if (object) turbo(object).detachReifect(this);
    }

    /**
     * @function getData
     * @description Retrieve the data entry of a given object.
     * @param {ClassType} object - The object to find the data of.
     * @returns {ReifectObjectData<State, ClassType>} - The corresponding data, or `null` if was not found.
     */
    public getData(object: ClassType): ReifectObjectData<State, ClassType> {
        if (!object) return;
        for (const entry of this.attachedObjects) {
            const entryObject = this.getObject(entry);
            if (entryObject && entryObject == object) return entry;
        }
        return;
    }

    /**
     * @function getObject
     * @description Retrieves the object attached to the given data entry.
     * @param {ReifectObjectData<State, ClassType>} data - The data entry to get the corresponding object of.
     * @returns {ClassType} The corresponding object, or `null` if was garbage collected.
     */
    public getObject(data: ReifectObjectData<State, ClassType>): ClassType {
        if (!data) return;
        return data.object.deref();
    }

    /*
     *
     * *********************************
     *
     * States stuff
     *
     * *********************************
     *
     */

    /**
     * @function stateOf
     * @description Determine the current state of the reifect on the provided object.
     * @param {ClassType} object - The object to determine the state for.
     * @returns {State | undefined} - The current state of the reifect or undefined if not determinable.
     */
    public stateOf(object: ClassType): State {
        if (!object) return;
        const data = this.getData(object);

        if (!data) return;
        if (data.lastState) return data.lastState;
        if (!(object instanceof HTMLElement)) return this.states[0];

        if (!data.resolvedValues) this.processRawProperties(data);
        for (const state of this.states) {
            if (!data.resolvedValues?.styles?.[state]) continue;
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

    public getAllStates(): State[] {
        const set = new Set<State>();
        for (const field of StatefulReifect.fields) {
            const value = this[field];
            if (!value || typeof value !== "object") continue;
            for (const state of Object.keys(value)) set.add(state as State);
        }
        return Array.from(set);
    }

    /**
     * @protected
     * @function parseState
     * @description Parses a boolean into the corresponding state value.
     * @param {State | boolean} value - The value to parse.
     * @returns {State} The parsed value, or `null` if the boolean could not be parsed.
     */
    protected parseState(value: State | boolean): State {
        if (typeof value != "boolean") return this.states.includes(value) ? value : this.states[0];
        else for (const str of value ? ["true", "on", "in", "enabled", "shown"]
            : ["false", "off", "out", "disabled", "hidden"]) {
            if (!this.states.includes(str as State)) continue;
            return str as State;
        }
        return this.states[0];
    }

    /*
     *
     * *********************************
     *
     * Enabled stuff
     *
     * *********************************
     *
     */

    /**
     * @function enable
     * @description Sets/updates the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to set the state of.
     * @param {boolean | ReifectEnabledObject} value - The value to set/update with. Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    public enable(value: boolean | ReifectEnabledObject, object?: ClassType) {
        const data = this.getData(object);
        if (!data) return this.enabled = value;

        if (typeof value === "boolean") data.enabled.global = value;
        else if (typeof value === "object") Object.entries(value)
            .forEach(([key, value]) => data.enabled[key] = value);
    }

    /**
     * @function getObjectEnabledState
     * @description Returns the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to get the state of.
     * @returns {ReifectEnabledObject} - The corresponding enabled state.
     */
    public getObjectEnabledState(object: ClassType): ReifectEnabledObject {
        return this.getData(object)?.enabled;
    }

    /*
     *
     * *********************************
     *
     * Properties stuff
     *
     * *********************************
     *
     */

    public set transition(value: BasicPropertyConfig<string, State>) {
        if (!value) return;
        const object = typeof value === "string"
            ? this.processTransitionString(value)
            : this.processTransitionObject(value);
        Object.entries(object).forEach(([key, value]) => this[key] = value);
    }

    protected processTransitionObject(transitionObject: BasicPropertyConfig<string, State>): StatefulReifectCoreProperties<State, ClassType> {
        const transitionValues: StatefulReifectCoreProperties<State, ClassType> = {};
        for (const [state, entry] of Object.entries(transitionObject)) {
            if (!this.states.includes(state as any)) continue;
            if (typeof entry !== "string") continue;
            Object.entries(this.processTransitionString(entry)).forEach(([key, value]) => {
                if (!transitionValues[key]) transitionValues[key] = {};
                transitionValues[key][state] = value;
            });
        }
        return transitionValues;
    }

    protected processTransitionString(transitionString: string): StatefulReifectCoreProperties<State, ClassType> {
        // Normalize commas → spaces, split & filter
        const tokens = transitionString.trim().replace(/,/g, " ").split(/\s+/).filter(t => t.length > 0);
        const object: StatefulReifectCoreProperties<State, ClassType> = {transitionProperties: []};
        let i = 0;

        while (i < tokens.length && !this.timeRegex.test(tokens[i])) {
            (object.transitionProperties as Array<string>).push(tokens[i]);
            i++;
        }
        if (i < tokens.length) {
            const duration = this.parseTime(tokens[i]);
            if (!isNaN(duration)) object.transitionDuration = duration;
            i++;
        }
        if (i < tokens.length) {
            object.transitionTimingFunction = tokens[i];
            i++;
        }
        if (i < tokens.length) {
            const delay = this.parseTime(tokens[i]);
            if (!isNaN(delay)) object.transitionDelay = delay;
            i++;
        }

        return object;
    }

    /**
     * @function getTransitionString
     * @description Gets the CSS transition string for the specified direction.
     * @param {ReifectObjectData<State, ClassType>} data - The target element's transition data entry.
     * @param state
     * @returns {string} The CSS transition string.
     */
    private getTransitionString(data: ReifectObjectData<State, ClassType>, state: State = data.lastState): string {
        if (!data.resolvedValues) return "";
        const properties = this.cleanTransitionProperties(data.resolvedValues.transitionProperties[state]);
        const duration = data.resolvedValues.transitionDuration[state] ?? 0;
        const timing = data.resolvedValues.transitionTimingFunction[state] ?? "linear";
        const delay = data.resolvedValues.transitionDelay[state] ?? 0;
        return properties.map(property => `${property} ${duration}s ${timing} ${delay}s`).join(", ");
    }

    /*
     *
     * *********************************
     *
     * Usage methods
     *
     * *********************************
     *
     */

    public initialize(state: State | boolean, objects?: ClassType | ClassType[],
                      options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled) return;

        state = this.parseState(state);
        options = this.initializeOptions(options, objects);

        this.getEnabledObjectsData(objects, options).forEach(data => {
            if (options.recomputeProperties || !data.resolvedValues) this.processRawProperties(data, options.propertiesOverride);
            data.lastState = state;
            this.applyResolvedValues(data, true, options?.applyStylesInstantly);
            if (data.onSwitch) data.onSwitch(state, data.objectIndex, data.totalObjectCount, this.getObject(data));
        });
    }

    public apply(state: State | boolean, objects?: ClassType | ClassType[],
                 options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled) return;

        state = this.parseState(state);
        options = this.initializeOptions(options, objects);

        this.getEnabledObjectsData(objects, options).forEach(data => {
            if (options.recomputeProperties || !data.resolvedValues) this.processRawProperties(data, options.propertiesOverride);
            data.lastState = state;
            this.applyResolvedValues(data, false, options?.applyStylesInstantly);
            if (data.onSwitch) data.onSwitch(state, data.objectIndex, data.totalObjectCount, this.getObject(data));
        });
    }

    public toggle(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled) return;

        if (!objects) objects = [];
        else if (objects instanceof HTMLCollection) objects = [...objects] as ClassType[];
        else if (!Array.isArray(objects)) objects = [objects];

        const previousState = this.getData(objects[0])?.lastState;
        const nextStateIndex = mod(!previousState ? 0 : this.states.indexOf(previousState) + 1, this.states.length);
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

        this.applyResolvedValues(data);
        return this;
    }

    public reloadTransitionFor(object: ClassType): this {
        if (!this.enabled.global || !this.enabled.transition) return this;
        const data = this.getData(object);
        if (!data || !data.enabled || !data.enabled.global || !data.enabled.transition) return this;
        this.applyTransition(data, data.lastState);
        return this;
    }

    public getEnabledObjectsData(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>)
        : ReifectObjectData<State, ClassType>[] {
        if (!this.enabled) {
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

    /*
     *
     * *********************************
     *
     * Property setting stuff
     *
     * *********************************
     *
     */

    public applyResolvedValues(data: ReifectObjectData<State, ClassType>, skipTransition: boolean = false,
                               applyStylesInstantly: boolean = false) {
        this.applyStyles(data, data.lastState, applyStylesInstantly);

        if (!skipTransition) {
            if (this.attachedObjects.includes(data)) turbo(data.object.deref()).reloadTransitions();
            else this.applyTransition(data, data.lastState);
        }

        this.applyReplaceWith(data, data.lastState);
        this.applyProperties(data, data.lastState);
        this.applyClasses(data, data.lastState);
    }

    public refreshResolvedValues() {
        this.refreshProperties();
        this.refreshStyles();
        this.refreshClasses();
        this.refreshReplaceWith();
        this.refreshTransition();
    }

    public applyProperties(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        if (!this.enabled || !this.enabled.properties) return;
        if (!data.enabled.global || !data.enabled.properties) return;

        const properties = data.resolvedValues?.properties?.[state];
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

    public refreshProperties() {
        if (!this.enabled || !this.enabled.properties) return;
        this.attachedObjects.forEach(data => this.applyProperties(data));
    }

    public applyReplaceWith(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        if (!this.enabled || !this.enabled.replaceWith) return;
        if (!data.enabled.global || !data.enabled.replaceWith) return;

        const newObject = data.resolvedValues?.replaceWith?.[state];
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

    public refreshReplaceWith() {
        if (!this.enabled || !this.enabled.replaceWith) return;
        this.attachedObjects.forEach(data => this.applyReplaceWith(data));
    }

    public applyClasses(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        if (!this.enabled || !this.enabled.classes) return;
        if (!data.enabled.global || !data.enabled.classes) return;

        const classes = data.resolvedValues?.classes;
        if (!classes) return;

        const object = data.object.deref();
        if (!object || !(object instanceof Element)) return;

        for (const [key, value] of Object.entries(classes)) {
            turbo(object).toggleClass(value as (string | string[]), state == key);
        }
    }

    public refreshClasses() {
        if (!this.enabled || !this.enabled.classes) return;
        this.attachedObjects.forEach(data => this.applyClasses(data));
    }

    public applyStyles(data: ReifectObjectData<State, ClassType>, state: State = data.lastState,
                       applyStylesInstantly: boolean = false) {
        if (!this.enabled || !this.enabled.styles) return;
        if (!data.enabled.global || !data.enabled.styles) return;
        if (!data.resolvedValues?.styles) return;

        const object = data.object.deref();
        if (!object || !(object instanceof Element)) return;
        turbo(object).setStyles(data.resolvedValues.styles[state], applyStylesInstantly);
    }

    public refreshStyles() {
        if (!this.enabled || !this.enabled.styles) return;
        this.attachedObjects.forEach(data => this.applyStyles(data));
    }

    public applyTransition(data: ReifectObjectData<State, ClassType>, state: State = data.lastState) {
        if (!this.enabled || !this.enabled.transition) return;
        if (!data.enabled.global || !data.enabled.transition) return;

        const object = data.object.deref();
        if (!object || !(object instanceof Element) || !data.resolvedValues) return;
        turbo(object).appendStyle("transition", this.getTransitionString(data, state), ", ", true);
    }

    public refreshTransition() {
        for (const data of this.attachedObjects) {
            turbo(data.object?.deref()).reloadTransitions();
        }
    }

    //General methods (to be overridden for custom functionalities)

    protected filterEnabledObjects(data: ReifectObjectData<State, ClassType>): boolean {
        if (!data.enabled || !data.enabled.global) {
            console.warn("The reified properties instance you are trying to set on an object is " +
                "disabled for this particular object.");
            return false;
        }
        return true;
    }

    //Utilities

    protected processRawProperties(data: ReifectObjectData<State, ClassType>,
                                   override?: StatefulReifectCoreProperties<State, ClassType>) {
        if (!data.resolvedValues) data.resolvedValues = {} as any;
        if (isNull(override)) return;

        const object = data.object.deref();
        if (!object) return;

        const index = data.objectIndex ?? 0;
        const total = data.totalObjectCount ?? 1;

        for (const field of StatefulReifect.fields) {
            const rawValue = this.normalizePropertyConfig(this[field], override?.[field]);
            if (!data.resolvedValues[field]) data.resolvedValues[field] = {};
            for (const state of this.states) data.resolvedValues[field][state] = rawValue[state]?.(index, total, object);
        }
    }

    private generateNewData(object: ClassType, onSwitch?:
    (state: State, index: number, total: number, object: ClassType) => void): ReifectObjectData<State, ClassType> {
        return {
            object: new WeakRef(object),
            enabled: {global: true, properties: true, classes: true, styles: true, replaceWith: true, transition: true},
            lastState: this.stateOf(object),
            onSwitch: onSwitch
        };
    }

    private initializeOptions(options?: ReifectAppliedOptions<State, ClassType>, objects?: ClassType | ClassType[])
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

    protected normalizePropertyConfig<Type>(
        currentConfig: PartialRecord<State, ReifectInterpolator<Type, ClassType>>,
        newConfig: PropertyConfig<Type, State, ClassType>,
    ): PartialRecord<State, ReifectInterpolator<Type, ClassType>> {
        const out: PartialRecord<State, ReifectInterpolator<Type, ClassType>> = currentConfig ? {...currentConfig} : {};
        if (isUndefined(newConfig)) return out;

        const isObject = typeof newConfig === "object" && newConfig !== null && !Array.isArray(newConfig);
        const keys = isObject ? Reflect.ownKeys(newConfig as object) : [];
        const isStateRecord = isObject && keys.length > 0 &&
            keys.every(key => this.states.includes(key as State));
        if (isObject && keys.length === 0) return out;

        if (typeof newConfig === "function") this.states.forEach(state => {
            out[state] = (index, total, object) =>
                (newConfig as StateInterpolator<Type, State, ClassType>)(state, index, total, object);
        });
        else if (isStateRecord) this.states.forEach(state => {
            const entry: Type | ReifectInterpolator<Type, ClassType> = (newConfig as PartialRecord<State, Type | ReifectInterpolator<Type, ClassType>>)[state];
            if (!isUndefined(entry)) out[state] = typeof entry === "function"
                ? entry as ReifectInterpolator<Type, ClassType>
                : () => entry;
        });
        else {
            const value = () => newConfig as Type;
            this.states.forEach(state => out[state] = value);
        }
        return out;
    }

    private cleanTransitionProperties(value: string | string[]): string[] {
        if (!value) return ["all"];
        if (Array.isArray(value)) return value.length ? value : ["all"];
        const split = value.split(/\s+/).map(s => s.trim()).filter(Boolean);
        return split.length ? split : ["all"];
    }

    /**
     * @description Processes string durations like "200ms" or "0.3s", or even "100".
     * @param value
     * @private
     */
    private parseTime(value: string): number {
        const matches = value.match(this.timeRegex);
        if (!matches) return NaN;

        const num = parseFloat(matches[1]);
        const unit = matches[2]?.toLowerCase() ?? "s";
        return unit === "ms" ? num / 1000 : num;
    }
}

/**
 * @group Components
 * @category StatefulReifect
 */
function statefulReifier<State extends string | number | symbol, ClassType extends object = Element>(
    properties: StatefulReifectProperties<State, ClassType>): StatefulReifect<State, ClassType> {
    return new StatefulReifect<State, ClassType>(properties);
}

export {StatefulReifect, statefulReifier};
import {
    PropertyConfig,
    ReifectAppliedOptions,
    ReifectEnabledObject,
    ReifectInterpolator,
    ReifectObjectData, ReifectOnSwitchCallback,
    StatefulReifectCoreProperties,
    StatefulReifectProperties,
    StateInterpolator
} from "./statefulReifect.types";
import {isNull, isUndefined} from "../../../utils/dataManipulation/misc";
import {effect} from "../../../decorators/reactivity/reactivity";
import {mod, trim} from "../../../utils/computations/misc";
import {auto} from "../../../decorators/auto/auto";
import {StylesType} from "../../../turboFunctions/style/style.types";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {PartialRecord} from "../../../types/basic.types";
import {TurboNodeList} from "../../datatypes/nodeList/nodeList";
import {areSimilar} from "../../../utils/computations/equity";

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
    protected static readonly fields = ["properties", "classes", "styles", "replaceWith"] as const;
    protected static readonly knownFields = new Set(["states", "attachedObjects", "initialState", ...this.fields]);

    protected static readonly chainableStyleFields = new Set(["transition", "transitionDelay",
        "transitionTimingFunction", "transitionDuration", "transform"]);

    protected readonly timeRegex: RegExp = /^(\d+(?:\.\d+)?)(ms|s)?$/i;

    protected readonly attachedObjectsData: WeakMap<ClassType, ReifectObjectData<State, ClassType>> = new WeakMap();
    protected readonly attachedObjects: TurboNodeList<ClassType> = new TurboNodeList();

    /**
     * @description All possible states.
     */
    @auto({preprocessValue: function (value) {return this.normalizeStates(value)}})
    public get states(): State[] {return}
    public set states(states: State[] | object) {}

    @auto({defaultValue: true}) public set propertiesEnabled(value: boolean) {this.refreshProperties();}

    @auto({defaultValue: true}) public set classesEnabled(value: boolean) {this.refreshClasses();}

    @auto({defaultValue: true}) public set stylesEnabled(value: boolean) {this.refreshStyles();}

    @auto({defaultValue: true}) public set replacedWithEnabled(value: boolean) {this.refreshReplaceWith();}

    @auto({defaultValue: true}) public set enabled(value: boolean) {this.refreshAll();}

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
    @auto({setIfUndefined: true, preprocessValue: function (value) {return this.normalizePropertyConfig(this.properties, value)}})
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
    @auto({setIfUndefined: true, preprocessValue: function (value) {return this.normalizePropertyConfig(this.styles, value)}})
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
    @auto({setIfUndefined: true, preprocessValue: function (value) {return this.normalizePropertyConfig(this.classes, value)}})
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
    @auto({setIfUndefined: true, preprocessValue: function (value) {return this.normalizePropertyConfig(this.replaceWith, value)}})
    public set replaceWith(value: PropertyConfig<ClassType, State, ClassType>) {}
    public get replaceWith(): PartialRecord<State, ReifectInterpolator<ClassType, ClassType>> {return}

    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatefulReifectProperties<State, ClassType>} properties - The configuration properties.
     */
    public constructor(properties: StatefulReifectProperties<State, ClassType>) {
        if (properties.states) this.states = properties.states;

        const unknownEntries: [string, any][] = [];
        Object.entries(properties).forEach(([key, value]) => {
            if (key === "attachedObjects" || key === "states" || key === "initialState") return;
            if (StatefulReifect.knownFields.has(key)) this[key] = value;
            else unknownEntries.push([key, value]);
        });

        if (unknownEntries.length > 0) this.properties = Object.fromEntries(unknownEntries) as any;
        if (properties.attachedObjects) this.attach(...properties.attachedObjects);
        if (properties.initialState !== undefined) this.apply(properties.initialState);
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

    public attach(object: ClassType): this;
    public attach(object: ClassType, index: number): this;

    /**
     * @function attach
     * @description Attaches an object to the reifier.
     * @param {ClassType} object - The object to attach.
     * @param {ReifectOnSwitchCallback<State, ClassType>} [onSwitch] - Optional
     * callback fired when the reifier is applied to the object. The callback takes as parameters:
     * - `state: State`: The state being applied to the object.
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     * @param {number} [index] - Optional index to specify the position at which to insert the object in the reifier's
     * attached list.
     * @returns {this} - The reifier itself, for method chaining.
     */
    public attach(object: ClassType, onSwitch: ReifectOnSwitchCallback<State, ClassType>, index?: number): this;
    public attach(...objects: ClassType[]): this;
    public attach(...objectsAndIndex: [...ClassType[], number]): this;
    public attach(...objectsAndOnSwitch: [...ClassType[], ReifectOnSwitchCallback<State, ClassType>]): this;
    public attach(...objectsAndOptions: [...ClassType[], ReifectOnSwitchCallback<State, ClassType>, number]): this;
    public attach(...args: any[]): this {
        const lastArg = args[args.length - 1];
        const secondLastArg = args[args.length - 2];

        const trailingIndex: number = typeof lastArg === "number" ? lastArg : undefined;
        const onSwitchArg = trailingIndex !== undefined ? secondLastArg : lastArg;
        const trailingOnSwitch: ReifectOnSwitchCallback<State, ClassType> = typeof onSwitchArg === "function" ? onSwitchArg : undefined;

        const objects = args.slice(0, args.length
            - (trailingIndex !== undefined ? 1 : 0)
            - (trailingOnSwitch !== undefined ? 1 : 0)) as ClassType[];

        objects.forEach((object, i) => {
            const index = trailingIndex !== undefined ? trailingIndex + i : undefined;
            this.attachObject(object, trailingOnSwitch, index);
        });
        return this;
    }

    public detach(object: ClassType): this;
    /**
     * @function detach
     * @description Detaches one or more objects from the reifier.
     * @param {...ClassType[]} objects - The objects to detach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    public detach(...objects: ClassType[]): this;
    public detach(...objects: ClassType[]): this {
        objects.forEach(object => this.detachObject(object));
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
     * @param {ReifectOnSwitchCallback<State, ClassType>} [onSwitch] - Optional
     * callback fired when the reifier is applied to the object. The callback takes as parameters:
     * - `state: State`: The state being applied to the object.
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     * @returns {ReifectObjectData<State, ClassType>} - The created data entry.
     */
    protected attachObject(object: ClassType, onSwitch?: ReifectOnSwitchCallback<State, ClassType>,
                           index?: number): ReifectObjectData<State, ClassType> {
        let data = this.getData(object);
        if (data) {
            if (onSwitch) data.onSwitch = onSwitch;
            if (index !== undefined) {
                data.index = index;
                this.attachedObjects.move(object, index);
            }
            return data;
        }

        index = trim(index, this.attachedObjects.size, 0, this.attachedObjects.size);
        this.attachedObjects.addAt(index, object);

        data = this.generateNewData(object, onSwitch, index);
        this.attachedObjectsData.set(object, data);
        turbo(object).attachReifect(this);

        data.lastState = this.stateOf(object);
        this.applyAll(object);
        return data;
    }

    /**
     * @protected
     * @function detachObject
     * @description Function used to remove a data entry from the attached objects list.
     * @param object
     */
    protected detachObject(object: ClassType) {
        if (!object || !this.attachedObjects.has(object)) return;
        const data = this.getData(object);
        if (data) {
            data.disposeEffect?.();
            data.disposeEffect = undefined;
        }

        this.attachedObjectsData.delete(object);
        turbo(object).detachReifect(this);
    }

    /**
     * @function getData
     * @description Retrieve the data entry of a given object.
     * @param {ClassType} object - The object to find the data of.
     * @returns {ReifectObjectData<State, ClassType>} - The corresponding data, or `null` if was not found.
     */
    public getData(object: ClassType): ReifectObjectData<State, ClassType> {
        if (!object) return;
        return this.attachedObjectsData.get(object);
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

        if (!data.resolvedValues) this.processRawProperties(object);
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
            if (this.states.includes(str as State)) return str as State;
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

        this.getEnabledObjects(objects, options).forEach(object => {
            const data = this.getData(object);
            if (!data) return;
            if (options.recomputeProperties || !data.resolvedValues) this.processRawProperties(object, options.propertiesOverride);
            data.lastState = state;
            this.applyAll(object, options?.applyStylesInstantly);
            if (data.onSwitch) data.onSwitch(state, data.index, data.total, this.getObject(data));
        });
    }

    public apply(state: State | boolean, objects?: ClassType | ClassType[],
                 options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled) return;

        state = this.parseState(state);
        options = this.initializeOptions(options, objects);

        this.getEnabledObjects(objects, options).forEach(object => {
            const data = this.getData(object);
            if (!data) return;
            if (options.recomputeProperties || !data.resolvedValues) this.processRawProperties(object, options.propertiesOverride);
            data.lastState = state;
            this.applyAll(object, options?.applyStylesInstantly);
            if (data.onSwitch) data.onSwitch(state, data.index, data.total, this.getObject(data));
        });
    }

    public toggle(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled) return;

        if (!objects) objects = [];
        else if (objects instanceof HTMLCollection) objects = [...objects] as ClassType[];
        else if (!Array.isArray(objects)) objects = [objects];

        const referenceObject = objects[0] ?? this.attachedObjects.array[0];
        const previousState = this.getData(referenceObject)?.lastState;
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
        if (!this.enabled) return this;
        const data = this.getData(object);
        if (!data || !data.enabled || !data.enabled.global) return this;
        this.applyAll(object);
        return this;
    }

    public getEnabledObjects(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): ClassType[] {
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
            this.attachedObjects.forEach(entry => (objects as ClassType[]).push(entry));
        }

        const enabledObjectsData: ReifectObjectData<State, ClassType>[] = [];
        objects.forEach((object) => {
            const data = this.getData(object) || this.generateNewData(object);
            if (!this.filterEnabledObjects(data)) return;
            if (options.recomputeIndices || data.index == undefined) data.index = enabledObjectsData.length;
            enabledObjectsData.push(data);
        });

        enabledObjectsData.forEach(data => {
            if (options.recomputeIndices || data.total == undefined) data.total = enabledObjectsData.length;
        });

        return objects;
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

    public applyAll(object: ClassType, applyStylesInstantly: boolean = false) {
        this.applyReplaceWith(object);
        this.applyStyles(object, undefined, applyStylesInstantly);
        this.applyProperties(object);
        this.applyClasses(object);
    }

    public refreshAll() {
        this.refreshReplaceWith();
        this.refreshProperties();
        this.refreshStyles();
        this.refreshClasses();
    }

    public applyProperties(object: ClassType, state?: State) {
        this.applyField(object, "properties", (object, data, state) => {
            const properties = data.resolvedValues?.properties?.[state];
            if (!properties) return;
            for (const [field, value] of Object.entries(properties)) {
                if (!field || value === undefined) continue;
                try {
                    if (areSimilar(object[field], value)) continue;
                    object[field] = value;
                } catch (e: any) {
                    console.error(`Unable to set property ${field} to ${value}: ${e.message}`);
                }
            }
        }, state);
    }

    public refreshProperties() {
        if (!this.enabled|| !this.propertiesEnabled) return;
        this.attachedObjects.forEach(object => this.applyProperties(object));
    }

    public applyReplaceWith(object: ClassType, state?: State) {
        this.applyField(object, "replaceWith", (object, data, state) => {
            const newObject = data.resolvedValues?.replaceWith?.[state];
            if (!newObject) return;
            try {
                if (object instanceof Node && newObject instanceof Node) object.parentNode?.replaceChild(newObject, object);
                data.object = new WeakRef(newObject);
            } catch (e: any) {
                console.error(`Unable to replace object: ${e.message}`);
            }
        }, state);
    }

    public refreshReplaceWith() {
        if (!this.enabled || !this.replacedWithEnabled) return;
        this.attachedObjects.forEach(object => this.applyReplaceWith(object));
    }

    public applyClasses(object: ClassType, state?: State) {
        this.applyField(object, "classes", (object, data, state) => {
            if (!(object instanceof Element) || !data.resolvedValues?.classes) return;
            for (const [key, value] of Object.entries(data.resolvedValues.classes) as [string, string][]) {
                turbo(object).toggleClass(value, state === key);
            }
        }, state);
    }

    public refreshClasses() {
        if (!this.enabled || !this.classesEnabled) return;
        this.attachedObjects.forEach(object => this.applyClasses(object));
    }

    public applyStyles(object: ClassType, state?: State, applyStylesInstantly: boolean = false) {
        this.applyField(object, "styles", (object, data, state) => {
            if (!(object instanceof Element) || !data.resolvedValues?.styles) return;
            const styles = data.resolvedValues.styles[state];
            if (!styles) return;

            const normal: StylesType = {};
            let hasChainable = false;
            for (const [key, value] of Object.entries(styles)) {
                if (StatefulReifect.chainableStyleFields.has(key)) hasChainable = true;
                else normal[key] = value;
            }

            if (Object.keys(normal).length > 0) turbo(object).setStyles(normal, applyStylesInstantly);
            if (hasChainable) turbo(object).reloadReifectsChainableStyles();
        }, state);
    }

    public refreshStyles() {
        if (!this.enabled || !this.stylesEnabled) return;
        this.attachedObjects.forEach(object => this.applyStyles(object));
    }

    public getChainableStyles(object: ClassType): Partial<Record<string, string>> {
        const data = this.getData(object);
        if (!data?.resolvedValues?.styles || !data.lastState) return {};
        const styles = data.resolvedValues.styles[data.lastState];
        if (!styles) return {};

        const result: Partial<Record<string, string>> = {};
        for (const [key, value] of Object.entries(styles)) {
            if (StatefulReifect.chainableStyleFields.has(key) && value != null)
                result[key] = value.toString().trim();
        }
        return result;
    }

    protected applyField(
        object: ClassType,
        field: string,
        callback: (object: ClassType, data: ReifectObjectData<State, ClassType>, state: State) => void,
        state?: State
    ) {
        if (!object || !field) return;
        if (!this.enabled || !this[field + "Enabled"]) return;

        const data = this.getData(object);
        if (!data.enabled || !data.enabled.global || !data.enabled[field as any]) return;

        if (!state) state = data.lastState;
        if (!data.resolvedValues) return;
        callback(object, data, state);
    }

    protected parseStylesValue(styles: StylesType): PartialRecord<string, string> {
        if (!styles || typeof styles === "number") return {};
        if (typeof styles === "object") return styles as PartialRecord<string, string>;

        const result: PartialRecord<string, string> = {};
        styles.split(";").forEach(entry => {
            const colonIndex = entry.indexOf(":");
            if (colonIndex === -1) return;
            const property = entry.slice(0, colonIndex).trim();
            const value = entry.slice(colonIndex + 1).trim();
            if (property && value) result[property] = value;
        });
        return result;
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

    protected processRawProperties(object: ClassType, override?: StatefulReifectCoreProperties<State, ClassType>) {
        if (!object) return;
        const data = this.getData(object);
        data.disposeEffect?.();
        let firstRun = true;

        data.disposeEffect = effect(() => {
            if (!data.resolvedValues) data.resolvedValues = {} as any;
            if (isNull(override)) return;

            const index = data.index ?? 0;
            const total = data.total ?? 1;

            for (const field of StatefulReifect.fields) {
                const rawValue = this.normalizePropertyConfig(this[field], override?.[field]);
                if (!data.resolvedValues[field]) data.resolvedValues[field] = {};
                for (const state of this.states) {
                    const resolved = rawValue[state]?.(index, total, object);
                    data.resolvedValues[field][state] = field === "styles"
                        ? this.parseStylesValue(resolved)
                        : resolved;
                }
            }

            if (!firstRun && data.lastState !== undefined) this.applyAll(object, false);
            firstRun = false;
        });
    }

    private generateNewData(object: ClassType, onSwitch?:
    ReifectOnSwitchCallback<State, ClassType>, index?: number): ReifectObjectData<State, ClassType> {
        return {
            object: new WeakRef(object),
            enabled: {global: true, properties: true, classes: true, styles: true, replaceWith: true},
            lastState: this.stateOf(object),
            onSwitch: onSwitch,
            index: index,
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
        });
    }

    protected normalizeStates(states: State[] | object): State[] {
        if (Array.isArray(states)) return states;
        const values = Object.values(states);
        const isNumericEnum = values.some(v => typeof v === "number");
        return (isNumericEnum ? values.filter(v => typeof v === "number") : values) as State[];
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
            const entries = Object.entries(newConfig as object);
            const hasPerPropertyInterpolators = entries.some(([, v]) => typeof v === "function");
            if (hasPerPropertyInterpolators) {
                this.states.forEach(state => {
                    out[state] = (index, total, object) => {
                        const result: any = {};
                        for (const [key, val] of entries)
                            result[key] = typeof val === "function"
                                ? (val as ReifectInterpolator<any, ClassType>)(index, total, object)
                                : val;
                        return result as Type;
                    };
                });
            } else {
                const value = () => newConfig as Type;
                this.states.forEach(state => out[state] = value);
            }
        }
        return out;
    }
}

export {StatefulReifect};
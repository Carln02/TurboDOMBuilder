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

class StatefulReifect<State extends string | number | symbol = any, ClassType extends object = object> {
    protected static readonly fields = [
        "properties", "classes", "styles", "replaceWith",
        "transitionProperties", "transitionDuration", "transitionTimingFunction", "transitionDelay"
    ] as const;

    protected static readonly knownFields = new Set([
        "states", "attachedObjects", "initialState", "transition", ...this.fields
    ]);

    protected readonly timeRegex: RegExp = /^(\d+(?:\.\d+)?)(ms|s)?$/i;

    protected readonly attachedObjectsData: WeakMap<ClassType, ReifectObjectData<State, ClassType>> = new WeakMap();
    protected readonly attachedObjects: TurboNodeList<ClassType> = new TurboNodeList();

    @auto({
        defaultValueCallback: function () {
            const set = new Set<State>();
            for (const field of StatefulReifect.fields) {
                const value = this[field];
                if (!value || typeof value !== "object") continue;
                for (const state of Object.keys(value)) set.add(state as State);
            }
            return Array.from(set);
        },
        preprocessValue: function (value) { return this.normalizeStates(value); }
    })
    public get states(): State[] { return; }
    public set states(states: State[] | object) {}

    @auto({
        defaultValueCallback: () => ({
            global: true, properties: true, classes: true, styles: true, replaceWith: true, transition: true
        }),
        preprocessValue: function (value) {
            return typeof value === "boolean" ? {...this.enabled, global: value} : value;
        }
    })
    public get enabled(): ReifectEnabledObject { return; }
    public set enabled(value: boolean | ReifectEnabledObject) {
        const object = value as ReifectEnabledObject;
        if (!isUndefined(object.global)) { this.refreshResolvedValues(); return; }
        if (!isUndefined(object.properties)) this.refreshProperties();
        if (!isUndefined(object.styles)) this.refreshStyles();
        if (!isUndefined(object.classes)) this.refreshClasses();
        if (!isUndefined(object.replaceWith)) this.refreshReplaceWith();
        if (!isUndefined(object.transition)) this.refreshTransition();
    }

    @auto({setIfUndefined: true, preprocessValue: function (value) { return this.normalizePropertyConfig(this.properties, value); }})
    public set properties(value: PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType>) {}
    public get properties(): PartialRecord<State, ReifectInterpolator<PartialRecord<keyof ClassType, any>, ClassType>> { return; }

    @auto({setIfUndefined: true, preprocessValue: function (value) { return this.normalizePropertyConfig(this.styles, value); }})
    public set styles(value: PropertyConfig<StylesType, State, ClassType>) {}
    public get styles(): PartialRecord<State, ReifectInterpolator<StylesType, ClassType>> { return; }

    @auto({setIfUndefined: true, preprocessValue: function (value) { return this.normalizePropertyConfig(this.classes, value); }})
    public set classes(value: PropertyConfig<string | string[], State, ClassType>) {}
    public get classes(): PartialRecord<State, ReifectInterpolator<string | string[], ClassType>> { return; }

    @auto({setIfUndefined: true, preprocessValue: function (value) { return this.normalizePropertyConfig(this.replaceWith, value); }})
    public set replaceWith(value: PropertyConfig<ClassType, State, ClassType>) {}
    public get replaceWith(): PartialRecord<State, ReifectInterpolator<ClassType, ClassType>> { return; }

    @auto({setIfUndefined: true, preprocessValue: function (value) { return this.normalizePropertyConfig(this.transitionProperties, value); }})
    public set transitionProperties(value: PropertyConfig<string | string[], State, ClassType>) {}
    public get transitionProperties(): PartialRecord<State, ReifectInterpolator<string | string[], ClassType>> { return; }

    @auto({setIfUndefined: true, preprocessValue: function (value) { return this.normalizePropertyConfig(this.transitionDuration, value); }})
    public set transitionDuration(value: PropertyConfig<number, State, ClassType>) {}
    public get transitionDuration(): PartialRecord<State, ReifectInterpolator<number, ClassType>> { return; }

    @auto({setIfUndefined: true, preprocessValue: function (value) { return this.normalizePropertyConfig(this.transitionTimingFunction, value); }})
    public set transitionTimingFunction(value: PropertyConfig<string, State, ClassType>) {}
    public get transitionTimingFunction(): PartialRecord<State, ReifectInterpolator<string, ClassType>> { return; }

    @auto({setIfUndefined: true, preprocessValue: function (value) { return this.normalizePropertyConfig(this.transitionDelay, value); }})
    public set transitionDelay(value: PropertyConfig<number, State, ClassType>) {}
    public get transitionDelay(): PartialRecord<State, ReifectInterpolator<number, ClassType>> { return; }

    public constructor(properties: StatefulReifectProperties<State, ClassType>) {
        if (properties.states) this.states = properties.states;

        const unknownEntries: [string, any][] = [];
        Object.entries(properties).forEach(([key, value]) => {
            if (key === "attachedObjects" || key === "states" || key === "initialState") return;
            if (StatefulReifect.knownFields.has(key)) this[key] = value;
            else unknownEntries.push([key, value]);
        });

        if (unknownEntries.length > 0) this.properties = Object.fromEntries(unknownEntries) as any;
        if (properties.attachedObjects) this.attachAll(...properties.attachedObjects);
        if (properties.initialState !== undefined) this.apply(properties.initialState);
    }

    // region Attached objects

    public attach(object: ClassType, onSwitch?: ReifectOnSwitchCallback<State, ClassType>, index?: number): this {
        const data = this.getData(object);
        if (data && onSwitch) data.onSwitch = onSwitch;
        if (!data) this.attachObject(object, onSwitch, index);
        return this;
    }

    public attachAll(...objects: ClassType[]): this {
        objects.forEach(object => { if (!this.getData(object)) this.attachObject(object); });
        return this;
    }

    public attachAllAt(index: number, ...objects: ClassType[]): this {
        objects.forEach((object, count) => {
            if (!this.getData(object)) this.attachObject(object, undefined, index + count);
        });
        return this;
    }

    public detach(...objects: ClassType[]): this {
        objects.forEach(object => {
            const data = this.getData(object);
            if (data) this.detachObject(data);
        });
        return this;
    }

    protected attachObject(object: ClassType, onSwitch?: ReifectOnSwitchCallback<State, ClassType>,
                           index?: number): ReifectObjectData<State, ClassType> {
        index = trim(index, this.attachedObjects.slotCount, 0, this.attachedObjects.slotCount);  // fix #2
        this.attachedObjects.addAt(index, object);

        const data = this.generateNewData(object, onSwitch, index);
        this.attachedObjectsData.set(object, data);
        turbo(object).attachReifect(this);

        data.lastState = this.stateOf(object);
        this.applyResolvedValues(object, false, true);
        return data;
    }

    protected detachObject(data: ReifectObjectData<State, ClassType>) {
        const object = data.object.deref();
        if (!object || !this.attachedObjects.has(object)) return;
        data.disposeEffect?.();
        data.disposeEffect = undefined;
        this.attachedObjects.remove(object);  // fix #1
        this.attachedObjectsData.delete(object);
        turbo(object).detachReifect(this);
    }

    public getData(object: ClassType): ReifectObjectData<State, ClassType> {
        if (!object) return;
        return this.attachedObjectsData.get(object);
    }

    public getObject(data: ReifectObjectData<State, ClassType>): ClassType {
        if (!data) return;
        return data.object.deref();
    }

    // endregion

    // region States

    public stateOf(object: ClassType): State {
        if (!object) return;
        const data = this.getData(object);
        if (!data) return;
        if (data.lastState) return data.lastState;
        if (!(object instanceof HTMLElement)) return this.states[0];

        if (!data.resolvedValues) this.processRawProperties(object);
        for (const state of this.states) {
            if (!data.resolvedValues?.styles?.[state]) continue;
            let matches = true;
            for (const [property, value] of Object.entries(data.resolvedValues.styles[state])) {
                if (object.style[property] != value) { matches = false; break; }
            }
            if (!matches) continue;
            data.lastState = state;
            return state;
        }
        return this.states[0];
    }

    protected parseState(value: State | boolean): State {
        if (typeof value != "boolean") return this.states.includes(value) ? value : this.states[0];
        for (const str of value
            ? ["true", "on", "in", "enabled", "shown"]
            : ["false", "off", "out", "disabled", "hidden"]) {
            if (this.states.includes(str as State)) return str as State;
        }
        return this.states[0];
    }

    // endregion

    // region Enabled

    public enable(value: boolean | ReifectEnabledObject, object?: ClassType) {
        const data = this.getData(object);
        if (!data) return this.enabled = value;
        if (typeof value === "boolean") data.enabled.global = value;
        else if (typeof value === "object") Object.entries(value).forEach(([key, val]) => data.enabled[key] = val);
    }

    public getObjectEnabledState(object: ClassType): ReifectEnabledObject {
        return this.getData(object)?.enabled;
    }

    // endregion

    // region Transition parsing

    public set transition(value: PropertyConfig<string, State, ClassType>) {
        if (!value) return;
        const normalized = this.normalizePropertyConfig(null, value);
        const fields = ["transitionProperties", "transitionDuration", "transitionTimingFunction", "transitionDelay"] as const;
        const result: StatefulReifectCoreProperties<State, ClassType> = {};

        for (const state of this.states) {
            const interpolator = normalized[state];
            if (!interpolator) continue;
            for (const field of fields) {
                if (!result[field]) result[field] = {};
                (result[field] as any)[state] = (index: number, total: number, object: ClassType) =>
                    this.processTransitionString(interpolator(index, total, object))[field];
            }
        }
        for (const field of fields) if (result[field]) (this as any)[field] = result[field];
    }

    protected processTransitionString(transitionString: string): StatefulReifectCoreProperties<State, ClassType> {
        const tokens = transitionString.trim().replace(/,/g, " ").split(/\s+/).filter(t => t.length > 0);
        const result: StatefulReifectCoreProperties<State, ClassType> = {transitionProperties: []};
        let i = 0;

        while (i < tokens.length && !this.timeRegex.test(tokens[i]))
            (result.transitionProperties as string[]).push(tokens[i++]);
        if (i < tokens.length) { const d = this.parseTime(tokens[i]); if (!isNaN(d)) result.transitionDuration = d; i++; }
        if (i < tokens.length) { result.transitionTimingFunction = tokens[i]; i++; }
        if (i < tokens.length) { const d = this.parseTime(tokens[i]); if (!isNaN(d)) result.transitionDelay = d; i++; }
        return result;
    }

    private getTransitionString(data: ReifectObjectData<State, ClassType>, state: State = data.lastState): string {
        if (!data.resolvedValues) return "";
        const properties = this.cleanTransitionProperties(data.resolvedValues.transitionProperties[state]);
        const duration = data.resolvedValues.transitionDuration[state] ?? 0;
        const timing = data.resolvedValues.transitionTimingFunction[state] ?? "linear";
        const delay = data.resolvedValues.transitionDelay[state] ?? 0;
        return properties.map(property => `${property} ${duration}s ${timing} ${delay}s`).join(", ");
    }

    // endregion

    // region Usage methods

    public initialize(state: State | boolean, objects?: ClassType | ClassType[],
                      options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled) return;
        state = this.parseState(state);
        options = this.initializeOptions(options, objects);

        this.getEnabledObjectsData(objects, options).forEach(data => {
            const object = data.object.deref();
            if (!object) return;
            if (options.recomputeProperties || !data.resolvedValues) this.processRawProperties(object, options.propertiesOverride);  // fix #5
            data.lastState = state;
            this.applyResolvedValues(object, true, options?.applyStylesInstantly);  // fix #7
            if (data.onSwitch) data.onSwitch(state, data.index, data.total, object);
        });
    }

    public apply(state: State | boolean, objects?: ClassType | ClassType[],
                 options?: ReifectAppliedOptions<State, ClassType>) {
        if (!this.enabled) return;
        state = this.parseState(state);
        options = this.initializeOptions(options, objects);

        this.getEnabledObjectsData(objects, options).forEach(data => {
            const object = data.object.deref();
            if (!object) return;
            if (options.recomputeProperties || !data.resolvedValues) this.processRawProperties(object, options.propertiesOverride);  // fix #5
            data.lastState = state;
            this.applyResolvedValues(object, false, options?.applyStylesInstantly);  // fix #7
            if (data.onSwitch) data.onSwitch(state, data.index, data.total, object);
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

    public reloadFor(object: ClassType): this {
        if (!this.enabled.global) return this;
        const data = this.getData(object);
        if (!data || !data.enabled || !data.enabled.global) return this;
        this.applyResolvedValues(object);
        return this;
    }

    public reloadTransitionFor(object: ClassType): this {
        if (!this.enabled.global || !this.enabled.transition) return this;  // fix #3
        const data = this.getData(object);
        if (!data || !data.enabled.global || !data.enabled.transition) return this;
        this.applyTransition(object);
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
            for (const object of this.attachedObjects) (objects as ClassType[]).push(object);  // fix #9
        }

        const enabledObjectsData: ReifectObjectData<State, ClassType>[] = [];
        objects.forEach(object => {
            const data = this.getData(object) || this.generateNewData(object);
            if (!this.filterEnabledObjects(data)) return;
            if (options.recomputeIndices || data.index == undefined) data.index = enabledObjectsData.length;
            enabledObjectsData.push(data);
        });
        enabledObjectsData.forEach(data => {
            if (options.recomputeIndices || data.total == undefined) data.total = enabledObjectsData.length;
        });

        return enabledObjectsData;
    }

    // endregion

    // region Apply methods

    public applyResolvedValues(object: ClassType, skipTransition: boolean = false, applyStylesInstantly: boolean = false) {
        this.applyStyles(object, undefined, applyStylesInstantly);
        if (!skipTransition) {
            if (this.attachedObjects.has(object)) turbo(object).reloadTransitions();
            else this.applyTransition(object);
        }
        this.applyReplaceWith(object);
        this.applyProperties(object);
        this.applyClasses(object);
    }

    public refreshResolvedValues() {
        this.refreshProperties();
        this.refreshStyles();
        this.refreshClasses();
        this.refreshReplaceWith();
        this.refreshTransition();
    }

    public applyProperties(object: ClassType, state?: State) {
        if (!object) return;
        const data = this.getData(object);
        if (!data) return;  // fix #6
        if (!this.enabled?.properties || !data.enabled?.global || !data.enabled?.properties) return;
        if (!state) state = data.lastState;
        const properties = data.resolvedValues?.properties?.[state];
        if (!properties) return;

        for (const [field, value] of Object.entries(properties)) {
            if (!field || value === undefined) continue;
            try {
                if (this.valuesEqual((object as any)[field], value)) continue;
                object[field] = value;
            } catch (e: any) {
                console.error(`Unable to set property ${field} to ${value}: ${e.message}`);
            }
        }
    }

    protected valuesEqual(a: any, b: any): boolean {
        if (Object.is(a, b)) return true;
        if (a != null && typeof (a as any).equals === "function") return (a as any).equals(b);
        if (a != null && b != null && typeof a === "object" && typeof b === "object") {
            try { return JSON.stringify(a) === JSON.stringify(b); } catch { return false; }
        }
        return false;
    }

    public refreshProperties() {
        if (!this.enabled?.global || !this.enabled?.properties) return;
        for (const object of this.attachedObjects) this.applyProperties(object);  // fix #9
    }

    public applyReplaceWith(object: ClassType, state?: State) {
        this.setupAndApply(object, "replaceWith", (object, data, state) => {
            const newObject = data.resolvedValues?.replaceWith?.[state];
            if (!newObject) return;
            try {
                if (object instanceof Node && newObject instanceof Node)
                    object.parentNode?.replaceChild(newObject, object);
                data.object = new WeakRef(newObject);
            } catch (e: any) {
                console.error(`Unable to replace object: ${e.message}`);
            }
        }, state);
    }

    public refreshReplaceWith() {
        if (!this.enabled?.replaceWith) return;
        for (const object of this.attachedObjects) this.applyReplaceWith(object);  // fix #9
    }

    public applyClasses(object: ClassType, state?: State) {
        this.setupAndApply(object, "classes", (object, data, state) => {
            if (!(object instanceof Element) || !data.resolvedValues?.classes) return;
            for (const [key, value] of Object.entries(data.resolvedValues.classes) as [string, string][])
                turbo(object).toggleClass(value, state === key);
        }, state);
    }

    public refreshClasses() {
        if (!this.enabled?.classes) return;
        for (const object of this.attachedObjects) this.applyClasses(object);  // fix #9
    }

    public applyStyles(object: ClassType, state?: State, applyStylesInstantly: boolean = false) {
        this.setupAndApply(object, "styles", (object, data, state) => {
            if (!(object instanceof Element) || !data.resolvedValues?.styles) return;
            turbo(object).setStyles(data.resolvedValues.styles[state], applyStylesInstantly);
        }, state);
    }

    public refreshStyles() {
        if (!this.enabled?.styles) return;
        for (const object of this.attachedObjects) this.applyStyles(object);  // fix #9
    }

    public applyTransition(object: ClassType, state?: State) {
        this.setupAndApply(object, "transition", (object, data, state) => {
            if (!(object instanceof Element)) return;
            turbo(object).appendStyle("transition", this.getTransitionString(data, state), ", ", true);
        }, state);
    }

    public refreshTransition() {
        for (const object of this.attachedObjects) turbo(object).reloadTransitions();  // fix #9
    }

    protected setupAndApply(  // fix #4
        object: ClassType,
        field: string,
        callback: (object: ClassType, data: ReifectObjectData<State, ClassType>, state: State) => void,
        state?: State
    ) {
        if (!object) return;
        if (!this.enabled?.global || !this.enabled?.[field as any]) return;
        const data = this.getData(object);
        if (!data?.enabled?.global || !data?.enabled?.[field as any]) return;
        if (!state) state = data.lastState;
        if (!data.resolvedValues) return;
        callback(object, data, state);
    }

    // endregion

    protected filterEnabledObjects(data: ReifectObjectData<State, ClassType>): boolean {
        if (!data.enabled || !data.enabled.global) {
            console.warn("The reified properties instance you are trying to set on an object is disabled for this particular object.");
            return false;
        }
        return true;
    }

    protected processRawProperties(object: ClassType, override?: StatefulReifectCoreProperties<State, ClassType>) {
        if (!object) return;
        const data = this.getData(object);
        if (!data) return;
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
                for (const state of this.states)
                    data.resolvedValues[field][state] = rawValue[state]?.(index, total, object);
            }

            if (!firstRun && data.lastState !== undefined) this.applyResolvedValues(object, false, false);
            firstRun = false;
        });
    }

    private generateNewData(object: ClassType, onSwitch?: ReifectOnSwitchCallback<State, ClassType>,
                            index?: number): ReifectObjectData<State, ClassType> {
        return {
            object: new WeakRef(object),
            enabled: {global: true, properties: true, classes: true, styles: true, replaceWith: true, transition: true},
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
        const isStateRecord = isObject && keys.length > 0 && keys.every(key => this.states.includes(key as State));
        if (isObject && keys.length === 0) return out;

        if (typeof newConfig === "function") this.states.forEach(state => {
            out[state] = (index, total, object) =>
                (newConfig as StateInterpolator<Type, State, ClassType>)(state, index, total, object);
        });
        else if (isStateRecord) this.states.forEach(state => {
            const entry = (newConfig as PartialRecord<State, Type | ReifectInterpolator<Type, ClassType>>)[state];
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

    private parseTime(value: string): number {
        const matches = value.match(this.timeRegex);
        if (!matches) return NaN;
        const num = parseFloat(matches[1]);
        const unit = matches[2]?.toLowerCase() ?? "s";
        return unit === "ms" ? num / 1000 : num;
    }
}

export {StatefulReifect};
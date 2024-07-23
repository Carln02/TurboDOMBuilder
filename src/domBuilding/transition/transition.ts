import {
    TransitionData,
    TransitionEntry,
    TransitionInterpolation,
    TransitionMode,
    TransitionProperties,
    TransitionStyles
} from "./transition.types";
import {InOut} from "../../utils/datatypes/basicDatatypes.types";
import {PartialRecord} from "../core.types";
import {auto} from "../decorators/auto/auto";
import {isNull} from "../../utils/dataManipulation/misc";
import {eachEqualToAny} from "../../utils/computations/equity";

/**
 * @class Transition
 * @description A class representing a CSS transition. It has two states (in and out), which you can set up
 * almost independently (they must only share the animation properties). Use a Transition to transition one or more
 * HTMLElement(s) easily.
 */
class Transition {
    private readonly inTransition: TransitionEntry;
    private readonly outTransition: TransitionEntry;

    private readonly attachedElements: Set<TransitionData>;

    /**
     * @description Callback executed on the concerned elements before applying their transition/styles.
     */
    public beforeComputing: TransitionInterpolation<void>;

    /**
     * @constructor
     * @param {TransitionProperties} [properties={}] - The transition properties to apply to this newly created
     * Transition.
     */
    constructor(properties: TransitionProperties = {}) {
        this.attachedElements = new Set();
        this.enabled = true;

        for (const direction of [InOut.in, InOut.out]) {
            this[`${direction}Transition`] = {
                properties: ["all"],
                duration: 0,
                delay: 0,
                timingFunction: "linear"
            };
        }
        this.update(properties);
    }

    //Set management

    /**
     * @function attach
     * @description Attach one or more elements to the transition.
     * @param {...HTMLElement} elements - The element(s) to attach.
     * @returns {this} The transition itself.
     */
    public attach(...elements: HTMLElement[]): this {
        elements.forEach(element => {
            if (this.findData(element)) return;
            this.attachedElements.add({element: element, enabled: TransitionMode.enabled});
            element.transitions.attach(this);
        });
        return this;
    }

    /**
     * @function detach
     * @description Detach one or more elements from the transition.
     * @param {...HTMLElement} elements - The element(s) to detach.
     * @returns {this} The transition itself.
     */
    public detach(...elements: HTMLElement[]): this {
        elements.forEach(element => {
            const data = this.findData(element);
            if (!data) return;
            this.attachedElements.delete(data);
            element.transitions.detach(this);
        });
        return this;
    }

    //Transition methods

    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles. Interpolation values
     * will be computed from the provided array (or element).
     * @param {InOut} [direction=InOut.out] - The direction of the transition.
     * @param {HTMLElement | HTMLElement[] | HTMLCollection} [elements] - One or more HTMLElements to which the
     * transition will be applied. Defaults to the transition's attached elements.
     * @param {boolean} [executeForAll=false] - If set to true, the function will be applied also to all
     * the previously attached/transitioned elements, and interpolation values will be computed from the stored list
     * of attached elements (containing both previous and new elements).
     * @param {boolean} [recomputeIndices=true] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @param {TransitionStyles} [overrideStyles] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element(s).
     * @param {TransitionInterpolation<void>} [overrideBeforeComputing=this.beforeComputing] - The callback to execute
     * on all concerned elements before returning the elements' list.
     * @returns {this} Itself for method chaining.
     */
    public initialize(direction: InOut = InOut.out, elements?: HTMLElement | HTMLElement[] | HTMLCollection,
                      executeForAll: boolean = false, recomputeIndices: boolean = true, overrideStyles?: TransitionStyles,
                      overrideBeforeComputing: TransitionInterpolation<void> = this.beforeComputing): this {
        this.getEnabledEntriesData(elements, executeForAll, recomputeIndices, overrideBeforeComputing)
            .forEach((data) => {
                data.lastState = direction;
                this.resolveAndOverrideStyles(data, {[direction]: overrideStyles});
                data.element.setStyles(data.resolvedStyles[direction]);
            });
        return this;
    }

    /**
     * @function apply
     * @description Applies the transition (in or out) to the provided element(s). Interpolation values will be
     * computed from the provided array (or element).
     * @param {InOut} [direction=InOut.out] - The direction of the transition.
     * @param {HTMLElement | HTMLElement[] | HTMLCollection} [elements] - One or more HTMLElements to which the
     * transition will be applied. Defaults to the transition's attached elements.
     * @param {boolean} [executeForAll=false] - If set to true, the function will be applied also to all
     * the previously attached/transitioned elements, and interpolation values will be computed from the stored list
     * of attached elements (containing both previous and new elements).
     * @param {boolean} [recomputeIndices=true] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @param {TransitionStyles} [overrideStyles] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element(s).
     * @param {TransitionInterpolation<void>} [overrideBeforeComputing=this.beforeComputing] - The callback to execute
     * on all concerned elements before returning the elements' list.
     * @returns {this} Itself for method chaining.
     */
    public apply(direction: InOut = InOut.out, elements?: HTMLElement | HTMLElement[] | HTMLCollection,
                 executeForAll: boolean = false, recomputeIndices: boolean = true, overrideStyles?: TransitionStyles,
                 overrideBeforeComputing: TransitionInterpolation<void> = this.beforeComputing): this {
        this.getEnabledEntriesData(elements, executeForAll, recomputeIndices, overrideBeforeComputing)
            .forEach((data) => {
                data.lastState = direction;
                this.resolveAndOverrideStyles(data, {[direction]: overrideStyles});
                data.element.transitions.reload();
            });
        return this;
    }

    /**
     * @function toggle
     * @description Toggles the transition (in or out) for the provided element(s). Interpolation values will be
     * computed from the provided array (or element).
     * @param {HTMLElement | HTMLElement[] | HTMLCollection} [elements] - One or more HTMLElements to which the
     * transition will be applied. Defaults to the transition's attached elements.
     * @param {boolean} [executeForAll=false] - If set to true, the function will be applied also to all
     * the previously attached/transitioned elements, and interpolation values will be computed from the stored list
     * of attached elements (containing both previous and new elements).
     * @param {boolean} [recomputeIndices=true] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @param {PartialRecord<InOut, TransitionStyles>} [overrideStyles] - Optional styles to override the defaults.
     * Set to `Record<InOut, null>` or `null` to not set any styles on the element(s).
     * @param {TransitionInterpolation<void>} [overrideBeforeComputing=this.beforeComputing] - The callback to execute
     * on all concerned elements before returning the elements' list.
     * @returns {this} Itself for method chaining.
     */
    public toggle(elements?: HTMLElement | HTMLElement[] | HTMLCollection, executeForAll: boolean = false,
                  recomputeIndices: boolean = true, overrideStyles?: PartialRecord<InOut, TransitionStyles>,
                  overrideBeforeComputing: TransitionInterpolation<void> = this.beforeComputing): this {
        this.getEnabledEntriesData(elements, executeForAll, recomputeIndices, overrideBeforeComputing)
            .forEach((data) => {
                if (!data.lastState) data.lastState = this.stateOf(data.element) || InOut.out;
                data.lastState = data.lastState == InOut.out ? InOut.in : InOut.out;
                this.resolveAndOverrideStyles(data, overrideStyles);
                data.element.transitions.reload();
            });
        return this;
    }

    /**
     * @function getEnabledEntriesData
     * @description Resolves the provided elements into an array, attaches all those who aren't already attached,
     * skips if disabled, update indices, and executes the beforeComputing callback on the indicated list of elements.
     * @param {HTMLElement | HTMLElement[] | HTMLCollection} [elements] - One or more HTMLElements to which the
     * transition will be applied. Defaults to the transition's attached elements.
     * @param {boolean} [executeForAll=false] - If set to true, the function will be applied also to all
     * the previously attached/transitioned elements, and interpolation values will be computed from the stored list
     * of attached elements (containing both previous and new elements).
     * @param {boolean} [recomputeIndices=true] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @param {TransitionInterpolation<void>} [overrideBeforeComputing=this.beforeComputing] - The callback to execute
     * on all concerned elements before returning the elements' list.
     * @returns {this} Itself for method chaining.
     */
    public getEnabledEntriesData(
        elements?: HTMLElement | HTMLElement[] | HTMLCollection, executeForAll: boolean = false,
        recomputeIndices: boolean = true, overrideBeforeComputing: TransitionInterpolation<void> = this.beforeComputing
    ): TransitionData[] {
        if (this.enabled == TransitionMode.disabled) {
            console.warn("The transition you are trying to set on an element is disabled.");
            return [];
        }

        if (!elements) elements = [];
        else if (elements instanceof HTMLCollection) elements = Array.from(elements) as HTMLElement[];
        else if (!Array.isArray(elements)) elements = [elements];
        if (elements.length == 0) executeForAll = true;

        elements.forEach(element => this.attach(element));
        if (executeForAll) {
            elements = [] as HTMLElement[];
            this.attachedElements.forEach(entry =>
                (elements as HTMLElement[]).push(entry.element));
        }

        const enabledElementsData: TransitionData[] = [];
        elements.forEach((element) => {
            if (element.transitions.enabled == TransitionMode.disabled) {
                console.warn("The transition handler of the element you are trying to animate is disabled.");
                return;
            }

            const data = this.findData(element);

            if (data.enabled == TransitionMode.disabled) {
                console.warn("The transition you are trying to set on an element is disabled for this " +
                    "particular element.");
                return;
            }

            if (recomputeIndices || data.elementIndex == undefined) data.elementIndex = enabledElementsData.length;
            enabledElementsData.push(data);
        });

        enabledElementsData.forEach(data => {
            if (recomputeIndices || data.totalElementCount == undefined) {
                data.totalElementCount = enabledElementsData.length;
            }

            if (overrideBeforeComputing) {
                overrideBeforeComputing(data.elementIndex, data.totalElementCount, data.element);
            }
        });

        return enabledElementsData;
    }

    /**
     * @function reload
     * @description Reloads the transitions for all the attached elements, without recomputing styles.
     * @returns {this} Itself for method chaining.
     */
    public reload(): this {
        this.attachedElements.forEach(data => data.element.transitions.reload());
        return this;
    }

    /**
     * @function reloadFor
     * @description Generates the transition CSS string for the provided transition with the correct interpolation
     * information.
     * @param {HTMLElement} element - The element to apply the string to.
     * @returns {this} Itself for method chaining.
     */
    public reloadFor(element: HTMLElement): this {
        if (this.enabled == TransitionMode.disabled
            || element.transitions.enabled == TransitionMode.disabled) return this;

        const data = this.findData(element);
        if (!data || data.enabled == TransitionMode.disabled) return this;

        const direction = data.lastState;

        const setTransition = eachEqualToAny([TransitionMode.enabled, TransitionMode.transitionOnly],
                this.enabled as TransitionMode, element.transitions.enabled as TransitionMode, data.enabled)
            && (this.duration[direction] != 0 || this.delay[direction] != 0);

        const setStyles = eachEqualToAny([TransitionMode.enabled, TransitionMode.stylesOnly],
            this.enabled as TransitionMode, element.transitions.enabled as TransitionMode, data.enabled);

        if (setTransition) element.appendStyle("transition",
            this.getTransitionString(data), ", ", true);
        if (setStyles) element.setStyles(data.resolvedStyles[direction], true);
        return this;
    }

    //Getters and setters

    /**
     * @description The enabled state of the transition. Modifying it will automatically reload the transition for
     * all attached elements.
     */
    @auto({callBefore: Transition.parseMode})
    public set enabled(value: boolean | TransitionMode) {
        this.reload();
    }

    /**
     * @description The properties (or property) being transitioned.
     */
    public get properties(): string[] {
        return this.inTransition.properties;
    }

    public set properties(value: string | string[]) {
        if (!value) return;
        value = typeof value == "string" ? value.split(" ") : value;
        this.inTransition.properties = value;
        this.outTransition.properties = value;
    }

    /**
     * @description The duration of the transition.
     */
    public get duration(): Record<InOut, number | TransitionInterpolation> {
        return this.getTransitionField("duration");
    }

    public set duration(value: number | TransitionInterpolation
        | PartialRecord<InOut, number | TransitionInterpolation>) {
        this.setTransitionField(value, "duration");
    }

    /**
     * @description The timing function of the transition.
     */
    public get timingFunction(): Record<InOut, string> {
        return this.getTransitionField("timingFunction");
    }

    public set timingFunction(value: string | PartialRecord<InOut, string>) {
        this.setTransitionField(value, "timingFunction");
    }

    /**
     * @description The delay of the transition.
     */
    public get delay(): Record<InOut, number | TransitionInterpolation> {
        return this.getTransitionField("delay");
    }

    public set delay(value: number | TransitionInterpolation
        | PartialRecord<InOut, number | TransitionInterpolation>) {
        this.setTransitionField(value, "delay");
    }

    /**
     * @description The default styles applied when transitioning.
     */
    public get defaultStyles(): Record<InOut, TransitionStyles> {
        return this.getTransitionField("defaultStyles");
    }

    public set defaultStyles(value: TransitionStyles | PartialRecord<InOut, TransitionStyles>) {
        this.setTransitionField(value, "defaultStyles");
    }

    /**
     * @description The transition string for the in direction.
     */
    public get inTransitionString(): string {
        return this.getTransitionString({...this.attachedElements[0], lastState: InOut.in});
    }

    /**
     * @description The transition string for the out direction.
     */
    public get outTransitionString(): string {
        return this.getTransitionString({...this.attachedElements[0], lastState: InOut.out});
    }

    //Data manipulation utilities

    /**
     * @function update
     * @description Function to update certain (or every) parameter in the Transition.
     * @param {TransitionProperties} [properties={}] - The new transition properties.
     */
    public update(properties: TransitionProperties = {}) {
        if (!properties) return;
        if (properties.beforeComputing) this.beforeComputing = properties.beforeComputing;

        for (const [field, value] of Object.entries(properties)) {
            this[field] = value;
        }
    }

    /**
     * @function enableTransitionFor
     * @description Enable or disable the transition for a specific element.
     * @param {HTMLElement} element - The element to enable or disable the transition for.
     * @param {TransitionMode | boolean} state - The state to set (enabled, disabled, or styleOnly).
     */
    public enableTransitionFor(element: HTMLElement, state: TransitionMode | boolean) {
        const data = this.findData(element);
        state = Transition.parseMode(state);
        if (!data || data.enabled == state) return;
        data.enabled = state;
        element.transitions.reload();
    }

    /**
     * @private
     * @function getTransitionField
     * @description Gets the specified field for both in and out states.
     * @param {string} field - The field to get.
     * @returns {Record<InOut, Type>}
     */
    private getTransitionField<Type>(field: string): Record<InOut, Type> {
        return {[InOut.in]: this.inTransition[field], [InOut.out]: this.outTransition[field]};
    }

    /**
     * @private
     * @function setTransitionField
     * @description Sets the specified field for both in and out states.
     * @param {Type | PartialRecord<InOut, Type>} value - The value to set.
     * @param {string} field - The field to set.
     */
    private setTransitionField<Type>(value: Type | PartialRecord<InOut, Type>, field: string) {
        if (value == undefined) return;
        const isInOutRecord = typeof value == "object" && ("in" in value || "out" in value);

        [InOut.in, InOut.out].forEach(direction =>
            this[`${direction}Transition`][field] = isInOutRecord ? value[direction] : value);
    }

    //Information gathering utilities

    /**
     * @private
     * @function findData
     * @description Find the data entry for a given element.
     * @param {HTMLElement} element - The element to find the data of.
     * @returns {TransitionData} The corresponding transition data.
     */
    private findData(element: HTMLElement): TransitionData {
        for (const entry of this.attachedElements) {
            if (entry.element == element) return entry;
        }
        return null;
    }

    /**
     * @function stateOf
     * @description Determine the current state (In or Out) of the transition on the provided element.
     * @param {HTMLElement} element - The element to determine the state for.
     * @returns {InOut | undefined} - The current state of the transition or undefined if not determinable.
     */
    public stateOf(element: HTMLElement): InOut | undefined {
        if (!element) return undefined;
        const data = this.findData(element);

        if (!data) return undefined;
        if (data.lastState) return data.lastState;

        if (!data.resolvedStyles) this.resolveAndOverrideStyles(data);
        for (const direction of [InOut.in, InOut.out]) {
            if (!data.resolvedStyles[direction]) continue;
            let matches: boolean = true;

            for (const [property, value] of Object.entries(data.resolvedStyles[direction])) {
                if (data.element.style[property] != value) {
                    matches = false;
                    break;
                }
            }

            if (!matches) continue;
            data.lastState = direction;
            return direction;
        }

        return undefined;
    }

    //Other utilities

    /**
     * @description Clone the transition to create a new copy with the same properties but no attached elements.
     * @returns {Transition} - The new transition.
     */
    public clone(): Transition {
        return new Transition({
            properties: this.properties,
            duration: this.duration,
            timingFunction: this.timingFunction,
            delay: this.delay,
            defaultStyles: this.defaultStyles,
        });
    }

    /**
     * @function getTransitionString
     * @description Gets the CSS transition string for the specified direction.
     * @param {TransitionData} data - The target element's transition data entry.
     * @returns {string} The CSS transition string.
     */
    private getTransitionString(data: TransitionData): string {
        const transition = this[`${data.lastState}Transition`];

        const duration = typeof transition.duration == "function"
            ? transition.duration(data.elementIndex, data.totalElementCount, data.element)
            : transition.duration;

        const delay = typeof transition.delay == "function"
            ? transition.delay(data.elementIndex, data.totalElementCount, data.element)
            : transition.delay;

        let transitionString = "";
        this.properties.forEach(property => transitionString
            += `, ${property} ${duration}s ${transition.timingFunction} ${delay}s`);
        return transitionString.substring(2);
    }

    /**
     * @private
     * @description Computes interpolations and resolves accepted styles for transitions into a record of properties
     * to values. Stores the resolved styles in the element's data.
     * @param {TransitionData} data - The concerned transition data.
     * @param {TransitionStyles} overrideStyles - The styles to override.
     */
    private resolveAndOverrideStyles(data: TransitionData, overrideStyles?: PartialRecord<InOut, TransitionStyles>) {
        if (isNull(overrideStyles)) {
            data.resolvedStyles = {};
            return;
        }

        const defaultStyles = this.defaultStyles;
        overrideStyles = overrideStyles || {};

        if (!data.resolvedStyles) data.resolvedStyles = {};

        [InOut.in, InOut.out].forEach(direction => {
            if (isNull(overrideStyles[direction])) {
                data.resolvedStyles[direction] = {};
                return;
            }

            const stylesEntry = overrideStyles[direction] ?? defaultStyles[direction];
            data.resolvedStyles[direction] = {};

            switch (typeof stylesEntry) {
                case "number":
                    this.properties.forEach(property =>
                        data.resolvedStyles[direction][property] = stylesEntry);
                    return;

                case "string":
                    const splitStyles = stylesEntry.split(";")
                        .map(entry => entry.split(":")
                            .map(part => part.trim()));

                    if (splitStyles.length == 1 && splitStyles[0].length == 1) this.properties
                        .forEach(property => data.resolvedStyles[direction][property] = splitStyles[0][0]);

                    else splitStyles.forEach(([field, value]) => {
                        if (field && value) data.resolvedStyles[direction][field] = value;
                    });
                    return;

                case "object":
                    for (const [field, value] of Object.entries(stylesEntry)) {
                        if (!field || value == undefined) continue;
                        data.resolvedStyles[direction][field] = typeof value == "function"
                            ? value(data.elementIndex, data.totalElementCount) : value;
                    }
                    return;

                case "function":
                    const result = stylesEntry(data.elementIndex, data.totalElementCount, data.element);
                    if (typeof result == "string" || typeof result == "number") {
                        this.properties.forEach(property =>
                            data.resolvedStyles[direction][property] = result);
                    } else data.resolvedStyles[direction] = result;
                    return;
            }
        });
    }

    //Static utilities

    /**
     * @function parseMode
     * @description Parse the transition mode from a boolean or TransitionMode.
     * @param {boolean | TransitionMode} state - The state to parse.
     * @returns {TransitionMode} The parsed transition mode.
     */
    public static parseMode(state: boolean | TransitionMode): TransitionMode {
        if (state == true) return TransitionMode.enabled;
        else if (state == false) return TransitionMode.disabled;
        else return state;
    }
}

function transition(properties: TransitionProperties = {}): Transition {
    return new Transition(properties);
}

export {Transition, transition};
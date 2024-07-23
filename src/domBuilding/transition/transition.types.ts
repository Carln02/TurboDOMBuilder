import {PartialRecord} from "../core.types";
import {InOut} from "../../utils/datatypes/basicDatatypes.types";
import {StylesType} from "../turbofication/styleManipulation/styleManipulation.types";

/**
 * @type {TransitionInterpolation}
 * @description Represents a callback function that would return the appropriate transition value based on the index
 * and total count.
 */
type TransitionInterpolation<Type = number> = (index: number, total: number, element: HTMLElement) => Type;

/**
 * @type {TransitionStyles}
 * @description Represents all types accepted by styles options and parameters for Transitions.
 */
type TransitionStyles = StylesType | TransitionInterpolation<StylesType>
    | PartialRecord<keyof CSSStyleDeclaration, TransitionInterpolation<string | number>>;

/**
 * @enum {TransitionMode}
 * @description Enum representing a transition mode. `stylesOnly` will disable the transition and only apply the
 * corresponding style, while `transitionOnly` will disable setting styles and only apply the transition.
 */
enum TransitionMode {
    enabled = "enabled",
    disabled = "disabled",
    stylesOnly = "stylesOnly",
    transitionOnly = "transitionOnly",
}

/**
 * @type {TransitionProperties}
 * @description Object containing properties for a Transition element.
 *
 * @property {string | string[]} [properties] - The CSS properties (or property) to apply the transition on. Takes a
 * string of whitespace-separated properties, or an array of strings. Set to `"all"` or don't specify to apply to all
 * CSS properties.
 * @property {number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>} [duration] -
 * The duration of the transition in seconds. Optionally, provide separate values for "in" and "out" transitions.
 * @property {string | PartialRecord<InOut, string>} [timingFunction] - The timing function to apply to the transition.
 * Optionally, provide separate values for "in" and "out" transitions.
 * @property {number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>} [delay] -
 * The delay of the transition in seconds. Optionally, provide separate values for "in" and "out" transitions.
 * @property {TransitionStyles | PartialRecord<InOut, TransitionStyles>} [defaultStyles] - The default styles
 * applied when transitioning, per transition direction ("in" or "out").
 * @property {TransitionInterpolation<void>} [beforeComputing] - Optional callback to be executed on all concerned
 * elements before computing and setting the transitions and styles.
 */
type TransitionProperties = {
    properties?: string | string[],
    duration?: number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>,
    timingFunction?: string | Record<InOut, string>,
    delay?: number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>,
    defaultStyles?: TransitionStyles | PartialRecord<InOut, TransitionStyles>,
    beforeComputing?: TransitionInterpolation<void>
};

/**
 * @type {TransitionData}
 * @description Object representing the data associated with a transition for an element.
 *
 * @property {HTMLElement} element - The element associated with the data.
 * @property {TransitionMode} [enabled=TransitionMode.enabled] - Indicates the transition mode of the transition
 * for the element.
 * @property {InOut} [lastState] - The last applied state (in or out) of the transition.
 * @property {PartialRecord<InOut, PartialRecord<keyof CSSStyleDeclaration, string | number> | null>} [resolvedStyles] -
 * The resolved styles to be applied for the transition.
 * @property {number} [elementIndex] - The position of the element for interpolation computations.
 * @property {number} [totalElementCount] - The total count of elements for interpolation computations.
 */
type TransitionData = {
    element: HTMLElement,
    enabled?: TransitionMode,
    lastState?: InOut,
    resolvedStyles?: PartialRecord<InOut, PartialRecord<keyof CSSStyleDeclaration, string | number> | null>,
    elementIndex?: number,
    totalElementCount?: number,
};

/**
 * @type {TransitionEntry}
 * @description Object representing the properties of a transition entry.
 *
 * @property {string} property - The CSS property (or properties) to which the transition applies.
 * @property {number | TransitionInterpolation} duration - The duration of the transition in seconds.
 * @property {string} timingFunction - The timing function of the transition.
 * @property {number | TransitionInterpolation} delay - The delay of the transition in seconds.
 * @property {TransitionStyles} [defaultStyles] - The default styles applied when transitioning.
 */
type TransitionEntry = {
    properties: string[],
    duration: number | TransitionInterpolation,
    timingFunction: string,
    delay: number | TransitionInterpolation,
    defaultStyles?: TransitionStyles
};

export {
    TransitionInterpolation,
    TransitionStyles,
    TransitionProperties,
    TransitionEntry,
    TransitionData,
    TransitionMode,
};
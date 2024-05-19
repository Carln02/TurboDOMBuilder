import {TurboElement} from "../../../domBuilding/turboElement/turboElement";

/**
 * @type {TransitionProperties}
 * @description Object containing properties for a Transition element.
 *
 * @property {string} [property] - The CSS property (or properties) to apply the transition on. Set to "all" or don't
 * specify to apply to all CSS properties.
 *
 * @property {number} [duration] - The duration of the transition in seconds.
 * @property {string} [durationIn] - The duration of transitioning in, in seconds. Has priority over the "duration" property
 * (if the latter is set).
 * @property {string} [durationOut] - The duration of transitioning out, in seconds. Has priority over the "duration" property
 * (if the latter is set).
 *
 * @property {number} [delay] - The delay of the transition in seconds.
 * @property {string} [delayIn] - The delay before transitioning in, in seconds. Has priority over the "delay" property
 * (if the latter is set).
 * @property {string} [delayOut] - The delay before transitioning out, in seconds. Has priority over the "delay" property
 * (if the latter is set).
 *
 * @property {number} [timingFunction] - The timing function to apply to the transition.
 * @property {string} [timingFunctionIn] - The timing function to apply for transitioning in. Has priority over the
 * "timingFunction" property (if the latter is set).
 * @property {string} [timingFunctionOut] - The timing function to apply for transitioning out. Has priority over the
 * "timingFunction" property (if the latter is set).
 */
type TransitionProperties = {
    property?: string,

    duration?: number,
    durationIn?: number,
    durationOut?: number,

    delay?: number,
    delayIn?: number,
    delayOut?: number,

    timingFunction?: string,
    timingFunctionIn?: string,
    timingFunctionOut?: string
};

type FixedTransitionProperties = {
    property: string,
    duration: number,
    delay: number,
    timingFunction: string,
};

/**
 * @class Transition
 * @description A class representing a CSS transition. It has two states (in and out), which you can set up
 * almost independently (they must only share the animation property). Use a Transition to transition one or more
 * TurboElement(s) or HTMLElement(s) easily using your predefined transition.
 */
class Transition {
    private transitionProperties: FixedTransitionProperties[] = [];

    /**
     * @constructor
     * @param {TransitionProperties} transition - The transition properties to apply to this newly created Transition
    */
    constructor(transition: TransitionProperties) {
        if (!transition.property) transition.property = "all";

        //Create fixed transition in and out values
        for (let i = 0; i < 2; i++) {
            let k = i === 0 ? "In" : "Out";
            this.transitionProperties.push({
                property: transition.property,
                duration: transition["duration" + k] ? transition["duration" + k] : (transition.duration ? transition.duration : 0),
                delay: transition["delay" + k] ? transition["delay" + k] : (transition.delay ? transition.delay : 0),
                timingFunction: transition["timingFunction" + k] ? transition["timingFunction" + k] :
                    (transition.timingFunction ? transition.timingFunction : "linear")
            });
        }
    }

    /**
     * @function transition
     * @description A function to apply the transition (in or out) on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {boolean} out - Set to true to transition out, and false to transition in.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    public transition(element: TurboElement | HTMLElement | TurboElement[] | HTMLElement[],
                      customTransitionProperties: TransitionProperties, out: boolean = false) {
        let i = out ? 1 : 0;
        let k = out ? "Out" : "In";

        let list = (element instanceof TurboElement) ||
        (element instanceof HTMLElement) ? [element] : element;

        list.forEach(el => {
            el.style.transitionProperty = customTransitionProperties.property ? customTransitionProperties.property :
                this.transitionProperties[i].property;
            el.style.transitionDuration = (customTransitionProperties["duration" + k] ? customTransitionProperties["duration" + k] :
                (customTransitionProperties.duration ? customTransitionProperties.duration :
                    this.transitionProperties[i].duration)) + "s";
            el.style.transitionDelay = (customTransitionProperties["delay" + k] ? customTransitionProperties["delay" + k] :
                (customTransitionProperties.delay ? customTransitionProperties.delay :
                    this.transitionProperties[i].delay)) + "s";
            el.style.transitionTimingFunction = (customTransitionProperties["timingFunction" + k] ?
                customTransitionProperties["timingFunction" + k] : (customTransitionProperties.timingFunction ?
                    customTransitionProperties.timingFunction : this.transitionProperties[i].timingFunction));
        });
    }

    /**
     * @function transitionIn
     * @description A function to apply the transition in on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    public transitionIn(element: TurboElement | HTMLElement, customTransitionProperties: TransitionProperties) {
        this.transition(element, customTransitionProperties, false);
    }

    /**
     * @function transitionOut
     * @description A function to apply the transition out on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    public transitionOut(element: TurboElement | HTMLElement, customTransitionProperties: TransitionProperties) {
        this.transition(element, customTransitionProperties, true);
    }

    /**
     * @function update
     * @description Function to update certain (or every) properties of the current Transition.
     * @param {TransitionProperties} changedProperties - The updated transition properties
     */
    public update(changedProperties: TransitionProperties) {
        if (changedProperties.property) {
            this.transitionProperties[0].property = changedProperties.property;
            this.transitionProperties[1].property = changedProperties.property;
        }

        if (changedProperties.durationIn) this.transitionProperties[0].duration = changedProperties.durationIn;
        else if (changedProperties.duration) this.transitionProperties[0].duration = changedProperties.duration;

        if (changedProperties.durationOut) this.transitionProperties[1].duration = changedProperties.durationOut;
        else if (changedProperties.duration) this.transitionProperties[1].duration = changedProperties.duration;

        if (changedProperties.delayIn) this.transitionProperties[0].delay = changedProperties.delayIn;
        else if (changedProperties.delay) this.transitionProperties[0].delay = changedProperties.delay;

        if (changedProperties.delayOut) this.transitionProperties[1].delay = changedProperties.delayOut;
        else if (changedProperties.delay) this.transitionProperties[1].delay = changedProperties.delay;

        if (changedProperties.timingFunctionIn) this.transitionProperties[0].timingFunction = changedProperties.timingFunctionIn;
        else if (changedProperties.timingFunction) this.transitionProperties[0].timingFunction = changedProperties.timingFunction;

        if (changedProperties.timingFunctionOut) this.transitionProperties[1].timingFunction = changedProperties.timingFunctionOut;
        else if (changedProperties.timingFunction) this.transitionProperties[1].timingFunction = changedProperties.timingFunction;
    }
}

export {TransitionProperties, Transition};
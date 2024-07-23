import {Transition} from "./transition";
import {TransitionStyles, TransitionMode} from "./transition.types";
import {InOut} from "../../utils/datatypes/basicDatatypes.types";
import {PartialRecord} from "../core.types";
import {auto} from "../decorators/auto/auto";

/**
 * @class TransitionHandler
 * @description A class to handle transitions for an attached element.
 */
class TransitionHandler {
    private readonly attachedElement: HTMLElement;
    private readonly transitions: Set<Transition>;

    /**
     * @constructor
     * @param {HTMLElement} attachedElement - The element to attach transitions to.
     */
    constructor(attachedElement: HTMLElement) {
        this.attachedElement = attachedElement;
        this.transitions = new Set<Transition>();
        this.enabled = true;
    }

    //Set management

    /**
     * @function attach
     * @description Attach one or more transitions to the element.
     * @param {Transition} transitions - The transition(s) to attach.
     * @returns {this} The element's TransitionHandler instance.
     */
    public attach(...transitions: Transition[]): this {
        transitions.forEach(transition => {
            if (this.transitions.has(transition)) return;
            this.transitions.add(transition);
            transition.attach(this.attachedElement);
        });
        return this;
    }

    /**
     * @function detach
     * @description Detach one or more transitions from the element.
     * @param {Transition} transitions - The transition(s) to detach.
     * @returns {this} The element's TransitionHandler instance.
     */
    public detach(...transitions: Transition[]): this {
        transitions.forEach(transition => {
            if (!this.transitions.has(transition)) return;
            this.transitions.delete(transition);
            transition.detach(this.attachedElement);
        });
        return this;
    }

    //Transition methods

    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles.
     * @param {Transition} transition - The transition to initialize.
     * @param {InOut} direction - The direction of the transition.
     * @param {TransitionStyles | null} [overrideStyles] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element.
     * @param {boolean} [recomputeIndices=false] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @returns {this} The element's TransitionHandler instance.
     */
    public initialize(transition: Transition, direction: InOut, overrideStyles?: TransitionStyles | null,
                      recomputeIndices: boolean = false): this {
        transition.initialize(direction, this.attachedElement, false, recomputeIndices, overrideStyles);
        return this;
    }

    /**
     * @function apply
     * @description Apply a transition to the element.
     * @param {Transition} transition - The transition to apply.
     * @param {InOut} direction - The direction of the transition.
     * @param {TransitionStyles | null} [overrideStyles] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element.
     * @param {boolean} [recomputeIndices=false] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @returns {this} The element's TransitionHandler instance.
     */
    public apply(transition: Transition, direction: InOut, overrideStyles?: TransitionStyles | null,
                 recomputeIndices: boolean = false): this {
        transition.apply(direction, this.attachedElement, false, recomputeIndices, overrideStyles);
        return this;
    }

    /**
     * @function toggle
     * @description Toggle the provided transition on the element.
     * @param {Transition} transition - The transition to apply.
     * @param {PartialRecord<InOut, TransitionStyles | null>} [overrideStyles] - Optional styles to override the
     * defaults. Set to a `Record<InOut, null>` or `null` to not set any styles on the element.
     * @param {boolean} [recomputeIndices=false] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @returns {this} The element's TransitionHandler instance.
     */
    public toggle(transition: Transition, overrideStyles?: PartialRecord<InOut, TransitionStyles | null> | null,
                  recomputeIndices: boolean = false): this {
        transition.toggle(this.attachedElement, false, recomputeIndices, overrideStyles);
        return this;
    }

    /**
     * @private
     * @function clear
     * @description Clears the set transition styles on the element.
     */
    public clear() {
        this.attachedElement.style.transition = "";
    }

    /**
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    public reload() {
        this.clear();
        this.transitions.forEach(transition => transition.reloadFor(this.attachedElement));
    }

    //State management

    /**
     * @description Dictates whether the transitions on the element are enabled. Will automatically remove/reload
     * the transitions when set.
     * @param value
     */
    @auto({callBefore: (value) => Transition.parseMode(value)})
    public set enabled(value: boolean | TransitionMode) {
        if (value) this.reload();
        else this.clear();
    }

    /**
     * @description Enable or disable a certain transition for this element only. Will automatically remove/add back
     * the transition when set.
     * @param transition
     * @param state
     */
    public enableTransition(transition: Transition, state: boolean | TransitionMode) {
        transition.enableTransitionFor(this.attachedElement, state);
    }
}

export {TransitionHandler};
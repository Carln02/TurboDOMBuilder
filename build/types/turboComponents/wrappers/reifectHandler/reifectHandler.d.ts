import { StatefulReifect } from "../statefulReifect/statefulReifect";
import { ReifectAppliedOptions, ReifectEnabledState } from "../statefulReifect/statefulReifect.types";
/**
 * @class ReifectHandler
 * @description A class to handle reifects for an attached element.
 * @template {object = Node} ClassType
 */
declare class ReifectHandler<ClassType extends object = Node> {
    private readonly attachedNode;
    private readonly reifects;
    private readonly _enabled;
    /**
     * @constructor
     * @param {Node} attachedNode - The element to attach transitions to.
     */
    constructor(attachedNode: ClassType);
    /**
     * @function attach
     * @description Attach one or more transitions to the element.
     * @param {StatefulReifect<any, ClassType>[]} reifects - The transition(s) to attach.
     * @returns {this} The element's TransitionHandler instance.
     */
    attach(...reifects: StatefulReifect<any, ClassType>[]): this;
    /**
     * @function detach
     * @description Detach one or more transitions from the element.
     * @param {StatefulReifect<any, ClassType>[]} reifects - The transition(s) to detach.
     * @returns {this} The element's TransitionHandler instance.
     */
    detach(...reifects: StatefulReifect<any, ClassType>[]): this;
    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles.
     * @param {StatefulReifect<State, ClassType>} reifect - The transition to initialize.
     * @param {InOut} direction - The direction of the transition.
     * @param {ReifectAppliedOptions<State, ClassType>} [options] - Optional styles to override the defaults. Set to
     * `null` to not set any styles on the element.
     * @returns {this} The element's TransitionHandler instance.
     * @template {string | symbol | number} State
     * @template {object} ClassType
     */
    initialize<State extends string | symbol | number>(reifect: StatefulReifect<State, ClassType>, direction: State, options?: ReifectAppliedOptions<State, ClassType>): this;
    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles.
     * @param {StatefulReifect<State, ClassType>} reifect - The transition to initialize.
     * @param {InOut} direction - The direction of the transition.
     * @param {ReifectAppliedOptions<State, ClassType>} [options] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element.
     * @returns {this} The element's TransitionHandler instance.
     * @template {string | symbol | number} State
     * @template {object} ClassType
     */
    apply<State extends string | symbol | number>(reifect: StatefulReifect<State, ClassType>, direction: State, options?: ReifectAppliedOptions<State, ClassType>): this;
    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles.
     * @param {StatefulReifect<State, ClassType>} reifect - The transition to initialize.
     * @param {ReifectAppliedOptions<State, ClassType>} [options] - Optional styles to override the defaults. Set to
     * `null` to not set any styles on the element.
     * @returns {this} The element's TransitionHandler instance.
     * @template {string | symbol | number} State
     * @template {object} ClassType
     */
    toggle<State extends string | symbol | number>(reifect: StatefulReifect<State, ClassType>, options?: ReifectAppliedOptions<State, ClassType>): this;
    /**
     * @private
     * @function clear
     * @description Clears the set transition styles on the element.
     */
    clear(): void;
    /**
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    reload(): void;
    /**
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    reloadTransitions(): void;
    /**
     * @description The enabled state of the reifect (as a {@link ReifectEnabledState}). Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    get enabled(): ReifectEnabledState;
    set enabled(value: boolean | ReifectEnabledState);
    getEnabledState(reifect: StatefulReifect<any, ClassType>): ReifectEnabledState;
    setEnabledState(reifect: StatefulReifect<any, ClassType>, value: boolean | ReifectEnabledState): void;
}
export { ReifectHandler };

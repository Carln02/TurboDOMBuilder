import {StatefulReifect} from "../../turboComponents/wrappers/statefulReifect/statefulReifect";
import {
    ReifectAppliedOptions,
    ReifectEnabledObject
} from "../../turboComponents/wrappers/statefulReifect/statefulReifect.types";
import {Shown} from "../../types/enums.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";

declare module "../turboSelector" {
    interface TurboSelector {
        /**
         * @description Readonly shallow set of the reifects attached to this object.
         */
        readonly reifects: Set<StatefulReifect>;

        readonly onTransitionStart: Delegate<() => void>;
        readonly onTransitionEnd: Delegate<() => void>;

        /**
         * @description The transition used by the element's show() and isShown methods. Directly modifying its
         * value will modify all elements' default showTransition. Unless this is the desired outcome, set it to a
         * new custom StatefulReifect.
         */
        showTransition: StatefulReifect<Shown>;

        /**
         * @description Boolean indicating whether the element is shown or not, based on its showTransition.
         */
        readonly isShown: boolean;

        /**
         * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
         * @param {boolean} b - Whether to show the element or not
         * @param options
         * @returns {this} Itself, allowing for method chaining.
         */
        show(b: boolean, options?: ReifectAppliedOptions<Shown>): this;

        /**
         * @function attachReifect
         * @description Attach one or more reifects to the object.
         * @param {StatefulReifect[]} reifects - The reifect(s) to attach.
         * @returns {this} - Itself, allowing for method chaining.
         */
        attachReifect(...reifects: StatefulReifect[]): this;

        /**
         * @function detachReifect
         * @description Detach one or more reifects from the object.
         * @param {StatefulReifect[]} reifects - The reifect(s) to detach.
         * @returns {this} - Itself, allowing for method chaining.
         */
        detachReifect(...reifects: StatefulReifect[]): this;

        /**
         * @function initializeReifect
         * @template {string | symbol | number} State - The type of the reifect's states.
         * @description Initializes the reifect at the given state for the corresponding object.
         * @param {StatefulReifect<State>} reifect - The reifect to initialize.
         * @param {State} state - The state to initialize to (if the reifect is not stateless).
         * @param {ReifectAppliedOptions<State>} [options] - Optional overrides for the default values.
         * Set to `null` to not set anything on the object.
         * @returns {this} - Itself, allowing for method chaining.
         */
        initializeReifect<State extends string | symbol | number>(
            reifect?: StatefulReifect<State>, state?: State, options?: ReifectAppliedOptions<State>
        ): this;

        /**
         * @function applyReifect
         * @template {string | symbol | number} State - The type of the reifect's states.
         * @description Applies the reifect at the given state for the corresponding object.
         * @param {StatefulReifect<State>} reifect - The reifect to apply.
         * @param {State} state - The state to initialize to (if the reifect is not stateless).
         * @param {ReifectAppliedOptions<State>} [options] - Optional overrides for the default values.
         * Set to `null` to not set anything on the object.
         * @returns {this} - Itself, allowing for method chaining.
         */
        applyReifect<State extends string | symbol | number>(
            reifect: StatefulReifect<State>, state?: State, options?: ReifectAppliedOptions<State>
        ): this;

        /**
         * @function toggleReifect
         * @template {string | symbol | number} State - The type of the reifect's states.
         * @description Toggles the reifect to the next state for the corresponding object.
         * @param {StatefulReifect<State>} reifect - The reifect to toggle.
         * @param {ReifectAppliedOptions<State>} [options] - Optional overrides for the default values.
         * Set to `null` to not set anything on the object.
         * @returns {this} - Itself, allowing for method chaining.
         */
        toggleReifect<State extends string | symbol | number>(
            reifect: StatefulReifect<State>, options?: ReifectAppliedOptions<State>
        ): this;

        /**
         * @function reloadReifects
         * @description Reloads all reifects attached to this object. Doesn't recompute values.
         * @returns {this} - Itself, allowing for method chaining.
         */
        reloadReifects(): this;

        /**
         * @function reloadTransitions
         * @description Reloads all transitions attached to this object. Doesn't recompute values.
         * @returns {this} - Itself, allowing for method chaining.
         */
        reloadTransitions(): this;

        /**
         * @function reifectEnabledState
         * @description Get the reifect enabled state of this object. If a reifect is provided, the enabled state of
         * the object for this specific reifect will be returned. otherwise, the global state of the object will
         * be returned.
         * @param {StatefulReifect} [reifect] - The target reifect.
         * @return {ReifectEnabledObject} - The enabled state.
         */
        reifectEnabledState(reifect?: StatefulReifect): ReifectEnabledObject;

        /**
         * @function enableReifect
         * @description Set the reifect enabled state of this object. If a reifect is provided, the enabled state of
         * the object for this specific reifect will be updated. otherwise, the global state of the object will
         * be updated
         * @param {boolean | ReifectEnabledObject} value - The new state.
         * @param {StatefulReifect} [reifect] - The target reifect.
         * @return {this} - Itself, allowing for method chaining.
         */
        enableReifect(value: boolean | ReifectEnabledObject, reifect?: StatefulReifect): this;
    }
}

export {};
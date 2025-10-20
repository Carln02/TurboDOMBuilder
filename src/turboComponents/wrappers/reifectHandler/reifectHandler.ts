import {StatefulReifect} from "../statefulReifect/statefulReifect";
import {ReifectAppliedOptions, ReifectEnabledObject} from "../statefulReifect/statefulReifect.types";
import {$} from "../../../turboFunctions/turboFunctions";

/**
 * @class ReifectHandler
 * @description A class to handle reifects for an attached element.
 * @template {object = Node} ClassType
 */
class ReifectHandler<ClassType extends object = Node> {
    private readonly attachedNode: ClassType;
    private readonly reifects: WeakRef<StatefulReifect<any, ClassType>>[];

    private readonly _enabled: ReifectEnabledObject;

    /**
     * @constructor
     * @param {Node} attachedNode - The element to attach transitions to.
     */
    constructor(attachedNode: ClassType) {
        this.attachedNode = attachedNode;
        this.reifects = [];
        this._enabled = {};
        this.enabled = true;
    }

    //Set management

    /**
     * @function attach
     * @description Attach one or more transitions to the element.
     * @param {StatefulReifect<any, ClassType>[]} reifects - The transition(s) to attach.
     * @returns {this} The element's TransitionHandler instance.
     */
    public attach(...reifects: StatefulReifect<any, ClassType>[]): this {
        reifects.forEach(entry => {
            if (this.reifects.some(ref => ref.deref() == entry)) return;
            this.reifects.push(new WeakRef(entry));
            entry.attach(this.attachedNode);
        });
        return this;
    }

    /**
     * @function detach
     * @description Detach one or more transitions from the element.
     * @param {StatefulReifect<any, ClassType>[]} reifects - The transition(s) to detach.
     * @returns {this} The element's TransitionHandler instance.
     */
    public detach(...reifects: StatefulReifect<any, ClassType>[]): this {
        reifects.forEach(entry => {
            const attachedEntry = this.reifects.find(ref => ref.deref() == entry);
            if (!attachedEntry) return;
            this.reifects.splice(this.reifects.indexOf(attachedEntry), 1);
            entry.detach(this.attachedNode);
        });
        return this;
    }

    //Transition methods

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
    public initialize<State extends string | symbol | number>(
        reifect: StatefulReifect<State, ClassType>, direction: State, options?: ReifectAppliedOptions<State, ClassType>
    ): this {
        reifect.initialize(direction, this.attachedNode, options);
        return this;
    }

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
    public apply<State extends string | symbol | number>(
        reifect: StatefulReifect<State, ClassType>, direction: State, options?: ReifectAppliedOptions<State, ClassType>
    ): this {
        reifect.apply(direction, this.attachedNode, options);
        return this;
    }

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
    public toggle<State extends string | symbol | number>(
        reifect: StatefulReifect<State, ClassType>, options?: ReifectAppliedOptions<State, ClassType>
    ): this {
        reifect.toggle(this.attachedNode, options);
        return this;
    }

    /**
     * @private
     * @function clear
     * @description Clears the set transition styles on the element.
     */
    public clear() {
        if (!(this.attachedNode instanceof Node)) return;
        $(this.attachedNode).setStyle("transition", "", true);
    }

    /**
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    public reload() {
        this.clear();
        this.reifects.forEach(reifect =>
            reifect.deref()?.reloadFor(this.attachedNode));
    }

    /**
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    public reloadTransitions() {
        this.clear();
        this.reifects.forEach(reifect =>
            reifect.deref()?.reloadTransitionFor(this.attachedNode));
    }

    //State management

    /**
     * @description The enabled state of the reifect (as a {@link ReifectEnabledObject}). Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    public get enabled(): ReifectEnabledObject {
        return this._enabled;
    }

    public set enabled(value: boolean | ReifectEnabledObject) {
        if (typeof value == "boolean") this._enabled.global = value;
        else if (!value) return;
        else for (const [key, state] of Object.entries(value)) this._enabled[key] = state;
    }

    public getReifectEnabledState(reifect: StatefulReifect<any, ClassType>) {
        return reifect.getObjectEnabledState(this.attachedNode);
    }

    public enableReifect(reifect: StatefulReifect<any, ClassType>, value: boolean | ReifectEnabledObject) {
        reifect.enableObject(this.attachedNode, value);
    }
}

export {ReifectHandler};
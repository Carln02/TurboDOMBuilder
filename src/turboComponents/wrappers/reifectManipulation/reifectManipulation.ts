import {Shown} from "../../../utils/datatypes/basicDatatypes.types";
import {ReifectHandler} from "../reifectHandler/reifectHandler";
import {StatefulReifect} from "../statefulReifect/statefulReifect";
import {ReifectAppliedOptions} from "../statefulReifect/statefulReifect.types";
import "./reifectManipulation.types";

function addReifectManagementToNodePrototype() {
    const showTransition = new StatefulReifect({
        states: [Shown.visible, Shown.hidden],
        styles: (state) => `visibility: ${state}`
    });

    /**
     * @description Adds a readonly "reifects" property to Node prototype.
     */
    Object.defineProperty(Node.prototype, "reifects", {
        get: function () {
            if (!this._reifects) this._reifects = new ReifectHandler(this);
            return this._reifects;
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Adds a configurable "showTransition" property to Node prototype. Defaults to a global
     * transition assigned to all nodes.
     */
    Object.defineProperty(Node.prototype, "showTransition", {
        value: showTransition,
        writable: true,
        configurable: true,
        enumerable: true
    });

    /**
     * @description Boolean indicating whether the node is shown or not, based on its showTransition.
     */
    Object.defineProperty(Node.prototype, "isShown", {
        get: function () {
            const state = this.showTransition.stateOf(this);
            if (state == Shown.visible) return true;
            else if (state == Shown.hidden) return false;

            return this.style.display != "none" && this.style.visibility != "hidden" && this.style.opacity != "0";
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
     * @param {boolean} b - Whether to show the element or not
     * @param {ReifectAppliedOptions<Shown>} [options={executeForAll: false}] - The options to pass to the reifect
     * execution.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.show = function _show<Type extends Node>(this: Type, b: boolean, options:
        ReifectAppliedOptions<Shown> = {executeForAll: false}): Type {
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement)) return this;
        this.showTransition.apply(b ? Shown.visible : Shown.hidden, this, options);
        return this;
    };
}

export {addReifectManagementToNodePrototype};
import {StatefulReifect} from "../../turboComponents/wrappers/statefulReifect/statefulReifect";
import {Shown} from "../../utils/datatypes/basicDatatypes.types";
import {ReifectHandler} from "../../turboComponents/wrappers/reifectHandler/reifectHandler";
import {ReifectAppliedOptions} from "../../turboComponents/wrappers/statefulReifect/statefulReifect.types";
import {TurboSelector} from "../turboSelector";
import {ReifectFunctionsUtils} from "./reifect.utils";
import "./reifect.types";

const utils = new ReifectFunctionsUtils();

const showTransition = new StatefulReifect({
    states: [Shown.visible, Shown.hidden],
    styles: (state) => `visibility: ${state}`
});

function setupReifectFunctions() {
    /**
     * @description Adds a readonly "reifects" property to Node prototype.
     */
    Object.defineProperty(TurboSelector.prototype, "reifects", {
        get: function () {
            if (!this.element) return;
            const data = utils.data(this.element);
            if (!data.reifects) data.reifects = new ReifectHandler(this);
            return data.reifects;
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Adds a configurable "showTransition" property to Node prototype. Defaults to a global
     * transition assigned to all nodes.
     */
    Object.defineProperty(TurboSelector.prototype, "showTransition", {
        get: function () {
            if (!this.element) return;
            const data = utils.data(this.element);
            if (!data.showTransition) data.showTransition = showTransition;
            return data.showTransition;
        },
        set: function (value: StatefulReifect<Shown>) {
            if (!this.element) return;
            utils.data(this.element).showTransition = value;
        },
        configurable: true,
        enumerable: true
    });

    /**
     * @description Boolean indicating whether the node is shown or not, based on its showTransition.
     */
    Object.defineProperty(TurboSelector.prototype, "isShown", {
        get: function () {
            if (!this.element) return;
            const state = this.showTransition.stateOf(this);
            if (state == Shown.visible) return true;
            else if (state == Shown.hidden) return false;
            return this.element.style.display != "none" && this.element.style.visibility != "hidden" && this.element.style.opacity != "0";
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
    TurboSelector.prototype.show = function _show(this: TurboSelector, b: boolean, options:
    ReifectAppliedOptions<Shown> = {executeForAll: false}): TurboSelector {
        if (!this.element) return;
        this.showTransition.apply(b ? Shown.visible : Shown.hidden, this.element, options);
        return this;
    };
}

export {setupReifectFunctions};
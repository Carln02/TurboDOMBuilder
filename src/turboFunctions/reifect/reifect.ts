import {StatefulReifect} from "../../turboComponents/wrappers/statefulReifect/statefulReifect";
import {
    ReifectAppliedOptions,
    ReifectEnabledObject
} from "../../turboComponents/wrappers/statefulReifect/statefulReifect.types";
import {TurboSelector} from "../turboSelector";
import {ReifectFunctionsUtils} from "./reifect.utils";
import "./reifect.types";
import {Reifect} from "../../turboComponents/wrappers/reifect/reifect";
import {Shown} from "../../types/enums.types";

const utils = new ReifectFunctionsUtils();

const showTransition = new StatefulReifect({
    states: [Shown.visible, Shown.hidden],
    styles: (state) => `visibility: ${state}`
});

export function setupReifectFunctions() {
    /**
     * @description Adds a readonly "reifects" property to Node prototype.
     */
    Object.defineProperty(TurboSelector.prototype, "reifects", {
        get: function () {
            if (!this.element) return new Set();
            return new Set(utils.data(this.element).reifects?.toArray());
        },
        configurable: false,
        enumerable: true
    });

    Object.defineProperty(TurboSelector.prototype, "onTransitionStart", {
        get: function () {
            return utils.data(this.element).onTransitionStart;
        },
        configurable: false,
        enumerable: true
    });

    Object.defineProperty(TurboSelector.prototype, "onTransitionEnd", {
        get: function () {
            return utils.data(this.element).onTransitionEnd;
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
            const state = this.showTransition.stateOf(this.element);
            if (state == Shown.visible) return true;
            else if (state == Shown.hidden) return false;
            return this.element.style.display != "none"
                && this.element.style.visibility != "hidden"
                && this.element.style.opacity != "0";
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
    ReifectAppliedOptions<Shown> = {}): TurboSelector {
        if (!this.element) return this;
        if (!options.executeForAll) options.executeForAll = false;
        this.showTransition.apply(b ? Shown.visible : Shown.hidden, this.element, options);
        return this;
    };

    TurboSelector.prototype.attachReifect = function _attachReifect(
        this: TurboSelector, ...reifects: StatefulReifect[]
    ): TurboSelector {
        if (!this.element || typeof this.element !== "object") return this;
        reifects.forEach(entry => {
            if (this.reifects.has(entry)) return;
            utils.attachReifect(this.element, entry);
            entry.attach(this.element);
        });
        return this;
    }

    TurboSelector.prototype.detachReifect = function _detachReifect(
        this: TurboSelector, ...reifects: StatefulReifect[]
    ): TurboSelector {
        if (!this.element || typeof this.element !== "object") return this;
        reifects.forEach(entry => {
            if (!this.reifects.has(entry)) return;
            utils.detachReifect(this.element, entry);
            entry.detach(this.element);
        });
        return this;
    }

    TurboSelector.prototype.initializeReifect = function _initializeReifect(
        this: TurboSelector, reifect: StatefulReifect, state?: any, options?: ReifectAppliedOptions
    ): TurboSelector {
        if (!this.element) return this;
        if (reifect instanceof Reifect) reifect.initialize(this.element, options);
        else reifect.initialize(this.element, state, options);
        return this;
    };

    TurboSelector.prototype.applyReifect = function _applyReifect(
        this: TurboSelector, reifect: StatefulReifect, state?: any, options?: ReifectAppliedOptions
    ): TurboSelector {
        if (!this.element) return this;
        if (reifect instanceof Reifect) reifect.apply(this.element, options);
        else reifect.apply(this.element, state, options);
        return this;
    };

    TurboSelector.prototype.toggleReifect = function _toggleReifect(
        this: TurboSelector, reifect: StatefulReifect, options?: ReifectAppliedOptions
    ): TurboSelector {
        if (!this.element) return this;
        if (reifect instanceof Reifect) return this;
        else reifect.toggle(this.element, options);
        return this;
    };

    TurboSelector.prototype.reloadReifects = function _reloadReifects(this: TurboSelector): TurboSelector {
        if (!this.element) return this;
        this.setStyle("transition", "", true);
        this.reifects.forEach(reifect => reifect.reloadFor(this.element));
        return this;
    };

    TurboSelector.prototype.reloadTransitions = function _reloadTransitions(this: TurboSelector): TurboSelector {
        if (!this.element) return this;
        this.setStyle("transition", "", true);
        this.reifects.forEach(reifect => reifect.reloadTransitionFor(this.element));
        return this;
    };

    TurboSelector.prototype.reifectEnabledState = function _reifectEnabledState(
        this: TurboSelector, reifect?: StatefulReifect
    ): ReifectEnabledObject {
        if (!this.element) return {};
        if (reifect) return reifect.getObjectEnabledState(this.element);
        return utils.data(this.element).enabled;
    };

    TurboSelector.prototype.enableReifect = function _enableReifect(
        this: TurboSelector, value: boolean | ReifectEnabledObject, reifect?: StatefulReifect
    ): TurboSelector {
        if (!this.element) return this;
        if (reifect) {
            reifect.enable(value, this.element);
            return this;
        }
        const enabled = utils.data(this.element).enabled;
        if (typeof value === "boolean") enabled.global = value;
        else if (typeof value === "object") Object.entries(value)
            .forEach(([key, value]) => enabled[key] = value);
        return this;
    }
}
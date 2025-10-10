import {SubstrateFunctionsUtils} from "./substrate.utils";
import {TurboSelector} from "../turboSelector";
import {MakeSubstrateOptions, SubstrateSolver, SubstrateSolverProperties} from "./substrate.types";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";

const utils = new SubstrateFunctionsUtils();

function setupSubstrateFunctions() {
    TurboSelector.prototype.makeSubstrate = function _makeSubstrate(
        this: TurboSelector,
        name: string,
        options?: MakeSubstrateOptions
    ): TurboSelector {
        utils.createSubstrate(this, name);
        if (options?.onActivate) this.onSubstrateActivate(name).add(options.onActivate);
        if (options?.onDeactivate) this.onSubstrateDeactivate(name).add(options.onDeactivate);
        if (!this.currentSubstrate) this.currentSubstrate = name;
        return this;
    }

    TurboSelector.prototype.getSubstrates = function _getSubstrates(this: TurboSelector): string[] {
        return utils.getSubstrates(this);
    }

    TurboSelector.prototype.getSubstrateObjectList = function _getSubstrateObjectList(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): Set<object> {
        const set = new Set<object>();
        if (!substrate) return set;
        Array.from(utils.getSubstrateData(this, substrate).objects).forEach(object => {
            if (!utils.getPersistentMetadata(this, substrate, object).ignored) set.add(object);
        });
        return set;
    }

    TurboSelector.prototype.setSubstrateObjectList = function _setSubstrateObjectList(
        this: TurboSelector,
        list: HTMLCollection | NodeList | Set<object>,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        if (!list || !substrate) return this;
        utils.getSubstrateData(this, substrate).objects = list;
        return this;
    }

    TurboSelector.prototype.addObjectToSubstrate = function _addObjectToSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        if (!object || !substrate) return this;
        utils.getPersistentMetadata(this, substrate, object).ignored = false;
        const list = utils.getSubstrateData(this, substrate).objects;
        if (list instanceof HTMLCollection || list instanceof NodeList) return this;
        try {if (!list.has(object)) list.add(object)} catch {}
        return this;
    }

    TurboSelector.prototype.removeObjectFromSubstrate = function _removeObjectFromSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        if (!object || !substrate) return this;
        utils.getPersistentMetadata(this, substrate, object).ignored = true;
        const list = utils.getSubstrateData(this, substrate).objects;
        if (list instanceof Set) list.delete(object);
        return this;
    }

    TurboSelector.prototype.hasObjectInSubstrate = function _hasObjectInSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = this.currentSubstrate
    ): boolean {
        if (!object || !substrate) return false;
        const list = this.getSubstrateObjectList(substrate);
        for (const obj of list) {
            if (obj === object) return true;
        }
        return false;
    }

    TurboSelector.prototype.wasObjectProcessedBySubstrate = function _wasObjectProcessedBySubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = this.currentSubstrate
    ): boolean {
        if (!object || !substrate) return false;
        return !!utils.getTemporaryMetadata(this, substrate, object)?.processed;
    }

    TurboSelector.prototype.setSubstrate = function _setSubstrate(
        this: TurboSelector,
        name: string
    ): TurboSelector {
        if (!name) return this;
        const prev = this.currentSubstrate;
        if (!utils.setCurrent(this, name)) return this;
        this.onSubstrateChange.fire(prev, name);
        return this;
    }

    Object.defineProperty(TurboSelector.prototype, "currentSubstrate", {
        set: function (value: string) {this.setSubstrate(value)},
        get: function () {return utils.data(this).current},
        configurable: false,
        enumerable: true
    });

    Object.defineProperty(TurboSelector.prototype, "onSubstrateChange", {
        get: function () {return utils.data(this).onChange},
        configurable: false,
        enumerable: true
    });

    TurboSelector.prototype.onSubstrateActivate = function _onSubstrateActivate(
        this: TurboSelector,
        name: string = this.currentSubstrate
    ): Delegate<() => void> {
        return utils.getSubstrateData(this, name)?.onActivate ?? new Delegate();
    }

    TurboSelector.prototype.onSubstrateDeactivate = function _onSubstrateDeactivate(
        this: TurboSelector,
        name: string = this.currentSubstrate
    ): Delegate<() => void> {
        return utils.getSubstrateData(this, name)?.onDeactivate ?? new Delegate();
    }

    TurboSelector.prototype.addSolver = function _addSolver(
        this: TurboSelector,
        callback: SubstrateSolver,
        name: string = this.currentSubstrate
    ): TurboSelector {
        utils.getSubstrateData(this, name).solvers?.add(callback);
        return this;
    }

    TurboSelector.prototype.removeSolver = function _removeSolver(
        this: TurboSelector,
        callback: SubstrateSolver,
        name: string = this.currentSubstrate
    ): TurboSelector {
        utils.getSubstrateData(this, name).solvers?.delete(callback);
        return this;
    }

    TurboSelector.prototype.clearSolvers = function _clearSolvers(
        this: TurboSelector,
        name: string = this.currentSubstrate
    ): TurboSelector {
        utils.getSubstrateData(this, name).solvers?.clear();
        return this;
    }

    TurboSelector.prototype.resolveSubstrate = function _resolveSubstrate(
        this: TurboSelector,
        properties: SubstrateSolverProperties = {}
    ): TurboSelector {
        if (!properties) properties = {};
        if (!properties.substrate) properties.substrate = this.currentSubstrate;
        if (!properties.manager) properties.manager = TurboEventManager.instance;
        if (!properties.eventOptions) properties.eventOptions = {};

        const data = utils.getSubstrateData(this, properties.substrate);
        if (!data) return this;

        data.solvers?.forEach(solver => {
            data.temporaryMetadata = new WeakMap();
            if (properties.eventTarget) {
                data.temporaryMetadata.set(properties.eventTarget, {processed: true, isMainTarget: true});
                solver({...properties, target: properties.eventTarget});
            }

            let target: object;

            do {
                target = Array
                    .from(this.getSubstrateObjectList(properties.substrate))
                    .find(entry => !data.temporaryMetadata.get(entry)?.processed);

                if (target) {
                    data.temporaryMetadata.set(target, {processed: true});
                    solver({...properties, target});
                }
            } while (target);
        });
        return this;
    }
}

export {setupSubstrateFunctions};
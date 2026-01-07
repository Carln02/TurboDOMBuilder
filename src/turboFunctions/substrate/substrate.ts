import {SubstrateFunctionsUtils} from "./substrate.utils";
import {TurboSelector} from "../turboSelector";
import {
    MakeSubstrateOptions,
    SubstrateSolver,
    SubstrateCallbackProperties,
    SubstrateMutator,
    SubstrateChecker, SubstrateMutatorProperties, SubstrateAddCallbackProperties
} from "./substrate.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {binaryInsert} from "../../utils/computations/arrays";

const utils = new SubstrateFunctionsUtils();

export function setupSubstrateFunctions() {
    TurboSelector.prototype.makeSubstrate = function _makeSubstrate(
        this: TurboSelector,
        substrate: string,
        options?: MakeSubstrateOptions
    ): TurboSelector {
        if (!utils.getSubstrateData(this, substrate)) utils.createSubstrate(this, substrate);
        if (options?.onActivate) this.onSubstrateActivate(substrate).add(options.onActivate);
        if (options?.onDeactivate) this.onSubstrateDeactivate(substrate).add(options.onDeactivate);
        if (options?.priority) utils.getSubstrateData(this, substrate).priority = options.priority;
        if (!this.currentSubstrate) this.currentSubstrate = substrate;
        return this;
    }

    Object.defineProperty(TurboSelector.prototype, "substrates", {
        get: function () {
            return utils.getSubstrates(this.element)
        },
        configurable: false,
        enumerable: true
    });

    Object.defineProperty(TurboSelector.prototype, "currentSubstrate", {
        get: function () {
            return utils.data(this).current;
        },
        set: function (value: string) {
            if (!value) return;
            const prev = this.currentSubstrate;
            if (utils.setCurrent(this, value)) this.onSubstrateChange.fire(prev, value);
        },
        configurable: false,
        enumerable: true
    });

    Object.defineProperty(TurboSelector.prototype, "onSubstrateChange", {
        get: function () {
            return utils.data(this).onChange
        },
        configurable: false,
        enumerable: true
    });

    //ACTIVATION

    TurboSelector.prototype.onSubstrateActivate = function _onSubstrateActivate(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): Delegate<() => void> {
        return utils.getSubstrateData(this, substrate)?.onActivate ?? new Delegate();
    }

    TurboSelector.prototype.onSubstrateDeactivate = function _onSubstrateDeactivate(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): Delegate<() => void> {
        return utils.getSubstrateData(this, substrate)?.onDeactivate ?? new Delegate();
    }

    //PRIORITY

    TurboSelector.prototype.getSubstratePriority = function _getSubstratePriority(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): number {
        return utils.getSubstrateData(this, substrate)?.priority ?? 0;
    }

    TurboSelector.prototype.setSubstratePriority = function _setSubstratePriority(
        this: TurboSelector,
        priority: number,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        if (typeof priority === "number") utils.getSubstrateData(this, substrate).priority = priority;
        return this;
    }

    //OBJECT LIST

    TurboSelector.prototype.getSubstrateObjectList = function _getSubstrateObjectList(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): Set<object> {
        const set = new Set<object>();
        if (!substrate) return set;
        Array.from(utils.getSubstrateData(this, substrate).objects).forEach(object => {
            if (!utils.getMetadata(this, substrate, object).ignored) set.add(object);
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
        utils.getMetadata(this, substrate, object).ignored = false;
        const list = utils.getSubstrateData(this, substrate).objects;
        if (list instanceof HTMLCollection || list instanceof NodeList) return this;
        try {
            if (!list.has(object)) list.add(object)
        } catch {
        }
        return this;
    }

    TurboSelector.prototype.removeObjectFromSubstrate = function _removeObjectFromSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        if (!object || !substrate) return this;
        utils.getMetadata(this, substrate, object).ignored = true;
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
        return this.getSubstrateObjectList(substrate).has(object);
    }

    //QUEUE

    TurboSelector.prototype.addObjectToSubstrateQueue = function _getNextInSubstrateQueue(
        this: TurboSelector,
        object: object,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        const queue = utils.getSubstrateData(this, substrate).queue;
        if (queue && queue instanceof TurboQueue && !queue.has(object)) queue.push(object);
        return this;
    }

    TurboSelector.prototype.clearSubstrateQueue = function _getNextInSubstrateQueue(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        const queue = utils.getSubstrateData(this, substrate).queue;
        if (queue && queue instanceof TurboQueue) queue.clear();
        return this;
    }

    TurboSelector.prototype.getDefaultSubstrateQueue = function _getDefaultSubstrateQueue(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): TurboQueue<object> {
        const queue = utils.getSubstrateData(this, substrate).defaultQueue;
        if (queue) return queue.clone();
        return new TurboQueue().push(...this.getSubstrateObjectList(substrate));
    }

    TurboSelector.prototype.setDefaultSubstrateQueue = function _setDefaultSubstrateQueue(
        this: TurboSelector,
        queue: object[] | TurboQueue<object>,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        if (!queue || typeof queue !== "object") return this;
        if (Array.isArray(queue)) queue = new TurboQueue().push(...queue);
        if (queue instanceof TurboQueue) utils.getSubstrateData(this, substrate).defaultQueue = queue.clone();
        return this;
    }

    //PASSES

    TurboSelector.prototype.getObjectPassesForSubstrate = function _getObjectPassesForSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = this.currentSubstrate
    ): number {
        if (!object) return 0;
        const map = utils.getSubstrateData(this, substrate).passes;
        if (!map || !(map instanceof WeakMap)) return 0;
        return map.get(object);
    }

    TurboSelector.prototype.getMaxPassesForSubstrate = function _getMaxPassesForSubstrate(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): number {
        return utils.getSubstrateData(this, substrate).maxPasses;
    }

    TurboSelector.prototype.setMaxPassesForSubstrate = function _setMaxPassesForSubstrate(
        this: TurboSelector,
        passes: number,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        utils.getSubstrateData(this, substrate).maxPasses = passes;
        return this;
    }

    //CHECKER

    TurboSelector.prototype.addChecker = function _addChecker(
        this: TurboSelector,
        properties: SubstrateAddCallbackProperties<SubstrateChecker>,
    ): TurboSelector {
        if (!properties || !properties.name || !properties.callback) return this;
        const substrate = properties.substrate || this.currentSubstrate;
        utils.getSubstrateData(this, substrate).checkers?.set(properties.name, properties.callback);
        return this;
    }

    TurboSelector.prototype.removeChecker = function _removeChecker(
        this: TurboSelector,
        name: string,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        utils.getSubstrateData(this, substrate).checkers?.delete(name);
        return this;
    }

    TurboSelector.prototype.clearCheckers = function _clearCheckers(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        utils.getSubstrateData(this, substrate).checkers?.clear();
        return this;
    }

    TurboSelector.prototype.checkSubstrate = function _checkSubstrate(
        this: TurboSelector,
        properties?: SubstrateCallbackProperties
    ): boolean {
        if (!properties) properties = {};
        utils.setupSubstrateCallbackProperties(this, properties);
        if (!properties.substrate) return true;

        const substrate = properties.substrate || this.currentSubstrate;
        for (const checker of utils.getSubstrateData(this, substrate).checkers.values()) {
            if (!checker(properties)) return false;
        }
        return true;
    }

    TurboSelector.prototype.checkSubstratesForEvent = function _checkSubstratesForEvent(
        this: TurboSelector,
        properties?: SubstrateCallbackProperties
    ): boolean {
        if (!properties || !properties.event) return true;
        utils.setupSubstrateCallbackProperties(null, properties);
        if (!properties.eventTarget || typeof properties.eventTarget !== "object") {
            properties.eventTarget = this.element;
            if (!properties.eventTarget || typeof properties.eventTarget !== "object") return true;
        }

        const substratesData = utils.getSubstratesObjectAttachedTo(properties.eventTarget);
        for (const substrateData of substratesData) {
            for (const checker of substrateData.data.checkers.values()) {
                if (!checker({...properties, substrate: substrateData.name})) return false;
            }
        }
        return true;
    }

    //MUTATOR

    TurboSelector.prototype.addMutator = function _addMutator(
        this: TurboSelector,
        properties: SubstrateAddCallbackProperties<SubstrateMutator>,
    ): TurboSelector {
        if (!properties || !properties.name || !properties.callback) return this;
        const substrate = properties.substrate || this.currentSubstrate;
        utils.getSubstrateData(this, substrate).mutators?.set(properties.name, properties.callback);
        return this;
    }

    TurboSelector.prototype.removeMutator = function _removeMutator(
        this: TurboSelector,
        name: string,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        utils.getSubstrateData(this, substrate).mutators?.delete(name);
        return this;
    }

    TurboSelector.prototype.clearMutators = function _clearMutators(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        utils.getSubstrateData(this, substrate).mutators?.clear();
        return this;
    }

    TurboSelector.prototype.mutate = function _mutate(
        this: TurboSelector,
        properties?: SubstrateMutatorProperties
    ): any {
        if (!properties || !properties.mutation) return;
        utils.setupSubstrateCallbackProperties(this, properties);
        if (!properties.substrate) return this;

        const mutation = utils.getSubstrateData(this, properties.substrate).mutators?.get(properties.mutation);
        if (mutation) return mutation(properties);
    }

    //SOLVERS

    TurboSelector.prototype.addSolver = function _addSolver(
        this: TurboSelector,
        properties: SubstrateAddCallbackProperties<SubstrateSolver>,
    ): TurboSelector {
        if (!properties || !properties.name || !properties.callback) return this;
        const substrate = properties.substrate || this.currentSubstrate;

        const data = utils.getSubstrateData(this, substrate);
        if (!data) return this;

        const name = properties.name;
        delete properties.name;
        delete properties.substrate;
        if (!properties.priority) properties.priority = 10;

        data.solvers?.set(name, properties as any);
        binaryInsert(data.sortedSolvers, name, (name1, name2) =>
            data.solvers.get(name1).priority - data.solvers.get(name2).priority);
        return this;
    }

    TurboSelector.prototype.removeSolver = function _removeSolver(
        this: TurboSelector,
        name: string,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        const data = utils.getSubstrateData(this, substrate);
        if (!data) return this;

        data.solvers?.delete(name);
        const index = data.sortedSolvers?.indexOf(name);
        if (index !== undefined && index >= 0) data.sortedSolvers.splice(index, 1);
        return this;
    }

    TurboSelector.prototype.clearSolvers = function _clearSolvers(
        this: TurboSelector,
        substrate: string = this.currentSubstrate
    ): TurboSelector {
        const data = utils.getSubstrateData(this, substrate);
        if (!data) return this;

        data.solvers?.clear();
        data.sortedSolvers = [];
        return this;
    }

    TurboSelector.prototype.solveSubstrate = function _solveSubstrate(
        this: TurboSelector,
        properties: SubstrateCallbackProperties = {}
    ): TurboSelector {
        if (!properties) properties = {};
        utils.setupSubstrateCallbackProperties(this, properties);
        if (!properties.substrate) return this;

        const data = utils.getSubstrateData(this, properties.substrate);
        if (!data) return this;
        utils.solveSubstrateInternal({data, host: this.element, name: properties.substrate}, properties);
        return this;
    }

    TurboSelector.prototype.solveSubstratesForEvent = function _solveSubstratesForEvent(
        this: TurboSelector,
        properties?: SubstrateCallbackProperties
    ): TurboSelector {
        if (!properties || !properties.event) return this;
        utils.setupSubstrateCallbackProperties(null, properties);
        if (!properties.eventTarget || typeof properties.eventTarget !== "object") {
            properties.eventTarget = this.element;
            if (!properties.eventTarget || typeof properties.eventTarget !== "object") return this;
        }

        const substratesData = utils.getSubstratesObjectAttachedTo(properties.eventTarget);
        for (const substrateData of substratesData) {
            utils.solveSubstrateInternal(substrateData, properties);
        }
        return this;
    }
}
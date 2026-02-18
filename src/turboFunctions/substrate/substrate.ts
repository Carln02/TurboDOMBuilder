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
import {randomString} from "../../utils/computations/random";

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
        if (options?.attachedInstance) utils.getSubstrateData(this, substrate).attachedInstance = options.attachedInstance;
        if (options?.active || options?.active === undefined) utils.activate(this, substrate, true);
        return this;
    }

    Object.defineProperty(TurboSelector.prototype, "substrates", {
        get: function () {
            return utils.getSubstrates(this.element)
        },
        configurable: false,
        enumerable: true
    });

    //ACTIVATION

    Object.defineProperty(TurboSelector.prototype, "activeSubstrates", {
        get: function () {
            return utils.getActiveSubstrates(this.element)
        },
        configurable: false,
        enumerable: true
    });

    TurboSelector.prototype.activateSubstrate = function _activateSubstrates(
        this: TurboSelector,
        ...substrates: string[]
    ): TurboSelector {
        const targets = substrates.length ? substrates : [utils.getDefaultSubstrate(this)];
        targets.forEach(substrate => {
            if (substrate) utils.activate(this, substrate, true);
        });
        return this;
    }

    TurboSelector.prototype.deactivateSubstrate = function _deactivateSubstrates(
        this: TurboSelector,
        ...substrates: string[]
    ): TurboSelector {
        const targets = substrates.length ? substrates : [utils.getDefaultSubstrate(this)];
        targets.forEach(substrate => {
            if (substrate) utils.activate(this, substrate, false);
        });
        return this;
    }

    TurboSelector.prototype.toggleSubstrate = function _toggleSubstrates(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this),
        force?: boolean
    ): TurboSelector {
        if (substrate) utils.activate(this, substrate, force);
        return this;
    }

    TurboSelector.prototype.activateOnlySubstrate = function _activateOnlySubstrates(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this),
    ): TurboSelector {
        if (substrate) utils.getSubstrates(this).forEach(subs => utils.activate(this, substrate, substrate === subs));
        return this;
    }

    TurboSelector.prototype.activateAllSubstrates = function _activateAllSubstrates(this: TurboSelector): TurboSelector {
        utils.getSubstrates(this).forEach(substrate => utils.activate(this, substrate, true));
        return this;
    }

    TurboSelector.prototype.deactivateAllSubstrates = function _deactivateAllSubstrates(this: TurboSelector): TurboSelector {
        utils.getSubstrates(this).forEach(substrate => utils.activate(this, substrate, false));
        return this;
    }

    TurboSelector.prototype.onSubstrateActivate = function _onSubstrateActivate(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
    ): Delegate<() => void> {
        return utils.getSubstrateData(this, substrate)?.onActivate ?? new Delegate();
    }

    TurboSelector.prototype.onSubstrateDeactivate = function _onSubstrateDeactivate(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
    ): Delegate<() => void> {
        return utils.getSubstrateData(this, substrate)?.onDeactivate ?? new Delegate();
    }

    //PRIORITY

    TurboSelector.prototype.getSubstratePriority = function _getSubstratePriority(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
    ): number {
        return utils.getField(this, substrate, "priority") ?? 0;
    }

    TurboSelector.prototype.setSubstratePriority = function _setSubstratePriority(
        this: TurboSelector,
        priority: number,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        if (typeof priority === "number") utils.setField(this, substrate, "priority", priority);
        return this;
    }

    //OBJECT LIST

    TurboSelector.prototype.getSubstrateObjectList = function _getSubstrateObjectList(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
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
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        if (!list || !substrate) return this;
        utils.getSubstrateData(this, substrate).objects = list;
        return this;
    }

    TurboSelector.prototype.addObjectToSubstrate = function _addObjectToSubstrate(
        this: TurboSelector,
        object: object,
        addToQueue: boolean = true,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        if (!object || !substrate) return this;
        utils.getMetadata(this, substrate, object).ignored = false;
        const list = utils.getSubstrateData(this, substrate).objects;
        if (list instanceof HTMLCollection || list instanceof NodeList) return this;
        try {
            if (list.has(object)) return this;
            list.add(object);
            this.onSubstrateObjectListChange(substrate).fire(object, "added");
            this.getSubstrateQueue(substrate)?.push(object);
        } catch {
        }
        return this;
    }

    TurboSelector.prototype.removeObjectFromSubstrate = function _removeObjectFromSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        if (!object || !substrate) return this;
        utils.getMetadata(this, substrate, object).ignored = true;
        const list = utils.getSubstrateData(this, substrate).objects;
        if (list instanceof Set) list.delete(object);
        this.onSubstrateObjectListChange(substrate).fire(object, "removed");
        return this;
    }

    TurboSelector.prototype.hasObjectInSubstrate = function _hasObjectInSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = utils.getDefaultSubstrate(this)
    ): boolean {
        if (!object || !substrate) return false;
        return this.getSubstrateObjectList(substrate).has(object);
    }

    TurboSelector.prototype.onSubstrateObjectListChange = function _onSubstrateObjectListChange(
        this: TurboSelector,
        substrate?: string
    ): Delegate<(object: object, status: "added" | "removed") => void> {
        return utils.getSubstrateData(this, substrate).objectsChangedDelegate;
    }

    //QUEUE

    TurboSelector.prototype.getSubstrateQueue = function _getSubstrateQueue(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboQueue<object> {
        return utils.getSubstrateData(this, substrate).queue;
    }

    TurboSelector.prototype.getDefaultSubstrateQueue = function _getDefaultSubstrateQueue(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboQueue<object> {
        const queue = utils.getField(this, substrate, "defaultQueue");
        if (queue) return queue.clone();
        return new TurboQueue().push(...this.getSubstrateObjectList(substrate));
    }

    TurboSelector.prototype.setDefaultSubstrateQueue = function _setDefaultSubstrateQueue(
        this: TurboSelector,
        queue: object[] | TurboQueue<object>,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        if (!queue || typeof queue !== "object") return this;
        if (Array.isArray(queue)) queue = new TurboQueue().push(...queue);
        if (queue instanceof TurboQueue) utils.setField(this, substrate, "defaultQueue", queue.clone());
        return this;
    }

    //PASSES

    TurboSelector.prototype.getObjectPassesForSubstrate = function _getObjectPassesForSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = utils.getDefaultSubstrate(this)
    ): number {
        if (!object) return 0;
        const map = utils.getSubstrateData(this, substrate).passes;
        if (!map || !(map instanceof WeakMap)) return 0;
        return map.get(object) ?? 0;
    }

    TurboSelector.prototype.getMaxPassesForSubstrate = function _getMaxPassesForSubstrate(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
    ): number {
        return utils.getField(this, substrate, "maxPasses");
    }

    TurboSelector.prototype.setMaxPassesForSubstrate = function _setMaxPassesForSubstrate(
        this: TurboSelector,
        passes: number,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        utils.setField(this, substrate, "maxPasses", passes);
        return this;
    }

    //CUSTOM DATA

    TurboSelector.prototype.getObjectDataForSubstrate = function _getObjectDataForSubstrate(
        this: TurboSelector,
        object: object,
        substrate: string = utils.getDefaultSubstrate(this)
    ): Record<string, any> {
        return utils.getCustomData(this.element, substrate, object);
    }

    TurboSelector.prototype.setObjectDataForSubstrate = function _setObjectDataForSubstrate(
        this: TurboSelector,
        object: object,
        data?: object,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        if (!data || typeof data !== "object") data = {};
        utils.getSubstrateData(this.element, substrate).customData.set(object, data);
        return this;
    }

    //CHECKER

    TurboSelector.prototype.addChecker = function _addChecker(
        this: TurboSelector,
        properties: SubstrateAddCallbackProperties<SubstrateChecker>,
    ): TurboSelector {
        if (!properties || !properties.name || !properties.callback) return this;
        const substrate = properties.substrate || utils.getDefaultSubstrate(this);
        utils.getSubstrateData(this, substrate).checkers?.set(properties.name, properties.callback);
        return this;
    }

    TurboSelector.prototype.removeChecker = function _removeChecker(
        this: TurboSelector,
        name: string,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        utils.getSubstrateData(this, substrate).checkers?.delete(name);
        return this;
    }

    TurboSelector.prototype.clearCheckers = function _clearCheckers(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
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

        const substrate = properties.substrate || utils.getDefaultSubstrate(this);
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
        const substrate = properties.substrate || utils.getDefaultSubstrate(this);
        utils.getSubstrateData(this, substrate).mutators?.set(properties.name, properties.callback);
        return this;
    }

    TurboSelector.prototype.removeMutator = function _removeMutator(
        this: TurboSelector,
        name: string,
        substrate: string = utils.getDefaultSubstrate(this)
    ): TurboSelector {
        utils.getSubstrateData(this, substrate).mutators?.delete(name);
        return this;
    }

    TurboSelector.prototype.clearMutators = function _clearMutators(
        this: TurboSelector,
        substrate: string = utils.getDefaultSubstrate(this)
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
        if (!properties || !properties.callback) return this;
        if (!properties.name) properties.name = randomString(8);
        const substrate = properties.substrate ?? utils.getDefaultSubstrate(this);

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
        substrate: string = utils.getDefaultSubstrate(this)
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
        substrate: string = utils.getDefaultSubstrate(this)
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
        for (const substrateData of substratesData) utils.solveSubstrateInternal(substrateData, properties);
        return this;
    }
}
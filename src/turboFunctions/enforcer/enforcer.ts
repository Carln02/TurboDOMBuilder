import {EnforcerFunctionsUtils} from "./enforcer.utils";
import {TurboSelector} from "../turboSelector";
import {
    MakeEnforcerOptions,
    EnforcerSolver,
    EnforcerCallbackProperties,
    EnforcerMutator,
    EnforcerChecker, EnforcerMutatorProperties, EnforcerAddCallbackProperties
} from "./enforcer.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {binaryInsert} from "../../utils/computations/arrays";
import {randomString} from "../../utils/computations/random";
import {TurboNodeList} from "../../turboComponents/datatypes/nodeList/nodeList";

const utils = new EnforcerFunctionsUtils();

export function setupEnforcerFunctions() {
    TurboSelector.prototype.makeEnforcer = function _makeEnforcer(
        this: TurboSelector,
        enforcer: string,
        options?: MakeEnforcerOptions
    ): TurboSelector {
        if (!utils.getEnforcerData(this, enforcer)) utils.createEnforcer(this, enforcer);
        if (options?.onActivate) this.onEnforcerActivate(enforcer).add(options.onActivate);
        if (options?.onDeactivate) this.onEnforcerDeactivate(enforcer).add(options.onDeactivate);
        if (options?.priority) utils.getEnforcerData(this, enforcer).priority = options.priority;
        if (options?.attachedInstance) utils.getEnforcerData(this, enforcer).attachedInstance = options.attachedInstance;
        if (options?.active || options?.active === undefined) utils.activate(this, enforcer, true);
        return this;
    }

    Object.defineProperty(TurboSelector.prototype, "enforcersNames", {
        get: function () {
            return utils.getEnforcers(this.element)
        },
        configurable: false,
        enumerable: true
    });

    //ACTIVATION

    Object.defineProperty(TurboSelector.prototype, "activeEnforcers", {
        get: function () {
            return utils.getActiveEnforcers(this.element)
        },
        configurable: false,
        enumerable: true
    });

    TurboSelector.prototype.activateEnforcer = function _activateEnforcers(
        this: TurboSelector,
        ...enforcers: string[]
    ): TurboSelector {
        const targets = enforcers.length ? enforcers : [utils.getDefaultEnforcer(this)];
        targets.forEach(enforcer => {
            if (enforcer) utils.activate(this, enforcer, true);
        });
        return this;
    }

    TurboSelector.prototype.deactivateEnforcer = function _deactivateEnforcers(
        this: TurboSelector,
        ...enforcers: string[]
    ): TurboSelector {
        const targets = enforcers.length ? enforcers : [utils.getDefaultEnforcer(this)];
        targets.forEach(enforcer => {
            if (enforcer) utils.activate(this, enforcer, false);
        });
        return this;
    }

    TurboSelector.prototype.toggleEnforcer = function _toggleEnforcers(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this),
        force?: boolean
    ): TurboSelector {
        if (enforcer) utils.activate(this, enforcer, force);
        return this;
    }

    TurboSelector.prototype.activateOnlyEnforcer = function _activateOnlyEnforcers(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this),
    ): TurboSelector {
        if (enforcer) utils.getEnforcers(this).forEach(enf => utils.activate(this, enforcer, enforcer === enf));
        return this;
    }

    TurboSelector.prototype.activateAllEnforcers = function _activateAllEnforcers(this: TurboSelector): TurboSelector {
        utils.getEnforcers(this).forEach(enforcer => utils.activate(this, enforcer, true));
        return this;
    }

    TurboSelector.prototype.deactivateAllEnforcers = function _deactivateAllEnforcers(this: TurboSelector): TurboSelector {
        utils.getEnforcers(this).forEach(enforcer => utils.activate(this, enforcer, false));
        return this;
    }

    TurboSelector.prototype.onEnforcerActivate = function _onEnforcerActivate(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): Delegate<() => void> {
        return utils.getEnforcerData(this, enforcer)?.onActivate ?? new Delegate();
    }

    TurboSelector.prototype.onEnforcerDeactivate = function _onEnforcerDeactivate(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): Delegate<() => void> {
        return utils.getEnforcerData(this, enforcer)?.onDeactivate ?? new Delegate();
    }

    //PRIORITY

    TurboSelector.prototype.getEnforcerPriority = function _getEnforcerPriority(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): number {
        return utils.getField(this, enforcer, "priority") ?? 0;
    }

    TurboSelector.prototype.setEnforcerPriority = function _setEnforcerPriority(
        this: TurboSelector,
        priority: number,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        if (typeof priority === "number") utils.setField(this, enforcer, "priority", priority);
        return this;
    }

    //OBJECT LIST

    TurboSelector.prototype.getEnforcerObjectList = function _getEnforcerObjectList(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboNodeList {
        return utils.getField(this, enforcer, "objectList") ?? new TurboNodeList();
    }

    TurboSelector.prototype.onEnforcerObjectListChange = function _onEnforcerObjectListChange(
        this: TurboSelector,
        enforcer?: string
    ): Delegate<(object: object, status: "added" | "removed") => void> {
        return utils.getEnforcerData(this, enforcer).objectsChangedDelegate;
    }

    //TRIGGER LIST

    TurboSelector.prototype.getEnforcerTriggerList = function _getEnforcerTriggerList(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboNodeList {
        return utils.getField(this, enforcer, "triggerList") ?? new TurboNodeList();
    }

    //QUEUE

    TurboSelector.prototype.getEnforcerQueue = function _getEnforcerQueue(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboQueue<object> {
        return utils.getEnforcerData(this, enforcer).queue;
    }

    TurboSelector.prototype.getDefaultEnforcerQueue = function _getDefaultEnforcerQueue(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboQueue<object> {
        const queue = utils.getField(this, enforcer, "defaultQueue");
        if (queue instanceof TurboQueue) return queue.clone();
        else if (queue instanceof Array || queue instanceof Set) return new TurboQueue().push(...queue);
        return new TurboQueue().push(...this.getEnforcerObjectList(enforcer));
    }

    TurboSelector.prototype.setDefaultEnforcerQueue = function _setDefaultEnforcerQueue(
        this: TurboSelector,
        queue: object[] | TurboQueue<object>,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        if (!queue || typeof queue !== "object") return this;
        if (Array.isArray(queue)) queue = new TurboQueue().push(...queue);
        if (queue instanceof TurboQueue) utils.setField(this, enforcer, "defaultQueue", queue.clone());
        return this;
    }

    //PASSES

    TurboSelector.prototype.getObjectPassesForEnforcer = function _getObjectPassesForEnforcer(
        this: TurboSelector,
        object: object,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): number {
        if (!object) return 0;
        const map = utils.getEnforcerData(this, enforcer).passes;
        if (!map || !(map instanceof WeakMap)) return 0;
        return map.get(object) ?? 0;
    }

    TurboSelector.prototype.getMaxPassesForEnforcer = function _getMaxPassesForEnforcer(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): number {
        return utils.getField(this, enforcer, "maxPasses");
    }

    TurboSelector.prototype.setMaxPassesForEnforcer = function _setMaxPassesForEnforcer(
        this: TurboSelector,
        passes: number,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        utils.setField(this, enforcer, "maxPasses", passes);
        return this;
    }

    //CUSTOM DATA

    TurboSelector.prototype.getObjectDataForEnforcer = function _getObjectDataForEnforcer(
        this: TurboSelector,
        object: object,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): Record<string, any> {
        return utils.getCustomData(this.element, enforcer, object);
    }

    TurboSelector.prototype.setObjectDataForEnforcer = function _setObjectDataForEnforcer(
        this: TurboSelector,
        object: object,
        data?: object,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        if (!data || typeof data !== "object") data = {};
        utils.getEnforcerData(this.element, enforcer).customData.set(object, data);
        return this;
    }

    //CHECKER

    TurboSelector.prototype.addChecker = function _addChecker(
        this: TurboSelector,
        properties: EnforcerAddCallbackProperties<EnforcerChecker>,
    ): TurboSelector {
        if (!properties || !properties.name || !properties.callback) return this;
        const enforcer = properties.enforcer || utils.getDefaultEnforcer(this);
        utils.getEnforcerData(this, enforcer).checkers?.set(properties.name, properties.callback);
        return this;
    }

    TurboSelector.prototype.removeChecker = function _removeChecker(
        this: TurboSelector,
        name: string,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        utils.getEnforcerData(this, enforcer).checkers?.delete(name);
        return this;
    }

    TurboSelector.prototype.clearCheckers = function _clearCheckers(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        utils.getEnforcerData(this, enforcer).checkers?.clear();
        return this;
    }

    TurboSelector.prototype.checkEnforcer = function _checkEnforcer(
        this: TurboSelector,
        properties?: EnforcerCallbackProperties
    ): boolean {
        if (!properties) properties = {};
        utils.setupEnforcerCallbackProperties(this, properties);
        if (!properties.enforcer) return true;

        const enforcer = properties.enforcer || utils.getDefaultEnforcer(this);
        for (const checker of utils.getEnforcerData(this, enforcer).checkers.values()) {
            if (!checker(properties)) return false;
        }
        return true;
    }

    TurboSelector.prototype.checkEnforcersForEvent = function _checkEnforcersForEvent(
        this: TurboSelector,
        properties?: EnforcerCallbackProperties
    ): boolean {
        if (!properties || !properties.event) return true;
        utils.setupEnforcerCallbackProperties(null, properties);
        if (!properties.eventTarget || typeof properties.eventTarget !== "object") {
            properties.eventTarget = this.element;
            if (!properties.eventTarget || typeof properties.eventTarget !== "object") return true;
        }

        const enforcersData = utils.getEnforcersTriggeredByObjects(properties.eventTarget);
        for (const enforcerData of enforcersData) {
            for (const checker of enforcerData.data.checkers.values()) {
                if (!checker({...properties, enforcer: enforcerData.name})) return false;
            }
        }
        return true;
    }

    //MUTATOR

    TurboSelector.prototype.addMutator = function _addMutator(
        this: TurboSelector,
        properties: EnforcerAddCallbackProperties<EnforcerMutator>,
    ): TurboSelector {
        if (!properties || !properties.name || !properties.callback) return this;
        const enforcer = properties.enforcer || utils.getDefaultEnforcer(this);
        utils.getEnforcerData(this, enforcer).mutators?.set(properties.name, properties.callback);
        return this;
    }

    TurboSelector.prototype.removeMutator = function _removeMutator(
        this: TurboSelector,
        name: string,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        utils.getEnforcerData(this, enforcer).mutators?.delete(name);
        return this;
    }

    TurboSelector.prototype.clearMutators = function _clearMutators(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        utils.getEnforcerData(this, enforcer).mutators?.clear();
        return this;
    }

    TurboSelector.prototype.mutate = function _mutate(
        this: TurboSelector,
        properties?: EnforcerMutatorProperties
    ): any {
        if (!properties || !properties.mutation) return;
        utils.setupEnforcerCallbackProperties(this, properties);
        if (!properties.enforcer) return this;

        const mutation = utils.getEnforcerData(this, properties.enforcer).mutators?.get(properties.mutation);
        if (mutation) return mutation(properties);
    }

    //SOLVERS

    TurboSelector.prototype.addSolver = function _addSolver(
        this: TurboSelector,
        properties: EnforcerAddCallbackProperties<EnforcerSolver>,
    ): TurboSelector {
        if (!properties || !properties.callback) return this;
        if (!properties.name) properties.name = randomString(8);
        const enforcer = properties.enforcer ?? utils.getDefaultEnforcer(this);

        const data = utils.getEnforcerData(this, enforcer);
        if (!data) return this;

        const name = properties.name;
        delete properties.name;
        delete properties.enforcer;
        if (!properties.priority) properties.priority = 10;

        data.solvers?.set(name, properties as any);
        binaryInsert(data.sortedSolvers, name, (name1, name2) =>
            data.solvers.get(name1).priority - data.solvers.get(name2).priority);
        return this;
    }

    TurboSelector.prototype.removeSolver = function _removeSolver(
        this: TurboSelector,
        name: string,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        const data = utils.getEnforcerData(this, enforcer);
        if (!data) return this;

        data.solvers?.delete(name);
        const index = data.sortedSolvers?.indexOf(name);
        if (index !== undefined && index >= 0) data.sortedSolvers.splice(index, 1);
        return this;
    }

    TurboSelector.prototype.clearSolvers = function _clearSolvers(
        this: TurboSelector,
        enforcer: string = utils.getDefaultEnforcer(this)
    ): TurboSelector {
        const data = utils.getEnforcerData(this, enforcer);
        if (!data) return this;

        data.solvers?.clear();
        data.sortedSolvers = [];
        return this;
    }

    TurboSelector.prototype.solveEnforcer = function _solveEnforcer(
        this: TurboSelector,
        properties: EnforcerCallbackProperties = {}
    ): TurboSelector {
        if (!properties) properties = {};
        utils.setupEnforcerCallbackProperties(this, properties);
        if (!properties.enforcer) return this;

        const data = utils.getEnforcerData(this, properties.enforcer);
        if (!data) return this;
        utils.solveEnforcerInternal({data, host: this.element, name: properties.enforcer}, properties);
        return this;
    }

    TurboSelector.prototype.solveEnforcersForEvent = function _solveEnforcersForEvent(
        this: TurboSelector,
        properties?: EnforcerCallbackProperties
    ): TurboSelector {
        if (!properties || !properties.event) return this;
        utils.setupEnforcerCallbackProperties(null, properties);

        if (!properties.eventTarget || typeof properties.eventTarget !== "object") {
            properties.eventTarget = this.element;
            if (!properties.eventTarget || typeof properties.eventTarget !== "object") return this;
        }

        const enforcersData = utils.getEnforcersTriggeredByObjects(properties.eventTarget);
        for (const enforcerData of enforcersData) utils.solveEnforcerInternal(enforcerData, properties);
        return this;
    }
}

import {ConstrainerFunctionsUtils} from "./constrainer.utils";
import {TurboSelector} from "../turboSelector";
import {
    MakeConstrainerOptions,
    ConstrainerSolver,
    ConstrainerCallbackProperties,
    ConstrainerMutator,
    ConstrainerChecker, ConstrainerMutatorProperties, ConstrainerAddCallbackProperties
} from "./constrainer.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {binaryInsert} from "../../utils/computations/arrays";
import {randomString} from "../../utils/computations/random";
import {TurboNodeList} from "../../turboComponents/datatypes/nodeList/nodeList";

const utils = new ConstrainerFunctionsUtils();

export function setupConstrainerFunctions() {
    TurboSelector.prototype.makeConstrainer = function _makeConstrainer(
        this: TurboSelector,
        constrainer: string,
        options?: MakeConstrainerOptions
    ): TurboSelector {
        if (!utils.getConstrainerData(this, constrainer)) utils.createConstrainer(this, constrainer);
        if (options?.onActivate) this.onConstrainerActivate(constrainer).add(options.onActivate);
        if (options?.onDeactivate) this.onConstrainerDeactivate(constrainer).add(options.onDeactivate);
        if (options?.priority) utils.getConstrainerData(this, constrainer).priority = options.priority;
        if (options?.attachedInstance) utils.getConstrainerData(this, constrainer).attachedInstance = options.attachedInstance;
        if (options?.active || options?.active === undefined) utils.activate(this, constrainer, true);
        return this;
    }

    Object.defineProperty(TurboSelector.prototype, "constrainersNames", {
        get: function () {
            return utils.getConstrainers(this.element)
        },
        configurable: false,
        enumerable: true
    });

    //ACTIVATION

    Object.defineProperty(TurboSelector.prototype, "activeConstrainers", {
        get: function () {
            return utils.getActiveConstrainers(this.element)
        },
        configurable: false,
        enumerable: true
    });

    TurboSelector.prototype.activateConstrainer = function _activateConstrainers(
        this: TurboSelector,
        ...constrainers: string[]
    ): TurboSelector {
        const targets = constrainers.length ? constrainers : [utils.getDefaultConstrainer(this)];
        targets.forEach(constrainer => {
            if (constrainer) utils.activate(this, constrainer, true);
        });
        return this;
    }

    TurboSelector.prototype.deactivateConstrainer = function _deactivateConstrainers(
        this: TurboSelector,
        ...constrainers: string[]
    ): TurboSelector {
        const targets = constrainers.length ? constrainers : [utils.getDefaultConstrainer(this)];
        targets.forEach(constrainer => {
            if (constrainer) utils.activate(this, constrainer, false);
        });
        return this;
    }

    TurboSelector.prototype.toggleConstrainer = function _toggleConstrainers(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this),
        force?: boolean
    ): TurboSelector {
        if (constrainer) utils.activate(this, constrainer, force);
        return this;
    }

    TurboSelector.prototype.activateOnlyConstrainer = function _activateOnlyConstrainers(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this),
    ): TurboSelector {
        if (constrainer) utils.getConstrainers(this).forEach(enf => utils.activate(this, constrainer, constrainer === enf));
        return this;
    }

    TurboSelector.prototype.activateAllConstrainers = function _activateAllConstrainers(this: TurboSelector): TurboSelector {
        utils.getConstrainers(this).forEach(constrainer => utils.activate(this, constrainer, true));
        return this;
    }

    TurboSelector.prototype.deactivateAllConstrainers = function _deactivateAllConstrainers(this: TurboSelector): TurboSelector {
        utils.getConstrainers(this).forEach(constrainer => utils.activate(this, constrainer, false));
        return this;
    }

    TurboSelector.prototype.onConstrainerActivate = function _onConstrainerActivate(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): Delegate<() => void> {
        return utils.getConstrainerData(this, constrainer)?.onActivate ?? new Delegate();
    }

    TurboSelector.prototype.onConstrainerDeactivate = function _onConstrainerDeactivate(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): Delegate<() => void> {
        return utils.getConstrainerData(this, constrainer)?.onDeactivate ?? new Delegate();
    }

    //PRIORITY

    TurboSelector.prototype.getConstrainerPriority = function _getConstrainerPriority(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): number {
        return utils.getField(this, constrainer, "priority") ?? 0;
    }

    TurboSelector.prototype.setConstrainerPriority = function _setConstrainerPriority(
        this: TurboSelector,
        priority: number,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        if (typeof priority === "number") utils.setField(this, constrainer, "priority", priority);
        return this;
    }

    //OBJECT LIST

    TurboSelector.prototype.getConstrainerObjectList = function _getConstrainerObjectList(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboNodeList {
        return utils.getField(this, constrainer, "objectList") ?? new TurboNodeList();
    }

    TurboSelector.prototype.onConstrainerObjectListChange = function _onConstrainerObjectListChange(
        this: TurboSelector,
        constrainer?: string
    ): Delegate<(object: object, status: "added" | "removed") => void> {
        return utils.getConstrainerData(this, constrainer).objectsChangedDelegate;
    }

    //TRIGGER LIST

    TurboSelector.prototype.getConstrainerTriggerList = function _getConstrainerTriggerList(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboNodeList {
        return utils.getField(this, constrainer, "triggerList") ?? new TurboNodeList();
    }

    //QUEUE

    TurboSelector.prototype.getConstrainerQueue = function _getConstrainerQueue(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboQueue<object> {
        return utils.getConstrainerData(this, constrainer).queue;
    }

    TurboSelector.prototype.getDefaultConstrainerQueue = function _getDefaultConstrainerQueue(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboQueue<object> {
        const queue = utils.getField(this, constrainer, "defaultQueue");
        if (queue instanceof TurboQueue) return queue.clone();
        else if (queue instanceof Array || queue instanceof Set) return new TurboQueue().push(...queue);
        return new TurboQueue().push(...this.getConstrainerObjectList(constrainer));
    }

    TurboSelector.prototype.setDefaultConstrainerQueue = function _setDefaultConstrainerQueue(
        this: TurboSelector,
        queue: object[] | TurboQueue<object>,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        if (!queue || typeof queue !== "object") return this;
        if (Array.isArray(queue)) queue = new TurboQueue().push(...queue);
        if (queue instanceof TurboQueue) utils.setField(this, constrainer, "defaultQueue", queue.clone());
        return this;
    }

    //PASSES

    TurboSelector.prototype.getObjectPassesForConstrainer = function _getObjectPassesForConstrainer(
        this: TurboSelector,
        object: object,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): number {
        if (!object) return 0;
        const map = utils.getConstrainerData(this, constrainer).passes;
        if (!map || !(map instanceof WeakMap)) return 0;
        return map.get(object) ?? 0;
    }

    TurboSelector.prototype.getMaxPassesForConstrainer = function _getMaxPassesForConstrainer(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): number {
        return utils.getField(this, constrainer, "maxPasses");
    }

    TurboSelector.prototype.setMaxPassesForConstrainer = function _setMaxPassesForConstrainer(
        this: TurboSelector,
        passes: number,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        utils.setField(this, constrainer, "maxPasses", passes);
        return this;
    }

    //CUSTOM DATA

    TurboSelector.prototype.getObjectDataForConstrainer = function _getObjectDataForConstrainer(
        this: TurboSelector,
        object: object,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): Record<string, any> {
        return utils.getCustomData(this.element, constrainer, object);
    }

    TurboSelector.prototype.setObjectDataForConstrainer = function _setObjectDataForConstrainer(
        this: TurboSelector,
        object: object,
        data?: object,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        if (!data || typeof data !== "object") data = {};
        utils.getConstrainerData(this.element, constrainer).customData.set(object, data);
        return this;
    }

    //CHECKER

    TurboSelector.prototype.addChecker = function _addChecker(
        this: TurboSelector,
        properties: ConstrainerAddCallbackProperties<ConstrainerChecker>,
    ): TurboSelector {
        if (!properties || !properties.name || !properties.callback) return this;
        const constrainer = properties.constrainer || utils.getDefaultConstrainer(this);
        utils.getConstrainerData(this, constrainer).checkers?.set(properties.name, properties.callback);
        return this;
    }

    TurboSelector.prototype.removeChecker = function _removeChecker(
        this: TurboSelector,
        name: string,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        utils.getConstrainerData(this, constrainer).checkers?.delete(name);
        return this;
    }

    TurboSelector.prototype.clearCheckers = function _clearCheckers(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        utils.getConstrainerData(this, constrainer).checkers?.clear();
        return this;
    }

    TurboSelector.prototype.checkConstrainer = function _checkConstrainer(
        this: TurboSelector,
        properties?: ConstrainerCallbackProperties
    ): boolean {
        if (!properties) properties = {};
        utils.setupConstrainerCallbackProperties(this, properties);
        if (!properties.constrainer) return true;

        const constrainer = properties.constrainer || utils.getDefaultConstrainer(this);
        for (const checker of utils.getConstrainerData(this, constrainer).checkers.values()) {
            if (!checker(properties)) return false;
        }
        return true;
    }

    TurboSelector.prototype.checkConstrainersForEvent = function _checkConstrainersForEvent(
        this: TurboSelector,
        properties?: ConstrainerCallbackProperties
    ): boolean {
        if (!properties || !properties.event) return true;
        utils.setupConstrainerCallbackProperties(null, properties);
        if (!properties.eventTarget || typeof properties.eventTarget !== "object") {
            properties.eventTarget = this.element;
            if (!properties.eventTarget || typeof properties.eventTarget !== "object") return true;
        }

        const constrainersData = utils.getConstrainersTriggeredByObjects(properties.eventTarget);
        for (const constrainerData of constrainersData) {
            for (const checker of constrainerData.data.checkers.values()) {
                if (!checker({...properties, constrainer: constrainerData.name})) return false;
            }
        }
        return true;
    }

    //MUTATOR

    TurboSelector.prototype.addMutator = function _addMutator(
        this: TurboSelector,
        properties: ConstrainerAddCallbackProperties<ConstrainerMutator>,
    ): TurboSelector {
        if (!properties || !properties.name || !properties.callback) return this;
        const constrainer = properties.constrainer || utils.getDefaultConstrainer(this);
        utils.getConstrainerData(this, constrainer).mutators?.set(properties.name, properties.callback);
        return this;
    }

    TurboSelector.prototype.removeMutator = function _removeMutator(
        this: TurboSelector,
        name: string,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        utils.getConstrainerData(this, constrainer).mutators?.delete(name);
        return this;
    }

    TurboSelector.prototype.clearMutators = function _clearMutators(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        utils.getConstrainerData(this, constrainer).mutators?.clear();
        return this;
    }

    TurboSelector.prototype.mutate = function _mutate(
        this: TurboSelector,
        properties?: ConstrainerMutatorProperties
    ): any {
        if (!properties || !properties.mutation) return;
        utils.setupConstrainerCallbackProperties(this, properties);
        if (!properties.constrainer) return this;

        const mutation = utils.getConstrainerData(this, properties.constrainer).mutators?.get(properties.mutation);
        if (mutation) return mutation(properties);
    }

    //SOLVERS

    TurboSelector.prototype.addSolver = function _addSolver(
        this: TurboSelector,
        properties: ConstrainerAddCallbackProperties<ConstrainerSolver>,
    ): TurboSelector {
        if (!properties || !properties.callback) return this;
        if (!properties.name) properties.name = randomString(8);
        const constrainer = properties.constrainer ?? utils.getDefaultConstrainer(this);

        const data = utils.getConstrainerData(this, constrainer);
        if (!data) return this;

        const name = properties.name;
        delete properties.name;
        delete properties.constrainer;
        if (!properties.priority) properties.priority = 10;

        data.solvers?.set(name, properties as any);
        binaryInsert(data.sortedSolvers, name, (name1, name2) =>
            data.solvers.get(name1).priority - data.solvers.get(name2).priority);
        return this;
    }

    TurboSelector.prototype.removeSolver = function _removeSolver(
        this: TurboSelector,
        name: string,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        const data = utils.getConstrainerData(this, constrainer);
        if (!data) return this;

        data.solvers?.delete(name);
        const index = data.sortedSolvers?.indexOf(name);
        if (index !== undefined && index >= 0) data.sortedSolvers.splice(index, 1);
        return this;
    }

    TurboSelector.prototype.clearSolvers = function _clearSolvers(
        this: TurboSelector,
        constrainer: string = utils.getDefaultConstrainer(this)
    ): TurboSelector {
        const data = utils.getConstrainerData(this, constrainer);
        if (!data) return this;

        data.solvers?.clear();
        data.sortedSolvers = [];
        return this;
    }

    TurboSelector.prototype.solveConstrainer = function _solveConstrainer(
        this: TurboSelector,
        properties: ConstrainerCallbackProperties = {}
    ): TurboSelector {
        if (!properties) properties = {};
        utils.setupConstrainerCallbackProperties(this, properties);
        if (!properties.constrainer) return this;

        const data = utils.getConstrainerData(this, properties.constrainer);
        if (!data) return this;
        utils.solveConstrainerInternal({data, host: this.element, name: properties.constrainer}, properties);
        return this;
    }

    TurboSelector.prototype.solveConstrainersForEvent = function _solveConstrainersForEvent(
        this: TurboSelector,
        properties?: ConstrainerCallbackProperties
    ): TurboSelector {
        if (!properties || !properties.event) return this;
        utils.setupConstrainerCallbackProperties(null, properties);

        if (!properties.eventTarget || typeof properties.eventTarget !== "object") {
            properties.eventTarget = this.element;
            if (!properties.eventTarget || typeof properties.eventTarget !== "object") return this;
        }

        const constrainersData = utils.getConstrainersTriggeredByObjects(properties.eventTarget);
        for (const constrainerData of constrainersData) utils.solveConstrainerInternal(constrainerData, properties);
        return this;
    }
}

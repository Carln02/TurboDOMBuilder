import {TurboSelector} from "../turboSelector";
import {ConstrainerCallbackProperties, ConstrainerChecker, ConstrainerMutator, ConstrainerSolver} from "./constrainer.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboWeakSet} from "../../turboComponents/datatypes/weakSet/weakSet";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {turbo} from "../turboFunctions";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {Propagation} from "../event/event.types";
import {TurboConstrainer} from "../../mvc/constrainer/constrainer";
import {TurboNodeList} from "../../turboComponents/datatypes/nodeList/nodeList";

type ConstrainerData = {
    attachedInstance?: TurboConstrainer,

    active: boolean,
    objectList: TurboNodeList,
    triggerList: TurboNodeList,

    customData: WeakMap<object, Record<string, any>>;
    objectsChangedDelegate: Delegate<(object: object, status: "added" | "removed") => void>,

    priority: number,
    maxPasses: number,

    queue: TurboQueue<object>,
    passes: WeakMap<object, number>,
    defaultQueue?: TurboQueue<object>,

    onActivate: Delegate<() => void>,
    onDeactivate: Delegate<() => void>,

    checkers: Map<string, ConstrainerChecker>,
    mutators: Map<string, ConstrainerMutator>,

    solvers: Map<string, ConstrainerCallbackObject<ConstrainerSolver>>,
    sortedSolvers: string[]
};

type ElementData = {
    constrainers: Map<string, ConstrainerData>,
};

type ConstrainerCallbackObject<Type extends ConstrainerChecker | ConstrainerMutator | ConstrainerSolver> = {
    callback: Type,
    priority: number,
};

type ConstrainerDataWithId = {
    data: ConstrainerData,
    name: string,
    host: object,
    targets?: object[]
};

export class ConstrainerFunctionsUtils {
    private objectsSet: TurboWeakSet = new TurboWeakSet();
    private dataMap = new WeakMap<object, ElementData>;

    public data(element: object): ElementData {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {} as any;
        if (!this.dataMap.has(element)) this.dataMap.set(element, {constrainers: new Map()});
        return this.dataMap.get(element);
    }

    public createConstrainer(element: object, constrainer: string): ConstrainerData {
        if (element instanceof TurboSelector) element = element.element;
        const objectList = new TurboNodeList(element instanceof Element ? element.children
            : element instanceof Node ? element.childNodes
                : []);

        const data: ConstrainerData = {
            active: false,
            objectList: objectList,
            triggerList: new TurboNodeList(objectList),

            customData: new WeakMap(),
            objectsChangedDelegate: new Delegate(),

            priority: 10,
            maxPasses: 5,

            queue: new TurboQueue(),
            passes: new WeakMap(),

            onActivate: new Delegate(),
            onDeactivate: new Delegate(),

            checkers: new Map(),
            mutators: new Map(),
            solvers: new Map(),
            sortedSolvers: []
        };

        if (element) {
            this.objectsSet.add(element);
            this.data(element).constrainers.set(constrainer, data);
        }
        return data;
    }

    public activate(element: object, constrainer: string, activate?: boolean) {
        const data = this.getConstrainerData(element, constrainer);
        if (!data) return;
        if (typeof activate === "boolean") data.active = activate;
        else data.active = !data.active;
    }

    public getConstrainerData(element: object, constrainer: string): ConstrainerData {
        return this.data(element)?.constrainers?.get(constrainer);
    }

    public getConstrainers(element: object): string[] {
        return [...this.data(element)?.constrainers?.keys()];
    }

    public getActiveConstrainers(element: object): string[] {
        const data = this.data(element)?.constrainers;
        if (!data) return [];

        const entries = [];
        for (const [key, value] of data.entries()) {
            if (value.active) entries.push(key);
        }
        return entries;
    }

    public getDefaultConstrainer(element: object, allowInactive: boolean = true): string {
        const data = this.data(element).constrainers;
        if (!data) return;

        for (const [key, value] of data.entries()) {
            if (value.active) return key;
        }
        if (allowInactive) return data.keys()[0];
    }

    public getCustomData(element: object, constrainer: string, object: object): Record<string, any> {
        const constrainerData = this.getConstrainerData(element, constrainer);
        if (!constrainerData || !constrainerData.customData) return {};
        let customData = constrainerData.customData.get(object);
        if (!customData) {
            customData = {};
            constrainerData.customData.set(object, customData);
        }
        return customData;
    }

    public getConstrainersTriggeredByObjects(...elements: object[]): ConstrainerDataWithId[] {
        if (!elements || elements.length === 0) return [];

        const nodeTargets: Node[] = elements.filter(el => el instanceof Node);
        const data: ConstrainerDataWithId[] = [];

        const checkTargets = (constrainerName: string, object: object): object[] => {
            const hits: Set<object> = new Set();
            const list = this.getField(object, constrainerName, "triggerList") ?? new TurboNodeList()
            for (const el of nodeTargets) if (list.has(el)) hits.add(el);
            return Array.from(hits.values());
        };

        this.objectsSet.toArray().forEach(object =>
            this.data(object).constrainers.forEach((constrainerData, name) => {
                if (!constrainerData.active) return;
                const hits = checkTargets(name, object);
                if (hits.length > 0) data.push({name, data: constrainerData, host: object, targets: hits});
            })
        );

        data.sort((a, b) =>
            this.getField(a.host, a.name, "priority") - this.getField(b.host, b.name, "priority"));
        return data;
    }

    public getField(element: object, constrainer: string, field: string): any {
        const data = this.getConstrainerData(element, constrainer);
        if (!data) return;
        if (data.attachedInstance && data.attachedInstance instanceof TurboConstrainer
            && data.attachedInstance[field] !== undefined) return data.attachedInstance[field];
        return data[field];
    }

    public setField(element: object, constrainer: string, field: string, value: any) {
        const data = this.getConstrainerData(element, constrainer);
        if (data.attachedInstance && data.attachedInstance instanceof TurboConstrainer) data.attachedInstance[field] = value;
        else data[field] = value;
    }

    public setupConstrainerCallbackProperties(element: object, properties: ConstrainerCallbackProperties) {
        if (element instanceof TurboSelector) element = element.element;
        turbo(properties).applyDefaults({
            constrainerHost: element,
            constrainer: element ? this.getDefaultConstrainer(element, false) : undefined,
            manager: TurboEventManager.instance,
            eventOptions: {},
            toolName: (properties.event as TurboEvent)?.toolName,
            eventType: (properties.event as TurboEvent)?.type,
            eventTarget: (properties.event as TurboEvent)?.target
        });
    }

    public solveConstrainerInternal(data: ConstrainerDataWithId, properties: ConstrainerCallbackProperties) {
        const constrainerData = data.data;
        constrainerData.passes = new WeakMap();
        constrainerData.customData = new WeakMap();
        constrainerData.queue = turbo(data.host).getDefaultConstrainerQueue(data.name);
        if (!constrainerData.queue) constrainerData.queue = new TurboQueue();

        if (!constrainerData.solvers) return;
        let object: object = properties.eventTarget;

        if (properties.eventTarget) constrainerData.queue.remove(properties.eventTarget);
        else object = constrainerData.queue.pop();

        const onObjectAdded = (entry: object, state: "added" | "removed") => {
            if (state === "added") constrainerData.queue.push(entry);
        };
        constrainerData.objectList.onChanged.add(onObjectAdded);

        while (object) {
            const passes = constrainerData.passes.get(object) ?? 0;
            if (passes < constrainerData.maxPasses) {
                constrainerData.passes.set(object, passes + 1);

                for (const solverName of constrainerData.sortedSolvers) {
                    const propagation = constrainerData.solvers.get(solverName)?.callback({...properties, target: object, constrainer: data.name});
                    if (propagation === Propagation.stopImmediatePropagation || propagation === Propagation.stopPropagation) break;
                }
            }

            object = constrainerData.queue.pop();
        }

        constrainerData.objectList.onChanged.remove(onObjectAdded);
    }
}

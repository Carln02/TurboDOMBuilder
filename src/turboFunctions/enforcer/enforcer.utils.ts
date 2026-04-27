import {TurboSelector} from "../turboSelector";
import {EnforcerCallbackProperties, EnforcerChecker, EnforcerMutator, EnforcerSolver} from "./enforcer.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboWeakSet} from "../../turboComponents/datatypes/weakSet/weakSet";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {turbo} from "../turboFunctions";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {Propagation} from "../event/event.types";
import {TurboEnforcer} from "../../mvc/enforcer/enforcer";
import {TurboNodeList} from "../../turboComponents/datatypes/nodeList/nodeList";

type EnforcerData = {
    attachedInstance?: TurboEnforcer,

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

    checkers: Map<string, EnforcerChecker>,
    mutators: Map<string, EnforcerMutator>,

    solvers: Map<string, EnforcerCallbackObject<EnforcerSolver>>,
    sortedSolvers: string[]
};

type ElementData = {
    enforcers: Map<string, EnforcerData>,
};

type EnforcerCallbackObject<Type extends EnforcerChecker | EnforcerMutator | EnforcerSolver> = {
    callback: Type,
    priority: number,
};

type EnforcerDataWithId = {
    data: EnforcerData,
    name: string,
    host: object,
    targets?: object[]
};

export class EnforcerFunctionsUtils {
    private objectsSet: TurboWeakSet = new TurboWeakSet();
    private dataMap = new WeakMap<object, ElementData>;

    public data(element: object): ElementData {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {} as any;
        if (!this.dataMap.has(element)) this.dataMap.set(element, {enforcers: new Map()});
        return this.dataMap.get(element);
    }

    public createEnforcer(element: object, enforcer: string): EnforcerData {
        if (element instanceof TurboSelector) element = element.element;
        const objectList = new TurboNodeList(element instanceof Element ? element.children
            : element instanceof Node ? element.childNodes
                : []);

        const data: EnforcerData = {
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
            this.data(element).enforcers.set(enforcer, data);
        }
        return data;
    }

    public activate(element: object, enforcer: string, activate?: boolean) {
        const data = this.getEnforcerData(element, enforcer);
        if (!data) return;
        if (typeof activate === "boolean") data.active = activate;
        else data.active = !data.active;
    }

    public getEnforcerData(element: object, enforcer: string): EnforcerData {
        return this.data(element)?.enforcers?.get(enforcer);
    }

    public getEnforcers(element: object): string[] {
        return [...this.data(element)?.enforcers?.keys()];
    }

    public getActiveEnforcers(element: object): string[] {
        const data = this.data(element)?.enforcers;
        if (!data) return [];

        const entries = [];
        for (const [key, value] of data.entries()) {
            if (value.active) entries.push(key);
        }
        return entries;
    }

    public getDefaultEnforcer(element: object, allowInactive: boolean = true): string {
        const data = this.data(element).enforcers;
        if (!data) return;

        for (const [key, value] of data.entries()) {
            if (value.active) return key;
        }
        if (allowInactive) return data.keys()[0];
    }

    public getCustomData(element: object, enforcer: string, object: object): Record<string, any> {
        const enforcerData = this.getEnforcerData(element, enforcer);
        if (!enforcerData || !enforcerData.customData) return {};
        let customData = enforcerData.customData.get(object);
        if (!customData) {
            customData = {};
            enforcerData.customData.set(object, customData);
        }
        return customData;
    }

    public getEnforcersTriggeredByObjects(...elements: object[]): EnforcerDataWithId[] {
        if (!elements || elements.length === 0) return [];

        const nodeTargets: Node[] = elements.filter(el => el instanceof Node);
        const data: EnforcerDataWithId[] = [];

        const checkTargets = (enforcerName: string, object: object): object[] => {
            const hits: Set<object> = new Set();
            const list = this.getField(object, enforcerName, "triggerList") ?? new TurboNodeList()
            for (const el of nodeTargets) if (list.has(el)) hits.add(el);
            return Array.from(hits.values());
        };

        this.objectsSet.toArray().forEach(object =>
            this.data(object).enforcers.forEach((enforcerData, name) => {
                if (!enforcerData.active) return;
                const hits = checkTargets(name, object);
                if (hits.length > 0) data.push({name, data: enforcerData, host: object, targets: hits});
            })
        );

        data.sort((a, b) =>
            this.getField(a.host, a.name, "priority") - this.getField(b.host, b.name, "priority"));
        return data;
    }

    public getField(element: object, enforcer: string, field: string): any {
        const data = this.getEnforcerData(element, enforcer);
        if (!data) return;
        if (data.attachedInstance && data.attachedInstance instanceof TurboEnforcer
            && data.attachedInstance[field] !== undefined) return data.attachedInstance[field];
        return data[field];
    }

    public setField(element: object, enforcer: string, field: string, value: any) {
        const data = this.getEnforcerData(element, enforcer);
        if (data.attachedInstance && data.attachedInstance instanceof TurboEnforcer) data.attachedInstance[field] = value;
        else data[field] = value;
    }

    public setupEnforcerCallbackProperties(element: object, properties: EnforcerCallbackProperties) {
        if (element instanceof TurboSelector) element = element.element;
        turbo(properties).applyDefaults({
            enforcerHost: element,
            enforcer: element ? this.getDefaultEnforcer(element, false) : undefined,
            manager: TurboEventManager.instance,
            eventOptions: {},
            toolName: (properties.event as TurboEvent)?.toolName,
            eventType: (properties.event as TurboEvent)?.type,
            eventTarget: (properties.event as TurboEvent)?.target
        });
    }

    public solveEnforcerInternal(data: EnforcerDataWithId, properties: EnforcerCallbackProperties) {
        const enforcerData = data.data;
        enforcerData.passes = new WeakMap();
        enforcerData.customData = new WeakMap();
        enforcerData.queue = turbo(data.host).getDefaultEnforcerQueue(data.name);
        if (!enforcerData.queue) enforcerData.queue = new TurboQueue();

        if (!enforcerData.solvers) return;
        let object: object = properties.eventTarget;

        if (properties.eventTarget) enforcerData.queue.remove(properties.eventTarget);
        else object = enforcerData.queue.pop();

        const onObjectAdded = (entry: object, state: "added" | "removed") => {
            if (state === "added") enforcerData.queue.push(entry);
        };
        enforcerData.objectList.onChanged.add(onObjectAdded);

        while (object) {
            const passes = enforcerData.passes.get(object) ?? 0;
            if (passes < enforcerData.maxPasses) {
                enforcerData.passes.set(object, passes + 1);

                for (const solverName of enforcerData.sortedSolvers) {
                    const propagation = enforcerData.solvers.get(solverName)?.callback({...properties, target: object, enforcer: data.name});
                    if (propagation === Propagation.stopImmediatePropagation || propagation === Propagation.stopPropagation) break;
                }
            }

            object = enforcerData.queue.pop();
        }

        enforcerData.objectList.onChanged.remove(onObjectAdded);
    }
}

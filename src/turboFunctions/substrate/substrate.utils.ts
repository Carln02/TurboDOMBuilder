import {TurboSelector} from "../turboSelector";
import {SubstrateCallbackProperties, SubstrateChecker, SubstrateMutator, SubstrateSolver} from "./substrate.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboWeakSet} from "../../turboComponents/datatypes/weakSet/weakSet";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {turbo} from "../turboFunctions";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {Propagation} from "../event/event.types";
import {TurboSubstrate} from "../../mvc/substrate/substrate";

type ObjectMetadata = {
    ignored?: boolean,
};

type SubstrateData = {
    attachedInstance?: TurboSubstrate,

    active: boolean,
    objects: HTMLCollection | NodeList | Set<object>,
    metadata: WeakMap<object, ObjectMetadata>,
    customData: WeakMap<object, Record<string, any>>;

    objectsChangedDelegate: Delegate<(object: object, status: "added" | "removed") => void>,

    priority: number,
    maxPasses: number,

    queue: TurboQueue<object>,
    passes: WeakMap<object, number>,
    defaultQueue?: TurboQueue<object>,

    onActivate: Delegate<() => void>,
    onDeactivate: Delegate<() => void>,

    checkers: Map<string, SubstrateChecker>,
    mutators: Map<string, SubstrateMutator>,

    solvers: Map<string, SubstrateCallbackObject<SubstrateSolver>>,
    sortedSolvers: string[]
};

type ElementData = {
    substrates: Map<string, SubstrateData>,
};

type SubstrateCallbackObject<Type extends SubstrateChecker | SubstrateMutator | SubstrateSolver> = {
    callback: Type,
    priority: number,
};

type SubstrateDataWithId = {
    data: SubstrateData,
    name: string,
    host: object,
    targets?: object[]
};

export class SubstrateFunctionsUtils {
    private objectsSet: TurboWeakSet = new TurboWeakSet();
    private dataMap = new WeakMap<object, ElementData>;

    public data(element: object): ElementData {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {} as any;
        if (!this.dataMap.has(element)) this.dataMap.set(element, {substrates: new Map()});
        return this.dataMap.get(element);
    }

    public createSubstrate(element: object, substrate: string): SubstrateData {
        if (element instanceof TurboSelector) element = element.element;
        const data: SubstrateData = {
            active: false,
            objects: element instanceof Element ? element.children
                : element instanceof Node ? element.childNodes
                    : new Set(),
            metadata: new WeakMap(),
            customData: new WeakMap(),
            priority: 10,
            maxPasses: 5,

            objectsChangedDelegate: new Delegate(),

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
            this.data(element).substrates.set(substrate, data);
        }
        return data;
    }

    public activate(element: object, substrate: string, activate?: boolean) {
        const data = this.getSubstrateData(element, substrate);
        if (!data) return;
        if (typeof activate === "boolean") data.active = activate;
        else data.active = !data.active;
    }

    public getSubstrateData(element: object, substrate: string): SubstrateData {
        return this.data(element).substrates.get(substrate);
    }

    public getSubstrates(element: object): string[] {
        return [...this.data(element).substrates.keys()];
    }

    public getActiveSubstrates(element: object): string[] {
        const data = this.data(element).substrates;
        if (!data) return [];

        const entries = [];
        for (const [key, value] of data.entries()) {
            if (value.active) entries.push(key);
        }
        return entries;
    }

    public getDefaultSubstrate(element: object, allowInactive: boolean = true): string {
        const data = this.data(element).substrates;
        if (!data) return;

        for (const [key, value] of data.entries()) {
            if (value.active) return key;
        }
        if (allowInactive) return data.keys()[0];
    }

    public getMetadata(element: object, substrate: string, object: object): ObjectMetadata {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.metadata) return {};
        let metadata = substrateData.metadata.get(object);
        if (!metadata) {
            metadata = {};
            substrateData.metadata.set(object, metadata);
        }
        return metadata;
    }

    public getCustomData(element: object, substrate: string, object: object): ObjectMetadata {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.customData) return {};
        let customData = substrateData.customData.get(object);
        if (!customData) {
            customData = {};
            substrateData.customData.set(object, customData);
        }
        return customData;
    }

    public getSubstratesObjectAttachedTo(...elements: object[]): SubstrateDataWithId[] {
        if (!elements || elements.length === 0) return [];

        const nodeTargets: Node[] = elements.filter(el => el instanceof Node);
        const data: SubstrateDataWithId[] = [];

        const checkTargets = (data: SubstrateData): object[] => {
            const hits: Set<object> = new Set();
            const list = data.objects;

            if (list instanceof Set) {
                for (const el of elements) {
                    if (list.has(el) && !data.metadata.get(el)?.ignored) hits.add(el);
                }
            } else if (nodeTargets.length > 0) {
                for (let t = 0; t < nodeTargets.length; t++) {
                    for (let i = 0; i < list.length; i++) {
                        const target = nodeTargets[t];
                        if (list[i] === target && !data.metadata.get(target)?.ignored) {
                            hits.add(target);
                            break;
                        }
                    }
                }
            }

            return Array.from(hits.values());
        };

        this.objectsSet.toArray().forEach(object =>
            this.data(object).substrates.forEach((substrateData, name) => {
                if (!substrateData.active) return;
                const hits = checkTargets(substrateData);
                if (hits.length > 0) data.push({name, data: substrateData, host: object, targets: hits});
            })
        );

        data.sort((a, b) =>
            this.getField(a.host, a.name, "priority") - this.getField(b.host, b.name, "priority"));
        return data;
    }

    public getField(element: object, substrate: string, field: string): any {
        const data = this.getSubstrateData(element, substrate);
        if (data.attachedInstance && data.attachedInstance instanceof TurboSubstrate
            && data.attachedInstance[field] !== undefined) return data.attachedInstance[field];
        return data[field];
    }

    public setField(element: object, substrate: string, field: string, value: any) {
        const data = this.getSubstrateData(element, substrate);
        if (data.attachedInstance && data.attachedInstance instanceof TurboSubstrate) data.attachedInstance[field] = value;
        else data[field] = value;
    }

    public setupSubstrateCallbackProperties(element: object, properties: SubstrateCallbackProperties) {
        if (element instanceof TurboSelector) element = element.element;
        turbo(properties).applyDefaults({
            substrateHost: element,
            substrate: element ? this.getDefaultSubstrate(element, false) : undefined,
            manager: TurboEventManager.instance,
            eventOptions: {},
            toolName: (properties.event as TurboEvent)?.toolName,
            eventType: (properties.event as TurboEvent)?.type,
            eventTarget: (properties.event as TurboEvent)?.target
        });
    }

    public solveSubstrateInternal(data: SubstrateDataWithId, properties: SubstrateCallbackProperties) {
        const substrateData = data.data;
        substrateData.passes = new WeakMap();
        substrateData.customData = new WeakMap();
        substrateData.queue = turbo(data.host).getDefaultSubstrateQueue(data.name);
        if (!substrateData.queue) substrateData.queue = new TurboQueue();

        if (!substrateData.solvers) return;
        let object: object = properties.eventTarget;

        if (properties.eventTarget) substrateData.queue.remove(properties.eventTarget);
        else object = substrateData.queue.pop();

        while (object) {
            const passes = substrateData.passes.get(object) ?? 0;
            if (passes < substrateData.maxPasses) {
                substrateData.passes.set(object, passes + 1);

                for (const solverName of substrateData.sortedSolvers) {
                    const propagation = substrateData.solvers.get(solverName)?.callback({...properties, target: object, substrate: data.name});
                    if (propagation === Propagation.stopImmediatePropagation || propagation === Propagation.stopPropagation) break;
                }
            }

            object = substrateData.queue.pop();
        }
    }
}
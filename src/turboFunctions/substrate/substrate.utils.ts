import {TurboSelector} from "../turboSelector";
import {SubstrateCallbackProperties, SubstrateChecker, SubstrateMutator, SubstrateSolver} from "./substrate.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboWeakSet} from "../../turboComponents/datatypes/weakSet/weakSet";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {turbo} from "../turboFunctions";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {Propagation} from "../event/event.types";
import {element} from "../../elementCreation/element";

type ObjectMetadata = {
    ignored?: boolean
};

type SubstrateData = {
    objects: HTMLCollection | NodeList | Set<object>,
    metadata: WeakMap<object, ObjectMetadata>,

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
    current?: string,
    onChange: Delegate<(prev: string, next: string) => void>
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
        if (!this.dataMap.has(element)) this.dataMap.set(element, {
            substrates: new Map(),
            onChange: new Delegate()
        });
        return this.dataMap.get(element);
    }

    public createSubstrate(element: object, substrate: string): SubstrateData {
        const data: SubstrateData = {
            objects: element instanceof Element ? element.children
                : element instanceof Node ? element.childNodes
                    : new Set(),
            metadata: new WeakMap(),
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

        this.objectsSet.add(element);
        this.data(element).substrates.set(substrate, data);
        return data;
    }

    public setCurrent(element: object, substrate: string): boolean {
        if (!this.getSubstrates(element).includes(substrate)) return false;
        this.data(element).current = substrate;
        return true;
    }

    public getSubstrateData(element: object, substrate: string): SubstrateData {
        return this.data(element).substrates.get(substrate);
    }

    public getSubstrates(element: object): string[] {
        return [...this.data(element).substrates.keys()];
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
                const hits = checkTargets(substrateData);
                if (hits.length > 0) data.push({name, data: substrateData, host: object, targets: hits});
            })
        );

        data.sort((a, b) => a.data.priority - b.data.priority);
        return data;
    }

    public setupSubstrateCallbackProperties(element: object, properties: SubstrateCallbackProperties) {
        turbo(properties).applyDefaults({
            substrate: element ? turbo(element).currentSubstrate : undefined,
            manager: TurboEventManager.instance,
            eventOptions: {},
            toolName: (properties.event as TurboEvent)?.toolName,
            eventType: (properties.event as TurboEvent).type,
            eventTarget: (properties.event as TurboEvent).target
        });
    }

    public solveSubstrateInternal(data: SubstrateDataWithId, properties: SubstrateCallbackProperties) {
        const substrateData = data.data;
        substrateData.passes = new WeakMap();
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
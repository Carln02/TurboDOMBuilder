import {TurboSelector} from "../turboSelector";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {SubstrateSolver} from "./substrate.types";

type PersistentObjectMetadata = {
    ignored?: boolean
};

type TemporaryObjectMetadata = {
    processed?: boolean,
    isMainTarget?: boolean,
};

type SubstrateData = {
    objects: HTMLCollection | NodeList | Set<object>,
    temporaryMetadata: WeakMap<object, TemporaryObjectMetadata>,
    persistentMetadata: WeakMap<object, PersistentObjectMetadata>,
    onActivate: Delegate<() => void>,
    onDeactivate: Delegate<() => void>,
    solvers: Set<SubstrateSolver>
};

type ElementData = {
    substrates: Map<string, SubstrateData>,
    current?: string,
    onChange: Delegate<(prev: string, next: string) => void>
};

export class SubstrateFunctionsUtils {
    private dataMap = new WeakMap<Node, ElementData>;

    public data(element: Node): ElementData {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {} as any;
        if (!this.dataMap.has(element)) this.dataMap.set(element, {
            substrates: new Map(),
            onChange: new Delegate()
        });
        return this.dataMap.get(element);
    }

    public createSubstrate(element: Node, substrate: string): SubstrateData {
        const data: SubstrateData = {
            objects: element instanceof Element ? element.children : element.childNodes,
            temporaryMetadata: new WeakMap(),
            persistentMetadata: new WeakMap(),
            onActivate: new Delegate(),
            onDeactivate: new Delegate(),
            solvers: new Set()
        };
        this.data(element).substrates.set(substrate, data);
        return data;
    }

    public setCurrent(element: Node, substrate: string): boolean {
        if (!this.getSubstrates(element).includes(substrate)) return false;
        this.data(element).current = substrate;
        return true;
    }

    public getSubstrateData(element: Node, substrate: string): SubstrateData {
        return this.data(element).substrates.get(substrate);
    }

    public getSubstrates(element: Node): string[] {
        return [...this.data(element).substrates.keys()];
    }

    public getPersistentMetadata(element: Node, substrate: string, object: object): PersistentObjectMetadata {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.persistentMetadata) return {};
        let metadata = substrateData.persistentMetadata.get(object);
        if (!metadata) {
            metadata = {};
            substrateData.persistentMetadata.set(object, metadata);
        }
        return metadata;
    }

    public setPersistentMetadata(element: Node, substrate: string, object: object, metadata: PersistentObjectMetadata): void {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.persistentMetadata) return;
        substrateData.persistentMetadata.set(object, metadata);
    }

    public getTemporaryMetadata(element: Node, substrate: string, object: object): TemporaryObjectMetadata {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.temporaryMetadata) return;
        let metadata = substrateData.temporaryMetadata.get(object);
        if (!metadata) {
            metadata = {};
            substrateData.temporaryMetadata.set(object, metadata);
        }
        return metadata;
    }

    public setTemporaryMetadata(element: Node, substrate: string, object: object, metadata: TemporaryObjectMetadata): void {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.temporaryMetadata) return;
        substrateData.temporaryMetadata.set(object, metadata);
    }
}
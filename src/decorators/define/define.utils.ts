import {TurboSelector} from "../../turboFunctions/turboSelector";
import {RegistryCategory, RegistryEntry} from "./define.types";

type DefineDataEntry = {
    attributeBridgePass?: boolean;
};

type DefinePrototypeEntry = {
    setupAttributeChangedCallback?: boolean;
    setupConnectedCallback?: boolean;
    name?: string;
    wrappedCreate?: boolean;
};

export class DefineDecoratorUtils {
    public readonly registry: Map<string, Map<string, RegistryEntry>> = new Map();
    private readonly categoryMap: WeakMap<object, string> = new WeakMap();

    private readonly prototypeMap = new WeakMap<object, DefinePrototypeEntry>();
    private readonly dataMap = new WeakMap<Node, DefineDataEntry>();

    // -------------------------------------------------------------------------
    // Category registration
    // -------------------------------------------------------------------------

    /**
     * @description Registers a constructor's associated registry category. Called by each
     * TurboDom base class after its definition to avoid circular import dependencies.
     */
    public setCategory(constructor: new (...args: any[]) => any, category: string): void {
        this.categoryMap.set(constructor.prototype, category);
    }

    public inferCategory(constructor: new (...args: any[]) => any): string {
        let proto = constructor.prototype;
        while (proto && proto !== Object.prototype) {
            const category = this.categoryMap.get(proto);
            if (category) return category;
            proto = Object.getPrototypeOf(proto);
        }
        const p = constructor.prototype;
        if (p instanceof SVGElement) return RegistryCategory.SVGElement;
        if (typeof MathMLElement !== "undefined" && p instanceof MathMLElement) return RegistryCategory.MathMLElement;
        if (p instanceof HTMLElement) return RegistryCategory.HTMLElement;
        if (p instanceof Element) return RegistryCategory.Element;
        if (p instanceof Node) return RegistryCategory.Node;
        return RegistryCategory.Other;
    }

    // -------------------------------------------------------------------------
    // Registry
    // -------------------------------------------------------------------------

    public register(constructor: new (...args: any[]) => any, name: string, tag?: string, category?: string): void {
        const resolvedCategory = category ?? this.inferCategory(constructor);
        const entry: RegistryEntry = {constructor, category: resolvedCategory, name, tag};
        if (!this.registry.has(resolvedCategory)) this.registry.set(resolvedCategory, new Map());
        this.registry.get(resolvedCategory)?.set(name, entry);
    }

    // -------------------------------------------------------------------------
    // Define utils
    // -------------------------------------------------------------------------

    public data(element: Node): DefineDataEntry {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {};
        if (!this.dataMap.has(element)) this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }

    public prototype(prototype: object): DefinePrototypeEntry {
        if (!prototype) return {};
        if (!this.prototypeMap.has(prototype)) this.prototypeMap.set(prototype, {});
        return this.prototypeMap.get(prototype);
    }

    private fieldSetInPrototype(prototype: object, field: string): boolean {
        while (prototype && prototype !== HTMLElement.prototype) {
            if (this.prototype(prototype)[field]) return true;
            prototype = Object.getPrototypeOf(prototype);
        }
        return false;
    }

    public skipAttributeChangedCallback(prototype: object): boolean {
        return this.fieldSetInPrototype(prototype, "setupAttributeChangedCallback");
    }

    public skipConnectedCallback(prototype: object): boolean {
        return this.fieldSetInPrototype(prototype, "setupConnectedCallback");
    }

    public getNamesOfPrototypeChain(prototype: object): string[] {
        const result: string[] = [];
        while (prototype && prototype !== HTMLElement.prototype) {
            const name = this.prototype(prototype).name;
            if (name) result.push(name);
            prototype = Object.getPrototypeOf(prototype);
        }
        return result;
    }
}
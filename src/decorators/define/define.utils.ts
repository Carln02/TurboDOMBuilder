import {TurboSelector} from "../../turboFunctions/turboSelector";

type DefineDataEntry = {
    attributeBridgePass?: boolean
};

type DefinePrototypeEntry = {
    setupAttributeChangedCallback?: boolean,
    setupConnectedCallback?: boolean,
    name?: string;
};

export class DefineDecoratorUtils {
    private prototypeMap = new WeakMap<object, DefinePrototypeEntry>;
    private dataMap = new WeakMap<Node, DefineDataEntry>;

    public data(element: Node) {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {};
        if (!this.dataMap.has(element)) this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }

    public prototype(prototype: object) {
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

    public skipAttributeChangedCallback(prototype: object) {
        return this.fieldSetInPrototype(prototype, "setupAttributeChangedCallback");
    }

    public skipConnectedCallback(prototype: object) {
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
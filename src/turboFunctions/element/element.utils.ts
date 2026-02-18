import {TurboSelector} from "../turboSelector";
import {TurboElementProperties} from "../../turboElement/turboElement.types";

type ElementData = {
    feedforwardElements: Map<string, object>,
    defaultFeedforwardProperties: TurboElementProperties
};

export class ElementFunctionsUtils {
    private dataMap = new WeakMap<Node, ElementData>;

    public data(element: Node): ElementData {
        if (element instanceof TurboSelector) element = element.element;
        if (!element || !this.dataMap.has(element)) {
            const entry = {
                feedforwardElements: new Map(),
                defaultFeedforwardProperties: {}
            };
            if (element) this.dataMap.set(element, entry);
        }
        return this.dataMap.get(element);
    }
}
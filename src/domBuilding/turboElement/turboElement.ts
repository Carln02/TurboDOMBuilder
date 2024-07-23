import {TurboProperties} from "./turboElement.types";
import {kebabToCamelCase, parse} from "../../utils/dataManipulation/stringManipulation";

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
class TurboElement extends HTMLElement {
    constructor(properties: TurboProperties = {}) {
        super();
        if (properties.shadowDOM) this.attachShadow({mode: "open"});
        this.setProperties(properties, true);
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!newValue || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = parse(newValue);
    }

    //Config

    /**
     * @description Static configuration object.
     */
    public static readonly config: any = {shadowDOM: false};

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) (this.config as any)[key] = val;
        });
    }
}

export {TurboElement};
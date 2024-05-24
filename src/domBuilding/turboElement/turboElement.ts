import {TurboProperties} from "./turboElement.types";
import {kebabToCamelCase} from "../../utils/dataManipulation/stringManipulation/kebabToCamelCase";

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

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if (newValue == null || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = newValue;
    }

    //Config

    /**
     * @description Static configuration object.
     */
    static readonly config: any = {shadowDOM: false};

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
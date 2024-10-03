import { TurboProperties } from "./turboElement.types";
/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
declare class TurboElement extends HTMLElement {
    constructor(properties?: TurboProperties);
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
}
export { TurboElement };

import { TurboProperties } from "../../turboElement/turboElement.types";
import { ValidTag } from "../../core.types";
declare global {
    interface Element {
        /**
         * Sets the declared properties to the element.
         * @param {TurboProperties<Tag>} properties - The properties object.
         * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
         * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
         * @returns {this} Itself, allowing for method chaining.
         * @template Tag
         */
        setProperties<Tag extends ValidTag>(properties: TurboProperties<Tag>, setOnlyBaseProperties?: boolean): this;
    }
    interface Node {
        /**
         * @description Destroys the node by removing it from the document and removing all its bound listeners.
         * @returns {this} Itself, allowing for method chaining.
         */
        destroy(): this;
    }
}
export {};

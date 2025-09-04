import {ValidTag} from "../../core.types";
import {TurboProperties} from "../../domBuilding/turboElement/turboElement.types";

declare module "../turboFunctions" {
    interface TurboSelector {
        /**
         * Sets the declared properties to the element.
         * @param {TurboProperties<Tag>} properties - The properties object.
         * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
         * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
         * @returns {this} Itself, allowing for method chaining.
         * @template Tag
         */
        setProperties<Tag extends ValidTag>(properties: TurboProperties<Tag>, setOnlyBaseProperties?: boolean): this;

        /**
         * @description Destroys the node by removing it from the document and removing all its bound listeners.
         * @returns {this} Itself, allowing for method chaining.
         */
        destroy(): this;

        /**
         * @description Sets the value of an attribute on the underlying element.
         * @param {string} name The name of the attribute.
         * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent
         * a true boolean.
         * @returns {this} Itself, allowing for method chaining.
         */
        setAttribute(name: string, value?: string | number | boolean): this;

        /**
         * @description Removes an attribute from the underlying element.
         * @param {string} name The name of the attribute to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAttribute(name: string): this;

        /**
         * @description Causes the element to lose focus.
         * @returns {this} Itself, allowing for method chaining.
         */
        blur(): this;

        /**
         * @description Sets focus on the element.
         * @returns {this} Itself, allowing for method chaining.
         */
        focus(): this;
    }
}

export {};
import {camelToKebabCase} from "../../utils/string-manipulation/camel-to-kebab-case";

function updateObservedFieldProperty(prototype: any, field: string, attribute: string) {
    let descriptor = Object.getOwnPropertyDescriptor(prototype, field) || {
        enumerable: true,
        configurable: true
    };

    Object.defineProperty(prototype, field, {
        get: descriptor.get || function () {
            return this[field];
        },
        set: function (value) {
            if (descriptor.set) descriptor.set.call(this, value);
            else this[field] = value;

            if (this.setAttribute && typeof this.setAttribute === "function") {
                this.setAttribute(attribute, value.toString());
            }
        },
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable
    });
}

/**
 * @description Defines the element as a custom element with the given name, and processes all observed fields
 * and handles them. Use as class decorator in TypeScript (e.g.: @define("my-class")), and as a regular function call
 * in JavaScript (e.g.: define("my-class")(MyClass)).
 * @param {string} elementName - The name of the custom element.
 * @return Function that takes as parameter "constructor," the class to define.
 */
const define = (elementName: string) =>
    (constructor: any) => {
        if (!constructor.observedAttributes) constructor.observedAttributes = [];

        if (constructor.observedFields) {
            constructor.observedFields.forEach((field: string) => {
                const attribute = camelToKebabCase(field);
                constructor.observedAttributes.push(attribute);
                updateObservedFieldProperty(constructor.prototype, field, attribute);
            });
        }

        customElements.define(elementName, constructor);
        return constructor;
    }

export {define};
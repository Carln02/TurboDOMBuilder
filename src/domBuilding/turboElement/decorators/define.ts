import {camelToKebabCase} from "../../../utils/dataManipulation/stringManipulation/camelToKebabCase";

function getPropertyDescriptor(prototype: any, field: string): PropertyDescriptor | undefined {
    while (prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, field);
        if (descriptor) return descriptor;
        prototype = Object.getPrototypeOf(prototype);
    }
    return undefined;
}

function updateObservedFieldProperty(prototype: any, field: string, attribute: string) {
    let descriptor = getPropertyDescriptor(prototype, field) || {
        enumerable: true,
        configurable: true
    };

    Object.defineProperty(prototype, field, {
        get: descriptor.get || function () {
            return this["__" + field];
        },
        set: function (value) {
            if (this["__" + field] === value) return;

            if (descriptor.set) descriptor.set.call(this, value);
            else this["__" + field] = value;

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

import {camelToKebabCase, stringify} from "../../utils/dataManipulation/stringManipulation";

function getPropertyDescriptor(prototype: any, field: string): PropertyDescriptor | undefined {
    while (prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, field);
        if (descriptor) return descriptor;
        prototype = Object.getPrototypeOf(prototype);
    }
    return undefined;
}

/**
 * @description Sets the corresponding property as observed, to sync its changes with a corresponding HTML attribute.
 * @param {HTMLElement} target - The HTML element to observe
 * @param {string} propertyKey - The name of the field to observe
 */
function observe(target: HTMLElement, propertyKey: string): void {
    let constructor = target.constructor as any;
    if (!constructor.observedAttributes) constructor.observedAttributes = [];

    const attributeName = camelToKebabCase(propertyKey);
    const observedFieldKey = Symbol(`__observed__${propertyKey}`);

    constructor.observedAttributes.push(attributeName);

    let descriptor = getPropertyDescriptor(constructor.prototype, propertyKey) || {
        enumerable: true,
        configurable: true
    };

    Object.defineProperty(constructor.prototype, propertyKey, {
        get: descriptor.get || function () {
            return this[observedFieldKey];
        },
        set: function (value) {
            if (this[propertyKey] === value) return;

            if (descriptor.set) descriptor.set.call(this, value);
            else this[observedFieldKey] = value;

            if (typeof this.setAttribute === "function") this.setAttribute(attributeName, stringify(this[observedFieldKey]));
        },
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable
    });

}

export {observe};
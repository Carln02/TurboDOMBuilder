/**
 * @description Defines the element as a custom element with the given name. Use as class decorator in TypeScript
 * (e.g.: @define("my-class")), and as a regular function call in JavaScript (e.g.: define("my-class")(MyClass)).
 * @param {string} elementName - The name of the custom element.
 */
const define = (elementName: string) =>
    (constructor: CustomElementConstructor) =>
        customElements.define(elementName, constructor);

export {define};
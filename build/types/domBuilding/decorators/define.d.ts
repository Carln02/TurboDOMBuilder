/**
 * @description Defines the element as a custom element with the given name. Use as class decorator in TypeScript
 * (e.g.: @define("my-class")), and as a regular function call in JavaScript (e.g.: define("my-class")(MyClass)).
 * If the elementName is not provided, it defaults to the class name.
 * @param {string} [elementName] - The name of the custom element.
 */
declare const define: (elementName?: string) => (constructor: any) => void;
export { define };

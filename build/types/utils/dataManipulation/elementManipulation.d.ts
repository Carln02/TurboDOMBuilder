/**
 * @description Converts a string of tags into an Element.
 * @param {string} text - The string to convert
 * @return The Element
 */
declare function textToElement(text: string): Element;
declare function createProxy<SelfType extends object, ProxiedType extends object>(self: SelfType, proxied: ProxiedType): SelfType & ProxiedType;
export { textToElement, createProxy };

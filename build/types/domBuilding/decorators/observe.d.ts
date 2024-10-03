/**
 * @description Sets the corresponding property as observed, to sync its changes with a corresponding HTML attribute.
 * @param {HTMLElement} target - The HTML element to observe
 * @param {string} propertyKey - The name of the field to observe
 */
declare function observe(target: HTMLElement, propertyKey: string): void;
export { observe };

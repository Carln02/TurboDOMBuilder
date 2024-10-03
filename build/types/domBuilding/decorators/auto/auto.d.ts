import { AutoOptions } from "./auto.types";
/**
 * @function auto
 * @description A decorator that automatically creates a getter or setter if only one of them is defined. Works only
 * with public fields.
 * @param {AutoOptions} [options] - Optional object to configure the decorator.
 * @returns {Function} - The updated property descriptor.
 * @template Type
 */
declare function auto<Type = any>(options?: AutoOptions): Function;
export { auto };

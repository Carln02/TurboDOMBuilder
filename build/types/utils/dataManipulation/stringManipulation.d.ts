/**
 * @description Converts the passed variable into a string.
 * @param value - The variable to convert to string
 * @returns {string} - The string representation of the value
 */
declare function stringify(value: any): string;
/**
 * @description Attempts to convert the passed string back to its original type.
 * @param str - The string to convert back to its original type
 * @returns {any} - The original value
 */
declare function parse(str: string): any;
/**
 * @description Extracts the extension from the given filename or path (e.g.: ".png").
 * @param {string} str - The filename or path
 * @return The extension, or an empty string if not found.
 */
declare function getFileExtension(str?: string): string;
/**
 * @description converts the provided string from camelCase to kebab-case.
 * @param {string} str - The string to convert
 */
declare function camelToKebabCase(str?: string): string;
/**
 * @description converts the provided string from kebab-case to camelCase.
 * @param {string} str - The string to convert
 */
declare function kebabToCamelCase(str?: string): string;
export { stringify, parse, getFileExtension, camelToKebabCase, kebabToCamelCase };

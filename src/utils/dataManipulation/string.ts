import {isUndefined} from "./misc";

/**
 * @group Utilities
 * @category String
 *
 * @description Converts the passed variable into a string.
 * @param value - The variable to convert to string
 * @returns {string} - The string representation of the value
 */
function stringify(value: any): string {
    if (value === null || value === undefined) return undefined;

    switch (typeof value) {
        case "string":
            return value;
        case "number":
        case "boolean":
        case "bigint":
        case "symbol":
        case "function":
            return value.toString();
        case "object":
            if (Array.isArray(value)) return JSON.stringify(value.map(entry => stringify(entry)));
            else if (value instanceof Date) return value.toISOString();
            else if (value instanceof Element) return "[DOM ELEMENT]";
            else {
                try {
                    return JSON.stringify(value);
                } catch {
                    return "[object Object]";
                }
            }
        default:
            return String(value);
    }
}

/**
 * @group Utilities
 * @category String
 *
 * @description Attempts to convert the passed string back to its original type.
 * @param str - The string to convert back to its original type
 * @returns {any} - The original value
 */
function parse(str: string): any {
    if (isUndefined(str)) return undefined;
    switch (str) {
        case "null":
            return null;
        case "true":
            return true;
        case "false":
            return false;
    }

    if (!isNaN(Number(str))) return Number(str);
    if (/^\d+n$/.test(str)) return BigInt(str.slice(0, -1));

    if (str.startsWith("function") || str.startsWith("(")) {
        try {
            const parsedFunction = new Function(`return (${str})`)();
            if (typeof parsedFunction === "function") return parsedFunction;
        } catch {
        }
    }

    try {
        const parsed = JSON.parse(str);
        if (typeof parsed === "object" && parsed != null) return parsed;
    } catch {
    }

    return str;
}

/**
 * @group Utilities
 * @category String
 *
 * @description Extracts the extension from the given filename or path (e.g.: ".png").
 * @param {string} str - The filename or path
 * @return The extension, or an empty string if not found.
 */
function getFileExtension(str?: string): string {
    if (!str || str.length == 0) return "";
    const match = str.match(/\.\S{1,4}$/);
    return match ? match[0] : "";
}

/**
 * @group Utilities
 * @category String
 *
 * @description converts the provided string from camelCase to kebab-case.
 * @param {string} str - The string to convert
 */
function camelToKebabCase(str?: string): string {
    if (!str || str.length == 0) return;
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * @group Utilities
 * @category String
 *
 * @description converts the provided string from kebab-case to camelCase.
 * @param {string} str - The string to convert
 */
function kebabToCamelCase(str?: string): string {
    if (!str || str.length == 0) return;
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

export {stringify, parse, getFileExtension, camelToKebabCase, kebabToCamelCase};
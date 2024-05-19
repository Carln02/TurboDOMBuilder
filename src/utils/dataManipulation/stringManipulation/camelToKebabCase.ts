/**
 * @description converts the provided string from camelCase to kebab-case.
 * @param {string} str - The string to convert
 */
function camelToKebabCase(str?: string): string {
    if (!str || str.length == 0) return;
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export {camelToKebabCase};
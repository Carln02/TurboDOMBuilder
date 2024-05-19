/**
 * @description converts the provided string from kebab-case to camelCase.
 * @param {string} str - The string to convert
 */
function kebabToCamelCase(str?: string): string {
    if (!str || str.length == 0) return;
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

export {kebabToCamelCase};
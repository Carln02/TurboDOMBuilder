/**
 * @description Extracts the extension from the given filename or path (e.g.: ".png").
 * @param {string} str - The filename or path
 * @return The extension, or an empty string if not found.
 */
function getFileExtension(str?: string): string {
    if (!str || str.length == 0) return "";
    const match = str.match(/\.\S{1,4}$/);
    return match ? match[0] : "";
}

export {getFileExtension};
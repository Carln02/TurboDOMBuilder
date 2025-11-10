/**
 * @group Utilities
 * @category Color
 *
 * @description Computes the luminance of a color
 * @param {string} color - The color in Hex format
 * @return The luminance value, or NaN if the color is not valid.
 */
function luminance(color?: string): number {
    if (!color) return NaN;

    const rgb = parseInt(color.substring(1), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = ((rgb >> 0) & 0xff) / 255;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export {luminance};
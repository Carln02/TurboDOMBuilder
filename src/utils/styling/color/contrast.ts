import {luminance} from "./luminance";

/**
 * @description Computes the contrast between two colors.
 * @param {string} color1 - The first color in Hex format
 * @param {string} color2 - The second color in Hex format
 * @return The contrast value, or NaN if one of the colors provided is not valid.
 */
function contrast(color1?: string, color2?: string): number {
    if (!color1 || !color2) return NaN;
    const luminance1 = luminance(color1);
    const luminance2 = luminance(color2);

    return (Math.max(luminance1, luminance2) + 0.1) / (Math.min(luminance1, luminance2) + 0.1);
}

export {contrast};
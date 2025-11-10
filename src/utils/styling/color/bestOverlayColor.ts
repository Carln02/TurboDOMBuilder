import {contrast} from "./contrast";

/**
 * @group Utilities
 * @category Color
 *
 * @description Evaluates the best color out of two provided options to put on top of a base color in terms of contrast
 * (for readability).
 * @param {string} baseColor - The base color in Hex format.
 * @param {string} [overlayColor1="#000000"] - The first overlay color to evaluate in Hex format. Defaults to black.
 * @param {string} [overlayColor2="#FFFFFF"] - The second overlay color to evaluate in Hex format. Defaults to white.
 */
function bestOverlayColor(baseColor: string, overlayColor1: string = "#000000", overlayColor2: string = "#FFFFFF") {
    const contrastLight = contrast(baseColor, overlayColor2);
    const contrastDark = contrast(overlayColor1, baseColor);
    return contrastLight > contrastDark ? overlayColor2 : overlayColor1;
}

export {bestOverlayColor};
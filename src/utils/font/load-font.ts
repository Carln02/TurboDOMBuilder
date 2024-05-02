import {addStylesheet} from "../../turbo-functions/style-manipulation/add-stylesheet";
import {css} from "../../turbo-functions/style-manipulation/css";
import {FontProperties} from "./font-types";
import {getFileExtension} from "../string-manipulation/get-file-extension";

/**
 * @description Default font weights, sub-names, and styles when loading a font family.
 */
const defaultFamilyWeights = {
    900: {"Black": "normal", "BlackItalic": "italic"},
    800: {"ExtraBold": "normal", "ExtraBoldItalic": "italic"},
    700: {"Bold": "normal", "BoldItalic": "italic"},
    600: {"SemiBold": "normal", "SemiBoldItalic": "italic"},
    500: {"Medium": "normal", "MediumItalic": "italic"},
    400: {"Regular": "normal", "Italic": "italic"},
    300: {"Light": "normal", "LightItalic": "italic"},
    200: {"ExtraLight": "normal", "ExtraLightItalic": "italic"},
    100: {"Thin": "normal", "ThinItalic": "italic"},
};


function createFontFace(name: string, path: string, format: string, weight: string, style: string): string {
    return css`
        @font-face {
            font-family: "${name}";
            src: local("${name}"), url("${path}") format("${format}");
            font-weight: "${weight}";
            font-style: "${style}";
        }`;
}

/**
 * @description Loads a local font file, or a family of fonts from a directory.
 * @param {FontProperties} font - The font properties
 */
function loadLocalFont(font: FontProperties) {
    if (!font.name || !font.pathOrDirectory) console.error("Please specify font name and path/directory");

    const isFamily = getFileExtension(font.pathOrDirectory).length == 0;
    if (!font.stylesPerWeights) font.stylesPerWeights = isFamily ? defaultFamilyWeights : {"normal": "normal"};
    if (!font.format) font.format = "woff2";

    if (!font.extension) font.extension = ".ttf";
    if (font.extension[0] != ".") font.extension = "." + font.extension;

    addStylesheet(
        Object.entries(font.stylesPerWeights).map(([weight, value]) => {
            if (typeof value == "string")
                return createFontFace(font.name, font.pathOrDirectory, font.format, weight, value);

            return Object.entries(value).map(([weightName, style]) =>
                createFontFace(font.name, `${font.pathOrDirectory}/${font.name}-${weightName}${font.extension}`,
                    font.format, weight, style as string)
            ).join("\n");
        }).join("\n")
    );
}

export {loadLocalFont};
import {textToElement} from "../elementManipulation/textToElement";

/**
 * @description Fetches an SVG from the given path, then executes on it the provided callback
 * @param {string} path - The path to the SVG
 * @param {(svgManipulation: SVGElement) => void} onLoaded - The callback to execute
 */
function fetchSvg(path: string, onLoaded: (svg: SVGElement) => void): void {
    if (!path || path.length == 0) return;
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok while loading your SVG");
            }
            return response.text();
        })
        .then(svgText => {
            let svg = textToElement(svgText) as SVGElement;
            if (svg && onLoaded) {
                onLoaded(svg);
            }
        })
        .catch(error => console.error("Error fetching SVG:", error));
}

export {fetchSvg};
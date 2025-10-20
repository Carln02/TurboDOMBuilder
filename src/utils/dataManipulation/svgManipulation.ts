import {textToElement} from "./elementManipulation";

/**
 * @description Fetches an SVG from the given path
 * @param {string} path - The path to the SVG
 * @param logError
 * @returns An SVGElement promise
 */
function fetchSvg(path: string, logError: boolean = true): Promise<SVGElement> {
    return new Promise((resolve, reject) => {
        if (!path || path.length === 0) {
            reject(new Error("Invalid path"));
            return;
        }

        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok while loading your SVG");
                return response.text();
            })
            .then(svgText => {
                const svg = textToElement(svgText) as SVGElement;
                if (!svg) throw new Error("Error parsing SVG text");
                resolve(svg);
            })
            .catch(error => {
                if (!logError) reject(error);
                console.error("Error fetching SVG:", error);
                reject(error);
            });
    });
}

export {fetchSvg};
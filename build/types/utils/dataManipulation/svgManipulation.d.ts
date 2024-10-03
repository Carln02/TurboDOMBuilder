/**
 * @description Fetches an SVG from the given path
 * @param {string} path - The path to the SVG
 * @returns An SVGElement promise
 */
declare function fetchSvg(path: string): Promise<SVGElement>;
export { fetchSvg };

import {fetchSvg} from "./fetchSvg";

/**
 * @class SvgCache
 * @description Class representing a cache for SVG files. Use it to not fetch the same SVG file multiple times.
 */
class SvgCache {
    /**
     * @description The instance's current cache
     */
    public readonly cache: Record<string, SVGElement> = {};

    /**
     * @description Fetches an SVG from the given path, then executes on it the provided callback, and stores it in
     * the cache.
     * @param {string} path - The path to the SVG
     * @param {(svgManipulation: SVGElement) => void} onLoaded - The callback to execute
     */
    fetchSvg(path: string, onLoaded: (svg: SVGElement) => void): void {
        if (!path || path.length == 0) return;

        let savedEl = this.cache[path];
        if (savedEl) {
            onLoaded(savedEl.cloneNode(true) as SVGElement);
            return;
        }

        fetchSvg(path, (svg) => {
            this.cache[path] = svg.cloneNode(true) as SVGElement;
            onLoaded(svg);
        });
    }
}

export {SvgCache};
import {fetchSvg} from "./svg-fetcher";

class SvgCache {
    cache: Record<string, SVGElement> = {};

    fetchSvg(path: any, onLoaded: (svg: SVGElement) => void): void {
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
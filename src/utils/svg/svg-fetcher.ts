import {element} from "../../components/element";


function convertTextToElement(text: string): Element {
    let wrapper = element();
    wrapper.innerHTML = text;
    return wrapper.children[0];
}

function fetchSvg(path: any, onLoaded: (svg: SVGElement) => void) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok while loading your SVG");
            }
            return response.text();
        })
        .then(svgText => {
            let svg = convertTextToElement(svgText) as SVGElement;
            if (svg && onLoaded) {
                onLoaded(svg);
            }
        })
        .catch(error => console.error("Error fetching SVG:", error));
}

export {fetchSvg};
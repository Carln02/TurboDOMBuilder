import {TurboCompatible, TurboProperties} from "../../core/definitions/turbo-types";
import {addStylesheet} from "../style-manipulation/add-stylesheet";
import {addClass} from "../class-manipulation/add-class";
import {addListener} from "../listener-manipulation/add-listener";
import {addChild} from "../child-manipulation/add-child";
import {getElement} from "./get-element";

/**
 * Sets the declared properties to the provided element.
 * @param {TurboCompatible} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @return The element itself.
 */
function setProperties(element: TurboCompatible, properties: TurboProperties = {}): TurboCompatible {
    let htmlElement: Element = getElement(element);

    Object.keys(properties).forEach(property => {
        switch (property) {
            case "tag" || "shadowDOM":
                return;
            case "text":
                if (!(htmlElement instanceof HTMLElement)) return;
                htmlElement.innerText = properties.text;
                return;
            case "style":
                if (!(htmlElement instanceof  HTMLElement || htmlElement instanceof SVGElement)) return;
                htmlElement.style.cssText += properties.style;
                return;
            case "stylesheet":
                addStylesheet(properties.stylesheet, "root" in element ? element.root : document.head);
                return;
            case "classes":
                addClass(htmlElement, properties.classes);
                return;
            case "listeners":
                Object.keys(properties.listeners).forEach(listenerType =>
                    addListener(htmlElement, listenerType, properties.listeners[listenerType]));
                return;
            case "children":
                addChild(htmlElement, properties.children);
                return;
            case "parent":
                addChild(properties.parent, htmlElement);
                return;
            default:
                htmlElement.setAttribute(property, properties[property]);
                return;
        }
    });

    return element;
}

export {setProperties};
import {TurboProperties} from "../../core/definitions/turbo-types";
import {addStylesheet} from "../style-manipulation/add-stylesheet";
import {addClass} from "../class-manipulation/add-class";
import {addListener} from "../listener-manipulation/add-listener";
import {addChild} from "../child-manipulation/add-child";

/**
 * Sets the declared properties to the provided element.
 * @param {HTMLElement} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @return The element itself.
 */
function setProperties(element: HTMLElement, properties: TurboProperties = {}): HTMLElement {
    Object.keys(properties).forEach(property => {
        switch (property) {
            case "tag" || "shadowDOM":
                return;
            case "text":
                if (properties.text) element.innerText = properties.text;
                return;
            case "style":
                element.style.cssText += properties.style;
                return;
            case "stylesheet":
                addStylesheet(properties.stylesheet, "root" in element ? element.root as ShadowRoot : document.head);
                return;
            case "classes":
                addClass(element, properties.classes);
                return;
            case "listeners":
                if (properties.listeners) Object.keys(properties.listeners).forEach(listenerType =>
                    addListener(element, listenerType, properties.listeners[listenerType]));
                return;
            case "children":
                addChild(element, properties.children);
                return;
            case "parent":
                if (properties.parent) addChild(properties.parent, element);
                return;
            default:
                element.setAttribute(property, properties[property]);
                return;
        }
    });

    return element;
}

export {setProperties};
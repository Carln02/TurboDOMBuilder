import {ElementTagMap, TurboProperties} from "../../turboElement/turboElement.types";
import {closestRoot} from "./closestRoot";
import {stylesheet} from "../../elementCreation/misc/stylesheet";

/**
 * Sets the declared properties to the provided element.
 * @param {Element} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @param {boolean} [setOnlyBaseProperties="false"] - If set to true, will only set the base turbo properties (classes,
 * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
 * @return The element itself.
 */
function setProperties<T extends keyof ElementTagMap = "div">(element: Element, properties:
    TurboProperties<T> = {} as TurboProperties<T>, setOnlyBaseProperties: boolean = false): Element {

    Object.keys(properties).forEach(property => {
        switch (property) {
            case "tag" || "namespace" || "shadowDOM":
                return;
            case "text":
                if (!(element instanceof HTMLElement)) return;
                element.innerText = properties.text;
                return;
            case "style":
                if (!(element instanceof  HTMLElement || element instanceof SVGElement)) return;
                element.style.cssText += properties.style;
                return;
            case "stylesheet":
                stylesheet(properties.stylesheet, closestRoot(element));
                return;
            case "id":
                element.id = properties.id;
                return;
            case "classes":
                element.addClass(properties.classes);
                return;
            case "listeners":
                Object.keys(properties.listeners).forEach(listenerType =>
                    element.addListener(listenerType, properties.listeners[listenerType]));
                return;
            case "children":
                element.addChild(properties.children);
                return;
            case "parent":
                properties.parent.addChild(element);
                return;
            default:
                if (setOnlyBaseProperties) return;
                try {
                    (element as any)[property] = properties[property];
                } catch (e) {
                    console.error(e);
                }
                return;
        }
    });

    return element;
}

export {setProperties};
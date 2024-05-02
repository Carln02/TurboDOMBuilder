import {ElementTagMap, TurboCompatible, TurboProperties} from "../../core/definitions/turbo-types";
import {addStylesheet} from "../style-manipulation/add-stylesheet";
import {addClass} from "../class-manipulation/add-class";
import {addListener} from "../listener-manipulation/add-listener";
import {addChild} from "../child-manipulation/add-child";
import {getElement} from "./get-element";
import {camelToKebabCase} from "../../utils/string-manipulation/camel-to-kebab-case";
import {getClosestRoot} from "./get-closest-root";

/**
 * Sets the declared properties to the provided element.
 * @param {TurboCompatible} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @param {boolean} [setOnlyBaseProperties="false"] - If set to true, will only set the base turbo properties (classes,
 * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
 * @return The element itself.
 */
function setProperties<T extends keyof ElementTagMap = "div">(element: TurboCompatible, properties:
    TurboProperties<T> = {} as TurboProperties<T>, setOnlyBaseProperties: boolean = false): TurboCompatible {
    let htmlElement: Element = getElement(element);

    Object.keys(properties).forEach(property => {
        switch (property) {
            case "tag" || "namespace" || "shadowDOM":
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
                addStylesheet(properties.stylesheet, getClosestRoot(element));
                return;
            case "id":
                htmlElement.id = properties.id;
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
                if (setOnlyBaseProperties) return;
                try {(htmlElement as any)[property] = properties[property]}
                catch (e) {console.error(e)}
                return;
        }
    });

    return element;
}

export {setProperties};
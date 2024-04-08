import {TurboCompatible} from "../../core/definitions/turbo-types";
import {getElement} from "../element-manipulation/get-element";

/**
 * @description Adds the provided event listener to the element.
 * @param {TurboCompatible} element - The element to which the event listener should be applied.
 * @param {string} type - The type of the event.
 * @param {EventListenerOrEventListenerObject | (e: Event, el: TurboCompatible) => void} listener - The function
 * or object that receives a notification. Has (optionally) two parameters: the event, and the element itself.
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the
 * event listener.
 * @return The element itself
 */
function addListener(element: TurboCompatible | undefined, type: string, listener: EventListenerOrEventListenerObject |
    ((e: Event, el: TurboCompatible) => void), options?: boolean | AddEventListenerOptions): TurboCompatible {
    if (!element) return element;

    const wrappedListener = (e: Event) => {
        if (typeof listener === "function") listener(e, element);
        else if (typeof listener === "object" && listener.handleEvent) listener.handleEvent(e);
    };

    getElement(element).addEventListener(type, wrappedListener as EventListenerOrEventListenerObject, options);
    return element;
}

export {addListener};
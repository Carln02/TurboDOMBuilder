/**
 * @description Adds the provided event listener to the element.
 * @param {Element} element - The element to which the event listener should be applied.
 * @param {string} type - The type of the event.
 * @param {EventListenerOrEventListenerObject | (e: Event, el: Element) => void} listener - The function
 * or object that receives a notification. Has (optionally) two parameters: the event, and the element itself.
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the
 * event listener.
 * @return The element itself
 */
function addListener(element: Element | undefined, type: string, listener: EventListenerOrEventListenerObject |
    ((e: Event, el: Element) => void), options?: boolean | AddEventListenerOptions): Element {
    if (!element) return element;

    const wrappedListener = (e: Event) => {
        if (typeof listener === "function") listener(e, element);
        else if (typeof listener === "object" && listener.handleEvent) listener.handleEvent(e);
    };

    element.addEventListener(type, wrappedListener as EventListenerOrEventListenerObject, options);
    return element;
}

export {addListener};
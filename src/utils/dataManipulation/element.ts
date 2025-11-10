/**
 * @group Utilities
 * @category Element
 *
 * @description Converts a string of tags into an Element.
 * @param {string} text - The string to convert
 * @return The Element
 */
function textToElement(text: string): Element {
    let wrapper = document.createElement("div");
    wrapper.innerHTML = text;
    return wrapper.children[0];
}

/**
 * @group Utilities
 * @category Element
 */
function createProxy<SelfType extends object, ProxiedType extends object>(self: SelfType, proxied: ProxiedType)
    : SelfType & ProxiedType {
    return new Proxy(self, {
        get(target, prop, receiver) {
            if (prop in target) return Reflect.get(target, prop, receiver);
            if (prop in proxied) return Reflect.get(proxied, prop, receiver);
            return undefined;
        },
        set(target, prop, value, receiver) {
            if (prop in target) return Reflect.set(target, prop, value, receiver);
            return Reflect.set(proxied, prop, value, receiver);
        }
    }) as SelfType & ProxiedType;
}

export {textToElement, createProxy};
function getFirstDescriptorInChain(object: object, key: PropertyKey): PropertyDescriptor {
    let currentObject: any = object;
    while (currentObject && currentObject !== HTMLElement.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor) return descriptor;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}

function hasPropertyInChain(object: object, key: PropertyKey): boolean {
    let currentObject: any = object;
    while (currentObject && currentObject !== HTMLElement.prototype) {
        if (Object.prototype.hasOwnProperty.call(currentObject, key)) return true;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return false;
}

function getFirstPrototypeInChainWith(object: object, key: PropertyKey): any {
    let currentObject: any = Object.getPrototypeOf(object);
    while (currentObject && currentObject !== HTMLElement.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor) return currentObject;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}

function getSuperMethod(object: object, key: PropertyKey, wrapperFn: Function): Function {
    let currentObject: any = Object.getPrototypeOf(object);
    while (currentObject && currentObject !== HTMLElement.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        const fn = descriptor?.value ?? descriptor?.get ?? descriptor?.set;
        if (typeof fn === "function" && fn !== wrapperFn) return fn;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}


export {getFirstDescriptorInChain, getFirstPrototypeInChainWith, hasPropertyInChain, getSuperMethod};
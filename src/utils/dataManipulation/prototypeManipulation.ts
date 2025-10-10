function getFirstDescriptorInChain(object: object, key: PropertyKey): PropertyDescriptor {
    let currentObject: any = object;
    while (currentObject) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor) return descriptor;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}

function hasPropertyInChain(object: object, key: PropertyKey): boolean {
    let currentObject: any = object;
    while (currentObject) {
        if (Object.prototype.hasOwnProperty.call(currentObject, key)) return true;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return false;
}

function getFirstPrototypeInChainWith(object: object, key: PropertyKey): any {
    let currentObject: any = Object.getPrototypeOf(object);
    while (currentObject) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor) return currentObject;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}

export {getFirstDescriptorInChain, getFirstPrototypeInChainWith, hasPropertyInChain};
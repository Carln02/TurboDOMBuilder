/**
 * @group Utilities
 * @category Prototype
 */
function getFirstDescriptorInChain(object: object, key: PropertyKey): PropertyDescriptor {
    let currentObject: any = object;
    while (currentObject && currentObject !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor) return descriptor;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}

/**
 * @group Utilities
 * @category Prototype
 */
function hasPropertyInChain(object: object, key: PropertyKey): boolean {
    let currentObject: any = object;
    while (currentObject && currentObject !== Object.prototype) {
        if (Object.prototype.hasOwnProperty.call(currentObject, key)) return true;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return false;
}

/**
 * @group Utilities
 * @category Prototype
 */
function getFirstPrototypeInChainWith(object: object, key: PropertyKey): any {
    let currentObject: any = Object.getPrototypeOf(object);
    while (currentObject && currentObject !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor) return currentObject;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}

/**
 * @group Utilities
 * @category Prototype
 */
function getSuperMethod(object: object, key: PropertyKey, wrapperFn: Function): Function {
    let currentObject: any = Object.getPrototypeOf(object);
    while (currentObject && currentObject !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        const fn = descriptor?.value ?? descriptor?.get ?? descriptor?.set;
        if (typeof fn === "function" && fn !== wrapperFn) return fn;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}

/**
 * @group Utilities
 * @category Prototype
 */
function getSuperDescriptor(object: object, key: PropertyKey): PropertyDescriptor {
    let currentObject = Object.getPrototypeOf(object);
    if (currentObject) currentObject = Object.getPrototypeOf(currentObject);

    while (currentObject && currentObject !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor) return descriptor;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}

/**
 * @group Utilities
 * @category Prototype
 */
function getPrototypeChain(object: object) {
    const chain: any[] = [];
    let constructor = typeof object === "function" ? object : Object.getPrototypeOf(object);
    while (constructor && constructor !== Function.prototype) {
        chain.push(constructor);
        constructor = Object.getPrototypeOf(constructor);
    }
    return chain;
}

/**
 * @group Utilities
 * @category Prototype
 */
function getConstructorChain(object: object): any[] {
    const chain: any[] = [];
    let constructor = typeof object === "function" ? object : object.constructor;
    while (constructor && constructor !== Object) {
        chain.push(constructor);
        constructor = Object.getPrototypeOf(constructor);
    }
    return chain;
}

export {getPrototypeChain, getConstructorChain, getFirstDescriptorInChain, getFirstPrototypeInChainWith, hasPropertyInChain, getSuperMethod, getSuperDescriptor};
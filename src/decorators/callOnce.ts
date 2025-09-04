/**
 * @function callOnce
 * @description A decorator that ensures a method is called only once on a given instance. If the method is called
 * more than once, a warning is logged to the console.
 * @param {any} target - The target object.
 * @param {string} propertyKey - The name of the method being decorated.
 * @param {PropertyDescriptor} [descriptor=Object.getOwnPropertyDescriptor(target, propertyKey)] - The property
 * descriptor of the method.
 * @returns {PropertyDescriptor} - The updated property descriptor.
 */
function callOnce(target: any, propertyKey: string, descriptor: PropertyDescriptor
    = Object.getOwnPropertyDescriptor(target, propertyKey)): PropertyDescriptor {
    const originalMethod = descriptor?.value;
    if (!originalMethod) throw new Error(`No method ${propertyKey} found on target`);

    const calledFlagKey = Symbol(`__callOnce__${propertyKey}`);

    descriptor.value = function (...args: any[]) {
        if (!this[calledFlagKey]) {
            this[calledFlagKey] = true;
            return originalMethod.apply(this, args);
        } else {
            console.warn(`Function ${propertyKey} has already been called once on this instance and will not be called again.`);
        }
    };

    return descriptor;
}

/**
 * @function callOncePerInstance
 * @description A function wrapper that ensures the wrapped function is called only once per instance.
 * @param {Function} fn - The function to wrap.
 * @param {string|symbol} [key=Symbol(`__callOncePerInstance__${fn.name}`)] - A unique key to track if the function
 * has been called.
 * @returns {Function} - The wrapped function that will only execute once per instance.
 */
function callOncePerInstance(fn: Function, key: string | symbol
    = Symbol(`__callOncePerInstance__${fn.name}`)): Function {
    return function (this: any, ...args: any[]) {
        if (!this[key]) {
            this[key] = true;
            return fn.apply(this, args);
        }
    };
}

export {callOnce, callOncePerInstance};
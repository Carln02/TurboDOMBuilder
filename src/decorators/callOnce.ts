const onceRegistry = new WeakMap<(...args: any[]) => any, (...args: any[]) => any>();

/**
 * @function callOnce
 * @group Decorators
 * @category Augmentation
 *
 * @template {(...args: any[]) => any} Type
 * @description Function wrapper that ensures the passed function is called only once.
 * Subsequent calls will just return the cached computed result (if any) of the first call of that function.
 * @param {Type} fn - The function to process.
 *
 * @example
 * ```ts
 * const init = callOnce(function () { ... });
 * const out = init();
 * ```
 */
function callOnce<Type extends (...args: any[]) => any>(fn: Type): Type {
    if (onceRegistry.has(fn)) return onceRegistry.get(fn)! as Type;

    let called = false;
    let result: ReturnType<Type>;
    let promise: Promise<any>;

    const wrapper = function (this: any, ...args: Parameters<Type>): ReturnType<Type> {
        if (called) return result;
        if (promise) return promise as ReturnType<Type>;

        try {
            const out = fn.apply(this, args);
            if (out instanceof Promise) {
                promise = out.then((val) => {
                    result = val;
                    called = true;
                    promise = null;
                    return val;
                }).catch((err) => {
                    promise = null;
                    throw err;
                });
                return promise as ReturnType<Type>;
            } else {
                result = out;
                called = true;
                return out;
            }
        } catch (err) {throw err}
    } as Type;

    onceRegistry.set(fn, wrapper);
    return wrapper;
}

/**
 * @decorator
 * @function callOncePerInstance
 * @group Decorators
 * @category Augmentation
 *
 * @description Stage-3 method decorator. It ensures a method in a class is called only once per instance.
 * Subsequent calls will be canceled and log a warning. Works for instance or static methods.
 *
 * @example
 * ```ts
 *   class A {
 *     @callOnce init() { ... }
 *   }
 * ```
 */
function callOncePerInstance<Type extends object>(
    value: (this: Type, ...args: any[]) => any,
    context: ClassMethodDecoratorContext<Type>
): any {
    if (context.kind !== "method") throw new Error(`@callOnce can only be used on methods (got: ${context.kind}).`);

    const name = String(context.name);
    const flag = Symbol(`__callOnce__${name}`);

    return function (this: any, ...args: any[]) {
        if (this[flag]) {
            console.warn(`Function ${name} has already been called once on this instance and will not be called again.`);
            return;
        }
        this[flag] = true;
        return value.apply(this, args);
    };
}

export {callOnce, callOncePerInstance};
/**
/**
 * @function callOnce
 * @description Stage-3 method decorator: ensures a method is called only once per instance.
 * Subsequent calls no-op and log a warning. Works for instance or static methods.
 *
 * Usage:
 *   class A {
 *     @callOnce
 *     init() { ... }
 *   }
 */
function callOnce<T extends object>(value: (this: T, ...args: any[]) => any, ctx: ClassMethodDecoratorContext<T>): any {
    if (ctx.kind !== "method") {
        throw new Error(`@callOnce can only be used on methods (got: ${ctx.kind}).`);
    }

    const name = String(ctx.name);
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

/**
 * @function callOncePerInstance
 * @description Stage-3 method decorator (factory) that ensures the method
 * runs only once per *instance*. Later calls no-op. If you pass a `key`,
 * all methods decorated with the same key on the same instance share the
 * same gate (i.e., only the first of them will run once).
 *
 * Usage:
 *   class A {
 *     @callOncePerInstance()           // unique per method
 *     init() { ... }
 *
 *     @callOncePerInstance("bootKey")  // shared gate with others using "bootKey"
 *     boot() { ... }
 *   }
 */
function callOncePerInstance(key?: string | symbol) {
    return function <T extends object>(
        value: (this: T, ...args: any[]) => any,
        ctx: ClassMethodDecoratorContext<T>
    ) {
        if (ctx.kind !== "method") {
            throw new Error(`@callOncePerInstance can only be used on methods (got: ${ctx.kind}).`);
        }

        const name = String(ctx.name);
        const flag = key ?? Symbol(`__callOncePerInstance__${name}`);

        return function (this: any, ...args: any[]) {
            if (this[flag]) return;
            this[flag] = true;
            return value.apply(this, args);
        };
    };
}

export {callOnce, callOncePerInstance};
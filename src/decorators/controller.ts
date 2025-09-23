import {Mvc} from "../mvc/mvc";

/**
 * @internal
 */
function inferKey(name: string, type: "Controller" | "Handler", context: ClassFieldDecoratorContext) {
    return name ?? (String(context.name).endsWith(type)
        ? String(context.name).slice(0, -type.length)
        : String(context.name));
}

/**
 * @internal
 */
function generateField(context: ClassFieldDecoratorContext, type: "Controller" | "Handler", name?: string) {
    const cacheKey = Symbol(`__${type.toLowerCase()}_${String(context.name)}`);
    const keyName = inferKey(name, type, context);

    context.addInitializer(function () {
        Object.defineProperty(this, context.name, {
            configurable: true,
            enumerable: false,
            get: function () {
                if (this[cacheKey]) return this[cacheKey];

                let value: unknown;
                if (type === "Controller") {
                    if (this.mvc && this.mvc instanceof Mvc) value = this.mvc.getController(keyName);
                    else if (this.getController && typeof this.getController === "function") value = this.getController(keyName);
                } else {
                    if (this.mvc && this.mvc instanceof Mvc) value = this.mvc.getHandler(keyName);
                    else if (this.getHandler && typeof this.getHandler === "function") value = this.getHandler(keyName);
                }
                if (!value) throw new Error(`${type} "${keyName}" not found on ${this?.constructor?.name}.`);
                this[cacheKey] = value;
                return value;
            },
            set: function (value: unknown) { this[cacheKey] = value; }
        });
    });
}

/**
 * @decorator
 * @function controller
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched controller.
 * @param {string} [name] - The key name of the controller in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingController`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @controller() protected textController: TurboController;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textController(): TurboController {
 *    if (this.mvc instanceof Mvc) return this.mvc.getController("text");
 *    if (typeof this.getController === "function") return this.getController("text");
 * }
 * ```
 */
function controller(name?: string) {
    return function (_unused: unknown, context: ClassFieldDecoratorContext) {
        generateField(context, "Controller", name);
    };
}

/**
 * @decorator
 * @function handler
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched handler.
 * @param {string} [name] - The key name of the handler in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingHandler`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @handler() protected textHandler: TurboHandler;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textHandler(): TurboHandler {
 *    if (this.mvc instanceof Mvc) return this.mvc.getHandler("text");
 *    if (typeof this.getHandler === "function") return this.getHandler("text");
 * }
 * ```
 */
function handler(name?: string) {
    return function (_unused: unknown, context: ClassFieldDecoratorContext) {
        generateField(context, "Handler", name);
    };
}

export {controller, handler};
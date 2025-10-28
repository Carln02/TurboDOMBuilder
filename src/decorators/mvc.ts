import {Mvc} from "../mvc/mvc";

type FieldType = "Controller" | "Handler" | "Interactor" | "Tool" | "Substrate";

/**
 * @internal
 */
function inferKey(name: string, type: FieldType, context: ClassFieldDecoratorContext) {
    return name ?? (String(context.name).endsWith(type)
        ? String(context.name).slice(0, -type.length)
        : String(context.name));
}

/**
 * @internal
 */
function generateField(context: ClassFieldDecoratorContext, type: FieldType, name?: string) {
    const cacheKey = Symbol(`__${type.toLowerCase()}_${String(context.name)}`);
    const keyName = inferKey(name, type, context);

    context.addInitializer(function () {
        Object.defineProperty(this, context.name, {
            configurable: true,
            enumerable: false,
            get: function () {
                if (this[cacheKey]) return this[cacheKey];

                let value: unknown;
                let functionName: string;

                switch (type) {
                    case "Controller":
                        functionName = "getController";
                        break;
                    case "Handler":
                        functionName = "getHandler";
                        break;
                    case "Interactor":
                        functionName = "getInteractor";
                        break;
                    case "Tool":
                        functionName = "getTool";
                        break;
                    case "Substrate":
                        functionName = "getSubstrate";
                        break;
                }

                if (!functionName) return;
                if (this.mvc && this.mvc instanceof Mvc) value = this.mvc[functionName](keyName);
                else if (this[functionName] && typeof this[functionName] === "function") value = this[functionName](keyName);
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

/**
 * @decorator
 * @function interactor
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched interactor.
 * @param {string} [name] - The key name of the interactor in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingInteractor`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @interactor() protected textInteractor: TurboInteractor;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textInteractor(): TurboInteractor {
 *    if (this.mvc instanceof Mvc) return this.mvc.getInteractor("text");
 *    if (typeof this.getInteractor === "function") return this.getInteractor("text");
 * }
 * ```
 */
function interactor(name?: string) {
    return function (_unused: unknown, context: ClassFieldDecoratorContext) {
        generateField(context, "Interactor", name);
    };
}

/**
 * @decorator
 * @function tool
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched tool.
 * @param {string} [name] - The key name of the tool in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingTool`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @tool() protected textTool: TurboTool;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textTool(): TurboTool {
 *    if (this.mvc instanceof Mvc) return this.mvc.getTool("text");
 *    if (typeof this.getTool === "function") return this.getTool("text");
 * }
 * ```
 */
function tool(name?: string) {
    return function (_unused: unknown, context: ClassFieldDecoratorContext) {
        generateField(context, "Tool", name);
    };
}

/**
 * @decorator
 * @function substrate
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched substrate.
 * @param {string} [name] - The key name of the substrate in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingSubstrate`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @tool() protected textSubstrate: TurboSubstrate;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textSubstrate(): TurboSubstrate {
 *    if (this.mvc instanceof Mvc) return this.mvc.getSubstrate("text");
 *    if (typeof this.getSubstrate === "function") return this.getSubstrate("text");
 * }
 * ```
 */
function substrate(name?: string) {
    return function (_unused: unknown, context: ClassFieldDecoratorContext) {
        generateField(context, "Substrate", name);
    };
}

export {controller, handler, interactor, tool, substrate};
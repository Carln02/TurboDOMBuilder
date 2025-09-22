import {Mvc} from "../mvc/mvc";

function inferKey(name: string, type: "Controller" | "Handler", context: ClassFieldDecoratorContext) {
    return name ?? (String(context.name).endsWith(type)
        ? String(context.name).slice(0, -type.length)
        : String(context.name));
}

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


function controller(name?: string) {
    return function (_unused: unknown, context: ClassFieldDecoratorContext) {
        generateField(context, "Controller", name);
    };
}

function handler(name?: string) {
    return function (_unused: unknown, context: ClassFieldDecoratorContext) {
        generateField(context, "Handler", name);
    };
}

export {controller, handler};
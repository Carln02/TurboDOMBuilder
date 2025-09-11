export function controller(name?: string) {
    return function (_unused: unknown, ctx: ClassFieldDecoratorContext) {
        const cacheKey = Symbol(`__ctrl_${String(ctx.name)}`);
        const infer = () => name ?? (String(ctx.name).endsWith("Controller")
            ? String(ctx.name).slice(0, -"Controller".length)
            : String(ctx.name));

        ctx.addInitializer(function () {
            Object.defineProperty(this, ctx.name, {
                configurable: true,
                enumerable: false,
                get: function () {
                    if (this[cacheKey]) return this[cacheKey];
                    const ctrl = this?.mvc?.getController?.(infer());
                    if (!ctrl) throw new Error(`Controller "${infer()}" not found on ${this?.constructor?.name}.`);
                    this[cacheKey] = ctrl;
                    return ctrl;
                },
                set: function (v: unknown) { this[cacheKey] = v; }
            });
        });
    };
}
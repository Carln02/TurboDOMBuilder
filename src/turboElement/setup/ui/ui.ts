export function defineUIPrototype<Type extends new (...args: any[]) => any>(constructor: Type) {
    const prototype = constructor.prototype as any;

   Object.defineProperty(prototype, "initializeUI", {
        value: function initializeUI(): void {
            this.setupUIElements?.();
            this.setupUILayout?.();
            this.setupUIListeners?.();
            this.setupChangedCallbacks?.();
        },
        configurable: true,
        enumerable: false,
    });
}
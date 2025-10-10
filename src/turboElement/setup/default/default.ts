import {$} from "../../../turboFunctions/turboFunctions";
import {Mvc} from "../../../mvc/mvc";
import {initializeEffects} from "../../../reactivity/reactivity";

export function defineDefaultProperties<Type extends new (...args: any[]) => any>(constructor: Type) {
    const prototype = constructor.prototype;
    const selectedKey = Symbol("__selected__");
    const selectedClass = Symbol("__selectedClass__");
    const initializedKey = Symbol("__initialized__");

    Object.defineProperty(prototype, "selected", {
        get(this: any) {return !!this[selectedKey]},
        set(this: any, value: boolean) {
            const element = this instanceof Element ? this : this.element instanceof Element ? this.element : undefined;
            if (!element) {
                this[selectedKey] = value;
                return;
            }

            const prevClass = this[selectedClass];
            const nextClass = this.getPropertiesValue?.(null, "defaultSelectedClass", "selected") ?? "selected";

            this[selectedKey] = value;
            this[selectedClass] = nextClass;
            if (prevClass && prevClass !== nextClass) $(element).toggleClass(prevClass, false);
            $(element).toggleClass(nextClass, !!value);
        },
        enumerable: true,
        configurable: true,
    });

    Object.defineProperty(prototype, "getPropertiesValue", {
        value: function <Type>(propertiesValue: Type, configFieldName?: string, defaultValue?: Type): Type {
            if (propertiesValue !== undefined && propertiesValue !== null) return propertiesValue;
            let constructor = this.constructor;
            while (constructor) {
                const configValue: Type = constructor.config?.[configFieldName];
                if (configValue !== undefined && configValue !== null) return configValue;
                constructor = Object.getPrototypeOf(constructor);
            }
            return defaultValue;
        },
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(prototype, "destroy", {
        value: function () {},
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(prototype, "initialized", {
        get: function (): boolean {
            return this[initializedKey] ?? false;
        },
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(prototype, "initialize", {
        value: function (): void {
            if (this[initializedKey]) return;
            this.setupUIElements?.();
            this.setupUILayout?.();
            this.setupUIListeners?.();
            this.setupChangedCallbacks?.();
            if (this.mvc && this.mvc instanceof Mvc) this.mvc.initialize();
            initializeEffects(this);
            this[initializedKey] = true;
        },
        configurable: true,
        enumerable: false,
    });
}
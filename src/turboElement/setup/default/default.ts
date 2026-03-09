import {turbo} from "../../../turboFunctions/turboFunctions";
import {Mvc} from "../../../mvc/mvc";
import {initializeEffects} from "../../../decorators/reactivity/reactivity";
import {CloneElementOptions, FeedforwardProperties} from "../../../turboFunctions/element/element.types";

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
            if (prevClass && prevClass !== nextClass) turbo(element).toggleClass(prevClass, false);
            turbo(element).toggleClass(nextClass, !!value);
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
            this[initializedKey] = true;
            this.setupUIElements?.();
            this.setupUILayout?.();
            this.setupUIListeners?.();
            this.setupChangedCallbacks?.();
            if (this.mvc && this.mvc instanceof Mvc) this.mvc.initialize();
            initializeEffects(this);
        },
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(prototype, "clone", {
        value: function (properties: CloneElementOptions) {return turbo(this).clone(properties)},
        configurable: true,
        enumerable: false,
    });

    const ffKey = Symbol("__defaultFeedforwardProperties__");
    Object.defineProperty(prototype, "defaultFeedforwardProperties", {
        get(this: any) {
            if (!this[ffKey]) this[ffKey] = {};
            return this[ffKey];
        },
        set(this: any, value) {this[ffKey] = value},
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(prototype, "feedforward", {
        value: function (properties: FeedforwardProperties) {return turbo(this).feedforward(properties)},
        configurable: true,
        enumerable: false,
    });
}
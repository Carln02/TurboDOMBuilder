import {$} from "../../../turboFunctions/turboFunctions";

export function defineDefaultProperties<Type extends new (...args: any[]) => any>(constructor: Type) {
    const prototype = constructor.prototype;
    const selectedKey = Symbol("__selected__");
    const selectedClass = Symbol("__selectedClass__");

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
        value: function<Type>(propertiesValue: Type, configFieldName?: string, defaultValue?: Type): Type {
            if (propertiesValue !== undefined && propertiesValue !== null) return propertiesValue;
            const configValue: Type = this.constructor.config?.[configFieldName];
            if (configValue !== undefined && configValue !== null) return configValue;
            return defaultValue;
        },
        configurable: true,
        enumerable: false,
    });
}
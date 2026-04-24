import {turbo} from "../../../turboFunctions/turboFunctions";

export function defineUIPrototype<Type extends new (...args: any[]) => any>(constructor: Type) {
    const prototype = constructor.prototype as any;
    const shadowDOMKey = Symbol("__shadow_dom__");
    const unsetDefaultClassesKey = Symbol("__unset_default_classes__");
    const defaultClassesKey = Symbol("__default_classes__");
    const defaultSelectedClassesKey = Symbol("__default_selected_classes__");

    Object.defineProperty(prototype, "shadowDOM", {
        get: function (): boolean {return this[shadowDOMKey] ?? false;},
        set: function (value: boolean) {
            this[shadowDOMKey] = value;
            const el = this.element;
            if (value && !el.shadowRoot) try {el.attachShadow({ mode: "open" });} catch {}
            if (el.shadowRoot) {
                const from = value ? el : el.shadowRoot;
                const to = value ? el.shadowRoot : el;
                while (from.childNodes.length > 0) to.appendChild(from.childNodes[0]);
            }
        },
        enumerable: true,
        configurable: true,
    });

    Object.defineProperty(prototype, "unsetDefaultClasses", {
        get: function (): boolean {return this[unsetDefaultClassesKey] ?? false;},
        set: function (value: boolean) {
            this[unsetDefaultClassesKey] = value;
            turbo(this).toggleClass(this.defaultClasses, !value);
        },
        enumerable: true,
        configurable: true,
    });

    Object.defineProperty(prototype, "defaultClasses", {
        get: function (): string | string[] {return this[defaultClassesKey] ?? "";},
        set: function (value: string | string[]) {
            if (!this.unsetDefaultClasses) turbo(this).toggleClass(this[defaultClassesKey], false);
            this[defaultClassesKey] = value;
            if (!this.unsetDefaultClasses) turbo(this).toggleClass(value, true);
        },
        enumerable: true,
        configurable: true,
    });

    Object.defineProperty(prototype, "defaultSelectedClasses", {
        get: function (): string | string[] {return this[defaultSelectedClassesKey] ?? "";},
        set: function (value: string | string[]) {
            if (this.selected) turbo(this).toggleClass(this[defaultSelectedClassesKey], false);
            this[defaultSelectedClassesKey] = value;
            if (this.selected) turbo(this).toggleClass(value, true);
        },
        enumerable: true,
        configurable: true,
    });
}
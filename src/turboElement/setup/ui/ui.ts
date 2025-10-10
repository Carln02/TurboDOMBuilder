import {$} from "../../../turboFunctions/turboFunctions";
import {Mvc} from "../../../mvc/mvc";

export function defineUIPrototype<Type extends new (...args: any[]) => any>(constructor: Type) {
    const prototype = constructor.prototype as any;
    const unsetDefaultClassesKey = Symbol("__unset_default_classes__");

   Object.defineProperty(prototype, "unsetDefaultClasses", {
       get: function (): boolean {return this[unsetDefaultClassesKey] ?? false;},
       set: function (value: boolean) {
           this[unsetDefaultClassesKey] = value;
           const defaultClasses = (this.constructor as any)?.config?.defaultClasses;
           if (!defaultClasses) return;
           $(this).toggleClass(defaultClasses, value);
       },
       enumerable: true,
       configurable: true,
   });
}
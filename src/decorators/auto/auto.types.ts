/**
 * @type {AutoOptions}
 * @description Options for configuring the `auto` decorator.
 * @property {boolean} [cancelIfUnchanged=true] - If true, cancels the setter if the new value is the same as the
 * current value. Defaults to `true`.
 * @property {(value: Type) => Type} [callBefore] - Optional callback to execute on the value just before it is set.
 * @property {boolean} [returnDefinedGetterValue] - If true and a getter is defined, will not modify the latter.
 * @template Type
 */
type AutoOptions<Type = any> = {
    cancelIfUnchanged?: boolean,
    callBefore?: (value: Type) => Type,
    returnDefinedGetterValue?: boolean,
}

export {AutoOptions};
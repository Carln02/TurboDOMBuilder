/**
 * @type {AutoOptions}
 * @group Decorators
 * @category Augmentation
 *
 * @template Type
 * @description Options for configuring the `@auto` decorator.
 * @property {boolean} [override] - If true, will try to override the defined property in `super`.
 * @property {boolean} [cancelIfUnchanged=true] - If true, cancels the setter if the new value is the same as the
 * current value. Defaults to `true`.
 * @property {(value: Type) => Type} [preprocessValue] - Optional callback to execute on the value and preprocess it
 * just before it is set. The returned value will be stored.
 * @property {(value: Type) => void} [callBefore] - Optional function to call before preprocessing and setting the value.
 * @property {(value: Type) => void} [callAfter] - Optional function to call after setting the value.
 * @property {boolean} [setIfUndefined] - If true, will fire the setter when the underlying value is `undefined` and
 * the program is trying to access it (maybe through its getter).
 * @property {boolean} [returnDefinedGetterValue] - If true and a custom getter is defined, the return value of this
 * getter will be returned when accessing the property. Otherwise, the underlying saved value will always be returned.
 * Defaults to `false`.
 * @property {boolean} [executeSetterBeforeStoring] - If true, when setting the value, the setter will execute first,
 * and then the value will be stored. In this case, accessing the value in the setter will return the previous value.
 * Defaults to `false`.
 * @property {Type} [defaultValue] - If defined, whenever the underlying value is `undefined` and trying to be
 * accessed, it will be set to `defaultValue` through the setter before getting accessed.
 * @property {() => Type} [defaultValueCallback] - If defined, whenever the underlying value is `undefined` and
 * trying to be accessed, it will be set to the return value of `defaultValueCallback` through the setter before
 * getting accessed.
 * @property {Type} [initialValue] - If defined, on initialization, the property will be set to `initialValue`.
 * @property {() => Type} [initialValueCallback] - If defined, on initialization, the property will be set to the
 * return value of `initialValueCallback`.
 */
type AutoOptions<Type = any> = {
    override?: boolean,

    cancelIfUnchanged?: boolean,
    setIfUndefined?: boolean,
    returnDefinedGetterValue?: boolean,
    executeSetterBeforeStoring?: boolean,

    defaultValue?: Type,
    defaultValueCallback?: () => Type,

    initialValue?: Type,
    initialValueCallback?: () => Type,

    preprocessValue?: (value: Type) => Type,
    callBefore?: (value: Type) => void,
    callAfter?: (value: Type) => void
};

export {AutoOptions};
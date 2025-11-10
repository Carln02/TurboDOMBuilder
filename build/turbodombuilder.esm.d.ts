/// <reference types="node" />
import { Doc, Map as Map$1, Array, YEvent, AbstractType } from 'yjs';
export { AbstractType as YAbstractType, Array as YArray, YArrayEvent, Doc as YDoc, YEvent, Map as YMap, YMapEvent, Text as YText } from 'yjs';

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
    override?: boolean;
    cancelIfUnchanged?: boolean;
    setIfUndefined?: boolean;
    returnDefinedGetterValue?: boolean;
    executeSetterBeforeStoring?: boolean;
    defaultValue?: Type;
    defaultValueCallback?: () => Type;
    initialValue?: Type;
    initialValueCallback?: () => Type;
    preprocessValue?: (value: Type) => Type;
    callBefore?: (value: Type) => void;
    callAfter?: (value: Type) => void;
};

/**
 * @decorator
 * @function auto
 * @group Decorators
 * @category Augmentation
 *
 * @description Stage-3 decorator that augments fields, getters, setters, and accessors. Useful to quickly create a setter
 * and only define additional functionality on set. The decorator takes an optional object as parameter to configure
 * it, allowing you to, among other things:
 * - Preprocess the value when it is set,
 * - Specify callbacks to call before/after the value is set,
 * - Define a default value to return instead of `undefined` when calling the getter, and
 * - Fire the setter when the underlying value is `undefined`.
 *
 * *Note: If you want to chain decorators, place `@auto` closest to the property to ensure it runs first and sets
 * up the accessor for other decorators.*
 *
 * @param {AutoOptions} [options] - Options object to define custom behaviors.
 *
 * @example
 * ```ts
 * @auto() public set color(value: string) {
 *    this.style.backgroundColor = value;
 * }
 * ```
 *Is equivalent to:
 * ```ts
 * private _color: string;
 * public get color(): string {
 *    return this._color;
 * }
 *
 * public set color(value: string) {
 *    this._color = value;
 *    this.style.backgroundColor = value;
 * }
 * ```
 */
declare function auto(options?: AutoOptions): <Type extends object, Value>(value: {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
} | ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void), context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>) => any;

/**
 * @type {CacheOptions}
 * @group Decorators
 * @category Cache
 *
 * @description Options for configuring the `@cache` decorator.
 *
 * Defines when and how cached values should expire, refresh, or invalidate.
 * These options apply equally to cached **methods**, **getters**, and **accessors**.
 *
 * @property {number} [timeout]
 *  Duration in milliseconds after which the cached value automatically expires.
 *  Useful for time-based caching where values should refresh periodically.
 *
 * @property {string | string[]} [onEvent]
 *  One or more event names (space-separated string or array) that, when fired on the instance,
 *  immediately clear the cache.
 *  This allows integration with custom event systems or reactive models.
 *
 * @property {() => boolean | Promise<boolean>} [onCallback]
 *  Function (sync or async) periodically called to decide whether to invalidate the cache.
 *  If it returns `true`, the cache is cleared.
 *
 * @property {number} [onCallbackFrequency]
 *  Frequency in milliseconds at which `onCallback` should be executed.
 *  Ignored if `onCallback` is not provided.
 *
 * @property {string | Function | (string | Function)[]} [onFieldChange]
 *  One or more property names or methods to watch for changes.
 *  Whenever any of these fields or functions change, the cache for the decorated member is cleared.
 *  Can be a string, a function reference, or an array of both.
 *
 * @property {boolean} [clearOnNextFrame]
 *  If `true`, clears the cache automatically on the **next animation frame** (or equivalent microtask fallback).
 *  Useful when the cached value is only valid for the current render/update cycle.
 */
type CacheOptions = {
    timeout?: number;
    onEvent?: string | string[];
    onCallback?: () => boolean | Promise<boolean>;
    onCallbackFrequency?: number;
    onFieldChange?: string | Function | (string | Function)[];
    clearOnNextFrame?: boolean;
};

/**
 * @decorator
 * @function cache
 * @group Decorators
 * @category Cache
 *
 * @description Stage-3 decorator that memorizes expensive reads.
 *
 * **What it does**
 * - **Method**: caches the return value **per unique arguments** (using a stable key from args).
 * - **Getter**: caches the value **once per instance** until invalidated.
 * - **Accessor**: wraps the `get` path like a cached getter; the `set` path invalidates cached value.
 *
 * @param {CacheOptions} [options] - Optional caching configuration to define when to clear it (on event, after
 * timeout, on next frame, on callback, etc.).
 *
 * @example
 * ```ts
 * class IconRenderer {
 *   #value = 0;
 *
 *   // Accessor: cached read; any write invalidates immediately
 *   @cache({clearOnNextFrame: true}) accessor data = {
 *     get: () => this.#value,
 *     set: (v: number) => { this.#value = v; }
 *   };
 *
 *   // Caches per argument list (e.g., same path ⇒ same result until invalidation)
 *   @cache({timeout: 5_000}) async loadSvg(path: string): Promise<string> {
 *     // ...expensive IO
 *     return fetch(path).then(r => r.text());
 *   }
 * }
 * ```
 */
declare function cache(options?: CacheOptions): <Type extends object, Value>(value: {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
} | ((this: Type, ...args: any[]) => any) | ((this: Type) => Value), context: ClassMethodDecoratorContext<Type> | ClassGetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>) => any;
/**
 * @function clearCache
 * @group Decorators
 * @category Cache
 *
 * @description Clear *all* cache entries created by `@cache` on an instance.
 * @param {any} instance - The instance for which the cache should be cleared.
 */
declare function clearCache(instance: any): void;
/**
 * @function clearCacheEntry
 * @group Decorators
 * @category Cache
 *
 * @description Clear a specific cache entry for a given method, function, or getter.
 * @param {any} instance - The instance for which the cache should be cleared.
 * @param {string | Function} field - The name (or the function itself) of the field to clear.
 */
declare function clearCacheEntry(instance: any, field: string | Function): void;

/**
 * @function callOnce
 * @group Decorators
 * @category Augmentation
 *
 * @template {(...args: any[]) => any} Type
 * @description Function wrapper that ensures the passed function is called only once.
 * Subsequent calls will just return the cached computed result (if any) of the first call of that function.
 * @param {Type} fn - The function to process.
 *
 * @example
 * ```ts
 * const init = callOnce(function () { ... });
 * const out = init();
 * ```
 */
declare function callOnce<Type extends (...args: any[]) => any>(fn: Type): Type;
/**
 * @decorator
 * @function callOncePerInstance
 * @group Decorators
 * @category Augmentation
 *
 * @description Stage-3 method decorator. It ensures a method in a class is called only once per instance.
 * Subsequent calls will be canceled and log a warning. Works for instance or static methods.
 *
 * @example
 * ```ts
 *   class A {
 *     @callOnce init() { ... }
 *   }
 * ```
 */
declare function callOncePerInstance<Type extends object>(value: (this: Type, ...args: any[]) => any, context: ClassMethodDecoratorContext<Type>): any;

/**
 * @type DefineOptions
 * @group Decorators
 * @category Attributes & DOM
 *
 * @description Options object type for the `@define` decorator.
 * @property {boolean} [injectAttributeBridge] - If true, injects an `attributeChangedCallback` into the
 * class (if it's missing). It defaults to `true`.
 */
type DefineOptions = {
    injectAttributeBridge?: boolean;
};

/**
 * @decorator
 * @function define
 * @group Decorators
 * @category Attributes & DOM
 *
 * @description Stage-3 **class** decorator factory. It:
 * - Registers the element with customElements (name inferred if omitted).
 * - Adds the defined (or inferred) customElement name as a class to all instances of this class (and the class's children).
 * - Publishes a *live* `observedAttributes` getter that lists all attributes associated with `@observed` fields in
 *   this class and its ancestors.
 * - Sets up an `attributeChangedCallback()` function to mirror changes from attributes to their associated
 * `@observed` fields.
 *
 * @param {string} [elementName] - The name of the custom HTML element. It is inferred if omitted.
 * @param {DefineOptions} [options] - Custom {@link DefineOptions} options object.
 *
 * @example
 * ```ts
 * @define() // name will be "my-el" (kebab case of class name).
 * class MyEl extends HTMLElement { ... }
 *
 * @define("my-el") // explicit name
 * class MyEl extends HTMLElement { ... }
 * ````
 */
declare function define(elementName?: string, options?: DefineOptions): <T extends new (...args: any[]) => HTMLElement>(Base: T, context: ClassDecoratorContext<T>) => T;

/**
 * @decorator
 * @function expose
 * @group Decorators
 * @category Augmentation
 *
 * @description Stage-3 decorator that augments fields, accessors, and methods to expose fields and methods
 * from inner instances.
 * @param {string} rootKey - The property key of the instance to expose from.
 * @param {boolean} [exposeSetter=true] - Whether to expose a setter for the property. Defaults to true.
 *
 * @example
 * ```ts
 * protected model: TurboModel;
 * @expose("model") public color: string;
 * ```
 * Is equivalent to:
 * ```ts
 * protected model: TurboModel;
 *
 * public get color(): string {
 *    return this.model.color;
 * }
 *
 * public set color(value: string) {
 *    this.model.color = value;
 * }
 * ```
 */
declare function expose(rootKey: string, exposeSetter?: boolean): <Type extends object, Value>(value: {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
} | ((initial: Value) => Value) | ((this: Type, ...args: any[]) => any), context: ClassFieldDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value> | ClassMethodDecoratorContext<Type>) => any;

/**
 * @decorator
 * @function controller
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched controller.
 * @param {string} [name] - The key name of the controller in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingController`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @controller() protected textController: TurboController;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textController(): TurboController {
 *    if (this.mvc instanceof Mvc) return this.mvc.getController("text");
 *    if (typeof this.getController === "function") return this.getController("text");
 * }
 * ```
 */
declare function controller(name?: string): (_unused: unknown, context: ClassFieldDecoratorContext) => void;
/**
 * @decorator
 * @function handler
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched handler.
 * @param {string} [name] - The key name of the handler in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingHandler`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @handler() protected textHandler: TurboHandler;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textHandler(): TurboHandler {
 *    if (this.mvc instanceof Mvc) return this.mvc.getHandler("text");
 *    if (typeof this.getHandler === "function") return this.getHandler("text");
 * }
 * ```
 */
declare function handler(name?: string): (_unused: unknown, context: ClassFieldDecoratorContext) => void;
/**
 * @decorator
 * @function interactor
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched interactor.
 * @param {string} [name] - The key name of the interactor in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingInteractor`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @interactor() protected textInteractor: TurboInteractor;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textInteractor(): TurboInteractor {
 *    if (this.mvc instanceof Mvc) return this.mvc.getInteractor("text");
 *    if (typeof this.getInteractor === "function") return this.getInteractor("text");
 * }
 * ```
 */
declare function interactor(name?: string): (_unused: unknown, context: ClassFieldDecoratorContext) => void;
/**
 * @decorator
 * @function tool
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched tool.
 * @param {string} [name] - The key name of the tool in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingTool`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @tool() protected textTool: TurboTool;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textTool(): TurboTool {
 *    if (this.mvc instanceof Mvc) return this.mvc.getTool("text");
 *    if (typeof this.getTool === "function") return this.getTool("text");
 * }
 * ```
 */
declare function tool(name?: string): (_unused: unknown, context: ClassFieldDecoratorContext) => void;
/**
 * @decorator
 * @function substrate
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched substrate.
 * @param {string} [name] - The key name of the substrate in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingSubstrate`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @tool() protected textSubstrate: TurboSubstrate;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textSubstrate(): TurboSubstrate {
 *    if (this.mvc instanceof Mvc) return this.mvc.getSubstrate("text");
 *    if (typeof this.getSubstrate === "function") return this.getSubstrate("text");
 * }
 * ```
 */
declare function substrate(name?: string): (_unused: unknown, context: ClassFieldDecoratorContext) => void;

/**
 * @internal
 */
declare global {
    interface SymbolConstructor {
        metadata: symbol;
    }
}
/**
 * @decorator
 * @function observe
 * @group Decorators
 * @category Attributes & DOM
 *
 * @description Stage-3 decorator for fields, getters, setters, and accessors that reflects a property to an HTML
 * attribute. So when the value of the property changes, it is reflected in the element's HTML attributes.
 * It also records the attribute name into the class's `observedAttributed` to listen for changes on the HTML.
 *
 * @example
 * ```ts
 * @define()
 * class MyClass extends HTMLElement {
 *    @observe fieldName: string = "hello";
 * }
 * ```
 *
 * Leads to:
 * ```html
 * <my-class field-name="hello"></my-class>
 * ```
 *
 */
declare function observe<Type extends object, Value>(value: ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void) | {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
}, context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>): any;

/**
 * @decorator
 * @function solver
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 decorator that turns methods into substrate solvers.
 * @example
 * ```ts
 * @solver private constrainPosition(properties: SubstrateSolverProperties) {...}
 * ```
 * Is equivalent to:
 * ```ts
 * private constrainPosition(properties: SubstrateSolverProperties) {...}
 *
 * public initialize() {
 *   ...
 *   $(this).addSolver(this.constrainPosition);
 * }
 * ```
 */
declare function solver<Type extends object>(value: ((this: Type, ...args: any[]) => any), context: ClassMethodDecoratorContext<Type>): any;

/**
 * @class TurboHandler
 * @group MVC
 * @category Handler
 *
 * @description The MVC base handler class. It's an extension of the model, and its main job is to provide some utility
 * functions to manipulate some of (or all of) the model's data.
 * @template {TurboModel} ModelType - The element's MVC model type.
 */
declare class TurboHandler<ModelType extends TurboModel = TurboModel> {
    /**
     * @description The key of the handler. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the handler's class name is MyElementSomethingHandler, the key would
     * default to "something".
     */
    keyName: string;
    /**
     * @description The MVC model.
     * @protected
     */
    model: ModelType;
    constructor(model?: ModelType);
}

/**
 * @internal
 * @class SimpleDelegate
 * @template {(...args: any[]) => any} CallbackType - The type of callbacks accepted by the delegate.
 * @description Class representing a set of callbacks that can be maintained and executed together.
 */
declare class SimpleDelegate<CallbackType extends (...args: any[]) => any> {
    private callbacks;
    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    add(callback: CallbackType): void;
    /**
     * @description Removes a callback from the list.
     * @param callback - The callback function to remove.
     * @returns A boolean indicating whether the callback was found and removed.
     */
    remove(callback: CallbackType): boolean;
    /**
     * @description Checks whether a callback is in the list.
     * @param callback - The callback function to check for.
     * @returns A boolean indicating whether the callback was found.
     */
    has(callback: CallbackType): boolean;
    /**
     * @description Invokes all callbacks with the provided arguments.
     * @param args - The arguments to pass to the callbacks.
     */
    fire(...args: Parameters<CallbackType>): ReturnType<CallbackType>;
    /**
     * @description Clears added callbacks
     */
    clear(): void;
}
/**
 * @class Delegate
 * @group Components
 * @category Delegate
 * @template {(...args: any[]) => any} CallbackType - The type of callbacks accepted by the delegate.
 * @description Class representing a set of callbacks that can be maintained and executed together.
 */
declare class Delegate<CallbackType extends (...args: any[]) => any> extends SimpleDelegate<CallbackType> {
    /**
     * @description Delegate fired when a callback is added.
     */
    onAdded: SimpleDelegate<(callback: CallbackType) => void>;
    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    add(callback: CallbackType): void;
}

/**
 * @group Components
 * @category TurboDataBlock
 */
type DataBlockProperties<DataType = any, IdType extends string | number | symbol = any> = {
    id?: IdType;
    data?: DataType;
};
/**
 * @group Components
 * @category TurboDataBlock
 */
type DataBlockHost<DataType = any, KeyType extends string | number | symbol = any, IdType extends string | number | symbol = any> = {
    onDirty?: (key: KeyType, block: TurboDataBlock<DataType, KeyType, IdType>) => void;
    onChange?: (key: KeyType, value: unknown, block: TurboDataBlock<DataType, KeyType, IdType>) => void;
};
/**
 * @group Components
 * @category TurboDataBlock
 */
type BlockChangeObserver<DataType = any, ComponentType extends object = any, KeyType extends string | number | symbol = string> = {
    onAdded: Delegate<(data: DataType, id: KeyType) => ComponentType | void>;
    onUpdated: Delegate<(data: DataType, instance: ComponentType, id: KeyType) => void>;
    onDeleted: Delegate<(data: DataType, instance: ComponentType, id: KeyType) => void>;
    instances: Map<KeyType, ComponentType>;
    getInstance(key: KeyType): ComponentType;
    getAllInstances(): ComponentType[];
    initialize(): void;
    clear(): void;
    destroy(): void;
};
/**
 * @group Components
 * @category TurboDataBlock
 */
type BlockChangeObserverProperties<DataType = any, ComponentType extends object = any, KeyType extends string | number | symbol = string> = {
    initialize?: boolean;
    onAdded?: (data: DataType, id: KeyType) => ComponentType | void;
    onUpdated?: (data: DataType, instance: ComponentType, id: KeyType) => void;
    onDeleted?: (data: DataType, instance: ComponentType, id: KeyType) => void;
};

type SignalSubscriber = () => void;
/**
 * @type {SignalEntry}
 * @group Decorators
 * @category Signal
 *
 * @template Type
 * @description Type that represents a base signal object.
 * @property {function(): Type} get - Retrieve the signal value.
 * @property {function(value: Type): void} set - Set the signal value.
 * @property {function(updater: (previous: Type) => Type): void} update - Set the value using a pure updater based
 * on the previous value.
 * @property {(fn: SignalSubscriber) => () => void} sub - Subscribe to change notifications. Returns an unsubscribe
 * function.
 * @property {() => void} emit - Force a notification cycle without changing the value (useful after in-place
 * mutation of structural data).
 *
 * @example
 * ```ts
 * const count: SignalEntry<number> = makeSignal(0);
 * const unsub = count.sub(() => console.log("count:", count.get()));
 * count.set(1); // logs "count: 1"
 * count.update(c => c+1); // logs "count: 2"
 * unsub();
 * ```
 */
type SignalEntry<Type = any> = {
    get(): Type;
    set(value: Type): void;
    update(updater: (previous: Type) => Type): void;
    sub(fn: SignalSubscriber): () => void;
    emit(): void;
};
/**
 * @type {SignalBox}
 * @group Decorators
 * @category Signal
 *
 * @template Type
 * @description A signal entry that is also usable like its underlying primitive/object.
 *
 * ### Interop Notes
 * - `toJSON()` returns the raw value.
 * - `valueOf()` returns the raw value.
 * - `Symbol.toPrimitive(hint)`:
 *    - `"number"` → numeric coercion from the inner value
 *    - `"string"` or `"default"` → string coercion from the inner value
 * - The `value` getter/setter mirrors `get()`/`set()` for ergonomic usage.
 *
 * @example
 * ```ts
 * const count: SignalBox<number> = signal(0);
 *
 * // Read
 * console.log(count.get()); // 0
 * console.log(count.value); // 0
 * console.log(+count); // 0
 *
 * // Write
 * count.set(5);
 * count.value = 6;
 * count.update(v => v + 1); // 7
 *
 * // JSON / string
 * console.log(`${count}`); // "7"
 * console.log(JSON.stringify(count)); // 7
 *
 * // Reactivity
 * const unsub = count.sub(() => console.log("changed to", count.get()));
 * count.set(8); // triggers subscriber
 * unsub();
 * ```
 */
type SignalBox<Type> = Type & SignalEntry<Type> & {
    toJSON(): Type;
    valueOf(): Type;
    value: Type;
    [Symbol.toPrimitive](hint: "default" | "number" | "string"): string | number;
};

/**
 * @group Components
 * @category TurboWeakSet
 */
declare class TurboWeakSet<Type extends object = object> {
    private readonly _weakRefs;
    constructor();
    add(obj: Type): this;
    has(obj: Type): boolean;
    delete(obj: Type): boolean;
    cleanup(): void;
    toArray(): Type[];
    get size(): number;
    clear(): void;
}

/**
 * @group Components
 * @category TurboDataBlock
 */
declare class TurboDataBlock<DataType = any, KeyType extends string | number | symbol = any, IdType extends string | number | symbol = any, ComponentType extends object = any, DataEntryType = any> {
    id: IdType;
    data: DataType;
    accessor enabledCallbacks: boolean;
    protected isInitialized: boolean;
    private host;
    private signals;
    protected readonly changeObservers: TurboWeakSet<BlockChangeObserver<DataEntryType, ComponentType, KeyType>>;
    readonly onKeyChanged: Delegate<(key: KeyType, value: any) => void>;
    constructor(properties?: DataBlockProperties);
    get(key: KeyType): unknown;
    set(key: KeyType, value: unknown): void;
    has(key: KeyType): boolean;
    delete(key: KeyType): void;
    get keys(): KeyType[];
    get values(): unknown[];
    get size(): number;
    initialize(): void;
    /**
     * @function clear
     * @description Clears the block data.
     */
    clear(clearData?: boolean): void;
    toJSON(): object;
    link(host: DataBlockHost<DataType, KeyType, IdType>): void;
    unlink(): void;
    makeSignal<Type = any>(key: KeyType): SignalBox<Type>;
    getSignal(key: KeyType): SignalBox<unknown>;
    makeAllSignals(): void;
    generateObserver(properties?: BlockChangeObserverProperties<DataEntryType, ComponentType, KeyType>): BlockChangeObserver<DataEntryType, ComponentType, KeyType>;
    private observerKeyChanged;
    protected keyChanged(key: KeyType, value?: unknown, deleted?: boolean): void;
    private sortingFunction;
    private removeInstance;
}

/**
 * @class TurboModel
 * @group MVC
 * @category Model
 *
 * @template DataType - The type of the data stored in each block.
 * @template {string | number | symbol} KeyType - The type of the keys used to access data in blocks.
 * @template {string | number | symbol} IdType - The type of the block IDs.
 * @template {"array" | "map"} BlocksType - Whether data blocks are stored as an array or a map.
 * @template {TurboDataBlock<DataType, KeyType, IdType>} BlockType - The structure of each data block.
 * @description A base class representing a model in MVC, which manages one or more data blocks and handles change
 * propagation.
 */
declare class TurboModel<DataType = any, KeyType extends string | number | symbol = any, IdType extends string | number | symbol = any, BlocksType extends "array" | "map" = "array" | "map", BlockType extends TurboDataBlock<DataType, KeyType, IdType> = TurboDataBlock<DataType, KeyType, IdType>> implements DataBlockHost<DataType, KeyType, IdType> {
    protected readonly isDataBlocksArray: boolean;
    protected readonly dataBlocks: MvcBlocksType<BlocksType, BlockType>;
    /**
     * @description Map of MVC handlers bound to this model.
     */
    handlers: Map<string, TurboHandler>;
    /**
     * @description Delegate triggered when a key changes.
     */
    keyChangedCallback: Delegate<(keyName: KeyType, blockKey: MvcBlockKeyType<BlocksType>, ...args: any[]) => void>;
    onDirty(key: KeyType, block: TurboDataBlock<DataType, KeyType, IdType>): void;
    onChange(key: KeyType, value: unknown, block: TurboDataBlock<DataType, KeyType, IdType>): void;
    /**
     * @constructor
     * @param {DataType} [data] - Initial data. Not initialized if provided.
     * @param {BlocksType} [dataBlocksType] - Type of data blocks (array or map).
     */
    constructor(data?: DataType, dataBlocksType?: BlocksType);
    /**
     * @description The default block.
     */
    get block(): BlockType;
    set block(value: BlockType);
    /**
     * @description The data of the default block.
     */
    get data(): DataType;
    set data(value: DataType);
    /**
     * @description The ID of the default block.
     */
    get dataId(): IdType;
    set dataId(value: IdType);
    /**
     * @description Whether callbacks are enabled or not.
     */
    set enabledCallbacks(value: boolean);
    /**
     * @function getBlock
     * @description Retrieves the data block for the given blockKey.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key to retrieve.
     * @returns {BlockType | null} The block or null if it doesn't exist.
     */
    getBlock(blockKey?: MvcBlockKeyType<BlocksType>): BlockType;
    /**
     * @function createBlock
     * @description Creates a data block entry.
     * @param {DataType} value - The data of the block.
     * @param {IdType} [id] - The optional ID of the data.
     * @protected
     * @return {BlockType} - The created block.
     */
    protected createBlock(value: DataType | BlockType, id?: IdType): BlockType;
    /**
     * @function setBlock
     * @description Creates and sets a data block at the specified key.
     * @param {DataType} value - The data to set.
     * @param {IdType} [id] - Optional block ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
     * @param {boolean} [initialize = true] - Whether to initialize the block after setting.
     */
    setBlock(value: DataType | BlockType, id?: IdType, blockKey?: MvcBlockKeyType<BlocksType>, initialize?: boolean): void;
    /**
     * @function hasBlock
     * @description Check if a block exists at the given key.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key.
     * @return {boolean} - Whether the block exists or not.
     */
    hasBlock(blockKey: MvcBlockKeyType<BlocksType>): boolean;
    deleteBlock(blockKey: MvcBlockKeyType<BlocksType>): void;
    /**
     * @function addBlock
     * @description Adds a new block into the structure. Appends or inserts based on key if using array.
     * @param {DataType} value - The block data.
     * @param {IdType} [id] - Optional block ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key (used for insertion in arrays).
     * @param {boolean} [initialize=true] - Whether to initialize after adding.
     */
    addBlock(value: DataType | BlockType, id?: IdType, blockKey?: MvcBlockKeyType<BlocksType>, initialize?: boolean): void;
    /**
     * @function getData
     * @description Retrieves the value associated with a given key in the specified block.
     * @param {KeyType} key - The key to retrieve.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block from which to retrieve the
     * data.
     * @returns {unknown} The value associated with the key, or null if not found.
     */
    getData(key: KeyType, blockKey?: MvcBlockKeyType<BlocksType>): unknown;
    /**
     * @function setData
     * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {unknown} value - The value to assign.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
     */
    setData(key: KeyType, value: unknown, blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @function hasData
     * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
     */
    hasData(key: KeyType, blockKey?: MvcBlockKeyType<BlocksType>): boolean;
    deleteData(key: KeyType, blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @function getSize
     * @description Returns the size of the specified block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to check.
     * @returns {number} The size.
     */
    getSize(blockKey?: MvcBlockKeyType<BlocksType>): number;
    toJSON(blockKey?: MvcBlockKeyType<BlocksType>): object;
    /**
     * @function getBlockData
     * @description Retrieves the data from a specific block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     * @returns {DataType} The block's data or  if it doesn't exist.
     */
    getBlockData(blockKey?: MvcBlockKeyType<BlocksType>): DataType;
    /**
     * @function getBlockId
     * @description Retrieves the ID from a specific block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     * @returns {IdType} The block ID or null.
     */
    getBlockId(blockKey?: MvcBlockKeyType<BlocksType>): IdType;
    /**
     * @function setBlockId
     * @description Sets the ID for a specific block.
     * @param {IdType} value - The new ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block key.
     */
    setBlockId(value: IdType, blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @function fireCallback
     * @description Fires the emitter's change callback for the given key in the default blocks.
     * @param {string | KeyType} key - The key to fire for.
     * @param {...any[]} args - Additional arguments.
     */
    protected fireCallback(key: string | KeyType, ...args: any[]): void;
    /**
     * @function fireBlockCallback
     * @description Fires the emitter's change callback for the given key in a specific block with custom arguments.
     * @param {string | KeyType} key - The key to fire for.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block key.
     * @param {...any[]} args - Additional arguments.
     */
    protected fireBlockCallback(key: string | KeyType, blockKey?: MvcBlockKeyType<BlocksType>, ...args: any[]): void;
    /**
     * @function initialize
     * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    initialize(blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @function clear
     * @description Clears the block data at the given key.
     * @param clearData
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    clear(clearData?: boolean, blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @description The default block key based on whether the data structure is an array or map.
     */
    get defaultBlockKey(): MvcBlockKeyType<BlocksType>;
    /**
     * @description The default block key if there's only one block, otherwise null.
     */
    protected get defaultComputationBlockKey(): MvcBlockKeyType<BlocksType>;
    /**
     * @function isValidBlockKey
     * @description Checks if the block key is a valid string or number.
     * @param {MvcBlockKeyType<BlocksType>} blockKey - The block key to validate.
     * @returns {boolean} True if valid, false otherwise.
     */
    protected isValidBlockKey(blockKey: MvcBlockKeyType<BlocksType>): boolean;
    /**
     * @function getAllBlockKeys
     * @description Retrieves all block keys in the model.
     * @returns {MvcBlockKeyType<BlocksType>[]} Array of block keys.
     */
    getAllBlockKeys(): MvcBlockKeyType<BlocksType>[];
    /**
     * @function getAllBlockIds
     * @description Retrieves all block (data) IDs in the model.
     * @returns {IdType[]} Array of IDs.
     */
    getAllBlockIds(): IdType[];
    /**
     * @function getAllBlocks
     * @description Retrieves all blocks or a specific one if blockKey is defined.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {BlockType[]} Array of blocks.
     */
    getAllBlocks(blockKey?: MvcBlockKeyType<BlocksType>): BlockType[];
    getBlockKey(block: TurboDataBlock<DataType, KeyType, IdType>): MvcBlockKeyType<BlocksType>;
    /**
     * @function getAllKeys
     * @description Retrieves all keys within the given block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {KeyType[]} Array of keys.
     */
    getAllKeys(blockKey?: MvcBlockKeyType<BlocksType>): KeyType[];
    /**
     * @function getAllValues
     * @description Retrieves all values across block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {unknown[]} Array of values.
     */
    getAllValues(blockKey?: MvcBlockKeyType<BlocksType>): unknown[];
    /**
     * @function getHandler
     * @description Retrieves the attached MVC handler with the given key.
     * By default, unless manually defined in the handler, if the element's class name is MyElement
     * and the handler's class name is MyElementSomethingHandler, the key would be "something".
     * @param {string} key - The handler's key.
     * @return {TurboHandler} - The handler.
     */
    getHandler(key: string): TurboHandler;
    /**
     * @function addHandler
     * @description Registers a TurboHandler for the given key.
     * @param {TurboHandler} handler - The handler instance to register.
     */
    addHandler(handler: TurboHandler): void;
}

/**
 * @class TurboEmitter
 * @group MVC
 * @category Emitter
 *
 * @template {TurboModel} ModelType -The element's MVC model type.
 * @description The base MVC emitter class. Its role is basically an event bus. It allows the different parts of the
 * MVC structure to fire events or listen to some, with various methods.
 */
declare class TurboEmitter<ModelType extends TurboModel = TurboModel> {
    /**
     * @description Map containing all callbacks.
     * @protected
     */
    protected readonly callbacks: Map<string, Map<string, ((...args: any[]) => void)[]>>;
    /**
     * @description The attached MVC model.
     */
    model?: ModelType;
    constructor(model?: ModelType);
    private get defaultBlockKey();
    /**
     * @function getBlock
     * @description Retrieves the callback block by the given blockKey.
     * @param {number | string} [blockKey] - The key of the block to retrieve.
     * @protected
     */
    protected getBlock(blockKey?: number | string): Map<string, ((...args: any[]) => void)[]>;
    /**
     * @function getOrGenerateBlock
     * @description Retrieves or creates a callback map for a given blockKey.
     * @param {number | string} [blockKey] - The block key.
     * @returns {Map<string, ((...args: any[]) => void)[]>} - The ensured callback map.
     * @protected
     */
    protected getOrGenerateBlock(blockKey?: number | string): Map<string, ((...args: any[]) => void)[]>;
    /**
     * @function getKey
     * @description Gets all callbacks for a given event key within a block.
     * @param {string} key - The event name.
     * @param {number | string} [blockKey] - The block in which the event is scoped.
     * @returns {((...args: any[]) => void)[]} - An array of callbacks for that event.
     * @protected
     */
    protected getKey(key: string, blockKey?: number | string): ((...args: any[]) => void)[];
    /**
     * @function getOrGenerateKey
     * @description Ensures and returns the array of callbacks for a given event key within a block.
     * @param {string} key - The event name.
     * @param {number | string} [blockKey] - The block in which the event is scoped.
     * @returns {((...args: any[]) => void)[]} - An array of callbacks for that event.
     * @protected
     */
    protected getOrGenerateKey(key: string, blockKey?: number | string): ((...args: any[]) => void)[];
    /**
     * @function addWithBlock
     * @description Registers a callback for an event key within a specified block -- usually for the corresponding
     * data block in the model.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block to register the event in.
     * @param {(...args: any[]) => void} callback - The callback function to invoke when the event is fired.
     */
    addWithBlock(key: string, blockKey: number | string, callback: (...args: any[]) => void): void;
    /**
     * @function add
     * @description Registers a callback for an event key in the default block.
     * @param {string} key - The event name.
     * @param {(...args: any[]) => void} callback - The callback function.
     */
    add(key: string, callback: (...args: any[]) => void): void;
    /**
     * @function removeWithBlock
     * @description Removes a specific callback or all callbacks for a key within a block.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block from which to remove the event.
     * @param {(...args: any[]) => void} [callback] - The specific callback to remove. If undefined, all callbacks
     * for the key are removed.
     */
    removeWithBlock(key: string, blockKey: number | string, callback?: (...args: any[]) => void): void;
    /**
     * @function remove
     * @description Removes a specific callback or all callbacks for a key in the default block.
     * @param {string} key - The event name.
     * @param {(...args: any[]) => void} [callback] - The callback to remove. If omitted, all callbacks are removed.
     */
    remove(key: string, callback?: (...args: any[]) => void): void;
    /**
     * @function fireWithBlock
     * @description Triggers all callbacks associated with an event key in a specified block.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block in which the event is scoped.
     * @param {...any[]} args - Arguments passed to each callback.
     */
    fireWithBlock(key: string, blockKey: string | number, ...args: any[]): void;
    /**
     * @function fire
     * @description Triggers all callbacks associated with an event key in the default block.
     * @param {string} key - The event name.
     * @param {...any[]} args - Arguments passed to the callback.
     */
    fire(key: string, ...args: any[]): void;
}

/**
 * @group MVC
 * @category Model
 */
type MvcBlocksType<Type extends "array" | "map" = "map", BlockType extends TurboDataBlock = TurboDataBlock> = Type extends "map" ? Map<string, BlockType> : BlockType[];
/**
 * @group MVC
 * @category Model
 */
type MvcBlockKeyType<Type extends "array" | "map" = "map"> = Type extends "map" ? string : number;
/**
 * @group MVC
 * @category View
 */
type TurboViewProperties<ElementType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = {
    element: ElementType;
    model?: ModelType;
    emitter?: EmitterType;
};

/**
 * @class TurboView
 * @group MVC
 * @category View
 *
 * @template {object} ElementType - The type of the element attached to the view.
 * @template {TurboModel} ModelType - The model type used in this view.
 * @template {TurboEmitter} EmitterType - The emitter type used in this view.
 * @description A base view class for MVC elements, providing structure for initializing and managing UI setup and
 * event listeners. Designed to be devoid of logic and only handle direct UI changes.
 */
declare class TurboView<ElementType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> {
    /**
     * @description The main component this view is attached to.
     */
    element: ElementType;
    /**
     * @description The model instance this view is bound to.
     */
    model?: ModelType;
    /**
     * @description The emitter instance used for event communication.
     */
    emitter?: EmitterType;
    /**
     * @constructor
     * @param {TurboViewProperties<ElementType, ModelType, EmitterType>} properties - Properties to initialize the view with.
     */
    constructor(properties: TurboViewProperties<ElementType, ModelType, EmitterType>);
    /**
     * @function initialize
     * @description Initializes the view by setting up change callbacks, UI elements, layout, and event listeners.
     */
    initialize(): void;
    /**
     * @function setupChangedCallbacks
     * @description Setup method for initializing data/model change listeners and associated UI logic.
     * @protected
     */
    protected setupChangedCallbacks(): void;
    /**
     * @function setupUIElements
     * @description Setup method for initializing and storing sub-elements of the UI.
     * @protected
     */
    protected setupUIElements(): void;
    /**
     * @function setupUILayout
     * @description Setup method for creating the layout structure and injecting sub-elements into the DOM tree.
     * @protected
     */
    protected setupUILayout(): void;
    /**
     * @function setupUIListeners
     * @description Setup method for defining DOM and input event listeners.
     * @protected
     */
    protected setupUIListeners(): void;
}

/**
 * @type {TurboControllerProperties}
 * @group MVC
 * @category Controller
 *
 * @extends {TurboViewProperties}
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description  Options used to create a new {@link TurboController} attached to an element.
 * @property {ViewType} [view] - The MVC view.
 */
type TurboControllerProperties<ElementType extends object = object, ViewType extends TurboView = TurboView, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboViewProperties<ElementType, ModelType, EmitterType> & {
    view?: ViewType;
};

/**
 * @group Types
 * @category Basics
 */
type FlexRect = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};
/**
 * @group Types
 * @category Basics
 */
type Coordinate<Type = number> = {
    x: Type;
    y: Type;
};
/**
 * @group Types
 * @category Basics
 */
type PartialRecord<Property extends keyof any, Value> = {
    [P in Property]?: Value;
};

/**
 * @group Components
 * @category Point
 */
declare class Point {
    readonly x: number;
    readonly y: number;
    /**
     * @description Create a point with coordinates (0, 0)
     */
    constructor();
    /**
     * @description Create a point with coordinates (n, n)
     * @param {number} n - The input value
     */
    constructor(n: number);
    /**
     * @description Create a point with coordinates (x, y)
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x: number, y: number);
    /**
     * @description Create a point with the clientX/clientY values. Useful for events.
     * @param {{clientX: number, clientY: number}} e - The coordinates
     */
    constructor(e: {
        clientX: number;
        clientY: number;
    });
    /**
     * @description Create a point with the provided coordinates
     * @param {Coordinate} p - The coordinates (or Point)
     */
    constructor(p: Coordinate);
    /**
     * @description Create a point with the provided [x, y] values.
     * @param {[number, number]} arr - The array of size 2.
     */
    constructor(arr: [number, number]);
    constructor(x: number | Coordinate | {
        clientX: number;
        clientY: number;
    } | [number, number]);
    /**
     * @description Calculate the distance between two Position2D points.
     * @param {Point} p1 - First point
     * @param {Point} p2 - Second point
     */
    static dist(p1: Coordinate, p2: Coordinate): number;
    /**
     * @description Calculate the mid-point from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static midPoint(...arr: Coordinate[]): Point;
    /**
     * @description Calculate the max on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static max(...arr: Coordinate[]): Point;
    /**
     * @description Calculate the min on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static min(...arr: Coordinate[]): Point;
    get object(): Coordinate;
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {Coordinate} p - The coordinates to compare it to
     * @return A boolean indicating whether they are equal
     */
    equals(p: Coordinate): boolean;
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @return A boolean indicating whether they are equal
     */
    equals(x: number, y: number): boolean;
    boundX(x1: number, x2: number): number;
    boundY(y1: number, y2: number): number;
    bound(n1: number, n2: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {number} n - The value to add to both x and y
     * @returns A new Point object with the result
     */
    add(n: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {number} x - The value to add to the x coordinate
     * @param {number} y - The value to add to the y coordinate
     * @returns A new Point object with the result
     */
    add(x: number, y: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {Coordinate} p - The coordinates to add
     * @returns A new Point object with the result
     */
    add(p: Coordinate): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {number} n - The value to subtract from both x and y
     * @returns A new Point object with the result
     */
    sub(n: number): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {number} x - The value to subtract from the x coordinate
     * @param {number} y - The value to subtract from the y coordinate
     * @returns A new Point object with the result
     */
    sub(x: number, y: number): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {Coordinate} p - The coordinates to subtract
     * @returns A new Point object with the result
     */
    sub(p: Coordinate): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {number} n - The value to multiply both x and y
     * @returns A new Point object with the result
     */
    mul(n: number): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {number} x - The value to multiply the x coordinate
     * @param {number} y - The value to multiply the y coordinate
     * @returns A new Point object with the result
     */
    mul(x: number, y: number): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {Coordinate} p - The coordinates to multiply
     * @returns A new Point object with the result
     */
    mul(p: Coordinate): Point;
    /**
     * @description Divide coordinates of this point
     * @param {number} n - The value to divide both x and y
     * @returns A new Point object with the result
     */
    div(n: number): Point;
    /**
     * @description Divide coordinates of this point
     * @param {number} x - The value to divide the x coordinate
     * @param {number} y - The value to divide the y coordinate
     * @returns A new Point object with the result
     */
    div(x: number, y: number): Point;
    /**
     * @description Divide coordinates of this point
     * @param {Coordinate} p - The coordinates to divide with
     * @returns A new Point object with the result
     */
    div(p: Coordinate): Point;
    /**
     * @description Mod coordinates of this point
     * @param {number} n - The value to mod both x and y
     * @returns A new Point object with the result
     */
    mod(n: number): Point;
    /**
     * @description Mod coordinates of this point
     * @param {number} x - The value to mod the x coordinate
     * @param {number} y - The value to mod the y coordinate
     * @returns A new Point object with the result
     */
    mod(x: number, y: number): Point;
    /**
     * @description Mod coordinates of this point
     * @param {Coordinate} p - The coordinates to mod with
     * @returns A new Point object with the result
     */
    mod(p: Coordinate): Point;
    /**
     * @description Calculate the absolute value of the coordinates
     * @returns A new Point object with the absolute values
     */
    get abs(): Point;
    /**
     * @description Get the maximum value between x and y coordinates
     * @returns The maximum value
     */
    get max(): number;
    /**
     * @description Get the minimum value between x and y coordinates
     * @returns The minimum value
     */
    get min(): number;
    get length2(): number;
    get length(): number;
    dot(p: Point): number;
    /**
     * @description Create a copy of the current point
     * @returns A new Point object with the same coordinates
     */
    copy(): Point;
    /**
     * @description Get the coordinates as an array
     * @returns An array with x and y coordinates
     */
    arr(): number[];
}

/**
 * @group Event Handling
 * @category TurboEventManager
 */
type TurboEventManagerStateProperties = {
    enabled?: boolean;
    preventDefaultWheel?: boolean;
    preventDefaultMouse?: boolean;
    preventDefaultTouch?: boolean;
};
/**
 * @group Event Handling
 * @category TurboEventManager
 */
type DisabledTurboEventTypes = {
    disableKeyEvents?: boolean;
    disableWheelEvents?: boolean;
    disableMouseEvents?: boolean;
    disableTouchEvents?: boolean;
    disableClickEvents?: boolean;
    disableDragEvents?: boolean;
    disableMoveEvent?: boolean;
};
/**
 * @group Event Handling
 * @category TurboEventManager
 */
type TurboEventManagerProperties = TurboEventManagerStateProperties & DisabledTurboEventTypes & {
    moveThreshold?: number;
    longPressDuration?: number;
    authorizeEventScaling?: boolean | (() => boolean);
    scaleEventPosition?: (position: Point) => Point;
};
/**
 * @group Event Handling
 * @category TurboEventManager
 */
type TurboEventManagerLockStateProperties = TurboEventManagerStateProperties & {
    lockOrigin?: Node;
};
/**
 * @group Event Handling
 * @category TurboEventManager
 *
 * @description Object representing options passed to the ToolManager's setTool() function.
 * @property select - Indicate whether to visually select the tool on all toolbars, defaults to true
 * @property activate - Indicate whether to fire activation on the tool when setting it, defaults to true
 * @property setAsNoAction - Indicate whether the tool will also be set as the tool for ClickMode == none, defaults
 * to true if the click mode is left.
 */
type SetToolOptions = {
    select?: boolean;
    activate?: boolean;
    setAsNoAction?: boolean;
};
/**
 * @group Event Handling
 * @category Enums
 */
declare enum ActionMode {
    none = 0,
    click = 1,
    longPress = 2,
    drag = 3
}
/**
 * @group Event Handling
 * @category Enums
 */
declare enum ClickMode {
    none = 0,
    left = 1,
    right = 2,
    middle = 3,
    other = 4,
    key = 5
}
/**
 * @group Event Handling
 * @category Enums
 */
declare enum InputDevice {
    unknown = 0,
    mouse = 1,
    trackpad = 2,
    touch = 3
}

declare class TurboEventManagerUtilsHandler extends TurboHandler<TurboEventManagerModel> {
    keyName: string;
    setClickMode(button: number, isTouch?: boolean): ClickMode;
    applyEventNames(eventNames: Record<string, string>): void;
    setTimer(timerName: string, callback: () => void, duration: number): void;
    clearTimer(timerName: string): void;
    selectTool(element: Node, value: boolean): void;
    activateTool(element: Node, toolName: string, value: boolean): void;
}

/**
 * @group Components
 * @category TurboMap
 */
declare class TurboMap<KeyType, ValueType> extends Map<KeyType, ValueType> {
    enforceImmutability: boolean;
    set(key: KeyType, value: ValueType): any;
    get(key: KeyType): ValueType;
    get first(): ValueType | null;
    get last(): ValueType | null;
    keysArray(): KeyType[];
    valuesArray(): ValueType[];
    private copy;
    mapKeys<C>(callback: (key: KeyType, value: ValueType) => C): TurboMap<C, ValueType>;
    mapValues<C>(callback: (key: KeyType, value: ValueType) => C): TurboMap<KeyType, C>;
    filter(callback: (key: KeyType, value: ValueType) => boolean): TurboMap<KeyType, ValueType>;
    merge(map: Map<KeyType, ValueType>): TurboMap<KeyType, ValueType>;
}

declare class TurboEventManagerModel extends TurboModel {
    utils: TurboEventManagerUtilsHandler;
    readonly state: TurboEventManagerStateProperties;
    readonly lockState: TurboEventManagerLockStateProperties;
    readonly onInputDeviceChange: Delegate<(device: InputDevice) => void>;
    /**
     * @description Delegate fired when a tool is changed on a certain click button/mode
     */
    readonly onToolChange: Delegate<(oldTool: Node, newTool: Node, type: ClickMode) => void>;
    readonly currentKeys: string[];
    currentAction: ActionMode;
    currentClick: ClickMode;
    wasRecentlyTrackpad: boolean;
    moveThreshold: number;
    longPressDuration: number;
    authorizeEventScaling: boolean | (() => boolean);
    scaleEventPosition: (position: Point) => Point;
    activePointers: Set<number>;
    readonly origins: TurboMap<number, Point>;
    readonly previousPositions: TurboMap<number, Point>;
    positions: TurboMap<number, Point>;
    lastTargetOrigin: Node;
    readonly timerMap: TurboMap<string, NodeJS.Timeout>;
    readonly tools: Map<string, TurboWeakSet<Node>>;
    readonly mappedKeysToTool: Map<string, string>;
    readonly currentTools: Map<ClickMode, Node>;
    set inputDevice(value: InputDevice);
}

/**
 * @class TurboController
 * @group MVC
 * @category Controller
 *
 * @description The MVC base controller class. Its main job is to handle some part of (or all of) the logic of the
 * component. It has access to the element, the model to read and write data, the view to update the UI, and the
 * emitter to listen for changes in the model or any other internal events. It can only communicate with other
 * controllers via the emitter (by firing or listening for changes on a certain key).
 * @template {object} ElementType - The type of the main component.
 * @template {TurboView} ViewType - The element's MVC view type.
 * @template {TurboModel} ModelType - The element's MVC model type.
 * @template {TurboEmitter} EmitterType - The element's MVC emitter type.
 */
declare class TurboController<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> {
    /**
     * @description The key of the controller. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the controller's class name is MyElementSomethingController, the key would
     * default to "something".
     */
    keyName: string;
    /**
     * @description The element it is bound to.
     */
    element: ElementType;
    /**
     * @description The MVC view.
     */
    view: ViewType;
    /**
     * @description The MVC model.
     */
    model: ModelType;
    /**
     * @description The MVC emitter.
     */
    emitter: EmitterType;
    constructor(properties: TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType>);
    /**
     * @function initialize
     * @description Initializes the controller. Specifically, it will set up the change callbacks.
     */
    initialize(): void;
    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks.
     * @protected
     */
    protected setupChangedCallbacks(): void;
}

declare class TurboEventManagerKeyController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    keyName: string;
    keyDown: (e: KeyboardEvent) => void;
    protected keyDownFn(e: KeyboardEvent): void;
    keyUp: (e: KeyboardEvent) => void;
    protected keyUpFn(e: KeyboardEvent): void;
}

declare class TurboEventManagerWheelController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    keyName: string;
    wheel: (e: WheelEvent) => void;
}

declare class TurboEventManagerPointerController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    keyName: string;
    pointerDown: (e: PointerEvent) => void;
    pointerMove: (e: PointerEvent) => void;
    pointerUp: (e: PointerEvent) => void;
    pointerCancel: (e: PointerEvent) => void;
    lostPointerCapture: (e: PointerEvent) => void;
    protected pointerDownFn(e: PointerEvent): void;
    protected pointerMoveFn(e: PointerEvent): void;
    protected pointerUpFn(e: PointerEvent): void;
    protected pointerCancelFn(e: PointerEvent): void;
    protected lostPointerCaptureFn(_e: PointerEvent): void;
    /**
     * @description Fires a custom Turbo click event at the click target with the click position
     * @param p
     * @param eventName
     * @private
     */
    private fireClick;
    /**
     * @description Fires a custom Turbo drag event at the target with the origin of the drag, the last drag position, and the current position
     * @param positions
     * @param eventName
     * @private
     */
    private fireDrag;
    private getFireOrigin;
}

/**
 * @group Types
 * @category Event Names
 */
declare const TurboKeyEventName: {
    readonly keyPressed: "turbo-key-pressed";
    readonly keyReleased: "turbo-key-released";
};
/**
 * @group Types
 * @category Event Names
 */
declare const DefaultKeyEventName: {
    readonly keyPressed: "keydown";
    readonly keyReleased: "keyup";
};
/**
 * @group Types
 * @category Event Names
 */
declare const TurboClickEventName: {
    readonly click: "turbo-click";
    readonly clickStart: "turbo-click-start";
    readonly clickEnd: "turbo-click-end";
    readonly longPress: "turbo-long-press";
};
/**
 * @group Types
 * @category Event Names
 */
declare const DefaultClickEventName: {
    readonly click: "click";
    readonly clickStart: "mousedown";
    readonly clickEnd: "mouseup";
    readonly longPress: "turbo-long-press";
};
/**
 * @group Types
 * @category Event Names
 */
declare const TurboMoveEventName: {
    readonly move: "turbo-move";
};
/**
 * @group Types
 * @category Event Names
 */
declare const DefaultMoveEventName: {
    readonly move: "mousemove";
};
/**
 * @group Types
 * @category Event Names
 */
declare const TurboDragEventName: {
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
};
/**
 * @group Types
 * @category Event Names
 */
declare const DefaultDragEventName: {
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
};
/**
 * @group Types
 * @category Event Names
 */
declare const TurboWheelEventName: {
    readonly trackpadScroll: "turbo-trackpad-scroll";
    readonly trackpadPinch: "turbo-trackpad-pinch";
    readonly mouseWheel: "turbo-mouse-wheel";
};
/**
 * @group Types
 * @category Event Names
 */
declare const DefaultWheelEventName: {
    readonly trackpadScroll: "wheel";
    readonly trackpadPinch: "wheel";
    readonly mouseWheel: "wheel";
};
/**
 * @group Types
 * @category Event Names
 */
declare const TurboEventName: {
    readonly selectInput: "turbo-select-input";
    readonly trackpadScroll: "turbo-trackpad-scroll";
    readonly trackpadPinch: "turbo-trackpad-pinch";
    readonly mouseWheel: "turbo-mouse-wheel";
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
    readonly move: "turbo-move";
    readonly keyPressed: "turbo-key-pressed";
    readonly keyReleased: "turbo-key-released";
    readonly click: "turbo-click";
    readonly clickStart: "turbo-click-start";
    readonly clickEnd: "turbo-click-end";
    readonly longPress: "turbo-long-press";
};
/**
 * @group Types
 * @category Event Names
 *
 * @description Object containing the names of events fired by default by the turboComponents. Modifying it (prior to
 * setting up new turbo components) will subsequently alter the events that the instantiated components will listen for.
 */
declare const DefaultEventName: {
    wheel: string;
    scroll: string;
    input: string;
    change: string;
    focus: string;
    focusIn: string;
    focusOut: string;
    blur: string;
    resize: string;
    compositionStart: string;
    compositionEnd: string;
    trackpadScroll: "wheel";
    trackpadPinch: "wheel";
    mouseWheel: "wheel";
    drag: "turbo-drag";
    dragStart: "turbo-drag-start";
    dragEnd: "turbo-drag-end";
    move: "mousemove";
    click: "click";
    clickStart: "mousedown";
    clickEnd: "mouseup";
    longPress: "turbo-long-press";
    keyPressed: "keydown";
    keyReleased: "keyup";
};
/**
 * @group Types
 * @category Event Names
 */
type DefaultEventNameKey = keyof typeof DefaultEventName;
/**
 * @group Types
 * @category Event Names
 */
type DefaultEventNameEntry = typeof DefaultEventName[DefaultEventNameKey];
/**
 * @group Types
 * @category Event Names
 */
type TurboEventNameKey = keyof typeof TurboEventName;
/**
 * @group Types
 * @category Event Names
 */
type TurboEventNameEntry = typeof TurboEventName[TurboEventNameKey];

/**
 * @group Event Handling
 * @category Enums
 */
declare enum ClosestOrigin {
    target = "target",
    position = "position"
}
/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboRawEventProperties = {
    clickMode?: ClickMode;
    keys?: string[];
    eventName?: TurboEventNameEntry;
    eventManager?: TurboEventManager;
    toolName?: string;
    authorizeScaling?: boolean | (() => boolean);
    scalePosition?: (position: Point) => Point;
    eventInitDict?: EventInit;
};
/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboEventProperties = TurboRawEventProperties & {
    position?: Point;
};
/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboDragEventProperties = TurboRawEventProperties & {
    origins?: TurboMap<number, Point>;
    previousPositions?: TurboMap<number, Point>;
    positions?: TurboMap<number, Point>;
};
/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboKeyEventProperties = TurboRawEventProperties & {
    keyPressed?: string;
    keyReleased?: string;
};
/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboWheelEventProperties = TurboRawEventProperties & {
    delta?: Point;
};

/**
 * @class TurboEvent
 * @group Event Handling
 * @category TurboEvents
 * @description Generic turbo event.
 */
declare class TurboEvent extends Event {
    /**
     * @description The event manager that fired this event.
     */
    readonly eventManager: TurboEventManager;
    /**
     * @description The name of the tool (if any) associated with this event.
     */
    readonly toolName: string;
    /**
     * @description The name of the event.
     */
    readonly eventName: TurboEventNameEntry;
    /**
     * @description The click mode of the fired event
     */
    readonly clickMode: ClickMode;
    /**
     * @description The keys pressed when the event was fired
     */
    readonly keys: string[];
    /**
     * @description The screen position from where the event was fired
     */
    readonly position: Point;
    /**
     * @description Callback function (or boolean) to be overridden to specify when to allow transformation
     * and/or scaling.
     */
    authorizeScaling: boolean | (() => boolean);
    /**
     * @description Callback function to be overridden to specify how to transform a position from screen to
     * document space.
     */
    scalePosition: (position: Point) => Point;
    constructor(properties: TurboEventProperties);
    /**
     * @description The tool (if any) associated with this event.
     */
    get tool(): Node;
    /**
     * @description Returns the closest element of the provided type to the target (Searches through the element and
     * all its parents to find one of matching type).
     * @param type
     * @param strict
     * @param from
     */
    closest<T extends Element>(type: new (...args: any[]) => T, strict?: Element | boolean, from?: ClosestOrigin): T | null;
    /**
     * @description Checks if the position is inside the given element's bounding box.
     * @param position
     * @param element
     */
    private isPositionInsideElement;
    /**
     * @description The target of the event (as an Element - or the document)
     */
    get target(): Element | Document;
    /**
     * @description The position of the fired event transformed and/or scaled using the class's scalePosition().
     */
    get scaledPosition(): Point;
    /**
     * @description Specifies whether to allow transformation and/or scaling.
     */
    get scalingAuthorized(): boolean;
    /**
     * @private
     * @description Takes a map of points and returns a new map where each point is transformed accordingly.
     * @param positions
     */
    protected scalePositionsMap(positions?: TurboMap<number, Point>): TurboMap<number, Point>;
}

declare class TurboEventManagerDispatchController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    keyName: string;
    private boundHooks;
    protected setupChangedCallbacks(): void;
    protected dispatchEvent: <EventType extends TurboEvent = TurboEvent, PropertiesType extends TurboRawEventProperties = TurboRawEventProperties>(target: Node, eventType: new (properties: PropertiesType) => EventType, properties: Partial<PropertiesType>) => void;
    private getToolHandlingCallback;
    setupCustomDispatcher(type: string): void;
    removeCustomDispatcher(type: string): void;
}

/**
 * @group Types
 * @category Event
 */
type ListenerEntry = {
    target: Node;
    type: string;
    toolName?: string;
    listener: ((e: Event, el: Node) => boolean | any);
    bundledListener: ((e: Event) => boolean | any);
    options?: ListenerOptions;
    manager: TurboEventManager;
};
/**
 * @group Types
 * @category Event
 */
type ListenerOptions = AddEventListenerOptions;
/**
 * @group Types
 * @category Event
 */
type PreventDefaultOptions = {
    types?: string[];
    phase?: "capture" | "bubble";
    stop?: false | "stop" | "immediate";
    preventDefaultOn?: (type: string, e: Event) => boolean;
    clearPreviousListeners?: boolean;
    manager?: TurboEventManager;
};
/**
 * @group Types
 * @category Event
 */
declare const BasicInputEvents: readonly ["mousedown", "mouseup", "mousemove", "click", "dblclick", "contextmenu", "dragstart", "selectstart", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "wheel"];
/**
 * @group Types
 * @category Event
 */
declare const NonPassiveEvents: readonly ["wheel", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointercancel"];

/**
 * @class TurboInteractor
 * @group MVC
 * @category Interactor
 *
 * @extends TurboController
 * @template {object} ElementType - The type of the main component.
 * @template {TurboView} ViewType - The element's MVC view type.
 * @template {TurboModel} ModelType - The element's MVC model type.
 * @template {TurboEmitter} EmitterType - The element's MVC emitter type.
 * @description Class representing an MVC interactor. It holds event listeners to set up on the element itself, or
 * the custom defined target.
 */
declare class TurboInteractor<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the interactor. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the interactor's class name is MyElementSomethingInteractor, the key would
     * default to "something".
     */
    keyName: string;
    /**
     * @description The target of the event listeners. Defaults to the element itself.
     */
    accessor target: Node;
    /**
     * @readonly
     * @description The name of the tool (if any) to listen for.
     */
    readonly toolName: string;
    /**
     * @readonly
     * @description The associated event manager. Defaults to `TurboEventManager.instance`.
     */
    readonly manager: TurboEventManager;
    /**
     *
     * @readonly
     * @description Optional custom options to define per event type.
     */
    readonly options: PartialRecord<DefaultEventNameKey, ListenerOptions>;
    constructor(properties: TurboInteractorProperties<ElementType, ViewType, ModelType, EmitterType>);
    /**
     * @function initialize
     * @description Initialization function that sets up all the defined evnt listeners and attaches them to the target.
     */
    initialize(): void;
}

/**
 * @class TurboSelector
 * @group TurboSelector
 *
 * @template {object} Type - The type of the object it wraps.
 * @description Selector class that wraps an object and augments it with useful functions to manipulate it. It also
 * proxies the object, so you can access properties and methods on the underlying object directly through the selector.
 */
declare class TurboSelector<Type extends object = Node> {
    #private;
    /**
     * @description The underlying, wrapped object.
     */
    element: Type;
    constructor();
}

/**
 * @group TurboSelector
 */
type Turbo<Type extends object = Node> = TurboSelector<Type> & Type;
/**
 * @group TurboSelector
 */
type TurbofyOptions = {
    excludeHierarchyFunctions?: boolean;
    excludeStyleFunctions?: boolean;
    excludeClassFunctions?: boolean;
    excludeElementFunctions?: boolean;
    excludeEventFunctions?: boolean;
    excludeToolFunctions?: boolean;
    excludeSubstrateFunctions?: boolean;
    excludeMiscFunctions?: boolean;
    excludeReifectFunctions?: boolean;
};
/**
 * @type {TurboToolProperties}
 * @group MVC
 * @category Tool
 *
 * @extends TurboControllerProperties
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboTool} attached to an element.
 * @property {string} [toolName] - The name of the tool.
 * @property {Node} [embeddedTarget] - If the tool is embedded, its target.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to. Defaults to the
 * default click event name.
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
 * @property {(element: Turbo<Element>, manager: TurboEventManager) => void} [customActivation] - Custom activation
 * function. If provided, is called with `(el, manager)` to define when the tool is activated.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
 * to `TurboEventManager.instance`.
 */
type TurboToolProperties<ElementType extends object = object, ViewType extends TurboView = TurboView, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    toolName?: string;
    embeddedTarget?: Node;
    onActivate?: () => void;
    onDeactivate?: () => void;
    activationEvent?: DefaultEventNameEntry;
    clickMode?: ClickMode;
    customActivation?: (element: Turbo<Element>, manager: TurboEventManager) => void;
    key?: string;
    manager?: TurboEventManager;
};

/**
 * @class TurboTool
 * @group MVC
 * @category Tool
 *
 * @extends TurboController
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 * @description Class representing a tool in MVC, bound to the provided element.
 */
declare class TurboTool<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the tool. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the tool's class name is MyElementSomethingTool, the key would
     * default to "something".
     */
    keyName: string;
    /**
     * @description The name of the tool.
     */
    toolName: string;
    /**
     * @readonly
     * @description The target of this tool. If defined, will embed the tool.
     */
    readonly embeddedTarget: Node;
    /**
     * @readonly
     * @description The associated event manager. Defaults to `TurboEventManager.instance`.
     */
    readonly manager: TurboEventManager;
    /**
     * @readonly
     * @description Custom activation event to listen to. Defaults to the default click event name.
     */
    readonly activationEvent: DefaultEventNameEntry;
    /**
     * @readonly
     * @description Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
     */
    readonly clickMode: ClickMode;
    /**
     * @readonly
     * @description Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
     */
    readonly key: string;
    constructor(properties: TurboToolProperties<ElementType, ViewType, ModelType, EmitterType>);
    /**
     * @function initialize
     * @override
     * @description Initialization function that calls {@link makeTool} on `this.element`, sets it up, and attaches
     * all the defined tool behaviors.
     */
    initialize(): void;
}

/**
 * @type {TurboSubstrateProperties}
 * @group MVC
 * @category Substrate
 *
 * @extends TurboControllerProperties
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboSubstrate} attached to an element.
 * @property {string} [substrateName] - The name of the substrate.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 */
type TurboSubstrateProperties<ElementType extends object = object, ViewType extends TurboView = TurboView, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    substrateName?: string;
    onActivate?: () => void;
    onDeactivate?: () => void;
};
/**
 * @type {MakeSubstrateOptions}
 * @group Types
 * @category Substrate
 *
 * @description Type representing objects used to configure the creation of substrates. Used in {@link makeSubstrate}.
 * @property {() => void} [onActivate] - Callback function to execute when the substrate is activated.
 * @property {() => void} [onDeactivate] - Callback function to execute when the substrate is deactivated.
 */
type MakeSubstrateOptions = {
    onActivate?: () => void;
    onDeactivate?: () => void;
};
/**
 * @type {SubstrateSolverProperties}
 * @group Types
 * @category Substrate
 *
 * @description Type representing objects passed as context for resolving substrates. GIven as first parameters to
 * solvers when executing them via {@link resolveSubstrate}.
 * @property {string} [substrate] - The targeted substrate. Defaults to `currentSubstrate`.
 * @property {object} [target] - The current object being processed by the solver. Property set by
 * {@link resolveSubstrate} when processing every object in the substrate's list.
 * @property {Event} [event] - The event (if any) that fired the resolving of the substrate.
 * @property {string} [eventType] - The type of the event.
 * @property {Node} [eventTarget] - The target of the event.
 * @property {string} [toolName] - The name of the active tool when the event was fired.
 * @property {ListenerOptions} [eventOptions] - The options of the event.
 * @property {TurboEventManager} [manager] - The event manager that captured the event. Defaults to the first
 * instantiated event manager.
 */
type SubstrateSolverProperties = {
    substrate?: string;
    target?: object;
    event?: Event;
    eventType?: string;
    eventTarget?: Node;
    toolName?: string;
    eventOptions?: ListenerOptions;
    manager?: TurboEventManager;
};
/**
 * @type {SubstrateSolver}
 * @group Types
 * @category Substrate
 *
 * @description Type representing the signature of solver functions that substrates expect.
 */
type SubstrateSolver = (properties: SubstrateSolverProperties, ...args: any[]) => any;

/**
 * @class TurboSubstrate
 * @group MVC
 * @category Substrate
 *
 * @extends TurboController
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 * @description Class representing a substrate in MVC, bound to the provided element.
 */
declare class TurboSubstrate<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the substrate. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the substrate's class name is MyElementSomethingSubstrate, the key would
     * default to "something".
     */
    keyName: string;
    /**
     * @description The name of the substrate.
     */
    readonly substrateName: string;
    /**
     * @description The property keys of the substrate solvers defined in the instance.
     */
    readonly solverKeys: string[];
    /**
     * @description The list of objects constrained by the substrate. Retrieving it will return a shallow copy as a
     * Set. Use {@link addObject} and {@link removeObject} to manipulate the list.
     */
    get objectList(): Set<object>;
    set objectList(value: HTMLCollection | NodeList | Set<object>);
    constructor(properties: TurboSubstrateProperties<ElementType, ViewType, ModelType, EmitterType>);
    /**
     * @function initialize
     * @override
     * @description Initialization function that calls {@link makeSubstrate} on `this.element`, sets it up, and attaches
     * all the defined solvers.
     */
    initialize(): void;
    /**
     * @function addObject
     * @description Adds the provided object to the substrate's list.
     * @param {object} object - The object to add.
     */
    addObject(object: object): void;
    /**
     * @function removeObject
     * @description Removes the provided object from the substrate's list.
     * @param {object} object - The object to remove.
     */
    removeObject(object: object): void;
    /**
     * @function hasObject
     * @description Whether the provided object is included in the substrate's list.
     * @param {object} object - The object to check.
     * @return {boolean} - Whether the object is present.
     */
    hasObject(object: object): boolean;
    /**
     * @function isProcessed
     * @description Whether the provided object is processed within the current resolving loop.
     * @param {object} object - The object to check.
     * @return {boolean} - Whether the object was processed.
     */
    isProcessed(object: object): boolean;
    /**
     * @function addSolver
     * @description Add the given function as a solver in the substrate.
     * @param {SubstrateSolver} fn - The solver function to execute when calling {@link resolve}.
     */
    addSolver(fn: SubstrateSolver): void;
    /**
     * @function removeSolver
     * @description Remove the given function from the substrate's list of solvers.
     * @param {SubstrateSolver} fn - The solver function to remove.
     */
    removeSolver(fn: SubstrateSolver): void;
    /**
     * @function clearSolvers
     * @description Remove all solvers attached to the substrate.
     */
    clearSolvers(): void;
    /**
     * @function resolve
     * @description Resolve the substrate by calling all the solvers on each of the objects in the substrate's list.
     * @param {SubstrateSolverProperties} [properties={}] - Optional properties to provide context to the resolving loop.
     */
    resolve(properties?: SubstrateSolverProperties): void;
}

/**
 * @class Mvc
 * @group MVC
 * @category MVC
 *
 * @description MVC -- Model-View-Component -- handler. Generates and manages an MVC structure for a certain object.
 * @template {object} ElementType - The type of the object that will be turned into MVC.
 * @template {TurboView} ViewType - The element's view type.
 * @template {object} DataType - The element's data type.
 * @template {TurboModel<DataType>} ModelType - The element's model type.
 * @template {TurboEmitter} EmitterType - The element's emitter type.
 * */
declare class Mvc<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter<any>> {
    /**
     * @description The element/root of the MVC structure.
     */
    readonly element: ElementType;
    private _view;
    private _model;
    private _emitter;
    private readonly _controllers;
    private readonly _handlers;
    private readonly _interactors;
    private readonly _tools;
    private readonly _substrates;
    constructor(properties: MvcProperties<ElementType, ViewType, DataType, ModelType, EmitterType>);
    /**
     * @description The view (if any) of the current MVC structure. Setting it will update the view and link it
     * with the existing pieces.
     */
    get view(): ViewType;
    set view(value: ViewType | (new (properties: TurboViewProperties) => ViewType));
    /**
     * @description The model (if any) of the current MVC structure. Setting it will update the model and link it
     * with the existing pieces.
     */
    get model(): ModelType;
    set model(model: ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType));
    /**
     * @description The emitter (if any) of the current MVC structure. Setting it will update the emitter and link it
     * with the existing pieces.
     */
    get emitter(): EmitterType;
    set emitter(emitter: EmitterType | (new (properties: ModelType) => EmitterType));
    /**
     * @description The controllers (if any) of the current MVC structure. Setting it will not override the existing
     * controllers, but only add the new values and link them with the existing pieces.
     */
    get controllers(): TurboController[];
    set controllers(value: MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>);
    /**
     * @description The handlers (if any) of the current MVC structure. Setting it will not override the existing
     * handlers, but only add the new values and link them with the existing pieces.
     */
    get handlers(): TurboHandler[];
    set handlers(value: MvcManyInstancesOrConstructors<TurboHandler>);
    /**
     * @description The interactors (if any) of the current MVC structure. Setting it will not override the existing
     * interactors, but only add the new values and link them with the existing pieces.
     */
    get interactors(): TurboInteractor[];
    set interactors(value: MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>);
    /**
     * @description The tools (if any) of the current MVC structure. Setting it will not override the existing
     * tools, but only add the new values and link them with the existing pieces.
     */
    get tools(): TurboTool[];
    set tools(value: MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>);
    /**
     * @description The substrates (if any) of the current MVC structure. Setting it will not override the existing
     * substrates, but only add the new values and link them with the existing pieces.
     */
    get substrates(): TurboSubstrate[];
    set substrates(value: MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>);
    /**
     * @description The main data block (if any) attached to the model (if any).
     */
    get data(): DataType;
    set data(data: DataType);
    /**
     * @description The ID of the main data block (if any) attached to the model (if any).
     */
    get dataId(): string;
    set dataId(value: string);
    /**
     * @description The numerical index of the main data block (if any) attached to the model (if any).
     */
    get dataIndex(): number;
    set dataIndex(value: number);
    /**
     * @description The size (number) of the main data block (if any) attached to the model (if any).
     */
    get dataSize(): number;
    /**
     * @function getController
     * @description Retrieves the attached MVC controller with the given key.
     * By default, unless manually defined in the controller, if the element's class name is MyElement
     * and the controller's class name is MyElementSomethingController, the key would be "something".
     * @param {string} key - The controller's key.
     * @return {TurboController} - The controller.
     */
    getController(key: string): TurboController;
    /**
     * @function addController
     * @description Adds the given controller to the MVC structure.
     * @param {TurboController} controller - The controller to add.
     */
    addController(controller: TurboController): void;
    /**
     * @function getHandler
     * @description Retrieves the attached MVC handler with the given key.
     * By default, unless manually defined in the handler, if the element's class name is MyElement
     * and the handler's class name is MyElementSomethingHandler, the key would be "something".
     * @param {string} key - The handler's key.
     * @return {TurboHandler} - The handler.
     */
    getHandler(key: string): TurboHandler;
    /**
     * @function addHandler
     * @description Adds the given handler to the MVC structure.
     * @param {TurboHandler} handler - The handler to add.
     */
    addHandler(handler: TurboHandler): void;
    /**
     * @function getInteractor
     * @description Retrieves the attached MVC interactor with the given key.
     * By default, unless manually defined in the interactor, if the element's class name is MyElement
     * and the interactor's class name is MyElementSomethingInteractor, the key would be "something".
     * @param {string} key - The interactor's key.
     * @return {TurboInteractor} - The interactor.
     */
    getInteractor(key: string): TurboInteractor;
    /**
     * @function addInteractor
     * @description Adds the given interactor to the MVC structure.
     * @param {TurboInteractor} interactor - The interactor to add.
     */
    addInteractor(interactor: TurboInteractor): void;
    /**
     * @function getTool
     * @description Retrieves the attached MVC Tool with the given key.
     * By default, unless manually defined in the tool, if the element's class name is MyElement
     * and the tool's class name is MyElementSomethingTool, the key would be "something".
     * @param {string} key - The tool's key.
     * @return {TurboTool} - The tool.
     */
    getTool(key: string): TurboTool;
    /**
     * @function addTool
     * @description Adds the given tool to the MVC structure.
     * @param {TurboTool} tool - The tool to add.
     */
    addTool(tool: TurboTool): void;
    /**
     * @function getSubstrate
     * @description Retrieves the attached MVC Substrate with the given key.
     * By default, unless manually defined in the substrate, if the element's class name is MyElement
     * and the substrate's class name is MyElementSomethingSubstrate, the key would be "something".
     * @param {string} key - The substrate's key.
     * @return {TurboSubstrate} - The substrate.
     */
    getSubstrate(key: string): TurboSubstrate;
    /**
     * @function addSubstrate
     * @description Adds the given substrate to the MVC structure.
     * @param {TurboSubstrate} substrate - The substrate to add.
     */
    addSubstrate(substrate: TurboSubstrate): void;
    /**
     * @function generate
     * @description Generates the MVC structure based on the provided properties.
     * If no model or model constructor is defined, no model will be generated. The same applies for the view.
     * If not defined, a default emitter will be created.
     * @param {MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>} properties - The properties to use
     * to generate the MVC structure.
     */
    generate(properties?: MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>): void;
    /**
     * @function initialize
     * @description Initializes the MVC parts: the view, the controllers, the interactors, the tools, the substrates,
     * and the model (in this order). The model is initialized last to allow for the view and controllers to set up
     * their change callbacks.
     */
    initialize(): void;
    protected updateController(controller: TurboController): void;
    protected updateHandler(handler: TurboHandler): void;
    protected updateInteractor(interactor: TurboInteractor): void;
    protected updateTool(tool: TurboTool): void;
    protected updateSubstrate(substrate: TurboSubstrate): void;
    protected linkPieces(): void;
    private generateInstance;
    private generateInstances;
    private emitterFireCallback;
    protected extractClassEssenceName(constructor: new (...args: any[]) => any, type: string): string;
}

/**
 * @internal
 */
interface TurboElementMvcInterface<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> {
    /**
     * @description The view (if any) of the element.
     */
    view: ViewType;
    /**
     * @description The model (if any) of the element.
     */
    model: ModelType;
    /**
     * @description The main data block (if any) attached to the element, taken from its model (if any).
     */
    data: DataType;
    /**
     * @description The ID of the main data block (if any) of the element, taken from its model (if any).
     */
    dataId: string;
    /**
     * @description The numerical index of the main data block (if any) of the element, taken from its model (if any).
     */
    dataIndex: number;
    /**
     * @description The size (number) of the main data block (if any) of the element, taken from its model (if any).
     */
    readonly dataSize: number;
}

/**
 * @internal
 */
interface TurboElementDefaultInterface {
    /**
     * @description Whether the element is selected or not.
     */
    selected: boolean;
    /**
     * @function getPropertiesValue
     * @description Returns the value with some fallback mechanisms on the static config field and a default value.
     * @param {Type} propertiesValue - The actual value; could be null.
     * @param {string} [configFieldName] - The field name of the associated value in the static config. Will be returned
     * if the actual value is null.
     * @param {Type} [defaultValue] - The default fallback value. Will be returned if both the actual and
     * config values are null.
     * @protected
     */
    getPropertiesValue<Type>(propertiesValue: Type, configFieldName?: string, defaultValue?: Type): Type;
    /**
     * @function destroy
     * @description Destroys the node by removing it from the document and removing all its bound listeners.
     * @returns {this} Itself, allowing for method chaining.
     */
    destroy(): this;
    /**
     * @function initialize
     * @description Initializes the element. It sets up the UI by calling the methods `setupUIElements`,
     * `setupUILayout`, `setupUIListeners`, and `setupChangedCallbacks` (in this order, if they are defined).
     * This function is called automatically in `.setProperties()` and when instantiating an
     * element via `element()`. It is called only once per element (as it checks with the reflected `initialized` flag).
     */
    initialize(): void;
    /**
     * @readonly
     * @description Whether the element was initialized already or not.
     */
    readonly initialized: boolean;
}

/**
 * @type {TurboHeadlessProperties}
 * @group TurboElement
 * @category TurboHeadlessElement
 *
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * @description Object containing properties for configuring a headless (non-HTML) element, with possibly MVC properties.
 */
type TurboHeadlessProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = Omit<MvcProperties<object, ViewType, DataType, ModelType, EmitterType>, "element"> & {
    out?: string | Node;
    [key: string]: any;
};

/**
 * @class TurboHeadlessElement
 * @group TurboElement
 * @category TurboHeadlessElement
 *
 * @description TurboHeadlessElement class, similar to TurboElement but without extending HTMLElement.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
declare class TurboHeadlessElement<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter<any>> {
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;
    constructor(properties?: TurboHeadlessProperties<ViewType, DataType, ModelType, EmitterType>);
}

/**
 * @class TurboEventManager
 * @group Event Handling
 * @category TurboEventManager
 *
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
declare class TurboEventManager<ToolType extends string = string> extends TurboHeadlessElement<any, any, TurboEventManagerModel> {
    protected static managers: TurboEventManager[];
    static get instance(): TurboEventManager;
    static get allManagers(): TurboEventManager[];
    static set allManagers(managers: TurboEventManager[]);
    protected keyController: TurboEventManagerKeyController;
    protected wheelController: TurboEventManagerWheelController;
    protected pointerController: TurboEventManagerPointerController;
    protected dispatchController: TurboEventManagerDispatchController;
    constructor(properties?: TurboEventManagerProperties);
    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
    get inputDevice(): InputDevice;
    get onInputDeviceChange(): Delegate<(device: InputDevice) => void>;
    get currentClick(): ClickMode;
    get currentKeys(): string[];
    /**
     * @description Delegate fired when a tool is changed on a certain click button/mode
     */
    get onToolChange(): Delegate<(oldTool: Node, newTool: Node, type: ClickMode) => void>;
    get authorizeEventScaling(): boolean | (() => boolean);
    set authorizeEventScaling(value: boolean | (() => boolean));
    get scaleEventPosition(): (position: Point) => Point;
    set scaleEventPosition(value: (position: Point) => Point);
    get moveThreshold(): number;
    set moveThreshold(value: number);
    get longPressDuration(): number;
    set longPressDuration(value: number);
    set keyEventsEnabled(value: boolean);
    set wheelEventsEnabled(value: boolean);
    set moveEventsEnabled(value: boolean);
    set mouseEventsEnabled(value: boolean);
    set touchEventsEnabled(value: boolean);
    set clickEventEnabled(value: boolean);
    set dragEventEnabled(value: boolean);
    /**
     * @description Sets the lock state for the event manager.
     * @param origin - The element that initiated the lock state.
     * @param value - The state properties to set.
     */
    lock(origin: Node, value: TurboEventManagerStateProperties): void;
    /**
     * @description Resets the lock state to the default values.
     */
    unlock(): void;
    get enabled(): boolean;
    set enabled(value: boolean);
    get preventDefaultWheel(): boolean;
    set preventDefaultWheel(value: boolean);
    get preventDefaultMouse(): boolean;
    set preventDefaultMouse(value: boolean);
    get preventDefaultTouch(): boolean;
    set preventDefaultTouch(value: boolean);
    /**
     * @description All attached tools in an array
     */
    get toolsArray(): Node[];
    getCurrentTool(mode?: ClickMode): Node;
    /**
     * @description Returns the instances of the tool currently held by the provided click mode
     * @param mode
     */
    getCurrentTools(mode?: ClickMode): Node[];
    /**
     * @description Returns the name of the tool currently held by the provided click mode
     * @param mode
     */
    getCurrentToolName(mode?: ClickMode): ToolType;
    getToolName(tool: Node): ToolType;
    getSimilarTools(tool: Node): Node[];
    /**
     * @description Returns the tool with the given name (or undefined)
     * @param name
     */
    getToolsByName(name: ToolType): Node[];
    /**
     * @description Returns the first tool with the given name (or undefined)
     * @param name
     * @param predicate
     */
    getToolByName(name: ToolType, predicate?: (tool: Node) => boolean): Node;
    /**
     * @description Returns the tools associated with the given key
     * @param key
     */
    getToolsByKey(key: string): Node[];
    /**
     * @description Returns the first tool associated with the given key
     * @param key
     * @param predicate
     */
    getToolByKey(key: string, predicate?: (tool: Element) => boolean): Node;
    /**
     * @description Adds a tool to the tools map, identified by its name. Optionally, provide a key to bind the tool to.
     * @param toolName
     * @param tool
     * @param key
     */
    addTool(toolName: ToolType, tool: Node, key?: string): void;
    /**
     * @description Sets the provided tool as a current tool associated with the provided type
     * @param tool
     * @param type
     * @param options
     */
    setTool(tool: Node, type: ClickMode, options?: SetToolOptions): void;
    /**
     * @description Sets tool associated with the provided key as the current tool for the key mode
     * @param key
     */
    setToolByKey(key: string): boolean;
    setupCustomDispatcher(type: string): void;
    protected applyAndHookEvents(turboEventNames: Record<string, string>, defaultEventNames: Record<string, string>, applyTurboEvents: boolean): void;
    destroy(): this;
}

/**
 * @type {TurboInteractorProperties}
 * @group MVC
 * @category Interactor
 *
 * @extends {TurboControllerProperties}
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description  Options used to create a new {@link TurboInteractor} attached to an element.
 * @property {string} [toolName] - The name of the tool (if any) that the event listeners will listen for.
 * @property {Node} [target] - The target that will listen for the events.
 * @property {PartialRecord<DefaultEventNameKey, ListenerOptions>} [listenerOptions] - Custom options to define per
 * event type.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
 * to `TurboEventManager.instance`.
 */
type TurboInteractorProperties<ElementType extends object = object, ViewType extends TurboView = TurboView, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    manager?: TurboEventManager;
    toolName?: string;
    target?: Node;
    listenerOptions?: PartialRecord<DefaultEventNameKey, ListenerOptions>;
};
/**
 * @group MVC
 * @category MVC
 *
 * @type {MvcInstanceOrConstructor}
 * @template Type
 * @template PropertiesType
 * @description Type representing the constructor of a certain `Type` (which takes a single parameter), or an
 * instance of `Type`.
 */
type MvcInstanceOrConstructor<Type, PropertiesType = any> = Type | (new (properties: PropertiesType) => Type);
/**
 * @group MVC
 * @category MVC
 *
 * @type {MvcManyInstancesOrConstructors}
 * @template Type
 * @template PropertiesType
 * @description Type representing a single entry or an array of {@link MvcInstanceOrConstructor}.
 */
type MvcManyInstancesOrConstructors<Type, PropertiesType = any> = MvcInstanceOrConstructor<Type, PropertiesType> | MvcInstanceOrConstructor<Type, PropertiesType>[];
/**
 * @type {MvcGenerationProperties}
 * @group MVC
 * @category MVC
 *
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Type representing a configuration object for an {@link Mvc} instance.
 * @property {MvcInstanceOrConstructor<ViewType, TurboViewProperties>} [view] - The view (or view constructor) to attach.
 * @property {ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType)} [model] - The model
 * (or model constructor) to attach.
 * @property {MvcInstanceOrConstructor<EmitterType, ModelType>} [emitter] - The emitter (or emitter constructor) to
 * attach. If not defined, a default TurboEmitter will be created.
 * @property {MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>} [controllers] - The
 * controller, constructor of controller, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboHandler, ModelType>} [handlers] - The
 * handler, constructor of handler, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>} [interactors] - The
 * interactor, constructor of interactor, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>} [tools] - The
 * tool, constructor of tool, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>} [substrates] - The
 * substrate, constructor of substrate, or array of the latter, to attach.
 * @property {DataType} [data] - The data to attach to the model.
 * @property {boolean} [initialize] - Whether to initialize the MVC pieces after setting them or not. Defaults to true.
 */
type MvcGenerationProperties<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = {
    view?: MvcInstanceOrConstructor<ViewType, TurboViewProperties>;
    model?: ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType);
    emitter?: MvcInstanceOrConstructor<EmitterType, ModelType>;
    controllers?: MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>;
    handlers?: MvcManyInstancesOrConstructors<TurboHandler, ModelType>;
    interactors?: MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>;
    tools?: MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>;
    substrates?: MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>;
    data?: DataType;
    initialize?: boolean;
};
/**
 * @type {MvcProperties}
 * @group MVC
 * @category MVC
 *
 * @template {object} ElementType - The type of the element attached to the {@link Mvc} object.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Type of the properties object used for instantiating an {@link Mvc} object.
 * @extends MvcGenerationProperties
 * @property {ElementType} [element] - The element to attach to the Mvc instance.
 */
type MvcProperties<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType> & {
    element?: ElementType;
};

/**
 * @group Types
 * @category SVG Element
 */
type SVGTagMap = Omit<SVGElementTagNameMap, "style">;
/**
 * @group Types
 * @category SVG Element
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type SVGTag<Tag extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap> = Tag;
/**
 * @group Types
 * @category SVG Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidSVGElement<Tag extends SVGTag = SVGTag> = SVGElementTagNameMap[Tag] extends SVGElement ? SVGElementTagNameMap[Tag] : SVGElement;
/**
 * @group Types
 * @category SVG Element
 * @description URL to the SVG namespace.
 */
declare const SvgNamespace = "http://www.w3.org/2000/svg";
/**
 * @group Types
 * @category SVG Element
 * @description Set of Valid SVG tags.
 */
declare const SvgTags: Set<keyof SVGElementTagNameMap>;
declare global {
    interface SVGElement extends Element {
    }
    interface SVGSVGElement extends SVGElement {
    }
    interface SVGCircleElement extends SVGElement {
    }
    interface SVGEllipseElement extends SVGElement {
    }
    interface SVGLineElement extends SVGElement {
    }
    interface SVGPathElement extends SVGElement {
    }
    interface SVGPolygonElement extends SVGElement {
    }
    interface SVGPolylineElement extends SVGElement {
    }
    interface SVGRectElement extends SVGElement {
    }
    interface SVGTextElement extends SVGElement {
    }
    interface SVGUseElement extends SVGElement {
    }
    interface SVGImageElement extends SVGElement {
    }
    interface SVGAElement extends SVGElement {
    }
    interface SVGDefsElement extends SVGElement {
    }
    interface SVGGradientElement extends SVGElement {
    }
    interface SVGSymbolElement extends SVGElement {
    }
    interface SVGMarkerElement extends SVGElement {
    }
    interface SVGClipPathElement extends SVGElement {
    }
    interface SVGMPathElement extends SVGElement {
    }
    interface SVGMaskElement extends SVGElement {
    }
    interface SVGMetadataElement extends SVGElement {
    }
    interface SVGPatternElement extends SVGElement {
    }
    interface SVGStopElement extends SVGElement {
    }
    interface SVGSwitchElement extends SVGElement {
    }
    interface SVGViewElement extends SVGElement {
    }
    interface SVGDescElement extends SVGElement {
    }
    interface SVGForeignObjectElement extends SVGElement {
    }
    interface SVGTitleElement extends SVGElement {
    }
    interface SVGScriptElement extends SVGElement {
    }
    interface SVGStyleElement extends SVGElement {
    }
    interface SVGFontElement extends SVGElement {
    }
    interface SVGFontFaceElement extends SVGElement {
    }
    interface SVGGElement extends SVGElement {
    }
    interface SVGSymbolElement extends SVGElement {
    }
    interface SVGTextPathElement extends SVGElement {
    }
    interface SVGTSpanElement extends SVGElement {
    }
    interface SVGAltGlyphElement extends SVGElement {
    }
    interface SVGAltGlyphDefElement extends SVGElement {
    }
    interface SVGAltGlyphItemElement extends SVGElement {
    }
    interface SVGGlyphElement extends SVGElement {
    }
    interface SVGMissingGlyphElement extends SVGElement {
    }
    interface SVGAnimateElement extends SVGElement {
    }
    interface SVGAnimateMotionElement extends SVGElement {
    }
    interface SVGAnimateTransformElement extends SVGElement {
    }
    interface SVGDiscardElement extends SVGElement {
    }
    interface SVGFEBlendElement extends SVGElement {
    }
    interface SVGFEColorMatrixElement extends SVGElement {
    }
    interface SVGFEComponentTransferElement extends SVGElement {
    }
    interface SVGFECompositeElement extends SVGElement {
    }
    interface SVGFEConvolveMatrixElement extends SVGElement {
    }
    interface SVGFEDiffuseLightingElement extends SVGElement {
    }
    interface SVGFEDisplacementMapElement extends SVGElement {
    }
    interface SVGFEDistantLightElement extends SVGElement {
    }
    interface SVGFEDropShadowElement extends SVGElement {
    }
    interface SVGFEFloodElement extends SVGElement {
    }
    interface SVGFEFuncAElement extends SVGElement {
    }
    interface SVGFEFuncBElement extends SVGElement {
    }
    interface SVGFEFuncGElement extends SVGElement {
    }
    interface SVGFEFuncRElement extends SVGElement {
    }
    interface SVGFEGaussianBlurElement extends SVGElement {
    }
    interface SVGFEImageElement extends SVGElement {
    }
    interface SVGFEMergeElement extends SVGElement {
    }
    interface SVGFEMergeNodeElement extends SVGElement {
    }
    interface SVGFEMorphologyElement extends SVGElement {
    }
    interface SVGFEOffsetElement extends SVGElement {
    }
    interface SVGFEPointLightElement extends SVGElement {
    }
    interface SVGFESpecularLightingElement extends SVGElement {
    }
    interface SVGFESpotLightElement extends SVGElement {
    }
    interface SVGFETileElement extends SVGElement {
    }
    interface SVGFETurbulenceElement extends SVGElement {
    }
    interface SVGFilterElement extends SVGElement {
    }
    interface SVGForeignObjectElement extends SVGElement {
    }
    interface SVGHatchElement extends SVGElement {
    }
    interface SVGHatchpathElement extends SVGElement {
    }
    interface SVGMeshElement extends SVGElement {
    }
    interface SVGMeshgradientElement extends SVGElement {
    }
    interface SVGMeshpatchElement extends SVGElement {
    }
    interface SVGMeshrowElement extends SVGElement {
    }
    interface SVGSolidcolorElement extends SVGElement {
    }
    interface SVGVKernElement extends SVGElement {
    }
}

/**
 * @group Types
 * @category Element
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type HTMLTag<Tag extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> = Tag;
/**
 * @group Types
 * @category Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidHTMLElement<Tag extends HTMLTag = HTMLTag> = HTMLElementTagNameMap[Tag] extends HTMLElement ? HTMLElementTagNameMap[Tag] : HTMLElement;
declare global {
    interface HTMLElement extends Element {
    }
    interface TurboElement extends HTMLElement {
    }
    interface HTMLAnchorElement extends HTMLElement {
    }
    interface HTMLAreaElement extends HTMLElement {
    }
    interface HTMLAudioElement extends HTMLElement {
    }
    interface HTMLBaseElement extends HTMLElement {
    }
    interface HTMLQuoteElement extends HTMLElement {
    }
    interface HTMLBodyElement extends HTMLElement {
    }
    interface HTMLBRElement extends HTMLElement {
    }
    interface HTMLButtonElement extends HTMLElement {
    }
    interface HTMLCanvasElement extends HTMLElement {
    }
    interface HTMLTableCaptionElement extends HTMLElement {
    }
    interface HTMLTableColElement extends HTMLElement {
    }
    interface HTMLDataElement extends HTMLElement {
    }
    interface HTMLDataListElement extends HTMLElement {
    }
    interface HTMLModElement extends HTMLElement {
    }
    interface HTMLDetailsElement extends HTMLElement {
    }
    interface HTMLDialogElement extends HTMLElement {
    }
    interface HTMLDivElement extends HTMLElement {
    }
    interface HTMLDListElement extends HTMLElement {
    }
    interface HTMLEmbedElement extends HTMLElement {
    }
    interface HTMLFieldSetElement extends HTMLElement {
    }
    interface HTMLFormElement extends HTMLElement {
    }
    interface HTMLHeadingElement extends HTMLElement {
    }
    interface HTMLHeadElement extends HTMLElement {
    }
    interface HTMLHRElement extends HTMLElement {
    }
    interface HTMLHtmlElement extends HTMLElement {
    }
    interface HTMLIFrameElement extends HTMLElement {
    }
    interface HTMLImageElement extends HTMLElement {
    }
    interface HTMLInputElement extends HTMLElement {
    }
    interface HTMLLabelElement extends HTMLElement {
    }
    interface HTMLLegendElement extends HTMLElement {
    }
    interface HTMLLIElement extends HTMLElement {
    }
    interface HTMLLinkElement extends HTMLElement {
    }
    interface HTMLMapElement extends HTMLElement {
    }
    interface HTMLMenuElement extends HTMLElement {
    }
    interface HTMLMetaElement extends HTMLElement {
    }
    interface HTMLMeterElement extends HTMLElement {
    }
    interface HTMLObjectElement extends HTMLElement {
    }
    interface HTMLOListElement extends HTMLElement {
    }
    interface HTMLOptGroupElement extends HTMLElement {
    }
    interface HTMLOptionElement extends HTMLElement {
    }
    interface HTMLOutputElement extends HTMLElement {
    }
    interface HTMLParagraphElement extends HTMLElement {
    }
    interface HTMLPictureElement extends HTMLElement {
    }
    interface HTMLPreElement extends HTMLElement {
    }
    interface HTMLProgressElement extends HTMLElement {
    }
    interface HTMLQuoteElement extends HTMLElement {
    }
    interface HTMLScriptElement extends HTMLElement {
    }
    interface HTMLSelectElement extends HTMLElement {
    }
    interface HTMLSlotElement extends HTMLElement {
    }
    interface HTMLSourceElement extends HTMLElement {
    }
    interface HTMLSpanElement extends HTMLElement {
    }
    interface HTMLStyleElement extends HTMLElement {
    }
    interface HTMLTableElement extends HTMLElement {
    }
    interface HTMLTableSectionElement extends HTMLElement {
    }
    interface HTMLTableCellElement extends HTMLElement {
    }
    interface HTMLTemplateElement extends HTMLElement {
    }
    interface HTMLTextAreaElement extends HTMLElement {
    }
    interface HTMLTableSectionElement extends HTMLElement {
    }
    interface HTMLTimeElement extends HTMLElement {
    }
    interface HTMLTitleElement extends HTMLElement {
    }
    interface HTMLTableRowElement extends HTMLElement {
    }
    interface HTMLTrackElement extends HTMLElement {
    }
    interface HTMLUListElement extends HTMLElement {
    }
    interface HTMLVideoElement extends HTMLElement {
    }
    interface HTMLAppletElement extends HTMLElement {
    }
    interface HTMLFrameElement extends HTMLElement {
    }
    interface HTMLFrameSetElement extends HTMLElement {
    }
    interface HTMLMarqueeElement extends HTMLElement {
    }
}

/**
 * @group Types
 * @category MathML Element
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type MathMLTag<Tag extends keyof MathMLElementTagNameMap = keyof MathMLElementTagNameMap> = Tag;
/**
 * @group Types
 * @category MathML Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidMathMLElement<Tag extends MathMLTag = MathMLTag> = MathMLElementTagNameMap[Tag] extends MathMLElement ? MathMLElementTagNameMap[Tag] : MathMLElement;
/**
 * @group Types
 * @category MathML Element
 * @description URL to the MathML namespace.
 */
declare const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";
/**
 * @group Types
 * @category MathML Element
 * @description Set of Valid MathML tags.
 */
declare const MathMLTags: Set<keyof MathMLElementTagNameMap>;
declare global {
    interface MathMLElement extends Element {
    }
    interface MathMLMathElement extends MathMLElement {
    }
    interface MathMLAnnotationElement extends MathMLElement {
    }
    interface MathMLAnnotationXmlElement extends MathMLElement {
    }
    interface MathMLMencloseElement extends MathMLElement {
    }
    interface MathMLMerrorElement extends MathMLElement {
    }
    interface MathMLMfencedElement extends MathMLElement {
    }
    interface MathMLMfracElement extends MathMLElement {
    }
    interface MathMLMiElement extends MathMLElement {
    }
    interface MathMLMnElement extends MathMLElement {
    }
    interface MathMLMoElement extends MathMLElement {
    }
    interface MathMLMoverElement extends MathMLElement {
    }
    interface MathMLMunderElement extends MathMLElement {
    }
    interface MathMLMunderoverElement extends MathMLElement {
    }
    interface MathMLMsElement extends MathMLElement {
    }
    interface MathMLMsubElement extends MathMLElement {
    }
    interface MathMLMsupElement extends MathMLElement {
    }
    interface MathMLMsubsupElement extends MathMLElement {
    }
    interface MathMLMtableElement extends MathMLElement {
    }
    interface MathMLMtdElement extends MathMLElement {
    }
    interface MathMLMtrElement extends MathMLElement {
    }
    interface MathMLMtextElement extends MathMLElement {
    }
    interface MathMLMspaceElement extends MathMLElement {
    }
    interface MathMLMsqrtElement extends MathMLElement {
    }
    interface MathMLMrootElement extends MathMLElement {
    }
    interface MathMLMrowElement extends MathMLElement {
    }
    interface MathMLMstyleElement extends MathMLElement {
    }
    interface MathMLMtokenElement extends MathMLElement {
    }
    interface MathMLSemanticsElement extends MathMLElement {
    }
    interface MathMLNoneElement extends MathMLElement {
    }
}

/**
 * @group Types
 * @category Element
 * @description A type that represents a union of HTML, SVG, and MathML tag name maps.`
 */
type ElementTagMap = HTMLElementTagNameMap & SVGTagMap & MathMLElementTagNameMap & TurboElementTagNameMap;
/**
 * @group Types
 * @category Element
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type ValidTag<Tag extends keyof ElementTagMap = keyof ElementTagMap> = Tag;
/**
 * @group Types
 * @category Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidElement<Tag extends ValidTag = ValidTag> = Tag extends HTMLTag ? ValidHTMLElement<Tag> : (Tag extends SVGTag ? ValidSVGElement<Tag> : (Tag extends MathMLTag ? ValidMathMLElement<Tag> : (ElementTagMap[Tag] extends Element ? ElementTagMap[Tag] : Element)));
/**
 * @group Types
 * @category Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidNode<Tag = ValidTag> = Tag extends ValidTag ? ValidElement<Tag> : Node;
/**
 * @group Types
 * @category Element
 * @description Type of non-function properties of an element.
 */
type HTMLElementNonFunctions<Tag extends ValidTag = ValidTag> = {
    [ElementField in keyof ValidElement<Tag>]: ValidElement<Tag>[ElementField] extends Function ? never : ElementField;
}[keyof ValidElement<Tag>];
/**
 * @group Types
 * @category Element
 * @description Represents mutable fields of an HTML element, excluding specific fields.
 */
type HTMLElementMutableFields<Tag extends ValidTag = ValidTag> = Omit<Partial<Pick<ValidElement<Tag>, HTMLElementNonFunctions<Tag>>>, "children" | "className" | "style">;
/**
 * @type {ElementTagDefinition}
 * @group Types
 * @category Element
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {string} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML"
 * is provided, the corresponding namespace will be used to create the element. Otherwise, the custom namespace
 * provided will be used.
 */
type ElementTagDefinition = {
    tag?: string;
    namespace?: string;
};
interface TurboElementTagNameMap {
}
declare global {
    interface Document extends Node {
    }
    interface DocumentFragment extends Node {
    }
    interface HTMLDocument extends Document {
    }
    interface XMLDocument extends Document {
    }
    interface CharacterData extends Node {
    }
    interface Text extends CharacterData {
    }
    interface Comment extends CharacterData {
    }
    interface CDATASection extends CharacterData {
    }
    interface Element extends Node {
    }
    interface ShadowRoot extends Element {
    }
    interface ChildNode extends Node {
    }
    interface ParentNode extends Node {
    }
    interface ProcessingInstruction extends Node {
    }
    interface DocumentType extends Node {
    }
    interface EntityReference extends Node {
    }
    interface Entity extends Node {
    }
    interface Notation extends Node {
    }
}

/**
 * @group Types
 * @category Element
 *
 * @type {TurboProperties}
 * @template {ValidTag} Tag - The HTML (or other) tag of the element, if passing it as a property. Defaults to "div".
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Object containing properties for configuring an Element. A tag (and
 * possibly a namespace) can be provided for element creation. Already-created elements will ignore these
 * properties if set.
 * Any HTML attribute can be passed as key to be processed by the class/function. The type has the following
 * described custom properties:
 *
 * @property {string} [id] - The ID of the element.
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of
 * space-separated classes or an array of class names).
 * @property {string} [style] - The inline style of the element. Use the css literal function for autocompletion.
 * @property {string} [stylesheet] - The associated stylesheet (if any) with the element. Declaring this property will
 * generate automatically a new style element in the element's corresponding root. Use the css literal function
 * for autocompletion.
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: Element) => boolean)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {(e: Event, el: Element) => boolean} [onClick] - Click event listener.
 * @property {(e: Event, el: Element) => boolean} [onDrag] - Drag event listener.
 * @property {Element | Element[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {Element} [parent] - The parent element to which the created element will be appended.
 * @property {string | Element} [out] - If defined, declares (or sets) the element in the parent as a field with the
 * given value as key.
 * @property {string} [text] - The text content of the element (if any).
 * @property {boolean} [shadowDOM] - If true, indicate that the element will be created under a shadow root.
 */
type TurboProperties<Tag extends ValidTag = "div"> = HTMLElementMutableFields<Tag> & ElementTagDefinition & {
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    shadowDOM?: boolean;
    parent?: Element;
    children?: Element | Element[];
    text?: string;
    listeners?: Record<string, ((e: Event, el: ValidElement<Tag>) => boolean)>;
    onClick?: (e: Event, el: ValidElement<Tag>) => boolean;
    onDrag?: (e: Event, el: ValidElement<Tag>) => boolean;
    out?: string | Node;
    [key: string]: any;
};
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates an "a" element with the specified properties.
 * @param {TurboProperties<"a">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"a">} The created element.
 */
declare function a(properties?: TurboProperties<"a">): ValidElement<"a">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "canvas" element with the specified properties.
 * @param {TurboProperties<"canvas">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"canvas">} The created element.
 */
declare function canvas(properties?: TurboProperties<"canvas">): ValidElement<"canvas">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "div" element with the specified properties.
 * @param {TurboProperties<"div">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"div">} The created element.
 */
declare function div(properties?: TurboProperties): ValidElement<"div">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "form" element with the specified properties.
 * @param {TurboProperties<"form">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"form">} The created element.
 */
declare function form(properties?: TurboProperties<"form">): ValidElement<"form">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h1" element with the specified properties.
 * @param {TurboProperties<"h1">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h1">} The created element.
 */
declare function h1(properties?: TurboProperties<"h1">): ValidElement<"h1">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h2" element with the specified properties.
 * @param {TurboProperties<"h2">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h2">} The created element.
 */
declare function h2(properties?: TurboProperties<"h2">): ValidElement<"h2">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h3" element with the specified properties.
 * @param {TurboProperties<"h3">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h3">} The created element.
 */
declare function h3(properties?: TurboProperties<"h3">): ValidElement<"h3">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h4" element with the specified properties.
 * @param {TurboProperties<"h4">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h4">} The created element.
 */
declare function h4(properties?: TurboProperties<"h4">): ValidElement<"h4">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h5" element with the specified properties.
 * @param {TurboProperties<"h5">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h5">} The created element.
 */
declare function h5(properties?: TurboProperties<"h5">): ValidElement<"h5">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h6" element with the specified properties.
 * @param {TurboProperties<"h6">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h6">} The created element.
 */
declare function h6(properties?: TurboProperties<"h6">): ValidElement<"h6">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates an "img" element with the specified properties.
 * @param {TurboProperties<"img">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"img">} The created element.
 */
declare function img(properties?: TurboProperties<"img">): ValidElement<"img">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates an "input" element with the specified properties.
 * @param {TurboProperties<"input">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"input">} The created element.
 */
declare function input(properties?: TurboProperties<"input">): ValidElement<"input">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "link" element with the specified properties.
 * @param {TurboProperties<"link">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"link">} The created element.
 */
declare function link(properties?: TurboProperties<"link">): ValidElement<"link">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "p" element with the specified properties.
 * @param {TurboProperties<"p">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"p">} The created element.
 */
declare function p(properties?: TurboProperties<"p">): ValidElement<"p">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "span" element with the specified properties.
 * @param {TurboProperties<"span">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"span">} The created element.
 */
declare function span(properties?: TurboProperties<"span">): ValidElement<"span">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "style" element with the specified properties.
 * @param {TurboProperties<"style">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"style">} The created element.
 */
declare function style(properties?: TurboProperties<"style">): ValidElement<"style">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "textarea" element with the specified properties.
 * @param {TurboProperties<"textarea">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"textarea">} The created element.
 */
declare function textarea(properties?: TurboProperties<"textarea">): ValidElement<"textarea">;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "video" element with the specified properties.
 * @param {TurboProperties<"video">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"video">} The created element.
 */
declare function video(properties?: TurboProperties<"video">): ValidElement<"video">;

/**
 * @group Element Creation
 * @category Creation Functions
 *
 * @description returns a function that generates an HTML element with the provided tag that takes TurboProperties
 * as input.
 * @param {keyof ElementTagMap} tag - The tag to generate the function from.
 * @return The function
 */
declare function generateTagFunction<Tag extends ValidTag>(tag: Tag): (properties?: TurboProperties<Tag>) => ValidElement<Tag>;
/**
 * @group Element Creation
 * @category Creation Functions
 *
 * @description Create an element with the specified properties (and the specified namespace if applicable).
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
declare function element<Tag extends ValidTag>(properties?: TurboProperties<Tag>): ValidElement<Tag>;
/**
 * @group Element Creation
 * @category Creation Functions
 *
 * @description Create an element with the specified properties. Supports SVG and MathML.
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
declare function blindElement<Tag extends ValidTag>(properties?: TurboProperties<Tag>): ValidElement<Tag>;

/**
 * @group Element Creation
 * @category Flex Elements
 *
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexCol<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @group Element Creation
 * @category Flex Elements
 *
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexColCenter<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @group Element Creation
 * @category Flex Elements
 *
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexRow<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @group Element Creation
 * @category Flex Elements
 *
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexRowCenter<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @group Element Creation
 * @category Flex Elements
 *
 * @description Create a spacer element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created spacer element.
 * @template {HTMLTag} Tag
 */
declare function spacer<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;

/**
 * @type {StylesRoot}
 * @group Types
 * @category Style
 *
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */
type StylesRoot = ShadowRoot | HTMLHeadElement;
/**
 * @type {StylesType}
 * @group Types
 * @category Style
 *
 * @description A type that represents the types that are accepted as styles entries (mainly by the HTMLElement.setStyles()
 * method). It includes strings, numbers, and records of CSS attributes to strings or numbers.
 */
type StylesType = string | number | PartialRecord<keyof CSSStyleDeclaration, string | number>;
/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string} [styles] - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
declare function stylesheet(styles?: string, root?: StylesRoot): void;

/**
 * @class TurboDragEvent
 * @group Event Handling
 * @category TurboEvents
 *
 * @extends TurboEvent
 * @description Turbo drag event class, fired on turbo-drag, turbo-drag-start, turbo-drag-end, etc.
 */
declare class TurboDragEvent extends TurboEvent {
    /**
     * @description Map containing the origins of the dragging points
     */
    readonly origins: TurboMap<number, Point>;
    /**
     * @description Map containing the previous positions of the dragging points
     */
    readonly previousPositions: TurboMap<number, Point>;
    /**
     * @description Map containing the positions of the dragging points
     */
    readonly positions: TurboMap<number, Point>;
    constructor(properties: TurboDragEventProperties);
    /**
     * @description Map of the origins mapped to the current canvas translation and scale
     */
    get scaledOrigins(): TurboMap<number, Point>;
    /**
     * @description Map of the previous positions mapped to the current canvas translation and scale
     */
    get scaledPreviousPositions(): TurboMap<number, Point>;
    /**
     * @description Map of the positions mapped to the current canvas translation and scale
     */
    get scaledPositions(): TurboMap<number, Point>;
    get deltaPositions(): TurboMap<number, Point>;
    get deltaPosition(): Point;
    get scaledDeltaPositions(): TurboMap<number, Point>;
    get scaledDeltaPosition(): Point;
}

/**
 * @class TurboKeyEvent
 * @group Event Handling
 * @category TurboEvents
 *
 * @extends TurboEvent
 * @description Custom key event
 */
declare class TurboKeyEvent extends TurboEvent {
    /**
     * @description The key pressed (if any) when the event was fired
     */
    readonly keyPressed: string;
    /**
     * @description The key released (if any) when the event was fired
     */
    readonly keyReleased: string;
    constructor(properties: TurboKeyEventProperties);
}

/**
 * @class TurboWheelEvent
 * @group Event Handling
 * @category TurboEvents
 *
 * @extends TurboEvent
 * @description Custom wheel event
 */
declare class TurboWheelEvent extends TurboEvent {
    /**
     * @description The delta amount of scrolling
     */
    readonly delta: Point;
    constructor(properties: TurboWheelEventProperties);
}

/**
 * @overload
 * @function signal
 * @group Decorators
 * @category Signal
 *
 * @description Create a standalone reactive signal box.
 * Returns a {@link SignalBox} wrapping the initial value.
 *
 * @template Value
 * @param {Value} [initial] - Initial value stored by the signal.
 * @param {object} [target] - The target to which the signal is bound.
 * @param {PropertyKey} [key] - The key at which the signal will be stored in the target.
 * @returns {SignalBox<Value>} A reactive box for reading/updating the value.
 *
 * @example
 * ```ts
 * // Standalone signal
 * const count = signal(0);
 * // e.g., count.get(), count.set(1)
 * ```
 */
declare function signal<Value>(initial?: Value, target?: object, key?: PropertyKey): SignalBox<Value>;
/**
 * @overload
 * @function signal
 * @group Decorators
 * @category Signal
 *
 * @description Create a standalone reactive signal box that mirrors a getter and a setter.
 * Returns a {@link SignalBox} wrapping the initial value.
 *
 * @template Value
 * @param {() => Value} [get] - Getter that returns the value.
 * @param {(value: Value) => void} [set] - Setter that changes the value and emits the signal.
 * @param {object} [target] - The target to which the signal is bound.
 * @param {PropertyKey} [key] - The key at which the signal will be stored in the target.
 * @returns {SignalBox<Value>} A reactive box for reading/updating the value.
 *
 * @example
 * ```ts
 * // Standalone signal
 * const count = signal(0);
 * // e.g., count.get(), count.set(1)
 * ```
 */
declare function signal<Value>(get?: () => Value, set?: (value: Value) => void, target?: object, key?: PropertyKey): SignalBox<Value>;
/**
 * @overload
 * @decorator
 * @function signal
 * @group Decorators
 * @category Signal
 *
 * @description Stage-3 decorator that turns a field, getter, setter, or accessor into a reactive signal.
 *
 * @example
 * ```ts
 * class Counter {
 *   @signal count = 0;
 *
 *   @effect
 *   log() { console.log(this.count); }
 * }
 *
 * const c = new Counter();
 * c.count++; // triggers effect, logs updated value
 * ```
 */
declare function signal<Type extends object, Value>(value: ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void) | {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
}, context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>): any;
/**
 * @decorator
 * @function modelSignal
 * @group Decorators
 * @category Signal
 *
 * @description Decorator that binds a reactive signal to a **model field**
 * retrieved via `this.getData(key, blockKey)` and stored via `this.setData(key, value, blockKey)`.
 * Useful to create signals in TurboModel classes.
 *
 * @param {string} dataKey - key to read/write (defaults to decorated member name when falsy).
 * @param {string | number} [blockKey] - Optional blockKey identifier.
 *
 * @example
 * ```ts
 * class TodoModel extends TurboModel {
 *   @modelSignal() title = "";
 * }
 * ```
 * Is equivalent to:
 * ```ts
 * class TodoModel extends TurboModel {
 *   @signal public get title() {
 *      return this.getData("title");
 *   }
 *
 *   public set title(value) {
 *      this.setData("title", value);
 *   }
 * }
 *
 * ```
 */
declare function modelSignal(dataKey?: string, blockKey?: string | number): <Type extends object, Value>(value: {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
} | ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void), context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>) => any;
/**
 * @decorator
 * @function blockSignal
 * @group Decorators
 * @category Signal
 *
 * @description Binds a signal to an entire data-block of a TurboModel/YModel.
 * - Getter returns `this.getBlockData(blockKey)`
 * - Setter calls `this.setBlock(value, this.getBlockId(blockKey), blockKey)`
 *
 * @param {string|number} [blockKey] the block key, defaults to model.defaultBlockKey
 * @param id
 */
declare function blockSignal(blockKey?: string | number, id?: string | number): <Type extends TurboModel<any, any, any, any, TurboDataBlock<any, any, any, any, any>>, Value>(value: {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
} | ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void), context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>) => any;
/**
 * @decorator
 * @function blockIdSignal
 * @group Decorators
 * @category Signal
 *
 * @description Same idea but binds the block **id**.
 */
declare function blockIdSignal(blockKey?: string | number): <Type extends TurboModel<any, any, any, any, TurboDataBlock<any, any, any, any, any>>, Value>(value: {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
} | ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void), context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>) => any;
/**
 * @overload
 * @function effect
 * @group Decorators
 * @category Effect
 *
 * @description Bind a standalone effect callback to any signal it includes. The callback will be fired everytime
 * the signal's value changes.
 *
 * @param {() => void} callback - The callback to process.
 * @returns {() => void} A callback that, once called, disposes of the created effect.
 *
 * @example
 * ```ts
 * const count = signal(0);
 * effect(() => console.log(count.value));
 * ```
 */
declare function effect(callback: () => void): () => void;
/**
 * @overload
 * @decorator
 * @function effect
 * @group Decorators
 * @category Effect
 *
 * @description Stage-3 decorator that turns a function or getter into an effect callback bound to any signal it includes.
 * The callback will be fired everytime the signal's value changes.
 *
 * @example
 * ```ts
 * class Counter {
 *   @signal count = 0;
 *
 *   @effect log = () => console.log(this.count);
 * }
 *
 * const c = new Counter();
 * c.count++; // triggers effect, logs updated value
 * ```
 */
declare function effect<Type extends object>(value: ((this: Type) => void) | (() => void), context?: ClassMethodDecoratorContext<Type, any> | ClassGetterDecoratorContext<Type, any> | ClassFieldDecoratorContext<Type, any>): any;
/**
 * @function getSignal
 * @group Decorators
 * @category Signal
 *
 * @template Type
 * @description Retrieve the signal at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 * @return {SignalEntry<Type>} - The signal entry.
 */
declare function getSignal<Type = any>(target: object, key: PropertyKey): SignalEntry<Type>;
/**
 * @function setSignal
 * @group Decorators
 * @category Signal
 *
 * @template Type
 * @description Set the value of the signal at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 * @param {Type} value - The new value of the signal.
 */
declare function setSignal<Type = any>(target: object, key: PropertyKey, value: Type): void;
/**
 * @overload
 * @function markDirty
 * @group Decorators
 * @category Signal
 *
 * @description Marks the signal at the given `key` inside `target` as dirty and fires all of its attached effects.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 */
declare function markDirty(target: object, key: PropertyKey): void;
/**
 * @overload
 * @function markDirty
 * @group Decorators
 * @category Signal
 *
 * @description Marks the signal bound to the given `key` in the block at `blockKey` inside `target` as dirty and
 * fires all of its attached effects.
 * @param {object} target - The target to which the signal is bound.
 * @param {string | number | symbol} dataKey - The key of the data.
 * @param {string | number} blockKey - The key of the block.
 */
declare function markDirty(target: object, dataKey: string | number | symbol, blockKey: string | number): void;
/**
 * @function initializeEffects
 * @group Decorators
 * @category Effect
 *
 * @description Initializes and runs all the effects attached to the given `target`.
 * @param {object} target - The target to which the effects are bound.
 */
declare function initializeEffects(target: object): void;
/**
 * @function disposeEffect
 * @group Decorators
 * @category Effect
 *
 * @description Disposes of the effect at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 */
declare function disposeEffect(target: object, key: PropertyKey): void;
/**
 * @function disposeEffects
 * @group Decorators
 * @category Effect
 *
 * @description Disposes of all the effects attached to the given `target`.
 * @param {object} target - The target to which the effects are bound.
 */
declare function disposeEffects(target: object): void;

/**
 * @internal
 */
interface TurboElementUiInterface {
    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class (or whichever default selected class was set in the config) on the element and update the UI.
     */
    selected: boolean;
    /**
     * @description Whether to set the default CSS classes defined in the static config on the element or not. Setting
     * it will accordingly add/remove the CSS classes from the element.
     */
    unsetDefaultClasses: boolean;
}

/**
 * @group TurboElement
 * @category TurboProxiedElement
 */
type TurboProxiedProperties<Tag extends ValidTag = "div", ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = Omit<TurboProperties<Tag>, "model" | "view"> & TurboHeadlessProperties<ViewType, DataType, ModelType, EmitterType> & {
    unsetDefaultClasses?: boolean;
};
/**
 * @type {TurboElementProperties}
 * @group TurboElement
 * @category TurboElement
 *
 * @extends TurboProperties
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Object containing properties for configuring a custom HTML element. Is basically TurboProperties
 * without the tag.
 */
type TurboElementProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboProxiedProperties<"div", ViewType, DataType, ModelType, EmitterType>;
/**
 * @group TurboElement
 * @category TurboElement
 */
type TurboElementConfig = {
    shadowDOM?: boolean;
    defaultSelectedClass?: string | string[];
    defaultClasses?: string | string[];
    [key: string]: any;
};
/**
 * @type {TurboIconProperties}
 * @group Components
 * @category TurboIcon
 *
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [iconColor] - The color of the icon.
 * @property {((svgManipulation: SVGElement) => {})} [onLoaded] - Custom function that takes an SVG element to execute on the
 * SVG icon (if it is one) once it is loaded. This property will be disregarded if the icon is not of type SVG.
 *
 * @property {string} [type] - Custom type of the icon, overrides the default type assigned to
 * TurboIcon.config.type (whose default value is "svgManipulation").
 * @property {string} [directory] - Custom directory to the icon, overrides the default directory assigned to
 * TurboIcon.config.directory.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in
 * TurboIcon.config.defaultClasses to this instance of Icon.
 */
type TurboIconProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    type?: string;
    directory?: string;
    icon: string;
    iconColor?: string;
    onLoaded?: (svg: SVGElement) => void;
    unsetDefaultClasses?: boolean;
};
/**
 * @type {TurboIconConfig}
 * @group Components
 * @category TurboIcon
 *
 * @description Configuration object for the Icon class. Set it via TurboConfig.Icon.
 *
 * @property {string} [type] - The default type to assign to newly created Icons. Defaults to "svgManipulation".
 * @property {string} [[path]] - The default path to the directory containing the icons in the project. Specify the
 * directory once here to not type it again at every Icon generation.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */
type TurboIconConfig = TurboElementConfig & {
    defaultType?: string;
    defaultDirectory?: string;
    customLoaders?: Record<string, (path: string) => (Element | Promise<Element>)>;
};

/**
 * @class TurboElement
 * @group TurboElement
 * @category TurboElement
 *
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few useful tools and functions.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
declare class TurboElement<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter<any>> extends HTMLElement {
    /**
     * @description Static configuration object.
     */
    static readonly config: TurboElementConfig;
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;
    /**
     * @description Delegate fired when the element is attached to DOM.
     */
    readonly onAttach: Delegate<() => void>;
    /**
     * @description Delegate fired when the element is detached from the DOM.
     */
    readonly onDetach: Delegate<() => void>;
    /**
     * @description Delegate fired when the element is adopted by a new parent in the DOM.
     */
    readonly onAdopt: Delegate<() => void>;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks. Called on `initialize()`.
     * @protected
     */
    protected setupChangedCallbacks(): void;
    /**
     * @function setupUIElements
     * @description Setup method intended to initialize all direct sub-elements attached to this element, and store
     * them in fields. Called on `initialize()`.
     * @protected
     */
    protected setupUIElements(): void;
    /**
     * @function setupUILayout
     * @description Setup method to create the layout structure of the element by adding all created sub-elements to
     * this element's child tree. Called on `initialize()`.
     * @protected
     */
    protected setupUILayout(): void;
    /**
     * @function setupUIListeners
     * @description Setup method to initialize and define all input/DOM event listeners of the element. Called on
     * `initialize()`.
     * @protected
     */
    protected setupUIListeners(): void;
    /**
     * @function connectedCallback
     * @description function called when the element is attached to the DOM.
     */
    connectedCallback(): void;
    /**
     * @function disconnectedCallback
     * @description function called when the element is detached from the DOM.
     */
    disconnectedCallback(): void;
    /**
     * @function adoptedCallback
     * @description function called when the element is adopted by a new parent in the DOM.
     */
    adoptedCallback(): void;
}

/**
 * @class TurboIcon
 * @group Components
 * @category TurboIcon
 *
 * @description Icon class for creating icon elements.
 * @extends TurboElement
 */
declare class TurboIcon<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    static readonly config: TurboIconConfig;
    private static imageTypes;
    private _element;
    private _loadToken;
    onLoaded: (element: Element) => void;
    /**
     * @description The type of the icon.
     */
    type: string;
    /**
     * @description The user-provided (or statically configured) directory to the icon's file.
     */
    directory: string;
    /**
     * @description The path to the icon's source file.
     */
    get path(): string;
    /**
     * @description The name (or path) of the icon. Might include the file extension (to override the icon's type).
     * Setting it will update the icon accordingly.
     */
    set icon(value: string);
    /**
     * @description The assigned color to the icon (if any)
     */
    set iconColor(value: string);
    /**
     * @description The child element of the icon element (an HTML image or an SVG element).
     */
    private set element(value);
    get element(): Element;
    protected loadSvg(path: string): Promise<SVGElement>;
    protected loadImg(path: string): HTMLImageElement;
    protected updateColor(value?: string): void;
    protected generateIcon(): void;
    private getLoader;
    private setupLoadedElement;
    private clear;
}
/**
 * @group Components
 * @category TurboIcon
 * @param properties
 */
declare function icon<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties: TurboIconProperties<ViewType, DataType, ModelType, EmitterType>): TurboIcon<ViewType, DataType, ModelType, EmitterType>;

/**
 * @class TurboRichElement
 * @group Components
 * @category TurboRichElement
 *
 * @description Class for creating a rich turbo element (an element that is possibly accompanied by icons (or other elements) on
 * its left and/or right).
 * @extends TurboElement
 * @template {ValidTag} ElementTag - The tag of the main element to create the rich element from.
 */
declare class TurboRichElement<ElementTag extends ValidTag = any, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    static config: TurboRichElementConfig;
    readonly childrenOrder: readonly ["leftCustomElements", "leftIcon", "prefixEntry", "element", "suffixEntry", "rightIcon", "rightCustomElements"];
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {Element | Element[] | null} element - The element(s) to add.
     * @param {this["childrenOrder"][number]} type - The type of child element being added.
     */
    private addAtPosition;
    /**
     * @description The tag of the text element in the button
     */
    elementTag: ElementTag;
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    set leftCustomElements(value: Element | Element[]);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    set leftIcon(value: string | TurboIcon);
    get leftIcon(): TurboIcon;
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    set prefixEntry(value: string | HTMLElement);
    get prefixEntry(): HTMLElement;
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's textContent with the given string.
     */
    set element(value: string | TurboProperties<ElementTag> | ValidElement<ElementTag>);
    get element(): ValidElement<ElementTag>;
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's textContent with the given string.
     */
    get text(): string;
    set text(value: string);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    set suffixEntry(value: string | HTMLElement);
    get suffixEntry(): HTMLElement;
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    set rightIcon(value: string | TurboIcon);
    get rightIcon(): TurboIcon;
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    set rightCustomElements(value: Element | Element[]);
}
/**
 * @group Components
 * @category TurboRichElement
 * @param properties
 */
declare function richElement<ElementTag extends ValidTag = any, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties: TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>): TurboRichElement<ElementTag, ViewType, DataType, ModelType, EmitterType>;

/**
 * @type {TurboRichElementProperties}
 * @group Components
 * @category TurboRichElement
 *
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string} [text] - The text to set to the rich element's main element.
 *
 * @property {Element | Element[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {string | TurboIcon} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | TurboProperties<ElementTag> | ValidElement<ElementTag>} [buttonText] - The text content of the button.
 * @property {string | TurboIcon} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {Element | Element[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 *
 * @property {ValidTag} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
 * a string). If not specified, the default text tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 *
 * @template {ValidTag} ElementTag="p"
 */
type TurboRichElementProperties<ElementTag extends ValidTag = "div", ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    elementTag?: ElementTag;
    text?: string;
    leftCustomElements?: Element | Element[];
    leftIcon?: string | TurboIcon;
    prefixEntry?: string | HTMLElement;
    element?: string | TurboProperties<ElementTag> | ValidElement<ElementTag>;
    suffixEntry?: string | HTMLElement;
    rightIcon?: string | TurboIcon;
    rightCustomElements?: Element | Element[];
};
/**
 * @type {TurboRichElementConfig}
 * @group Components
 * @category TurboRichElement
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {HTMLTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboRichElementConfig = TurboElementConfig & {
    defaultElementTag?: HTMLTag;
};
/**
 * @type {TurboButtonConfig}
 * @group Components
 * @category TurboButton
 *
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {ValidTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = TurboRichElementConfig;

/**
 * @class TurboButton
 * @group Components
 * @category TurboButton
 *
 * @description Button class for creating Turbo button elements.
 * @extends TurboElement
 */
declare class TurboButton<ElementTag extends ValidTag = "p", ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboRichElement<ElementTag, ViewType, DataType, ModelType, EmitterType> {
    static readonly config: TurboButtonConfig;
}
/**
 * @group Components
 * @category TurboButton
 * @param properties
 */
declare function button<ElementTag extends ValidTag = "p", ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties: TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>): TurboButton<ElementTag, ViewType, DataType, ModelType, EmitterType>;

/**
 * @group Components
 * @category StatefulReifect
 * @description A function type that interpolates a value based on the index, total count, and the object.
 *
 * @template Type
 * @template ClassType
 * @param {number} index - The index of the object.
 * @param {number} total - The total number of objects.
 * @param {ClassType} object - The object being interpolated.
 * @returns {Type}
 */
type ReifectInterpolator<Type, ClassType extends object = Element> = ((index: number, total: number, object: ClassType) => Type);
/**
 * @group Components
 * @category StatefulReifect
 * @description A function type that interpolates a value based on the state, index, total count, and the object.
 *
 * @template Type
 * @template State
 * @template ClassType
 * @param {State} state - The current state.
 * @param {number} index - The index of the object.
 * @param {number} total - The total number of objects.
 * @param {ClassType} object - The object being interpolated.
 * @returns {Type}
 */
type StateInterpolator<Type, State extends string | number | symbol, ClassType extends object = Element> = ((state: State, index: number, total: number, object: ClassType) => Type);
/**
 * @group Components
 * @category StatefulReifect
 * @description A type that represents a property specific to a state or an interpolated value.
 *
 * @template Type
 * @template ClassType
 */
type StateSpecificProperty<Type, ClassType extends object = Element> = Type | ReifectInterpolator<Type, ClassType>;
/**
 * @group Components
 * @category StatefulReifect
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type BasicPropertyConfig<Type, State extends string | number | symbol> = PartialRecord<State, Type> | Type;
/**
 * @group Components
 * @category StatefulReifect
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type PropertyConfig<Type, State extends string | number | symbol, ClassType extends object = Element> = PartialRecord<State, Type | ReifectInterpolator<Type, ClassType>> | Type | StateInterpolator<Type, State, ClassType>;
/**
 * @group Components
 * @category StatefulReifect
 */
type ReifectObjectData<State extends string | number | symbol, ClassType extends object = Element> = {
    object: WeakRef<ClassType>;
    enabled: ReifectEnabledObject;
    lastState?: State;
    resolvedValues?: ReifectObjectComputedProperties<State, ClassType>;
    objectIndex?: number;
    totalObjectCount?: number;
    onSwitch?: (state: State, index: number, total: number, object: ClassType) => void;
};
/**
 * @group Components
 * @category StatefulReifect
 */
type ReifectObjectComputedProperties<State extends string | number | symbol, ClassType extends object = Element> = {
    properties: PartialRecord<State, PartialRecord<keyof ClassType, any>>;
    styles: PartialRecord<State, StylesType>;
    classes: PartialRecord<State, string | string[]>;
    replaceWith: PartialRecord<State, ClassType>;
    transitionProperties: PartialRecord<State, string[]>;
    transitionDuration: PartialRecord<State, number>;
    transitionTimingFunction: PartialRecord<State, string>;
    transitionDelay: PartialRecord<State, number>;
};
/**
 * @group Components
 * @category StatefulReifect
 */
type StatefulReifectCoreProperties<State extends string | number | symbol, ClassType extends object = Element> = {
    properties?: PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType>;
    styles?: PropertyConfig<StylesType, State, ClassType>;
    classes?: PropertyConfig<string | string[], State, ClassType>;
    replaceWith?: PropertyConfig<ClassType, State, ClassType>;
    transitionProperties?: PropertyConfig<string | string[], State, ClassType>;
    transitionDuration?: PropertyConfig<number, State, ClassType>;
    transitionTimingFunction?: PropertyConfig<string, State, ClassType>;
    transitionDelay?: PropertyConfig<number, State, ClassType>;
};
/**
 * @group Components
 * @category StatefulReifect
 */
type StatefulReifectProperties<State extends string | number | symbol, ClassType extends object = Element> = StatefulReifectCoreProperties<State, ClassType> & {
    states?: State[];
    attachedObjects?: ClassType[];
    transition?: BasicPropertyConfig<string, State>;
};
/**
 * @group Components
 * @category StatefulReifect
 */
type ReifectAppliedOptions<State extends string | number | symbol = any, ClassType extends object = Element> = {
    attachObjects?: boolean;
    executeForAll?: boolean;
    recomputeIndices?: boolean;
    recomputeProperties?: boolean;
    applyStylesInstantly?: boolean;
    propertiesOverride?: StatefulReifectCoreProperties<State, ClassType>;
};
/**
 * @group Components
 * @category StatefulReifect
 */
type ReifectEnabledObject = {
    global?: boolean;
    properties?: boolean;
    styles?: boolean;
    classes?: boolean;
    replaceWith?: boolean;
    transition?: boolean;
};

/**
 * @class StatefulReifect
 * @group Components
 * @category StatefulReifect
 *
 * @description A class to manage and apply dynamic state-based properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {string | number | symbol} State - The type of the reifier's states.
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
declare class StatefulReifect<State extends string | number | symbol = any, ClassType extends object = object> {
    protected static readonly fields: readonly ["properties", "classes", "styles", "replaceWith", "transitionProperties", "transitionDuration", "transitionTimingFunction", "transitionDelay"];
    protected readonly timeRegex: RegExp;
    protected readonly attachedObjects: ReifectObjectData<State, ClassType>[];
    /**
     * @description All possible states.
     */
    states: State[];
    get enabled(): ReifectEnabledObject;
    set enabled(value: boolean | ReifectEnabledObject);
    /**
     * @description The properties to be assigned to the objects. It could take:
     * - A record of `{key: value}` pairs.
     * - A record of `{state: {key: value} pairs or an interpolation function that would return a record of
     * {key: value} pairs}`.
     * - An interpolation function that would return a record of `{key: value}` pairs based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    set properties(value: PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType>);
    get properties(): PartialRecord<State, ReifectInterpolator<PartialRecord<keyof ClassType, any>, ClassType>>;
    /**
     * @description The styles to be assigned to the objects (only if they are eligible elements). It could take:
     * - A record of `{CSS property: value}` pairs.
     * - A record of `{state: {CSS property: value} pairs or an interpolation function that would return a record of
     * {key: value} pairs}`.
     * - An interpolation function that would return a record of `{key: value}` pairs based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    set styles(value: PropertyConfig<StylesType, State, ClassType>);
    get styles(): PartialRecord<State, ReifectInterpolator<StylesType, ClassType>>;
    /**
     * @description The classes to be assigned to the objects (only if they are eligible elements). It could take:
     * - A string of space-separated classes.
     * - An array of classes.
     * - A record of `{state: space-separated class string, array of classes, or an interpolation function that would
     * return any of the latter}`.
     * - An interpolation function that would return a string of space-separated classes or an array of classes based
     * on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    set classes(value: PropertyConfig<string | string[], State, ClassType>);
    get classes(): PartialRecord<State, ReifectInterpolator<string | string[], ClassType>>;
    /**
     * @description The object that should replace (in the DOM as well if eligible) the attached objects. It could take:
     * - The object to be replaced with.
     * - A record of `{state: object to be replaced with, or an interpolation function that would return an object
     * to be replaced with}`.
     * - An interpolation function that would return the object to be replaced with based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    set replaceWith(value: PropertyConfig<ClassType, State, ClassType>);
    get replaceWith(): PartialRecord<State, ReifectInterpolator<ClassType, ClassType>>;
    /**
     * @description The property(ies) to apply a CSS transition on, on the attached objects. Defaults to "all". It
     * could take:
     * - A string of space-separated CSS properties.
     * - An array of CSS properties.
     * - A record of `{state: space-separated CSS properties string, array of CSS properties, or an interpolation
     * function that would return any of the latter}`.
     * - An interpolation function that would return a string of space-separated CSS properties or an array of
     * CSS properties based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    set transitionProperties(value: PropertyConfig<string | string[], State, ClassType>);
    get transitionProperties(): PartialRecord<State, ReifectInterpolator<string | string[], ClassType>>;
    /**
     * @description The duration of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - A record of `{state: duration (number in seconds) or an interpolation function that would return a duration
     * (number in seconds)}`.
     * - An interpolation function that would return a duration (number in seconds) based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    set transitionDuration(value: PropertyConfig<number, State, ClassType>);
    get transitionDuration(): PartialRecord<State, ReifectInterpolator<number, ClassType>>;
    /**
     * @description The timing function of the CSS transition to apply on the attached objects. Defaults to "linear."
     * It could take:
     * - A string representing the timing function to apply.
     * - A record of `{state: timing function (string) or an interpolation function that would return a timing
     * function (string)}`.
     * - An interpolation function that would return a timing function (string) based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    set transitionTimingFunction(value: PropertyConfig<string, State, ClassType>);
    get transitionTimingFunction(): PartialRecord<State, ReifectInterpolator<string, ClassType>>;
    /**
     * @description The delay of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - A record of `{state: delay (number in seconds) or an interpolation function that would return a delay
     * (number in seconds)}`.
     * - An interpolation function that would return a delay (number in seconds) based on the state value.
     *
     * The interpolation function would take as arguments:
     * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
     * defined for the whole field (and not for a specific state).
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    set transitionDelay(value: PropertyConfig<number, State, ClassType>);
    get transitionDelay(): PartialRecord<State, ReifectInterpolator<number, ClassType>>;
    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatefulReifectProperties<State, ClassType>} properties - The configuration properties.
     */
    constructor(properties: StatefulReifectProperties<State, ClassType>);
    /**
     * @function attach
     * @description Attaches an object to the reifier.
     * @param {ClassType} object - The object to attach.
     * @param {(state: State, index: number, total: number, object: ClassType) => void} [onSwitch] - Optional
     * callback fired when the reifier is applied to the object. The callback takes as parameters:
     * - `state: State`: The state being applied to the object.
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     * @param {number} [index] - Optional index to specify the position at which to insert the object in the reifier's
     * attached list.
     * @returns {this} - The reifier itself, for method chaining.
     */
    attach(object: ClassType, onSwitch?: (state: State, index: number, total: number, object: ClassType) => void, index?: number): this;
    /**
     * @function attachAll
     * @description Attaches multiple objects to the reifier.
     * @param {...ClassType[]} objects - The objects to attach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    attachAll(...objects: ClassType[]): this;
    /**
     * @function attachAllAt
     * @description Attaches multiple objects to the reifier at a specified index.
     * @param {number} index - The index to specify the position at which to insert the objects in the reifier's
     * attached list.
     * @param {...ClassType[]} objects - The objects to attach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    attachAllAt(index: number, ...objects: ClassType[]): this;
    /**
     * @function detach
     * @description Detaches one or more objects from the reifier.
     * @param {...ClassType[]} objects - The objects to detach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    detach(...objects: ClassType[]): this;
    /**
     * @protected
     * @function attachObject
     * @description Function used to generate a data entry for the given object, and add it to the attached list at
     * the provided index (if any).
     * @param {ClassType} object - The object to attach
     * @param {number} [index] - Optional index to specify the position at which to insert the object in the reifier's
     * attached list.
     * @param {(state: State, index: number, total: number, object: ClassType) => void} [onSwitch] - Optional
     * callback fired when the reifier is applied to the object. The callback takes as parameters:
     * - `state: State`: The state being applied to the object.
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     * @returns {ReifectObjectData<State, ClassType>} - The created data entry.
     */
    protected attachObject(object: ClassType, index?: number, onSwitch?: (state: State, index: number, total: number, object: ClassType) => void): ReifectObjectData<State, ClassType>;
    /**
     * @protected
     * @function detachObject
     * @description Function used to remove a data entry from the attached objects list.
     * @param {ReifectObjectData<State, ClassType>} data - The data entry to remove.
     */
    protected detachObject(data: ReifectObjectData<State, ClassType>): void;
    /**
     * @function getData
     * @description Retrieve the data entry of a given object.
     * @param {ClassType} object - The object to find the data of.
     * @returns {ReifectObjectData<State, ClassType>} - The corresponding data, or `null` if was not found.
     */
    getData(object: ClassType): ReifectObjectData<State, ClassType>;
    /**
     * @function getObject
     * @description Retrieves the object attached to the given data entry.
     * @param {ReifectObjectData<State, ClassType>} data - The data entry to get the corresponding object of.
     * @returns {ClassType} The corresponding object, or `null` if was garbage collected.
     */
    getObject(data: ReifectObjectData<State, ClassType>): ClassType;
    /**
     * @function stateOf
     * @description Determine the current state of the reifect on the provided object.
     * @param {ClassType} object - The object to determine the state for.
     * @returns {State | undefined} - The current state of the reifect or undefined if not determinable.
     */
    stateOf(object: ClassType): State;
    getAllStates(): State[];
    /**
     * @protected
     * @function parseState
     * @description Parses a boolean into the corresponding state value.
     * @param {State | boolean} value - The value to parse.
     * @returns {State} The parsed value, or `null` if the boolean could not be parsed.
     */
    protected parseState(value: State | boolean): State;
    /**
     * @function enable
     * @description Sets/updates the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to set the state of.
     * @param {boolean | ReifectEnabledObject} value - The value to set/update with. Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    enable(value: boolean | ReifectEnabledObject, object?: ClassType): boolean | ReifectEnabledObject;
    /**
     * @function getObjectEnabledState
     * @description Returns the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to get the state of.
     * @returns {ReifectEnabledObject} - The corresponding enabled state.
     */
    getObjectEnabledState(object: ClassType): ReifectEnabledObject;
    set transition(value: BasicPropertyConfig<string, State>);
    protected processTransitionObject(transitionObject: BasicPropertyConfig<string, State>): StatefulReifectCoreProperties<State, ClassType>;
    protected processTransitionString(transitionString: string): StatefulReifectCoreProperties<State, ClassType>;
    /**
     * @function getTransitionString
     * @description Gets the CSS transition string for the specified direction.
     * @param {ReifectObjectData<State, ClassType>} data - The target element's transition data entry.
     * @param state
     * @returns {string} The CSS transition string.
     */
    private getTransitionString;
    initialize(state: State | boolean, objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): void;
    apply(state: State | boolean, objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): void;
    toggle(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): void;
    /**
     * @function reloadFor
     * @description Generates the transition CSS string for the provided transition with the correct interpolation
     * information.
     * @param {ClassType} object - The element to apply the string to.
     * @returns {this} Itself for method chaining.
     */
    reloadFor(object: ClassType): this;
    reloadTransitionFor(object: ClassType): this;
    getEnabledObjectsData(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): ReifectObjectData<State, ClassType>[];
    applyResolvedValues(data: ReifectObjectData<State, ClassType>, skipTransition?: boolean, applyStylesInstantly?: boolean): void;
    refreshResolvedValues(): void;
    applyProperties(data: ReifectObjectData<State, ClassType>, state?: State): void;
    refreshProperties(): void;
    applyReplaceWith(data: ReifectObjectData<State, ClassType>, state?: State): void;
    refreshReplaceWith(): void;
    applyClasses(data: ReifectObjectData<State, ClassType>, state?: State): void;
    refreshClasses(): void;
    applyStyles(data: ReifectObjectData<State, ClassType>, state?: State, applyStylesInstantly?: boolean): void;
    refreshStyles(): void;
    applyTransition(data: ReifectObjectData<State, ClassType>, state?: State): void;
    refreshTransition(): void;
    protected filterEnabledObjects(data: ReifectObjectData<State, ClassType>): boolean;
    protected processRawProperties(data: ReifectObjectData<State, ClassType>, override?: StatefulReifectCoreProperties<State, ClassType>): void;
    private generateNewData;
    private initializeOptions;
    /**
     * @description Clone the reifect to create a new copy with the same properties but no attached objects.
     * @returns {StatefulReifect<State, ClassType>} - The new reifect.
     */
    clone(): StatefulReifect<State, ClassType>;
    protected normalizePropertyConfig<Type>(currentConfig: PartialRecord<State, ReifectInterpolator<Type, ClassType>>, newConfig: PropertyConfig<Type, State, ClassType>): PartialRecord<State, ReifectInterpolator<Type, ClassType>>;
    private cleanTransitionProperties;
    /**
     * @description Processes string durations like "200ms" or "0.3s", or even "100".
     * @param value
     * @private
     */
    private parseTime;
}
/**
 * @group Components
 * @category StatefulReifect
 */
declare function statefulReifier<State extends string | number | symbol, ClassType extends object = Element>(properties: StatefulReifectProperties<State, ClassType>): StatefulReifect<State, ClassType>;

/**
 * @group Components
 * @category TurboIconSwitch
 */
type TurboIconSwitchProperties<State extends string | number | symbol, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboIconProperties<ViewType, DataType, ModelType, EmitterType> & {
    switchReifect?: StatefulReifect<State, TurboIcon> | StatefulReifectProperties<State, TurboIcon>;
    defaultState?: State;
    appendStateToIconName?: boolean;
};

/**
 * @group Types
 * @category Enums
 */
declare enum Direction {
    vertical = "vertical",
    horizontal = "horizontal"
}
/**
 * @group Types
 * @category Enums
 */
declare enum SideH {
    left = "left",
    right = "right"
}
/**
 * @group Types
 * @category Enums
 */
declare enum SideV {
    top = "top",
    bottom = "bottom"
}
/**
 * @group Types
 * @category Enums
 */
declare enum Side {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right"
}
/**
 * @group Types
 * @category Enums
 */
declare enum InOut {
    in = "in",
    out = "out"
}
/**
 * @group Types
 * @category Enums
 */
declare enum OnOff {
    on = "on",
    off = "off"
}
/**
 * @group Types
 * @category Enums
 */
declare enum Open {
    open = "open",
    closed = "closed"
}
/**
 * @group Types
 * @category Enums
 */
declare enum Shown {
    visible = "visible",
    hidden = "hidden"
}
/**
 * @group Types
 * @category Enums
 */
declare enum AccessLevel {
    public = "public",
    protected = "protected",
    private = "private"
}
/**
 * @group Types
 * @category Enums
 */
declare enum Range {
    min = "min",
    max = "max"
}

/**
 * @group Components
 * @category TurboIconSwitch
 */
declare class TurboIconSwitch<State extends string | number | symbol = OnOff, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboIcon<ViewType, DataType, ModelType, EmitterType> {
    config: TurboIconConfig;
    get switchReifect(): StatefulReifect<State, TurboIcon>;
    set switchReifect(value: StatefulReifect<State, TurboIcon> | StatefulReifectProperties<State, TurboIcon>);
    set defaultState(value: State);
    set appendStateToIconName(value: boolean);
    initialize(): void;
}
/**
 * @group Components
 * @category TurboIconSwitch
 */
declare function iconSwitch<State extends string | number | symbol = OnOff, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties: TurboIconSwitchProperties<State, ViewType, DataType, ModelType, EmitterType>): TurboIconSwitch<State, ViewType, DataType, ModelType, EmitterType>;

/**
 * @group Components
 * @category TurboIconToggle
 */
type TurboIconToggleProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboIconProperties<ViewType, DataType, ModelType, EmitterType> & {
    toggled?: boolean;
    toggleOnClick?: boolean;
    stopPropagationOnClick?: boolean;
    onToggle?: (value: boolean, el: TurboIconToggle) => void;
};

/**
 * @group Components
 * @category TurboIconToggle
 */
declare class TurboIconToggle<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboIcon<ViewType, DataType, ModelType, EmitterType> {
    config: TurboIconConfig;
    stopPropagationOnClick: boolean;
    onToggle: (value: boolean, el: TurboIconToggle) => void;
    private clickListener;
    set toggled(value: boolean);
    set toggleOnClick(value: boolean);
    toggle(): void;
}
/**
 * @group Components
 * @category TurboIconToggle
 */
declare function iconToggle<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties: TurboIconToggleProperties<ViewType, DataType, ModelType, EmitterType>): TurboIconToggle<ViewType, DataType, ModelType, EmitterType>;

/**
 * @group Components
 * @category TurboInput
 */
type TurboInputProperties<InputTag extends "input" | "textarea" = "input", ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = Omit<TurboRichElementProperties<InputTag, ViewType, DataType, ModelType, EmitterType>, "element" | "elementTag"> & {
    inputTag?: InputTag;
    input?: TurboProperties<InputTag> | ValidElement<InputTag>;
    label?: string;
    locked?: boolean;
    dynamicVerticalResize?: boolean;
    inputRegexCheck?: RegExp | string;
    blurRegexCheck?: RegExp | string;
    selectTextOnFocus?: boolean;
};

/**
 * @group Components
 * @category TurboInput
 */
declare class TurboInput<InputTag extends "input" | "textarea" = "input", ValueType extends string | number = string, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboRichElement<InputTag, ViewType, DataType, ModelType, EmitterType> {
    static config: TurboRichElementConfig;
    protected labelElement: HTMLLabelElement;
    private _content;
    get content(): HTMLElement;
    set content(value: HTMLElement);
    defaultId: string;
    locked: boolean;
    selectTextOnFocus: boolean;
    dynamicVerticalResize: boolean;
    inputRegexCheck: RegExp | string;
    blurRegexCheck: RegExp | string;
    private lastValidForInput;
    private lastValidForBlur;
    readonly onFocus: Delegate<() => void>;
    readonly onBlur: Delegate<() => void>;
    readonly onInput: Delegate<() => void>;
    set label(value: string);
    set element(value: TurboProperties<InputTag> | ValidElement<InputTag>);
    get element(): ValidElement<InputTag>;
    initialize(): void;
    protected setupUIElements(): void;
    protected setupUILayout(): void;
    protected setupChangedCallbacks(): void;
    get value(): ValueType;
    set value(value: string | ValueType);
    protected processInputValue(value?: string): void;
    private sanitizeByRegex;
}
/**
 * @group Components
 * @category TurboInput
 */
declare function turboInput<InputTag extends "input" | "textarea" = "input", ValueType extends string | number = string, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties: TurboInputProperties<InputTag, ViewType, DataType, ModelType, EmitterType>): TurboInput<InputTag, ValueType, ViewType, DataType, ModelType, EmitterType>;

/**
 * @group Components
 * @category TurboNumericalInput
 */
type TurboNumericalInputProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboInputProperties<"input", ViewType, DataType, ModelType, EmitterType> & {
    multiplier?: number;
    decimalPlaces?: number;
    min?: number;
    max?: number;
};

/**
 * @group Components
 * @category TurboNumericalInput
 */
declare class TurboNumericalInput<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboInput<"input", number, ViewType, DataType, ModelType, EmitterType> {
    multiplier: number;
    decimalPlaces: number;
    min: number;
    max: number;
    get value(): number;
    set value(value: string | number);
}
/**
 * @group Components
 * @category TurboNumericalInput
 */
declare function numericalInput<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties: TurboNumericalInputProperties<ViewType, DataType, ModelType, EmitterType>): TurboNumericalInput<ViewType, DataType, ModelType, EmitterType>;

type EntryData = {
    enabled?: boolean;
    selected?: boolean;
};
/**
 * @group Components
 * @category TurboSelect
 */
type TurboSelectProperties<ValueType = string, SecondaryValueType = string, EntryType extends object = HTMLElement> = {
    selectedEntryClasses?: string | string[];
    entries?: HTMLCollection | NodeList | EntryType[];
    values?: (ValueType | EntryType)[];
    selectedValues?: ValueType[];
    getValue?: (entry: EntryType) => ValueType;
    getSecondaryValue?: (entry: EntryType) => SecondaryValueType;
    createEntry?: (value: ValueType) => EntryType;
    onEntryAdded?: (entry: EntryType, index: number) => void;
    multiSelection?: boolean;
    forceSelection?: boolean;
    inputName?: string;
    parent?: Element;
    onSelect?: (b: boolean, entry: EntryType, index: number) => void;
    onEnabled?: (b: boolean, entry: EntryType, index: number) => void;
};
/**
 * @group Components
 * @category TurboSelect
 */
type TurboSelectConfig = {
    defaultSelectedEntryClasses?: string | string[];
};
/**
 * @group Components
 * @category TurboSelect
 */
type TurboSelectInputEventProperties<ValueType = string, SecondaryValueType = string, EntryType extends object = HTMLElement> = TurboRawEventProperties & {
    toggledEntry: EntryType;
    values: ValueType[];
};

/**
 * @class TurboBaseElement
 * @group TurboElement
 * @category TurboBaseElement
 *
 * @description TurboHeadlessElement class, similar to TurboElement but without extending HTMLElement.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
declare class TurboBaseElement {
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
}

/**
 * @class TurboSelect
 * @group Components
 * @category TurboSelect
 *
 * @description Base class for creating a selection menu

 * @extends TurboElement
 */
declare class TurboSelect<ValueType = string, SecondaryValueType = string, EntryType extends object = HTMLElement> extends TurboBaseElement {
    static readonly config: TurboSelectConfig;
    private _inputField;
    private _entries;
    private readonly _entriesData;
    private parentObserver;
    readonly onSelectDelegate: Delegate<(b: boolean, entry: EntryType, index: number) => void>;
    readonly onEnabledDelegate: Delegate<(b: boolean, entry: EntryType, index: number) => void>;
    /**
     * The dropdown's entries.
     */
    get entries(): EntryType[];
    set entries(value: HTMLCollection | NodeList | EntryType[]);
    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values(): ValueType[];
    set values(values: ValueType[]);
    get selectedEntries(): EntryType[];
    set selectedEntries(value: EntryType[]);
    set parent(value: Element);
    getValue: (entry: EntryType) => ValueType;
    getSecondaryValue: (entry: EntryType) => SecondaryValueType;
    createEntry: (value: ValueType) => EntryType;
    onEntryAdded: (entry: EntryType, index: number) => void;
    onEntryRemoved: (entry: EntryType) => void;
    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    get inputName(): string;
    set inputName(value: string);
    get inputField(): HTMLInputElement;
    set multiSelection(value: boolean);
    forceSelection: boolean;
    set onSelect(value: (b: boolean, entry: EntryType, index: number) => void);
    set onEnabled(value: (b: boolean, entry: EntryType, index: number) => void);
    selectedEntryClasses: string | string[];
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties?: TurboSelectProperties<ValueType, SecondaryValueType, EntryType>);
    protected getEntryData(entry: EntryType): EntryData;
    protected clearEntryData(entry: EntryType): void;
    addEntry(entry: EntryType, index?: number): void;
    getEntryFromSecondaryValue(value: SecondaryValueType): EntryType;
    isSelected(entry: EntryType): boolean;
    protected getEntry(value: EntryType | ValueType): EntryType;
    /**
     * @description Select an entry.
     * @param {string | EntryType} value - The DropdownEntry (or its string value) to select.
     * @param selected
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    select(value: ValueType | EntryType, selected?: boolean): this;
    /**
     * @description Select an entry.
     * @param {number} index - The index of the entry to select
     * @param {(index: number, entriesCount: number, zero?: number) => number} [preprocess=trim] - Callback to execute
     * on the index to preprocess it. Defaults to trim().
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    selectByIndex(index: number, preprocess?: (index: number, entriesCount: number, zero?: number) => number): this;
    getIndex(entry: EntryType): number;
    deselectAll(): void;
    reset(): void;
    get enabledEntries(): EntryType[];
    get enabledValues(): ValueType[];
    get enabledSecondaryValues(): SecondaryValueType[];
    find(value: ValueType): EntryType;
    findBySecondaryValue(value: SecondaryValueType): EntryType;
    findAll(...values: ValueType[]): EntryType[];
    findAllBySecondaryValue(...values: SecondaryValueType[]): EntryType[];
    enable(b: boolean, ...entries: (ValueType | EntryType)[]): void;
    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntry(): EntryType;
    /**
     * @description The dropdown's currently selected values
     */
    get selectedValues(): ValueType[];
    get selectedValue(): ValueType;
    get selectedSecondaryValues(): SecondaryValueType[];
    get selectedSecondaryValue(): SecondaryValueType;
    get stringSelectedValue(): string;
    clear(): void;
    refreshInputField(): void;
    destroy(): this;
    protected enableObserver(value: boolean): void;
    protected initializeSelection(): void;
    protected setupParentObserver(): void;
}

/**
 * @group Event Handling
 * @category TurboEvents
 */
declare class TurboSelectInputEvent<ValueType = string, SecondaryValueType = string, EntryType extends object = HTMLElement> extends TurboEvent {
    readonly toggledEntry: EntryType;
    readonly values: ValueType[];
    constructor(properties: TurboSelectInputEventProperties<ValueType, SecondaryValueType, EntryType>);
}

declare module "yjs" {
    interface Map<MapType = any> {
    }
    interface Array<T = any> {
    }
    interface AbstractType<EventType = any> {
    }
    interface YEvent<T = any, EventType = any> {
    }
    interface YMapEvent<T = any, EventType = any> {
    }
    interface YArrayEvent<T = any, EventType = any> {
    }
}
/**
 * @group Types
 * @category Yjs
 */
type YDocumentProperties<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    document: Doc;
};

/**
 * @group Components
 * @category TurboYBlock
 */
declare class TurboYBlock<YType extends Map$1 | Array = Map$1 | Array, KeyType extends string | number | symbol = any, IdType extends string | number | symbol = any> extends TurboDataBlock<YType, KeyType, IdType> {
    private observer;
    set enabledCallbacks(value: boolean);
    /**
     * @function get
     * @description Retrieves the value associated with a given key in the specified block.
     * @param {KeyType} key - The key to retrieve.
     * @returns {unknown} The value associated with the key, or null if not found.
     */
    get(key: KeyType): unknown;
    /**
     * @function set
     * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {unknown} value - The value to assign.
     */
    set(key: KeyType, value: unknown): void;
    has(key: KeyType): boolean;
    delete(key: KeyType): void;
    /**
     * @function keys
     * @description Retrieves all keys within the given block(s).
     * @returns {KeyType[]} Array of keys.
     */
    get keys(): KeyType[];
    /**
     * @function size
     * @description Returns the size of the specified block.
     * @returns {number} The size.
     */
    get size(): number;
    /**
     * @function initialize
     * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
     */
    initialize(): void;
    clear(clearData?: boolean): void;
    protected observeChanges(event: YEvent, transaction: any): void;
    private shiftIndices;
}

/**
 * @group Components
 * @category Reifect
 *
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type StatelessPropertyConfig<Type, ClassType extends object = Element> = Type | ReifectInterpolator<Type, ClassType>;
/**
 * @group Components
 * @category Reifect
 */
type StatelessReifectCoreProperties<ClassType extends object = Element> = {
    properties?: StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>;
    styles?: StatelessPropertyConfig<StylesType, ClassType>;
    classes?: StatelessPropertyConfig<string | string[], ClassType>;
    replaceWith?: StatelessPropertyConfig<ClassType, ClassType>;
    transitionProperties?: StatelessPropertyConfig<string | string[], ClassType>;
    transitionDuration?: StatelessPropertyConfig<number, ClassType>;
    transitionTimingFunction?: StatelessPropertyConfig<string, ClassType>;
    transitionDelay?: StatelessPropertyConfig<number, ClassType>;
};
/**
 * @group Components
 * @category Reifect
 */
type StatelessReifectProperties<ClassType extends object = Element> = StatelessReifectCoreProperties<ClassType> & {
    attachedObjects?: ClassType[];
};

/**
 * @class Reifect
 * @group Components
 * @category Reifect
 *
 * @description A class to manage and apply dynamic properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
declare class Reifect<ClassType extends object = Node> extends StatefulReifect<"default", ClassType> {
    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatelessReifectProperties<ClassType>} properties - The configuration properties.
     */
    constructor(properties: StatelessReifectProperties<ClassType>);
    /**
     * @description The properties to be assigned to the objects. It could take:
     * - A record of `{key: value}` pairs.
     * - An interpolation function that would return a record of `{key: value}` pairs.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get properties(): StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>;
    set properties(value: StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>);
    /**
     * @description The styles to be assigned to the objects (only if they are eligible elements). It could take:
     * - A record of `{CSS property: value}` pairs.
     * - An interpolation function that would return a record of `{key: value}` pairs.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get styles(): StatelessPropertyConfig<StylesType, ClassType>;
    set styles(value: StatelessPropertyConfig<StylesType, ClassType>);
    /**
     * @description The classes to be assigned to the objects (only if they are eligible elements). It could take:
     * - A string of space-separated classes.
     * - An array of classes.
     * - An interpolation function that would return a string of space-separated classes or an array of classes.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get classes(): StatelessPropertyConfig<string | string[], ClassType>;
    set classes(value: StatelessPropertyConfig<string | string[], ClassType>);
    /**
     * @description The object that should replace (in the DOM as well if eligible) the attached objects. It could take:
     * - The object to be replaced with.
     * - An interpolation function that would return the object to be replaced with.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get replaceWith(): StatelessPropertyConfig<ClassType, ClassType>;
    set replaceWith(value: StatelessPropertyConfig<ClassType, ClassType>);
    /**
     * @description The property(ies) to apply a CSS transition on, on the attached objects. Defaults to "all". It
     * could take:
     * - A string of space-separated CSS properties.
     * - An array of CSS properties.
     * - An interpolation function that would return a string of space-separated CSS properties or an array of
     * CSS properties.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get transitionProperties(): StatelessPropertyConfig<string | string[], ClassType>;
    set transitionProperties(value: StatelessPropertyConfig<string | string[], ClassType>);
    /**
     * @description The duration of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - An interpolation function that would return a duration (number in seconds).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get transitionDuration(): StatelessPropertyConfig<number, ClassType>;
    set transitionDuration(value: StatelessPropertyConfig<number, ClassType>);
    /**
     * @description The timing function of the CSS transition to apply on the attached objects. Defaults to "linear."
     * It could take:
     * - A string representing the timing function to apply.
     * - An interpolation function that would return a timing function (string).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get transitionTimingFunction(): StatelessPropertyConfig<string, ClassType>;
    set transitionTimingFunction(value: StatelessPropertyConfig<string, ClassType>);
    /**
     * @description The delay of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - An interpolation function that would return a delay (number in seconds).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get transitionDelay(): StatelessPropertyConfig<number, ClassType>;
    set transitionDelay(value: StatelessPropertyConfig<number, ClassType>);
    initialize(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<"default", ClassType>): void;
    apply(objects?: ClassType[] | ClassType, options?: ReifectAppliedOptions<"default", ClassType>): void;
}
/**
 * @group Components
 * @category Reifect
 */
declare function reifect<ClassType extends object = Node>(properties: StatelessReifectProperties<ClassType>): Reifect<ClassType>;

/**
 * @group Components
 * @category TurboDrawer
 */
type TurboDrawerProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    side?: Side;
    offset?: number | PartialRecord<Open, number>;
    hideOverflow?: boolean;
    panel?: TurboProperties | HTMLElement;
    thumb?: TurboProperties | HTMLElement;
    icon?: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>;
    attachSideToIconName?: boolean;
    rotateIconBasedOnSide?: boolean;
    open?: boolean;
    transition?: Reifect<HTMLElement>;
};

/**
 * @group Components
 * @category TurboDrawer
 */
declare class TurboDrawer<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EMitterType extends TurboEmitter = TurboEmitter> extends TurboElement<ViewType, DataType, ModelType, EMitterType> {
    private _panelContainer;
    get panelContainer(): HTMLElement;
    private dragging;
    protected resizeObserver: ResizeObserver;
    set thumb(value: TurboProperties | HTMLElement);
    get thumb(): HTMLElement;
    set panel(value: TurboProperties | HTMLElement);
    get panel(): HTMLElement;
    set icon(_value: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>);
    get icon(): TurboIconSwitch<Side> | Element;
    set hideOverflow(value: boolean);
    set attachSideToIconName(value: boolean);
    set rotateIconBasedOnSide(value: boolean);
    set side(value: Side);
    set offset(value: number | PartialRecord<Open, number>);
    get offset(): PartialRecord<Open, number>;
    get isVertical(): boolean;
    set open(value: boolean);
    private set translation(value);
    transition: Reifect;
    get translation(): number;
    initialize(): void;
    protected setupUIElements(): void;
    protected setupUILayout(): void;
    protected setupUIListeners(): void;
    getOppositeSide(side?: Side): Side;
    getAdjacentSide(side?: Side): Side;
    refresh(): void;
    protected enableTransition(b: boolean): void;
    protected setupResizeObserver(): void;
}
/**
 * @group Components
 * @category TurboDrawer
 */
declare function drawer<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties: TurboDrawerProperties<ViewType, DataType, ModelType, EmitterType>): TurboDrawer<ViewType, DataType, ModelType, EmitterType>;

/**
 * @group Components
 * @category TurboPopup
 */
type TurboPopupProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    anchor?: Element;
    popupPosition?: Coordinate;
    anchorPosition?: Coordinate;
    fallbackModes?: PopupFallbackMode | Coordinate<PopupFallbackMode>;
    viewportMargin?: number | Coordinate;
    offsetFromAnchor?: number | Coordinate;
};
/**
 * @group Components
 * @category TurboPopup
 */
type TurboPopupConfig = {
    defaultClasses?: string | string[];
    defaultPopupPosition?: Coordinate;
    defaultAnchorPosition?: Coordinate;
    defaultViewportMargin?: number | Coordinate;
    defaultOffsetFromAnchor?: number | Coordinate;
};
/**
 * @group Components
 * @category TurboPopup
 */
declare enum PopupFallbackMode {
    invert = "invert",
    offset = "offset",
    none = "none"
}

/**
 * @group Components
 * @category TurboPopup
 */
declare class TurboPopup<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    static readonly config: TurboPopupConfig;
    protected static parentElement: HTMLElement;
    anchor: Element;
    set popupPosition(value: Coordinate);
    get popupPosition(): Point;
    set anchorPosition(value: Coordinate);
    get anchorPosition(): Point;
    set viewportMargin(value: Coordinate | number);
    get viewportMargin(): Point;
    set offsetFromAnchor(value: Coordinate | number);
    get offsetFromAnchor(): Point;
    set fallbackModes(value: PopupFallbackMode | Coordinate<PopupFallbackMode>);
    get fallbackModes(): Coordinate<PopupFallbackMode>;
    protected get rect(): DOMRect;
    protected get anchorRect(): DOMRect;
    protected get computedStyle(): CSSStyleDeclaration;
    protected get anchorComputedStyle(): CSSStyleDeclaration;
    protected get computedMargins(): Coordinate;
    initialize(): void;
    protected setupUIListeners(): void;
    private recomputePosition;
    private computeAxis;
    show(b: boolean): this;
}
/**
 * @group Components
 * @category TurboPopup
 */
declare function popup<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties?: TurboPopupProperties<ViewType, DataType, ModelType, EmitterType>): TurboPopup<ViewType, DataType, ModelType, EmitterType>;

/**
 * @type {TurboDropdownProperties}
 * @group Components
 * @category TurboDropdown
 *
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 *
 * @property {ValidTag} [selectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 *
 * @property {string | string[]} [selectorClasses] - Custom CSS class(es) for the selector. Overrides the default
 * classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [popupClasses] - Custom CSS class(es) for the popup container. Overrides the
 * default classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customEntriesClasses] - Custom CSS class(es) for dropdown entries.  Overrides the
 * default classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customSelectedEntriesClasses] - Custom CSS class(es) for selected entries.  Overrides
 * the default classes set in TurboConfig.Dropdown.
 */
type TurboDropdownProperties<ValueType = string, SecondaryValueType = string, EntryType extends HTMLElement = HTMLElement, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<DataType>, EmitterType extends TurboEmitter = TurboEmitter> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & TurboSelectProperties<ValueType, SecondaryValueType, EntryType> & {
    selector?: string | HTMLElement;
    popup?: HTMLElement;
    selectorTag?: HTMLTag;
    selectorClasses?: string | string[];
    popupClasses?: string | string[];
    customEntriesClasses?: string | string[];
    customSelectedEntriesClasses?: string | string[];
};
/**
 * @type {TurboDropdownConfig}
 * @group Components
 * @category TurboDropdown
 *
 * @description Configuration object for the Dropdown class. Set it via TurboConfig.Dropdown.
 *
 * @property {ValidTag} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */
type TurboDropdownConfig = TurboElementConfig & {
    defaultSelectorTag?: HTMLTag;
    defaultSelectorClasses?: string | string[];
    defaultPopupClasses?: string | string[];
    defaultEntriesClasses?: string | string[];
    defaultSelectedEntriesClasses?: string | string[];
};

/**
 * @class TurboDropdown
 * @group Components
 * @category TurboDropdown
 *
 * @description Dropdown class for creating Turbo button elements.
 * @extends TurboElement
 */
declare class TurboDropdown<ValueType = string, SecondaryValueType = string, EntryType extends HTMLElement = HTMLElement, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    static readonly config: TurboDropdownConfig;
    readonly select: TurboSelect<ValueType, SecondaryValueType, EntryType>;
    private popupOpen;
    selectorTag: HTMLTag;
    selectorClasses: string | string[];
    popupClasses: string | string[];
    entries: HTMLCollection | NodeList | EntryType[];
    values: ValueType[];
    protected onEntryAdded(entry: EntryType): void;
    /**
     * The dropdown's selector element.
     */
    set selector(value: string | HTMLElement);
    get selector(): HTMLElement;
    /**
     * The dropdown's popup element.
     */
    set popup(value: HTMLElement);
    initialize(): void;
    private openPopup;
    get selectedValues(): ValueType[];
    get selectedValue(): ValueType;
    get selectedSecondaryValues(): SecondaryValueType[];
    get selectedSecondaryValue(): SecondaryValueType;
    get stringSelectedValue(): string;
}
/**
 * @group Components
 * @category TurboDropdown
 * @param properties
 */
declare function dropdown<ValueType = string, SecondaryValueType = string, EntryType extends HTMLElement = HTMLElement, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter>(properties?: TurboDropdownProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType>): TurboDropdown<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType>;

/**
 * @group Components
 * @category TurboMarkingMenu
 */
declare class TurboMarkingMenu<ValueType = string, SecondaryValueType = string, EntryType extends HTMLElement = HTMLElement, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel> extends TurboElement<ViewType, DataType, ModelType> {
    private readonly transition;
    private currentOrigin;
    minDragDistance: number;
    semiMajor: number;
    semiMinor: number;
    startAngle: number;
    endAngle: number;
}

/**
 * @group Components
 * @category TurboMarkingMenu
 */
type TurboMarkingMenuProperties<ValueType = string, SecondaryValueType = string, EntryType extends HTMLElement = HTMLElement, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboElementProperties<ViewType, DataType, ModelType> & {
    transition?: StatefulReifect<InOut> | StatefulReifectProperties<InOut>;
    startAngle?: number;
    endAngle?: number;
    semiMajor?: number;
    semiMinor?: number;
    minDragDistance?: number;
};

/**
 * @group Components
 * @category TurboSelectWheel
 */
type TurboSelectWheelProperties<ValueType = string, SecondaryValueType = string, EntryType extends HTMLElement = HTMLElement, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboElementProperties<ViewType, DataType, ModelType> & {
    direction?: Direction;
    styleReifect?: Reifect | StatelessReifectProperties;
    generateCustomStyling?: (properties: TurboSelectWheelStylingProperties) => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;
    size?: number | Record<Range, number>;
    opacity?: Record<Range, number>;
    scale?: Record<Range, number>;
    alwaysOpen?: boolean;
};
/**
 * @group Components
 * @category TurboSelectWheel
 */
type TurboSelectWheelStylingProperties = {
    element: HTMLElement;
    translationValue: number;
    scaleValue: number;
    opacityValue: number;
    size: Record<Range, number>;
    defaultComputedStyles: PartialRecord<keyof CSSStyleDeclaration, string | number>;
};

/**
 * @class TurboSelectWheel
 * @group Components
 * @category TurboSelectWheel
 *
 * @extends TurboSelect
 * @description Class to create a dynamic selection wheel.
 * @template {string} ValueType
 * @template {TurboSelectEntry<ValueType, any>} EntryType
 */
declare class TurboSelectWheel<ValueType = string, SecondaryValueType = string, EntryType extends HTMLElement = HTMLElement, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboElement<ViewType, DataType, ModelType> {
    private _currentPosition;
    private _reifect;
    private _size;
    protected readonly sizePerEntry: number[];
    protected readonly positionPerEntry: number[];
    protected totalSize: number;
    dragLimitOffset: number;
    /**
     * @description Hides after the set time has passed. Set to a negative value to never hide the wheel. In ms.
     */
    openTimeout: number;
    direction: Direction;
    scale: Record<Range, number>;
    generateCustomStyling: (properties: TurboSelectWheelStylingProperties) => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;
    protected dragging: boolean;
    protected openTimer: NodeJS.Timeout;
    set alwaysOpen(value: boolean);
    private readonly closeOnClick;
    get isVertical(): boolean;
    set open(value: boolean);
    get currentPosition(): number;
    protected computeDragValue(delta: Point): number;
    /**
     * Recalculates the dimensions and positions of all entries
     */
    protected clearOpenTimer(): void;
    protected setOpenTimer(): void;
}

/**
 * @class TurboProxiedElement
 * @group TurboElement
 * @category TurboProxiedElement
 *
 * @description TurboProxiedElement class, similar to TurboElement but containing an HTML element instead of being one.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
declare class TurboProxiedElement<ElementTag extends ValidTag = ValidTag, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter<any>> {
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
    /**
     * @description The HTML (or other) element wrapped inside this instance.
     */
    readonly element: ValidElement<ElementTag>;
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;
    constructor(properties?: TurboProxiedProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>);
    protected setupChangedCallbacks(): void;
    protected setupUIElements(): void;
    protected setupUILayout(): void;
    protected setupUIListeners(): void;
}

/**
 * @type {ChildHandler}
 * @group Types
 * @category Hierarchy
 *
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
 */
type ChildHandler = Node | ShadowRoot;
/**
 * @constant
 * @group Types
 * @category Misc
 * @description Default array-like keys to merge when applying defaults with {@link TurboSelector.applyDefaults}.
 */
declare const ApplyDefaultsMergeProperties: readonly ["interactors", "tools", "substrates", "controllers", "handlers"];
/**
 * @type {ApplyDefaultsOptions}
 * @group Types
 * @category Misc
 *
 * @description Options for {@link TurboSelector.applyDefaults}.
 * @property {string[]} [mergeProperties] - Array-like keys to merge. Defaults to {@link ApplyDefaultsMergeProperties}.
 * @property {boolean} [removeDuplicates] - Whether to remove duplicates when merging arrays. Defaults to `true`.
 */
type ApplyDefaultsOptions = {
    mergeProperties?: string[];
    removeDuplicates?: boolean;
};
/**
 * @type {MakeToolOptions}
 * @group Types
 * @category Tool
 *
 * @description Options used to create a new tool attached to an element via {@link makeTool}.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to. Defaults to the
 * default click event name.
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
 * @property {(element: Turbo<Element>, manager: TurboEventManager) => void} [customActivation] - Custom activation
 * function. If provided, is called with `(el, manager)` to define when the tool is activated.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
 * to `TurboEventManager.instance`.
 */
type MakeToolOptions = {
    onActivate?: () => void;
    onDeactivate?: () => void;
    activationEvent?: DefaultEventNameEntry;
    clickMode?: ClickMode;
    customActivation?: (element: Turbo<Element>, manager: TurboEventManager) => void;
    key?: string;
    manager?: TurboEventManager;
};
/**
 * @type {ToolBehaviorCallback}
 * @group Types
 * @category Tool
 *
 * @description Function signature for a tool behavior. Returning `true` marks the behavior as handled/consumed,
 * leading to stopping the propagation of the event.
 * @param {Event} event - The original DOM/Turbo event.
 * @param {Node} target - The node the behavior should operate on (the object or its embedded target).
 * @param {ToolBehaviorOptions} [options] - Additional info (embedded context, etc.).
 * @return {boolean} - Whether to stop the propagation.
 */
type ToolBehaviorCallback = (event: Event, target: Node, options?: ToolBehaviorOptions) => boolean | any;
/**
 * @type {ToolBehaviorOptions}
 * @group Types
 * @category Tool
 *
 * @description Options object passed to tool behaviors at execution time.
 * @property {boolean} [isEmbedded] - Indicates if the tool is embedded in a target node.
 * @property {Node} [embeddedTarget] - The target of the tool, if it is embedded.
 */
type ToolBehaviorOptions = {
    isEmbedded?: boolean;
    embeddedTarget?: Node;
};
/**
 * @overload
 * @function turbo
 * @group TurboSelector
 *
 * @template {ValidTag} Tag
 * @description All-in-one selector function that instantiates an element with the given tag and returns it wrapped
 * in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use `tu()`,
 * `t()`, or `$()` for the same behavior.
 * @param {Tag} [tag="div"] - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<ValidElement<Tag>>} - The instantiated, wrapped, and proxied element.
 */
declare function turbo<Tag extends ValidTag = "div">(tag?: Tag): Turbo<ValidElement<Tag>>;
/**
 * @overload
 * @function turbo
 * @group TurboSelector
 *
 * @template {object} Type
 * @description All-in-one selector function that wraps the given object in a proxied selector that augments it
 * with useful functions for manipulating it. You can alternatively use `tu()`, `t()`, or `$()` for the same behavior.
 * @param {Type} object - The object to wrap.
 * @return {Turbo<Type>} - The wrapped, proxied object.
 */
declare function turbo<Type extends object = Node>(object: Type): Turbo<Type>;
/**
 * @overload
 * @function turbo
 * @group TurboSelector
 *
 * @description All-in-one selector function that instantiates an element with the given tag (if valid) and returns it
 * wrapped in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use
 * `tu()`, `t()`, or `$()` for the same behavior.
 * @param {string} tag - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<Element>} - The instantiated, wrapped, and proxied element.
 */
declare function turbo(tag?: string): Turbo<Element>;
/**
 * @overload
 * @function tu
 * @group TurboSelector
 *
 * @template {ValidTag} Tag
 * @description All-in-one selector function that instantiates an element with the given tag and returns it wrapped
 * in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use `turbo()`,
 * `t()`, or `$()` for the same behavior.
 * @param {Tag} [tag="div"] - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<ValidElement<Tag>>} - The instantiated, wrapped, and proxied element.
 */
declare function tu<Tag extends ValidTag = "div">(tag?: Tag): Turbo<ValidElement<Tag>>;
/**
 * @overload
 * @function tu
 * @group TurboSelector
 *
 * @template {object} Type
 * @description All-in-one selector function that wraps the given object in a proxied selector that augments it
 * with useful functions for manipulating it. You can alternatively use `turbo()`, `t()`, or `$()` for the same behavior.
 * @param {Type} object - The object to wrap.
 * @return {Turbo<Type>} - The wrapped, proxied object.
 */
declare function tu<Type extends object = Node>(object: Type): Turbo<Type>;
/**
 * @overload
 * @function tu
 * @group TurboSelector
 *
 * @description All-in-one selector function that instantiates an element with the given tag (if valid) and returns it
 * wrapped in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use
 * `turbo()`, `t()`, or `$()` for the same behavior.
 * @param {string} tag - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<Element>} - The instantiated, wrapped, and proxied element.
 */
declare function tu(tag: string): Turbo<Element>;
/**
 * @overload
 * @function t
 * @group TurboSelector
 *
 * @template {ValidTag} Tag
 * @description All-in-one selector function that instantiates an element with the given tag and returns it wrapped
 * in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use `turbo()`,
 * `tu()`, or `$()` for the same behavior.
 * @param {Tag} [tag="div"] - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<ValidElement<Tag>>} - The instantiated, wrapped, and proxied element.
 */
declare function t<Tag extends ValidTag = "div">(tag?: Tag): Turbo<ValidElement<Tag>>;
/**
 * @overload
 * @function t
 * @group TurboSelector
 *
 * @template {object} Type
 * @description All-in-one selector function that wraps the given object in a proxied selector that augments it
 * with useful functions for manipulating it. You can alternatively use `turbo()`, `tu()`, or `$()` for the same behavior.
 * @param {Type} object - The object to wrap.
 * @return {Turbo<Type>} - The wrapped, proxied object.
 */
declare function t<Type extends object = Node>(object: Type): Turbo<Type>;
/**
 * @overload
 * @function t
 * @group TurboSelector
 *
 * @description All-in-one selector function that instantiates an element with the given tag (if valid) and returns it
 * wrapped in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use
 * `turbo()`, `tu()`, or `$()` for the same behavior.
 * @param {string} tag - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<Element>} - The instantiated, wrapped, and proxied element.
 */
declare function t(tag: string): Turbo<Element>;
/**
 * @overload
 * @function $
 * @group TurboSelector
 *
 * @template {ValidTag} Tag
 * @description All-in-one selector function that instantiates an element with the given tag and returns it wrapped
 * in a proxied selector that augments it with useful functions for manipulating it.You can alternatively use `turbo()`,
 * `tu()`, or `t()` for the same behavior.
 * @param {Tag} [tag="div"] - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<ValidElement<Tag>>} - The instantiated, wrapped, and proxied element.
 */
declare function $<Tag extends ValidTag = "div">(tag?: Tag): Turbo<ValidElement<Tag>>;
/**
 * @overload
 * @function $
 * @group TurboSelector
 *
 * @template {object} Type
 * @description All-in-one selector function that wraps the given object in a proxied selector that augments it
 * with useful functions for manipulating it. You can alternatively use `turbo()`, `tu()`, or `t()` for the same behavior.
 * @param {Type} object - The object to wrap.
 * @return {Turbo<Type>} - The wrapped, proxied object.
 */
declare function $<Type extends object = Node>(object: Type): Turbo<Type>;
/**
 * @overload
 * @function $
 * @group TurboSelector
 *
 * @description All-in-one selector function that instantiates an element with the given tag (if valid) and returns it
 * wrapped in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use
 * `turbo()`, `tu()`, or `t()` for the same behavior.
 * @param {string} tag - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<Element>} - The instantiated, wrapped, and proxied element.
 */
declare function $(tag: string): Turbo<Element>;
/**
 * @group TurboSelector
 */
declare const turbofy: (options?: TurbofyOptions) => void;

/**
 * @group Utilities
 * @category Equity
 */
declare function areEqual<Type = any>(...entries: Type[]): boolean;
/**
 * @group Utilities
 * @category Equity
 */
declare function equalToAny<Type = any>(entry: Type, ...values: Type[]): boolean;
/**
 * @group Utilities
 * @category Equity
 */
declare function eachEqualToAny<Type = any>(values: Type[], ...entries: Type[]): boolean;

/**
 * @group Utilities
 * @category Hash
 */
declare function hashString(input: string): Promise<string>;
/**
 * @group Utilities
 * @category Hash
 */
declare function hashBySize(input: string, chars?: number): Promise<string>;

/**
 * @group Utilities
 * @category Interpolation
 *
 * @description Interpolates x linearly between (x1, y1) and (x2, y2). If strict is true, then x will not be allowed
 * to go beyond [x1, x2].
 * @param x
 * @param x1
 * @param x2
 * @param y1
 * @param y2
 * @param strict
 */
declare function linearInterpolation(x: number, x1: number, x2: number, y1: number, y2: number, strict?: boolean): number;

/**
 * @group Utilities
 * @category Numbers
 */
declare function trim(value: number, max: number, min?: number): number;
/**
 * @group Utilities
 * @category Numbers
 */
declare function mod(value: number, modValue?: number): number;

/**
 * @group Utilities
 * @category Random
 */
declare function randomId(length?: number): string;
/**
 * @group Utilities
 * @category Random
 */
declare function randomFromRange(n1: number, n2: number): number;
/**
 * @group Utilities
 * @category Random
 */
declare function randomColor(saturation?: number | [number, number], lightness?: number | [number, number]): string;
/**
 * @group Utilities
 * @category Random
 */
declare function randomString(length?: number): string;

/**
 * @group Utilities
 * @category Element
 *
 * @description Converts a string of tags into an Element.
 * @param {string} text - The string to convert
 * @return The Element
 */
declare function textToElement(text: string): Element;
/**
 * @group Utilities
 * @category Element
 */
declare function createProxy<SelfType extends object, ProxiedType extends object>(self: SelfType, proxied: ProxiedType): SelfType & ProxiedType;

/**
 * @group Utilities
 * @category Null Check
 */
declare function isNull(value: any): boolean;
/**
 * @group Utilities
 * @category Null Check
 */
declare function isUndefined(value: any): boolean;

/**
 * @group Utilities
 * @category Prototype
 */
declare function getFirstDescriptorInChain(object: object, key: PropertyKey): PropertyDescriptor;
/**
 * @group Utilities
 * @category Prototype
 */
declare function hasPropertyInChain(object: object, key: PropertyKey): boolean;
/**
 * @group Utilities
 * @category Prototype
 */
declare function getFirstPrototypeInChainWith(object: object, key: PropertyKey): any;
/**
 * @group Utilities
 * @category Prototype
 */
declare function getSuperMethod(object: object, key: PropertyKey, wrapperFn: Function): Function;
/**
 * @group Utilities
 * @category Prototype
 */
declare function getSuperDescriptor(object: object, key: PropertyKey): PropertyDescriptor;

/**
 * @group Utilities
 * @category String
 *
 * @description Converts the passed variable into a string.
 * @param value - The variable to convert to string
 * @returns {string} - The string representation of the value
 */
declare function stringify(value: any): string;
/**
 * @group Utilities
 * @category String
 *
 * @description Attempts to convert the passed string back to its original type.
 * @param str - The string to convert back to its original type
 * @returns {any} - The original value
 */
declare function parse(str: string): any;
/**
 * @group Utilities
 * @category String
 *
 * @description Extracts the extension from the given filename or path (e.g.: ".png").
 * @param {string} str - The filename or path
 * @return The extension, or an empty string if not found.
 */
declare function getFileExtension(str?: string): string;
/**
 * @group Utilities
 * @category String
 *
 * @description converts the provided string from camelCase to kebab-case.
 * @param {string} str - The string to convert
 */
declare function camelToKebabCase(str?: string): string;
/**
 * @group Utilities
 * @category String
 *
 * @description converts the provided string from kebab-case to camelCase.
 * @param {string} str - The string to convert
 */
declare function kebabToCamelCase(str?: string): string;

/**
 * @group Utilities
 * @category SVG
 *
 * @description Fetches an SVG from the given path
 * @param {string} path - The path to the SVG
 * @param logError
 * @returns An SVGElement promise
 */
declare function fetchSvg(path: string, logError?: boolean): Promise<SVGElement>;

/**
 * @function createYMap
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Creates a YMap and populates it with key-value pairs from a plain object.
 * @param {object} data - The initial data to populate the YMap with.
 * @returns {YMap} A new YMap instance.
 */
declare function createYMap<DataType = object>(data: DataType): Map$1 & DataType;
/**
 * @function createYArray
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @template DataType - The type of the array's content.
 * @description Creates a YArray and populates it with elements from a plain array.
 * @param {DataType[]} data - The array of data to populate the YArray with.
 * @returns {YArray} A new YArray instance.
 */
declare function createYArray<DataType = object>(data: DataType[]): Array;
/**
 * @function addInYMap
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @async
 * @description Adds the provided data in the provided parent in the Yjs document, with a unique ID as its field name.
 * @param {object} data - The data to append to the Yjs document.
 * @param {YMap} parentYMap - The YMap to add the data to.
 * @param {string} [id] - Optional ID to use. If not provided, a unique ID is generated.
 * @returns {Promise<string>} The ID of the inserted data.
 */
declare function addInYMap(data: object, parentYMap: Map$1, id?: string): Promise<string>;
/**
 * @function addInYArray
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Adds the provided data in the provided parent array in the Yjs document.
 * @param {object} data - The data to append to the Yjs document.
 * @param {YArray} parentYArray - The YArray to which the data should be appended.
 * @param {number} [index] - The index to insert the data at. If omitted or invalid, it is appended at the end.
 * @returns {number} The index where the data was inserted.
 */
declare function addInYArray(data: object, parentYArray: Array, index?: number): number;
/**
 * @function removeFromYArray
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Removes the first occurrence of the given entry from the YArray.
 * @param {unknown} entry - The entry to remove.
 * @param {YArray} parentYArray - The parent YArray.
 * @returns {boolean} True if removed, false otherwise.
 */
declare function removeFromYArray(entry: unknown, parentYArray: Array): boolean;
/**
 * @function deepObserveAny
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Observes deeply for changes to any of the specified fields and invokes callback when any field
 * changes.
 * @param {YAbstractType} data - The Yjs type to observe.
 * @param {(fieldChanged: string, event: YEvent, target: YAbstractType) => void} callback - The function to call
 * when a matching field changes.
 * @param {...string} fieldNames - List of field names to observe.
 */
declare function deepObserveAny(data: AbstractType, callback: (fieldChanged: string, event: YEvent, target: AbstractType) => void, ...fieldNames: string[]): void;
/**
 * @function deepObserveAll
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Observes deeply for changes to all specified fields and invokes callback only when all fields
 * have changed.
 * @param {YAbstractType} data - The Yjs type to observe.
 * @param {(event: YEvent, target: YAbstractType) => void} callback - The function to call when all fields change.
 * @param {...string} fieldNames - List of field names to observe.
 */
declare function deepObserveAll(data: AbstractType, callback: (event: YEvent, target: AbstractType) => void, ...fieldNames: string[]): void;

/**
 * @group Utilities
 * @category Event
 * @param e
 */
declare function getEventPosition(e: Event): Point;

/**
 * @group Utilities
 * @category Color
 *
 * @description Evaluates the best color out of two provided options to put on top of a base color in terms of contrast
 * (for readability).
 * @param {string} baseColor - The base color in Hex format.
 * @param {string} [overlayColor1="#000000"] - The first overlay color to evaluate in Hex format. Defaults to black.
 * @param {string} [overlayColor2="#FFFFFF"] - The second overlay color to evaluate in Hex format. Defaults to white.
 */
declare function bestOverlayColor(baseColor: string, overlayColor1?: string, overlayColor2?: string): string;

/**
 * @group Utilities
 * @category Color
 *
 * @description Computes the contrast between two colors.
 * @param {string} color1 - The first color in Hex format
 * @param {string} color2 - The second color in Hex format
 * @return The contrast value, or NaN if one of the colors provided is not valid.
 */
declare function contrast(color1?: string, color2?: string): number;

/**
 * @group Utilities
 * @category Color
 *
 * @description Computes the luminance of a color
 * @param {string} color - The color in Hex format
 * @return The luminance value, or NaN if the color is not valid.
 */
declare function luminance(color?: string): number;

/**
 * @group Utilities
 * @category CSS
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
declare function css(strings: TemplateStringsArray, ...values: any[]): string;

/**
 * @type {FontProperties}
 * @group Utilities
 * @category Font
 *
 * @description An object representing a local font, or a family of fonts.
 *
 * @property {string} name - The name of the font. The font's filename should also match.
 * @property {string} pathOrDirectory - The path to the local font file, or the path to the local font family's directory.
 * @property {Record<string, string> | Record<number, Record<string, string>>} [weight] - If loading a single font, a
 * record in the form {weight: style}. Defaults to {"normal": "normal"}. If loading a family, a record in the form
 * {weight: {fontSubName: style}}, such that every font file in the family is named in the form fontName-fontSubName.
 * Defaults to an object containing common sub-names and styles for weights from 100 to 900.
 * @property {string} [format] - The format of the font. Defaults to "woff2".
 * @property {string} [extension] - The extension of the font file(s). Defaults to ".ttf".
 */
type FontProperties = {
    name: string;
    pathOrDirectory: string;
    stylesPerWeights?: Record<string, string> | Record<number, Record<string, string>>;
    format?: string;
    extension?: string;
};

/**
 * @group Utilities
 * @category Font
 * @description Loads a local font file, or a family of fonts from a directory.
 * @param {FontProperties} font - The font properties
 */
declare function loadLocalFont(font: FontProperties): void;

// Flattened from relative module augmentations
interface TurboSelector {
        /**
         * @description Readonly set of listeners bound to this node.
         */
        readonly boundListeners: Set<ListenerEntry>;
        /**
         * @description If you want the element to bypass the event manager and allow native events to seep through
         * (in case you are preventing default events), you can set this field to a predicate that
         * defines when to bypass the manager according to the passed event.
         */
        bypassManagerOn: (e: Event) => boolean | TurboEventManagerStateProperties;
        /**
         * @function on
         * @description Adds an event listener to the element.
         * @template {Node} Type - The type of the element.
         * @param {string} type - The type of the event.
         * @param {(e: Event, el: this) => boolean | any} listener - The function that receives a notification.
         * @param {ListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        on<Type extends Node>(type: string, listener: ((e: Event, el: Type) => boolean | any), options?: ListenerOptions, manager?: TurboEventManager): this;
        /**
         * @function onTool
         * @template {Node} Type - The type of the element.
         * @description Adds an event listener to the element.
         * @param {string} type - The type of the event.
         * @param {string} toolName - The name of the tool. Set to null or undefined to check for listeners not bound
         * to a tool.
         * @param {(e: Event, el: this) => boolean | any} listener - The function that receives a notification.
         * @param {ListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        onTool<Type extends Node>(type: string, toolName: string, listener: ((e: Event, el: Type) => boolean | any), options?: ListenerOptions, manager?: TurboEventManager): this;
        /**
         * @function executeAction
         * @description Execute the listeners bound on this element for the given `type` and `toolName`. Simulates
         * firing a `type` event on the element with `toolName` active.
         * @param {string} type -  The type of the event.
         * @param {string} toolName - The name of the tool. Set to null or undefined to fire listeners not bound
         * to a tool.
         * @param {Event} event - The event to pass as parameter to the listeners.
         * @param {ListenerOptions} [options] - Options object that specifies characteristics
         * about the event listeners to fire.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         */
        executeAction(type: string, toolName: string, event: Event, options?: ListenerOptions, manager?: TurboEventManager): boolean;
        /**
         * @function hasListener
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {(e: Event, el: this) => boolean | any} listener - The function that receives a notification.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasListener(type: string, listener: ((e: Event, el: this) => boolean | any), manager?: TurboEventManager): boolean;
        /**
         * @function hasToolListener
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool the listener is attached to. Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {(e: Event, el: this) => boolean | any} listener - The function that receives a notification.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasToolListener(type: string, toolName: string, listener: ((e: Event, el: this) => boolean | any), manager?: TurboEventManager): boolean;
        /**
         * @function hasListenersByType
         * @description Checks if the element has bound listeners of the given type (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool to consider (if any). Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has a listener of this type.
         */
        hasListenersByType(type: string, toolName?: string, manager?: TurboEventManager): boolean;
        /**
         * @function removeListener
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {(e: Event, el: this) => boolean | any} listener - The function that receives a notification.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListener(type: string, listener: ((e: Event, el: this) => boolean | any), manager?: TurboEventManager): this;
        /**
         * @function removeToolListener
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {string} toolName - The name of the tool the listener is attached to. Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {(e: Event, el: this) => boolean | any} listener - The function that receives a notification.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeToolListener(type: string, toolName: string, listener: ((e: Event, el: this) => boolean | any), manager?: TurboEventManager): this;
        /**
         * @function removeListenersByType
         * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
         * specified type.
         * @param {string} type - The type of the event. Set to null or undefined to consider all types.
         * @param {string} [toolName] - The name of the tool associated (if any). Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListenersByType(type: string, toolName?: string, manager?: TurboEventManager): this;
        /**
         * @function removeAllListeners
         * @description Removes all event listeners bound to the element (in its boundListeners list).
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllListeners(manager?: TurboEventManager): this;
        /**
         * @description Prevent default browser behavior on the provided event types. By default, all basic input events
         * will be processed.
         * @param {PreventDefaultOptions} [options] - An options object to customize the behavior of the function.
         */
        preventDefault(options?: PreventDefaultOptions): this;
    }
interface TurboSelector extends Node {
    }
interface TurboTool {
        /**
         * @function customActivation
         * @description Custom activation function.
         * @param {Turbo<Element>} element - The tool element itself.
         * @param {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
         * to `TurboEventManager.instance`.
         */
        customActivation(element: Turbo<Element>, manager: TurboEventManager): void;
        /**
         * @function onActivate
         * @description Function to execute when the tool is activated.
         */
        onActivate(): void;
        /**
         * @function onDeactivate
         * @description Function to execute when the tool is deactivated.
         */
        onDeactivate(): void;
        /**
         * @description Fired on click start
         * @param e
         * @param target
         */
        clickStart(e: Event, target: Node): boolean | any;
        /**
         * @description Fired on click
         * @param e
         * @param target
         */
        click(e: Event, target: Node): boolean | any;
        /**
         * @description Fired on click end
         * @param e
         * @param target
         */
        clickEnd(e: Event, target: Node): boolean | any;
        /**
         * @description Fired on pointer move
         * @param e
         * @param target
         */
        move(e: Event, target: Node): boolean | any;
        /**
         * @description Fired on drag start
         * @param e
         * @param target
         */
        dragStart(e: Event, target: Node): boolean | any;
        /**
         * @description Fired on drag
         * @param e
         * @param target
         */
        drag(e: Event, target: Node): boolean | any;
        /**
         * @description Fired on drag end
         * @param e
         * @param target
         */
        dragEnd(e: Event, target: Node): boolean | any;
        input(e: Event, target: Node): boolean | any;
        focus(e: Event, target: Node): boolean | any;
        blur(e: Event, target: Node): boolean | any;
    }
interface TurboSubstrate {
        /**
         * @function onActivate
         * @description Function to execute when the substrate is activated.
         */
        onActivate(): void;
        /**
         * @function onDeactivate
         * @description Function to execute when the substrate is deactivated.
         */
        onDeactivate(): void;
    }
interface TurboSelector {
        /**
         * @function makeSubstrate
         * @description Creates a new substrate attached to this element. Useful to maintain certain constraints or
         * ensure some behaviors persist on a list of objects (by attaching solvers to this substrate).
         * @param {string} name - The name of the new substrate.
         * @param {MakeSubstrateOptions} [options] - Options parameter to configure the newly-created substrate.
         * @return {this} - Itself for chaining.
         */
        makeSubstrate(name: string, options?: MakeSubstrateOptions): this;
        /**
         * @description Array of all the substrates attached to this element.
         */
        readonly substrates: string[];
        /**
         * @description The current active substrate in the element.
         */
        currentSubstrate: string;
        /**
         * @description A delegate fired every time the current substrate changes.
         */
        readonly onSubstrateChange: Delegate<(prev: string, next: string) => void>;
        /**
         * @function onSubstrateActivate
         * @description Get the delegate fired when the substrate of the given name is activated (set as
         * {@link currentSubstrate}).
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {Delegate<() => void>} - The delegate.
         */
        onSubstrateActivate(substrate?: string): Delegate<() => void>;
        /**
         * @function onSubstrateDeactivate
         * @description Get the delegate fired when the substrate of the given name is deactivated.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {Delegate<() => void>} - The delegate.
         */
        onSubstrateDeactivate(substrate?: string): Delegate<() => void>;
        /**
         * @function getSubstrateObjectList
         * @description Retrieve the list of objects that are constrained by the given substrate.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {Set<object>} - A shallow copy of the list of objects as a `Set`. To modify the list, use
         * {@link addObjectToSubstrate} and {@link removeObjectFromSubstrate}.
         */
        getSubstrateObjectList(substrate?: string): Set<object>;
        /**
         * @function setSubstrateObjectList
         * @description Set the list of objects that are constrained by the given substrate.
         * @param {HTMLCollection | NodeList | Set<object>} list - The list of objects to constrain.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        setSubstrateObjectList(list: HTMLCollection | NodeList | Set<object>, substrate?: string): this;
        /**
         * @function addObjectToSubstrate
         * @description Adds the given object to the substrate's list.
         * @param {object} object - The object to add to the list.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        addObjectToSubstrate(object: object, substrate?: string): this;
        /**
         * @function removeObjectFromSubstrate
         * @description Removes the given object from the substrate's list.
         * @param {object} object - The object to remove from the list.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        removeObjectFromSubstrate(object: object, substrate?: string): this;
        /**
         * @function hasObjectInSubstrate
         * @description Check if the given object is in the substrate's object list.
         * @param {object} object - The object to check.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {boolean} - Whether the object is in the list or not.
         */
        hasObjectInSubstrate(object: object, substrate?: string): boolean;
        /**
         * @function wasObjectProcessedBySubstrate
         * @description Check whether the given object was already processed by the substrate in the current resolving
         * loop ({@link resolveSubstrate}). Can be useful in solvers.
         * @param {object} object - The object to check.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {boolean} - Whether the object was processed or not.
         */
        wasObjectProcessedBySubstrate(object: object, substrate?: string): boolean;
        /**
         * @function addSolver
         * @description Add the given function as a solver in the substrate.
         * @param {SubstrateSolver} fn - The solver function to execute when calling {@link resolveSubstrate}.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        addSolver(fn: SubstrateSolver, substrate?: string): this;
        /**
         * @function removeSolver
         * @description Remove the given function from the substrate's list of solvers.
         * @param {SubstrateSolver} fn - The solver function to remove.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        removeSolver(fn: SubstrateSolver, substrate?: string): this;
        /**
         * @function clearSolvers
         * @description Remove all solvers attached to the substrate.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        clearSolvers(substrate?: string): this;
        /**
         * @function resolveSubstrate
         * @description Resolve the substrate by executing all of its attached solvers. Each solver will be executed
         * on every object in the substrate's list of constrained objects, marking each as `processed` as it goes
         * through them.
         * @param {SubstrateSolverProperties} [properties] - Options object to configure the context of the resolving
         * call.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         */
        resolveSubstrate(properties?: SubstrateSolverProperties, substrate?: string): this;
    }
interface TurboHeadlessElement extends TurboElementDefaultInterface {
    }
interface TurboHeadlessElement<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> extends TurboElementMvcInterface<ViewType, DataType, ModelType> {
    }
interface TurboInteractor {
        /**
         * @description Fired on click start
         * @param e
         */
        clickStart(e: Event): boolean | any;
        /**
         * @description Fired on click
         * @param e
         */
        click(e: Event): boolean | any;
        /**
         * @description Fired on click end
         * @param e
         */
        clickEnd(e: Event): boolean | any;
        /**
         * @description Fired on pointer move
         * @param e
         */
        move(e: Event): boolean | any;
        /**
         * @description Fired on drag start
         * @param e
         */
        dragStart(e: Event): boolean | any;
        /**
         * @description Fired on drag
         * @param e
         */
        drag(e: Event): boolean | any;
        /**
         * @description Fired on drag end
         * @param e
         */
        dragEnd(e: Event): boolean | any;
        input(e: Event): boolean | any;
        focus(e: Event): boolean | any;
        blur(e: Event): boolean | any;
    }
interface TurboSelector {
        /**
         * @function setProperties
         * @template {ValidTag} Tag - The HTML tag of the element (for accurate autocompletion of available properties).
         * @description Sets the declared properties to the element (if possible).
         * @param {TurboProperties<Tag>} properties - The properties object.
         * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
         * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
         * @returns {this} Itself, allowing for method chaining.
         */
        setProperties<Tag extends ValidTag>(properties: TurboProperties<Tag>, setOnlyBaseProperties?: boolean): this;
        /**
         * @function setMvc
         * @description Sets MVC properties for a certain object. If no `mvc` field exists on the object, a new
         * {@link Mvc} object will be created with the given properties.
         * @param {MvcGenerationProperties} properties - The properties to configure the MVC structure.
         * @return {Mvc} - The created or retrieved {@link Mvc} object.
         */
        setMvc(properties: MvcGenerationProperties): Mvc;
        /**
         * @description Destroys the element by removing it from the document and removing all its bound listeners.
         * @returns {this} Itself, allowing for method chaining.
         */
        destroy(): this;
        /**
         * @description Sets the value of an attribute on the element.
         * @param {string} name The name of the attribute.
         * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent
         * a true boolean.
         * @returns {this} Itself, allowing for method chaining.
         */
        setAttribute(name: string, value?: string | number | boolean): this;
        /**
         * @description Removes an attribute from the element.
         * @param {string} name The name of the attribute to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAttribute(name: string): this;
        /**
         * @description Causes the element to lose focus.
         * @returns {this} Itself, allowing for method chaining.
         */
        blur(): this;
        /**
         * @description Sets focus on the element.
         * @returns {this} Itself, allowing for method chaining.
         */
        focus(): this;
    }
interface TurboSelector {
        /**
         * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
         */
        readonly closestRoot: StylesRoot;
        /**
         * @function setStyle
         * @description Set a certain style attribute of the element to the provided value.
         * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
         * @param {string | number} value - THe value to append.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        setStyle(attribute: keyof CSSStyleDeclaration, value: string | number, instant?: boolean): this;
        /**
         * @function appendStyle
         * @description Append the provided value to a certain style attribute.
         * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to append to.
         * @param {string | number} value - The value to append.
         * @param {string} [separator=", "] - The separator to use between the existing and new values.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        appendStyle(attribute: keyof CSSStyleDeclaration, value: string | number, separator?: string, instant?: boolean): this;
        /**
         * @function setStyles
         * @description Parses and applies the given CSS to the element's inline styles.
         * @param {StylesType} styles - Acceptable styles to set.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        setStyles(styles: StylesType, instant?: boolean): this;
    }
interface TurboProxiedElement extends TurboElementDefaultInterface {
    }
interface TurboProxiedElement<ElementTag extends ValidTag = ValidTag, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> extends TurboElementMvcInterface<ViewType, DataType, ModelType> {
    }
interface TurboProxiedElement extends TurboElementUiInterface {
    }
interface TurboElement extends TurboElementDefaultInterface {
    }
interface TurboElement<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> extends TurboElementMvcInterface<ViewType, DataType, ModelType> {
    }
interface TurboElement extends TurboElementUiInterface {
    }
interface TurboElementTagNameMap {
        "turbo-icon": TurboIcon;
    }
interface TurboElementTagNameMap {
        "turbo-rich-element": TurboRichElement;
    }
interface TurboElementTagNameMap {
        "turbo-button": TurboButton;
    }
interface TurboElementTagNameMap {
        "turbo-icon-switch": TurboIconSwitch;
    }
interface TurboElementTagNameMap {
        "turbo-icon-toggle": TurboIconToggle;
    }
interface TurboSelector {
        /**
         * @description Add one or more CSS classes to the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @returns {this} Itself, allowing for method chaining.
         */
        addClass(classes?: string | string[]): this;
        /**
         * @description Remove one or more CSS classes from the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeClass(classes?: string | string[]): this;
        /**
         * @description Toggle one or more CSS classes in the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
         * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
         * @returns {this} Itself, allowing for method chaining.
         */
        toggleClass(classes?: string | string[], force?: boolean): this;
        /**
         * @description Check if the element's class list contains the provided class(es).
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @return A boolean indicating whether the provided classes are included.
         */
        hasClass(classes?: string | string[]): boolean;
    }
interface TurboSelector {
        /**
         * @description The child handler object associated with the node. It is the node itself (if it is handling
         * its children) or its shadow root (if defined). Set it to change the node where the children are added/
         * removed/queried from when manipulating the node's children.
         */
        childHandler: ChildHandler;
        /**
         * @description Static array of all the child nodes of the node.
         */
        readonly childNodesArray: Node[];
        /**
         * @description Static array of all the child elements of the node.
         */
        readonly childrenArray: Element[];
        /**
         * @description Static array of all the sibling nodes (including the node itself) of the node.
         */
        readonly siblingNodes: Node[];
        /**
         * @description Static array of all the sibling elements (including the element itself, if it is one) of the node.
         */
        readonly siblings: Element[];
        /**
         * @function bringToFront
         * @description Brings the element to the front amongst its siblings in the DOM.
         * @return {this} Itself for chaining.
         */
        bringToFront(): this;
        /**
         * @function sendToBack
         * @description Sends the element to the back amongst its siblings in the DOM.
         * @return {this} Itself for chaining.
         */
        sendToBack(): this;
        /**
         * @function remove
         * @description Removes the node from the document.
         * @returns {this} Itself, allowing for method chaining.
         */
        remove(): this;
        /**
         * @function addToParent
         * @description Add the element to the given parent node
         * @param {Node} parent - The parent node to attach the element to.
         * @param {number} [index] - The position at which to add the element relative to the parent's child list.
         * Leave undefined to add the element at the end.
         * @param {Node[] | NodeListOf<Node>} [referenceList=parent.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the parent's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        addToParent(parent: Node, index?: number, referenceList?: Node[] | NodeListOf<Node>): this;
        /**
         * @function addChild
         * @description Add one or more children to the element.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @param {number} [index] - The position at which to add the child relative to the parent's child list.
         * Leave undefined to add the child at the end.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        addChild(children?: Node | Node[], index?: number, referenceList?: Node[] | NodeListOf<Node>): this;
        /**
         * @function remChild
         * @description Remove one or more children from the element.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @returns {this} Itself, allowing for method chaining.
         */
        remChild(children?: Node | Node[]): this;
        /**
         * @function addChildBefore
         * @description Add one or more children to the element before the provided sibling. If the
         * sibling is not found in the parent's children, the nodes will be added to the end of the parent's child list.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes to insert before sibling.
         * @param {Node} [sibling] - The sibling node to insert the children before.
         * @returns {this} Itself, allowing for method chaining.
         */
        addChildBefore(children?: Node | Node[], sibling?: Node): this;
        /**
         * @function removeChildAt
         * @description Remove one or more child nodes from the element.
         * @param {number} [index] - The index of the child(ren) to remove.
         * @param {number} [count=1] - The number of children to remove.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement and count. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeChildAt(index?: number, count?: number, referenceList?: Node[] | NodeListOf<Node>): this;
        /**
         * @function removeAllChildren
         * @description Remove all children of the node.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * representing all the nodes to remove. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllChildren(referenceList?: Node[] | NodeListOf<Node>): this;
        /**
         * @function childAt
         * @description Returns the child of the parent node at the given index. Any number inputted (including
         * negatives) will be reduced modulo length of the list size.
         * @param {number} [index] - The index of the child to retrieve.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {Node} The child at the given index, or `null` if the index is invalid.
         */
        childAt(index?: number, referenceList?: Node[] | NodeListOf<Node>): Node;
        /**
         * @function indexOfChild
         * @description Returns the index of the given child.
         * @param {Node} [child] - The child element to find.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {number} The index of the child node in the provided list, or -1 if the child is not found.
         */
        indexOfChild(child?: Node, referenceList?: Node[] | NodeListOf<Node>): number;
        /**
         * @function hasChild
         * @description Identify whether one or more children belong to this parent node.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @returns {boolean} A boolean indicating whether the provided nodes belong to the parent or not.
         */
        hasChild(children?: Node | Node[]): boolean;
        /**
         * @function findInSubTree
         * @description Finds whether one or more children belong to this node.
         * @param {Node | Node[]} [children] - The child or children to check.
         * @returns {boolean} True if the children belong to the node, false otherwise.
         */
        findInSubTree(children?: Node | Node[]): boolean;
        /**
         * @function findInParents
         * @description Finds whether this node is within the given parent(s).
         * @param {Node | Node[]} [parents] - The parent(s) to check.
         * @returns {boolean} True if the node is within the given parents, false otherwise.
         */
        findInParents(parents?: Node | Node[]): boolean;
        /**
         * @function indexInParent
         * @description Finds whether one or more children belong to this node.
         * @param {Node[]} [referenceList=this.siblings] - The siblings list to use as computation
         * reference for index placement. Defaults to the node's `siblings`.
         * @returns {boolean} True if the children belong to the node, false otherwise.
         */
        indexInParent(referenceList?: Node[]): number;
        /**
         * @overload
         * @function closest
         * @description Finds the closest ancestor of the current element (or the current element itself) that matches
         * the provided CSS selector.
         * @param {Type} type - The (valid) CSS selector string.
         * constructor/class to match.
         * @returns {Element} The matching ancestor element, or null if no match is found.
         */
        closest(type: string): Element;
        /**
         * @overload
         * @function closest
         * @template {Element} Type - The type of element to find.
         * @description Finds the closest ancestor of the current element (or the current element itself) that is an
         * instance of the given class.
         * @param {new (...args: any[]) => Type} type - The class to match.
         * constructor/class to match.
         * @returns {Element} The matching ancestor element, or null if no match is found.
         */
        closest<Type extends Element>(type: new (...args: any[]) => Type): Type;
    }
interface TurboSelector {
        /**
         * @description Execute a callback on the node while still benefiting from chaining.
         * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance
         * itself.
         * @returns {this} Itself, allowing for method chaining.
         */
        execute(callback: ((el: this) => void)): this;
        /**
         * @function applyDefaults
         * @description Apply default properties to the underlying object, with optional smart merging for
         * array-like keys. By default, merging will happen on all MVC properties that accept arrays (like
         * `controllers`, `handlers`, `tools`, etc.) to allow for concatenation of such MVC pieces.
         *
         * @param {Record<string, any>} defaults - Key/value map of defaults to apply on the object.
         * @param {ApplyDefaultsOptions} [options] - Optional configuration for merging keys.
         * @returns {this} The same selector instance for chaining.
         *
         * @example
         * ```ts
         * const properties = {...};
         * turbo(properties).applyDefaults({
         *   tag: "my-el",
         *   view: MyElementView,
         *   tools: [selectTool, panTool],
         *   controllers: KeyboardController
         * });
         * ```
         */
        applyDefaults(defaults: Partial<this["element"]> & Record<string, any>, options?: ApplyDefaultsOptions): this;
    }
interface TurboSelector {
        /**
         * @description Readonly shallow set of the reifects attached to this object.
         */
        readonly reifects: Set<StatefulReifect>;
        readonly onTransitionStart: Delegate<() => void>;
        readonly onTransitionEnd: Delegate<() => void>;
        /**
         * @description The transition used by the element's show() and isShown methods. Directly modifying its
         * value will modify all elements' default showTransition. Unless this is the desired outcome, set it to a
         * new custom StatefulReifect.
         */
        showTransition: StatefulReifect<Shown>;
        /**
         * @description Boolean indicating whether the element is shown or not, based on its showTransition.
         */
        readonly isShown: boolean;
        /**
         * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
         * @param {boolean} b - Whether to show the element or not
         * @param options
         * @returns {this} Itself, allowing for method chaining.
         */
        show(b: boolean, options?: ReifectAppliedOptions<Shown>): this;
        /**
         * @function attachReifect
         * @description Attach one or more reifects to the object.
         * @param {StatefulReifect[]} reifects - The reifect(s) to attach.
         * @returns {this} - Itself, allowing for method chaining.
         */
        attachReifect(...reifects: StatefulReifect[]): this;
        /**
         * @function detachReifect
         * @description Detach one or more reifects from the object.
         * @param {StatefulReifect[]} reifects - The reifect(s) to detach.
         * @returns {this} - Itself, allowing for method chaining.
         */
        detachReifect(...reifects: StatefulReifect[]): this;
        /**
         * @function initializeReifect
         * @template {string | symbol | number} State - The type of the reifect's states.
         * @description Initializes the reifect at the given state for the corresponding object.
         * @param {StatefulReifect<State>} reifect - The reifect to initialize.
         * @param {State} state - The state to initialize to (if the reifect is not stateless).
         * @param {ReifectAppliedOptions<State>} [options] - Optional overrides for the default values.
         * Set to `null` to not set anything on the object.
         * @returns {this} - Itself, allowing for method chaining.
         */
        initializeReifect<State extends string | symbol | number>(reifect?: StatefulReifect<State>, state?: State, options?: ReifectAppliedOptions<State>): this;
        /**
         * @function applyReifect
         * @template {string | symbol | number} State - The type of the reifect's states.
         * @description Applies the reifect at the given state for the corresponding object.
         * @param {StatefulReifect<State>} reifect - The reifect to apply.
         * @param {State} state - The state to initialize to (if the reifect is not stateless).
         * @param {ReifectAppliedOptions<State>} [options] - Optional overrides for the default values.
         * Set to `null` to not set anything on the object.
         * @returns {this} - Itself, allowing for method chaining.
         */
        applyReifect<State extends string | symbol | number>(reifect: StatefulReifect<State>, state?: State, options?: ReifectAppliedOptions<State>): this;
        /**
         * @function toggleReifect
         * @template {string | symbol | number} State - The type of the reifect's states.
         * @description Toggles the reifect to the next state for the corresponding object.
         * @param {StatefulReifect<State>} reifect - The reifect to toggle.
         * @param {ReifectAppliedOptions<State>} [options] - Optional overrides for the default values.
         * Set to `null` to not set anything on the object.
         * @returns {this} - Itself, allowing for method chaining.
         */
        toggleReifect<State extends string | symbol | number>(reifect: StatefulReifect<State>, options?: ReifectAppliedOptions<State>): this;
        /**
         * @function reloadReifects
         * @description Reloads all reifects attached to this object. Doesn't recompute values.
         * @returns {this} - Itself, allowing for method chaining.
         */
        reloadReifects(): this;
        /**
         * @function reloadTransitions
         * @description Reloads all transitions attached to this object. Doesn't recompute values.
         * @returns {this} - Itself, allowing for method chaining.
         */
        reloadTransitions(): this;
        /**
         * @function reifectEnabledState
         * @description Get the reifect enabled state of this object. If a reifect is provided, the enabled state of
         * the object for this specific reifect will be returned. otherwise, the global state of the object will
         * be returned.
         * @param {StatefulReifect} [reifect] - The target reifect.
         * @return {ReifectEnabledObject} - The enabled state.
         */
        reifectEnabledState(reifect?: StatefulReifect): ReifectEnabledObject;
        /**
         * @function enableReifect
         * @description Set the reifect enabled state of this object. If a reifect is provided, the enabled state of
         * the object for this specific reifect will be updated. otherwise, the global state of the object will
         * be updated
         * @param {boolean | ReifectEnabledObject} value - The new state.
         * @param {StatefulReifect} [reifect] - The target reifect.
         * @return {this} - Itself, allowing for method chaining.
         */
        enableReifect(value: boolean | ReifectEnabledObject, reifect?: StatefulReifect): this;
    }
interface TurboSelector {
        /**
         * @function makeTool
         * @description Turns the element into a tool identified by `toolName`, optionally wiring activation and
         * key mapping. By default, this function also sets up an event listener on the element to activate the
         * tool on click. This behavior can be overridden via the `options` parameter.
         * @param {string} toolName - The unique name of the tool to register under the manager. Reusing an existing
         * `toolName` will make this element another instance of `toolName`.
         * @param {MakeToolOptions} [options] - Tool creation options (custom activation, click mode, key mapping, manager).
         * @returns {this} - Itself for chaining.
         */
        makeTool(toolName: string, options?: MakeToolOptions): this;
        /**
         * @function isTool
         * @description Whether this element is registered as a tool for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if the element is a tool, false otherwise.
         */
        isTool(manager?: TurboEventManager): boolean;
        /**
         * @function getToolNames
         * @description Returns all tool names registered on this element for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {string[]} The list of tool names.
         */
        getToolNames(manager?: TurboEventManager): string[];
        /**
         * @function getToolName
         * @description Returns the first registered tool name on this element for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {string} The first tool name, if any.
         */
        getToolName(manager?: TurboEventManager): string;
        /**
         * @function onToolActivate
         * @description Retrieve the delegate fired when this tool is activated in the corresponding manager.
         * @param {string} [toolName=this.getToolName()] - The name of the tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {Delegate<() => void} - The delegate.
         */
        onToolActivate(toolName?: string, manager?: TurboEventManager): Delegate<() => void>;
        /**
         * @function onToolDeactivate
         * @description Retrieve the delegate fired when this tool is deactivated in the corresponding manager.
         * @param {string} [toolName=this.getToolName()] - The name of the tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {Delegate<() => void} - The delegate.
         */
        onToolDeactivate(toolName?: string, manager?: TurboEventManager): Delegate<() => void>;
        /**
         * @function addToolBehavior
         * @description Adds a behavior callback for a given tool and a given type. This callback will attempt to be
         * executed on the target element when a `type` event is fired and `toolName` is active. It is applied to
         * all instances of the tool.
         * @param {string} type - The type of the event (e.g., "pointerdown", "click", custom turbo event).
         * @param {ToolBehaviorCallback} callback - The behavior function. Return `true` to stop propagation.
         * @param {string} [toolName=this.getToolName()] - Tool name to bind the behavior to. Defaults to this
         * element's first tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @returns {this} Itself for chaining.
         */
        addToolBehavior(type: string, callback: ToolBehaviorCallback, toolName?: string, manager?: TurboEventManager): this;
        /**
         * @function hasToolBehavior
         * @description Checks whether there is at least one tool behavior for the pair "`type`, `toolName`."
         * @param {string} type - The type of the event (e.g., "pointerdown", "click", custom turbo event).
         * @param {string} [toolName=this.getToolName()] - The tool name to check under. Defaults to this
         * element's first tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if one or more behaviors are registered.
         */
        hasToolBehavior(type: string, toolName?: string, manager?: TurboEventManager): boolean;
        /**
         * @function removeToolBehaviors
         * @description Removes all behaviors for the pair "`type`, `toolName`" under the given manager.
         * @param {string} type - The type of the event (e.g., "pointerdown", "click", custom turbo event).
         * @param {string} [toolName=this.getToolName()] - The tool name whose behaviors will be removed. Defaults to this
         * element's first tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @returns {this} Itself for chaining.
         */
        removeToolBehaviors(type: string, toolName?: string, manager?: TurboEventManager): this;
        /**
         * @function applyTool
         * @description Executes all behaviors registered for the pair "`type`, `toolName`" against this element.
         * @param {string} toolName - The name of the tool whose behaviors should run.
         * @param {string} type - The type of the event (e.g., "pointerdown", "click", custom turbo event).
         * @param {Event} event - The triggering event instance.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if at least one behavior returned `true` (to stop propagation of the event).
         */
        applyTool(toolName: string, type: string, event: Event, manager?: TurboEventManager): boolean;
        /**
         * @function clearToolBehaviors
         * @description Clears all registered behaviors for the tools attached to this element.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {this} Itself for chaining.
         */
        clearToolBehaviors(manager?: TurboEventManager): this;
        /**
         * @function embedTool
         * @description Embeds this tool into a target node, so all interactions on the tool element apply to the
         * defined target.
         * @param {Node} target - The node to manipulate when interacting with the tool element itself.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @returns {this} Itself for chaining.
         */
        embedTool(target: Node, manager?: TurboEventManager): this;
        /**
         * @function isEmbeddedTool
         * @description Whether this tool is embedded under the provided manager.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if an embedded target is present.
         */
        isEmbeddedTool(manager?: TurboEventManager): boolean;
        /**
         * @function getEmbeddedToolTarget
         * @description Returns the target node for this embedded tool under the provided manager.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {Node} The embedded tool's target node, if any.
         */
        getEmbeddedToolTarget(manager?: TurboEventManager): Node;
        /**
         * @function ignoreTool
         * @description Make the current element ignore the provided tool, so interacting with the tool on this
         * element will have no effect and propagate.
         * @param {string} toolName - The name of the tool to ignore.
         * @param {string} [type] - The type of the event. If undefined, all event types will be considered.
         * @param {boolean} [ignore] - Whether to ignore the tool. Defaults to true.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {this} Itself for chaining.
         */
        ignoreTool(toolName: string, type?: string, ignore?: boolean, manager?: TurboEventManager): this;
        /**
         * @function ignoreTool
         * @description Make the current element ignore all tools, so interacting with any tool on this
         * element will have no effect and propagate.
         * @param {boolean} [ignore] - Whether to ignore the tools. Defaults to true.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {this} Itself for chaining.
         */
        ignoreAllTools(ignore?: boolean, manager?: TurboEventManager): this;
        /**
         * @function isToolIgnored
         * @description Whether the current element is ignoring the provided tool.
         * @param {string} toolName - The name of the tool to check for.
         * @param {string} [type] - The type of the event. If undefined, all event types will be considered.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} Whether the tool is ignored for the provided event type.
         */
        isToolIgnored(toolName: string, type?: string, manager?: TurboEventManager): boolean;
    }

export { $, AccessLevel, ActionMode, ApplyDefaultsMergeProperties, type ApplyDefaultsOptions, type AutoOptions, BasicInputEvents, type BasicPropertyConfig, type BlockChangeObserver, type BlockChangeObserverProperties, type CacheOptions, type ChildHandler, ClickMode, ClosestOrigin, type Coordinate, type DataBlockHost, type DataBlockProperties, DefaultClickEventName, DefaultDragEventName, DefaultEventName, type DefaultEventNameEntry, type DefaultEventNameKey, DefaultKeyEventName, DefaultMoveEventName, DefaultWheelEventName, type DefineOptions, Delegate, Direction, type DisabledTurboEventTypes, type ElementTagDefinition, type ElementTagMap, type FlexRect, type FontProperties, type HTMLElementMutableFields, type HTMLElementNonFunctions, type HTMLTag, InOut, InputDevice, type ListenerEntry, type ListenerOptions, type MakeSubstrateOptions, type MakeToolOptions, MathMLNamespace, type MathMLTag, MathMLTags, Mvc, type MvcBlockKeyType, type MvcBlocksType, type MvcGenerationProperties, type MvcProperties, NonPassiveEvents, OnOff, Open, type PartialRecord, Point, PopupFallbackMode, type PreventDefaultOptions, type PropertyConfig, Range, Reifect, type ReifectAppliedOptions, type ReifectEnabledObject, type ReifectInterpolator, type ReifectObjectData, type SVGTag, type SVGTagMap, type SetToolOptions, Shown, Side, SideH, SideV, type SignalBox, type SignalEntry, type StateInterpolator, type StateSpecificProperty, StatefulReifect, type StatefulReifectCoreProperties, type StatefulReifectProperties, type StatelessPropertyConfig, type StatelessReifectCoreProperties, type StatelessReifectProperties, type StylesRoot, type StylesType, type SubstrateSolver, type SubstrateSolverProperties, SvgNamespace, SvgTags, type ToolBehaviorCallback, type ToolBehaviorOptions, type Turbo, TurboBaseElement, TurboButton, type TurboButtonConfig, TurboClickEventName, TurboController, type TurboControllerProperties, TurboDataBlock, TurboDragEvent, TurboDragEventName, type TurboDragEventProperties, TurboDrawer, type TurboDrawerProperties, TurboDropdown, type TurboDropdownConfig, type TurboDropdownProperties, TurboElement, type TurboElementConfig, type TurboElementDefaultInterface, type TurboElementMvcInterface, type TurboElementProperties, type TurboElementUiInterface, TurboEmitter, TurboEvent, TurboEventManager, type TurboEventManagerLockStateProperties, type TurboEventManagerProperties, type TurboEventManagerStateProperties, TurboEventName, type TurboEventNameEntry, type TurboEventNameKey, type TurboEventProperties, TurboHandler, TurboHeadlessElement, type TurboHeadlessProperties, TurboIcon, type TurboIconConfig, type TurboIconProperties, TurboIconSwitch, type TurboIconSwitchProperties, TurboIconToggle, type TurboIconToggleProperties, TurboInput, type TurboInputProperties, TurboInteractor, type TurboInteractorProperties, TurboKeyEvent, TurboKeyEventName, type TurboKeyEventProperties, TurboMap, TurboMarkingMenu, type TurboMarkingMenuProperties, TurboModel, TurboMoveEventName, TurboNumericalInput, type TurboNumericalInputProperties, TurboPopup, type TurboPopupConfig, type TurboPopupProperties, type TurboProperties, TurboProxiedElement, type TurboProxiedProperties, type TurboRawEventProperties, TurboRichElement, type TurboRichElementConfig, type TurboRichElementProperties, TurboSelect, type TurboSelectConfig, TurboSelectInputEvent, type TurboSelectInputEventProperties, type TurboSelectProperties, TurboSelectWheel, type TurboSelectWheelProperties, type TurboSelectWheelStylingProperties, TurboSelector, TurboSubstrate, type TurboSubstrateProperties, TurboTool, type TurboToolProperties, TurboView, type TurboViewProperties, TurboWeakSet, TurboWheelEvent, TurboWheelEventName, type TurboWheelEventProperties, TurboYBlock, type TurbofyOptions, type ValidElement, type ValidHTMLElement, type ValidMathMLElement, type ValidNode, type ValidSVGElement, type ValidTag, type YDocumentProperties, a, addInYArray, addInYMap, areEqual, auto, bestOverlayColor, blindElement, blockIdSignal, blockSignal, button, cache, callOnce, callOncePerInstance, camelToKebabCase, canvas, clearCache, clearCacheEntry, contrast, controller, createProxy, createYArray, createYMap, css, deepObserveAll, deepObserveAny, define, disposeEffect, disposeEffects, div, drawer, dropdown, eachEqualToAny, effect, element, equalToAny, expose, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, form, generateTagFunction, getEventPosition, getFileExtension, getFirstDescriptorInChain, getFirstPrototypeInChainWith, getSignal, getSuperDescriptor, getSuperMethod, h1, h2, h3, h4, h5, h6, handler, hasPropertyInChain, hashBySize, hashString, icon, iconSwitch, iconToggle, img, initializeEffects, input, interactor, isNull, isUndefined, kebabToCamelCase, linearInterpolation, link, loadLocalFont, luminance, markDirty, mod, modelSignal, numericalInput, observe, p, parse, popup, randomColor, randomFromRange, randomId, randomString, reifect, removeFromYArray, richElement, setSignal, signal, solver, spacer, span, statefulReifier, stringify, style, stylesheet, substrate, t, textToElement, textarea, tool, trim, tu, turbo, turboInput, turbofy, video };

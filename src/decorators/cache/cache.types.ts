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
    timeout?: number,
    onEvent?: string | string[],
    onCallback?: () => boolean | Promise<boolean>,
    onCallbackFrequency?: number,
    onFieldChange?: string | Function | (string | Function)[],
    clearOnNextFrame?: boolean,
}

export {CacheOptions};
/**
 * @type {CacheOptions}
 * @property {number} [timeout] - The duration (in milliseconds) after which the cache should expire.
 * @property {string | string[]} [onEvent] - A string of one or more space-separated event names or an array of
 * event names. The cache will be cleared when one of these events occur.
 * @property {() => boolean | Promise<boolean>} [onCallback] - A callback function that returns a boolean or a
 * promise resolving to a boolean. The cache will be cleared if the function returns true.
 * @property {number} [onCallbackFrequency] - The frequency (in milliseconds) at which the onCallback function is called.
 * @property {string | Function | (string | Function)[]} [onFieldChange] - The field or function names to watch for
 * changes. The cache will be cleared when any of these change. Multiple field names can be provided in the same.
 * @property {boolean} [clearOnNextFrame] - If set to true, the cache will be cleared on the next animation frame.
 * space-separated string.
 */
type CacheOptions = {
    timeout?: number;
    onEvent?: string | string[];
    onCallback?: () => boolean | Promise<boolean>;
    onCallbackFrequency?: number;
    onFieldChange?: string | Function | (string | Function)[];
    clearOnNextFrame?: boolean;
};
export { CacheOptions };

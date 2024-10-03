import { CacheOptions } from "./cache.types";
/**
 * @function cache
 * @description Decorator for caching the result of a method or getter.
 * @param {CacheOptions} [options={}] - Configuration options for the cache.
 * @returns {Function} - A decorator function.
 */
declare function cache(options?: CacheOptions): Function;
/**
 * @function clearCache
 * @description Clears all cache entries for the given instance.
 * @param {any} instance - The instance to clear the cache from.
 */
declare function clearCache(instance: any): void;
/**
 * @function clearCacheEntry
 * @description Clears the cache entry for the provided field in the given instance.
 * @param {any} instance - The instance to clear the cache from.
 * @param {string | Function} field - The name of the field or the field itself (if it is a method) to clear.
 */
declare function clearCacheEntry(instance: any, field: string | Function): void;
export { cache, clearCache, clearCacheEntry };

/**
 * @group Utilities
 * @category Null Check
 */
function isNull(value: any): boolean {
    return value == null && value != undefined;
}

/**
 * @group Utilities
 * @category Null Check
 */
function isUndefined(value: any): boolean {
    return typeof value == "undefined";
}

export {isNull, isUndefined};